import React, { useState } from 'react';
import { Spot } from '../types';
import { Wifi, Zap, Volume2, Armchair, DollarSign, Bookmark, ThumbsUp, MapPin, Sparkles } from 'lucide-react';

interface SpotCardProps {
  spot: Spot;
  isSaved: boolean;
  isUpvoted: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onToggleUpvote: (id: string, e: React.MouseEvent) => void;
  onSelect: (spot: Spot) => void;
}

const CATEGORY_LABELS: Record<string, string> = {
  cafe: 'Cafe',
  library: 'Public Library',
  coworking: 'Co-Working Space',
  bookstore: 'Bookstore & Cafe',
  other: 'Study Space',
};

export const SpotCard: React.FC<SpotCardProps> = ({
  spot,
  isSaved,
  isUpvoted,
  onToggleSave,
  onToggleUpvote,
  onSelect,
}) => {
  const [imageError, setImageError] = useState(false);
  const heroPhoto = spot.photos?.[0];

  return (
    <div
      onClick={() => onSelect(spot)}
      className="group bg-white rounded-xl border border-stone-200/80 hover:border-stone-400 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden cursor-pointer text-left"
    >
      {/* Visual media banner */}
      <div className="relative aspect-[16/10] bg-stone-100 overflow-hidden">
        {heroPhoto && !imageError ? (
          <img
            src={heroPhoto}
            alt={spot.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400">
            <Sparkles className="w-8 h-8 mb-2 stroke-[1.5]" />
            <span className="text-xs font-medium text-stone-500">{spot.name}</span>
          </div>
        )}

        {/* Action triggers over image */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(spot.id, e);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save spot'}
            className={`w-9 h-9 rounded-lg flex items-center justify-center backdrop-blur-md transition-all ${
              isSaved
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-stone-900/60 text-white hover:bg-stone-900/80'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Price tag on lower left of photo */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-stone-900/80 text-white backdrop-blur-md">
            {spot.priceOfEntry}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line with typographic separators */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-1.5 font-medium flex-wrap">
            <span className="text-emerald-800 font-semibold">{CATEGORY_LABELS[spot.category] || spot.category}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{spot.neighborhood}</span>
            <span aria-hidden="true" className="text-stone-300">·</span>
            <span>{spot.city}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-stone-900 leading-snug group-hover:text-emerald-900 transition-colors">
            {spot.name}
          </h3>

          {/* Short description */}
          <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
            {spot.shortDescription}
          </p>
        </div>

        {/* Feature Icons Grid - The 4 pillars of productivity */}
        <div className="mt-4 pt-4 border-t border-stone-100 grid grid-cols-4 gap-2 text-stone-700 text-xs">
          {/* Wifi */}
          <div className="flex flex-col items-start" title={`Wifi: ${spot.wifiQuality}${spot.wifiSpeedMbps ? ` (~${spot.wifiSpeedMbps} Mbps)` : ''}`}>
            <div className="flex items-center gap-1 text-stone-500 text-[11px] mb-0.5">
              <Wifi className="w-3.5 h-3.5 text-stone-700" />
              <span>Wifi</span>
            </div>
            <span className="font-semibold truncate max-w-full text-stone-900">
              {spot.wifiQuality === 'Fast & Reliable' ? 'Fast' : spot.wifiQuality}
            </span>
          </div>

          {/* Outlets */}
          <div className="flex flex-col items-start" title={`Outlets: ${spot.outletAvailability}`}>
            <div className="flex items-center gap-1 text-stone-500 text-[11px] mb-0.5">
              <Zap className="w-3.5 h-3.5 text-stone-700" />
              <span>Outlets</span>
            </div>
            <span className="font-semibold truncate max-w-full text-stone-900">
              {spot.outletAvailability}
            </span>
          </div>

          {/* Noise */}
          <div className="flex flex-col items-start" title={`Noise Level: ${spot.noiseLevel}`}>
            <div className="flex items-center gap-1 text-stone-500 text-[11px] mb-0.5">
              <Volume2 className="w-3.5 h-3.5 text-stone-700" />
              <span>Noise</span>
            </div>
            <span className="font-semibold truncate max-w-full text-stone-900">
              {spot.noiseLevel}
            </span>
          </div>

          {/* Comfort */}
          <div className="flex flex-col items-start" title={`Seating Comfort: ${spot.seatingComfort}/5`}>
            <div className="flex items-center gap-1 text-stone-500 text-[11px] mb-0.5">
              <Armchair className="w-3.5 h-3.5 text-stone-700" />
              <span>Comfort</span>
            </div>
            <span className="font-semibold truncate max-w-full text-stone-900 tabular-nums">
              {spot.seatingComfort} / 5
            </span>
          </div>
        </div>

        {/* Card Footer: Visitor rating & upvote */}
        <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-stone-900 tabular-nums">{spot.visitorRating.toFixed(1)}</span>
            <span className="text-amber-500">★</span>
            <span className="text-stone-400">({spot.reviewCount})</span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleUpvote(spot.id, e);
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
              isUpvoted
                ? 'bg-emerald-50 text-emerald-800 font-semibold'
                : 'hover:bg-stone-100 text-stone-600'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
            <span className="tabular-nums">{spot.upvotes + (isUpvoted ? 1 : 0)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
