import { InputHTMLAttributes } from 'react';
interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
    icon?: React.ReactNode;
    error?: string;
}
export default function AuthInput({ icon, error, className, ...props }: AuthInputProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AuthInput.d.ts.map