import { Request, Response } from 'express';

import { AiService } from '../services/aiService';
import { BusinessProfile } from '../types';
const aiService = AiService.getInstance();

export const suggestBusinessProfiles = async (req: Request, res: Response): Promise<void> => {
    try {
        const  profile  = req.body as BusinessProfile;
    
        if (!profile) {
        res.status(400).json({ error: 'At least two business profiles are required for comparison' });
        return;
        }
    
      
    
        // Generate AI response for comparison
        const aiResponse = await aiService.generateResponse(profile);
        
        res.status(200).json(aiResponse);
    } catch (error) {
        console.error('Error comparing business profiles:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

