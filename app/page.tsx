import Link from 'next/link';
import { Flame, Search, TrendingUp, ArrowUpRight } from 'lucide-react';
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
};

type Rumour = {
  id: string;
  club_id: string;
  player_name: string;
  summary: string;
  status: string;
  featured: boolean;
  created_at: string;
};

function getClubInitials(club: Club) {
  return club.short_code || club.name.slice(0, 3).toUpperCase();
}

function getStatusBadgeClass(status: string) {
  switch (status) {
    case 'Bevestigd':
      return 'badge badge-success';
    case 'Bijna rond':
      return 'badge badge-warning';
    case 'Afgeketst':
      return 'badge badge-danger';
    default:
      return 'badge badge-neutral';
  }
}

export default async function HomePage() {
  const [{ data: clubs }, { data: rumours }] = await Promise.all([
    supabase.from('clubs').select('id, slug, name, league, short_code').order('name'),
    supabase
      .from('rumours')
      .select('id, club_id, player_name, summary, status, featured, created_at')
      .order('created_at', { ascending: false })
      .limit(12),
  ]);

  const safeClubs: Club[] = clubs || [];
  const safeRumours: Rumour[] = rumours || [];

  const featuredRumours = safeRumours.filter((r) => r.featured).slice(0, 3);
  const trendingRumours = safeRumours.slice(0, 3);
  const latestRumours = safeRumours.slice(0, 4);

  const clubMap = new Map(safeClubs.map((club) => [club.id, club]));

  return (
    <main className="page">
      <div className="container grid gap16">
        <section className="card heroCard">
          <div
            className="heroTop"
            style={{
              background:
                'linear-gradient(135deg, #0b1220 0%, #13203a 52%, #1d4ed8 100%)',
            }}
          >
            <div className="row gap8 center" style={{ color: 'rgba(255,255,255,.8)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>
              <RadioIcon />
              Live transferdesk
            </div>

            <div className="row between start wrap gap16" style={{ marginTop: 18 }}>
              <div style={{ maxWidth: 760 }}>
                <div className="titleXl">Transfers. Data. Inzicht.</div>
                <div className="bodyLead">
                  Strakker, rijker en moderner. Meer premium sportplatform, minder demo-gevoel. Met trending verhalen, uitgelichte geruchten en snelle routes per club.
                </div>

                <div className="row gap12 wrap" style={{ marginTop: 26 }}>
                  <a href="#clubs" className="button button-light">
                    Bekijk clubs
                  </a>
                  <Link href="/login" className="button button-dark">
                    Open backend
                  </Link>
                </div>
              </div>

              <div className="heroHighlight" style={{ minWidth: 280, maxWidth: 340, flex: '1 1 280px' }}>
                {[
                  ['Clubs', String(safeClubs.length)],
                  ['Geruchten', String(safeRumours.length)],
                  ['Featured', String(featuredRumours.length)],
                  ['Live focus', safeClubs[0]?.name || '—'],
                ].map(([label, value]) => (
                  <div key={label} className="heroHighlightItem">
                    <div className="mutedText">{label}</div>
                    <div className="titleSm" style={{ marginTop: 8 }}>{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="heroStats">
            {[
              ['Clubs', String(safeClubs.length)],
              ['Geruchten', String(safeRumours.length)],
              ['Topscore', trendingRumours.length ? 'Live' : '—'],
              ['Featured', String(featuredRumours.length)],
            ].map(([label, value]) => (
              <div key={label} className="statBox">
                <div className="mutedText">{label}</div>
                <div className="statValue">{value}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-main">
          <div className="card">
            <div className="sectionHeader row between center wrap gap12">
              <div>
                <div className="row gap8 center">
                  <TrendingUp size={18} className="mutedIcon" />
                  <div className="titleLg">Trending nu</div>
                </div>
                <div className="mutedText">
                  De geruchten die nu het meest leven op het platform.
                </div>
              </div>
            </div>

            <div className="grid gap12">
              {trendingRumours.length === 0 ? (
                <div className="subCard emptyState">
                  <div className="mutedText">Nog geen geruchten gevonden.</div>
                </div>
              ) : (
                trendingRumours.map((rumour, idx) => {
                  const club = clubMap.get(rumour.club_id);
                  return (
                    <Link
                      key={rumour.id}
                      href={club ? `/club/${club.slug}` : '#'}
                      className="subCard rumourCard"
                    >
                      <div className="row between start gap12">
                        <div>
                          <div className="eyebrow">
                            #{idx + 1} Trending • {club?.name || 'Club'}
                          </div>
                          <div className="titleSm" style={{ marginTop: 8 }}>
                            {rumour.player_name}
                          </div>
                          <div className="mutedText" style={{ marginTop: 6 }}>
                            {rumour.summary}
                          </div>
                        </div>
                        <div className="badge badge-dark">Hot</div>
                      </div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="card" id="clubs">
            <div className="sectionHeader row between center wrap gap12">
              <div>
                <div className="titleLg">Snel naar je club</div>
                <div className="mutedText">
                  Directe toegang tot de belangrijkste clubpagina&apos;s.
                </div>
              </div>
              <Search size={18} className="mutedIcon" />
            </div>

            <div className="grid gap12">
              {safeClubs.slice(0, 6).map((club) => (
                <Link
                  key={club.id}
                  href={`/club/${club.slug}`}
                  className="subCard clubCard row between center gap12"
                >
                  <div className="row gap12 center">
                    <div
                      className="logoBadge"
                      style={{ width: 48, height: 48, borderRadius: 16 }}
                    >
                      <div className="logoFallback" style={{ background: '#0f172a' }}>
                        {getClubInitials(club)}
                      </div>
                    </div>

                    <div>
                      <div className="titleXs">{club.name}</div>
                      <div className="mutedText">{club.league}</div>
                    </div>
                  </div>

                  <ArrowUpRight size={18} className="mutedIcon" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="grid grid-3">
          <div className="card">
            <div className="titleMd">Uitgelicht</div>
            <div className="grid gap12">
              {featuredRumours.length === 0 ? (
                <div className="mutedText">Nog geen uitgelichte geruchten.</div>
              ) : (
                featuredRumours.map((rumour) => {
                  const club = clubMap.get(rumour.club_id);
                  return (
                    <div key={rumour.id} className="subCard">
                      <div className="titleXs">{rumour.player_name}</div>
                      <div className="mutedText" style={{ marginTop: 4 }}>
                        {club?.name || 'Club'}
                      </div>
                      <div className="bodyText">{rumour.summary}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="card">
            <div className="titleMd">Laatste updates</div>
            <div className="grid gap12">
              {latestRumours.length === 0 ? (
                <div className="mutedText">Nog geen updates.</div>
              ) : (
                latestRumours.map((rumour) => {
                  const club = clubMap.get(rumour.club_id);
                  return (
                    <div key={rumour.id} className="subCard">
                      <div className="row gap8 center wrap">
                        <span className={getStatusBadgeClass(rumour.status)}>
                          {rumour.status}
                        </span>
                      </div>
                      <div className="titleXs" style={{ marginTop: 10 }}>
                        {rumour.player_name}
                      </div>
                      <div className="mutedText" style={{ marginTop: 4 }}>
                        {club?.name || 'Club'}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="card">
            <div className="titleMd">Community pulse</div>
            <div className="bodyText">
              Laat zien waar bezoekers op reageren, welke clubs hot zijn en waar discussie ontstaat. Deze sectie kunnen we later uitbreiden met reacties, stemmen en deelacties.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function RadioIcon() {
  return <Flame size={14} />;
}
