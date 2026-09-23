import React, { useState } from 'react';
import { Spot, CategoryType, WifiQuality, OutletAvailability, NoiseLevel, PriceOfEntry } from '../types';
import { CITIES } from '../data/mockSpots';
import { X, CheckCircle, Sparkles } from 'lucide-react';

interface SubmitSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSpot: (spot: Spot) => void;
}

export const SubmitSpotModal: React.FC<SubmitSpotModalProps> = ({
  isOpen,
  onClose,
  onAddSpot,
}) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState(CITIES[1] || 'San Francisco');
  const [customCity, setCustomCity] = useState('');
  const [category, setCategory] = useState<CategoryType>('cafe');
  const [wifiQuality, setWifiQuality] = useState<WifiQuality>('Fast & Reliable');
  const [wifiSpeedMbps, setWifiSpeedMbps] = useState<string>('80');
  const [outletAvailability, setOutletAvailability] = useState<OutletAvailability>('Plenty');
  const [noiseLevel, setNoiseLevel] = useState<NoiseLevel>('Quiet');
  const [seatingComfort, setSeatingComfort] = useState<number>(4);
  const [priceOfEntry, setPriceOfEntry] = useState<PriceOfEntry>('Must buy something');
  const [hours, setHours] = useState('Mon–Fri: 8:00 AM – 7:00 PM · Sat–Sun: 9:00 AM – 6:00 PM');
  const [shortDescription, setShortDescription] = useState('');
  const [insiderTip, setInsiderTip] = useState('');
  const [submittedBy, setSubmittedBy] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([
    'Natural daylight',
    'Restrooms for customers',
  ]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const availableAmenities = [
    'Natural daylight',
    'Standing desks / high tops',
    'Power strips on tables',
    'Soundproof call booths',
    'Restrooms for customers',
    'Specialty coffee & tea',
    'Outdoor patio seating',
    'Late hours (past 8pm)',
    'Air conditioning',
    'Pet friendly',
  ];

  const toggleAmenity = (item: string) => {
    if (selectedAmenities.includes(item)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== item));
    } else {
      setSelectedAmenities([...selectedAmenities, item]);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Please provide the place name.';
    if (!neighborhood.trim()) errs.neighborhood = 'Neighborhood is required (e.g. SoMa, Midtown).';
    if (!address.trim()) errs.address = 'Street address is required.';
    if (!shortDescription.trim()) {
      errs.shortDescription = 'Please provide a 1–2 sentence description of the workspace.';
    } else if (shortDescription.trim().length < 15) {
      errs.shortDescription = 'Description should be at least 15 characters.';
    }
    if (!submittedBy.trim()) errs.submittedBy = 'Please provide your name or handle.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const resolvedCity = city === 'Other' ? customCity || 'Other' : city;

    // Use one of our local high-res photos as default fallback depending on category
    let defaultPhoto = '/src/assets/images/spot_cafe_focus_1790144106490.jpg';
    if (category === 'library') {
      defaultPhoto = '/src/assets/images/spot_library_hall_1790144125181.jpg';
    } else if (category === 'coworking') {
      defaultPhoto = '/src/assets/images/spot_coworking_loft_1790144141769.jpg';
    } else if (category === 'bookstore') {
      defaultPhoto = '/src/assets/images/spot_bookstore_study_1790144157840.jpg';
    }

    const newSpot: Spot = {
      id: `spot-user-${Date.now()}`,
      name: name.trim(),
      address: address.trim(),
      neighborhood: neighborhood.trim(),
      city: resolvedCity,
      category,
      wifiQuality,
      wifiSpeedMbps: wifiSpeedMbps ? parseInt(wifiSpeedMbps, 10) : undefined,
      outletAvailability,
      noiseLevel,
      seatingComfort,
      priceOfEntry,
      hours: hours.trim() || 'Check online for hours',
      photos: photoUrl.trim() ? [photoUrl.trim()] : [defaultPhoto],
      shortDescription: shortDescription.trim(),
      insiderTip: insiderTip.trim() || undefined,
      submittedBy: submittedBy.trim(),
      dateAdded: new Date().toISOString().split('T')[0],
      visitorRating: 5.0,
      reviewCount: 1,
      upvotes: 1,
      amenities: selectedAmenities,
    };

    onAddSpot(newSpot);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-auto max-h-[92vh] flex flex-col text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50/80">
          <div>
            <h2 className="text-lg font-bold text-stone-900">Submit a Work-Friendly Spot</h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Recommend a cafe, library, or space that actually works for remote focus.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Form */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {success ? (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-stone-900">Spot Submitted!</h3>
              <p className="text-xs text-stone-600 max-w-sm">
                Thank you for contributing to the community! Your spot has been added to the directory and is live now.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Basics */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  1. Location Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Place Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Verve Coffee Roasters"
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm focus:bg-white transition-colors ${
                        errors.name ? 'border-rose-400 focus:border-rose-500' : 'border-stone-200'
                      }`}
                    />
                    {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Category <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryType)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white"
                    >
                      <option value="cafe">Cafe</option>
                      <option value="library">Public Library</option>
                      <option value="coworking">Co-Working Space</option>
                      <option value="bookstore">Bookstore Cafe</option>
                      <option value="other">Other Space</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      City <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:bg-white"
                    >
                      {CITIES.filter((c) => c !== 'All Cities').map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="Other">Other City...</option>
                    </select>
                    {city === 'Other' && (
                      <input
                        type="text"
                        value={customCity}
                        onChange={(e) => setCustomCity(e.target.value)}
                        placeholder="Enter city name..."
                        className="w-full mt-2 px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                      />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Neighborhood <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={neighborhood}
                      onChange={(e) => setNeighborhood(e.target.value)}
                      placeholder="e.g. SoMa, Capitol Hill, Wicker Park"
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm ${
                        errors.neighborhood ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.neighborhood && (
                      <p className="text-xs text-rose-600 mt-1">{errors.neighborhood}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Street Address <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g. 123 Market St"
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm ${
                        errors.address ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.address && (
                      <p className="text-xs text-rose-600 mt-1">{errors.address}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Work Readiness Criteria */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  2. Work & Study Readiness Criteria
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Wifi Quality */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Wifi Quality
                    </label>
                    <select
                      value={wifiQuality}
                      onChange={(e) => setWifiQuality(e.target.value as WifiQuality)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    >
                      <option value="Fast & Reliable">Fast & Reliable (video calls ok)</option>
                      <option value="Decent">Decent (browsing & docs)</option>
                      <option value="Unreliable">Unreliable</option>
                      <option value="None">No Wifi</option>
                    </select>
                  </div>

                  {/* Wifi Speed */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Tested Wifi Speed (approx. Mbps)
                    </label>
                    <input
                      type="number"
                      value={wifiSpeedMbps}
                      onChange={(e) => setWifiSpeedMbps(e.target.value)}
                      placeholder="e.g. 75"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                  </div>

                  {/* Outlet Availability */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Power Outlets Availability
                    </label>
                    <select
                      value={outletAvailability}
                      onChange={(e) => setOutletAvailability(e.target.value as OutletAvailability)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    >
                      <option value="Plenty">Plenty (at most tables)</option>
                      <option value="Some">Some (perimeter walls / limited)</option>
                      <option value="None">None / very rare</option>
                    </select>
                  </div>

                  {/* Noise Level */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Noise Level
                    </label>
                    <select
                      value={noiseLevel}
                      onChange={(e) => setNoiseLevel(e.target.value as NoiseLevel)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    >
                      <option value="Silent">Silent (strictly quiet)</option>
                      <option value="Quiet">Quiet (soft hum / whispers)</option>
                      <option value="Moderate">Moderate (ambient music & chatter)</option>
                      <option value="Lively">Lively (busy cafe bustle)</option>
                    </select>
                  </div>

                  {/* Seating Comfort */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Seating Comfort: <span className="font-bold">{seatingComfort} / 5</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      value={seatingComfort}
                      onChange={(e) => setSeatingComfort(parseInt(e.target.value, 10))}
                      className="w-full accent-emerald-800 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-stone-500">
                      <span>1 (Stiff wooden stools)</span>
                      <span>5 (Ergonomic / Cushioned)</span>
                    </div>
                  </div>

                  {/* Price of Entry */}
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Price of Entry
                    </label>
                    <select
                      value={priceOfEntry}
                      onChange={(e) => setPriceOfEntry(e.target.value as PriceOfEntry)}
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    >
                      <option value="Free">Completely Free (e.g. Public Library)</option>
                      <option value="Must buy something">Must buy something (Coffee/Pastry)</option>
                      <option value="Paid membership">Paid day pass / membership required</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Space Amenities */}
              <div className="space-y-3 pt-4 border-t border-stone-100">
                <label className="block text-xs font-bold text-stone-900 uppercase tracking-wider">
                  3. Key Amenities
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {availableAmenities.map((amenity) => {
                    const isChecked = selectedAmenities.includes(amenity);
                    return (
                      <button
                        type="button"
                        key={amenity}
                        onClick={() => toggleAmenity(amenity)}
                        className={`text-left text-xs p-2 rounded-lg border transition-colors ${
                          isChecked
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        {amenity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hours, Description, Tips, & Submitter */}
              <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider">
                  4. Details & Insider Knowledge
                </h3>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Hours of Operation
                  </label>
                  <input
                    type="text"
                    value={hours}
                    onChange={(e) => setHours(e.target.value)}
                    placeholder="e.g. Mon–Fri: 7am–7pm · Sat–Sun: 8am–6pm"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Short Description / Overview <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={shortDescription}
                    onChange={(e) => setShortDescription(e.target.value)}
                    placeholder="1–2 sentences explaining what makes this spot great for working..."
                    className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm ${
                      errors.shortDescription ? 'border-rose-400' : 'border-stone-200'
                    }`}
                  />
                  {errors.shortDescription && (
                    <p className="text-xs text-rose-600 mt-1">{errors.shortDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">
                    Insider Tip for Workers (Optional)
                  </label>
                  <input
                    type="text"
                    value={insiderTip}
                    onChange={(e) => setInsiderTip(e.target.value)}
                    placeholder="e.g. The quiet back tables have power strips under the wooden bench"
                    className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Your Name or Handle <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      value={submittedBy}
                      onChange={(e) => setSubmittedBy(e.target.value)}
                      placeholder="e.g. Alex R. (Remote Developer)"
                      className={`w-full px-3 py-2 bg-stone-50 border rounded-lg text-sm ${
                        errors.submittedBy ? 'border-rose-400' : 'border-stone-200'
                      }`}
                    />
                    {errors.submittedBy && (
                      <p className="text-xs text-rose-600 mt-1">{errors.submittedBy}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 mb-1">
                      Photo Image URL (Optional)
                    </label>
                    <input
                      type="text"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      placeholder="Optional link or leaves default curated photo"
                      className="w-full px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Form Submission Action */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 rounded-lg hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="h-10 px-6 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 transition-colors rounded-lg active:scale-[0.98] shadow-sm"
                >
                  Submit Spot
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
