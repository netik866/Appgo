import React, { useState, useMemo } from 'react';
import { Spot, FilterOptions } from '../types';
import { FilterBar } from '../components/FilterBar';
import { SpotCard } from '../components/SpotCard';
import {
  LayoutGrid,
  List,
  Bookmark,
  Wifi,
  Zap,
  Volume2,
  Armchair,
  MapPin,
  Sparkles,
  RotateCcw
} from 'lucide-react';

interface BrowsePageProps {
  spots: Spot[];
  savedSpotIds: string[];
  upvotedSpotIds: string[];
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onResetFilters: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onToggleUpvote: (id: string, e: React.MouseEvent) => void;
  onSelectSpot: (spot: Spot) => void;
  showOnlySaved?: boolean;
  onToggleSavedMode?: (val: boolean) => void;
}

export const BrowsePage: React.FC<BrowsePageProps> = ({
  spots,
  savedSpotIds,
  upvotedSpotIds,
  filters,
  onFilterChange,
  onResetFilters,
  onToggleSave,
  onToggleUpvote,
  onSelectSpot,
  showOnlySaved = false,
  onToggleSavedMode,
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filtered & Sorted spots
  const filteredSpots = useMemo(() => {
    return spots
      .filter((spot) => {
        // Saved mode check
        if (showOnlySaved && !savedSpotIds.includes(spot.id)) {
          return false;
        }

        // City filter
        if (filters.city !== 'All Cities' && spot.city.toLowerCase() !== filters.city.toLowerCase()) {
          return false;
        }

        // Category filter
        if (filters.category !== 'all' && spot.category.toLowerCase() !== filters.category.toLowerCase()) {
          return false;
        }

        // Wifi quality filter
        if (filters.wifiQuality !== 'all') {
          if (filters.wifiQuality === 'Fast & Reliable' && spot.wifiQuality !== 'Fast & Reliable') {
            return false;
          }
          if (filters.wifiQuality === 'Decent' && spot.wifiQuality === 'Unreliable') {
            return false;
          }
        }

        // Noise level filter
        if (filters.noiseLevel !== 'all') {
          if (filters.noiseLevel === 'Silent' && spot.noiseLevel !== 'Silent') return false;
          if (filters.noiseLevel === 'Quiet' && !['Silent', 'Quiet'].includes(spot.noiseLevel)) return false;
          if (filters.noiseLevel === 'Moderate' && spot.noiseLevel !== 'Moderate') return false;
          if (filters.noiseLevel === 'Lively' && spot.noiseLevel !== 'Lively') return false;
        }

        // Price filter
        if (filters.priceOfEntry !== 'all' && spot.priceOfEntry !== filters.priceOfEntry) {
          return false;
        }

        // Outlet availability filter
        if (filters.outletAvailability !== 'all') {
          if (filters.outletAvailability === 'Plenty' && spot.outletAvailability !== 'Plenty') return false;
          if (filters.outletAvailability === 'Some' && spot.outletAvailability === 'None') return false;
        }

        // Comfort filter
        if (spot.seatingComfort < filters.minComfort) {
          return false;
        }

        // Search query
        if (filters.searchQuery.trim()) {
          const q = filters.searchQuery.toLowerCase().trim();
          const matchName = spot.name.toLowerCase().includes(q);
          const matchNeighborhood = spot.neighborhood.toLowerCase().includes(q);
          const matchCity = spot.city.toLowerCase().includes(q);
          const matchDesc = spot.shortDescription.toLowerCase().includes(q);
          const matchAmenities = spot.amenities?.some((a) => a.toLowerCase().includes(q));
          if (!matchName && !matchNeighborhood && !matchCity && !matchDesc && !matchAmenities) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (filters.sortBy === 'rating') {
          return b.visitorRating - a.visitorRating;
        }
        if (filters.sortBy === 'comfort') {
          return b.seatingComfort - a.seatingComfort;
        }
        if (filters.sortBy === 'quietest') {
          const noiseScore: Record<string, number> = {
            Silent: 4,
            Quiet: 3,
            Moderate: 2,
            Lively: 1,
          };
          return (noiseScore[b.noiseLevel] || 0) - (noiseScore[a.noiseLevel] || 0);
        }
        if (filters.sortBy === 'newest') {
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        }
        if (filters.sortBy === 'alphabetical') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [spots, filters, savedSpotIds, showOnlySaved]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
      {/* Header bar of browse page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            {showOnlySaved ? 'Saved Work Nooks' : 'Directory of Work Spaces'}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {showOnlySaved
              ? 'Your bookmarked spots ready for your next study or remote work day.'
              : 'Browse all verified cafes, libraries, and study spaces.'}
          </p>
        </div>

        {/* View Mode & Saved Toggle */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          {onToggleSavedMode && (
            <button
              onClick={() => onToggleSavedMode(!showOnlySaved)}
              className={`h-9 px-3 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors border ${
                showOnlySaved
                  ? 'bg-emerald-800 text-white border-emerald-800'
                  : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${showOnlySaved ? 'fill-current' : ''}`} />
              <span>Saved Only ({savedSpotIds.length})</span>
            </button>
          )}

          {/* Grid vs List toggle */}
          <div className="bg-stone-100 p-1 rounded-lg flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="Grid View"
              aria-label="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'list'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
              title="List View"
              aria-label="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Filter Component */}
      <FilterBar
        filters={filters}
        onChange={onFilterChange}
        onReset={onResetFilters}
        totalSpotsCount={spots.length}
        filteredCount={filteredSpots.length}
      />

      {/* Spots Render Area */}
      {filteredSpots.length === 0 ? (
        <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center max-w-lg mx-auto space-y-4 my-8">
          <div className="w-12 h-12 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center mx-auto">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-stone-900">No spots match your current filters</h3>
          <p className="text-xs text-stone-500 leading-relaxed">
            Try loosening some criteria (e.g. changing noise level or searching a broader city area).
          </p>
          <button
            onClick={onResetFilters}
            className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot) => (
            <SpotCard
              key={spot.id}
              spot={spot}
              isSaved={savedSpotIds.includes(spot.id)}
              isUpvoted={upvotedSpotIds.includes(spot.id)}
              onToggleSave={onToggleSave}
              onToggleUpvote={onToggleUpvote}
              onSelect={onSelectSpot}
            />
          ))}
        </div>
      ) : (
        /* Compact List Layout */
        <div className="bg-white rounded-xl border border-stone-200 divide-y divide-stone-100 overflow-hidden">
          {filteredSpots.map((spot) => {
            const isSaved = savedSpotIds.includes(spot.id);
            return (
              <div
                key={spot.id}
                onClick={() => onSelectSpot(spot)}
                className="p-4 sm:p-5 hover:bg-stone-50 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-stone-500 font-medium mb-1">
                    <span className="text-emerald-800 font-semibold uppercase text-[11px]">
                      {spot.category}
                    </span>
                    <span>·</span>
                    <span>{spot.neighborhood}</span>
                    <span>·</span>
                    <span>{spot.city}</span>
                    <span>·</span>
                    <span className="text-stone-700 font-semibold">{spot.priceOfEntry}</span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 truncate">
                    {spot.name}
                  </h3>

                  <p className="text-xs text-stone-600 line-clamp-1 mt-1">
                    {spot.shortDescription}
                  </p>
                </div>

                {/* Key indicators row in list item */}
                <div className="flex items-center gap-4 sm:gap-6 text-xs text-stone-700 shrink-0">
                  <div className="text-left" title={`Wifi: ${spot.wifiQuality}`}>
                    <span className="text-[10px] text-stone-400 block">Wifi</span>
                    <span className="font-semibold text-stone-900">
                      {spot.wifiQuality === 'Fast & Reliable' ? 'Fast' : spot.wifiQuality}
                    </span>
                  </div>

                  <div className="text-left" title={`Outlets: ${spot.outletAvailability}`}>
                    <span className="text-[10px] text-stone-400 block">Outlets</span>
                    <span className="font-semibold text-stone-900">{spot.outletAvailability}</span>
                  </div>

                  <div className="text-left" title={`Noise: ${spot.noiseLevel}`}>
                    <span className="text-[10px] text-stone-400 block">Noise</span>
                    <span className="font-semibold text-stone-900">{spot.noiseLevel}</span>
                  </div>

                  <div className="text-left" title={`Rating: ${spot.visitorRating}`}>
                    <span className="text-[10px] text-stone-400 block">Rating</span>
                    <span className="font-bold text-stone-900 flex items-center gap-0.5">
                      <span>★</span>
                      <span className="tabular-nums">{spot.visitorRating.toFixed(1)}</span>
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSave(spot.id, e);
                    }}
                    className={`p-2 rounded-lg border transition-colors ${
                      isSaved
                        ? 'bg-emerald-800 border-emerald-800 text-white'
                        : 'border-stone-200 text-stone-500 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                    aria-label="Save spot"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
