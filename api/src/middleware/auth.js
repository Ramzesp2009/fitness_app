import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer '))
        return res.status(401).json({ error: 'Unauthorized' });

    try {
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ error: 'Unauthorized' });
    }
}