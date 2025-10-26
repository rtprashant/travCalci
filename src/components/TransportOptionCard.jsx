import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { fadeIn } from './animations/main';
export default function TransportOptionCard({ option, selected, onClick }) {
  const { name, price, type, duration } = option;
  return (
    <motion.div
      className={`p-5 bg-white rounded-xl shadow-lg cursor-pointer border-2 transition-all relative ${
        selected ? 'border-green-500 scale-105 shadow-green-100' : 'border-transparent hover:shadow-md'
      }`}
      onClick={() => onClick(option)}
      variants={fadeIn}
    >
      {selected && (
        <div className="absolute -top-2 -right-2 p-1 bg-green-500 rounded-full text-white">
          <CheckCircle size={16} />
        </div>
      )}
      <div className="flex justify-between items-center">
        <div>
          <h4 className="text-lg font-bold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{duration}</p>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-xl font-extrabold text-blue-700">${price}</p>
          <p className="text-sm text-gray-500">{type === 'day' ? 'per day' : 'per person'}</p>
        </div>
      </div>
    </motion.div>
  );
}