import fs from 'fs';
import path from 'path';
import multer from 'multer';
import { config, uploadDirPath } from '../config.js';

const ensureDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

ensureDir(uploadDirPath);

export const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, uploadDirPath),
    filename: (_, file, cb) => {
      const ext = path.extname(file.originalname);
      const base = path.basename(file.originalname, ext).replace(/\s+/g, '-').toLowerCase();
      cb(null, `${base}-${Date.now()}${ext}`);
    }
  }),
  limits: {
    fileSize: 50 * 1024 * 1024
  }
});

export const publicUrl = (filename: string) => `/uploads/${filename}`;


