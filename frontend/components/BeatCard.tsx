"use client";

import { useState } from "react";
import { CheckoutApi, FavoritesApi } from "../lib/api";
import { resolveMediaUrl } from "../lib/media";
import { useLocale } from "../lib/locale-context";
import { Heart, Play } from "lucide-react";

interface BeatCardProps {
  beat: {
    id: string;
    title: string;
    coverUrl?: string;
    price: number;
    genre?: string;
    bpm?: number;
    mood?: string;
    key?: string;
  };
  onPlay?: (beat: any) => void;
}

export default function BeatCard({ beat, onPlay }: BeatCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [hover, setHover] = useState(false);
  const coverSrc = resolveMediaUrl(beat.coverUrl);
  const { t } = useLocale();

  const handleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await FavoritesApi.toggle(beat.id);
      setIsFavorited((prev) => !prev);
    } catch (err) {
      console.error("Failed to toggle favorite", err);
    }
  };

  const handlePurchase = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await CheckoutApi.purchase(beat.id);
      alert("Purchase successful!");
    } catch (err: any) {
      alert(err?.response?.data?.message || "Purchase failed");
    }
  };

  return (
    <div
      className="group bg-[#141416] border border-neutral-800/80 rounded-2xl overflow-hidden 
                 transition-all duration-300 hover:border-neutral-700 hover:shadow-xl 
                 hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Cover Image */}
      <div className="relative aspect-square overflow-hidden">
        <img
          src={coverSrc}
          alt={beat.title}
          className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-110"
          loading="lazy"
        />

        {/* Hover Play Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center backdrop-blur-sm 
                      bg-black/50 transition-all duration-300 ${
                        hover ? "opacity-100" : "opacity-0"
                      }`}
        >
          <button
            onClick={() => onPlay?.(beat)}
            className="w-20 h-20 rounded-full bg-white text-black flex items-center justify-center 
                       shadow-2xl hover:scale-110 transition-all"
          >
            <Play size={46} className="ml-1" />
          </button>
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavorite}
          className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-lg 
            border transition-all duration-300 hover:scale-110 shadow-lg
            ${
              isFavorited
                ? "bg-pink-500/90 border-pink-400/70 text-white"
                : "bg-black/60 border-white/10 text-white/90"
            }`}
        >
          <Heart
            size={20}
            className={`transition-transform ${
              isFavorited ? "fill-white scale-110" : "stroke-white"
            }`}
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-5 space-y-3">
        {/* Title */}
        <h3 className="font-semibold text-white text-lg line-clamp-1">
          {beat.title}
        </h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {beat.genre && (
            <TagChip color="purple">{beat.genre}</TagChip>
          )}
          {beat.mood && (
            <TagChip color="pink">{beat.mood}</TagChip>
          )}
          {beat.bpm && (
            <TagChip color="blue">{beat.bpm} BPM</TagChip>
          )}
          {beat.key && (
            <TagChip color="gray">{beat.key}</TagChip>
          )}
        </div>

        {/* Price / Buy */}
        <div className="flex items-center justify-between pt-3 border-t border-neutral-800/60">
          <span className="text-2xl font-bold text-emerald-400 drop-shadow-[0_0_6px_rgba(16,185,129,0.25)]">
            ${beat.price}
          </span>

          <button
            onClick={handlePurchase}
            className="px-5 py-2.5 rounded-xl text-sm font-bold text-white
                       bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600
                       hover:scale-[1.05] hover:brightness-110 transition-all shadow-md 
                       active:scale-95 whitespace-nowrap"
          >
            {t("actions.buy")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------
   REUSABLE CHIP COMPONENT
--------------------------------*/
function TagChip({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "purple" | "pink" | "blue" | "gray";
}) {
  const colorMap: Record<string, string> = {
    purple:
      "text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/10",
    pink: "text-pink-300 hover:border-pink-500/40 hover:bg-pink-500/10",
    blue: "text-blue-300 hover:border-blue-500/40 hover:bg-blue-500/10",
    gray: "text-neutral-300 hover:border-neutral-500/40 hover:bg-neutral-700/20",
  };

  return (
    <span
      className={`px-3 py-1.5 rounded-lg bg-[#1b1b1f] border border-neutral-700/40
                  text-xs font-medium transition-all cursor-default
                  ${colorMap[color]}`}
    >
      {children}
    </span>
  );
}
