-- Wochenkoch v0.5 – im Supabase SQL Editor ausführen.
-- Supabase Auth: öffentliche E-Mail-Registrierung mit E-Mail-Bestätigung aktivieren.
create table if not exists public.profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 postal_code text not null default '93053' check (postal_code ~ '^[0-9]{5}$'),
 radius_km integer not null default 10 check (radius_km between 1 and 50),
 stores text[] not null default array['REWE','EDEKA','Lidl','Aldi','Netto','Kaufland','Penny']::text[],
 compare_mode text not null default 'selected' check(compare_mode in ('selected','all')),
 diet text not null default 'all' check(diet in ('all','vegetarian','vegan')),
 excluded_ingredients text[] not null default '{}',
 people integer not null default 2 check(people between 1 and 6),
 budget_eur numeric(8,2) not null default 75 check(budget_eur between 10 and 1000),
 preferred_store text not null default 'REWE',
 updated_at timestamptz not null default now(),
 constraint valid_stores check (stores <@ array['REWE','EDEKA','Lidl','Aldi','Netto','Kaufland','Penny']::text[]),
 constraint valid_exclusions check (excluded_ingredients <@ array['pasta','tomato','onion','cheese','rice','beans','corn','pepper','potato','egg','spinach','lentil','carrot','wrap','yogurt','chicken','broccoli','couscous','chickpea','milk']::text[]),
 constraint valid_preferred_store check(preferred_store in ('REWE','EDEKA','Lidl','Aldi','Netto','Kaufland','Penny'))
);
create table if not exists public.price_observations (
 id uuid primary key default gen_random_uuid(),
 user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 barcode text not null check(barcode ~ '^[0-9]{8,14}$'),
 product_name text not null check(char_length(trim(product_name)) between 2 and 120),
 store text not null check(store in ('REWE','EDEKA','Lidl','Aldi','Netto','Kaufland','Penny')),
 postal_code text not null check(postal_code ~ '^[0-9]{5}$'),
 package_label text not null check(char_length(trim(package_label)) between 1 and 60),
 price_eur numeric(9,2) not null check(price_eur > 0 and price_eur <= 9999),
 observed_on date not null check(observed_on >= date '2020-01-01' and observed_on <= current_date),
 is_promotion boolean not null default false,
 created_at timestamptz not null default now()
);
create index if not exists idx_price_lookup on public.price_observations(barcode,store,postal_code,observed_on desc);
create table if not exists public.price_confirmations (
 observation_id uuid not null references public.price_observations(id) on delete cascade,
 user_id uuid not null references auth.users(id) on delete cascade default auth.uid(),
 created_at timestamptz not null default now(),
 primary key(observation_id,user_id)
);
create index if not exists idx_confirmations_observation on public.price_confirmations(observation_id);
alter table public.profiles enable row level security;
alter table public.price_observations enable row level security;
alter table public.price_confirmations enable row level security;
-- Profile sind ausschließlich für ihren Besitzer les- und änderbar.
drop policy if exists profiles_select_own on public.profiles;
create policy profiles_select_own on public.profiles for select to authenticated using (user_id=(select auth.uid()));
drop policy if exists profiles_insert_own on public.profiles;
create policy profiles_insert_own on public.profiles for insert to authenticated with check (user_id=(select auth.uid()));
drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own on public.profiles for update to authenticated using(user_id=(select auth.uid())) with check(user_id=(select auth.uid()));
-- Preise sind für eingeloggte Nutzer sichtbar, aber unveränderliche Beobachtungen.
drop policy if exists prices_select_authenticated on public.price_observations;
create policy prices_select_authenticated on public.price_observations for select to authenticated using(true);
drop policy if exists prices_insert_own on public.price_observations;
create policy prices_insert_own on public.price_observations for insert to authenticated with check(user_id=(select auth.uid()));
-- Bestätigungen: nur eigene Einträge und nie eigene Beobachtungen bestätigen.
drop policy if exists confirmations_select_authenticated on public.price_confirmations;
create policy confirmations_select_authenticated on public.price_confirmations for select to authenticated using(true);
drop policy if exists confirmations_insert_valid on public.price_confirmations;
create policy confirmations_insert_valid on public.price_confirmations for insert to authenticated with check(
 user_id=(select auth.uid()) and exists(
 select 1 from public.price_observations p where p.id=observation_id and p.user_id<>(select auth.uid())
 )
);
-- Keine UPDATE/DELETE Policies für Beobachtungen oder Bestätigungen.
-- Rollenrechte einschränken, damit keine sonstigen Tabellenoperationen möglich sind.
revoke all on public.profiles,public.price_observations,public.price_confirmations from anon;
revoke all on public.profiles,public.price_observations,public.price_confirmations from authenticated;
grant select,insert,update on public.profiles to authenticated;
grant select,insert on public.price_observations to authenticated;
grant select,insert on public.price_confirmations to authenticated;
