'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { Flame, Moon, Sun } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL = 'voetbalkit.com@gmail.com';

export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();

  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('transferradar-theme');
    const nextTheme = saved === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
      setReady(true);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user?.email ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    window.localStorage.setItem('transferradar-theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const isAdmin = userEmail === ADMIN_EMAIL;

  return (
    <header className="siteHeader premiumHeader">
      <div className="container premiumHeaderInner">
        <Link href="/" className="row gap12 center brandLink premiumBrand">
          <div className="brandIcon premiumBrandIcon">
            <Flame size={18} />
          </div>
          <div>
            <div className="brandTitle">Transferradar</div>
            <div className="brandSub">Transfer intelligence per club</div>
          </div>
        </Link>

        <div className="row gap12 center">
          <nav className="desktopNav premiumNav">
            <Link
              href="/"
              className={pathname === '/' ? 'navLink active' : 'navLink'}
            >
              Home
            </Link>

            {isAdmin && (
              <Link
                href="/admin"
                className={pathname?.startsWith('/admin') ? 'navLink active' : 'navLink'}
              >
                Admin
              </Link>
            )}
          </nav>

          <button
            onClick={toggleTheme}
            className="themeToggle"
            aria-label="Wissel kleurmodus"
            type="button"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {!ready ? null : userEmail ? (
            <button onClick={handleLogout} className="button button-dark">
              Uitloggen
            </button>
          ) : (
            <Link href="/login" className="button button-dark">
              Inloggen
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
