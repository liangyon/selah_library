import express from 'express';
import { createMusic, getMusicById, upload } from '../controllers/musicController';

const router = express.Router();

// POST endpoint to create music with PDF
router.post('/music', upload.single('pdf'), createMusic);

// GET endpoint to retrieve music with PDF path
router.get('/music/:id', getMusicById);

export default router;