"use client";
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BrowsePage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const api_1 = require("../../lib/api");
const BeatGrid_1 = __importDefault(require("../../components/BeatGrid"));
const FiltersBar_1 = __importDefault(require("../../components/FiltersBar"));
const locale_context_1 = require("../../lib/locale-context");
function BrowsePage() {
    const [filters, setFilters] = (0, react_1.useState)({});
    const queryClient = (0, react_query_1.useQueryClient)();
    const { t } = (0, locale_context_1.useLocale)();
    const { data, isLoading } = (0, react_query_1.useQuery)({
        queryKey: ['beats', filters],
        queryFn: () => api_1.BeatApi.list(filters)
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-10 pb-16", children: [(0, jsx_runtime_1.jsxs)("div", { className: "space-y-2", children: [(0, jsx_runtime_1.jsx)("h1", { className: "text-4xl md:text-5xl font-bold gradient-text", children: "Browse Beats" }), (0, jsx_runtime_1.jsx)("p", { className: "text-lg text-neutral-400", children: "Discover your next hit" })] }), (0, jsx_runtime_1.jsx)(FiltersBar_1.default, { onChange: f => {
                    setFilters(f);
                    queryClient.invalidateQueries({ queryKey: ['beats'] });
                } }), isLoading ? ((0, jsx_runtime_1.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5", children: [...Array(8)].map((_, i) => ((0, jsx_runtime_1.jsxs)("div", { className: "bg-card border border-neutral-800 rounded-2xl p-3 animate-pulse", children: [(0, jsx_runtime_1.jsx)("div", { className: "aspect-square bg-neutral-800 rounded-xl mb-3" }), (0, jsx_runtime_1.jsx)("div", { className: "h-4 bg-neutral-800 rounded-lg mb-2" }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 bg-neutral-800 rounded-lg w-2/3" })] }, i))) })) : data?.length === 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "text-center py-20 bg-card border border-neutral-800 rounded-2xl shadow-soft", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xl text-neutral-300 mb-2", children: "No beats found" }), (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-neutral-500", children: "Try adjusting your filters" })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", { className: "flex items-center justify-end mb-6", children: (0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1D] border border-neutral-800/50", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-xs font-semibold text-neutral-300", children: [data?.length || 0, " beats found"] }) }) }), (0, jsx_runtime_1.jsx)(BeatGrid_1.default, { beats: data || [] })] }))] }));
}
//# sourceMappingURL=page.js.map