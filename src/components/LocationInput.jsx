import { motion } from 'framer-motion';
export function LocationInput({ label, value, onChange, layoutId, isPlanning, placeholder }) {
  return (
    <motion.div
      layoutId={layoutId}
      className={`bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-xl ${isPlanning ? 'w-full max-w-xs sm:max-w-sm' : 'w-full max-w-md sm:max-w-lg md:max-w-xl'}`}
    >
      <label className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-lg sm:text-xl md:text-2xl font-bold text-gray-900 border-b-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
      />
    </motion.div>
  );
}