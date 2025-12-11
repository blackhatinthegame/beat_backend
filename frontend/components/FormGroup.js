"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FormGroup;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function FormGroup({ label, children, optional }) {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-3", children: [(0, jsx_runtime_1.jsxs)("label", { className: "block text-sm font-medium text-[#c7c7c9] tracking-wide", children: [label, optional && (0, jsx_runtime_1.jsx)("span", { className: "text-neutral-500 ml-1", children: "(optional)" })] }), children] }));
}
//# sourceMappingURL=FormGroup.js.map