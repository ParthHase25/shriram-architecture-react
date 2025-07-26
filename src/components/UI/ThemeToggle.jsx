import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Zap } from 'lucide-react';
import { useTheme, THEMES } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { currentTheme, toggleTheme, config } = useTheme();

  const getThemeIcon = () => {
    switch (currentTheme) {
      case THEMES.LIGHT:
        return Sun;
      case THEMES.DARK:
        return Moon;
      case THEMES.MATRIX:
        return Zap;
      default:
        return Sun;
    }
  };

  const getThemeLabel = () => {
    switch (currentTheme) {
      case THEMES.LIGHT:
        return 'Light';
      case THEMES.DARK:
        return 'Dark';
      case THEMES.MATRIX:
        return 'Matrix';
      default:
        return 'Light';
    }
  };

  const Icon = getThemeIcon();

  return (
    <motion.button
      onClick={toggleTheme}
      className={`fixed top-6 right-6 z-50 w-14 h-14 rounded-full backdrop-blur-sm border-2 ${config.cardBorder} ${config.glass} flex items-center justify-center group transition-all duration-300 hover:scale-110`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      {/* Background Glow */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-r ${config.accent} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0, 0.3, 0]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Icon with animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentTheme}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`${config.text} relative`}
        >
          <Icon className="h-6 w-6" />
          
          {/* Matrix mode digital rain effect */}
          {currentTheme === THEMES.MATRIX && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-0.5 h-6 bg-green-400 opacity-60"
                  style={{
                    left: `${20 + i * 20}%`,
                    top: '-100%'
                  }}
                  animate={{
                    y: [0, 40, 0],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Tooltip */}
      <motion.div
        className={`absolute -bottom-12 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg ${config.card} ${config.cardBorder} border backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}
        initial={{ y: 10, opacity: 0 }}
        whileHover={{ y: 0, opacity: 1 }}
      >
        <span className={`text-sm font-medium ${config.text} whitespace-nowrap`}>
          {getThemeLabel()} Mode
        </span>
        
        {/* Tooltip arrow */}
        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 ${config.card} border-l border-t ${config.cardBorder} rotate-45`} />
      </motion.div>

      {/* Orbital rings for matrix mode */}
      {currentTheme === THEMES.MATRIX && (
        <>
          {Array.from({ length: 2 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full border border-green-400/20"
              style={{
                width: `${100 + i * 20}%`,
                height: `${100 + i * 20}%`,
                left: `${-i * 10}%`,
                top: `${-i * 10}%`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}

      {/* Pulse effect for light mode */}
      {currentTheme === THEMES.LIGHT && (
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-yellow-400/30"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Dark mode shadow rings */}
      {currentTheme === THEMES.DARK && (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                background: `radial-gradient(circle, transparent 60%, rgba(59, 130, 246, ${0.1 - i * 0.03}) 100%)`,
                width: `${120 + i * 15}%`,
                height: `${120 + i * 15}%`,
                left: `${-10 - i * 7.5}%`,
                top: `${-10 - i * 7.5}%`
              }}
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 20 + i * 5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </>
      )}
    </motion.button>
  );
};

export default ThemeToggle;
