'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Club = {
  id: string;
  name: string;
};

export default function NewRumourPage() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

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
    async function loadClubs() {
      const { data, error } = await supabase
        .from('clubs')
        .select('id, name')
        .order('name');

      if (error) {
        setMessage(`Clubs laden mislukt: ${error.message}`);
        return;
      }

      setClubs(data || []);
    }

    loadClubs();
  }, []);

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

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>
        Gerucht toevoegen
      </h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16 }}>
        <label>
          Club
          <select
            value={form.club_id}
            onChange={(e) => updateField('club_id', e.target.value)}
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          >
            <option value="">Kies club</option>
            {clubs.map((club) => (
              <option key={club.id} value={club.id}>
                {club.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Speler naam
          <input
            value={form.player_name}
            onChange={(e) => updateField('player_name', e.target.value)}
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Van club
          <input
            value={form.from_club}
            onChange={(e) => updateField('from_club', e.target.value)}
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Naar clubs (gescheiden door komma’s)
          <input
            value={form.to_clubs}
            onChange={(e) => updateField('to_clubs', e.target.value)}
            placeholder="Ajax, PSV"
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Status
          <select
            value={form.status}
            onChange={(e) => updateField('status', e.target.value)}
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          >
            <option>Gerucht</option>
            <option>Bijna rond</option>
            <option>Bevestigd</option>
            <option>Afgeketst</option>
            <option>Verlengd</option>
          </select>
        </label>

        <label>
          Betrouwbaarheid
          <select
            value={form.reliability}
            onChange={(e) => updateField('reliability', e.target.value)}
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          >
            <option>Laag</option>
            <option>Middel</option>
            <option>Hoog</option>
          </select>
        </label>

        <label>
          Bron naam
          <input
            value={form.source_name}
            onChange={(e) => updateField('source_name', e.target.value)}
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Bron URL
          <input
            value={form.source_url}
            onChange={(e) => updateField('source_url', e.target.value)}
            required
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Korte samenvatting
          <textarea
            value={form.summary}
            onChange={(e) => updateField('summary', e.target.value)}
            required
            rows={3}
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label>
          Volledige toelichting
          <textarea
            value={form.body}
            onChange={(e) => updateField('body', e.target.value)}
            required
            rows={6}
            style={{ width: '100%', padding: 12, marginTop: 6 }}
          />
        </label>

        <label style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
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
          style={{
            padding: 14,
            background: '#111827',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {loading ? 'Opslaan...' : 'Gerucht publiceren'}
        </button>

        {message && (
          <div style={{ padding: 12, background: '#f3f4f6', borderRadius: 10 }}>
            {message}
          </div>
        )}
      </form>
    </main>
  );
}
