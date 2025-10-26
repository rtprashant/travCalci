import React, { useState, useEffect } from 'react'; // Added useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CalendarDays, 
  Users, 
  Train,
  ArrowRightLeft, // For swap button
  Car,            // For transport
  Plane,
  Bus,
  Star,           // For hotel rating
  DollarSign,     // For budget
  CheckCircle     // For selected option
} from 'lucide-react';
import { fadeIn } from '../components/animations/main';
import ItineraryCard from '../components/ItineraryCard';
import TransportOptionCard from '../components/TransportOptionCard';
import { HotelSelectionCard, SelectionCard } from '../components/HotelSelectionCard';
import DetailInput from '../components/DetailInput';
import DateInput from '../components/DateInput';
import { LocationInput } from '../components/LocationInput';
import { ItineraryModal } from '../components/ItineraryModal';


const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const mockHotels = [
  { id: 1, name: "The Grand Plaza", type: "Luxury", rating: 4.8, pricePerNight: 350 },
  { id: 2, name: "City Center Inn", type: "Mid-range", rating: 4.2, pricePerNight: 180 },
  { id: 3, name: "Traveler's Budget Hostel", type: "Budget", rating: 3.9, pricePerNight: 75 },
  { id: 4, name: "Seaside Boutique Hotel", type: "Boutique", rating: 4.6, pricePerNight: 260 },
  { id: 5, name: "The Royal Palace", type: "Luxury", rating: 4.9, pricePerNight: 450 },
  { id: 6, name: "Urban Pods", type: "Budget", rating: 4.1, pricePerNight: 60 },
];


const mockTransportOptions = {
  Flight: [
    { id: 'aa', name: 'American Airlines', price: 850, type: 'trip', duration: '6h 30m' },
    { id: 'delta', name: 'Delta Airlines', price: 820, type: 'trip', duration: '6h 45m' },
    { id: 'spirit', name: 'Spirit (Budget)', price: 450, type: 'trip', duration: '7h 10m' },
  ],
  Train: [
    { id: 'amtrak-n', name: 'Amtrak Northeast', price: 320, type: 'trip', duration: '8h 15m' },
    { id: 'amtrak-c', name: 'Amtrak Coast', price: 290, type: 'trip', duration: '8h 40m' },
  ],
  Bus: [
    { id: 'grey', name: 'Greyhound', price: 160, type: 'trip', duration: '12h' },
    { id: 'mega', name: 'MegaBus', price: 145, type: 'trip', duration: '12h 30m' },
  ],
  Car: [
    { id: 'hertz', name: 'Hertz Compact', price: 75, type: 'day', duration: 'Self-Drive' },
    { id: 'avis', name: 'Avis SUV', price: 95, type: 'day', duration: 'Self-Drive' },
    { id: 'budget', name: 'Budget Economy', price: 65, type: 'day', duration: 'Self-Drive' },
  ]
};

// --- Helper function to get lowest price ---
const getCheapestTransportPrice = (type) => {
  if (!mockTransportOptions[type] || mockTransportOptions[type].length === 0) {
    return 0;
  }
  const prices = mockTransportOptions[type].map(op => op.price);
  return Math.min(...prices);
};

// --- Transport types array ---
const transportTypes = [
  { 
    type: 'Flight', 
    icon: <Plane size={24} />, 
    description: `From $${getCheapestTransportPrice('Flight')}` 
  },
  { 
    type: 'Train', 
    icon: <Train size={24} />, 
    description: `From $${getCheapestTransportPrice('Train')}` 
  },
  { 
    type: 'Bus', 
    icon: <Bus size={24} />, 
    description: `From $${getCheapestTransportPrice('Bus')}` 
  },
  { 
    type: 'Car', 
    icon: <Car size={24} />, 
    description: `From $${getCheapestTransportPrice('Car')}` 
  },
];

