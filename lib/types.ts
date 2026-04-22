export type Club = {
  id: string;
  slug: string;
  name: string;
  league: 'Eredivisie' | 'Keuken Kampioen Divisie';
  short_code: string;
  logo_path: string | null;
  primary_color: string | null;
  stadium: string | null;
  manager_name: string | null;
  is_active: boolean;
};

export type Rumour = {
  id: string;
  club_id: string;
  player_name: string;
  from_club: string;
  to_clubs: string[];
  status: 'Gerucht' | 'Bijna rond' | 'Bevestigd' | 'Afgeketst' | 'Verlengd';
  reliability: 'Laag' | 'Middel' | 'Hoog';
  source_name: string;
  source_url: string;
  summary: string;
  body: string;
  featured: boolean;
  score: number;
  comments_count: number;
  image_url: string | null;
  created_at: string;
};
