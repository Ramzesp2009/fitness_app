import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// all routes are protected
router.use(authMiddleware);

// GET /api/workouts - get all workouts for the authenticated user
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query(
            `SELECT * FROM workouts 
             WHERE user_id = $1 
             ORDER BY created_at DESC
             LIMIT 20`,
            [req.user.id]
        );
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/workouts - create a new workout
router.post('/', async (req, res) => {
    try {
        const { name, date, notes, program_id } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO workouts (user_id, name, date, notes, program_id)
             VALUES ($1, $2, $3, $4, $5)
             RETURNING *`,
            [req.user.id, name, date || new Date(), notes, program_id || null]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /api/workouts/:id/sets - add a sets to a workout
router.post('/:id/sets', async (req, res) => {
    try {
        const { exercise_id, set_number, reps, weight_kg, rpe } = req.body;

        const { rows } = await pool.query(
            `INSERT INTO workout_sets
             (workout_id, exercise_id, set_number, reps, weight_kg, rpe)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [req.params.id, exercise_id, set_number, reps, weight_kg, rpe]
        );
        res.status(201).json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;