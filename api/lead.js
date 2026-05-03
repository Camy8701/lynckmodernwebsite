'use strict';

// Runtime requirements:
// - CALENDAR_URL (optional but recommended for direct booking after submission)
// - Resend envs: RESEND_API_KEY, MAIL_FROM
// - INTERNAL_NOTIFY_EMAIL (optional, defaults to info@lynckstudio.pro)

const RATE_LIMIT_WINDOW_MS = Number(process.env.LEAD_RATE_WINDOW_MS || 60_000);
const RATE_LIMIT_MAX = Number(process.env.LEAD_RATE_MAX || 8);
const DEFAULT_CALENDAR_URL = typeof process.env.CALENDAR_URL === 'string' && process.env.CALENDAR_URL.trim()
  ? process.env.CALENDAR_URL.trim()
  : null;

const rateBuckets = globalThis.__lynckLeadRateBuckets || new Map();
globalThis.__lynckLeadRateBuckets = rateBuckets;

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || [];
  const recent = bucket.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  rateBuckets.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX;
}

function cleanString(value) {
  if (value === null || value === undefined) return null;
  const text = String(value).trim();
  return text || null;
}

function cleanArray(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => cleanString(item)).filter(Boolean);
}

function serviceIncludes(payload, patterns) {
  const services = cleanArray(payload.services_interested);
  return services.some((service) => patterns.some((pattern) => pattern.test(service)));
}

function validatePayload(payload) {
  const required = [
    'full_name',
    'work_email',
    'company_name',
    'industry',
    'combination_q1',
    'combination_q4',
    'primary_goal',
    'timeline'
  ];

  for (const field of required) {
    if (!cleanString(payload[field])) {
      return `Missing required field: ${field}`;
    }
  }

  const email = cleanString(payload.work_email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '')) {
    return 'Invalid email format';
  }

  const constraints = cleanArray(payload.biggest_constraints);
  if (constraints.length > 2) return 'No more than two constraints are allowed';

  const services = cleanArray(payload.services_interested);
  if (!services.length) return 'At least one service interest is required';

  if (!payload.consent_contact || !payload.consent_privacy) {
    return 'Required consent missing';
  }

  if (serviceIncludes(payload, [/Google Ads/i]) && !cleanString(payload.ad_spend_range)) {
    return 'Ad spend range is required when Google Ads is selected';
  }

  if (serviceIncludes(payload, [/Website/i, /Web Systems/i]) && !cleanString(payload.website_budget_range)) {
    return 'Website budget range is required when website service is selected';
  }

  return null;
}

function deriveLeadStatus(payload) {
  const spend = cleanString(payload.ad_spend_range);
  const timeline = cleanString(payload.timeline);
  if (spend === '€0–€1k' && timeline === 'Just exploring') {
    return 'Low priority';
  }
  return 'Qualified';
}

function sanitizePayload(payload, req) {
  const websiteBudget = cleanString(payload.website_budget_range);
  const adSpend = cleanString(payload.ad_spend_range);
  const budgetRange = adSpend || websiteBudget || 'Not selected';

  return {
    full_name: cleanString(payload.full_name),
    work_email: cleanString(payload.work_email),
    company_name: cleanString(payload.company_name),
    website_url: payload.no_website_yet ? null : cleanString(payload.website_url),
    no_website_yet: Boolean(payload.no_website_yet),
    country_timezone: cleanString(payload.country_timezone) || 'Not asked in simplified form',
    industry: cleanString(payload.industry),
    industry_other: cleanString(payload.industry_other),
    role: cleanString(payload.role) || 'Not asked in simplified form',
    is_decision_maker: cleanString(payload.is_decision_maker) || 'Not asked in simplified form',
    final_decision_maker: cleanString(payload.final_decision_maker),
    decision_maker_will_join: cleanString(payload.decision_maker_will_join),

    combination_q1: cleanString(payload.combination_q1),
    combination_q2: cleanString(payload.combination_q2) || 'Removed from simplified form',
    combination_q3: cleanString(payload.combination_q3) || 'Removed from simplified form',
    combination_q4: cleanString(payload.combination_q4),

    primary_goal: cleanString(payload.primary_goal),
    target_outcome_metric: cleanString(payload.target_outcome_metric) || 'Not provided',
    ad_spend_range: budgetRange,
    can_increase_budget: cleanString(payload.can_increase_budget) || 'Not answered',
    timeline: cleanString(payload.timeline),
    biggest_constraints: cleanArray(payload.biggest_constraints),

    channels_used: cleanArray(payload.channels_used).length ? cleanArray(payload.channels_used) : cleanArray(payload.services_interested),
    google_monthly_spend: cleanString(payload.google_monthly_spend),
    google_tracking_ready: cleanString(payload.google_tracking_ready),
    meta_pixel_capi: cleanString(payload.meta_pixel_capi),

    assets_available: cleanArray(payload.assets_available),
    has_crm: cleanString(payload.has_crm) || 'Not asked in simplified form',
    crm_name: cleanString(payload.crm_name),
    lead_intake_channels: cleanArray(payload.lead_intake_channels),
    numbers_knowledge: cleanString(payload.numbers_knowledge) || 'Not asked in simplified form',

    services_interested: cleanArray(payload.services_interested),
    anything_else: cleanString(payload.anything_else),

    consent_contact: Boolean(payload.consent_contact),
    consent_privacy: Boolean(payload.consent_privacy),
    consent_newsletter: Boolean(payload.consent_newsletter),

    source_url: cleanString(payload.source_url),
    referrer_url: cleanString(payload.referrer_url),
    landing_path: cleanString(payload.landing_path),
    utm_source: cleanString(payload.utm_source),
    utm_medium: cleanString(payload.utm_medium),
    utm_campaign: cleanString(payload.utm_campaign),
    utm_content: cleanString(payload.utm_content),
    utm_term: cleanString(payload.utm_term),

    ip_address: getClientIp(req),
    user_agent: cleanString(req.headers['user-agent']),
    lead_status: deriveLeadStatus(payload),
    created_at: new Date().toISOString()
  };
}

