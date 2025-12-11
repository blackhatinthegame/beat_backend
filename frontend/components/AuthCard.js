"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function AuthCard({ children, title, subtitle }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "min-h-screen flex items-center justify-center px-4 py-12 animate-in fade-in duration-500", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-md", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-8 md:p-10 shadow-elevated overflow-hidden relative", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-[0.02] pointer-events-none", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", style: {
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '40px 40px'
                            } }) }), (0, jsx_runtime_1.jsxs)("div", { className: "relative z-10", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-8 text-center", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-3xl md:text-4xl font-bold gradient-text mb-2", children: title }), subtitle && (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-400 text-sm md:text-base", children: subtitle })] }), children] })] }) }) }));
}
//# sourceMappingURL=AuthCard.js.map