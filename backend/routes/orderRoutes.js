import { Router } from "express";
import order from "../controllers/orderController.js";

const router = Router();

router.post("/create-order", order);

export default router;