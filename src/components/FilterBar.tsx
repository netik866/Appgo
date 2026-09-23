import React from 'react';
import { FilterOptions } from '../types';
import { CITIES, CATEGORIES } from '../data/mockSpots';
import { Search, SlidersHorizontal, RotateCcw, X, Check } from 'lucide-react';

interface FilterBarProps {
  filters: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onReset: () => void;
  totalSpotsCount: number;
  filteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  totalSpotsCount,
  filteredCount,
}) => {
  const activeFilterCount = [
    filters.city !== 'All Cities',
    filters.category !== 'all',
    filters.wifiQuality !== 'all',
    filters.noiseLevel !== 'all',
    filters.priceOfEntry !== 'all',
    filters.outletAvailability !== 'all',
    filters.minComfort > 1,
    filters.searchQuery.trim().length > 0,
  ].filter(Boolean).length;

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, city: e.target.value });
  };

  const handleCategorySelect = (categoryId: string) => {
    onChange({ ...filters, category: categoryId });
  };

  const handleWifiChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, wifiQuality: e.target.value });
  };

  const handleNoiseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, noiseLevel: e.target.value });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, priceOfEntry: e.target.value });
  };

  const handleOutletChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, outletAvailability: e.target.value });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] });
  };

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
      {/* Search Bar + City Selector row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={handleTextChange}
            placeholder="Search by spot name, neighborhood, or keyword..."
            className="w-full pl-10 pr-9 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-900 placeholder:text-stone-400 focus:bg-white focus:border-stone-400 focus:ring-1 focus:ring-stone-400 transition-colors"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onChange({ ...filters, searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* City selector */}
        <div className="sm:w-52">
          <select
            value={filters.city}
            onChange={handleCityChange}
            className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 font-medium focus:bg-white focus:border-stone-400 transition-colors cursor-pointer"
          >
            {CITIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="sm:w-52">
          <select
            value={filters.sortBy}
            onChange={handleSortChange}
            className="w-full py-2.5 px-3 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 font-medium focus:bg-white focus:border-stone-400 transition-colors cursor-pointer"
          >
            <option value="rating">Sort: Highest Rated</option>
            <option value="comfort">Sort: Most Comfortable</option>
            <option value="quietest">Sort: Quietest First</option>
            <option value="newest">Sort: Newest Added</option>
            <option value="alphabetical">Sort: Alphabetical (A–Z)</option>
          </select>
        </div>
      </div>

      {/* Category Segmented Control Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 no-scrollbar text-xs">
        {CATEGORIES.map((cat) => {
          const isActive = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Advanced Specific Productivity Filters */}
      <div className="pt-3 border-t border-stone-100 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        {/* Wifi Quality */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Wifi Quality</label>
          <select
            value={filters.wifiQuality}
            onChange={handleWifiChange}
            className="w-full py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-md text-stone-800 focus:bg-white"
          >
            <option value="all">Any Wifi</option>
            <option value="Fast & Reliable">Fast & Reliable only</option>
            <option value="Decent">Decent or better</option>
          </select>
        </div>

        {/* Noise Level */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Noise Level</label>
          <select
            value={filters.noiseLevel}
            onChange={handleNoiseChange}
            className="w-full py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-md text-stone-800 focus:bg-white"
          >
            <option value="all">Any Noise Level</option>
            <option value="Silent">Silent only</option>
            <option value="Quiet">Quiet & Silent</option>
            <option value="Moderate">Moderate ambient</option>
            <option value="Lively">Lively bustle</option>
          </select>
        </div>

        {/* Power Outlets */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Power Outlets</label>
          <select
            value={filters.outletAvailability}
            onChange={handleOutletChange}
            className="w-full py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-md text-stone-800 focus:bg-white"
          >
            <option value="all">Any Outlets</option>
            <option value="Plenty">Plenty of outlets</option>
            <option value="Some">Some outlets</option>
          </select>
        </div>

        {/* Price of Entry */}
        <div>
          <label className="block text-stone-500 font-medium mb-1">Price Policy</label>
          <select
            value={filters.priceOfEntry}
            onChange={handlePriceChange}
            className="w-full py-1.5 px-2 bg-stone-50 border border-stone-200 rounded-md text-stone-800 focus:bg-white"
          >
            <option value="all">Any Price</option>
            <option value="Free">Completely Free</option>
            <option value="Must buy something">Buy something (Cafe)</option>
            <option value="Paid membership">Day pass / Membership</option>
          </select>
        </div>
      </div>

      {/* Filter status & Reset button */}
      <div className="flex items-center justify-between pt-2 text-xs text-stone-500">
        <div>
          Showing <span className="font-semibold text-stone-900 tabular-nums">{filteredCount}</span> of{' '}
          <span className="tabular-nums">{totalSpotsCount}</span> curated spots
          {activeFilterCount > 0 && (
            <span className="ml-1 text-emerald-800 font-medium">
              ({activeFilterCount} active filter{activeFilterCount > 1 ? 's' : ''})
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-stone-600 hover:text-stone-900 font-medium py-1 px-2 rounded hover:bg-stone-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset all filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
