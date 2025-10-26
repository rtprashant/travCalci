import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeInLeft } from '../components/animations/main';
import footer from '../assets/footer2.jpeg';

// --- Animation Variants ---



const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};


export default function InputBox() {
  
  // --- State and Handlers from your TripDialog ---
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    days: "",
    nights: "",
    transport: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // --- Data for New Sections ---
  const features = [
    { 
      emoji: "📊", 
      title: "Smart Budgeting", 
      description: "Effortlessly plan expenses before you even pack." 
    },
    { 
      emoji: "👥", 
      title: "Group Splitting", 
      description: "Easily split bills with friends and track who paid." 
    },
    { 
      emoji: "🗺️", 
      title: "Itinerary Planning", 
      description: "Keep all your trip details organized in one app." 
    },
  ];

  const steps = [
    { 
      id: "01", 
      title: "Create Your Trip", 
      description: "Tell us your destination, dates, and mode of travel." 
    },
    { 
      id: "02", 
      title: "Set Your Budget", 
      description: "Add your estimated costs for stay, food, and activities." 
    },
    { 
      id: "03", 
      title: "Travel Stress-Free", 
      description: "Track spending as you go and enjoy your adventure." 
    },
  ];

  return (
    <motion.div 
      className="bg-gray-50 min-h-screen overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <main className="relative">
        
        {/* --- HERO & CALCULATOR SECTION --- */}
        {/* This grid handles responsiveness:
            - Mobile (default): 1 column (Hero, then Calculator)
            - Desktop (lg:): 5-column grid (3 for Hero, 2 for Calculator)
        */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-5 gap-x-12">
          
          {/* --- LEFT SIDE: Hero Content --- */}
          <motion.div 
            className="lg:col-span-3 pt-24 pb-16 md:pt-40 md:pb-48"
            variants={fadeInLeft}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight">
              Your Next Adventure,
              <br />
              <span className="text-blue-600 italic">Perfectly Planned.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 max-w-lg">
              Welcome to Travelory. Plan itineraries, manage travel budgets,
              and track group expenses all in one place. Focus on the
              memories—we'll handle the math.
            </p>
            <motion.a
              href="/about"
              className="mt-10 inline-block bg-gradient-to-r from-blue-400 to-blue-800 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Learn More
            </motion.a>
          </motion.div>

          {/* --- RIGHT SIDE: Your Trip Calculator --- */}
          {/* This column is relative, but the div inside becomes sticky on large screens */}
          <div className="lg:col-span-2 relative pb-20 lg:py-0">
            {/* This div sticks to the top-right on desktop, but scrolls normally on mobile */}
            <div className="lg:sticky lg:top-40">
              <div className="relative w-full max-w-md mx-auto pointer-events-auto">

                {/* Dialog Box */}
                <div className="relative p-6 space-y-5 bg-white rounded-3xl shadow-[0_15px_30px_rgba(0,0,0,0.25)] 
                                transform transition-transform duration-300 hover:scale-105 hover:-rotate-1"
                     style={{ filter: "blur(4px)" }}>

                  <h2 className="text-2xl font-bold text-gray-800 text-center md:text-left tracking-wide">
                    Travelory 🧳
                  </h2>

                  {/* Source */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Source</label>
                    <input
                      type="text"
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      placeholder="Enter source city"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">Destination</label>
                    <input
                      type="text"
                      name="destination"
                      value={formData.destination}
                      onChange={handleChange}
                      placeholder="Enter destination city"
                      className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
                    />
                  </div>

                  {/* Days + Nights */}
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-gray-700">Days</label>
                      <input
                        type="number"
                        name="days"
                        value={formData.days}
                        onChange={handleChange}
                        placeholder="No. of Days"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
                      />
                    </div>
                    <div className="flex-1">
                      <label className="block mb-1 font-medium text-gray-700">Nights</label>
                      <input
                        type="number"
                        name="nights"
                        value={formData.nights}
                        onChange={handleChange}
                        placeholder="No. of Nights"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 bg-gray-50 placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Mode of Transport */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Mode of Transport</label>
                    <div className="flex flex-wrap gap-4">
                      {["Flight", "Train", "Bus", "Personal"].map((mode) => (
                        <label
                          key={mode}
                          className="flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 hover:bg-yellow-100 cursor-pointer transition-all duration-200"
                        >
                          <input
                            type="radio"
                            name="transport"
                            value={mode}
                            checked={formData.transport === mode}
                            onChange={handleChange}
                            className="accent-yellow-400 w-4 h-4"
                          />
                          <span className="text-gray-800">{mode}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <button className="w-full bg-gradient-to-r from-blue-800 to-blue-400 hover:from-blue-700 hover:to-blue-300 text-white font-bold py-2 rounded-2xl transition-transform duration-200 transform hover:scale-105">
                    Calculate Trip 💰
                  </button>
                </div>

                {/* Stylish Lock Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                    <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl shadow-lg">
                      🔒
                    </div>
                    <span className="mt-2 text-gray-700 font-semibold">Coming Soon</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div> {/* End of Hero Grid */}

        {/* --- NEW SECTION: Features --- */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Travel Smarter, Not Harder</h2>
              <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                Everything you need to manage your trip finances with ease.
              </p>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  className="bg-gray-50 p-8 rounded-xl shadow-lg text-center"
                  variants={fadeIn}
                >
                  <div className="text-5xl mb-4">{feature.emoji}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- NEW SECTION: How It Works --- */}
        <section className="py-16 sm:py-24 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Get Started in 3 Easy Steps</h2>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  className="bg-white p-8 rounded-xl shadow-lg"
                  variants={fadeIn}
                >
                  <span className="text-5xl font-extrabold text-blue-200">{step.id}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- NEW SECTION: Final CTA --- */}
        <section 
          className="text-white py-20 sm:py-24 relative"
          style={{
            backgroundImage: `linear-gradient(rgba(2,6,23,0.65), rgba(2,6,23,0.35)), url(${footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <motion.div
            className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 drop-shadow-2xl">Ready to Plan Your Next Adventure?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow">
              Join thousands of travelers who use Travelory to manage their trips with ease.
            </p>
            <motion.a
              href="/planYourTrip" // This would go to your signup page
              className="inline-block bg-white text-blue-700 font-bold text-lg px-10 py-4 rounded-xl shadow-2xl hover:bg-blue-50"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              Get Started Now
            </motion.a>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
}