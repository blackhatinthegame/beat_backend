"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RootLayout;
const jsx_runtime_1 = require("react/jsx-runtime");
require("../styles/globals.css");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const locale_context_1 = require("../lib/locale-context");
const Header_1 = __importDefault(require("../components/Header"));
const Footer_1 = __importDefault(require("../components/Footer"));
function RootLayout({ children }) {
    const [queryClient] = (0, react_1.useState)(() => new react_query_1.QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }));
    return ((0, jsx_runtime_1.jsxs)("html", { lang: "en", className: "scroll-smooth", children: [(0, jsx_runtime_1.jsx)("head", { children: (0, jsx_runtime_1.jsx)("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }) }), (0, jsx_runtime_1.jsx)("body", { className: "antialiased", children: (0, jsx_runtime_1.jsx)(react_query_1.QueryClientProvider, { client: queryClient, children: (0, jsx_runtime_1.jsx)(locale_context_1.LocaleProvider, { children: (0, jsx_runtime_1.jsxs)("div", { className: "min-h-screen bg-background text-white flex flex-col", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "flex-1 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 w-full", children: children }), (0, jsx_runtime_1.jsx)(Footer_1.default, {})] }) }) }) })] }));
}
//# sourceMappingURL=layout.js.map