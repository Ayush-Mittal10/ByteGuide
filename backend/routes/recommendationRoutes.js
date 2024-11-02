import { Router } from 'express';
import { getRecommendations } from '../controllers/userController.js';

const router = Router();

router.post('/get-recommendations', getRecommendations);

export default router;
