import type { Request, Response, NextFunction } from 'express';
import type { Role } from '../types.js';
export interface AuthRequest extends Request {
    user?: {
        sub: string;
        role: Role;
    };
}
export declare function requireAuth(req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
export declare function requireRole(...roles: Role[]): (req: AuthRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare function attachUser(req: AuthRequest, res: Response, next: NextFunction): void;
export declare function ensureUserExists(req: AuthRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map