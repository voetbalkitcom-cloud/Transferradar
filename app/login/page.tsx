export default function LoginPage() {
  return (
    <main className="page">
      <div className="container" style={{ maxWidth: 520 }}>
        <section className="card">
          <div className="titleLg">Inloggen</div>
          <div className="mutedText">Koppel deze pagina aan Supabase Auth voor admin, clubbeheerders en bezoekersaccounts.</div>
          <div className="formGrid" style={{ marginTop: 20 }}>
            <input className="input" placeholder="E-mail" />
            <input className="input" placeholder="Wachtwoord" type="password" />
            <button className="button button-dark">Inloggen</button>
          </div>
          <div className="footerNote">Voor livegang: verbind deze pagina met Supabase magic links of email/password auth.</div>
        </section>
      </div>
    </main>
  );
}
