'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.email !== 'voetbalkit.com@gmail.com') {
        router.replace('/login');
        return;
      }

      setEmail(user.email || '');
      setChecking(false);
    }

    checkUser();
  }, [router]);

  if (checking) {
    return <main style={{ padding: 40 }}>Controleren...</main>;
  }

  return (
    <main style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>Backend dashboard</h1>
      <p style={{ marginTop: 16 }}>Ingelogd als: {email}</p>

      <div style={{ marginTop: 24, display: 'grid', gap: 12 }}>
        <a href="/admin/rumours/new">Ga naar gerucht toevoegen</a>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
            router.refresh();
          }}
          style={{
            width: 180,
            padding: 12,
            background: '#071633',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            fontWeight: 700,
          }}
        >
          Uitloggen
        </button>
      </div>
    </main>
  );
}
