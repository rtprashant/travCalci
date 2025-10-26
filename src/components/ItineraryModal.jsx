import { motion, AnimatePresence } from 'framer-motion';
import { Hotel, Train, Utensils, X } from 'lucide-react';
import { Activity } from 'react';
import { useEffect } from 'react';
const modalBackdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } }
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30, duration: 0.4 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: 50,
    transition: { duration: 0.3 } 
  }
};
function CostItem({ icon, title, amount }) {
  return (
    <div className="bg-gray-50 p-4 rounded-lg flex items-center gap-3">
      <div className="flex-shrink-0">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-lg font-bold text-gray-800">${amount.toLocaleString()}</p>
      </div>
    </div>
  );
}
export function ItineraryModal({ isOpen, onClose, itinerary }) {
  if (!itinerary) return null;

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling on body
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scrolling
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            variants={modalBackdrop}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden"
            variants={modalContent}
            layoutId={`card-container-${itinerary.id}`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 p-2 bg-white/50 rounded-full text-gray-700 hover:bg-white hover:scale-110 transition-all"
            >
              <X size={20} />
            </button>
            
            {/* --- MODIFIED: Added 'hide-scrollbar' class --- */}
            <div className="max-h-[90vh] overflow-y-auto hide-scrollbar">
              <motion.img
                className="w-full h-64 object-cover"
                src={itinerary.imageUrl}
                alt={itinerary.location}
                layoutId={`card-image-${itinerary.id}`}
                onError={(e) => { e.target.src = 'https://placehold.co/600x400/cccccc/FFFFFF?text=Image+Error&font=inter'; }}
              />
              
              <div className="p-8">
                <motion.h2 
                  className="text-4xl font-extrabold text-gray-900 mb-4"
                  layoutId={`card-title-${itinerary.id}`}
                >
                  {itinerary.location}
                </motion.h2>
                
                <p className="text-lg text-gray-600 mb-6">{itinerary.description}</p>

                {/* Cost Breakdown */}
                <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Cost Breakdown (est.)
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <CostItem icon={<Hotel className="text-blue-500" />} title="Hotels" amount={itinerary.hotelCost} />
                  <CostItem icon={<Utensils className="text-green-500" />} title="Food" amount={itinerary.foodCost} />
                  <CostItem icon={<Activity className="text-yellow-500" />} title="Activities" amount={itinerary.activityCost} />
                  <CostItem icon={<Train className="text-red-500" />} title="Transport" amount={itinerary.transportCost} />
                </div>
                
                {/* Daily Plan */}
                {/* <h3 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">
                  Daily Plan
                </h3>
                <div className="space-y-4">
                  {itinerary.dailyPlan.map((day) => (
                    <div key={day.day} className="pb-4 border-b border-gray-100 last:border-b-0">
                      <h4 className="text-lg font-semibold text-blue-700">Day {day.day}: {day.title}</h4>
                      <p className="text-gray-600">{day.details}</p>
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}