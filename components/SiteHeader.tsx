import Link from 'next/link';
import { Flame } from 'lucide-react';

export default function SiteHeader() {
  return (
    <header className="siteHeader">
      <div className="container row between center">
        <Link href="/" className="row gap12 brandLink">
          <div className="brandIcon"><Flame size={20} /></div>
          <div>
            <div className="brandTitle">Transferradar</div>
            <div className="brandSub">Alle transfergeruchten per club</div>
          </div>
        </Link>
        <nav className="desktopNav">
          <Link href="/">Home</Link>
          <Link href="/admin">Backend</Link>
          <Link href="/login" className="button button-dark">Inloggen</Link>
        </nav>
      </div>
    </header>
  );
}
