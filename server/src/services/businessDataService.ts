import {
  BusinessComparison,
  BusinessProfile,
  CompetitorAnalysis,
  AIRecommendation,
} from "../types";
import { mockBusinesses } from "../utils/mockData";

class BusinessService {
  private businesses = mockBusinesses;

  async searchBusiness(businessName: string): Promise<BusinessProfile | null> {
    // In production, this would call Google Places API
    const business = this.businesses.find((b) =>
      b.name.toLowerCase().includes(businessName.toLowerCase())
    );
    return business || null;
  }

  async findCompetitors(
    targetBusiness: BusinessProfile
  ): Promise<BusinessProfile[]> {
    // Find businesses in same category, excluding target
    return this.businesses.filter(
      (b) =>
        b.id !== targetBusiness.id &&
        (b.category === targetBusiness.category ||
          b.category.includes("Pizza") ||
          b.category.includes("Italian"))
    );
  }
}

export default BusinessService;
