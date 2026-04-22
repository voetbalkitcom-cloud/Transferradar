import Link from 'next/link';
import { MessageSquare, ThumbsUp } from 'lucide-react';
import { Rumour, Club } from '@/lib/types';
import Badge from './Badge';

export default function RumourCard({ rumour, club, compact = false }: { rumour: Rumour; club: Club; compact?: boolean }) {
  const tone = rumour.status === 'Bevestigd' ? 'success' : rumour.status === 'Bijna rond' ? 'warning' : rumour.status === 'Afgeketst' ? 'danger' : 'neutral';
  return (
    <div className="card rumourCard">
      <div className="row between start gap16 wrap">
        <div>
          <div className="row gap8 wrap">
            <Badge tone={tone}>{rumour.status}</Badge>
            {rumour.featured ? <Badge tone="dark">Uitgelicht</Badge> : null}
          </div>
          <div className={compact ? 'titleMd' : 'titleLg'}>{rumour.player_name}</div>
          <div className="mutedText">{club.name} • {rumour.from_club} → {rumour.to_clubs.join(', ')}</div>
        </div>
        {!compact ? (
          <div className="sourceBox">
            <div className="eyebrow">Bron</div>
            <div className="titleXs">{rumour.source_name}</div>
          </div>
        ) : null}
      </div>
      <p className="bodyText">{rumour.summary}</p>
      <div className="row between center wrap topBorder">
        <div className="row gap8 wrap">
          <span className="metric"><ThumbsUp size={16} /> {rumour.score}</span>
          <span className="metric"><MessageSquare size={16} /> {rumour.comments_count}</span>
        </div>
        <Link href={`/club/${club.slug}#${rumour.id}`} className="button button-dark">Bekijk</Link>
      </div>
    </div>
  );
}
