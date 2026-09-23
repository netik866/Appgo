import React from 'react';
import { Home, Compass, Bookmark, PlusCircle, Info } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'home' | 'browse' | 'submit' | 'about' | 'saved';
  onNavigate: (tab: 'home' | 'browse' | 'submit' | 'about' | 'saved') => void;
  savedCount: number;
  openSubmitModal: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onNavigate,
  savedCount,
  openSubmitModal,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-stone-50/95 backdrop-blur-md border-t border-stone-200">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto px-2">
        <button
          onClick={() => onNavigate('home')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'home' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Home</span>
        </button>

        <button
          onClick={() => onNavigate('browse')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'browse' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">Browse</span>
        </button>

        <button
          onClick={openSubmitModal}
          className="flex flex-col items-center justify-center min-h-[44px] py-1 text-stone-900 transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shadow-sm">
            <PlusCircle className="w-5 h-5" />
          </div>
          <span className="text-[10px] mt-0.5 tracking-tight font-medium">Add</span>
        </button>

        <button
          onClick={() => onNavigate('saved')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors relative ${
            activeTab === 'saved' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5" />
            {savedCount > 0 && (
              <span className="absolute -top-1 -right-2 text-[9px] bg-emerald-700 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold tabular-nums">
                {savedCount}
              </span>
            )}
          </div>
          <span className="text-[10px] mt-1 tracking-tight">Saved</span>
        </button>

        <button
          onClick={() => onNavigate('about')}
          className={`flex flex-col items-center justify-center min-h-[44px] py-1 transition-colors ${
            activeTab === 'about' ? 'text-emerald-800 font-semibold' : 'text-stone-500'
          }`}
        >
          <Info className="w-5 h-5" />
          <span className="text-[10px] mt-1 tracking-tight">About</span>
        </button>
      </div>
    </nav>
  );
};
