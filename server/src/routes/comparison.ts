import { Router } from 'express';
import { compareBusinessProfiles, suggestBusinessProfiles } from '../controllers/comparisonController';


const router = Router();

// Route to compare business profiles
router.post('/comparison/compare', compareBusinessProfiles);

router.post('/suggestions', suggestBusinessProfiles);

export default router;