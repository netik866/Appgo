import React from 'react';
import { Bookmark, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'home' | 'browse' | 'submit' | 'about' | 'saved';
  onNavigate: (tab: 'home' | 'browse' | 'submit' | 'about' | 'saved') => void;
  savedCount: number;
  openSubmitModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  savedCount,
  openSubmitModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <button
          onClick={() => onNavigate('home')}
          className="text-xl font-bold tracking-tight text-stone-900 hover:text-stone-700 transition-colors text-left flex items-center gap-2"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
          <span>WorkNook</span>
        </button>

        {/* Zone 2: 4 Clean Nav Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
          <button
            onClick={() => onNavigate('home')}
            className={`transition-colors hover:text-stone-900 py-1 border-b-2 ${
              activeTab === 'home'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('browse')}
            className={`transition-colors hover:text-stone-900 py-1 border-b-2 ${
              activeTab === 'browse'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            Browse Spots
          </button>
          <button
            onClick={() => onNavigate('saved')}
            className={`transition-colors hover:text-stone-900 py-1 border-b-2 flex items-center gap-1.5 ${
              activeTab === 'saved'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            <span>Saved</span>
            {savedCount > 0 && (
              <span className="text-xs tabular-nums text-stone-500 font-normal">
                ({savedCount})
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`transition-colors hover:text-stone-900 py-1 border-b-2 ${
              activeTab === 'about'
                ? 'border-stone-900 text-stone-900 font-semibold'
                : 'border-transparent text-stone-600'
            }`}
          >
            About
          </button>
        </nav>

        {/* Zone 3: Primary Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('saved')}
            className="md:hidden p-2 text-stone-600 hover:text-stone-900 transition-colors relative"
            aria-label="View Saved Spots"
          >
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-700"></span>
            )}
          </button>

          <button
            onClick={openSubmitModal}
            className="h-10 px-4 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-all rounded-lg flex items-center gap-1.5 whitespace-nowrap active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>Submit a Spot</span>
          </button>
        </div>
      </div>
    </header>
  );
};
