import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";

function Header() {
  const [showNav, setShowNav] = useState(true);
  const containerRef = useRef(null);

  // Hide nav after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowNav(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Hide nav when clicking outside (mobile)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowNav(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    if (window.innerWidth < 768) setShowNav((prev) => !prev);
  };

  return (
    <div className="flex justify-center mt-5 px-4 select-none touch-manipulation">
      <LayoutGroup>
        <motion.div
          ref={containerRef}
          layout
          className="relative flex flex-col items-center"
          onMouseEnter={() => window.innerWidth >= 768 && setShowNav(true)}
          onMouseLeave={() => window.innerWidth >= 768 && setShowNav(false)}
        >
          {/* Capsule morphing animation */}
          <motion.div
            layout
            onClick={handleToggle}
            initial={{ width: "14rem", borderRadius: "1rem" }} // initially bigger
            animate={{
              width: showNav ? "12rem" : "10rem",
              borderRadius: showNav ? "1.5rem" : "2rem",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            whileHover={{
              width: "12rem",        // shrink slightly on hover
              borderRadius: "1.5rem",
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="bg-black text-gray-100 shadow-md cursor-pointer flex items-center justify-center space-x-2 px-6 sm:px-10 py-3"
          >
            <motion.h1
              layout
              className="text-2xl sm:text-3xl font-extrabold italic tracking-wide"
            >
              TravCalci
            </motion.h1>
            <motion.span
              layout
              className="h-2 w-2 bg-gray-400 rounded-full hidden sm:block"
            />
          </motion.div>

          {/* Dropdown animation from capsule */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                layout
                key="dropdown"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="mt-2 bg-black text-white rounded-2xl px-6 sm:px-8 py-3 flex flex-col sm:flex-row sm:space-x-8 space-y-3 sm:space-y-0 items-center shadow-lg"
              >
                {["Home", "Trips", "About", "Contact"].map((item, idx) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: -8 }}   // appear from top
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    whileHover={{ color: "#a1a1aa" }}
                    className="font-medium cursor-pointer text-base sm:text-lg"
                  >
                    {item}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export default Header;