export default function PlanYourTrip() {
  // --- State for the new page ---
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState("");     
  const [days, setDays] = useState(1);            
  const [nights, setNights] = useState(0);          
  const [travelers, setTravelers] = useState(2);
  const [budgetPerNight, setBudgetPerNight] = useState(200); 
  const [selectedHotel, setSelectedHotel] = useState(null); 
  
  // --- MODIFIED: Transport State ---
  const [viewingTransportOptions, setViewingTransportOptions] = useState(""); // e.g., "Flight"
  const [selectedTransportType, setSelectedTransportType] = useState("");     // e.g., "Flight"
  const [selectedTransportOption, setSelectedTransportOption] = useState(null); // The specific flight/train object
  
  const [isDurationSet, setIsDurationSet] = useState(false); 

  // This state triggers the animation
  const [isPlanning, setIsPlanning] = useState(false);

  // --- State for the modal ---
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  // --- REMOVED: transportCostMap ---

  // --- UPDATED: useEffect to calculate days/nights and set duration flag ---
  useEffect(() => {
    if (startDate && endDate) {
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
      if (date2 >= date1) { // Valid date range
        const diffTime = date2.getTime() - date1.getTime();
        const nightsCalc = Math.round(diffTime / (1000 * 60 * 60 * 24));
        const daysCalc = nightsCalc + 1;
        setNights(nightsCalc);
        setDays(daysCalc);
        setIsDurationSet(true);
      } else {
        // End date is before start date - INVALID
        setIsDurationSet(false);
      }
    } else {
      // One or both dates are missing
      setIsDurationSet(false);
    }
  }, [startDate, endDate]);

  // --- NEW: useEffect to reset hotel if budget changes ---
  useEffect(() => {
    if (selectedHotel && selectedHotel.pricePerNight > budgetPerNight) {
      setSelectedHotel(null);
    }
  }, [budgetPerNight, selectedHotel]);

  // --- NEW: useEffect to reset transport if duration changes ---
  useEffect(() => {
    // If dates change, transport cost might change (if 'per day')
    // Easiest is to force re-selection.
    setSelectedTransportOption(null);
    setSelectedTransportType("");
    setViewingTransportOptions("");
  }, [isDurationSet]);

  const handleContinue = () => {
    if (source && destination) {
      setIsPlanning(true);
    }
  };
  
  const handleSwapLocations = () => {
    const tempSource = source;
    setSource(destination);
    setDestination(tempSource);
  };
  
  // --- NEW: Handler for viewing transport options ---
  const handleViewTransportOptions = (type) => {
    if (viewingTransportOptions === type) {
      setViewingTransportOptions(""); // Toggle off
    } else {
      setViewingTransportOptions(type);
    }
  };

  // --- NEW: Handler for selecting a specific transport option ---
  const handleSelectTransportOption = (option) => {
    setSelectedTransportOption(option);
    setSelectedTransportType(viewingTransportOptions); // Set the parent type
    // Keep the list open after selection like hotels
  };
  
  // --- UPDATED: Filter hotels based on budget slider ---
  const filteredHotels = mockHotels.filter(hotel => {
    return hotel.pricePerNight <= budgetPerNight;
  });

  // --- UPDATED: Generate Itinerary Logic ---
  const handleGenerateItinerary = () => {
    // UPDATED: Transport cost logic
    const transportDetails = selectedTransportOption; // Use the specific selected option
    let transportCost = 0;
    if (transportDetails.type === 'trip') {
      transportCost = transportDetails.price * travelers;
    } else { // 'day'
      transportCost = transportDetails.price * days; // Car cost is per day
    }

    const hotelCost = (selectedHotel.pricePerNight * nights) || 0; 
    const foodCost = 80 * travelers * days; 
    const activityCost = 50 * travelers * days; 
    const avgCost = hotelCost + transportCost + foodCost + activityCost;

    const dummyItinerary = {
      id: 99,
      location: `${destination}` || "Unknown",
      days: days,
      nights: nights,
      travelers: travelers,
      avgCost,
      hotelCost,
      foodCost,
      activityCost,
      transportCost,
      imageUrl: `https://placehold.co/600x400/cccccc/FFFFFF?text=${destination.replace(/\s/g, '+')}&font=inter`,
      description: `Your custom-planned ${days}-day trip to ${destination} for ${travelers} ${travelers > 1 ? 'people' : 'person'}, staying at ${selectedHotel.name}.`,
      
    };

    setGeneratedItinerary(dummyItinerary);
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);
  
  const canContinue = source && destination;
  // --- UPDATED: Can Generate Logic ---
  const canGenerate = selectedHotel && selectedTransportOption && travelers > 0 && isDurationSet;

  // --- ADDED: Today's date for min attribute on date picker ---
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-inter">
      {/* --- ADDED: Style tag to hide scrollbar (from itinerary.jsx) --- */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      
      {/* This is the main animation container */}
      <motion.div
        layout
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`w-full ${
          isPlanning
            ? ' py-6'
            : 'h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'
        }`}
      >
        <div className={`flex items-center ${
          isPlanning 
            ? 'flex-row flex-wrap justify-center gap-3 sm:gap-4 max-w-6xl mx-auto px-4' 
            : 'flex-col justify-center gap-6 sm:gap-8 px-4'
        }`}>
          {/* These two boxes will SWAP positions */}
          <LocationInput
            label="From"
            placeholder="e.g., New York"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            layoutId={isPlanning ? "destination-box" : "source-box"}
            isPlanning={isPlanning}
          />
          
          <LocationInput
            label="To"
            placeholder="e.g., Paris"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            layoutId={isPlanning ? "source-box" : "destination-box"}
            isPlanning={isPlanning}
          />

          {/* Show Continue button OR Swap button */}
          <AnimatePresence>
            {!isPlanning ? (
              <motion.button
                key="continue"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                disabled={!canContinue}
                onClick={handleContinue}
                className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 bg-blue-600 text-white font-bold text-base sm:text-lg rounded-xl shadow-lg transition-all
                           disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed
                           hover:bg-blue-700 hover:scale-105"
              >
                Continue
              </motion.button>
            ) : (
              <motion.button
                key="swap"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                onClick={handleSwapLocations}
                className="p-2 sm:p-3 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200"
                title="Swap locations"
              >
                <ArrowRightLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* --- This is the content that appears AFTER animation --- */}
      <AnimatePresence>
        {isPlanning && (
          <motion.div
            className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerContainer}
          >
            {/* --- MODIFIED: Trip Details Section --- */}
            <motion.div variants={fadeIn} className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Trip Details
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* REPLACED days/nights inputs with date pickers */}
                <DateInput 
                  icon={<CalendarDays size={20} className="text-gray-500" />}
                  label="Start Date"
                  value={startDate}
                  onChange={setStartDate}
                  min={today}
                />
                <DateInput 
                  icon={<CalendarDays size={20} className="text-gray-500" />}
                  label="End Date"
                  value={endDate}
                  onChange={setEndDate}
                  min={startDate || today}
                />
                <DetailInput 
                  icon={<Users size={20} className="text-gray-500" />}
                  label="Number of Travelers"
                  value={travelers}
                  onChange={setTravelers}
                />
              </div>
              {/* UPDATED: Display for calculated duration (now conditional) */}
              <AnimatePresence>
                {isDurationSet && (
                  <motion.div
                    className="mt-6 text-center text-lg text-gray-600 bg-white p-4 rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                  >
                    <p>Calculated duration: <span className="font-bold text-blue-700">{days} {days === 1 ? 'Day' : 'Days'} / {nights} {nights === 1 ? 'Night' : 'Nights'}</span></p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* --- UPDATED: All sections below are now conditional on duration --- */}
            <AnimatePresence>
              {isDurationSet && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={staggerContainer}
                >
                  {/* --- UPDATED: Budget Slider Section --- */}
                  <motion.div variants={fadeIn} className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Set Your Max Hotel Budget
                    </h2>
                    <div className="bg-white p-6 rounded-xl shadow-lg">
                      <div className="flex justify-between items-center mb-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-500">
                          <DollarSign size={20} />
                          Max Price Per Night
                        </label>
                        <span className="text-2xl font-bold text-blue-700">
                          ${budgetPerNight}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="500"
                        step="10"
                        value={budgetPerNight}
                        onChange={(e) => setBudgetPerNight(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>$50</span>
                        <span>$500</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* --- UPDATED: Hotel Selection (now conditional on filter) --- */}
                  <motion.div
                    variants={fadeIn}
                    className="mb-12"
                  >
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">
                      Select Your Hotel (up to ${budgetPerNight}/night)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredHotels.length > 0 ? (
                        filteredHotels.map((hotel) => (
                          <HotelSelectionCard
                            key={hotel.id}
                            hotel={hotel}
                            selected={selectedHotel?.id === hotel.id}
                            onClick={setSelectedHotel}
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 md:col-span-2">
                          No hotels found at or below ${budgetPerNight}. Try adjusting your budget.
                        </p>
                      )}
                    </div>
                  </motion.div>

                  {/* --- UPDATED: Transport Selection (with price) --- */}
                  <motion.div 
                    variants={fadeIn} 
                    className="mb-8" // MODIFIED: Reduced margin
                  >
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                      Choose Your Transport
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                      {transportTypes.map((transport) => (
                        <SelectionCard
                          key={transport.type}
                          icon={transport.icon}
                          title={transport.type}
                          value={transport.type}
                          selected={viewingTransportOptions === transport.type || selectedTransportType === transport.type}
                          onClick={handleViewTransportOptions}
                        //   description={transport.description}
                        />
                      ))}
                    </div>
                  </motion.div>
                  
                  {/* --- NEW: Transport Options List --- */}
                  <AnimatePresence>
                    {viewingTransportOptions && (
                      <motion.div
                        className="mb-16" // MODIFIED: Added margin here
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={staggerContainer}
                      >
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                          Select a {viewingTransportOptions} Option
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mockTransportOptions[viewingTransportOptions].map((option) => (
                            <TransportOptionCard
                              key={option.id}
                              option={option}
                              selected={selectedTransportOption?.id === option.id}
                              onClick={handleSelectTransportOption}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* --- UPDATED: Generate Button (now conditional) --- */}
                  <AnimatePresence>
                    {canGenerate && (
                      <motion.div variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="text-center">
                        <button
                          onClick={handleGenerateItinerary}
                          className="px-12 py-5 bg-green-600 text-white font-bold text-xl rounded-xl shadow-lg transition-all
                                     hover:bg-green-700 hover:scale-105"
                        >
                          Generate Itinerary
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reusable Modal */}
      <ItineraryModal
        isOpen={modalOpen}
        onClose={closeModal}
        itinerary={generatedItinerary}
      />
      
      
    </div>
  );
}

