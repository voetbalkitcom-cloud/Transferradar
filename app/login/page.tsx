'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Inloggen mislukt: ${error.message}`);
      setLoading(false);
      return;
    }

    setMessage('Ingelogd. Doorsturen...');
    router.push('/admin');
    router.refresh();
  }

  return (
    <main style={{ maxWidth: 520, margin: '60px auto', padding: '0 20px' }}>
      <div
        style={{
          border: '1px solid #d9dee7',
          borderRadius: 24,
          background: '#fff',
          padding: 28,
        }}
      >
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
          Inloggen
        </h1>
        <p style={{ marginBottom: 24, color: '#64748b' }}>
          Log in met je e-mailadres en wachtwoord om de backend te openen.
        </p>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: 16 }}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: '1px solid #cfd8e3',
              fontSize: 16,
            }}
          />

          <input
            type="password"
            placeholder="Wachtwoord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: 14,
              borderRadius: 12,
              border: '1px solid #cfd8e3',
              fontSize: 16,
            }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: 14,
              background: '#071633',
              color: 'white',
              border: 'none',
              borderRadius: 14,
              fontWeight: 700,
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            {loading ? 'Bezig...' : 'Inloggen'}
          </button>

          {message && (
            <div
              style={{
                padding: 12,
                background: '#f3f4f6',
                borderRadius: 10,
                color: '#111827',
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </main>
  );
}
