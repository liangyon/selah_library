import express, { Request, Response } from 'express';
import cors from 'cors';
import dataRoutes from './routes/dataRoutes';
import sequelize from './config/database';
import authRoutes from './routes/authRoutes';
import musicRoutes from './routes/musicRoutes'
import User from './models/User'

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
app.use(cors());

// Routes
app.use('/api', dataRoutes);
app.use('/auth', authRoutes);
app.use('/music', musicRoutes);

// Routes
app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Express with TypeScript!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});