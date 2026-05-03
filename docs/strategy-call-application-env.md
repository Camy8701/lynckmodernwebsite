## Strategy Call Application env placeholders

Set these in your deployment environment:

- `CALENDAR_URL`
  - Optional booking URL shown on the success screen after submission.
  - If omitted, the form still sends the lead and falls back to manual email follow-up.
- `RESEND_API_KEY`
  - API key for sending internal and visitor notification emails.
- `MAIL_FROM`
  - Sender email identity used by Resend.
  - Must be a sender/domain verified in Resend.
- `INTERNAL_NOTIFY_EMAIL`
  - Internal inbox for lead notifications (default: `info@lynckstudio.pro`).

Optional rate limit tuning:

- `LEAD_RATE_WINDOW_MS` (default `60000`)
- `LEAD_RATE_MAX` (default `8`)

There are no longer literal booking placeholders in the apply-page templates.

The form is Resend-only. It does not require Supabase. A submission is considered successful after the internal notification email is sent.
