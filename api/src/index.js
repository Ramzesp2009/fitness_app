import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import workoutRoutes from './routes/workouts.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/workouts', workoutRoutes);

// Health check endpoint
app.get('/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => console.log(`API server running on port ${PORT}`));