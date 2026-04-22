import AdminSidebar from '@/components/AdminSidebar';

export default function AdminCommentsPage() {
  return (
    <main className="page">
      <div className="container adminGrid">
        <AdminSidebar />
        <section className="card">
          <div className="titleLg">Reacties modereren</div>
          <div className="grid">
            <div className="subCard"><div className="titleXs">Gebruiker 1</div><div className="mutedText">Sterke aanwinst voor Ajax als dit lukt.</div><button className="button" style={{ marginTop: 12 }}>Verwijder</button></div>
            <div className="subCard"><div className="titleXs">Gebruiker 2</div><div className="mutedText">Onzinbron. Dit moet je lager zetten in betrouwbaarheid.</div><button className="button" style={{ marginTop: 12 }}>Verwijder</button></div>
          </div>
        </section>
      </div>
    </main>
  );
}
