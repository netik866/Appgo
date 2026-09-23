import React, { useState } from 'react';
import { Spot } from '../types';
import { CITIES, CATEGORIES } from '../data/mockSpots';
import { SpotCard } from '../components/SpotCard';
import {
  Search,
  MapPin,
  ArrowRight,
  Wifi,
  Zap,
  Volume2,
  Armchair,
  Sparkles,
  Building2,
  Coffee,
  BookOpen,
  Bookmark
} from 'lucide-react';

interface HomePageProps {
  spots: Spot[];
  savedSpotIds: string[];
  upvotedSpotIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onToggleUpvote: (id: string, e: React.MouseEvent) => void;
  onSelectSpot: (spot: Spot) => void;
  onNavigateToBrowse: (initialFilters?: { city?: string; category?: string; searchQuery?: string }) => void;
  openSubmitModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  spots,
  savedSpotIds,
  upvotedSpotIds,
  onToggleSave,
  onToggleUpvote,
  onSelectSpot,
  onNavigateToBrowse,
  openSubmitModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('All Cities');

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateToBrowse({
      searchQuery: searchQuery.trim(),
      city: selectedCity,
    });
  };

  // Top rated / featured spots
  const featuredSpots = [...spots]
    .sort((a, b) => b.visitorRating - a.visitorRating)
    .slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-14 pb-8 max-w-4xl mx-auto text-center px-4">
        {/* Editorial Subtitle / Kicker */}
        <p className="text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide uppercase mb-3">
          The Curated Third-Place Directory
        </p>

        {/* Balanced Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
          Find productive places to work outside your home.
        </h1>

        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
          Cafes, quiet libraries, and focus-ready co-working spaces — filtered strictly by what actually matters for getting real work done.
        </p>

        {/* Hero Search Box */}
        <form
          onSubmit={handleHeroSearch}
          className="mt-8 sm:mt-10 p-2 sm:p-2.5 bg-white rounded-2xl shadow-lg border border-stone-200/80 flex flex-col sm:flex-row gap-2 max-w-2xl mx-auto text-left"
        >
          {/* Text search */}
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search spots, coffee shops, libraries..."
              className="w-full pl-11 pr-4 py-3 bg-transparent text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none"
            />
          </div>

          <div className="h-px sm:h-8 sm:w-px bg-stone-200 self-center hidden sm:block"></div>

          {/* City selector in hero */}
          <div className="relative sm:w-44 flex items-center">
            <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full pl-9 pr-8 py-3 bg-transparent text-sm font-medium text-stone-800 focus:outline-none cursor-pointer"
            >
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="h-12 px-6 bg-stone-900 hover:bg-stone-800 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 active:scale-[0.99] whitespace-nowrap"
          >
            <span>Explore Spots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Category Jump Controls */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-stone-400 font-medium">Quick jump:</span>
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => onNavigateToBrowse({ category: cat.id })}
              className="px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200/80 text-stone-700 font-medium transition-colors"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Curated Spots */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Featured Focus Spaces
            </h2>
            <p className="text-sm text-stone-500 mt-1">
              Hand-verified workspaces rated highest by remote workers and students this week.
            </p>
          </div>

          <button
            onClick={() => onNavigateToBrowse()}
            className="text-sm font-semibold text-emerald-800 hover:text-emerald-950 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all spots</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredSpots.map((spot) => (
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
      </section>

      {/* The 4 Work Readiness Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-12">
          <div className="max-w-xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Filtered by what actually matters.
            </h2>
            <p className="mt-2 text-sm text-stone-600 leading-relaxed">
              Standard review platforms judge places on food photos and cocktails.
              WorkNook is built specifically for focus, deep work, and study sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-emerald-100/80 text-emerald-800 flex items-center justify-center mb-3">
                  <Wifi className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Tested Wifi Speeds</h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                  Real ping and throughput data so you never get stuck on a critical video call.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-stone-400 font-medium">
                Fast & reliable benchmark
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-amber-100/80 text-amber-800 flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Outlet Density</h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                  Know exactly whether tables have dedicated plugs or if you must charge beforehand.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-stone-400 font-medium">
                Plenty / Some / None mapping
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-sky-100/80 text-sky-800 flex items-center justify-center mb-3">
                  <Volume2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Noise Atmosphere</h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                  From pin-drop silent reading rooms to energetic background cafe murmurs.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-stone-400 font-medium">
                Silent to Lively levels
              </div>
            </div>

            <div className="p-5 rounded-xl bg-stone-50 border border-stone-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-lg bg-stone-200 text-stone-800 flex items-center justify-center mb-3">
                  <Armchair className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-stone-900 text-sm">Seating Comfort</h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed">
                  Ergonomic chairs vs backless wooden benches. Know before you settle in for a 4-hour sprint.
                </p>
              </div>
              <div className="mt-4 text-[11px] text-stone-400 font-medium">
                1–5 Comfort scoring
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore by City Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight mb-6">
          Explore Work Spaces by City
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CITIES.filter((c) => c !== 'All Cities').map((city) => {
            const count = spots.filter((s) => s.city.toLowerCase() === city.toLowerCase()).length;
            return (
              <button
                key={city}
                onClick={() => onNavigateToBrowse({ city })}
                className="p-4 rounded-xl bg-white border border-stone-200/80 hover:border-stone-400 hover:shadow-xs transition-all text-left group"
              >
                <p className="text-sm font-bold text-stone-900 group-hover:text-emerald-800 transition-colors">
                  {city}
                </p>
                <p className="text-xs text-stone-500 mt-1 tabular-nums">
                  {count} {count === 1 ? 'spot' : 'spots'} available
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Community Contribution Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-6">
        <div className="p-8 sm:p-10 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="max-w-lg">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              Know an undercover focus spot?
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
              Help fellow remote professionals and students. Add your go-to cafe with dependable power and wifi to the directory. No login required.
            </p>
          </div>

          <button
            onClick={openSubmitModal}
            className="h-11 px-6 rounded-lg bg-white text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-colors shrink-0"
          >
            Submit a Location
          </button>
        </div>
      </section>
    </div>
  );
};
