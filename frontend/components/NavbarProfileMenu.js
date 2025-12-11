"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NavbarProfileMenu;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const locale_context_1 = require("../lib/locale-context");
function NavbarProfileMenu({ profile }) {
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const menuRef = (0, react_1.useRef)(null);
    const router = (0, navigation_1.useRouter)();
    const { t } = (0, locale_context_1.useLocale)();
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsOpen(false);
        // Dispatch custom event to notify Header component
        window.dispatchEvent(new Event('logout'));
        router.push('/');
        router.refresh();
    };
    const roleColors = {
        CREATOR: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
        ADMIN: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
        LISTENER: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "relative", ref: menuRef, children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsOpen(!isOpen), className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-neutral-800/50 transition-colors", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center border border-neutral-700", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold gradient-text", children: profile.displayName.charAt(0).toUpperCase() }) }), (0, jsx_runtime_1.jsx)("span", { className: "hidden md:block text-sm font-medium text-neutral-300", children: profile.displayName }), (0, jsx_runtime_1.jsx)("svg", { className: `w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isOpen && ((0, jsx_runtime_1.jsxs)("div", { className: "absolute right-0 mt-2 w-56 bg-neutral-900/95 backdrop-blur-xl border border-neutral-800/50 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] overflow-hidden z-50 animate-in fade-in duration-200", children: [(0, jsx_runtime_1.jsxs)("div", { className: "p-4 border-b border-neutral-800/50", children: [(0, jsx_runtime_1.jsx)("p", { className: "font-semibold text-white text-sm", children: profile.displayName }), (0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-400 mt-1 truncate", children: profile.email }), (0, jsx_runtime_1.jsx)("span", { className: `inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold border ${roleColors[profile.role] || roleColors.LISTENER}`, children: profile.role })] }), (0, jsx_runtime_1.jsxs)("div", { className: "py-2", children: [(0, jsx_runtime_1.jsxs)(link_1.default, { href: "/profile", onClick: () => setIsOpen(false), className: "flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all duration-200", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }), t('nav.profile')] }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/profile", onClick: () => setIsOpen(false), className: "flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all duration-200", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" }) }), "My Beats"] }), (0, jsx_runtime_1.jsxs)(link_1.default, { href: "/profile", onClick: () => setIsOpen(false), className: "flex items-center gap-3 px-4 py-2.5 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 transition-all duration-200", children: [(0, jsx_runtime_1.jsxs)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [(0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" }), (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })] }), "Settings"] }), (0, jsx_runtime_1.jsx)("div", { className: "px-4 py-2", children: (0, jsx_runtime_1.jsx)("div", { className: "h-px bg-neutral-800/50" }) }), (0, jsx_runtime_1.jsxs)("button", { onClick: handleLogout, className: "w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all duration-200 text-left", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" }) }), "Logout"] })] })] }))] }));
}
//# sourceMappingURL=NavbarProfileMenu.js.map