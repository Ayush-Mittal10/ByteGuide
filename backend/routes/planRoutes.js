import { Router } from "express";
import { subscribeUser, getPlans } from "../controllers/planController.js";

const router = Router();

router.post('/subscribe', subscribeUser);
router.get('/plans', getPlans);

export default router;