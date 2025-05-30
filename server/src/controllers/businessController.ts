import { Request, Response } from 'express';
import BusinessService from '../services/businessDataService';
const businessService = new BusinessService();

export const fetchBusinessProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier } = req.params;
    
    if (!identifier) {
      res.status(400).json({ error: 'Business identifier is required' });
      return;
    }

    const business = await businessService.searchBusiness(identifier);
    
    if (!business) {
      res.status(404).json({ error: 'Business not found' });
      return;
    }

    res.status(200).json(
     business
    );
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const fetchSearchResults = async (req: Request, res: Response): Promise<void> => {
  try {
    const { businessName } = req.body;

    if (!businessName) {
      res.status(400).json({ error: 'Business name is required' });
      return;
    }

    const results = await businessService.getSearchResults(businessName);
    
    if (!results || results.length === 0) {
      res.status(404).json({ error: 'No search results found' });
      return;
    }

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const fetchBusinessProfileFromAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { cid } = req.params;
    if (!cid) {
      res.status(400).json({ error: 'Business CID is required' });
      return;
    }
    const businessProfile = await businessService.getBusinessProfileFromAPI(cid);
    
    if (!businessProfile) {
      res.status(404).json({ error: 'Business profile not found' });
      return;
    }

    const query = businessProfile.amenities?.join(' ') || '';
    console.log('Query for nearby competitors:', query);
    res.status(200).json(businessProfile);
  } catch (error) {
    console.error('Error fetching business profile from API:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

export const fetchNearByCompetitorsFromAPI = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query, latitude, longitude } = req.body;
    console.log('Received query:', query);
    console.log('Received latitude:', latitude);
    console.log('Received longitude:', longitude);

    if (!query) {
      res.status(400).json({ error: 'Query is required' });
      return;
    }
    
    if (!latitude || !longitude) {
      res.status(400).json({ error: 'Latitude and longitude are required' });
      return;
    }

    const competitors = await businessService.getNearbyCompetitorFromApi(query,latitude, longitude);
    
    if (!competitors || competitors.length === 0) {
      res.status(404).json({ error: 'No competitors found' });
      return;
    }

    res.status(200).json(competitors);
  } catch (error) {
    console.error('Error fetching nearby competitors:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}