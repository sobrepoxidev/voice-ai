create table public.outbound_call_contacts (
  phone text not null,
  user_name text null,
  locale text not null default 'es'::text,
  called boolean not null default false,
  times_called integer not null default 0,
  created_at timestamp with time zone null default now(),
  last_call_attempt timestamp with time zone null,
  last_call_result text null,
  do_not_call boolean null default false,
  notes text null,
  constraint outbound_call_contacts_pkey primary key (phone)
) TABLESPACE pg_default;

create index IF not exists idx_outbound_call_contacts_called on public.outbound_call_contacts using btree (called, last_call_attempt desc) TABLESPACE pg_default;


create table public.outbound_call_queue (
  phone text not null,
  user_name text null,
  locale text null default 'es'::text,
  status text null default 'queued'::text,
  retell_call_id text null,
  updated_at timestamp without time zone null default now(),
  id bigserial not null,
  created_at timestamp with time zone null default now(),
  from_number text null,
  job_id text null,
  active boolean null default true,
  constraint outbound_call_queue_pkey primary key (id),
  constraint outbound_call_queue_status_check check (
    (
      status = any (
        array[
          'queued'::text,
          'calling'::text,
          'active'::text,
          'finished'::text,
          'canceled'::text
        ]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_outbound_call_queue_phone on public.outbound_call_queue using btree (phone) TABLESPACE pg_default;

create index IF not exists idx_outbound_call_queue_status on public.outbound_call_queue using btree (status) TABLESPACE pg_default
where
  (active = true);

create index IF not exists idx_outbound_call_queue_job_id on public.outbound_call_queue using btree (job_id) TABLESPACE pg_default;

create index IF not exists idx_outbound_call_queue_created_at on public.outbound_call_queue using btree (created_at desc) TABLESPACE pg_default;

create trigger update_outbound_call_queue_updated_at BEFORE
update on outbound_call_queue for EACH row
execute FUNCTION update_updated_at_column ();


create table public.out_customers (
  id bigserial not null,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  user_name text null,
  user_number text not null,
  user_wa_number text null,
  locale text null default 'es'::text,
  interest_first text null,
  interest_second text null,
  qualified text null,
  qualified_for text null,
  conversations jsonb null default '[]'::jsonb,
  last_call_id text null,
  last_interaction_ts timestamp with time zone null,
  wa_sending boolean null default false,
  wa_number_backup text null,
  conversation_context jsonb null default '{}'::jsonb,
  last_wa_interaction timestamp with time zone null,
  wa_consent_received boolean null default false,
  trees_interested_count integer null default 0,
  interaction_stage text null default 'initial'::text,
  constraint our_customers_pkey primary key (id),
  constraint our_customers_user_number_key unique (user_number),
  constraint user_number_format check ((user_number ~ '^\+[0-9]+$'::text))
) TABLESPACE pg_default;

create index IF not exists idx_our_customers_user_number on public.out_customers using btree (user_number) TABLESPACE pg_default;

create index IF not exists idx_our_customers_locale on public.out_customers using btree (locale) TABLESPACE pg_default;

create index IF not exists idx_our_customers_qualified on public.out_customers using btree (qualified) TABLESPACE pg_default;

create index IF not exists idx_our_customers_last_interaction on public.out_customers using btree (last_interaction_ts desc) TABLESPACE pg_default;

create index IF not exists idx_our_customers_conversations on public.out_customers using gin (conversations) TABLESPACE pg_default;

create index IF not exists idx_out_customers_user_number on public.out_customers using btree (user_number) TABLESPACE pg_default;

create index IF not exists idx_out_customers_qualified_stage on public.out_customers using btree (qualified, interaction_stage) TABLESPACE pg_default;

create trigger update_our_customers_updated_at BEFORE
update on out_customers for EACH row
execute FUNCTION update_updated_at_column ();