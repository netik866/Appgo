export type CategoryType = 'cafe' | 'library' | 'coworking' | 'bookstore' | 'other';

export type WifiQuality = 'Fast & Reliable' | 'Decent' | 'Unreliable' | 'None';

export type OutletAvailability = 'Plenty' | 'Some' | 'None';

export type NoiseLevel = 'Silent' | 'Quiet' | 'Moderate' | 'Lively';

export type PriceOfEntry = 'Free' | 'Must buy something' | 'Paid membership';

export interface Spot {
  id: string;
  name: string;
  address: string;
  neighborhood: string;
  city: string;
  category: CategoryType;
  wifiQuality: WifiQuality;
  wifiSpeedMbps?: number;
  outletAvailability: OutletAvailability;
  noiseLevel: NoiseLevel;
  seatingComfort: number; // 1 to 5
  priceOfEntry: PriceOfEntry;
  hours: string;
  photos: string[];
  shortDescription: string;
  insiderTip?: string;
  submittedBy: string;
  dateAdded: string;
  visitorRating: number; // e.g. 4.8
  reviewCount: number;
  upvotes: number;
  amenities: string[];
  phone?: string;
  website?: string;
  coordinates?: { lat: number; lng: number };
}

export interface FilterOptions {
  searchQuery: string;
  city: string;
  category: string;
  wifiQuality: string;
  noiseLevel: string;
  priceOfEntry: string;
  outletAvailability: string;
  minComfort: number;
  sortBy: 'rating' | 'newest' | 'alphabetical' | 'comfort' | 'quietest';
}
