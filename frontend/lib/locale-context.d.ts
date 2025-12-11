import { ReactNode } from 'react';
type Locale = 'en' | 'mn';
interface LocaleContextValue {
    locale: Locale;
    t: (key: string) => string;
    setLocale: (locale: Locale) => void;
}
export declare function LocaleProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useLocale(): LocaleContextValue;
export {};
//# sourceMappingURL=locale-context.d.ts.map