import React, { useState } from 'react';
import { Spot } from '../types';
import {
  X,
  MapPin,
  Clock,
  Wifi,
  Zap,
  Volume2,
  Armchair,
  DollarSign,
  Bookmark,
  ThumbsUp,
  Share2,
  Check,
  ExternalLink,
  ShieldCheck,
  Calendar,
  Sparkles
} from 'lucide-react';

interface SpotDetailModalProps {
  spot: Spot | null;
  onClose: () => void;
  isSaved: boolean;
  isUpvoted: boolean;
  onToggleSave: (id: string) => void;
  onToggleUpvote: (id: string) => void;
}

export const SpotDetailModal: React.FC<SpotDetailModalProps> = ({
  spot,
  onClose,
  isSaved,
  isUpvoted,
  onToggleSave,
  onToggleUpvote,
}) => {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [userRatingSubmitted, setUserRatingSubmitted] = useState(false);
  const [selectedStars, setSelectedStars] = useState<number | null>(null);

  if (!spot) return null;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${spot.name}, ${spot.address}, ${spot.neighborhood}, ${spot.city}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${spot.name} on WorkNook`,
        text: `Check out ${spot.name}, a productive ${spot.category} in ${spot.city} with ${spot.wifiQuality} wifi and ${spot.outletAvailability} outlets!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      handleCopyAddress();
    }
  };

  const mapsQuery = encodeURIComponent(`${spot.name} ${spot.address} ${spot.city}`);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar inside modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/80 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
            <span className="text-emerald-800 font-semibold uppercase tracking-wider text-[11px]">
              {spot.category}
            </span>
            <span>·</span>
            <span>{spot.neighborhood}</span>
            <span>·</span>
            <span>{spot.city}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(spot.id)}
              className={`p-2 rounded-lg transition-colors border ${
                isSaved
                  ? 'bg-emerald-800 border-emerald-800 text-white'
                  : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save spot'}
              aria-label="Save spot"
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors"
              title="Share spot"
              aria-label="Share spot"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual Photo Banner */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
            {spot.photos?.[0] && !imageError ? (
              <img
                src={spot.photos[0]}
                alt={spot.name}
                onError={() => setImageError(true)}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-stone-100 to-stone-200 text-stone-400">
                <Sparkles className="w-10 h-10 mb-2 stroke-[1.5]" />
                <span className="text-sm font-medium text-stone-600">{spot.name}</span>
              </div>
            )}
            <div className="absolute bottom-3 left-3">
              <span className="text-xs font-semibold px-3 py-1 rounded bg-stone-900/90 text-white backdrop-blur-md">
                {spot.priceOfEntry}
              </span>
            </div>
          </div>

          {/* Heading & Basic info */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
                {spot.name}
              </h1>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-amber-50 text-amber-900 px-2.5 py-1 rounded border border-amber-200/60 font-semibold text-sm">
                  <span>★</span>
                  <span className="tabular-nums">{spot.visitorRating.toFixed(1)}</span>
                </div>
                <span className="text-xs text-stone-500">
                  ({spot.reviewCount} community evaluations)
                </span>
              </div>
            </div>

            {/* Address & Navigation bar */}
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-stone-600">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-stone-500 shrink-0" />
                <span>{spot.address}, {spot.neighborhood}, {spot.city}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="text-xs text-emerald-800 hover:text-emerald-950 font-medium underline underline-offset-2 flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : null}
                  <span>{copied ? 'Copied' : 'Copy address'}</span>
                </button>
                <span className="text-stone-300">·</span>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-stone-600 hover:text-stone-900 font-medium flex items-center gap-1"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mt-3 flex items-center gap-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-lg border border-stone-200/60">
              <Clock className="w-4 h-4 text-stone-500 shrink-0" />
              <span className="font-semibold text-stone-800">Hours:</span>
              <span>{spot.hours}</span>
            </div>
          </div>

          {/* Description & Insider Tip */}
          <div className="space-y-4">
            <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
              {spot.shortDescription}
            </p>

            {spot.insiderTip && (
              <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
                <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Remote Worker Insider Tip</span>
                </div>
                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed">
                  "{spot.insiderTip}"
                </p>
              </div>
            )}
          </div>

          {/* Work Readiness Matrix: What Actually Matters */}
          <div>
            <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
              Work Readiness Evaluation
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Wifi */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Wifi className="w-4 h-4 text-stone-700" />
                  <span>Wifi Quality</span>
                </div>
                <p className="text-sm font-bold text-stone-900">{spot.wifiQuality}</p>
                {spot.wifiSpeedMbps && (
                  <p className="text-[11px] text-stone-500 mt-0.5 tabular-nums">
                    ~{spot.wifiSpeedMbps} Mbps tested
                  </p>
                )}
              </div>

              {/* Outlets */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Zap className="w-4 h-4 text-stone-700" />
                  <span>Power Outlets</span>
                </div>
                <p className="text-sm font-bold text-stone-900">{spot.outletAvailability}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {spot.outletAvailability === 'Plenty'
                    ? 'At most tables'
                    : spot.outletAvailability === 'Some'
                    ? 'Perimeter walls only'
                    : 'Bring full charge'}
                </p>
              </div>

              {/* Noise */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Volume2 className="w-4 h-4 text-stone-700" />
                  <span>Noise Environment</span>
                </div>
                <p className="text-sm font-bold text-stone-900">{spot.noiseLevel}</p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {spot.noiseLevel === 'Silent'
                    ? 'No calls allowed'
                    : spot.noiseLevel === 'Quiet'
                    ? 'Earbuds recommended'
                    : spot.noiseLevel === 'Moderate'
                    ? 'Ambient chatter'
                    : 'Energetic cafe bustle'}
                </p>
              </div>

              {/* Seating */}
              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200/70">
                <div className="flex items-center gap-2 text-stone-500 text-xs mb-1">
                  <Armchair className="w-4 h-4 text-stone-700" />
                  <span>Seating Comfort</span>
                </div>
                <p className="text-sm font-bold text-stone-900 tabular-nums">
                  {spot.seatingComfort} / 5 Rating
                </p>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {spot.seatingComfort >= 4 ? 'Great for 3+ hrs' : 'Standard 1-2 hr seating'}
                </p>
              </div>
            </div>
          </div>

          {/* Amenities Checklist */}
          {spot.amenities && spot.amenities.length > 0 && (
            <div>
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-3">
                Space Amenities & Features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {spot.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-center gap-2 py-1.5 px-3 bg-stone-50/80 rounded-lg border border-stone-100">
                    <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Feedback & Upvote Section */}
          <div className="p-5 rounded-xl bg-stone-50 border border-stone-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-bold text-stone-900">
                Worked here recently?
              </h3>
              <p className="text-xs text-stone-600 mt-0.5">
                Help other remote workers verify if this spot is currently productive.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleUpvote(spot.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all ${
                  isUpvoted
                    ? 'bg-emerald-800 border-emerald-800 text-white'
                    : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                }`}
              >
                <ThumbsUp className={`w-3.5 h-3.5 ${isUpvoted ? 'fill-current' : ''}`} />
                <span>{isUpvoted ? 'Recommended' : 'Recommend this Spot'}</span>
                <span className="tabular-nums">({spot.upvotes + (isUpvoted ? 1 : 0)})</span>
              </button>
            </div>
          </div>

          {/* Attribution footer inside modal */}
          <div className="pt-4 border-t border-stone-100 flex flex-wrap items-center justify-between text-xs text-stone-400">
            <div className="flex items-center gap-1.5">
              <span>Submitted by</span>
              <span className="font-medium text-stone-600">{spot.submittedBy}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Added {spot.dateAdded}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
