import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { db } from '../db/memory.js';
const router = Router();
router.get('/profile', requireAuth, (req, res) => {
    const user = db.findUserById(req.user.sub);
    if (!user)
        return res.status(404).json({ message: 'Not found' });
    res.json({ id: user.id, email: user.email, displayName: user.displayName, role: user.role, avatarUrl: user.avatarUrl });
});
router.get('/beats', requireAuth, (req, res) => {
    const beats = db.listBeats().filter(b => b.creatorId === req.user.sub);
    res.json(beats);
});
export default router;
//# sourceMappingURL=user.js.map