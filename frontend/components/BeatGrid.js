"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BeatGrid;
const jsx_runtime_1 = require("react/jsx-runtime");
const BeatCard_1 = __importDefault(require("./BeatCard"));
const PlayerModal_1 = __importDefault(require("./PlayerModal"));
const react_1 = require("react");
function BeatGrid({ beats }) {
    const [current, setCurrent] = (0, react_1.useState)(null);
    const [open, setOpen] = (0, react_1.useState)(false);
    const scrollContainerRef = (0, react_1.useRef)(null);
    const [isMobile, setIsMobile] = (0, react_1.useState)(false);
    (0, react_1.useEffect)(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { ref: scrollContainerRef, className: `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4' : ''}`, style: isMobile ? {
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                    WebkitOverflowScrolling: 'touch'
                } : {}, children: beats.map(beat => ((0, jsx_runtime_1.jsx)("div", { className: isMobile ? 'snap-start min-w-full' : '', children: (0, jsx_runtime_1.jsx)(BeatCard_1.default, { beat: beat, onPlay: b => {
                            setCurrent(b);
                            setOpen(true);
                        } }) }, beat.id))) }), (0, jsx_runtime_1.jsx)(PlayerModal_1.default, { beat: current, isOpen: open, onClose: () => setOpen(false) }), (0, jsx_runtime_1.jsx)("style", { jsx: true, children: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      ` })] }));
}
//# sourceMappingURL=BeatGrid.js.map