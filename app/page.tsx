import Link from 'next/link';
import { ArrowUpRight, Radio, Search, TrendingUp } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Club = {
  id: string;
  slug: string;
  name: string;
  league: string;
  short_code: string | null;
  logo_path: string | null;
  primary_color: string | null;
};

type Rumour = {
  id: string;
  player_name: string;
  from_club: string;
  to_clubs: string[] | null;
  status: string;
  reliability: string;
  summary: string;
  body: string;
  featured: boolean;
  club_id: string;
  created_at: string;
};

function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[24px] border border-black/8 bg-white/80 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-2xl transition duration-300 hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] dark:border-white/10 dark:bg-white/[0.04] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] dark:hover:shadow-[0_24px_80px_rgba(0,0,0,0.42)] ${className}`}
    >
      {children}
    </div>
  );
}

function ClubBadge({ club }: { club: Club }) {
  const initials = club.short_code || club.name.slice(0, 3).toUpperCase();

  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/8 bg-slate-950 text-sm font-semibold text-white dark:border-white/10 dark:bg-white dark:text-slate-950">
      {initials}
    </div>
  );
}

function StatusPill({ label }: { label: string }) {
  const styles =
    label === 'Bijna rond'
      ? 'border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/20 dark:bg-amber-500/10 dark:text-amber-300'
      : label === 'Bevestigd'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-300'
      : label === 'Afgeketst'
      ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-300'
      : 'border-black/8 bg-black/[0.03] text-slate-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-200';

  return (
    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${styles}`}>
      {label}
    </span>
  );
}

