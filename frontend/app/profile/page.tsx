"use client";

import { useQuery } from '@tanstack/react-query';
import { UserApi } from '../../lib/api';
import BeatGrid from '../../components/BeatGrid';
import { useLocale } from '../../lib/locale-context';
import Link from 'next/link';

export default function ProfilePage() {
  const { data: profile, isError: profileError, isLoading: profileLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => UserApi.profile(),
    retry: false
  });
  const { data: beats, isLoading: beatsLoading } = useQuery({
    queryKey: ['my-beats'],
    queryFn: () => UserApi.myBeats(),
    enabled: !!profile,
    retry: false
  });
  const { t } = useLocale();

  if (profileLoading) {
    return (
      <div className="space-y-8 pb-12">
        <div className="bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-8 md:p-10 animate-pulse shadow-elevated">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-neutral-800 rounded-full"></div>
            <div className="flex-1">
              <div className="h-8 bg-neutral-800 rounded w-1/3 mb-3"></div>
              <div className="h-4 bg-neutral-800 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (profileError || !profile) {
    return (
      <div className="max-w-2xl mx-auto pb-12">
        <div className="bg-card/50 backdrop-blur-xl border border-rose-500/50 rounded-3xl p-10 text-center shadow-elevated">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-rose-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <p className="text-rose-400 text-lg mb-4">Please log in to view your profile.</p>
          <Link href="/login" className="btn-primary inline-block">Go to Login</Link>
        </div>
      </div>
    );
  }

  const totalBeats = beats?.length || 0;
  const totalLikes = beats?.reduce((sum: number, beat: any) => sum + (beat.likesCount || 0), 0) || 0;
  const totalFollowers = 0; // Placeholder - can be added when follower system is implemented
  
  const roleColors: Record<string, string> = {
    CREATOR: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    ADMIN: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    LISTENER: 'text-blue-400 bg-blue-400/10 border-blue-400/20'
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Premium Profile Header Card */}
      <div className="relative bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-6 md:p-10 shadow-elevated overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Header Row with Upload Button */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-6 flex-1">
              {/* Circular Avatar with Gradient Ring */}
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-0.5">
                  <div className="w-full h-full rounded-full bg-background"></div>
                </div>
                <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center border-4 border-background">
                  <span className="text-2xl md:text-3xl font-bold gradient-text">
                    {profile.displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h1 className="text-3xl md:text-4xl font-bold gradient-text">
                    {profile.displayName}
                  </h1>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${roleColors[profile.role] || roleColors.LISTENER}`}>
                    {profile.role}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm md:text-base mb-4">{profile.email}</p>
                
                {/* Stats Blocks */}
                <div className="flex flex-wrap items-center gap-3 mt-6">
                  <div className="px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm">
                    <span className="text-xs text-neutral-400 mr-2">Beats:</span>
                    <span className="text-sm font-bold text-white">{totalBeats}</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm">
                    <span className="text-xs text-neutral-400 mr-2">Followers:</span>
                    <span className="text-sm font-bold text-white">{totalFollowers}</span>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-neutral-800/50 border border-neutral-700/50 backdrop-blur-sm">
                    <span className="text-xs text-neutral-400 mr-2">Likes:</span>
                    <span className="text-sm font-bold text-white">{totalLikes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Upload Button - Top Right */}
            {(profile.role === 'CREATOR' || profile.role === 'ADMIN') && (
              <Link 
                href="/upload" 
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white text-sm font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-glow whitespace-nowrap ml-4"
              >
                {t('nav.upload')}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* My Beats Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">My Beats</h2>
            <p className="text-neutral-400 text-sm md:text-base">Manage and showcase your music</p>
          </div>
          {totalBeats > 0 && (
            <div className="px-4 py-2 rounded-full bg-[#1A1A1D] border border-neutral-800/50">
              <span className="text-xs font-semibold text-neutral-300">{totalBeats} beats</span>
            </div>
          )}
        </div>
        
        {/* Content */}
        {beatsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card border border-neutral-800 rounded-2xl p-3 animate-pulse">
                <div className="aspect-square bg-neutral-800 rounded-xl mb-3"></div>
                <div className="h-4 bg-neutral-800 rounded-lg mb-2"></div>
                <div className="h-3 bg-neutral-800 rounded-lg w-2/3"></div>
              </div>
            ))}
          </div>
        ) : totalBeats === 0 ? (
          <div className="bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-3xl p-12 md:p-16 text-center shadow-elevated min-h-[400px] flex flex-col items-center justify-center">
            {/* Waveform Icon Placeholder */}
            <div className="w-24 h-24 md:w-32 md:h-32 mb-6 mx-auto relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 flex items-center justify-center">
                <svg className="w-12 h-12 md:w-16 md:h-16 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              {/* Animated waveform bars */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-gradient-to-t from-purple-500 to-pink-500 rounded-full animate-pulse"
                    style={{
                      height: `${20 + Math.random() * 60}%`,
                      animationDelay: `${i * 0.1}s`
                    }}
                  ></div>
                ))}
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-200 mb-2">No beats yet</h3>
            <p className="text-neutral-400 text-sm md:text-base mb-8 max-w-md mx-auto">
              Start sharing your music with the world.
            </p>
            
            {(profile.role === 'CREATOR' || profile.role === 'ADMIN') && (
              <Link 
                href="/upload" 
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 text-white font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-glow inline-block"
              >
                {t('nav.upload')}
              </Link>
            )}
          </div>
        ) : (
          <BeatGrid beats={beats || []} />
        )}
      </div>
    </div>
  );
}

