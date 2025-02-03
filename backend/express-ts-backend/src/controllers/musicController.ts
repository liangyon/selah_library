import { Request, Response } from 'express';
import Music from '../models/Music';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Configure multer for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = 'uploads/pdfs';
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Create unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

export const createMusic = async (req: Request, res: Response) => {
  try {
    const { name, author } = req.body;
    const pdfPath = req.file ? req.file.path : null;

    const music = await Music.create({
      name,
      author,
      pdfPath
    });

    res.status(201).json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating music entry' });
  }
};

export const getMusicById = async (req: Request, res: Response): Promise<any> => {
  try {
    const music = await Music.findByPk(req.params.id);
    if (!music) {
      return res.status(404).json({ error: 'Music not found' });
    }
    res.json(music);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error retrieving music' });
  }
};