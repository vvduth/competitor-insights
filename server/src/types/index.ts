// This file is intentionally left blank.
// server/src/types/business.ts
export interface BusinessProfile {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  photoCount: number;
  address: string;
  phone?: string;
  website?: string;
  hours?: BusinessHours;
  description?: string;
  amenities: string[];
  priceLevel?: number;
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
  recommendations: AIRecommendation[];
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

export interface AIRecommendation {
  category: 'photos' | 'reviews' | 'info' | 'engagement' | 'visibility';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  actionItems: string[];
}