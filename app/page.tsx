import Link from 'next/link';
import { ArrowUpRight, Search, TrendingUp, Radio } from 'lucide-react';
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
  reliability: string;
  featured: boolean;
  created_at: string;
};

function getClubInitials(club: Club) {
  return club.short_code || club.name.slice(0, 3).toUpperCase();
}

function getStatusClass(status: string) {
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
    supabase
      .from('clubs')
      .select('id, slug, name, league, short_code')
      .order('name'),
    supabase
      .from('rumours')
      .select('id, club_id, player_name, summary, status, reliability, featured, created_at')
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
    <main className="page premiumPage">
      <div className="container premiumHome">
        <section className="premiumHero">
          <div className="premiumHeroOverlay" />

          <div className="premiumHeroInner">
            <div className="premiumHeroMain">
              <div className="premiumEyebrow">
                <Radio size={14} />
                Live transferdesk
              </div>

              <h1 className="premiumHeroTitle">Transfers. Data. Inzicht.</h1>

              <p className="premiumHeroLead">
                Strakker, rijker en moderner. Meer premium sportplatform, minder
                demo-gevoel. Met trending verhalen, uitgelichte geruchten en
                snelle routes per club.
              </p>

              <div className="premiumHeroActions">
                <a href="#clubs" className="premiumButton premiumButtonSolid">
                  Bekijk clubs
                </a>
                <Link href="/login" className="premiumButton premiumButtonGhost">
                  Open backend
                </Link>
              </div>
            </div>

            <div className="premiumHeroAside">
              {[
                ['Clubs', String(safeClubs.length)],
                ['Geruchten', String(safeRumours.length)],
                ['Featured', String(featuredRumours.length)],
                ['Live focus', safeClubs[0]?.name || '—'],
              ].map(([label, value]) => (
                <div key={label} className="premiumMiniStat">
                  <div className="premiumMiniStatLabel">{label}</div>
                  <div className="premiumMiniStatValue">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="premiumStatRow">
          {[
            ['Clubs', String(safeClubs.length)],
            ['Geruchten', String(safeRumours.length)],
            ['Topscore', trendingRumours.length ? 'Live' : '—'],
            ['Featured', String(featuredRumours.length)],
          ].map(([label, value]) => (
            <div key={label} className="premiumStatCard">
              <div className="premiumStatLabel">{label}</div>
              <div className="premiumStatValue">{value}</div>
            </div>
          ))}
        </section>

        <section className="premiumSplit">
          <div className="premiumPanel">
            <div className="premiumPanelHead">
              <div>
                <div className="premiumPanelTitleRow">
                  <TrendingUp size={18} />
                  <h2 className="premiumPanelTitle">Trending nu</h2>
                </div>
                <div className="premiumPanelSub">
                  De geruchten die nu het meest leven op het platform.
                </div>
              </div>
            </div>

            <div className="premiumStack">
              {trendingRumours.length === 0 ? (
                <div className="premiumEmpty">Nog geen geruchten gevonden.</div>
              ) : (
                trendingRumours.map((rumour, idx) => {
                  const club = clubMap.get(rumour.club_id);

                  return (
                    <Link
                      key={rumour.id}
                      href={club ? `/club/${club.slug}` : '#'}
                      className="premiumTrendCard"
                    >
                      <div className="premiumTrendTop">
                        <div className="premiumTrendMeta">
                          #{idx + 1} Trending • {club?.name || 'Club'}
                        </div>
                        <div className="premiumHotBadge">Hot</div>
                      </div>

                      <div className="premiumTrendTitle">{rumour.player_name}</div>
                      <div className="premiumTrendText">{rumour.summary}</div>
                    </Link>
                  );
                })
              )}
            </div>
          </div>

          <div className="premiumPanel" id="clubs">
            <div className="premiumPanelHead">
              <div>
                <h2 className="premiumPanelTitle">Snel naar je club</h2>
                <div className="premiumPanelSub">
                  Directe toegang tot de belangrijkste clubpagina&apos;s.
                </div>
              </div>
              <Search size={18} className="mutedIcon" />
            </div>

            <div className="premiumStack">
              {safeClubs.slice(0, 6).map((club) => (
                <Link
                  key={club.id}
                  href={`/club/${club.slug}`}
                  className="premiumClubLink"
                >
                  <div className="premiumClubLeft">
                    <div className="premiumClubLogo">{getClubInitials(club)}</div>
                    <div>
                      <div className="premiumClubName">{club.name}</div>
                      <div className="premiumClubLeague">{club.league}</div>
                    </div>
                  </div>
                  <ArrowUpRight size={18} className="mutedIcon" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="premiumThreeCols">
          <div className="premiumPanel">
            <h2 className="premiumPanelTitle">Uitgelicht</h2>
            <div className="premiumStack">
              {featuredRumours.length === 0 ? (
                <div className="premiumEmpty">Nog geen uitgelichte geruchten.</div>
              ) : (
                featuredRumours.map((rumour) => {
                  const club = clubMap.get(rumour.club_id);

                  return (
                    <div key={rumour.id} className="premiumInfoCard">
                      <div className="premiumInfoTitle">{rumour.player_name}</div>
                      <div className="premiumInfoMeta">{club?.name || 'Club'}</div>
                      <div className="premiumInfoText">{rumour.summary}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="premiumPanel">
            <h2 className="premiumPanelTitle">Laatste updates</h2>
            <div className="premiumStack">
              {latestRumours.length === 0 ? (
                <div className="premiumEmpty">Nog geen updates.</div>
              ) : (
                latestRumours.map((rumour) => {
                  const club = clubMap.get(rumour.club_id);

                  return (
                    <div key={rumour.id} className="premiumInfoCard">
                      <div className="row gap8 center wrap">
                        <span className={getStatusClass(rumour.status)}>
                          {rumour.status}
                        </span>
                      </div>
                      <div className="premiumInfoTitle" style={{ marginTop: 12 }}>
                        {rumour.player_name}
                      </div>
                      <div className="premiumInfoMeta">{club?.name || 'Club'}</div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="premiumPanel">
            <h2 className="premiumPanelTitle">Community pulse</h2>
            <div className="premiumInfoText">
              Laat zien waar bezoekers op reageren, welke clubs hot zijn en waar
              discussie ontstaat. Deze sectie kunnen we later uitbreiden met
              reacties, stemmen en deelacties.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
