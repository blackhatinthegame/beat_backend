"use client";

import '../styles/globals.css';
import { ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LocaleProvider } from '../lib/locale-context';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function RootLayout({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
      },
    },
  }));
  
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">
        <QueryClientProvider client={queryClient}>
          <LocaleProvider>
            <div className="min-h-screen bg-background text-white flex flex-col">
              <Header />
              <main className="flex-1 max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-10 w-full">
                {children}
              </main>
              <Footer />
            </div>
          </LocaleProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

