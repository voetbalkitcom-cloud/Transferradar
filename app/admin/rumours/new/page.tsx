'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutGrid,
  Plus,
  MessageSquare,
  Settings,
  Users,
  Share2,
  Radio,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL = 'voetbalkit.com@gmail.com';

type Club = {
  id: string;
  name: string;
};

function AdminSidebar() {
  return (
    <aside className="premiumAdminSidebar">
      <div className="premiumAdminSidebarLabel">Control room</div>

      <div className="premiumAdminNav">
        <Link href="/admin" className="premiumAdminNavItem">
          <LayoutGrid size={16} />
          Dashboard
        </Link>
        <button className="premiumAdminNavItem active">
          <Plus size={16} />
          Geruchten
        </button>
        <button className="premiumAdminNavItem">
          <MessageSquare size={16} />
          Reacties
        </button>
        <button className="premiumAdminNavItem">
          <Users size={16} />
          Gebruikers
        </button>
        <button className="premiumAdminNavItem">
          <Settings size={16} />
          Instellingen
        </button>
      </div>
    </aside>
  );
}

export default function NewRumourPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');

  const [form, setForm] = useState({
    club_id: '',
    player_name: '',
    from_club: '',
    to_clubs: '',
    status: 'Gerucht',
    reliability: 'Middel',
    source_name: '',
    source_url: '',
    summary: '',
    body: '',
    featured: false,
  });

  useEffect(() => {
    async function init() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace('/login');
        return;
      }

      setEmail(user.email || '');

      const { data, error } = await supabase
        .from('clubs')
        .select('id, name')
        .order('name');

      if (error) {
        setMessage(`Clubs laden mislukt: ${error.message}`);
      } else {
        setClubs(data || []);
      }

      setChecking(false);
    }

    init();
  }, [router]);

  function updateField(name: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const payload = {
      club_id: form.club_id,
      player_name: form.player_name,
      from_club: form.from_club,
      to_clubs: form.to_clubs
        .split(',')
        .map((x) => x.trim())
        .filter(Boolean),
      status: form.status,
      reliability: form.reliability,
      source_name: form.source_name,
      source_url: form.source_url,
      summary: form.summary,
      body: form.body,
      featured: form.featured,
    };

    const { error } = await supabase.from('rumours').insert(payload);

    if (error) {
      setMessage(`Opslaan mislukt: ${error.message}`);
    } else {
      setMessage('Gerucht succesvol opgeslagen.');
      setForm({
        club_id: '',
        player_name: '',
        from_club: '',
        to_clubs: '',
        status: 'Gerucht',
        reliability: 'Middel',
        source_name: '',
        source_url: '',
        summary: '',
        body: '',
        featured: false,
      });
    }

    setLoading(false);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  }

  if (checking) {
    return <main className="page"><div className="container">Controleren...</div></main>;
  }

  return (
    <main className="page premiumPage">
      <div className="container premiumAdminLayout">
        <AdminSidebar />

        <section className="premiumAdminMain">
          <div className="premiumAdminHero">
            <div className="premiumAdminHeroOverlay" />
            <div className="premiumAdminHeroContent">
              <div>
                <div className="premiumEyebrow">
                  <Radio size={14} />
                  Share-ready publishing
                </div>
                <h1 className="premiumAdminTitle">Gerucht toevoegen</h1>
                <p className="premiumAdminText">
                  Moderne publicatieflow voor clubbeheerders. Strak, helder en klaar voor social sharing.
                </p>
              </div>

              <div className="premiumAdminUserCard">
                <div className="premiumMiniStatLabel">Ingelogd als</div>
                <div className="premiumMiniStatValue" style={{ fontSize: 22 }}>
                  {email}
                </div>
                <button onClick={handleLogout} className="button button-dark" style={{ marginTop: 14 }}>
                  <LogOut size={14} />
                  Uitloggen
                </button>
              </div>
            </div>
          </div>

          <div className="premiumAdminContentGrid">
            <form onSubmit={handleSubmit} className="premiumPanel premiumFormPanel">
              <div className="premiumFormGrid premiumFormGrid2">
                <label className="premiumField">
                  <span className="premiumFieldLabel">Club</span>
                  <select
                    className="premiumInput"
                    value={form.club_id}
                    onChange={(e) => updateField('club_id', e.target.value)}
                    required
                  >
                    <option value="">Kies club</option>
                    {clubs.map((club) => (
                      <option key={club.id} value={club.id}>
                        {club.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="premiumField">
                  <span className="premiumFieldLabel">Speler naam</span>
                  <input
                    className="premiumInput"
                    value={form.player_name}
                    onChange={(e) => updateField('player_name', e.target.value)}
                    required
                  />
                </label>

                <label className="premiumField">
                  <span className="premiumFieldLabel">Van club</span>
                  <input
                    className="premiumInput"
                    value={form.from_club}
                    onChange={(e) => updateField('from_club', e.target.value)}
                    required
                  />
                </label>

                <label className="premiumField">
                  <span className="premiumFieldLabel">Naar clubs</span>
                  <input
                    className="premiumInput"
                    value={form.to_clubs}
                    onChange={(e) => updateField('to_clubs', e.target.value)}
                    placeholder="Ajax, PSV"
                    required
                  />
                </label>

                <label className="premiumField">
                  <span className="premiumFieldLabel">Status</span>
                  <select
                    className="premiumInput"
                    value={form.status}
                    onChange={(e) => updateField('status', e.target.value)}
                  >
                    <option>Gerucht</option>
                    <option>Bijna rond</option>
                    <option>Bevestigd</option>
                    <option>Afgeketst</option>
                    <option>Verlengd</option>
                  </select>
                </label>

                <label className="premiumField">
                  <span className="premiumFieldLabel">Betrouwbaarheid</span>
                  <select
                    className="premiumInput"
                    value={form.reliability}
                    onChange={(e) => updateField('reliability', e.target.value)}
                  >
                    <option>Laag</option>
                    <option>Middel</option>
                    <option>Hoog</option>
                  </select>
                </label>

                <label className="premiumField premiumFieldSpan2">
                  <span className="premiumFieldLabel">Bron naam</span>
                  <input
                    className="premiumInput"
                    value={form.source_name}
                    onChange={(e) => updateField('source_name', e.target.value)}
                    required
                  />
                </label>

                <label className="premiumField premiumFieldSpan2">
                  <span className="premiumFieldLabel">Bron URL</span>
                  <input
                    className="premiumInput"
                    value={form.source_url}
                    onChange={(e) => updateField('source_url', e.target.value)}
                    required
                  />
                </label>

                <label className="premiumField premiumFieldSpan2">
                  <span className="premiumFieldLabel">Korte samenvatting</span>
                  <textarea
                    className="premiumInput premiumTextarea"
                    value={form.summary}
                    onChange={(e) => updateField('summary', e.target.value)}
                    rows={4}
                    required
                  />
                </label>

                <label className="premiumField premiumFieldSpan2">
                  <span className="premiumFieldLabel">Volledige toelichting</span>
                  <textarea
                    className="premiumInput premiumTextarea"
                    value={form.body}
                    onChange={(e) => updateField('body', e.target.value)}
                    rows={7}
                    required
                  />
                </label>
              </div>

              <div className="premiumFormFooter">
                <label className="premiumCheck">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => updateField('featured', e.target.checked)}
                  />
                  Uitgelicht
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="premiumButton premiumButtonDarkFull premiumButtonInline"
                >
                  {loading ? 'Opslaan...' : 'Gerucht publiceren'}
                </button>
              </div>

              {message && <div className="premiumMessage">{message}</div>}
            </form>

            <div className="premiumAdminSideStack">
              <div className="premiumPanel">
                <div className="premiumPanelTitle">Deel dit gerucht</div>
                <div className="premiumPanelSub" style={{ marginTop: 8 }}>
                  Per gerucht direct doorzetten naar je social flow.
                </div>

                <div className="premiumShareGrid">
                  {['X / Twitter', 'WhatsApp', 'Facebook', 'Instagram'].map((item) => (
                    <button key={item} type="button" className="premiumShareButton">
                      <Share2 size={15} />
                      {item}
                    </button>
                  ))}
                </div>

                <div className="premiumStack" style={{ marginTop: 14 }}>
                  <button type="button" className="premiumShareButton">
                    Caption kopiëren
                  </button>
                  <button type="button" className="premiumShareButton">
                    Openbare link kopiëren
                  </button>
                </div>
              </div>

              <div className="premiumPanel">
                <div className="premiumPanelTitle">Preview</div>
                <div className="premiumInfoCard" style={{ marginTop: 14 }}>
                  <div className="premiumInfoMeta">Ajax • Gerucht</div>
                  <div className="premiumInfoTitle" style={{ marginTop: 8 }}>
                    {form.player_name || 'Speler naam'}
                  </div>
                  <div className="premiumInfoText">
                    {form.summary || 'Hier zie je straks de samenvatting van het gerucht.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
