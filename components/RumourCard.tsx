import Badge from '@/components/Badge';
import LogoBadge from '@/components/LogoBadge';

type RumourCardProps = {
  rumour: {
    id: string;
    player_name: string;
    from_club: string;
    to_clubs: string[];
    status: string;
    reliability: string;
    source_name?: string | null;
    source_url?: string | null;
    summary: string;
    body?: string | null;
    featured?: boolean;
    score: number;
    comments_count: number;
  };
  club: {
    name: string;
    short_code?: string | null;
    logo_path?: string | null;
    primary_color?: string | null;
  };
};

function getReliabilityTone(value: string) {
  if (value === 'Hoog') return 'success';
  if (value === 'Laag') return 'danger';
  return 'neutral';
}

export default function RumourCard({ rumour, club }: RumourCardProps) {
  return (
    <article className="premiumRumourCard">
      <div className="premiumRumourTop">
        <div className="row gap12 center wrap">
          <Badge tone="dark">{rumour.status}</Badge>
          <Badge tone={getReliabilityTone(rumour.reliability)}>
            Betrouwbaarheid: {rumour.reliability}
          </Badge>
          {rumour.featured ? <Badge tone="warning">Uitgelicht</Badge> : null}
        </div>

        <div className="premiumRumourMetrics">
          <div className="premiumRumourMetric">Score {rumour.score}</div>
          <div className="premiumRumourMetric">{rumour.comments_count} reacties</div>
        </div>
      </div>

      <div className="premiumRumourBody">
        <div className="premiumRumourClub">
          <LogoBadge
            name={club.name}
            shortCode={club.short_code}
            logoPath={club.logo_path}
            primaryColor={club.primary_color}
            size={60}
          />
          <div>
            <div className="premiumRumourClubName">{club.name}</div>
            <div className="premiumRumourMetaLine">
              {rumour.from_club} → {rumour.to_clubs.join(', ')}
            </div>
          </div>
        </div>

        <h3 className="premiumRumourTitle">{rumour.player_name}</h3>
        <p className="premiumRumourSummary">{rumour.summary}</p>

        {rumour.body ? (
          <div className="premiumRumourDetail">{rumour.body}</div>
        ) : null}
      </div>

      <div className="premiumRumourFooter">
        <div className="premiumRumourSource">
          <div className="premiumRumourSourceLabel">Bron</div>
          <div className="premiumRumourSourceName">
            {rumour.source_name || 'Onbekend'}
          </div>
        </div>

        {rumour.source_url ? (
          <a
            href={rumour.source_url}
            target="_blank"
            rel="noreferrer"
            className="premiumRumourLink"
          >
            Open bron
          </a>
        ) : null}
      </div>
    </article>
  );
}
