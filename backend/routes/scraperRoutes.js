import { Router } from "express";
import { getCodeforcesProfile } from '../controllers/scraperController.js';
import { getLeetcodeProfile } from '../controllers/leetcodeScraper.js';

const router = Router();
router.get('/codeforces-profile/:username', getCodeforcesProfile);
router.get('/leetcode-profile/:username', getLeetcodeProfile);

export default router;