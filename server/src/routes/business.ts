import { Router } from 'express';
import { fetchBusinessProfile } from '../controllers/businessController';

const router = Router();

// Route to get a business profile by name or website
router.get('/:identifier', fetchBusinessProfile);

// Route to update a business profile
router.put('/:identifier', () => {});

export default router;