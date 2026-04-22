import { clubs as fallbackClubs, rumours as fallbackRumours } from './fallback-data';
import { Club, Rumour } from './types';
import { createClient } from './supabase-server';

export async function getClubs(): Promise<Club[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return fallbackClubs;
    const supabase = await createClient();
    const { data, error } = await supabase.from('clubs').select('*').eq('is_active', true).order('league').order('name');
    if (error || !data) return fallbackClubs;
    return data as Club[];
  } catch {
    return fallbackClubs;
  }
}

export async function getRumours(limit?: number): Promise<Rumour[]> {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) return typeof limit === 'number' ? fallbackRumours.slice(0, limit) : fallbackRumours;
    const supabase = await createClient();
    let query = supabase.from('rumours').select('*').order('featured', { ascending: false }).order('created_at', { ascending: false });
    if (typeof limit === 'number') query = query.limit(limit);
    const { data, error } = await query;
    if (error || !data) return typeof limit === 'number' ? fallbackRumours.slice(0, limit) : fallbackRumours;
    return data as Rumour[];
  } catch {
    return typeof limit === 'number' ? fallbackRumours.slice(0, limit) : fallbackRumours;
  }
}

export async function getClubBySlug(slug: string): Promise<Club | null> {
  const list = await getClubs();
  return list.find((club) => club.slug === slug) || null;
}

export async function getRumoursByClub(clubId: string): Promise<Rumour[]> {
  const list = await getRumours();
  return list.filter((rumour) => rumour.club_id === clubId);
}
