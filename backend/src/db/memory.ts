import { nanoid } from 'nanoid';
import type { Beat, Favorite, Purchase, Role, User } from '../types.js';

const users: User[] = [];
const beats: Beat[] = [];
const favorites: Favorite[] = [];
const purchases: Purchase[] = [];

export const db = {
  users,
  beats,
  favorites,
  purchases,
  createUser(data: Omit<User, 'id' | 'createdAt'>): User {
    const user: User = { ...data, id: nanoid(), createdAt: new Date() };
    users.push(user);
    return user;
  },
  findUserByEmail(email: string) {
    return users.find(u => u.email.toLowerCase() === email.toLowerCase());
  },
  findUserById(id: string) {
    return users.find(u => u.id === id);
  },
  saveRefreshToken(id: string, token: string | undefined) {
    const u = users.find(user => user.id === id);
    if (u) u.refreshToken = token;
  },
  createBeat(data: Omit<Beat, 'id' | 'createdAt'>) {
    const beat: Beat = { ...data, id: nanoid(), createdAt: new Date() };
    beats.push(beat);
    return beat;
  },
  listBeats() {
    return beats;
  },
  findBeatById(id: string) {
    return beats.find(b => b.id === id);
  },
  toggleFavorite(userId: string, beatId: string) {
    const existing = favorites.find(f => f.userId === userId && f.beatId === beatId);
    if (existing) {
      const idx = favorites.indexOf(existing);
      favorites.splice(idx, 1);
      return false;
    }
    favorites.push({ id: nanoid(), userId, beatId, createdAt: new Date() });
    return true;
  },
  listFavorites(userId: string) {
    return favorites.filter(f => f.userId === userId);
  },
  createPurchase(userId: string, beatId: string, amount: number) {
    const purchase: Purchase = {
      id: nanoid(),
      userId,
      beatId,
      amount,
      status: 'paid',
      createdAt: new Date()
    };
    purchases.push(purchase);
    return purchase;
  }
};


