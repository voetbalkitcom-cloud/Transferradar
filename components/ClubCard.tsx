import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Club, Rumour } from '@/lib/types';
import LogoBadge from './LogoBadge';

export default function ClubCard({ club, highlight }: { club: Club; highlight?: Rumour }) {
  return (
    <Link href={`/club/${club.slug}`} className="card clubCard">
      <div className="row between start gap16">
        <div className="row gap12">
          <LogoBadge name={club.name} shortCode={club.short_code} logoPath={club.logo_path} primaryColor={club.primary_color} />
          <div>
            <div className="titleSm">{club.name}</div>
            <div className="mutedText">{club.league}</div>
          </div>
        </div>
        <ArrowRight size={18} className="mutedIcon" />
      </div>
      {highlight ? (
        <div className="subCard">
          <div className="eyebrow">Top gerucht</div>
          <div className="titleXs">{highlight.player_name}</div>
          <div className="mutedText">{highlight.summary}</div>
        </div>
      ) : null}
    </Link>
  );
}