async function sendWithResend({ to, subject, html, text }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (!apiKey || !from) {
    return { sent: false, reason: 'Missing RESEND_API_KEY or MAIL_FROM' };
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      html,
      text
    })
  });

  if (!response.ok) {
    const textError = await response.text();
    throw new Error(`Resend failed: ${response.status} ${textError}`);
  }

  return { sent: true };
}

function userEmailTemplate(record, calendarUrl) {
  const subject = 'Your LYNCK Strategy Call Application';
  const textLines = [
    `Hi ${record.full_name || 'there'},`,
    '',
    'Thanks for applying for a Strategy Call with LYNCK Studio.',
    'Your application was received successfully.',
  ];

  if (calendarUrl) {
    textLines.push(
      '',
      'Next step: book your slot here:',
      calendarUrl
    );
  } else {
    textLines.push(
      '',
      'Next step: we will follow up directly by email with booking details.'
    );
  }

  textLines.push(
    '',
    'What to prepare for the call:',
    '- Your current lead/sales goals',
    '- Any key numbers you have (CPA/CAC/LTV/ROAS)',
    '- Optional: account access context (Google/Meta/Analytics)',
    '',
    'If it turns out there is no fit, we will tell you directly.',
    '',
    'LYNCK Studio',
    'info@lynckstudio.pro'
  );

  const text = textLines.join('\n');

  const nextStepHtml = calendarUrl
    ? `<p><strong>Next step:</strong> book your slot now:</p>
      <p><a href="${calendarUrl}" target="_blank" rel="noopener noreferrer">${calendarUrl}</a></p>`
    : `<p><strong>Next step:</strong> we will follow up directly by email with booking details.</p>`;

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.6;color:#101728;max-width:640px;margin:0 auto;">
      <h2 style="margin:0 0 12px;">Your Strategy Call Application is in.</h2>
      <p>Hi ${record.full_name || 'there'},</p>
      <p>Thanks for applying for a Strategy Call with LYNCK Studio.</p>
      ${nextStepHtml}
      <p><strong>What to prepare:</strong></p>
      <ul>
        <li>Your current lead/sales goals</li>
        <li>Any key numbers you have (CPA/CAC/LTV/ROAS)</li>
        <li>Optional: account access context (Google/Meta/Analytics)</li>
      </ul>
      <p>If there is no fit, we will tell you directly.</p>
      <p>LYNCK Studio<br>info@lynckstudio.pro</p>
    </div>
  `;

  return { subject, text, html };
}

function internalEmailTemplate(record) {
  const subject = `New Strategy Call Application: ${record.company_name || 'Unknown company'}`;
  const summary = [
    `Lead status: ${record.lead_status}`,
    `Name: ${record.full_name}`,
    `Email: ${record.work_email}`,
    `Company: ${record.company_name}`,
    `Website: ${record.website_url || 'No website yet'}`,
    `Industry: ${record.industry}${record.industry_other ? ` (${record.industry_other})` : ''}`,
    `Role: ${record.role}`,
    `Decision maker: ${record.is_decision_maker}`,
    `Budget range: ${record.ad_spend_range}`,
    `Timeline: ${record.timeline}`,
    `Services: ${record.services_interested.join(', ')}`,
    `Source URL: ${record.source_url || 'n/a'}`,
    `UTM: ${record.utm_source || 'n/a'} / ${record.utm_medium || 'n/a'} / ${record.utm_campaign || 'n/a'}`,
    '',
    'Combination answers:',
    `1) ${record.combination_q1}`,
    `2) ${record.combination_q2}`,
    `3) ${record.combination_q3}`,
    `4) ${record.combination_q4}`
  ].join('\n');

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;line-height:1.55;color:#101728;max-width:760px;margin:0 auto;">
      <h2 style="margin:0 0 12px;">New Strategy Call Application</h2>
      <p><strong>Lead status:</strong> ${record.lead_status}</p>
      <p><strong>Name:</strong> ${record.full_name}<br>
         <strong>Email:</strong> ${record.work_email}<br>
         <strong>Company:</strong> ${record.company_name}<br>
         <strong>Website:</strong> ${record.website_url || 'No website yet'}<br>
         <strong>Budget:</strong> ${record.ad_spend_range}<br>
         <strong>Timeline:</strong> ${record.timeline}</p>
      <p><strong>Services:</strong> ${record.services_interested.join(', ')}</p>
      <hr>
      <h3 style="margin:12px 0 8px;">Combination answers</h3>
      <ol>
        <li>${record.combination_q1}</li>
        <li>${record.combination_q2}</li>
        <li>${record.combination_q3}</li>
        <li>${record.combination_q4}</li>
      </ol>
    </div>
  `;

  return { subject, text: summary, html };
}

