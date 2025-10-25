import React from 'react';
import { motion } from 'framer-motion';
import { LocationIcon, MailIcon, PhoneIcon } from '../components/icons/Icon';

// --- Re-usable Icons ---




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

// --- Main Component ---

function ContactPage() {
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For this demo, we'll just log it
    console.log("Form submitted!");
    // You could show a success message here
  };

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
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mt-4 max-w-3xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>
        </motion.div>
      </div>

      {/* --- Main Content Section --- */}
      <section className="py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          
          {/* --- Left Column: Contact Info --- */}
          <motion.div
            className="space-y-12"
            variants={fadeInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Contact Us</h2>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full">
                <MailIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Email</h3>
                <p className="text-lg text-gray-600 mt-1">
                  General Inquiries:
                </p>
                <a href="mailto:support@travcalci.com" className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  support@travcalci.com
                </a>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full">
                <PhoneIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Phone</h3>
                <p className="text-lg text-gray-600 mt-1">
                  Mon-Fri, 9am-5pm EST:
                </p>
                <a href="tel:+1234567890" className="text-lg text-blue-600 hover:text-blue-800 transition-colors duration-200">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <div className="flex items-start space-x-6">
              <div className="flex-shrink-0 bg-blue-100 p-4 rounded-full">
                <LocationIcon />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Office</h3>
                <p className="text-lg text-gray-600 mt-1">
                  123 Travel Lane
                  <br />
                  Adventure City, TS 54321
                </p>
              </div>
            </div>
          </motion.div>

          {/* --- Right Column: Contact Form --- */}
          <motion.div
            className="bg-white p-8 sm:p-12 rounded-xl shadow-2xl"
            variants={fadeInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-2 block w-full px-4 py-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-2 block w-full px-4 py-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-lg font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  className="mt-2 block w-full px-4 py-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 block w-full px-4 py-3 text-lg border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <motion.button
                  type="submit"
                  className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-lg text-lg font-bold rounded-xl text-white bg-gradient-to-r from-blue-400 to-blue-800"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  Send Message
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}

export default ContactPage;
