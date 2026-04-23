import './globals.css';
import type { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';

export const metadata: Metadata = {
  title: 'Transferradar',
  description: 'Alle transfergeruchten per club',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className="dark">
      <body className="min-h-screen bg-[#f4f6fb] text-slate-900 dark:bg-[#0b1220] dark:text-slate-100">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
