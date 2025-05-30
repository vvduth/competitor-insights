import { Router } from 'express';
import { fetchBusinessProfile, fetchSearchResults } from '../controllers/businessController';

const router = Router();

// Route to get a business profile by name or website
router.get('/:identifier', fetchBusinessProfile);
router.post('/', fetchSearchResults) 


export default router;