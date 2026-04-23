'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Flame, LockKeyhole, Mail } from 'lucide-react';

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

    router.push('/admin');
    router.refresh();
  }

  return (
    <main className="page premiumPage">
      <div className="container">
        <div className="premiumAuthWrap">
          <section className="premiumAuthPanel">
            <div className="premiumAuthGlow" />

            <div className="premiumAuthIcon">
              <Flame size={18} />
            </div>

            <div className="premiumEyebrow" style={{ marginTop: 18 }}>
              Admin login
            </div>

            <h1 className="premiumAuthTitle">Inloggen</h1>
            <p className="premiumAuthText">
              Log in met je e-mailadres en wachtwoord om de backend en
              publicatiefuncties te openen.
            </p>

            <form onSubmit={handleLogin} className="premiumForm" style={{ marginTop: 24 }}>
              <label className="premiumField">
                <span className="premiumFieldLabel">E-mail</span>
                <div className="premiumInputWrap">
                  <Mail size={16} className="premiumInputIcon" />
                  <input
                    type="email"
                    className="premiumInput premiumInputWithIcon"
                    placeholder="jij@club.nl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </label>

              <label className="premiumField">
                <span className="premiumFieldLabel">Wachtwoord</span>
                <div className="premiumInputWrap">
                  <LockKeyhole size={16} className="premiumInputIcon" />
                  <input
                    type="password"
                    className="premiumInput premiumInputWithIcon"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={loading}
                className="premiumButton premiumButtonDarkFull"
              >
                {loading ? 'Bezig...' : 'Inloggen'}
              </button>

              {message && <div className="premiumMessage">{message}</div>}
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
