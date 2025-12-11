import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { db } from '../db/memory.js';
const router = Router();
router.post('/:id', requireAuth, (req, res) => {
    const beatId = req.params.id;
    const beat = db.findBeatById(beatId);
    if (!beat)
        return res.status(404).json({ message: 'Beat not found' });
    const added = db.toggleFavorite(req.user.sub, beatId);
    res.json({ favorited: added });
});
router.get('/', requireAuth, (req, res) => {
    const favs = db.listFavorites(req.user.sub);
    res.json(favs);
});
export default router;
//# sourceMappingURL=favorites.js.map