import { Club, Rumour } from './types';

export const clubs: Club[] = [
  { id: '1', slug: 'ajax', name: 'Ajax', league: 'Eredivisie', short_code: 'AJA', logo_path: '/logos/eredivisie/ajax.png', primary_color: '#d71920', stadium: 'Johan Cruijff ArenA', manager_name: 'Clubbeheerder Ajax', is_active: true },
  { id: '2', slug: 'psv', name: 'PSV', league: 'Eredivisie', short_code: 'PSV', logo_path: '/logos/eredivisie/psv.png', primary_color: '#d71920', stadium: 'Philips Stadion', manager_name: 'Clubbeheerder PSV', is_active: true },
  { id: '3', slug: 'feyenoord', name: 'Feyenoord', league: 'Eredivisie', short_code: 'FEY', logo_path: '/logos/eredivisie/feyenoord.png', primary_color: '#c8102e', stadium: 'De Kuip', manager_name: 'Clubbeheerder Feyenoord', is_active: true },
  { id: '4', slug: 'ado-den-haag', name: 'ADO Den Haag', league: 'Keuken Kampioen Divisie', short_code: 'ADO', logo_path: '/logos/kkd/ado-den-haag.png', primary_color: '#0b7f3f', stadium: 'Bingoal Stadion', manager_name: 'Clubbeheerder ADO', is_active: true },
  { id: '5', slug: 'de-graafschap', name: 'De Graafschap', league: 'Keuken Kampioen Divisie', short_code: 'DEG', logo_path: '/logos/kkd/de-graafschap.png', primary_color: '#0044aa', stadium: 'De Vijverberg', manager_name: 'Clubbeheerder De Graafschap', is_active: true }
];

export const rumours: Rumour[] = [
  {
    id: 'r1', club_id: '1', player_name: 'Oliver Antman', from_club: 'Go Ahead Eagles', to_clubs: ['Ajax', 'AZ'], status: 'Gerucht', reliability: 'Middel', source_name: 'Voetbal International', source_url: '#', summary: 'Ajax volgt de situatie van Antman en verwacht stevige concurrentie.', body: 'Ajax volgt de situatie van Oliver Antman en wil snel schakelen als de markt voor buitenspelers verder openbreekt.', featured: true, score: 24, comments_count: 18, image_url: null, created_at: new Date().toISOString()
  },
  {
    id: 'r2', club_id: '2', player_name: 'Yarek Gasiorowski', from_club: 'Valencia', to_clubs: ['PSV'], status: 'Bijna rond', reliability: 'Hoog', source_name: 'De Telegraaf', source_url: '#', summary: 'PSV zit in een vergevorderde fase voor defensieve versterking.', body: 'PSV zit in een vergevorderde fase voor defensieve versterking en wil de deal deze maand afronden.', featured: true, score: 38, comments_count: 31, image_url: null, created_at: new Date().toISOString()
  },
  {
    id: 'r3', club_id: '3', player_name: 'Gustaf Nilsson', from_club: 'Club Brugge', to_clubs: ['Feyenoord'], status: 'Gerucht', reliability: 'Middel', source_name: 'AD Sportwereld', source_url: '#', summary: 'Feyenoord bekijkt extra diepte voorin en houdt meerdere profielen open.', body: 'Feyenoord bekijkt extra diepte voorin en houdt meerdere profielen open.', featured: true, score: 21, comments_count: 14, image_url: null, created_at: new Date().toISOString()
  },
  {
    id: 'r4', club_id: '4', player_name: 'Eliano Reijnders', from_club: 'PEC Zwolle', to_clubs: ['ADO Den Haag', 'FC Volendam'], status: 'Gerucht', reliability: 'Laag', source_name: 'ESPN NL', source_url: '#', summary: 'ADO oriënteert zich breed op creatieve versterking voor het middenveld.', body: 'ADO oriënteert zich breed op creatieve versterking voor het middenveld.', featured: false, score: 9, comments_count: 7, image_url: null, created_at: new Date().toISOString()
  }
];
