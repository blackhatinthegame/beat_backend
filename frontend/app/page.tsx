"use client";

import BeatGrid from '../components/BeatGrid';
import { useQuery } from '@tanstack/react-query';
import { BeatApi } from '../lib/api';
import { useLocale } from '../lib/locale-context';

const trendingTags = ['Trap', 'RnB', 'Emotional', 'Drill'];

export default function HomePage() {
  const { data, isLoading } = useQuery({ queryKey: ['beats'], queryFn: () => BeatApi.list({ sort: 'newest' }) });
  const { t } = useLocale();
  
  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl p-8 md:p-16 border border-neutral-800/50 shadow-elevated">
        {/* Multi-tone gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/25 to-blue-600/30 opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
        
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse"></div>
        
        <div className="relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-300 max-w-3xl mb-8 font-medium">
            {t('hero.subtitle')}
          </p>
          
          {/* Trending Tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {trendingTags.map(tag => (
              <span
                key={tag}
                className="px-4 py-2 rounded-full bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 text-sm font-medium text-neutral-300 hover:border-purple-500/50 hover:text-white transition-all cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Latest Beats Section */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Latest Beats</h2>
            <p className="text-neutral-400 text-sm md:text-base">Handpicked by our curators</p>
          </div>
          {!isLoading && data && data.length > 0 && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1D] border border-neutral-800/50 w-fit">
              <span className="text-xs font-semibold text-neutral-300">{data.length} beats found</span>
            </div>
          )}
        </div>
        
        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-card border border-neutral-800 rounded-2xl p-3 animate-pulse">
                <div className="aspect-square bg-neutral-800 rounded-xl mb-3"></div>
                <div className="h-4 bg-neutral-800 rounded-lg mb-2"></div>
                <div className="h-3 bg-neutral-800 rounded-lg w-2/3"></div>
              </div>
            ))}
          </div>
        ) : data?.length === 0 ? (
          <div className="text-center py-20 bg-card border border-neutral-800 rounded-2xl">
            <p className="text-xl text-neutral-300 mb-2">No beats available yet</p>
            <p className="text-sm text-neutral-500">Be the first to upload!</p>
          </div>
        ) : (
          <BeatGrid beats={data || []} />
        )}
      </div>
    </div>
  );
}

