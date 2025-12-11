"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginPage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const navigation_1 = require("next/navigation");
const link_1 = __importDefault(require("next/link"));
const api_1 = require("../../lib/api");
const AuthCard_1 = __importDefault(require("../../components/AuthCard"));
const AuthInput_1 = __importDefault(require("../../components/AuthInput"));
const GradientButton_1 = __importDefault(require("../../components/GradientButton"));
const locale_context_1 = require("../../lib/locale-context");
function LoginPage() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const router = (0, navigation_1.useRouter)();
    const { t } = (0, locale_context_1.useLocale)();
    const submit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        try {
            const res = await api_1.AuthApi.login({ email, password });
            localStorage.setItem('accessToken', res.accessToken);
            router.push('/');
            router.refresh();
        }
        catch (err) {
            setError(err?.response?.data?.message || 'Login failed');
        }
        finally {
            setIsLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsx)(AuthCard_1.default, { title: t('auth.login'), subtitle: "Welcome back to BeatMarket", children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: submit, className: "space-y-5", children: [(0, jsx_runtime_1.jsx)(AuthInput_1.default, { type: "email", placeholder: t('form.email'), value: email, onChange: e => setEmail(e.target.value), required: true, icon: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" }) }), error: error || undefined }), (0, jsx_runtime_1.jsx)(AuthInput_1.default, { type: "password", placeholder: t('form.password'), value: password, onChange: e => setPassword(e.target.value), required: true, icon: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), (0, jsx_runtime_1.jsx)(GradientButton_1.default, { type: "submit", isLoading: isLoading, children: t('auth.login') }), (0, jsx_runtime_1.jsx)("div", { className: "text-center pt-4 border-t border-neutral-800/50", children: (0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-400", children: ["Don't have an account?", ' ', (0, jsx_runtime_1.jsx)(link_1.default, { href: "/signup", className: "text-purple-400 hover:text-purple-300 font-medium transition-colors", children: "Create account" })] }) })] }) }));
}
//# sourceMappingURL=page.js.map