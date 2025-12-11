"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthApi } from '../../lib/api';
import AuthCard from '../../components/AuthCard';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import { useLocale } from '../../lib/locale-context';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [role, setRole] = useState<'CREATOR' | 'LISTENER'>('LISTENER');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useLocale();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await AuthApi.signup({ email, password, displayName, role });
      localStorage.setItem('accessToken', res.accessToken);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title={t('auth.signup')} subtitle="Join BeatMarket and start sharing your music">
      <form onSubmit={submit} className="space-y-5">
        <AuthInput
          type="text"
          placeholder="Display name"
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          required
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
        />

        <AuthInput
          type="email"
          placeholder={t('form.email')}
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
            </svg>
          }
        />

        <AuthInput
          type="password"
          placeholder={t('form.password')}
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          }
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#c7c7c9] tracking-wide">
            Account Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setRole('LISTENER')}
              className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                role === 'LISTENER'
                  ? 'border-purple-500/50 bg-purple-500/10 text-white'
                  : 'border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <div className="text-sm font-medium">Listener</div>
              <div className="text-xs mt-1 opacity-75">Browse & Purchase</div>
            </button>
            <button
              type="button"
              onClick={() => setRole('CREATOR')}
              className={`px-4 py-3 rounded-xl border transition-all duration-200 ${
                role === 'CREATOR'
                  ? 'border-purple-500/50 bg-purple-500/10 text-white'
                  : 'border-neutral-700 bg-neutral-900/50 text-neutral-400 hover:border-neutral-600'
              }`}
            >
              <div className="text-sm font-medium">Creator</div>
              <div className="text-xs mt-1 opacity-75">Upload & Sell</div>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 border border-rose-500/50 rounded-xl p-3 text-rose-400 text-sm flex items-center gap-2">
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {error}
          </div>
        )}

        <GradientButton type="submit" isLoading={isLoading}>
          Create account
        </GradientButton>

        <div className="text-center pt-4 border-t border-neutral-800/50">
          <p className="text-sm text-neutral-400">
            Already have an account?{' '}
            <Link href="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Login
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}

