"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import LanguageSwitcher from './LanguageSwitcher';
import NavbarProfileMenu from './NavbarProfileMenu';
import { useLocale } from '../lib/locale-context';
import { UserApi } from '../lib/api';

const navItems = [
  { href: '/', key: 'nav.home' },
  { href: '/browse', key: 'nav.browse' },
  { href: '/upload', key: 'nav.upload' },
  { href: '/profile', key: 'nav.profile' }
];

export default function Header() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => UserApi.profile(),
    retry: false,
    enabled: isLoggedIn
  });

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('accessToken');
      setIsLoggedIn(!!token);
    };
    
    checkAuth();
    
    // Listen for storage changes (logout from other tabs)
    window.addEventListener('storage', checkAuth);
    
    // Listen for custom logout event
    window.addEventListener('logout', checkAuth);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('logout', checkAuth);
    };
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 glass-effect border-b border-transparent bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-blue-500/10 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl md:text-2xl font-bold gradient-text">
              BeatMarket
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 relative group ${
                    pathname === item.href 
                      ? 'text-white' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  <span className={pathname === item.href ? 'gradient-text' : ''}>
                    {t(item.key)}
                  </span>
                  {pathname === item.href && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full" />
                  )}
                  {!pathname.includes(item.href) && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn && profile ? (
                <>
                  <LanguageSwitcher />
                  <NavbarProfileMenu profile={profile} />
                </>
              ) : (
                <>
                  <LanguageSwitcher />
                  <Link href="/login" className="text-sm text-neutral-300 hover:text-white transition-colors px-3 py-2">
                    {t('auth.login')}
                  </Link>
                  <Link href="/signup" className="btn-primary text-sm">
                    {t('auth.signup')}
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-3 border-t border-neutral-800/50 pt-4">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg transition-colors ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
                  }`}
                >
                  {t(item.key)}
                </Link>
              ))}
              <div className="flex items-center gap-3 pt-3 border-t border-neutral-800/50">
                {isLoggedIn && profile ? (
                  <>
                    <LanguageSwitcher />
                    <div className="flex-1">
                      <NavbarProfileMenu profile={profile} />
                    </div>
                  </>
                ) : (
                  <>
                    <LanguageSwitcher />
                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center px-4 py-2 text-sm text-neutral-300 hover:text-white transition-colors">
                      {t('auth.login')}
                    </Link>
                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)} className="flex-1 text-center btn-primary text-sm">
                      {t('auth.signup')}
                    </Link>
                  </>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>
    </>
  );
}

