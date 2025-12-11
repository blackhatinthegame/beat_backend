"use client";

import BeatCard from './BeatCard';
import PlayerModal from './PlayerModal';
import { useState, useRef, useEffect } from 'react';

export default function BeatGrid({ beats }: { beats: any[] }) {
  const [current, setCurrent] = useState<any | null>(null);
  const [open, setOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <>
      <div 
        ref={scrollContainerRef}
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 ${
          isMobile ? 'overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4' : ''
        }`}
        style={isMobile ? { 
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch'
        } : {}}
      >
        {beats.map(beat => (
          <div 
            key={beat.id}
            className={isMobile ? 'snap-start min-w-full' : ''}
          >
            <BeatCard
              beat={beat}
              onPlay={b => {
                setCurrent(b);
                setOpen(true);
              }}
            />
          </div>
        ))}
      </div>
      <PlayerModal beat={current} isOpen={open} onClose={() => setOpen(false)} />
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

