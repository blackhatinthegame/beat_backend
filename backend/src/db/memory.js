import { nanoid } from 'nanoid';
const users = [];
const beats = [];
const favorites = [];
const purchases = [];
export const db = {
    users,
    beats,
    favorites,
    purchases,
    createUser(data) {
        const user = { ...data, id: nanoid(), createdAt: new Date() };
        users.push(user);
        return user;
    },
    findUserByEmail(email) {
        return users.find(u => u.email.toLowerCase() === email.toLowerCase());
    },
    findUserById(id) {
        return users.find(u => u.id === id);
    },
    saveRefreshToken(id, token) {
        const u = users.find(user => user.id === id);
        if (u)
            u.refreshToken = token;
    },
    createBeat(data) {
        const beat = { ...data, id: nanoid(), createdAt: new Date() };
        beats.push(beat);
        return beat;
    },
    listBeats() {
        return beats;
    },
    findBeatById(id) {
        return beats.find(b => b.id === id);
    },
    toggleFavorite(userId, beatId) {
        const existing = favorites.find(f => f.userId === userId && f.beatId === beatId);
        if (existing) {
            const idx = favorites.indexOf(existing);
            favorites.splice(idx, 1);
            return false;
        }
        favorites.push({ id: nanoid(), userId, beatId, createdAt: new Date() });
        return true;
    },
    listFavorites(userId) {
        return favorites.filter(f => f.userId === userId);
    },
    createPurchase(userId, beatId, amount) {
        const purchase = {
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
//# sourceMappingURL=memory.js.map