async function deliverEmail({ label, to, subject, html, text, warnings }) {
  try {
    const result = await sendWithResend({ to, subject, html, text });
    if (!result?.sent) {
      warnings.push(`${label}: ${result?.reason || 'Unknown delivery issue'}`);
      return false;
    }
    return true;
  } catch (error) {
    warnings.push(`${label}: ${error.message}`);
    return false;
  }
}

module.exports = async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return json(res, 200, { ok: true });
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS');
    return json(res, 405, { success: false, message: 'Method not allowed' });
  }

  const ip = getClientIp(req);
  if (isRateLimited(ip)) {
    return json(res, 429, {
      success: false,
      message: 'Too many requests. Please wait and try again.'
    });
  }

  let payload = {};
  if (req.body && typeof req.body === 'object') {
    payload = req.body;
  } else if (typeof req.body === 'string' && req.body.trim()) {
    try {
      payload = JSON.parse(req.body);
    } catch (e) {
      return json(res, 400, { success: false, message: 'Invalid JSON payload' });
    }
  }

  // Honeypot: return success to avoid bot retries while discarding the submission.
  if (cleanString(payload.honeypot)) {
    return json(res, 200, {
      success: true,
      calendar_url: DEFAULT_CALENDAR_URL,
      lead_status: 'Low priority'
    });
  }

  const validationError = validatePayload(payload);
  if (validationError) {
    return json(res, 400, { success: false, message: validationError });
  }

  const record = sanitizePayload(payload, req);
  const calendarUrl = DEFAULT_CALENDAR_URL;

  const internalTo = process.env.INTERNAL_NOTIFY_EMAIL || 'info@lynckstudio.pro';
  const emailErrors = [];

  const internalMail = internalEmailTemplate(record);
  const internalSent = await deliverEmail({
    label: 'Internal email',
    to: [internalTo],
    subject: internalMail.subject,
    html: internalMail.html,
    text: internalMail.text,
    warnings: emailErrors
  });

  if (!internalSent) {
    console.error('Lead notification failed', emailErrors);
    return json(res, 503, {
      success: false,
      error_code: 'lead_email_failed',
      message: 'We could not confirm your application. Please try again or email info@lynckstudio.pro.',
      email_warnings: emailErrors
    });
  }

  const userMail = userEmailTemplate(record, calendarUrl);
  await deliverEmail({
    label: 'User email',
    to: [record.work_email],
    subject: userMail.subject,
    html: userMail.html,
    text: userMail.text,
    warnings: emailErrors
  });

  if (emailErrors.length) {
    console.error('Lead delivery warnings', emailErrors);
  }

  return json(res, 200, {
    success: true,
    lead_status: record.lead_status,
    calendar_url: calendarUrl,
    booking_available: Boolean(calendarUrl),
    email_warnings: emailErrors
  });
};
