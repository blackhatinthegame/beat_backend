"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocaleProvider = LocaleProvider;
exports.useLocale = useLocale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const en_json_1 = __importDefault(require("../locales/en.json"));
const mn_json_1 = __importDefault(require("../locales/mn.json"));
const dictionaries = { en: en_json_1.default, mn: mn_json_1.default };
const LocaleContext = (0, react_1.createContext)(undefined);
function LocaleProvider({ children }) {
    const [locale, setLocale] = (0, react_1.useState)('en');
    (0, react_1.useEffect)(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('locale') : null;
        if (stored)
            setLocale(stored);
    }, []);
    const t = (0, react_1.useMemo)(() => {
        const dict = dictionaries[locale];
        return (key) => dict[key] || key;
    }, [locale]);
    const value = (0, react_1.useMemo)(() => ({
        locale,
        t,
        setLocale: (lng) => {
            setLocale(lng);
            if (typeof window !== 'undefined')
                localStorage.setItem('locale', lng);
        }
    }), [locale, t]);
    return (0, jsx_runtime_1.jsx)(LocaleContext.Provider, { value: value, children: children });
}
function useLocale() {
    const ctx = (0, react_1.useContext)(LocaleContext);
    if (!ctx)
        throw new Error('LocaleContext not found');
    return ctx;
}
//# sourceMappingURL=locale-context.js.map