import AdminSidebar from '@/components/AdminSidebar';

export default function AdminClubsPage() {
  return (
    <main className="page">
      <div className="container adminGrid">
        <AdminSidebar />
        <section className="card">
          <div className="titleLg">Clubs beheren</div>
          <div className="formGrid">
            <div className="formRow2">
              <input className="input" placeholder="Clubnaam" />
              <select className="selectBox"><option>Eredivisie</option><option>Keuken Kampioen Divisie</option></select>
            </div>
            <div className="formRow2">
              <input className="input" placeholder="Slug, bijv. ajax" />
              <input className="input" placeholder="Afkorting, bijv. AJA" />
            </div>
            <div className="formRow2">
              <input className="input" placeholder="Stadion" />
              <input className="input" placeholder="Beheerder naam" />
            </div>
            <input className="input" placeholder="Logopad, bijv. /logos/eredivisie/ajax.png" />
            <button className="button button-dark">Club opslaan</button>
          </div>
        </section>
      </div>
    </main>
  );
}
