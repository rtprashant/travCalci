import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

// Define nav items with their paths
const navLinks = [
  { name: "Home", path: "/" },
//   { name: "Trips", path: "/trips" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// Variants for the HOVER pill
const hoverPillVariants = {
  initial: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.2, ease: "easeInOut" } },
};

// Variants for the NAV ITEM itself (the text)
const navItemVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.1, transition: { duration: 0.2, ease: "easeInOut" } },
};

function Header() {
  const [showNav, setShowNav] = useState(true);
  const containerRef = useRef(null);
  const location = useLocation();

  // Hide nav after 1 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowNav(false), 1000);
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

  const boxRadius = "0.75rem"; // rounded-xl

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center mt-5 px-4 select-none touch-manipulation">
      <LayoutGroup>
        <motion.div
          ref={containerRef}
          layout
          className="relative flex flex-col items-center"
          onMouseEnter={() => window.innerWidth >= 768 && setShowNav(true)}
          onMouseLeave={() => window.innerWidth >= 768 && setShowNav(false)}
        >
          {/* Box morphing animation */}
          <motion.div
            layout
            onClick={handleToggle}
            initial={{ width: "16rem", borderRadius: boxRadius }}
            animate={{
              width: showNav ? "14rem" : "12rem",
              borderRadius: boxRadius,
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
            whileHover={{
              width: "14rem",
              borderRadius: boxRadius,
              transition: { duration: 0.3, ease: "easeInOut" },
            }}
            className="bg-gradient-to-r from-blue-400 to-blue-800 text-white shadow-md cursor-pointer flex items-center justify-center space-x-2 px-6 sm:px-10 py-3 z-10"
          >
            <motion.h1
              layout
              className="text-2xl sm:text-3xl font-extrabold italic tracking-wide"
            >
              Travelory
            </motion.h1>
            <motion.span
              layout
              className="h-2 w-2 bg-blue-200 rounded-full hidden sm:block"
            />
          </motion.div>

          {/* Dropdown animation from box */}
          <AnimatePresence>
            {showNav && (
              <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.45, ease: "easeInOut" }}
                className="mt-2 bg-gradient-to-r from-blue-400 to-blue-800 text-white rounded-xl px-6 sm:px-8 py-3 flex flex-col sm:flex-row sm:space-x-4 space-y-1 items-center shadow-lg"
              >
                {navLinks.map((item, idx) => {
                  const isActive = location.pathname === item.path;

                  return (
                    <Link to={item.path} key={item.name}>
                      <motion.span
                        variants={navItemVariants}
                        initial="initial"
                        whileHover="hover"
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="cursor-pointer text-base sm:text-lg relative px-4 py-2 rounded-md"
                      >
                        {/* Hover Pill */}
                        {!isActive && (
                          <motion.div
                            variants={hoverPillVariants}
                            // 1. THEME CHANGE: Changed to semi-transparent white
                            className="absolute inset-0 bg-white/20 rounded-md"
                          />
                        )}

                        {/* Z-Index Fix: Text on top */}
                        <span
                          className={`relative z-10 font-medium ${
                            isActive ? "text-black" : "text-white"
                          }`}
                        >
                          {item.name}
                        </span>

                        {/* Active Pill (White) - Unchanged */}
                        {isActive && (
                          <motion.div
                            layoutId="activePill"
                            className="absolute inset-0 bg-white rounded-md"
                            transition={{
                              duration: 0.4,
                              ease: "easeInOut",
                            }}
                          />
                        )}
                      </motion.span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </div>
  );
}

export default Header;