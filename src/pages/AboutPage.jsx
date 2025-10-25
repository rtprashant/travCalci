import React from 'react';
import { motion } from 'framer-motion';
import { ClipboardListIcon, UsersIcon, WalletIcon } from '../components/icons/Icon';

// --- Re-usable Icons (re-created as SVGs) ---

// Icon for "Smart Budgeting"


// --- Animation Variants ---

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeInOut",
    },
  },
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

// --- Main Component ---

function AboutPage() {
  const teamMembers = [
    { name: "Alex Johnson", title: "Founder & CEO", img: "https://placehold.co/400x400/E2E8F0/4A5568?text=Alex+J." },
    { name: "Maria Garcia", title: "Lead Developer", img: "https://placehold.co/400x400/E2E8F0/4A5568?text=Maria+G." },
    { name: "David Chen", title: "UX/UI Designer", img: "https://placehold.co/400x400/E2E8F0/4A5568?text=David+C." },
    { name: "Sarah Smith", title: "Marketing Head", img: "https://placehold.co/400x400/E2E8F0/4A5568?text=Sarah+S." },
  ];
  
  const features = [
    { title: "Smart Budgeting", description: "Effortlessly plan your expenses before you even pack your bags.", icon: <WalletIcon /> },
    { title: "Expense Tracking", description: "Easily split bills with friends and keep a running total of your spending.", icon: <UsersIcon /> },
    { title: "Trip Management", description: "Keep all your trip details, from itineraries to budgets, organized in one app.", icon: <ClipboardListIcon /> },
  ];

  return (
    <motion.div
      className="bg-gray-50 text-gray-800 overflow-x-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      {/* --- Hero Section --- */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-800 text-white py-20 sm:py-32">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          variants={fadeIn}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold italic tracking-wide">
            About TravCalci
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mt-4 max-w-3xl mx-auto">
            We believe planning a trip should be as exciting as the journey itself.
          </p>
        </motion.div>
      </div>

      {/* --- Our Mission Section --- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeInLeft}
            // initial="hidden"
            // whileInView="visible"
            // viewport={{ once: true, amount: 0.1 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-4">
              At TravCalci, our mission is to simplify the complexities of
              travel budgeting and expense tracking. We empower you to focus on
              creating unforgettable memories, not crunching numbers.
            </p>
            <p className="text-lg text-gray-600">
              We started with a simple idea: what if you could calculate all your
              trip costs, manage group expenses, and discover new destinations all
              in one place? That idea became TravCalci.
            </p>
          </motion.div>
          <motion.div
            className="rounded-xl overflow-hidden shadow-2xl"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <img 
              src="https://placehold.co/600x450/3B82F6/FFFFFF?text=Travel+Planning" 
              alt="Person planning a trip on a map" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* --- Features Section ("Why Choose Us?") --- */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Why Choose Us?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              We provide the tools you need to travel smarter, not harder.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-50 p-6 sm:p-8 rounded-xl shadow-lg text-center"
                variants={fadeIn}
              >
                {feature.icon}
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* --- Meet the Team Section --- */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Meet the Team</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
              The passionate individuals behind TravCalci.
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg text-center"
                variants={fadeIn}
              >
                <img 
                  src={member.img} 
                  alt={`Profile of ${member.name}`} 
                  className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200"
                />
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-blue-600 font-medium">{member.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- CTA Section --- */}
      <section className="bg-gradient-to-r from-blue-400 to-blue-800 text-white py-20 sm:py-24">
        <motion.div
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeIn}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Plan Your Next Adventure?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of travelers who use TravCalci to manage their trips with ease.
          </p>
          <motion.a
            href="/contact" // Changed to a standard <a> tag
            className="inline-block bg-white text-blue-700 font-bold text-base sm:text-lg px-8 py-3 sm:px-10 sm:py-4 rounded-xl shadow-2xl"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            Get in Touch
          </motion.a>
        </motion.div>
      </section>
    </motion.div>
  );
}

// Default export
export default AboutPage;


