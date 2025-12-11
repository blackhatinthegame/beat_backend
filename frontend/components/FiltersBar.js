"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FiltersBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const locale_context_1 = require("../lib/locale-context");
const genreOptions = ['Trap', 'RnB', 'Drill', 'Afro', 'Pop', 'EDM', 'LoFi', 'Emotional', 'Hyperpop', 'BoomBap', 'House', 'Dark Trap', 'Reggaeton', 'Hip-Hop', 'Jazz', 'Electronic'];
const filterTags = ['Trap', 'RnB', 'Drill', 'Emotional', 'Pop', 'Afro', 'EDM', 'LoFi'];
function FiltersBar({ onChange }) {
    const [genre, setGenre] = (0, react_1.useState)('');
    const [search, setSearch] = (0, react_1.useState)('');
    const [sort, setSort] = (0, react_1.useState)('newest');
    const [selectedTags, setSelectedTags] = (0, react_1.useState)([]);
    const [isGenreOpen, setIsGenreOpen] = (0, react_1.useState)(false);
    const [isSortOpen, setIsSortOpen] = (0, react_1.useState)(false);
    const [isMobileExpanded, setIsMobileExpanded] = (0, react_1.useState)(false);
    const genreRef = (0, react_1.useRef)(null);
    const sortRef = (0, react_1.useRef)(null);
    const { t } = (0, locale_context_1.useLocale)();
    (0, react_1.useEffect)(() => {
        const handleClickOutside = (event) => {
            if (genreRef.current && !genreRef.current.contains(event.target)) {
                setIsGenreOpen(false);
            }
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setIsSortOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    const handleTagToggle = (tag) => {
        const newTags = selectedTags.includes(tag)
            ? selectedTags.filter(t => t !== tag)
            : [...selectedTags, tag];
        setSelectedTags(newTags);
        onChange({ genre, search, sort, tags: newTags });
    };
    const handleGenreSelect = (g) => {
        setGenre(g);
        setIsGenreOpen(false);
        onChange({ genre: g, search, sort, tags: selectedTags });
    };
    const handleSortSelect = (s) => {
        setSort(s);
        setIsSortOpen(false);
        onChange({ genre, search, sort: s, tags: selectedTags });
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsx)("div", { className: "md:hidden", children: (0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsMobileExpanded(!isMobileExpanded), className: "w-full flex items-center justify-between p-4 bg-card border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors", children: [(0, jsx_runtime_1.jsx)("span", { className: "font-medium", children: "Filters" }), (0, jsx_runtime_1.jsx)("svg", { className: `w-5 h-5 transition-transform ${isMobileExpanded ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: `bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 md:p-8 shadow-elevated ${isMobileExpanded ? 'block' : 'hidden md:block'}`, children: [(0, jsx_runtime_1.jsx)("div", { className: "mb-6 relative", children: (0, jsx_runtime_1.jsxs)("div", { className: "relative", children: [(0, jsx_runtime_1.jsx)("svg", { className: "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 z-10", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }), (0, jsx_runtime_1.jsx)("input", { className: "w-full bg-neutral-900/80 backdrop-blur-sm rounded-xl pl-12 pr-4 py-4 border border-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm shadow-inner", placeholder: "Search beats...", value: search, onChange: e => {
                                        const newSearch = e.target.value;
                                        setSearch(newSearch);
                                        onChange({ genre, search: newSearch, sort, tags: selectedTags });
                                    }, onFocus: (e) => {
                                        e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
                                    }, onBlur: (e) => {
                                        e.target.style.boxShadow = '';
                                    } })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col md:flex-row gap-6 md:items-center md:justify-between mb-6", children: [(0, jsx_runtime_1.jsxs)("div", { ref: genreRef, className: "relative z-[100]", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsGenreOpen(!isGenreOpen), className: "w-full md:w-48 flex items-center justify-between px-4 py-3.5 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600 transition-all text-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("svg", { className: "w-4 h-4 text-neutral-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" }) }), (0, jsx_runtime_1.jsx)("span", { className: genre ? 'text-white' : 'text-neutral-400', children: genre || t('filters.genre') })] }), (0, jsx_runtime_1.jsx)("svg", { className: `w-4 h-4 text-neutral-400 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isGenreOpen && ((0, jsx_runtime_1.jsx)("div", { className: "absolute top-full left-0 w-full mt-2 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700 rounded-xl shadow-elevated overflow-hidden z-[100]", children: (0, jsx_runtime_1.jsx)("div", { className: "max-h-[240px] overflow-y-auto dropdown-scrollbar", children: genreOptions.map(g => ((0, jsx_runtime_1.jsx)("button", { onClick: () => handleGenreSelect(g), className: `w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${genre === g ? 'bg-purple-500/20 text-purple-300' : 'text-neutral-300'}`, children: g }, g))) }) }))] }), (0, jsx_runtime_1.jsxs)("div", { ref: sortRef, className: "relative", children: [(0, jsx_runtime_1.jsxs)("button", { onClick: () => setIsSortOpen(!isSortOpen), className: "w-full md:w-48 flex items-center justify-between px-4 py-3.5 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600 transition-all text-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-neutral-300", children: sort === 'newest' ? 'Newest First' :
                                                    sort === 'price_asc' ? 'Price: Low to High' :
                                                        sort === 'price_desc' ? 'Price: High to Low' :
                                                            'Most Popular' }), (0, jsx_runtime_1.jsx)("svg", { className: `w-4 h-4 text-neutral-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: (0, jsx_runtime_1.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })] }), isSortOpen && ((0, jsx_runtime_1.jsx)("div", { className: "absolute z-50 right-0 md:right-auto w-full md:w-48 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-elevated overflow-hidden", children: ['newest', 'price_asc', 'price_desc', 'popular'].map(s => ((0, jsx_runtime_1.jsx)("button", { onClick: () => handleSortSelect(s), className: `w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${sort === s ? 'bg-purple-500/20 text-purple-300' : 'text-neutral-300'}`, children: s === 'newest' ? 'Newest First' :
                                                s === 'price_asc' ? 'Price: Low to High' :
                                                    s === 'price_desc' ? 'Price: High to Low' :
                                                        'Most Popular' }, s))) }))] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "pt-6 border-t border-neutral-800/50", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-xs text-neutral-400 mb-4 font-medium", children: "Quick Filters:" }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-3", children: filterTags.map(tag => ((0, jsx_runtime_1.jsx)("button", { onClick: () => handleTagToggle(tag), className: `px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm ${selectedTags.includes(tag)
                                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-300 shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105'
                                        : 'bg-neutral-800/50 border border-neutral-700/50 text-neutral-400 hover:border-purple-500/50 hover:text-neutral-300 hover:bg-neutral-800/70 hover:scale-105'}`, children: tag }, tag))) })] })] })] }));
}
//# sourceMappingURL=FiltersBar.js.map