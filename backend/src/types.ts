export type Role = 'ADMIN' | 'CREATOR' | 'LISTENER';

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: Role;
  displayName: string;
  avatarUrl?: string;
  createdAt: Date;
  refreshToken?: string;
}

export interface Beat {
  id: string;
  title: string;
  description?: string;
  genre: string;
  mood?: string;
  key?: string;
  bpm: number;
  price: number;
  audioUrl: string;
  coverUrl: string;
  creatorId: string;
  createdAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  beatId: string;
  createdAt: Date;
}

export interface Purchase {
  id: string;
  userId: string;
  beatId: string;
  amount: number;
  status: 'paid';
  createdAt: Date;
}


