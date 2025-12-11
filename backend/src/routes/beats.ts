import { Router } from 'express';
import { z } from 'zod';
import { db } from '../db/memory.js';
import { requireAuth, requireRole, AuthRequest } from '../middleware/auth.js';
import { upload, publicUrl } from '../storage/local.js';

const router = Router();

const createSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  genre: z.string(),
  mood: z.string().optional(),
  key: z.string().optional(),
  bpm: z.coerce.number().int().min(40).max(240),
  price: z.coerce.number().min(0)
});

router.post(
  '/create',
  requireAuth,
  requireRole('CREATOR', 'ADMIN'),
  upload.fields([
    { name: 'audio', maxCount: 1 },
    { name: 'cover', maxCount: 1 }
  ]),
  (req: AuthRequest, res) => {
    const parse = createSchema.safeParse(req.body);
    if (!parse.success) return res.status(400).json({ errors: parse.error.flatten() });
    const audio = (req.files as any)?.audio?.[0];
    const cover = (req.files as any)?.cover?.[0];
    if (!audio || !cover) return res.status(400).json({ message: 'Audio and cover are required' });
    const beat = db.createBeat({
      ...parse.data,
      audioUrl: publicUrl(audio.filename),
      coverUrl: publicUrl(cover.filename),
      creatorId: req.user!.sub
    });
    return res.status(201).json(beat);
  }
);

router.get('/list', (req, res) => {
  const { search, genre, mood, bpmMin, bpmMax, sort } = req.query;
  let results = db.listBeats();
  if (search) {
    const term = String(search).toLowerCase();
    results = results.filter(b => b.title.toLowerCase().includes(term) || b.genre.toLowerCase().includes(term));
  }
  if (genre) results = results.filter(b => b.genre === genre);
  if (mood) results = results.filter(b => b.mood === mood);
  if (bpmMin) results = results.filter(b => b.bpm >= Number(bpmMin));
  if (bpmMax) results = results.filter(b => b.bpm <= Number(bpmMax));
  if (sort === 'price_asc') results = [...results].sort((a, b) => a.price - b.price);
  if (sort === 'price_desc') results = [...results].sort((a, b) => b.price - a.price);
  if (sort === 'newest') results = [...results].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  res.json(results);
});

router.get('/search', (req, res) => {
  return router.handle({ ...req, url: '/list', method: 'GET' } as any, res, () => {});
});

router.get('/:id', (req, res) => {
  const beat = db.findBeatById(req.params.id);
  if (!beat) return res.status(404).json({ message: 'Not found' });
  res.json(beat);
});

export default router;


