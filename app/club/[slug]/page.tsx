import { Bell, CheckCircle2, MessageSquare, Star, ThumbsUp, TrendingUp, XCircle } from 'lucide-react';
import LogoBadge from '@/components/LogoBadge';
import RumourCard from '@/components/RumourCard';
import Badge from '@/components/Badge';
import { getClubBySlug, getClubs, getRumoursByClub } from '@/lib/data';

export default async function ClubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const club = await getClubBySlug(slug);
  if (!club) return <main className="page"><div className="container"><div className="card emptyState"><div className="titleMd">Club niet gevonden</div></div></div></main>;

  const rumours = await getRumoursByClub(club.id);
  const clubs = await getClubs();
  const highlighted = rumours.filter((r) => r.featured).slice(0, 3);
  const activeRumours = rumours.filter((r) => r.status === 'Gerucht' || r.status === 'Bijna rond').length;
  const bestScore = rumours.length ? Math.max(...rumours.map((r) => r.score)) : 0;

  return (
    <main className="page">
      <div className="container">
        <section className="card clubHero">
          <div className="clubHeroTop" style={{ background: `linear-gradient(135deg, ${club.primary_color || '#0f172a'}, #0f172a)` }}>
            <div className="row between start wrap gap16">
              <div className="row gap16 start">
                <LogoBadge name={club.name} shortCode={club.short_code} logoPath={club.logo_path} primaryColor={club.primary_color} size={84} />
                <div>
                  <Badge tone="dark">{club.league}</Badge>
                  <div className="titleXl" style={{ marginTop: 10 }}>{club.name}</div>
                  <p className="bodyLead" style={{ maxWidth: 760 }}>Alle geruchten, bevestigde deals, afgeketste transfers en verlengingen van {club.name} op één duidelijke clubpagina.</p>
                </div>
              </div>
              <div className="card" style={{ background: 'rgba(255,255,255,.12)', borderColor: 'rgba(255,255,255,.18)', color: 'white', minWidth: 260 }}>
                <div className="eyebrow" style={{ color: 'rgba(255,255,255,.8)' }}>Clubinfo</div>
                <div className="titleXs" style={{ marginTop: 8, color: 'white' }}>Stadion</div>
                <div>{club.stadium || 'Nog invullen'}</div>
                <div className="titleXs" style={{ marginTop: 12, color: 'white' }}>Beheerder</div>
                <div>{club.manager_name || 'Nog invullen'}</div>
              </div>
            </div>
          </div>
          <div className="clubMeta">
            <div className="heroMetaBox"><div className="mutedText">Actieve geruchten</div><div className="statValue">{activeRumours}</div></div>
            <div className="heroMetaBox"><div className="mutedText">Topscore</div><div className="statValue">{bestScore}</div></div>
            <div className="heroMetaBox"><div className="mutedText">Reacties</div><div className="statValue">{rumours.reduce((sum, r) => sum + r.comments_count, 0)}</div></div>
            <div className="heroMetaBox"><div className="mutedText">Volgers</div><div className="statValue">18k</div></div>
          </div>
        </section>
      </div>

      <div className="container" style={{ marginTop: 24 }}>
        <div className="grid grid-sidebar">
          <aside className="grid">
            <div className="card">
              <div className="sectionHeader row gap8 center"><TrendingUp size={18} /><div className="titleMd">Top 3 voor {club.name}</div></div>
              <div className="grid">
                {highlighted.map((item, index) => (
                  <div key={item.id} className="subCard">
                    <div className="row between center"><div className="eyebrow">#{index + 1}</div><Badge tone="dark">Hot</Badge></div>
                    <div className="titleXs" style={{ marginTop: 8 }}>{item.player_name}</div>
                    <div className="mutedText">{item.from_club} → {item.to_clubs.join(', ')}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="sectionHeader row gap8 center"><Bell size={18} /><div className="titleMd">Volg deze club</div></div>
              <div className="mutedText">Laat bezoekers updates krijgen zodra er een nieuw gerucht of een bevestigde deal verschijnt.</div>
              <button className="button button-dark" style={{ marginTop: 16 }}>Volg {club.name}</button>
            </div>
            <div className="card">
              <div className="titleMd">Andere clubs</div>
              <div className="grid">
                {clubs.filter((c) => c.id !== club.id).slice(0, 4).map((item) => (
                  <a href={`/club/${item.slug}`} key={item.id} className="subCard row gap12 center">
                    <LogoBadge name={item.name} shortCode={item.short_code} logoPath={item.logo_path} primaryColor={item.primary_color} />
                    <div>
                      <div className="titleXs">{item.name}</div>
                      <div className="mutedText">{item.league}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>

          <section>
            <div className="sectionHeader row between center wrap">
              <div>
                <div className="titleMd">Clubfeed</div>
                <div className="mutedText">Duidelijk geordend, eerst belangrijk, daarna volledig overzicht.</div>
              </div>
              <div className="tabRow">
                <button className="tabButton active">Alles</button>
                <button className="tabButton">Gerucht</button>
                <button className="tabButton">Bijna rond</button>
                <button className="tabButton">Bevestigd</button>
                <button className="tabButton">Afgeketst</button>
                <button className="tabButton">Verlengd</button>
              </div>
            </div>

            <div className="grid grid-3" style={{ marginBottom: 18 }}>
              <div className="card"><Star size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Eerst de topgeruchten</div><div className="mutedText">De clubpagina opent niet met ruis, maar met de belangrijkste verhalen.</div></div>
              <div className="card"><CheckCircle2 size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Betrouwbaarheid zichtbaar</div><div className="mutedText">Je ziet meteen of iets sterk is, pril is of bevestigd is.</div></div>
              <div className="card"><XCircle size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Geen rommel in de feed</div><div className="mutedText">Alles blijft scanbaar op mobiel en desktop.</div></div>
            </div>

            <div className="grid">
              {rumours.map((item) => <RumourCard key={item.id} rumour={item} club={club} />)}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
