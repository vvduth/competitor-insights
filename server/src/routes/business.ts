import { Router } from 'express';
import { fetchBusinessProfile, fetchBusinessProfileFromAPI, fetchNearByCompetitorsFromAPI, fetchSearchResults } from '../controllers/businessController';

const router = Router();

// Route to get a business profile by name or website
router.get('/mock/:identifier', fetchBusinessProfile);
router.get('/:cid', fetchBusinessProfileFromAPI);
router.post('/', fetchSearchResults) 
router.post('/competitors', fetchNearByCompetitorsFromAPI);


export default router;