"use client";

import { ButtonHTMLAttributes, ReactNode } from 'react';

interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  isLoading?: boolean;
}

export default function GradientButton({ children, isLoading, className = '', disabled, ...props }: GradientButtonProps) {
  return (
    <button
      className={`
        w-full px-6 py-3.5 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600
        hover:from-pink-500 hover:via-purple-500 hover:to-blue-500
        text-white font-semibold transition-all duration-300
        hover:scale-[1.02] hover:shadow-glow active:scale-100
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${className}
      `}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
}


