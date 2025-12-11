import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const uploadDir = process.env.UPLOAD_DIR || 'uploads';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// project root is one level above src/
const projectRoot = path.resolve(__dirname, '..');
export const uploadDirPath = path.isAbsolute(uploadDir) ? uploadDir : path.resolve(projectRoot, uploadDir);
export const config = {
    port: Number(process.env.PORT || 4000),
    jwtAccessSecret: process.env.JWT_ACCESS_SECRET || 'dev-access-secret',
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret',
    accessTokenTtl: process.env.ACCESS_TOKEN_TTL || '15m',
    refreshTokenTtl: process.env.REFRESH_TOKEN_TTL || '30d',
    uploadDir
};
//# sourceMappingURL=config.js.map