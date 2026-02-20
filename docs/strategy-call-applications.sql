-- Strategy Call Application storage schema
-- Run in Supabase SQL editor (or PostgreSQL migration pipeline).

create table if not exists public.strategy_call_applications (
  id bigserial primary key,
  created_at timestamptz not null default now(),

  full_name text not null,
  work_email text not null,
  company_name text not null,
  website_url text,
  no_website_yet boolean not null default false,
  country_timezone text not null,
  industry text not null,
  industry_other text,
  role text not null,
  is_decision_maker text not null,
  final_decision_maker text,
  decision_maker_will_join text,

  combination_q1 text not null,
  combination_q2 text not null,
  combination_q3 text not null,
  combination_q4 text not null,

  primary_goal text not null,
  target_outcome_metric text not null,
  ad_spend_range text not null,
  can_increase_budget text not null,
  timeline text not null,
  biggest_constraints text[] not null default '{}'::text[],

  channels_used text[] not null default '{}'::text[],
  google_monthly_spend text,
  google_tracking_ready text,
  meta_pixel_capi text,

  assets_available text[] not null default '{}'::text[],
  has_crm text not null,
  crm_name text,
  lead_intake_channels text[] not null default '{}'::text[],
  numbers_knowledge text not null,

  services_interested text[] not null default '{}'::text[],
  anything_else text,

  consent_contact boolean not null default false,
  consent_privacy boolean not null default false,
  consent_newsletter boolean not null default false,

  source_url text,
  referrer_url text,
  landing_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,

  ip_address text,
  user_agent text,
  lead_status text not null default 'Qualified'
);

create index if not exists idx_strategy_call_created_at
  on public.strategy_call_applications (created_at desc);

create index if not exists idx_strategy_call_lead_status
  on public.strategy_call_applications (lead_status);

create index if not exists idx_strategy_call_work_email
  on public.strategy_call_applications (work_email);

create index if not exists idx_strategy_call_utm
  on public.strategy_call_applications (utm_source, utm_medium, utm_campaign);

