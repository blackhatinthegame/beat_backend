"use client";

import { InputHTMLAttributes } from 'react';

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export default function AuthInput({ icon, error, className = '', ...props }: AuthInputProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 z-10">
            {icon}
          </div>
        )}
        <input
          className={`
            w-full bg-neutral-900/80 border border-neutral-700 rounded-xl px-4 py-3.5 text-white placeholder-[#777A85]
            focus:outline-none focus:border-transparent focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-background
            transition-all duration-200 shadow-inner
            ${icon ? 'pl-12' : ''}
            ${error ? 'border-rose-500/50' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && (
        <p className="text-rose-400 text-xs flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}


