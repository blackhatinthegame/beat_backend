"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BeatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const api_1 = require("../lib/api");
const media_1 = require("../lib/media");
const locale_context_1 = require("../lib/locale-context");
const lucide_react_1 = require("lucide-react");
function BeatCard({ beat, onPlay }) {
    const [isFavorited, setIsFavorited] = (0, react_1.useState)(false);
    const [hover, setHover] = (0, react_1.useState)(false);
    const coverSrc = (0, media_1.resolveMediaUrl)(beat.coverUrl);
    const { t } = (0, locale_context_1.useLocale)();
    const handleFavorite = async (e) => {
        e.stopPropagation();
        try {
            await api_1.FavoritesApi.toggle(beat.id);
            setIsFavorited((prev) => !prev);
        }
        catch (err) {
            console.error("Failed to toggle favorite", err);
        }
    };
    const handlePurchase = async (e) => {
        e.stopPropagation();
        try {
            await api_1.CheckoutApi.purchase(beat.id);
            alert("Purchase successful!");
        }
        catch (err) {
            alert(err?.response?.data?.message || "Purchase failed");
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "group bg-[#141416] border border-neutral-800/80 rounded-2xl overflow-hidden \r\n                 transition-all duration-300 hover:border-neutral-700 hover:shadow-xl \r\n                 hover:-translate-y-1 cursor-pointer", onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false), children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative aspect-square overflow-hidden", children: [(0, jsx_runtime_1.jsx)("img", { src: coverSrc, alt: beat.title, className: "w-full h-full object-cover transition-transform duration-500 \r\n                     group-hover:scale-110", loading: "lazy" }), (0, jsx_runtime_1.jsx)("div", { className: `absolute inset-0 flex items-center justify-center backdrop-blur-sm 
                      bg-black/50 transition-all duration-300 ${hover ? "opacity-100" : "opacity-0"}`, children: (0, jsx_runtime_1.jsx)("button", { onClick: () => onPlay?.(beat), className: "w-20 h-20 rounded-full bg-white text-black flex items-center justify-center \r\n                       shadow-2xl hover:scale-110 transition-all", children: (0, jsx_runtime_1.jsx)(lucide_react_1.Play, { size: 46, className: "ml-1" }) }) }), (0, jsx_runtime_1.jsx)("button", { onClick: handleFavorite, className: `absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-lg 
            border transition-all duration-300 hover:scale-110 shadow-lg
            ${isFavorited
                            ? "bg-pink-500/90 border-pink-400/70 text-white"
                            : "bg-black/60 border-white/10 text-white/90"}`, children: (0, jsx_runtime_1.jsx)(lucide_react_1.Heart, { size: 20, className: `transition-transform ${isFavorited ? "fill-white scale-110" : "stroke-white"}` }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "p-4 md:p-5 space-y-3", children: [(0, jsx_runtime_1.jsx)("h3", { className: "font-semibold text-white text-lg line-clamp-1", children: beat.title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-2", children: [beat.genre && ((0, jsx_runtime_1.jsx)(TagChip, { color: "purple", children: beat.genre })), beat.mood && ((0, jsx_runtime_1.jsx)(TagChip, { color: "pink", children: beat.mood })), beat.bpm && ((0, jsx_runtime_1.jsxs)(TagChip, { color: "blue", children: [beat.bpm, " BPM"] })), beat.key && ((0, jsx_runtime_1.jsx)(TagChip, { color: "gray", children: beat.key }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between pt-3 border-t border-neutral-800/60", children: [(0, jsx_runtime_1.jsxs)("span", { className: "text-2xl font-bold text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.25)]", children: ["$", beat.price] }), (0, jsx_runtime_1.jsx)("button", { onClick: handlePurchase, className: "px-5 py-2.5 rounded-xl text-sm font-bold text-white\r\n                       bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600\r\n                       hover:scale-[1.05] hover:brightness-110 transition-all shadow-md \r\n                       active:scale-95 whitespace-nowrap", children: t("actions.buy") })] })] })] }));
}
/* ------------------------------
   REUSABLE CHIP COMPONENT
--------------------------------*/
function TagChip({ children, color, }) {
    const colorMap = {
        purple: "text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/10",
        pink: "text-pink-300 hover:border-pink-500/40 hover:bg-pink-500/10",
        blue: "text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/10",
        gray: "text-neutral-300 hover:border-neutral-500/40 hover:bg-neutral-700/20",
    };
    return ((0, jsx_runtime_1.jsx)("span", { className: `px-3 py-1.5 rounded-lg bg-[#1b1b1f] border border-neutral-700/40
                  text-xs font-medium transition-all cursor-default
                  ${colorMap[color]}`, children: children }));
}
//# sourceMappingURL=BeatCard.js.map