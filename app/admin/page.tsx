import { Bell, LayoutGrid, MessageSquare, Settings, Upload } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';

export default function AdminPage() {
  return (
    <main className="page">
      <div className="container adminGrid">
        <AdminSidebar />
        <section className="grid">
          <div className="card">
            <div className="titleLg">Backend dashboard</div>
            <div className="mutedText">Alles wat je nodig hebt om live te gaan: clubs beheren, geruchten plaatsen, reacties modereren en instellingen klaarzetten.</div>
          </div>
          <div className="grid grid-3">
            <div className="card"><LayoutGrid size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Clubs</div><div className="mutedText">Voeg clubs toe, wijzig logo’s, stadium, beheerder en zichtbaarheid.</div></div>
            <div className="card"><Upload size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Geruchten</div><div className="mutedText">Maak nieuwe geruchten aan en zet ze direct live of laat ze reviewen.</div></div>
            <div className="card"><MessageSquare size={18} /><div className="titleSm" style={{ marginTop: 10 }}>Reacties</div><div className="mutedText">Ruim reacties op, verwijder spam en houd kwaliteit hoog.</div></div>
          </div>
          <div className="grid grid-2">
            <div className="card">
              <div className="titleMd">Taken voor livegang</div>
              <div className="grid">
                <div className="subCard">1. Vul `.env` met Supabase-gegevens.</div>
                <div className="subCard">2. Draai `supabase/schema.sql` in je project.</div>
                <div className="subCard">3. Upload logo’s in `public/logos/eredivisie` en `public/logos/kkd`.</div>
                <div className="subCard">4. Deploy op Vercel en koppel `transferradar.nl`.</div>
              </div>
            </div>
            <div className="card">
              <div className="titleMd">Wat nog gekoppeld moet worden</div>
              <div className="mutedText">De codebase is klaar, maar voor echte multi-user livegang moeten login, database en storage met jouw Supabase-project worden verbonden.</div>
              <div className="footerNote">Dat is bewust het enige stuk dat niet hardcoded is, omdat jouw keys en domeininstellingen nodig zijn.</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
