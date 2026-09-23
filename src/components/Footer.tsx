import React from 'react';

interface FooterProps {
  onNavigate: (tab: 'home' | 'browse' | 'submit' | 'about' | 'saved') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-20 border-t border-stone-200 bg-white text-stone-600 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-700"></span>
              <span className="text-base font-bold tracking-tight text-stone-900">WorkNook</span>
            </div>
            <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
              A curated community directory for remote knowledge workers, researchers, and students
              seeking reliable "third places" with verified wifi, ample outlets, and focus-friendly atmosphere.
            </p>
          </div>

          {/* Directory Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs tracking-wider uppercase">Directory</h4>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onNavigate('browse')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Browse All Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Featured Work Nooks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Your Saved Spaces
                </button>
              </li>
            </ul>
          </div>

          {/* Project & Community Links */}
          <div className="space-y-2">
            <h4 className="font-semibold text-stone-900 text-xs tracking-wider uppercase">Community</h4>
            <ul className="space-y-1.5 text-stone-500">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Why We Built WorkNook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('submit')}
                  className="hover:text-stone-900 transition-colors"
                >
                  Contribute a Location
                </button>
              </li>
              <li>
                <span className="text-stone-400">Open-source & Community Curated</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-400 text-[11px]">
          <p>© {new Date().getFullYear()} WorkNook. Finding your optimal third place for deep work.</p>
          <div className="flex items-center gap-4">
            <span>No ads. No sponsored placements. Just focus.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
