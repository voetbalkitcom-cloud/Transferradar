create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text unique,
  role text not null default 'visitor' check (role in ('admin','moderator','club_manager','visitor')),
  created_at timestamptz not null default now()
);

create table if not exists public.clubs (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null unique,
  league text not null check (league in ('Eredivisie','Keuken Kampioen Divisie')),
  short_code text not null,
  logo_path text,
  primary_color text,
  stadium text,
  manager_name text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.club_managers (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  requires_approval boolean not null default true,
  can_publish_direct boolean not null default false,
  unique (club_id, user_id)
);

create table if not exists public.rumours (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  player_name text not null,
  from_club text not null,
  to_clubs text[] not null default '{}',
  status text not null check (status in ('Gerucht','Bijna rond','Bevestigd','Afgeketst','Verlengd')),
  reliability text not null check (reliability in ('Laag','Middel','Hoog')),
  source_name text not null,
  source_url text not null,
  summary text not null,
  body text not null,
  featured boolean not null default false,
  score integer not null default 0,
  comments_count integer not null default 0,
  image_url text,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  rumour_id uuid not null references public.rumours(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.rumour_votes (
  id uuid primary key default gen_random_uuid(),
  rumour_id uuid not null references public.rumours(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  visitor_fingerprint text,
  vote smallint not null check (vote in (-1, 1)),
  created_at timestamptz not null default now(),
  unique (rumour_id, user_id),
  unique (rumour_id, visitor_fingerprint)
);

create table if not exists public.club_follows (
  id uuid primary key default gen_random_uuid(),
  club_id uuid not null references public.clubs(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (club_id, user_id)
);

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name',''), new.email)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.clubs enable row level security;
alter table public.club_managers enable row level security;
alter table public.rumours enable row level security;
alter table public.comments enable row level security;
alter table public.rumour_votes enable row level security;
alter table public.club_follows enable row level security;

create policy "public can read clubs" on public.clubs for select using (true);
create policy "public can read rumours" on public.rumours for select using (true);
create policy "public can read comments" on public.comments for select using (true);
create policy "authenticated can follow clubs" on public.club_follows for insert to authenticated with check (auth.uid() = user_id);
create policy "authenticated can comment" on public.comments for insert to authenticated with check (auth.uid() = user_id);
create policy "authenticated can vote" on public.rumour_votes for insert to authenticated with check (auth.uid() = user_id);

create policy "admins manage all clubs" on public.clubs for all to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))
);

create policy "admins and club managers manage rumours" on public.rumours for all to authenticated using (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))
  or exists (select 1 from public.club_managers cm where cm.user_id = auth.uid() and cm.club_id = rumours.club_id)
) with check (
  exists (select 1 from public.profiles p where p.id = auth.uid() and p.role in ('admin','moderator'))
  or exists (select 1 from public.club_managers cm where cm.user_id = auth.uid() and cm.club_id = rumours.club_id)
);

insert into public.clubs (slug, name, league, short_code, logo_path, primary_color, stadium, manager_name)
values
('ajax', 'Ajax', 'Eredivisie', 'AJA', '/logos/eredivisie/ajax.png', '#d71920', 'Johan Cruijff ArenA', 'Clubbeheerder Ajax'),
('psv', 'PSV', 'Eredivisie', 'PSV', '/logos/eredivisie/psv.png', '#d71920', 'Philips Stadion', 'Clubbeheerder PSV'),
('feyenoord', 'Feyenoord', 'Eredivisie', 'FEY', '/logos/eredivisie/feyenoord.png', '#c8102e', 'De Kuip', 'Clubbeheerder Feyenoord'),
('ado-den-haag', 'ADO Den Haag', 'Keuken Kampioen Divisie', 'ADO', '/logos/kkd/ado-den-haag.png', '#0b7f3f', 'Bingoal Stadion', 'Clubbeheerder ADO'),
('de-graafschap', 'De Graafschap', 'Keuken Kampioen Divisie', 'DEG', '/logos/kkd/de-graafschap.png', '#0044aa', 'De Vijverberg', 'Clubbeheerder De Graafschap')
on conflict (slug) do nothing;
