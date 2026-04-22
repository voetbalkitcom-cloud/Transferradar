import AdminSidebar from '@/components/AdminSidebar';

export default function AdminRumoursPage() {
  return (
    <main className="page">
      <div className="container adminGrid">
        <AdminSidebar />
        <section className="card">
          <div className="titleLg">Geruchten beheren</div>
          <div className="formGrid">
            <div className="formRow2">
              <select className="selectBox"><option>Club selecteren</option></select>
              <input className="input" placeholder="Speler naam" />
            </div>
            <div className="formRow2">
              <input className="input" placeholder="Van club" />
              <input className="input" placeholder="Naar clubs, gescheiden door komma's" />
            </div>
            <div className="formRow2">
              <select className="selectBox"><option>Gerucht</option><option>Bijna rond</option><option>Bevestigd</option><option>Afgeketst</option><option>Verlengd</option></select>
              <select className="selectBox"><option>Middel</option><option>Hoog</option><option>Laag</option></select>
            </div>
            <input className="input" placeholder="Bron naam" />
            <input className="input" placeholder="Bron URL" />
            <textarea className="textarea" placeholder="Korte samenvatting" />
            <textarea className="textarea" placeholder="Volledige toelichting" />
            <button className="button button-dark">Gerucht publiceren</button>
          </div>
        </section>
      </div>
    </main>
  );
}
