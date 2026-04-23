import Link from 'next/link';
import {
  Bell,
  TrendingUp,
  ArrowUpRight,
  Star,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';
import RumourCard from '@/components/RumourCard';
import { getClubBySlug, getClubs, getRumoursByClub } from '@/lib/data';

export const dynamic = 'force-dynamic';

function getClubTheme(primaryColor?: string | null) {
  return {
    heroStyle: {
      background: `radial-gradient(circle at top left, ${primaryColor || '#1d4ed8'}33, transparent 28%), radial-gradient(circle at right center, rgba(45,212,191,0.10), transparent 22%), linear-gradient(135deg, ${primaryColor || '#0f172a'} 0%, #081120 65%, #0b1220 100%)`,
    } as React.CSSProperties,
    accentStyle: {
      background: primaryColor || '#0f172a',
    } as React.CSSProperties,
  };
}

export default async function ClubPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);

  if (!club) {
    return (
      <main className="page">
        <div className="container">
          <div className="premiumPanel">
            <div className="premiumPanelTitle">Club niet gevonden</div>
          </div>
        </div>
      </main>
    );
  }

  const rumours = await getRumoursByClub(club.id);
  const clubs = await getClubs();

  const highlighted = rumours.filter((r) => r.featured).slice(0, 3);
  const activeRumours = rumours.filter(
    (r) => r.status === 'Gerucht' || r.status === 'Bijna rond'
  ).length;
  const bestScore = rumours.length ? Math.max(...rumours.map((r) => r.score)) : 0;

  const theme = getClubTheme(club.primary_color);

  return (
    <main className="page premiumPage">
      <div className="container premiumClubPage">
        <section className="premiumClubHero" style={theme.heroStyle}>
          <div className="premiumHeroOverlay" />

          <div className="premiumClubHeroInner">
            <div className="premiumClubHeroMain">
              <div className="row gap16 start">
                <LogoBadge
                  name={club.name}
                  shortCode={club.short_code}
                  logoPath={club.logo_path || undefined}
                  primaryColor={club.primary_color || undefined}
                  size={92}
                />

                <div>
                  <div className="premiumClubLeagueBadge">{club.league}</div>
                  <h1 className="premiumClubTitle">{club.name}</h1>
                  <p className="premiumClubLead">
                    Alle geruchten, bevestigde deals, afgeketste transfers en
                    verlengingen van {club.name} op één premium clubpagina.
                  </p>
                </div>
              </div>
            </div>

            <div className="premiumClubInfoCard">
              <div className="premiumMiniStatLabel">Clubinfo</div>

              <div className="premiumClubInfoBlock">
                <div className="premiumClubInfoLabel">Stadion</div>
                <div className="premiumClubInfoValue">{club.stadium || 'Nog invullen'}</div>
              </div>

              <div className="premiumClubInfoBlock">
                <div className="premiumClubInfoLabel">Beheerder</div>
                <div className="premiumClubInfoValue">
                  {club.manager_name || 'Nog invullen'}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="premiumClubStats">
          {[
            ['Actieve geruchten', String(activeRumours)],
            ['Topscore', String(bestScore)],
            ['Reacties', String(rumours.reduce((sum, r) => sum + r.comments_count, 0))],
            ['Volgers', '18k'],
          ].map(([label, value]) => (
            <div key={label} className="premiumStatCard">
              <div className="premiumStatLabel">{label}</div>
              <div className="premiumStatValue">{value}</div>
            </div>
          ))}
        </section>

        <section className="premiumClubLayout">
          <aside className="premiumClubAside">
            <div className="premiumPanel">
              <div className="premiumPanelTitleRow">
                <TrendingUp size={18} />
                <h2 className="premiumPanelTitle">Top 3 voor {club.name}</h2>
              </div>

              <div className="premiumStack" style={{ marginTop: 16 }}>
                {highlighted.map((item, index) => (
                  <div key={item.id} className="premiumInfoCard">
                    <div className="row between center">
                      <div className="premiumInfoMeta">#{index + 1}</div>
                      <div className="premiumHotBadge">Hot</div>
                    </div>
                    <div className="premiumInfoTitle" style={{ marginTop: 10 }}>
                      {item.player_name}
                    </div>
                    <div className="premiumInfoText">
                      {item.from_club} → {item.to_clubs.join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="premiumPanel">
              <div className="premiumPanelTitleRow">
                <Bell size={18} />
                <h2 className="premiumPanelTitle">Volg deze club</h2>
              </div>
              <div className="premiumInfoText" style={{ marginTop: 12 }}>
                Ontvang updates zodra er een nieuw gerucht of bevestigde deal verschijnt.
              </div>
              <button className="premiumButton premiumButtonDarkFull" style={{ marginTop: 18 }}>
                Volg {club.name}
              </button>
            </div>

            <div className="premiumPanel">
              <div className="premiumPanelTitle">Andere clubs</div>
              <div className="premiumStack" style={{ marginTop: 16 }}>
                {clubs
                  .filter((c) => c.id !== club.id)
                  .slice(0, 4)
                  .map((item) => (
                    <Link
                      href={`/club/${item.slug}`}
                      key={item.id}
                      className="premiumClubLink"
                    >
                      <div className="premiumClubLeft">
                        <LogoBadge
                          name={item.name}
                          shortCode={item.short_code}
                          logoPath={item.logo_path}
                          primaryColor={item.primary_color}
                        />
                        <div>
                          <div className="premiumClubName">{item.name}</div>
                          <div className="premiumClubLeague">{item.league}</div>
                        </div>
                      </div>
                      <ArrowUpRight size={18} className="mutedIcon" />
                    </Link>
                  ))}
              </div>
            </div>
          </aside>

          <section className="premiumClubMain">
            <div className="premiumPanel">
              <div className="row between center wrap gap12">
                <div>
                  <div className="premiumPanelTitle">Clubfeed</div>
                  <div className="premiumPanelSub">
                    Duidelijk geordend. Eerst belangrijk, daarna volledig overzicht.
                  </div>
                </div>

                <div className="premiumFilterTabs">
                  <button className="premiumFilterTab active">Alles</button>
                  <button className="premiumFilterTab">Gerucht</button>
                  <button className="premiumFilterTab">Bijna rond</button>
                  <button className="premiumFilterTab">Bevestigd</button>
                </div>
              </div>
            </div>

            <div className="premiumClubFeatureGrid">
              <div className="premiumPanel">
                <Star size={18} />
                <div className="premiumInfoTitle" style={{ marginTop: 12 }}>
                  Eerst de topgeruchten
                </div>
                <div className="premiumInfoText">
                  De clubpagina opent niet met ruis, maar met de belangrijkste verhalen.
                </div>
              </div>

              <div className="premiumPanel">
                <CheckCircle2 size={18} />
                <div className="premiumInfoTitle" style={{ marginTop: 12 }}>
                  Betrouwbaarheid zichtbaar
                </div>
                <div className="premiumInfoText">
                  Je ziet meteen of iets sterk is, pril is of bevestigd is.
                </div>
              </div>

              <div className="premiumPanel">
                <XCircle size={18} />
                <div className="premiumInfoTitle" style={{ marginTop: 12 }}>
                  Geen rommel in de feed
                </div>
                <div className="premiumInfoText">
                  Alles blijft scanbaar op mobiel en desktop.
                </div>
              </div>
            </div>

            <div className="premiumRumourList">
              {rumours.map((item) => (
                <RumourCard key={item.id} rumour={item} club={club} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
