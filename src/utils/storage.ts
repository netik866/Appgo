import { Spot } from '../types';
import { INITIAL_SPOTS } from '../data/mockSpots';

const SPOTS_KEY = 'worknook_custom_spots_v1';
const SAVED_SPOTS_KEY = 'worknook_saved_spots_v1';
const UPVOTED_SPOTS_KEY = 'worknook_upvoted_spots_v1';

export function getAllSpots(): Spot[] {
  try {
    const stored = localStorage.getItem(SPOTS_KEY);
    if (!stored) {
      return INITIAL_SPOTS;
    }
    const customSpots: Spot[] = JSON.parse(stored);
    // Combine custom spots (prefixed first) with initial spots
    return [...customSpots, ...INITIAL_SPOTS];
  } catch (e) {
    console.error('Failed to load spots from storage', e);
    return INITIAL_SPOTS;
  }
}

export function saveNewSpot(newSpot: Spot): void {
  try {
    const stored = localStorage.getItem(SPOTS_KEY);
    const customSpots: Spot[] = stored ? JSON.parse(stored) : [];
    customSpots.unshift(newSpot);
    localStorage.setItem(SPOTS_KEY, JSON.stringify(customSpots));
  } catch (e) {
    console.error('Failed to save spot', e);
  }
}

export function getSavedSpotIds(): string[] {
  try {
    const stored = localStorage.getItem(SAVED_SPOTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function toggleSavedSpotId(id: string): string[] {
  try {
    const saved = getSavedSpotIds();
    const updated = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
    localStorage.setItem(SAVED_SPOTS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    return [];
  }
}

export function getUpvotedSpotIds(): string[] {
  try {
    const stored = localStorage.getItem(UPVOTED_SPOTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function toggleUpvoteSpotId(id: string): { upvoted: boolean; allUpvoted: string[] } {
  try {
    const upvoted = getUpvotedSpotIds();
    const isCurrentlyUpvoted = upvoted.includes(id);
    const updated = isCurrentlyUpvoted ? upvoted.filter(item => item !== id) : [...upvoted, id];
    localStorage.setItem(UPVOTED_SPOTS_KEY, JSON.stringify(updated));
    return { upvoted: !isCurrentlyUpvoted, allUpvoted: updated };
  } catch (e) {
    return { upvoted: false, allUpvoted: [] };
  }
}
