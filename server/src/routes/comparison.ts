import { Router } from 'express';
import { suggestBusinessProfiles } from '../controllers/comparisonController';


const router = Router();

// Route to compare business profiles
router.post('/compare', () => {});

router.post('/suggestions', suggestBusinessProfiles);

export default router;