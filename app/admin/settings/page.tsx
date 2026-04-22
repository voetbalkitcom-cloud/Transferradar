import AdminSidebar from '@/components/AdminSidebar';

export default function AdminSettingsPage() {
  return (
    <main className="page">
      <div className="container adminGrid">
        <AdminSidebar />
        <section className="card">
          <div className="titleLg">Instellingen</div>
          <div className="grid">
            <div className="subCard"><div className="titleXs">Site URL</div><div className="mutedText">Gebruik `NEXT_PUBLIC_SITE_URL` in je env-bestand.</div></div>
            <div className="subCard"><div className="titleXs">SMTP of e-mail provider</div><div className="mutedText">Koppel later Resend of Postmark voor notificaties.</div></div>
            <div className="subCard"><div className="titleXs">Uploads</div><div className="mutedText">Gebruik Supabase Storage voor spelersafbeeldingen en documentuploads.</div></div>
          </div>
        </section>
      </div>
    </main>
  );
}
