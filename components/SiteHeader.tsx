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

  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('transferradar-theme');
    const initialTheme = savedTheme === 'light' ? 'light' : 'dark';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');

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

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    window.localStorage.setItem('transferradar-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  }

  const isAdmin = userEmail === ADMIN_EMAIL;

  const navLinkClass = (href: string) =>
    `text-sm font-medium transition ${
      pathname === href
        ? 'text-slate-950 dark:text-white'
        : 'text-slate-500 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white'
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1220]/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-300 shadow-[0_10px_30px_rgba(59,130,246,0.25)]">
            <Flame className="text-white" size={18} />
          </div>
          <div>
            <div className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              Transferradar
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Alle transfergeruchten per club
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>

            {isAdmin && (
              <Link href="/admin" className={navLinkClass('/admin')}>
                Admin
              </Link>
            )}
          </nav>

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-black/8 bg-white/80 p-2.5 text-slate-700 transition hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
            aria-label="Wissel tussen licht en donker"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {!ready ? null : userEmail ? (
            <button
              onClick={handleLogout}
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-slate-950"
            >
              Uitloggen
            </button>
          ) : (
            <Link
              href="/login"
              className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-slate-950"
            >
              Inloggen
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
