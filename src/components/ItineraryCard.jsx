import { CalendarDays, Users } from "lucide-react";
import { fadeIn } from "./animations/main";
import { motion, AnimatePresence } from 'framer-motion';
export default function ItineraryCard({ itinerary, onClick }) {
  const { location, days, nights, travelers, avgCost, imageUrl } = itinerary;

  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
      variants={fadeIn}
      whileHover={{ scale: 1.03, shadow: "0 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onClick={onClick}
      layoutId={`card-container-${itinerary.id}`} // For potential shared layout animation
    >
      <motion.img
        className="w-full h-48 object-cover"
        src={imageUrl}
        alt={location}
        layoutId={`card-image-${itinerary.id}`}
        onError={(e) => { e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Error&font=inter'; }}
      />
      <div className="p-5">
        <motion.h3 
          className="text-2xl font-bold text-gray-900 mb-2"
          layoutId={`card-title-${itinerary.id}`}
        >
          {location}
        </motion.h3>
        
        {/* Stats */}
        <div className="flex flex-col gap-2 text-gray-600 mb-4">
          <div className="flex items-center gap-2">
            <CalendarDays size={18} className="text-blue-500" />
            <span>{days} Days / {nights} Nights</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} className="text-blue-500" />
            <span>{travelers} Travelers</span>
          </div>
        </div>

        {/* Cost */}
        <div className="border-t pt-4">
          <p className="text-sm text-gray-500">Estimated Cost</p>
          <p className="text-3xl font-extrabold text-blue-700">
            Rs {avgCost.toLocaleString()}
          </p>
        </div>
      </div>
    </motion.div>
  );
}