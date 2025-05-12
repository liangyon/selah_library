import express, { Request, Response } from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import musicRoutes from './routes/musicRoutes'
import driveRoutes from "./routes/driveRoutes";

import { authorize } from './config/googleAuth';
import { listFiles } from './controllers/driveController';

const app = express();
const PORT = 5000;

// Database
sequelize
  .authenticate()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch((err) => console.error('PostgreSQL connection error:', err));

sequelize
  .sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Database sync error:', err));

// Middleware
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // Update with your frontend URL
  credentials: true, // Allow cookies if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Ensure headers are allowed
}));

// Routes
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);
app.use('/music', musicRoutes);
app.use("/drive", driveRoutes);


// authorize().then(listFiles).catch(console.error);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});