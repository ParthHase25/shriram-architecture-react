import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2 } from 'lucide-react';

const LoadingScreen = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const logoVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.5,
      rotate: -180 
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
        ease: "easeOut"
      }
    }
  };

  const overlayVariants = {
    hidden: { 
      opacity: 1 
    },
    exit: { 
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: { 
      width: "100%",
      transition: {
        duration: 2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="text-center space-y-8">
              {/* Logo Animation */}
              <motion.div
                variants={logoVariants}
                initial="hidden"
                animate="visible"
                className="flex items-center justify-center space-x-4"
              >
                <Building2 className="h-16 w-16 text-white" />
                <motion.h1 
                  variants={textVariants}
                  className="text-4xl md:text-5xl font-bold text-white"
                >
                  Shriram Architecture
                </motion.h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                variants={textVariants}
                className="text-xl text-gray-300 max-w-md mx-auto"
              >
                Shaping Symmetry, Creating Excellence
              </motion.p>

              {/* Loading Progress */}
              <div className="w-64 mx-auto">
                <div className="bg-gray-700 rounded-full h-1 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-400 to-purple-400 h-full rounded-full"
                    variants={progressVariants}
                    initial="hidden"
                    animate="visible"
                  />
                </div>
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    className="w-3 h-3 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LoadingScreen;
