import type { Beat, Favorite, Purchase, User } from '../types.js';
export declare const db: {
    users: User[];
    beats: Beat[];
    favorites: Favorite[];
    purchases: Purchase[];
    createUser(data: Omit<User, "id" | "createdAt">): User;
    findUserByEmail(email: string): User | undefined;
    findUserById(id: string): User | undefined;
    saveRefreshToken(id: string, token: string | undefined): void;
    createBeat(data: Omit<Beat, "id" | "createdAt">): Beat;
    listBeats(): Beat[];
    findBeatById(id: string): Beat | undefined;
    toggleFavorite(userId: string, beatId: string): boolean;
    listFavorites(userId: string): Favorite[];
    createPurchase(userId: string, beatId: string, amount: number): Purchase;
};
//# sourceMappingURL=memory.d.ts.map