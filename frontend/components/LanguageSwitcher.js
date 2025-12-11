"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LanguageSwitcher;
const jsx_runtime_1 = require("react/jsx-runtime");
const locale_context_1 = require("../lib/locale-context");
function LanguageSwitcher() {
    const { locale, setLocale } = (0, locale_context_1.useLocale)();
    return ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-0 bg-neutral-900/60 border border-neutral-700/50 rounded-full p-1 backdrop-blur-sm shadow-sm", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setLocale('en'), className: `px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 relative ${locale === 'en'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'text-neutral-400 hover:text-neutral-300'}`, children: "EN" }), (0, jsx_runtime_1.jsx)("div", { className: "w-px h-4 bg-neutral-700/50" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setLocale('mn'), className: `px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 relative ${locale === 'mn'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/30 scale-105'
                    : 'text-neutral-400 hover:text-neutral-300'}`, children: "MN" })] }));
}
//# sourceMappingURL=LanguageSwitcher.js.map