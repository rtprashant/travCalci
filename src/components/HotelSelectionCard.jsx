import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { fadeIn } from './animations/main';
export function HotelSelectionCard({ hotel, selected, onClick }) {
  const { name, type, rating, pricePerNight } = hotel;
  return (
    <motion.div
      className={`p-6 bg-white rounded-xl shadow-lg cursor-pointer border-2 transition-all ${
        selected ? 'border-blue-500 scale-105 shadow-blue-100' : 'border-transparent hover:shadow-md'
      }`}
      onClick={() => onClick(hotel)}
      variants={fadeIn}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full inline-block mb-2">
            {type}
          </p>
          <h4 className="text-xl font-bold text-gray-900">{name}</h4>
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            <Star size={16} fill="currentColor" />
            <span className="font-bold text-gray-700">{rating}</span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-extrabold text-blue-700">${pricePerNight}</p>
          <p className="text-sm text-gray-500">per night</p>
        </div>
      </div>
    </motion.div>
  );
}

export function SelectionCard({ icon, title, value, selected, onClick, description }) {
  return (
    <motion.div
      className={`p-3 sm:p-4 md:p-6 bg-white rounded-lg sm:rounded-xl shadow-lg cursor-pointer border-2 transition-all ${
        selected ? 'border-blue-500 scale-105 shadow-blue-100' : 'border-transparent hover:shadow-md'
      }`}
      onClick={() => onClick(value)}
      variants={fadeIn}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <div className="p-2 sm:p-2.5 md:p-3 bg-blue-100 text-blue-600 rounded-full flex-shrink-0">
            {icon}
          </div>
          <div className="min-w-0">
            <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">{title}</h4>
          </div>
        </div>
        {/* ADDED: Description for price */}
        {description && (
          <div className="text-right flex-shrink-0 ml-1">
            <p className="text-xs sm:text-sm font-bold text-gray-700">{description}</p>
            <p className="text-[10px] sm:text-xs text-gray-500">{value === "Car" ? "est. per day" : "From"}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}