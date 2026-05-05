(function () {
  'use strict';

  const config = window.APPLY_CONFIG || {};
  const lang = config.lang === 'de' ? 'de' : 'en';
  const storageKey = 'lynck_strategy_call_application_v1';
  const calendarUrl = typeof config.calendarUrl === 'string' && config.calendarUrl.trim()
    ? config.calendarUrl.trim()
    : null;

  const flow = document.getElementById('applyFlow');
  if (!flow) return;

  const intro = flow.querySelector('[data-screen="intro"]');
  const form = flow.querySelector('#strategyApplicationForm');
  const success = flow.querySelector('[data-screen="success"]');
  const steps = Array.from(form.querySelectorAll('[data-step]'));

  const progressFill = flow.querySelector('[data-progress-fill]');
  const progressCurrent = flow.querySelector('[data-progress-current]');
  const progressTotal = flow.querySelector('[data-progress-total]');
  const progressLabel = flow.querySelector('[data-progress-label]');

  const startBtn = flow.querySelector('[data-action="start"]');
  const nextBtn = flow.querySelector('[data-action="next"]');
  const prevBtn = flow.querySelector('[data-action="prev"]');
  const submitBtn = flow.querySelector('[data-action="submit"]');
  const stepError = flow.querySelector('[data-step-error]');

  const calendarLink = flow.querySelector('[data-calendar-link]');
  const calendarFrame = flow.querySelector('[data-calendar-frame]');
  const calendarWrap = flow.querySelector('[data-calendar-wrap]');
  const bookingLinkRow = flow.querySelector('[data-booking-link-row]');
  const fallbackNote = flow.querySelector('[data-calendar-fallback]');
  const submitErrorCopy = {
    default: lang === 'de'
      ? 'Ein Fehler ist aufgetreten. Bitte versuche es erneut oder schreibe an info@lynckstudio.pro.'
      : 'Submission failed. Please try again or email info@lynckstudio.pro.',
    leadEmailFailed: lang === 'de'
      ? 'Wir konnten deine Anfrage nicht per E-Mail bestätigen. Bitte versuche es erneut oder schreibe an info@lynckstudio.pro.'
      : 'We could not confirm your application. Please try again or email info@lynckstudio.pro.'
  };

  const questionLabels = {
    q1: "What’s the biggest challenge you’re facing right now with growth/marketing?",
    q4: "Describe what success looks like 6 months from now if we absolutely nail this."
  };

  let currentStep = 0;

  const getField = (id) => document.getElementById(id);
  const fieldChecked = (id) => {
    const el = getField(id);
    return Boolean(el && el.checked);
  };

  const conditional = {
    websiteBlock: getField('websiteFieldWrap'),
    websiteInput: getField('websiteUrl'),
    noWebsite: getField('noWebsiteYet'),
    websiteBudgetBlock: getField('websiteBudgetWrap'),
    websiteBudget: getField('websiteBudgetRange'),
    googleBudgetBlock: getField('googleBudgetWrap'),
    googleBudget: getField('adSpendRange'),
    googleTracking: getField('googleTracking'),
    services: Array.from(form.querySelectorAll('input[name="servicesInterested"]'))
  };
  function setFieldError(fieldId, message) {
    const target = document.querySelector('[data-error-for="' + fieldId + '"]');
    if (!target) return;
    target.textContent = message || '';
  }

  function clearErrors() {
    form.querySelectorAll('[data-error-for]').forEach((node) => {
      node.textContent = '';
    });
    if (stepError) stepError.textContent = '';
  }

  function isValidEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function isValidUrl(value) {
    try {
      const withProtocol = /^https?:\/\//i.test(value) ? value : 'https://' + value;
      const url = new URL(withProtocol);
      return !!url.hostname;
    } catch (e) {
      return false;
    }
  }

  function value(id) {
    const el = getField(id);
    return el ? el.value.trim() : '';
  }

  function checkedValues(name) {
    return Array.from(form.querySelectorAll('input[name="' + name + '"]:checked')).map((input) => input.value);
  }

  function enforceConstraintLimit() {
    const constraints = form.querySelectorAll('input[name="constraints"]');
    constraints.forEach((input) => {
      input.addEventListener('change', () => {
        const selected = checkedValues('constraints');
        if (selected.length <= 2) return;
        input.checked = false;
        if (stepError) stepError.textContent = lang === 'de'
          ? 'Bitte waehle maximal zwei groesste Einschraenkungen.'
          : 'Please choose no more than two biggest constraints.';
      });
    });
  }

  function selectedServices() {
    return checkedValues('servicesInterested');
  }

  function wantsWebsite() {
    return conditional.services.some((input) => input.checked && (
      input.dataset.service === 'website' || input.value.indexOf('Web Systems') > -1 || input.value.indexOf('Website') > -1
    ));
  }

  function wantsGoogle() {
    return conditional.services.some((input) => input.checked && (
      input.dataset.service === 'google' || input.value.indexOf('Google Ads') === 0
    ));
  }

  function applyConditionals() {
    if (conditional.websiteBlock && conditional.noWebsite && conditional.websiteInput) {
      const disabled = conditional.noWebsite.checked;
      conditional.websiteInput.disabled = disabled;
      if (disabled) conditional.websiteInput.value = '';
    }

    if (conditional.websiteBudgetBlock) {
      const show = wantsWebsite();
      conditional.websiteBudgetBlock.classList.toggle('is-hidden', !show);
      if (!show && conditional.websiteBudget) conditional.websiteBudget.value = '';
    }

    if (conditional.googleBudgetBlock) {
      const show = wantsGoogle();
      conditional.googleBudgetBlock.classList.toggle('is-hidden', !show);
      if (!show) {
        if (conditional.googleBudget) conditional.googleBudget.value = '';
        if (conditional.googleTracking) conditional.googleTracking.value = '';
      }
    }
  }

  function updateProgress() {
    const visualStep = currentStep + 1;
    const total = steps.length;
    const percent = (visualStep / total) * 100;

    if (progressFill) progressFill.style.width = percent + '%';
    if (progressCurrent) progressCurrent.textContent = String(visualStep);
    if (progressTotal) progressTotal.textContent = String(total);
    if (progressLabel) {
      const label = steps[currentStep].getAttribute('data-step-label') || '';
      progressLabel.textContent = label;
    }
  }

  function showStep(index) {
    currentStep = Math.max(0, Math.min(index, steps.length - 1));

    steps.forEach((step, i) => {
      step.classList.toggle('is-active', i === currentStep);
    });

    if (prevBtn) prevBtn.style.visibility = currentStep === 0 ? 'hidden' : 'visible';
    if (nextBtn) nextBtn.style.display = currentStep === steps.length - 1 ? 'none' : 'inline-flex';
    if (submitBtn) submitBtn.style.display = currentStep === steps.length - 1 ? 'inline-flex' : 'none';

    updateProgress();
    clearErrors();
    applyConditionals();
  }

  function validateStep(index) {
    clearErrors();
    let valid = true;

    if (index === 0) {
      const required = [
        ['fullName', value('fullName')],
        ['workEmail', value('workEmail')],
        ['companyName', value('companyName')],
        ['industry', value('industry')],
        ['combinationQ1', value('combinationQ1')],
        ['combinationQ4', value('combinationQ4')]
      ];

      required.forEach(([id, val]) => {
        if (val) return;
        setFieldError(id, lang === 'de' ? 'Pflichtfeld' : 'Required field');
        valid = false;
      });

      if (value('industry') === 'Other' && !value('industryOther')) {
        setFieldError('industryOther', lang === 'de' ? 'Bitte angeben' : 'Please specify');
        valid = false;
      }

      const website = value('websiteUrl');
      if (website && !isValidUrl(website)) {
        setFieldError('websiteUrl', lang === 'de' ? 'Bitte gültige URL eingeben' : 'Please enter a valid URL');
        valid = false;
      }

      const email = value('workEmail');
      if (email && !isValidEmail(email)) {
        setFieldError('workEmail', lang === 'de' ? 'Bitte gültige E-Mail eingeben' : 'Please enter a valid email');
        valid = false;
      }

      const services = selectedServices();
      if (!services.length) {
        setFieldError('servicesInterested', lang === 'de' ? 'Bitte mindestens eine Option wählen' : 'Select at least one option');
        valid = false;
      }

      if (wantsWebsite() && !value('websiteBudgetRange')) {
        setFieldError('websiteBudgetRange', lang === 'de' ? 'Bitte Budget wählen' : 'Please choose a budget range');
        valid = false;
      }

      if (wantsGoogle() && !value('adSpendRange')) {
        setFieldError('adSpendRange', lang === 'de' ? 'Bitte Werbebudget wählen' : 'Please choose an ad spend range');
        valid = false;
      }
    }

    if (index === 1) {
      ['primaryGoal', 'timeline'].forEach((id) => {
        if (value(id)) return;
        setFieldError(id, lang === 'de' ? 'Pflichtfeld' : 'Required field');
        valid = false;
      });

      if (!fieldChecked('consentContact')) {
        setFieldError('consentContact', lang === 'de' ? 'Bitte bestätigen' : 'Required consent');
        valid = false;
      }

      if (!fieldChecked('consentPrivacy')) {
        setFieldError('consentPrivacy', lang === 'de' ? 'Bitte bestätigen' : 'Required consent');
        valid = false;
      }
    }

    if (!valid && stepError) {
      stepError.textContent = lang === 'de'
        ? 'Bitte prüfe die markierten Felder, bevor du fortfährst.'
        : 'Please check the highlighted fields before continuing.';
    }

    return valid;
  }

  function collectPayload() {
    const utm = new URLSearchParams(window.location.search);
    const payload = {
      full_name: value('fullName'),
      work_email: value('workEmail'),
      company_name: value('companyName'),
      website_url: fieldChecked('noWebsiteYet') ? null : value('websiteUrl'),
      no_website_yet: fieldChecked('noWebsiteYet'),
      industry: value('industry'),
      industry_other: value('industryOther'),

      combination_q1: value('combinationQ1'),
      combination_q4: value('combinationQ4'),

      primary_goal: value('primaryGoal'),
      target_outcome_metric: value('targetMetric'),
      ad_spend_range: value('adSpendRange'),
      website_budget_range: value('websiteBudgetRange'),
      can_increase_budget: value('canIncreaseBudget'),
      timeline: value('timeline'),
      biggest_constraints: checkedValues('constraints'),
      google_tracking_ready: value('googleTracking'),

      services_interested: checkedValues('servicesInterested'),
      anything_else: value('anythingElse'),

      consent_contact: fieldChecked('consentContact'),
      consent_privacy: fieldChecked('consentPrivacy'),
      consent_newsletter: fieldChecked('consentNewsletter'),

      lang: lang,
      honeypot: value('websiteHidden'),
      source_url: window.location.href,
      referrer_url: document.referrer || null,
      landing_path: window.location.pathname,
      utm_source: utm.get('utm_source') || null,
      utm_medium: utm.get('utm_medium') || null,
      utm_campaign: utm.get('utm_campaign') || null,
      utm_content: utm.get('utm_content') || null,
      utm_term: utm.get('utm_term') || null
    };

    return payload;
  }

  function saveState() {
    const payload = collectPayload();
    try {
      localStorage.setItem(storageKey, JSON.stringify(payload));
    } catch (e) {
      // ignore localStorage quota or privacy mode failures
    }
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(storageKey);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (!data || typeof data !== 'object') return;

      Object.entries(data).forEach(([key, val]) => {
        const input = form.querySelector('[name="' + key + '"]');
        if (input && input.type !== 'checkbox' && input.type !== 'radio') {
          input.value = val || '';
        }
      });

      const setChecks = (name, values) => {
        if (!Array.isArray(values)) return;
        form.querySelectorAll('input[name="' + name + '"]').forEach((input) => {
          input.checked = values.indexOf(input.value) > -1;
        });
      };

      setChecks('constraints', data.biggest_constraints || []);
      setChecks('channels_used', data.channels_used || []);
      setChecks('assets_available', data.assets_available || []);
      setChecks('leadIntakeChannels', data.lead_intake_channels || []);
      setChecks('servicesInterested', data.services_interested || []);

      const noWebsite = getField('noWebsiteYet');
      if (noWebsite) noWebsite.checked = Boolean(data.no_website_yet);

      const consentContact = getField('consentContact');
      if (consentContact) consentContact.checked = Boolean(data.consent_contact);

      const consentPrivacy = getField('consentPrivacy');
      if (consentPrivacy) consentPrivacy.checked = Boolean(data.consent_privacy);

      const consentNewsletter = getField('consentNewsletter');
      if (consentNewsletter) consentNewsletter.checked = Boolean(data.consent_newsletter);

      applyConditionals();
    } catch (e) {
      // ignore parse errors
    }
  }

  function applyPrefillFromQuery() {
    const params = new URLSearchParams(window.location.search);
    const firstName = (params.get('first_name') || '').trim();
    const email = (params.get('email') || '').trim();

    let hasPrefill = false;

    if (firstName) {
      const fullNameField = getField('fullName');
      if (fullNameField) {
        fullNameField.value = firstName;
        hasPrefill = true;
      }
    }

    if (email) {
      const workEmailField = getField('workEmail');
      if (workEmailField) {
        workEmailField.value = email;
        hasPrefill = true;
      }
    }

    if (hasPrefill) saveState();
    return hasPrefill;
  }

  function resetFlow() {
    form.reset();
    try {
      localStorage.removeItem(storageKey);
    } catch (e) {}
    applyConditionals();
    showStep(0);
  }

  function setDisplayState(node, visible, displayValue) {
    if (!node) return;
    node.style.display = visible ? (displayValue || '') : 'none';
  }

  function showSuccess(calendar) {
    form.style.display = 'none';
    if (intro) intro.classList.remove('is-active');
    success.classList.add('is-active');

    const resolvedCalendar = typeof calendar === 'string' && calendar.trim()
      ? calendar.trim()
      : calendarUrl;
    const hasCalendar = Boolean(resolvedCalendar);

    setDisplayState(calendarWrap, hasCalendar, '');
    setDisplayState(bookingLinkRow, hasCalendar, '');
    setDisplayState(fallbackNote, !hasCalendar, '');

    if (calendarLink && hasCalendar) {
      calendarLink.href = resolvedCalendar;
      calendarLink.textContent = resolvedCalendar;
    } else if (calendarLink) {
      calendarLink.removeAttribute('href');
      calendarLink.textContent = lang === 'de'
        ? 'Der Buchungslink wird per E-Mail geteilt.'
        : 'Booking details will be shared by email.';
    }
    if (calendarFrame && hasCalendar) {
      calendarFrame.src = resolvedCalendar;
      calendarFrame.title = 'Strategy call booking calendar';
    } else if (calendarFrame) {
      calendarFrame.src = 'about:blank';
    }
  }

  function trackApplicationConversion(payload, result) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'strategy_call_application_submitted',
      form_name: 'strategy_call_application',
      form_language: lang,
      lead_status: result && result.lead_status ? result.lead_status : null,
      booking_available: Boolean(result && result.booking_available),
      services_interested: Array.isArray(payload.services_interested) ? payload.services_interested.join(', ') : '',
      application_path: window.location.pathname,
      virtual_page_path: lang === 'de' ? '/de/apply/thank-you' : '/apply/thank-you',
      virtual_page_title: lang === 'de' ? 'Strategy Call Application Submitted' : 'Strategy Call Application Submitted'
    });
  }

  function goToThankYou(result) {
    const thankYouPath = lang === 'de' ? '/de/apply/thank-you/' : '/apply/thank-you/';
    try {
      sessionStorage.setItem('lynck_last_application', JSON.stringify({
        calendar_url: result && result.calendar_url ? result.calendar_url : calendarUrl,
        booking_available: Boolean(result && result.booking_available),
        lead_status: result && result.lead_status ? result.lead_status : null,
        submitted_at: new Date().toISOString()
      }));
    } catch (e) {
      // ignore storage failures
    }
    window.location.assign(thankYouPath);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (!validateStep(currentStep)) return;

    const payload = collectPayload();
    submitBtn.disabled = true;
    const originalLabel = submitBtn.textContent;
    submitBtn.textContent = lang === 'de' ? 'Wird gesendet...' : 'Submitting...';
    if (stepError) stepError.textContent = '';

    let failureMessage = submitErrorCopy.default;

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        if (result && result.error_code === 'lead_email_failed') {
          failureMessage = submitErrorCopy.leadEmailFailed;
        }
        throw new Error('Unable to submit application');
      }

      try {
        localStorage.removeItem(storageKey);
      } catch (e) {}

      trackApplicationConversion(payload, result);
      goToThankYou(result);
    } catch (error) {
      if (stepError) {
        stepError.textContent = failureMessage;
      }
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      intro.classList.remove('is-active');
      form.style.display = 'block';
      showStep(0);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      saveState();
      showStep(currentStep + 1);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      showStep(currentStep - 1);
    });
  }

  if (form) {
    form.addEventListener('input', () => {
      applyConditionals();
      saveState();
    });
    form.addEventListener('change', () => {
      applyConditionals();
      saveState();
    });
    form.addEventListener('submit', handleSubmit);
  }

  form.querySelectorAll('textarea[id^="combinationQ"]').forEach((el) => {
    const questionKey = el.id.replace('combinationQ', 'q');
    const help = questionLabels[questionKey];
    if (!help) return;
    el.setAttribute('aria-label', help);
  });

  enforceConstraintLimit();
  loadState();
  const hasHeroPrefill = applyPrefillFromQuery();
  applyConditionals();
  showStep(0);

  form.style.display = 'block';
  if (intro) intro.classList.remove('is-active');

  // Keep global nav behavior consistent on static pages using shared snippet patterns.
  if (window.__lynckSharedNavInit) {
    window.__lynckSharedNavInit();
  }
})();
