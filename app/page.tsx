import { Bell, LayoutGrid, MessageSquare, ShieldCheck, Star, TrendingUp, Trophy } from 'lucide-react';
import ClubCard from '@/components/ClubCard';
import RumourCard from '@/components/RumourCard';
import { getClubs, getRumours } from '@/lib/data';

export default async function HomePage() {
  const clubs = await getClubs();
  const rumours = await getRumours();
  const featured = rumours.filter((item) => item.featured).slice(0, 3);
  const trending = [...rumours].sort((a, b) => b.score - a.score).slice(0, 5);
  const latest = rumours.slice(0, 4);

  return (
    <main className="page">
      <div className="container grid grid-main">
        <section className="card heroCard">
          <div className="heroTop">
            <div className="badge badge-neutral" style={{ background: 'rgba(255,255,255,.12)', color: 'white', borderColor: 'rgba(255,255,255,.16)' }}>
              Live transferplatform voor Eredivisie + KKD
            </div>
            <h1 className="titleXl">Klik je club. Zie direct wat er speelt.</h1>
            <p className="bodyLead">
              Topgeruchten, trending verhalen, clubpagina’s met logo’s en een backend waarmee jij en clubbeheerders direct kunnen publiceren.
            </p>
            <div className="row gap12 wrap" style={{ marginTop: 24 }}>
              <a href="#clubs" className="button button-light">Bekijk clubs</a>
              <a href="/admin" className="button" style={{ color: 'white', borderColor: 'rgba(255,255,255,.18)', background: 'rgba(255,255,255,.08)' }}>Open backend</a>
            </div>
          </div>
          <div className="heroStats">
            <div className="statBox"><div className="mutedText">Clubs</div><div className="statValue">{clubs.length}</div></div>
            <div className="statBox"><div className="mutedText">Geruchten</div><div className="statValue">{rumours.length}</div></div>
            <div className="statBox"><div className="mutedText">Topscore</div><div className="statValue">{Math.max(...rumours.map((r) => r.score))}</div></div>
            <div className="statBox"><div className="mutedText">Nieuwe comments</div><div className="statValue">22</div></div>
          </div>
        </section>

        <aside className="card">
          <div className="sectionHeader row gap8 center"><TrendingUp size={18} /><div className="titleMd">Trending nu</div></div>
          <div className="heroHighlight">
            {trending.map((item, index) => {
              const club = clubs.find((c) => c.id === item.club_id);
              if (!club) return null;
              return (
                <div className="heroHighlightItem" key={item.id}>
                  <div className="row between center gap12">
                    <div>
                      <div className="eyebrow">#{index + 1} trending • {club.name}</div>
                      <div className="titleXs" style={{ marginTop: 6 }}>{item.player_name}</div>
                    </div>
                    <span className="badge badge-dark">{item.score}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>

      <div className="container" style={{ marginTop: 24 }}>
        <div className="grid grid-main">
          <section className="card">
            <div className="sectionHeader row gap8 center"><Star size={18} /><div className="titleMd">Uitgelicht</div></div>
            <div className="grid">
              {featured.map((item) => {
                const club = clubs.find((c) => c.id === item.club_id)!;
                return <RumourCard key={item.id} rumour={item} club={club} compact />;
              })}
            </div>
          </section>

          <section className="card">
            <div className="sectionHeader row gap8 center"><ShieldCheck size={18} /><div className="titleMd">Waarom deze homepage werkt</div></div>
            <div className="grid">
              <div className="subCard"><div className="titleXs">Meer dan een clubgrid</div><div className="mutedText">Je ziet meteen wat hot is, wat bevestigd is en waar je moet klikken.</div></div>
              <div className="subCard"><div className="titleXs">Logo’s direct in de flow</div><div className="mutedText">Elke clubkaart en clubpagina laadt echte logo’s vanuit de logomap.</div></div>
              <div className="subCard"><div className="titleXs">Klaar voor productie</div><div className="mutedText">Mapstructuur: public/logos/eredivisie en public/logos/kkd.</div></div>
            </div>
          </section>
        </div>
      </div>

      <div className="container" id="clubs" style={{ marginTop: 24 }}>
        <section className="card">
          <div className="sectionHeader row between center wrap">
            <div>
              <div className="row gap8 center"><LayoutGrid size={18} /><div className="titleMd">Kies je club</div></div>
              <div className="mutedText">Clubkaarten met logo en topgerucht.</div>
            </div>
          </div>
          <div className="grid grid-2">
            {clubs.map((club) => (
              <ClubCard key={club.id} club={club} highlight={rumours.find((r) => r.club_id === club.id)} />
            ))}
          </div>
        </section>
      </div>

      <div className="container" style={{ marginTop: 24 }}>
        <section className="card">
          <div className="sectionHeader row between center wrap">
            <div>
              <div className="row gap8 center"><Trophy size={18} /><div className="titleMd">Laatste geruchten</div></div>
              <div className="mutedText">Een homepage-feed die leeft, maar overzichtelijk blijft.</div>
            </div>
            <a href="#clubs" className="button button-dark">Alles bekijken</a>
          </div>
          <div className="grid grid-2">
            {latest.map((item) => {
              const club = clubs.find((c) => c.id === item.club_id)!;
              return <RumourCard key={item.id} rumour={item} club={club} />;
            })}
          </div>
        </section>
      </div>

      <div className="container" style={{ marginTop: 24 }}>
        <div className="grid grid-3">
          <div className="card"><Bell size={18} /><div className="titleSm" style={{ marginTop: 12 }}>Volg je club</div><div className="mutedText">Bezoekers kunnen straks notificaties en e-mailupdates ontvangen.</div></div>
          <div className="card"><MessageSquare size={18} /><div className="titleSm" style={{ marginTop: 12 }}>Community zonder ruis</div><div className="mutedText">Reacties en scores maken de homepage levend zonder rommelig te worden.</div></div>
          <div className="card"><ShieldCheck size={18} /><div className="titleSm" style={{ marginTop: 12 }}>Logomap structuur</div><div className="mutedText">public/logos/eredivisie en public/logos/kkd.</div></div>
        </div>
      </div>
    </main>
  );
}
