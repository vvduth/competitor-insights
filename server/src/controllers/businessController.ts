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

    res.status(200).json({
      success: true,
      data: business
    });
  } catch (error) {
    console.error('Error fetching business profile:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};