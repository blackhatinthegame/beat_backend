"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = UploadPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const UploadForm_1 = __importDefault(require("../../components/UploadForm"));
const api_1 = require("../../lib/api");
const locale_context_1 = require("../../lib/locale-context");
const link_1 = __importDefault(require("next/link"));
function UploadPage() {
    const { data: profile, isLoading, isError } = (0, react_query_1.useQuery)({
        queryKey: ['profile'],
        queryFn: () => api_1.UserApi.profile(),
        retry: false
    });
    const { t } = (0, locale_context_1.useLocale)();
    if (isLoading) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "max-w-[840px] mx-auto pb-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-10 animate-pulse shadow-elevated", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-8 bg-neutral-800 rounded w-1/3 mb-4" }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-6", children: [(0, jsx_runtime_1.jsx)("div", { className: "h-12 bg-neutral-800 rounded-xl" }), (0, jsx_runtime_1.jsx)("div", { className: "h-12 bg-neutral-800 rounded-xl" }), (0, jsx_runtime_1.jsx)("div", { className: "h-12 bg-neutral-800 rounded-xl" })] })] }) }));
    }
    if (isError || !profile) {
        return ((0, jsx_runtime_1.jsx)("div", { className: "max-w-[840px] mx-auto pb-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-card/50 backdrop-blur-xl border border-rose-500/50 rounded-3xl p-10 text-center shadow-elevated", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-8 h-8 text-rose-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-rose-400 text-lg mb-4", children: "Please log in to upload beats." }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "btn-primary inline-block", children: "Go to Login" })] }) }));
    }
    if (profile.role !== 'CREATOR' && profile.role !== 'ADMIN') {
        return ((0, jsx_runtime_1.jsx)("div", { className: "max-w-[840px] mx-auto pb-16", children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-card/50 backdrop-blur-xl border border-rose-500/50 rounded-3xl p-10 text-center shadow-elevated", children: [(0, jsx_runtime_1.jsx)("div", { className: "w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-8 h-8 text-rose-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" }) }) }), (0, jsx_runtime_1.jsx)("p", { className: "text-rose-400 text-lg mb-2", children: "Uploads are restricted to creator accounts." }), (0, jsx_runtime_1.jsx)("p", { className: "text-neutral-400 text-sm mb-6", children: "Switch your role or contact an admin." }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/profile", className: "btn-secondary inline-block", children: "View Profile" })] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "max-w-[840px] mx-auto pb-16 animate-in fade-in duration-500", children: [(0, jsx_runtime_1.jsxs)("div", { className: "mb-10 space-y-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl md:text-5xl font-bold gradient-text", children: t('upload.title') }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-neutral-400", children: "Share your beats with the world" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "relative bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8 md:p-10 shadow-elevated overflow-hidden", children: [(0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3a0ca3]/20 via-[#7209b7]/20 to-[#4361ee]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none" }), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0 opacity-[0.02] pointer-events-none", children: (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", style: {
                                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                                backgroundSize: '40px 40px'
                            } }) }), (0, jsx_runtime_1.jsx)("div", { className: "relative z-10", children: (0, jsx_runtime_1.jsx)(UploadForm_1.default, {}) })] })] }));
}
//# sourceMappingURL=page.js.map