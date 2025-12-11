"use client";

import { useQuery } from '@tanstack/react-query';
import UploadForm from '../../components/UploadForm';
import { UserApi } from '../../lib/api';
import { useLocale } from '../../lib/locale-context';
import Link from 'next/link';

export default function UploadPage() {
  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['profile'],
    queryFn: () => UserApi.profile(),
    retry: false
  });
  const { t } = useLocale();

  if (isLoading) {
    return (
      <div className="max-w-[840px] mx-auto pb-16">
        <div className="bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-10 animate-pulse shadow-elevated">
          <div className="h-8 bg-neutral-800 rounded w-1/3 mb-4"></div>
          <div className="space-y-6">
            <div className="h-12 bg-neutral-800 rounded-xl"></div>
            <div className="h-12 bg-neutral-800 rounded-xl"></div>
            <div className="h-12 bg-neutral-800 rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (isError || !profile) {
    return (
      <div className="max-w-[840px] mx-auto pb-16">
        <div className="bg-card/50 backdrop-blur-xl border border-rose-500/50 rounded-3xl p-10 text-center shadow-elevated">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-rose-400 text-lg mb-4">Please log in to upload beats.</p>
          <Link href="/login" className="btn-primary inline-block">Go to Login</Link>
        </div>
      </div>
    );
  }
  
  if (profile.role !== 'CREATOR' && profile.role !== 'ADMIN') {
    return (
      <div className="max-w-[840px] mx-auto pb-16">
        <div className="bg-card/50 backdrop-blur-xl border border-rose-500/50 rounded-3xl p-10 text-center shadow-elevated">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
            </svg>
          </div>
          <p className="text-rose-400 text-lg mb-2">Uploads are restricted to creator accounts.</p>
          <p className="text-neutral-400 text-sm mb-6">Switch your role or contact an admin.</p>
          <Link href="/profile" className="btn-secondary inline-block">View Profile</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[840px] mx-auto pb-16 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="mb-10 space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">{t('upload.title')}</h1>
        <p className="text-lg text-neutral-400">Share your beats with the world</p>
      </div>

      {/* Form Container */}
      <div className="relative bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8 md:p-10 shadow-elevated overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#3a0ca3]/20 via-[#7209b7]/20 to-[#4361ee]/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          <UploadForm />
        </div>
      </div>
    </div>
  );
}

