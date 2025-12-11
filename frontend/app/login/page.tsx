"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthApi } from '../../lib/api';
import AuthCard from '../../components/AuthCard';
import AuthInput from '../../components/AuthInput';
import GradientButton from '../../components/GradientButton';
import { useLocale } from '../../lib/locale-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { t } = useLocale();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await AuthApi.login({ email, password });
      localStorage.setItem('accessToken', res.accessToken);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthCard title={t('auth.login')} subtitle="Welcome back to BeatMarket">
      <form onSubmit={submit} className="space-y-5">
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
          error={error || undefined}
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

        <GradientButton type="submit" isLoading={isLoading}>
          {t('auth.login')}
        </GradientButton>

        <div className="text-center pt-4 border-t border-neutral-800/50">
          <p className="text-sm text-neutral-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </form>
    </AuthCard>
  );
}

