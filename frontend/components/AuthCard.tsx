"use client";

import { ReactNode } from 'react';

interface AuthCardProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export default function AuthCard({ children, title, subtitle }: AuthCardProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 animate-in fade-in duration-500">
      <div className="w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-8 md:p-10 shadow-elevated overflow-hidden relative">
          {/* Gradient Border Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"></div>
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="mb-8 text-center">
              <h1 className="text-3xl md:text-4xl font-bold gradient-text mb-2">{title}</h1>
              {subtitle && <p className="text-neutral-400 text-sm md:text-base">{subtitle}</p>}
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