export default async function HomePage() {
  const [{ data: clubs }, { data: rumours }] = await Promise.all([
    supabase.from('clubs').select('*').order('name'),
    supabase
      .from('rumours')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12),
  ]);

  const safeClubs: Club[] = clubs || [];
  const safeRumours: Rumour[] = rumours || [];

  const featuredRumours = safeRumours.filter((r) => r.featured).slice(0, 3);
  const latestRumours = safeRumours.slice(0, 4);
  const trendingRumours = [...safeRumours].slice(0, 3);

  const clubMap = new Map(safeClubs.map((club) => [club.id, club]));

  return (
    <main className="min-h-screen bg-[#f4f6fb] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="space-y-8">
          <Card className="overflow-hidden p-0">
            <div className="relative px-8 py-10 md:px-10 md:py-12">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(59,130,246,0.08),transparent_35%,rgba(45,212,191,0.08))] dark:bg-[linear-gradient(135deg,rgba(59,130,246,0.12),transparent_35%,rgba(45,212,191,0.08))]" />
              <div className="relative flex flex-wrap items-start justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-600 dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    <Radio size={14} />
                    Live transferdesk
                  </div>

                  <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[0.98] tracking-tight md:text-6xl">
                    Transfers. Data. Inzicht.
                  </h1>

                  <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
                    Strakker, rijker en moderner. Meer premium sportplatform,
                    minder demo-gevoel. Met trending verhalen, uitgelichte
                    geruchten en snelle routes per club.
                  </p>

                  <div className="mt-7 flex flex-wrap gap-3">
                    <a
                      href="#clubs"
                      className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm dark:bg-white dark:text-slate-950"
                    >
                      Bekijk clubs
                    </a>
                    <Link
                      href="/login"
                      className="rounded-xl border border-black/10 bg-white/70 px-5 py-3 text-sm font-semibold dark:border-white/10 dark:bg-white/5"
                    >
                      Open backend
                    </Link>
                  </div>
                </div>

                <div className="grid min-w-[280px] gap-3 sm:grid-cols-2">
                  {[
                    ['Clubs', String(safeClubs.length)],
                    ['Geruchten', String(safeRumours.length)],
                    ['Featured', String(featuredRumours.length)],
                    ['Live focus', safeClubs[0]?.name || '—'],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="rounded-2xl border border-black/8 bg-white/75 p-4 dark:border-white/10 dark:bg-white/[0.04]"
                    >
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        {label}
                      </div>
                      <div className="mt-2 text-xl font-semibold tracking-tight">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <Card>
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-2xl font-semibold tracking-tight">
                    <TrendingUp size={20} />
                    Trending nu
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    De geruchten die nu het meest leven op het platform.
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {trendingRumours.length === 0 ? (
                  <div className="rounded-2xl border border-dashed border-black/10 p-6 text-sm text-slate-500 dark:border-white/10 dark:text-slate-400">
                    Nog geen geruchten gevonden.
                  </div>
                ) : (
                  trendingRumours.map((rumour, idx) => {
                    const club = clubMap.get(rumour.club_id);
                    return (
                      <Link
                        key={rumour.id}
                        href={club ? `/club/${club.slug}` : '#'}
                        className="block rounded-2xl border border-black/8 p-4 transition hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.03]"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-xs uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                              #{idx + 1} Trending • {club?.name || 'Club'}
                            </div>
                            <div className="mt-1 text-lg font-semibold tracking-tight">
                              {rumour.player_name}
                            </div>
                            <div className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                              {rumour.summary}
                            </div>
                          </div>
                          <div className="rounded-xl bg-slate-950 px-3 py-2 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">
                            Hot
                          </div>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </Card>

            <Card id="clubs">
              <div className="mb-4 flex items-center justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold tracking-tight">
                    Snel naar je club
                  </div>
                  <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Directe toegang tot de belangrijkste clubpagina's.
                  </div>
                </div>
                <Search size={18} className="text-slate-400" />
              </div>

              <div className="grid gap-3">
                {safeClubs.slice(0, 6).map((club) => (
                  <Link
                    key={club.id}
                    href={`/club/${club.slug}`}
                    className="flex items-center justify-between rounded-2xl border border-black/8 p-4 text-left transition hover:bg-black/[0.02] dark:border-white/10 dark:hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3">
                      <ClubBadge club={club} />
                      <div>
                        <div className="font-semibold tracking-tight">
                          {club.name}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          {club.league}
                        </div>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-400" />
                  </Link>
                ))}
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[
              ['Clubs', String(safeClubs.length)],
              ['Geruchten', String(safeRumours.length)],
              ['Topscore', trendingRumours.length ? 'Live' : '—'],
              ['Featured', String(featuredRumours.length)],
            ].map(([item, value]) => (
              <Card key={item}>
                <div className="text-sm text-slate-500 dark:text-slate-400">
                  {item}
                </div>
                <div className="mt-2 text-4xl font-semibold tracking-tight">
                  {value}
                </div>
              </Card>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            <Card>
              <div className="mb-3 text-xl font-semibold tracking-tight">
                Uitgelicht
              </div>
              <div className="space-y-3">
                {featuredRumours.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Nog geen uitgelichte geruchten.
                  </div>
                ) : (
                  featuredRumours.map((rumour) => {
                    const club = clubMap.get(rumour.club_id);
                    return (
                      <div
                        key={rumour.id}
                        className="rounded-2xl border border-black/8 p-4 dark:border-white/10"
                      >
                        <div className="text-sm font-semibold">
                          {rumour.player_name}
                        </div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {club?.name || 'Club'}
                        </div>
                        <div className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                          {rumour.summary}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            <Card>
              <div className="mb-3 text-xl font-semibold tracking-tight">
                Laatste updates
              </div>
              <div className="space-y-3">
                {latestRumours.length === 0 ? (
                  <div className="text-sm text-slate-500 dark:text-slate-400">
                    Nog geen updates.
                  </div>
                ) : (
                  latestRumours.map((rumour) => {
                    const club = clubMap.get(rumour.club_id);
                    return (
                      <div
                        key={rumour.id}
                        className="rounded-2xl border border-black/8 p-4 dark:border-white/10"
                      >
                        <div className="flex items-center gap-2">
                          <StatusPill label={rumour.status} />
                        </div>
                        <div className="mt-3 text-sm font-semibold">
                          {rumour.player_name}
                        </div>
                        <div className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                          {club?.name || 'Club'}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </Card>

            <Card>
              <div className="mb-3 text-xl font-semibold tracking-tight">
                Community pulse
              </div>
              <div className="text-sm leading-7 text-slate-600 dark:text-slate-400">
                Laat zien waar bezoekers op reageren, welke clubs hot zijn en
                waar discussie ontstaat. Deze sectie kunnen we later uitbreiden
                met reacties, stemmen en deelacties.
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
