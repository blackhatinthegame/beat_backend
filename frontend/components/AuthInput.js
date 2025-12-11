"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthInput;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function AuthInput({ icon, error, className = '', ...props }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [icon && ((0, jsx_runtime_1.jsx)("div", { className: "absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 z-10", children: icon })), (0, jsx_runtime_1.jsx)("input", { className: `
            w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85]
            focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background
            transition-all duration-200 shadow-inner
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-rose-500/50' : ''}
            ${className}
          `, ...props })] }), error && ((0, jsx_runtime_1.jsxs)("p", { className: "text-rose-400 text-xs flex items-center gap-1", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), error] }))] }));
}
//# sourceMappingURL=AuthInput.js.map