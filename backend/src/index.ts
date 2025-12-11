import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import { config, uploadDirPath } from './config.js';
import authRoutes from './routes/auth.js';
import beatRoutes from './routes/beats.js';
import favoriteRoutes from './routes/favorites.js';
import checkoutRoutes from './routes/checkout.js';
import userRoutes from './routes/user.js';

const app = express();

// Allow cross-origin asset serving (covers /uploads for the frontend origin)
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false
  })
);

app.use('/uploads', express.static(uploadDirPath));

app.use('/auth', authRoutes);
app.use('/beats', beatRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/checkout', checkoutRoutes);
app.use('/user', userRoutes);

app.get('/health', (_, res) => res.json({ ok: true }));

app.use((_, res) => res.status(404).json({ message: 'Not found' }));

app.listen(config.port, () => {
  console.log(`API running on http://localhost:${config.port}`);
});


