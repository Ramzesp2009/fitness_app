import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pkg from 'pg';
const { Pool } = pkg;

const router = express.Router();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) 
            return res.status(400).json({ message: 'All fields are required' });

        const hashed = await bcrypt.hash(password, 10);

        const { rows } = await pool.query(
            `INSERT INTO users (username, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, username, email, created_at`,
            [username, email, hashed]
        );

        const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        res.status(201).json({ user: rows[0], token });
    } catch (err) {
        if (err.code === '23505') 
            return res.status(409).json({ error: 'Email or username already exists' });
        res.status(500).json({ error: err.message });
    }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const { rows } = await pool.query(
            'SELECT * FROM users WHERE email = $1',
            [email]
        );

        if (!rows.length)
            return res.status(401).json({ message: 'Invalid email or password' });

        const valid = await bcrypt.compare(password, rows[0].password);
        if (!valid)
            return res.status(401).json({ message: 'Invalid email or password' });

        const token = jwt.sign({ userId: rows[0].id }, process.env.JWT_SECRET, {
            expiresIn: '30d'
        });

        const { password: _, ...user } = rows[0];
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;