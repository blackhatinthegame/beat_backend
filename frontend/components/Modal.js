"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Modal;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function Modal({ isOpen, onClose, title, children }) {
    (0, react_1.useEffect)(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        }
        else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);
    if (!isOpen)
        return null;
    return ((0, jsx_runtime_1.jsx)("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200", onClick: onClose, children: (0, jsx_runtime_1.jsxs)("div", { className: "bg-card/95 backdrop-blur-xl border border-neutral-800/50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-elevated animate-in fade-in duration-300 scale-100", onClick: (e) => e.stopPropagation(), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between p-6 border-b border-neutral-800/50", children: [(0, jsx_runtime_1.jsx)("h2", { className: "text-xl font-bold gradient-text", children: title }), (0, jsx_runtime_1.jsx)("button", { onClick: onClose, className: "p-2 rounded-lg hover:bg-neutral-800/50 transition-colors text-neutral-400 hover:text-white", "aria-label": "Close", children: (0, jsx_runtime_1.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) })] }), (0, jsx_runtime_1.jsx)("div", { className: "p-6 overflow-y-auto max-h-[calc(90vh-100px)]", children: children })] }) }));
}
//# sourceMappingURL=Modal.js.map