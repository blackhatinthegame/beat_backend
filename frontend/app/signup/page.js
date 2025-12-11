"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SignupPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const api_1 = require("../../lib/api");
const AuthCard_1 = __importDefault(require("../../components/AuthCard"));
const AuthInput_1 = __importDefault(require("../../components/AuthInput"));
const GradientButton_1 = __importDefault(require("../../components/GradientButton"));
const locale_context_1 = require("../../lib/locale-context");
function SignupPage() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [displayName, setDisplayName] = (0, react_1.useState)('');
    const [role, setRole] = (0, react_1.useState)('LISTENER');
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const { t } = (0, locale_context_1.useLocale)();
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await api_1.AuthApi.signup({ email, password, displayName, role });
            localStorage.setItem('accessToken', res.accessToken);
            router.push('/');
            router.refresh();
        }
        catch (err) {
            setError(err?.response?.data?.message || 'Signup failed');
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.default, { title: t('auth.signup'), subtitle: "Join BeatMarket and start sharing your music", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: submit, className: "space-y-5", children: [(0, jsx_runtime_1.jsx)(AuthInput_1.default, { type: "text", placeholder: "Display name", value: displayName, onChange: e => setDisplayName(e.target.value), required: true, icon: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" }) }) }), (0, jsx_runtime_1.jsx)(AuthInput_1.default, { type: "email", placeholder: t('form.email'), value: email, onChange: e => setEmail(e.target.value), required: true, icon: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" }) }) }), (0, jsx_runtime_1.jsx)(AuthInput_1.default, { type: "password", placeholder: t('form.password'), value: password, onChange: e => setPassword(e.target.value), required: true, icon: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), (0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-[#c7c7c9] tracking-wide", children: "Account Type" }), (0, jsx_runtime_1.jsxs)("div", { className: "grid grid-cols-2 gap-3", children: [(0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setRole('LISTENER'), className: `px-4 py-3 rounded-xl border transition-all duration-200 ${role === 'LISTENER'
                                        ? 'border-purple-500/50 bg-purple-500/10 text-white'
                                        : 'border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600'}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium", children: "Listener" }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs mt-1 opacity-75", children: "Browse & Purchase" })] }), (0, jsx_runtime_1.jsxs)("button", { type: "button", onClick: () => setRole('CREATOR'), className: `px-4 py-3 rounded-xl border transition-all duration-200 ${role === 'CREATOR'
                                        ? 'border-purple-500/50 bg-purple-500/10 text-white'
                                        : 'border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600'}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "text-sm font-medium", children: "Creator" }), (0, jsx_runtime_1.jsx)("div", { className: "text-xs mt-1 opacity-75", children: "Upload & Sell" })] })] })] }), error && ((0, jsx_runtime_1.jsxs)("div", { className: "bg-rose-500/10 border border-rose-500/50 rounded-xl p-3 text-rose-400 text-sm flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), error] })), (0, jsx_runtime_1.jsx)(GradientButton_1.default, { type: "submit", isLoading: isLoading, children: "Create account" }), (0, jsx_runtime_1.jsx)("div", { className: "text-center pt-4 border-t border-neutral-800/50", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-400", children: ["Already have an account?", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: "/login", className: "text-purple-400 hover:text-purple-300 font-medium transition-colors", children: "Login" })] }) })] }) }));
}
//# sourceMappingURL=page.js.map