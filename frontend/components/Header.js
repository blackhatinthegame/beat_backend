"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Header;
const jsx_runtime_1 = require("react/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const LanguageSwitcher_1 = __importDefault(require("./LanguageSwitcher"));
const NavbarProfileMenu_1 = __importDefault(require("./NavbarProfileMenu"));
const locale_context_1 = require("../lib/locale-context");
const api_1 = require("../lib/api");
const navItems = [
    { href: '/', key: 'nav.home' },
    { href: '/browse', key: 'nav.browse' },
    { href: '/upload', key: 'nav.upload' },
    { href: '/profile', key: 'nav.profile' }
];
function Header() {
    const pathname = (0, navigation_1.usePathname)();
    const { t } = (0, locale_context_1.useLocale)();
    const [mobileMenuOpen, setMobileMenuOpen] = (0, react_1.useState)(false);
    const [isLoggedIn, setIsLoggedIn] = (0, react_1.useState)(false);
    const { data: profile } = (0, react_query_1.useQuery)({
        queryKey: ['profile'],
        queryFn: () => api_1.UserApi.profile(),
        retry: false,
        enabled: isLoggedIn
    });
    (0, react_1.useEffect)(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('accessToken');
            setIsLoggedIn(!!token);
        };
        checkAuth();
        // Listen for storage changes (logout from other tabs)
        window.addEventListener('storage', checkAuth);
        // Listen for custom logout event
        window.addEventListener('logout', checkAuth);
        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('logout', checkAuth);
        };
    }, []);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("header", { className: "sticky top-0 z-50 glass-effect border-b border-transparent bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-blue-500/10 shadow-soft", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 md:px-6 py-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)(link_1.default, { href: "/", className: "text-xl md:text-2xl font-bold gradient-text", children: "BeatMarket" }), (0, jsx_runtime_1.jsx)("nav", { className: "hidden md:flex items-center gap-8", children: navItems.map(item => ((0, jsx_runtime_1.jsxs)(link_1.default, { href: item.href, className: `text-sm font-medium transition-all duration-200 relative group ${pathname === item.href
                                        ? 'text-white'
                                        : 'text-neutral-400 hover:text-white'}`, children: [(0, jsx_runtime_1.jsx)("span", { className: pathname === item.href ? 'gradient-text' : '', children: t(item.key) }), pathname === item.href && ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full" })), !pathname.includes(item.href) && ((0, jsx_runtime_1.jsx)("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" }))] }, item.href))) }), (0, jsx_runtime_1.jsx)("div", { className: "hidden md:flex items-center gap-4", children: isLoggedIn && profile ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LanguageSwitcher_1.default, {}), (0, jsx_runtime_1.jsx)(NavbarProfileMenu_1.default, { profile: profile })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LanguageSwitcher_1.default, {}), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "text-sm text-neutral-300 hover:text-white transition-colors px-3 py-2", children: t('auth.login') }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/signup", className: "btn-primary text-sm", children: t('auth.signup') })] })) }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setMobileMenuOpen(!mobileMenuOpen), className: "md:hidden p-2 text-neutral-400 hover:text-white transition-colors", "aria-label": "Toggle menu", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: mobileMenuOpen ? ((0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })) : ((0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" })) }) })] }), mobileMenuOpen && ((0, jsx_runtime_1.jsxs)("nav", { className: "md:hidden mt-4 pb-4 space-y-3 border-t border-neutral-800/50 pt-4", children: [navItems.map(item => ((0, jsx_runtime_1.jsx)(link_1.default, { href: item.href, onClick: () => setMobileMenuOpen(false), className: `block px-3 py-2 rounded-lg transition-colors ${pathname === item.href
                                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'}`, children: t(item.key) }, item.href))), (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-3 pt-3 border-t border-neutral-800/50", children: isLoggedIn && profile ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LanguageSwitcher_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: "flex-1", children: (0, jsx_runtime_1.jsx)(NavbarProfileMenu_1.default, { profile: profile }) })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(LanguageSwitcher_1.default, {}), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", onClick: () => setMobileMenuOpen(false), className: "flex-1 text-center px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors", children: t('auth.login') }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/signup", onClick: () => setMobileMenuOpen(false), className: "flex-1 text-center btn-primary text-sm", children: t('auth.signup') })] })) })] }))] }) }) }));
}
//# sourceMappingURL=Header.js.map