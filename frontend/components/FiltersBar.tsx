"use client";

import { useState, useRef, useEffect } from 'react';
import { useLocale } from '../lib/locale-context';

interface FiltersBarProps {
  onChange: (filters: Record<string, any>) => void;
}

const genreOptions = ['Trap', 'RnB', 'Drill', 'Afro', 'Pop', 'EDM', 'LoFi', 'Emotional', 'Hyperpop', 'BoomBap', 'House', 'Dark Trap', 'Reggaeton', 'Hip-Hop', 'Jazz', 'Electronic'];
const filterTags = ['Trap', 'RnB', 'Drill', 'Emotional', 'Pop', 'Afro', 'EDM', 'LoFi'];

export default function FiltersBar({ onChange }: FiltersBarProps) {
  const [genre, setGenre] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isGenreOpen, setIsGenreOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const genreRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);
  const { t } = useLocale();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (genreRef.current && !genreRef.current.contains(event.target as Node)) {
        setIsGenreOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag)
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    onChange({ genre, search, sort, tags: newTags });
  };

  const handleGenreSelect = (g: string) => {
    setGenre(g);
    setIsGenreOpen(false);
    onChange({ genre: g, search, sort, tags: selectedTags });
  };

  const handleSortSelect = (s: string) => {
    setSort(s);
    setIsSortOpen(false);
    onChange({ genre, search, sort: s, tags: selectedTags });
  };


  return (
    <div className="space-y-4">
      {/* Mobile Collapsible Header */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMobileExpanded(!isMobileExpanded)}
          className="w-full flex items-center justify-between p-4 bg-card border border-neutral-800 rounded-xl hover:border-neutral-700 transition-colors"
        >
          <span className="font-medium">Filters</span>
          <svg 
            className={`w-5 h-5 transition-transform ${isMobileExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Filters Container */}
      <div className={`bg-card/50 backdrop-blur-xl border border-neutral-800/50 rounded-2xl p-6 md:p-8 shadow-elevated ${isMobileExpanded ? 'block' : 'hidden md:block'}`}>
        {/* Search Bar */}
        <div className="mb-6 relative">
          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              className="w-full bg-neutral-900/80 backdrop-blur-sm rounded-xl pl-12 pr-4 py-4 border border-neutral-700/50 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-sm shadow-inner"
              placeholder="Search beats..."
              value={search}
              onChange={e => {
                const newSearch = e.target.value;
                setSearch(newSearch);
                onChange({ genre, search: newSearch, sort, tags: selectedTags });
              }}
              onFocus={(e) => {
                e.target.style.boxShadow = '0 0 0 3px rgba(168, 85, 247, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.boxShadow = '';
              }}
            />
          </div>
        </div>

        {/* Filters Row */}
        <div className="flex flex-col md:flex-row gap-6 md:items-center md:justify-between mb-6">
          {/* Genre Dropdown */}
          <div ref={genreRef} className="relative z-[100]">
            <button
              onClick={() => setIsGenreOpen(!isGenreOpen)}
              className="w-full md:w-48 flex items-center justify-between px-4 py-3.5 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600 transition-all text-sm"
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
                <span className={genre ? 'text-white' : 'text-neutral-400'}>
                  {genre || t('filters.genre')}
                </span>
              </div>
              <svg className={`w-4 h-4 text-neutral-400 transition-transform ${isGenreOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isGenreOpen && (
              <div className="absolute top-full left-0 w-full mt-2 bg-neutral-900/95 backdrop-blur-xl border border-neutral-700 rounded-xl shadow-elevated overflow-hidden z-[100]">
                <div className="max-h-[240px] overflow-y-auto dropdown-scrollbar">
                  {genreOptions.map(g => (
                    <button
                      key={g}
                      onClick={() => handleGenreSelect(g)}
                      className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${
                        genre === g ? 'bg-purple-500/20 text-purple-300' : 'text-neutral-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sort Dropdown */}
          <div ref={sortRef} className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="w-full md:w-48 flex items-center justify-between px-4 py-3.5 bg-neutral-900/80 backdrop-blur-sm rounded-xl border border-neutral-700/50 hover:border-neutral-600 transition-all text-sm"
            >
              <span className="text-neutral-300">
                {sort === 'newest' ? 'Newest First' :
                 sort === 'price_asc' ? 'Price: Low to High' :
                 sort === 'price_desc' ? 'Price: High to Low' :
                 'Most Popular'}
              </span>
              <svg className={`w-4 h-4 text-neutral-400 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isSortOpen && (
              <div className="absolute z-50 right-0 md:right-auto w-full md:w-48 mt-2 bg-neutral-900 border border-neutral-700 rounded-xl shadow-elevated overflow-hidden">
                {['newest', 'price_asc', 'price_desc', 'popular'].map(s => (
                  <button
                    key={s}
                    onClick={() => handleSortSelect(s)}
                    className={`w-full text-left px-4 py-3 text-sm hover:bg-neutral-800 transition-colors ${
                      sort === s ? 'bg-purple-500/20 text-purple-300' : 'text-neutral-300'
                    }`}
                  >
                    {s === 'newest' ? 'Newest First' :
                     s === 'price_asc' ? 'Price: Low to High' :
                     s === 'price_desc' ? 'Price: High to Low' :
                     'Most Popular'}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Filter Tags */}
        <div className="pt-6 border-t border-neutral-800/50">
          <p className="text-xs text-neutral-400 mb-4 font-medium">Quick Filters:</p>
          <div className="flex flex-wrap gap-3">
            {filterTags.map(tag => (
              <button
                key={tag}
                onClick={() => handleTagToggle(tag)}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all duration-200 shadow-sm ${
                  selectedTags.includes(tag)
                    ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 text-purple-300 shadow-purple-500/20 hover:shadow-purple-500/30 hover:scale-105'
                    : 'bg-neutral-800/50 border border-neutral-700/50 text-neutral-400 hover:border-purple-500/50 hover:text-neutral-300 hover:bg-neutral-800/70 hover:scale-105'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

