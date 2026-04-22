import Link from 'next/link';

export default function AdminSidebar() {
  return (
    <aside className="card adminSidebar">
      <div className="titleMd">Backend</div>
      <div className="sidebarLinks">
        <Link href="/admin">Dashboard</Link>
        <Link href="/admin/clubs">Clubs</Link>
        <Link href="/admin/rumours">Geruchten</Link>
        <Link href="/admin/comments">Reacties</Link>
        <Link href="/admin/settings">Instellingen</Link>
      </div>
    </aside>
  );
}
