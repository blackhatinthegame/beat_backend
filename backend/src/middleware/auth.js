import jwt from 'jsonwebtoken';
import { config } from '../config.js';
import { db } from '../db/memory.js';
export function requireAuth(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return res.status(401).json({ message: 'Missing auth header' });
    const [, token] = header.split(' ');
    if (!token)
        return res.status(401).json({ message: 'Invalid auth header' });
    try {
        const payload = jwt.verify(token, config.jwtAccessSecret);
        req.user = { sub: payload.sub, role: payload.role };
        return next();
    }
    catch {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
}
export function requireRole(...roles) {
    return (req, res, next) => {
        if (!req.user)
            return res.status(401).json({ message: 'Unauthorized' });
        if (!roles.includes(req.user.role))
            return res.status(403).json({ message: 'Forbidden' });
        return next();
    };
}
export function attachUser(req, res, next) {
    const header = req.headers.authorization;
    if (!header)
        return next();
    const [, token] = header.split(' ');
    if (!token)
        return next();
    try {
        const payload = jwt.verify(token, config.jwtAccessSecret);
        req.user = { sub: payload.sub, role: payload.role };
    }
    catch {
        // ignore token errors for optional auth
    }
    return next();
}
export function ensureUserExists(req, res, next) {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    const user = db.findUserById(req.user.sub);
    if (!user)
        return res.status(401).json({ message: 'User not found' });
    return next();
}
//# sourceMappingURL=auth.js.map