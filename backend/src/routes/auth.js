import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { db } from '../db/memory.js';
import { config } from '../config.js';
const router = Router();
const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    displayName: z.string().min(2),
    role: z.enum(['ADMIN', 'CREATOR', 'LISTENER']).default('LISTENER')
});
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
function signAccess(id, role) {
    return jwt.sign({ sub: id, role }, config.jwtAccessSecret, { expiresIn: config.accessTokenTtl });
}
function signRefresh(id, role) {
    return jwt.sign({ sub: id, role }, config.jwtRefreshSecret, { expiresIn: config.refreshTokenTtl });
}
router.post('/signup', (req, res) => {
    const parse = signupSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ errors: parse.error.flatten() });
    const { email, password, displayName, role } = parse.data;
    const existing = db.findUserByEmail(email);
    if (existing)
        return res.status(409).json({ message: 'Email already registered' });
    const passwordHash = bcrypt.hashSync(password, 10);
    const user = db.createUser({ email, passwordHash, displayName, role, avatarUrl: undefined, refreshToken: undefined });
    const accessToken = signAccess(user.id, user.role);
    const refreshToken = signRefresh(user.id, user.role);
    db.saveRefreshToken(user.id, refreshToken);
    return res.status(201).json({ user: { id: user.id, email, displayName, role }, accessToken, refreshToken });
});
router.post('/login', (req, res) => {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success)
        return res.status(400).json({ errors: parse.error.flatten() });
    const { email, password } = parse.data;
    const user = db.findUserByEmail(email);
    if (!user)
        return res.status(401).json({ message: 'Invalid credentials' });
    const valid = bcrypt.compareSync(password, user.passwordHash);
    if (!valid)
        return res.status(401).json({ message: 'Invalid credentials' });
    const accessToken = signAccess(user.id, user.role);
    const refreshToken = signRefresh(user.id, user.role);
    db.saveRefreshToken(user.id, refreshToken);
    return res.json({ user: { id: user.id, email, displayName: user.displayName, role: user.role }, accessToken, refreshToken });
});
router.post('/refresh', (req, res) => {
    const token = req.body.refreshToken;
    if (!token)
        return res.status(400).json({ message: 'Missing refresh token' });
    try {
        const payload = jwt.verify(token, config.jwtRefreshSecret);
        const user = db.findUserById(payload.sub);
        if (!user || user.refreshToken !== token)
            throw new Error('invalid');
        const accessToken = signAccess(user.id, user.role);
        const refreshToken = signRefresh(user.id, user.role);
        db.saveRefreshToken(user.id, refreshToken);
        return res.json({ accessToken, refreshToken });
    }
    catch {
        return res.status(401).json({ message: 'Invalid refresh token' });
    }
});
router.post('/logout', (req, res) => {
    const token = req.body.refreshToken;
    if (token) {
        try {
            const payload = jwt.verify(token, config.jwtRefreshSecret);
            db.saveRefreshToken(payload.sub, undefined);
        }
        catch {
            // ignore
        }
    }
    return res.json({ success: true });
});
export default router;
//# sourceMappingURL=auth.js.map