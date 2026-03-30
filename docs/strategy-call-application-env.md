## Strategy Call Application env placeholders

Set these in your deployment environment:

- `CALENDAR_URL`
  - Optional booking URL shown on the success screen after submission.
  - If omitted, the form still stores the lead and falls back to manual email follow-up.
- `SUPABASE_URL`
  - Supabase project URL used by `/api/lead`.
- `SUPABASE_SERVICE_ROLE_KEY`
  - Service role key for writing to `strategy_call_applications`.
- `RESEND_API_KEY`
  - API key for sending user/internal notification emails.
- `MAIL_FROM`
  - Sender email identity used by Resend.
- `INTERNAL_NOTIFY_EMAIL`
  - Internal inbox for lead notifications (default: `info@lynckstudio.pro`).

Optional rate limit tuning:

- `LEAD_RATE_WINDOW_MS` (default `60000`)
- `LEAD_RATE_MAX` (default `8`)

There are no longer literal booking placeholders in the apply-page templates.
