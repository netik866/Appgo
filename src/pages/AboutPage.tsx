import React from 'react';
import { Wifi, Zap, Volume2, Armchair, Coffee, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onNavigateToBrowse: () => void;
  openSubmitModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  onNavigateToBrowse,
  openSubmitModal,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-12 text-left">
      {/* Editorial Header */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <p className="text-xs font-semibold text-emerald-800 tracking-wider uppercase">
          Our Purpose & Manifesto
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight text-balance">
          Restoring the Third Place for modern focus and deep work.
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Why we built a workspace directory filtered by what actually matters for remote professionals, researchers, and students.
        </p>
      </div>

      {/* The Problem with Generic Review Sites */}
      <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 space-y-6">
        <h2 className="text-xl font-bold text-stone-900">
          Why traditional review sites fail remote workers
        </h2>
        <div className="prose prose-stone text-stone-700 text-sm leading-relaxed space-y-4">
          <p>
            When you search Google Maps or Yelp for "coffee shops", you get rated on avocado toast,
            cocktails, and weekend brunch vibes. What you rarely find is whether you will be
            scrambling for the single electrical outlet in the corner or whether the wifi password
            expires after 20 minutes.
          </p>
          <p>
            For students studying for finals, writers drafting manuscripts, or remote engineers
            shipping software, the criteria are totally different:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
            <Wifi className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-xs text-stone-900">Wifi That Doesn't Drop</h3>
              <p className="text-xs text-stone-600 mt-1">
                We test actual download speeds and reliability rather than just a checkmark saying "Free Wifi".
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-xs text-stone-900">Plugs Where You Actually Sit</h3>
              <p className="text-xs text-stone-600 mt-1">
                No guessing if power strips are accessible or if you're chained to a low-battery countdown.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
            <Volume2 className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-xs text-stone-900">Noise Environment Match</h3>
              <p className="text-xs text-stone-600 mt-1">
                Whether you need complete silence (like the Rose Reading Room) or ambient cafe chatter for flow state.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100 flex items-start gap-3">
            <Armchair className="w-5 h-5 text-stone-700 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-bold text-xs text-stone-900">Ergonomic Seating</h3>
              <p className="text-xs text-stone-600 mt-1">
                Back support for 3-hour focus sessions instead of backless metal barstools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Third Place Etiquette Code */}
      <div className="bg-white rounded-2xl border border-stone-200 p-8 sm:p-10 space-y-6">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl font-bold text-stone-900">
            The WorkNook Patron Etiquette Guide
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
          Great work spots only stay open to remote workers if we support the small businesses and staff that host us:
        </p>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <h4 className="font-bold text-stone-900">1. Buy something every 2 to 3 hours</h4>
            <p className="text-stone-600 mt-1 text-xs">
              If you camp out at an independent cafe for half a day, purchase a coffee, a pastry, or lunch. Tip the baristas generously.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <h4 className="font-bold text-stone-900">2. Headphones are non-negotiable</h4>
            <p className="text-stone-600 mt-1 text-xs">
              Never play audio out loud. If taking a brief Zoom call in a cafe, keep your speaking volume low. In libraries, take calls in the lobby.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-100">
            <h4 className="font-bold text-stone-900">3. Respect peak lunch rushes</h4>
            <p className="text-stone-600 mt-1 text-xs">
              If a cafe is packed between 12:00 PM and 1:30 PM, condense your gear and avoid taking a 4-person booth for solo laptop use.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="p-8 rounded-2xl bg-stone-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-bold">Ready to find your next focus session?</h3>
          <p className="text-xs text-stone-300 mt-1">
            Explore hundreds of verified cafes, public libraries, and spaces near you.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openSubmitModal}
            className="px-4 py-2.5 rounded-lg border border-stone-700 text-stone-200 hover:text-white hover:border-stone-500 text-xs font-semibold transition-colors"
          >
            Submit a Spot
          </button>
          <button
            onClick={onNavigateToBrowse}
            className="px-4 py-2.5 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <span>Browse Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
