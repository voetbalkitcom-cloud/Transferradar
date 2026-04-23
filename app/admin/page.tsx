'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import {
  LayoutGrid,
  MessageSquare,
  Plus,
  Settings,
  Users,
  LogOut,
  Radio,
  Share2,
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const ADMIN_EMAIL = 'voetbalkit.com@gmail.com';

function AdminSidebar() {
  return (
    <aside className="premiumAdminSidebar">
      <div className="premiumAdminSidebarLabel">Control room</div>

      <div className="premiumAdminNav">
        <button className="premiumAdminNavItem active">
          <LayoutGrid size={16} />
          Dashboard
        </button>
        <Link href="/admin/rumours/new" className="premiumAdminNavItem">
          <Plus size={16} />
          Geruchten
        </Link>
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

export default function AdminPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || user.email !== ADMIN_EMAIL) {
        router.replace('/login');
        return;
      }

      setEmail(user.email || '');
      setChecking(false);
    }

    checkUser();
  }, [router]);

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
                  Premium control room
                </div>
                <h1 className="premiumAdminTitle">Backend dashboard</h1>
                <p className="premiumAdminText">
                  Strakke control room voor publiceren, reviewen en distribueren
                  van geruchten in dezelfde premium stijl als de rest van het platform.
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

          <div className="premiumAdminStats">
            {[
              ['Publiceren', 'Direct live'],
              ['Moderatie', 'Reacties beheren'],
              ['Social sharing', 'X, WhatsApp, Facebook, Instagram'],
            ].map(([label, value]) => (
              <div key={label} className="premiumStatCard">
                <div className="premiumStatLabel">{label}</div>
                <div className="premiumAdminStatText">{value}</div>
              </div>
            ))}
          </div>

          <div className="premiumAdminGrid">
            <div className="premiumPanel">
              <div className="premiumPanelTitle">Snelle acties</div>
              <div className="premiumStack" style={{ marginTop: 16 }}>
                <Link href="/admin/rumours/new" className="premiumQuickAction">
                  <Plus size={18} />
                  Nieuw gerucht toevoegen
                </Link>
                <button className="premiumQuickAction">
                  <MessageSquare size={18} />
                  Reacties bekijken
                </button>
                <button className="premiumQuickAction">
                  <Share2 size={18} />
                  Deelinstellingen openen
                </button>
              </div>
            </div>

            <div className="premiumPanel">
              <div className="premiumPanelTitle">Wat deze admin beter maakt</div>
              <div className="premiumStack" style={{ marginTop: 16 }}>
                <div className="premiumInfoCard">
                  <div className="premiumInfoTitle">Strakkere hiërarchie</div>
                  <div className="premiumInfoText">
                    Minder speels, meer premium. Beter passend bij een modern transferplatform.
                  </div>
                </div>
                <div className="premiumInfoCard">
                  <div className="premiumInfoTitle">Share-ready workflow</div>
                  <div className="premiumInfoText">
                    Geruchten kunnen straks direct worden doorgezet naar social flows.
                  </div>
                </div>
                <div className="premiumInfoCard">
                  <div className="premiumInfoTitle">Consistente stijl</div>
                  <div className="premiumInfoText">
                    De admin sluit nu visueel aan op homepage, clubpagina’s en login.
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
