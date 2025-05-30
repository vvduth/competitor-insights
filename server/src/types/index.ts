export interface GooglePlaceHours {
  Friday?: string;
  Saturday?: string;
  Sunday?: string;
  Monday?: string;
  Tuesday?: string;
  Wednesday?: string;
  Thursday?: string;
}

export interface GooglePlaceResult {
  position: number;
  title: string;
  address: string;
  latitude: number;
  longitude: number;
  rating: number;
  ratingCount: number;
  priceLevel: string;
  type: string;
  types: string[];
  website?: string;
  phoneNumber?: string;
  menu?: string;
  openingHours?: GooglePlaceHours;
  thumbnailUrl?: string;
  cid: string;
  fid: string;
  placeId: string;
}

export interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  photoCount?: number;
  address: string;
  menuLink?: string;
  phone?: string;
  website?: string;
  hours?: BusinessHours;
  description?: string;
  amenities: string[];
  priceLevel?: number |string;
  isVerified: boolean;
  lastUpdated: Date;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface CompetitorAnalysis {
  targetBusiness: BusinessProfile;
  competitors: BusinessProfile[];
  comparison: BusinessComparison;
  profileScore: number;
}

export interface BusinessComparison {
  avgCompetitorRating: number;
  avgCompetitorReviews: number;
  avgCompetitorPhotos: number;
  ratingPosition: number;
  reviewPosition: number;
  photoPosition: number;
  missingFields: string[];
  strongPoints: string[];
}

// Utility function to convert Google Place to BusinessProfile
export function convertGooglePlaceToBusinessProfile(place: GooglePlaceResult): BusinessProfile {
  return {
    id: place.cid,
    name: place.title,
    category: place.type,
    rating: place.rating,
    reviewCount: place.ratingCount,
    photoCount: place.thumbnailUrl ? 1 : 0, // We don't have exact photo count from this API
    address: place.address,
    phone: place.phoneNumber || '',
    menuLink: place.menu || '', // Not always provided
    website: place.website,
    description: '', // Not provided by this API response
    hours: {
      monday: place.openingHours?.Monday || 'Closed',
      tuesday: place.openingHours?.Tuesday || 'Closed',
      wednesday: place.openingHours?.Wednesday || 'Closed',
      thursday: place.openingHours?.Thursday || 'Closed',
      friday: place.openingHours?.Friday || 'Closed',
      saturday: place.openingHours?.Saturday || 'Closed',
      sunday: place.openingHours?.Sunday || 'Closed',
    },
    amenities: place.types || [],
    priceLevel: place.priceLevel,
    isVerified: true, // Assume Google Places are verified
    lastUpdated: new Date(),
  };
}

