"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Footer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const TermsModal_1 = __importDefault(require("./TermsModal"));
function Footer() {
    const [termsModalOpen, setTermsModalOpen] = (0, react_1.useState)(false);
    const [privacyModalOpen, setPrivacyModalOpen] = (0, react_1.useState)(false);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("footer", { className: "border-t border-neutral-800/50 bg-background/50 backdrop-blur-sm py-6 mt-auto", children: (0, jsx_runtime_1.jsxs)("div", { className: "max-w-7xl mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4", children: [(0, jsx_runtime_1.jsxs)("p", { className: "text-sm text-neutral-400", children: ["\u00A9 ", new Date().getFullYear(), " BeatMarket. All rights reserved."] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-6", children: [(0, jsx_runtime_1.jsx)("button", { onClick: () => setTermsModalOpen(true), className: "text-sm text-neutral-400 hover:text-neutral-300 transition-colors", children: "Terms of Service" }), (0, jsx_runtime_1.jsx)("button", { onClick: () => setPrivacyModalOpen(true), className: "text-sm text-neutral-400 hover:text-neutral-300 transition-colors", children: "Privacy Policy" })] })] }) }), (0, jsx_runtime_1.jsx)(TermsModal_1.default, { isOpen: termsModalOpen, onClose: () => setTermsModalOpen(false), type: "terms" }), (0, jsx_runtime_1.jsx)(TermsModal_1.default, { isOpen: privacyModalOpen, onClose: () => setPrivacyModalOpen(false), type: "privacy" })] }));
}
//# sourceMappingURL=Footer.js.map