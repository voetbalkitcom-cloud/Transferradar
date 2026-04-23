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
    <html lang="nl" data-theme="light">
      <body>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
