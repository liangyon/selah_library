import express  from "express";
import { listFiles } from "../controllers/driveController";
import { authenticate } from '../middleware/authMiddleware';

const router= express.Router();

router.get("/files", authenticate, listFiles);

export default router;
