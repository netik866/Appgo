import React, { useState, useEffect } from 'react';
import { Spot, FilterOptions } from './types';
import {
  getAllSpots,
  saveNewSpot,
  getSavedSpotIds,
  toggleSavedSpotId,
  getUpvotedSpotIds,
  toggleUpvoteSpotId,
} from './utils/storage';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SpotDetailModal } from './components/SpotDetailModal';
import { SubmitSpotModal } from './components/SubmitSpotModal';
import { HomePage } from './pages/HomePage';
import { BrowsePage } from './pages/BrowsePage';
import { AboutPage } from './pages/AboutPage';

const INITIAL_FILTERS: FilterOptions = {
  searchQuery: '',
  city: 'All Cities',
  category: 'all',
  wifiQuality: 'all',
  noiseLevel: 'all',
  priceOfEntry: 'all',
  outletAvailability: 'all',
  minComfort: 1,
  sortBy: 'rating',
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'browse' | 'saved' | 'about'>('home');
  const [spots, setSpots] = useState<Spot[]>([]);
  const [savedSpotIds, setSavedSpotIds] = useState<string[]>([]);
  const [upvotedSpotIds, setUpvotedSpotIds] = useState<string[]>([]);
  const [selectedSpot, setSelectedSpot] = useState<Spot | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(INITIAL_FILTERS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data on mount
  useEffect(() => {
    setSpots(getAllSpots());
    setSavedSpotIds(getSavedSpotIds());
    setUpvotedSpotIds(getUpvotedSpotIds());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const updated = toggleSavedSpotId(id);
    setSavedSpotIds(updated);
    const wasSaved = updated.includes(id);
    showToast(wasSaved ? 'Saved to your collection' : 'Removed from saved');
  };

  const handleToggleUpvote = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const result = toggleUpvoteSpotId(id);
    setUpvotedSpotIds(result.allUpvoted);
    showToast(result.upvoted ? 'Thank you for recommending this spot!' : 'Recommendation removed');
  };

  const handleAddSpot = (newSpot: Spot) => {
    saveNewSpot(newSpot);
    setSpots((prev) => [newSpot, ...prev]);
    showToast(`"${newSpot.name}" was added to the directory!`);
  };

  const handleNavigateToBrowseWithFilters = (initialFilters?: {
    city?: string;
    category?: string;
    searchQuery?: string;
  }) => {
    setFilters((prev) => ({
      ...prev,
      city: initialFilters?.city || prev.city,
      category: initialFilters?.category || prev.category,
      searchQuery: initialFilters?.searchQuery !== undefined ? initialFilters.searchQuery : prev.searchQuery,
    }));
    setActiveTab('browse');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 font-sans pb-16 md:pb-0">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white text-xs font-medium px-4 py-2.5 rounded-lg shadow-xl animate-in fade-in slide-in-from-top-2 border border-stone-700/80">
          {toastMessage}
        </div>
      )}

      {/* Header Bar */}
      <Header
        activeTab={activeTab === 'saved' ? 'saved' : activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedSpotIds.length}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomePage
            spots={spots}
            savedSpotIds={savedSpotIds}
            upvotedSpotIds={upvotedSpotIds}
            onToggleSave={handleToggleSave}
            onToggleUpvote={handleToggleUpvote}
            onSelectSpot={setSelectedSpot}
            onNavigateToBrowse={handleNavigateToBrowseWithFilters}
            openSubmitModal={() => setIsSubmitModalOpen(true)}
          />
        )}

        {activeTab === 'browse' && (
          <BrowsePage
            spots={spots}
            savedSpotIds={savedSpotIds}
            upvotedSpotIds={upvotedSpotIds}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            onToggleSave={handleToggleSave}
            onToggleUpvote={handleToggleUpvote}
            onSelectSpot={setSelectedSpot}
            showOnlySaved={false}
            onToggleSavedMode={(savedOnly) => {
              if (savedOnly) setActiveTab('saved');
            }}
          />
        )}

        {activeTab === 'saved' && (
          <BrowsePage
            spots={spots}
            savedSpotIds={savedSpotIds}
            upvotedSpotIds={upvotedSpotIds}
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            onToggleSave={handleToggleSave}
            onToggleUpvote={handleToggleUpvote}
            onSelectSpot={setSelectedSpot}
            showOnlySaved={true}
            onToggleSavedMode={(savedOnly) => {
              if (!savedOnly) setActiveTab('browse');
            }}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigateToBrowse={() => {
              setActiveTab('browse');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            openSubmitModal={() => setIsSubmitModalOpen(true)}
          />
        )}
      </main>

      {/* Spot Detail Modal */}
      <SpotDetailModal
        spot={selectedSpot}
        onClose={() => setSelectedSpot(null)}
        isSaved={selectedSpot ? savedSpotIds.includes(selectedSpot.id) : false}
        isUpvoted={selectedSpot ? upvotedSpotIds.includes(selectedSpot.id) : false}
        onToggleSave={handleToggleSave}
        onToggleUpvote={handleToggleUpvote}
      />

      {/* Submit Spot Modal */}
      <SubmitSpotModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onAddSpot={handleAddSpot}
      />

      {/* Footer */}
      <Footer
        onNavigate={(tab) => {
          if (tab === 'submit') {
            setIsSubmitModalOpen(true);
          } else {
            setActiveTab(tab as any);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
      />

      {/* Mobile Bottom Tab Bar */}
      <MobileBottomNav
        activeTab={activeTab === 'saved' ? 'saved' : activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab as any);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        savedCount={savedSpotIds.length}
        openSubmitModal={() => setIsSubmitModalOpen(true)}
      />
    </div>
  );
}
