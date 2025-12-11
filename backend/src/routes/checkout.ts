import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth.js';
import { db } from '../db/memory.js';

const router = Router();

router.post('/:id', requireAuth, (req: AuthRequest, res) => {
  const beat = db.findBeatById(req.params.id);
  if (!beat) return res.status(404).json({ message: 'Beat not found' });
  const purchase = db.createPurchase(req.user!.sub, beat.id, beat.price);
  res.json({ purchase, downloadUrl: beat.audioUrl });
});

export default router;


