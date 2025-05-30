import {
  BusinessProfile,
  convertGooglePlaceToBusinessProfile,
  GooglePlaceResult,
} from "../types";
import axios from "axios";
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

  async getSearchResults(businessName: string) {
    let data = JSON.stringify({
      q: businessName,
      gl: "fi",
    });
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/places",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY || "",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      if (response.data) {
        const places = response.data.places;
        return places;
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      return mockBusinesses;
    }
  }

  async getBusinessProfileFromAPI(cid: string) {
    let data = JSON.stringify({
      cid: cid,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/maps",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY || "",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      const place = response.data.places[0] as GooglePlaceResult;
      return convertGooglePlaceToBusinessProfile(place);
    } catch (error) {
      console.error("Error fetching business profile:", error);
      return null;
    }
  }

  async getNearbyCompetitorFromApi(query: string, latitude: number, longtidue: number) {
    // Find businesses in same category, excluding target
    let data = JSON.stringify({
      q: query,
      ll: `@${latitude},${longtidue},17z`,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://google.serper.dev/maps",
      headers: {
        "X-API-KEY": process.env.SERPER_API_KEY || "",
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      const places = response.data.places as GooglePlaceResult[];
      const competitors = places
        .map((place) => convertGooglePlaceToBusinessProfile(place));
      return competitors;
    } catch (error) {
      console.error("Error fetching competitors:", error);
      return [];
    }
  }
}

export default BusinessService;
