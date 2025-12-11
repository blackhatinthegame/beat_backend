"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMediaUrl = resolveMediaUrl;
function resolveMediaUrl(url) {
    if (!url)
        return '';
    if (url.startsWith('http://') || url.startsWith('https://'))
        return url;
    const base = process.env.NEXT_PUBLIC_API_URL ||
        (typeof window !== 'undefined' ? `${window.location.protocol}//${window.location.hostname}:4000` : 'http://localhost:4000');
    return `${base}${url}`;
}
//# sourceMappingURL=media.js.map