"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { BeatApi } from '../../lib/api';
import BeatGrid from '../../components/BeatGrid';
import FiltersBar from '../../components/FiltersBar';
import { useLocale } from '../../lib/locale-context';

export default function BrowsePage() {
  const [filters, setFilters] = useState<Record<string, any>>({});
  const queryClient = useQueryClient();
  const { t } = useLocale();
  const { data, isLoading } = useQuery({
    queryKey: ['beats', filters],
    queryFn: () => BeatApi.list(filters)
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold gradient-text">Browse Beats</h1>
        <p className="text-lg text-neutral-400">Discover your next hit</p>
      </div>
      
      {/* Filters */}
      <FiltersBar
        onChange={f => {
          setFilters(f);
          queryClient.invalidateQueries({ queryKey: ['beats'] });
        }}
      />
      
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
        <div className="text-center py-20 bg-card border border-neutral-800 rounded-2xl shadow-soft">
          <p className="text-xl text-neutral-300 mb-2">No beats found</p>
          <p className="text-sm text-neutral-500">Try adjusting your filters</p>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-end mb-6">
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1A1A1D] border border-neutral-800/50">
              <span className="text-xs font-semibold text-neutral-300">{data?.length || 0} beats found</span>
            </div>
          </div>
          <BeatGrid beats={data || []} />
        </>
      )}
    </div>
  );
}

