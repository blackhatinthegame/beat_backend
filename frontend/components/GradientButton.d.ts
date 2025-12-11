import { ButtonHTMLAttributes, ReactNode } from 'react';
interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
}
export default function GradientButton({ children, isLoading, className, disabled, ...props }: GradientButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=GradientButton.d.ts.map