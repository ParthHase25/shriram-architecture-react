import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Briefcase, FolderOpen, Mail, Cpu, Zap, Eye } from 'lucide-react';

const QuantumNavigation = ({ theme, sections, currentSection, isMatrixMode, onSectionChange }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredSection, setHoveredSection] = useState(null);

  const icons = [Home, User, Briefcase, FolderOpen, Mail, Cpu];

  return (
    <motion.nav
      className="fixed top-6 left-6 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, ease: "backOut" }}
    >
      {/* Main Navigation Orb */}
      <motion.div
        className="relative"
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
      >
        {/* Central Navigation Hub */}
        <motion.div
          className={`w-16 h-16 rounded-full backdrop-blur-lg border-2 cursor-pointer flex items-center justify-center ${
            isMatrixMode 
              ? 'bg-green-500/20 border-green-400 text-green-400' 
              : `${theme.navigation.background} ${theme.navigation.border} ${theme.navigation.text}`
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            boxShadow: isMatrixMode 
              ? ['0 0 20px rgba(0, 255, 0, 0.3)', '0 0 40px rgba(0, 255, 0, 0.6)', '0 0 20px rgba(0, 255, 0, 0.3)']
              : ['0 0 20px rgba(59, 130, 246, 0.3)', '0 0 40px rgba(59, 130, 246, 0.6)', '0 0 20px rgba(59, 130, 246, 0.3)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            {isMatrixMode ? <Cpu className="h-6 w-6" /> : <Zap className="h-6 w-6" />}
          </motion.div>
        </motion.div>

        {/* Quantum Particles Around Hub */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-2 h-2 rounded-full ${
              isMatrixMode ? 'bg-green-400' : 'bg-blue-400'
            }`}
            style={{
              left: '50%',
              top: '50%',
              marginLeft: '-4px',
              marginTop: '-4px',
            }}
            animate={{
              x: Math.cos((i / 8) * Math.PI * 2) * (isExpanded ? 80 : 40),
              y: Math.sin((i / 8) * Math.PI * 2) * (isExpanded ? 80 : 40),
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.1,
            }}
          />
        ))}

        {/* Expanding Navigation Items */}
        <AnimatePresence>
          {isExpanded && (
            <>
              {sections.slice(0, -1).map((section, index) => {
                const Icon = icons[index] || Eye;
                const angle = (index / (sections.length - 1)) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.button
                    key={section.id}
                    className={`absolute w-12 h-12 rounded-full backdrop-blur-lg border-2 flex items-center justify-center cursor-pointer ${
                      currentSection === index
                        ? isMatrixMode 
                          ? 'bg-green-500 border-green-400 text-black'
                          : 'bg-blue-500 border-blue-400 text-white'
                        : isMatrixMode
                          ? 'bg-green-500/20 border-green-400/50 text-green-400 hover:bg-green-500/30'
                          : 'bg-blue-500/20 border-blue-400/50 text-blue-400 hover:bg-blue-500/30'
                    }`}
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                    onHoverStart={() => setHoveredSection(index)}
                    onHoverEnd={() => setHoveredSection(null)}
                    onClick={() => {
                      onSectionChange(index);
                      document.getElementById(section.id)?.scrollIntoView({ 
                        behavior: 'smooth' 
                      });
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    
                    {/* Tooltip */}
                    <AnimatePresence>
                      {hoveredSection === index && (
                        <motion.div
                          className={`absolute left-full ml-3 px-3 py-1 rounded-lg text-xs font-mono whitespace-nowrap ${
                            isMatrixMode 
                              ? 'bg-green-500/90 text-black' 
                              : 'bg-blue-500/90 text-white'
                          }`}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                        >
                          {section.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </>
          )}
        </AnimatePresence>

        {/* Connection Lines */}
        {isExpanded && (
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ width: '300px', height: '300px', left: '-142px', top: '-142px' }}
          >
            {sections.slice(0, -1).map((_, index) => {
              const angle = (index / (sections.length - 1)) * Math.PI * 2;
              const radius = 120;
              const x = Math.cos(angle) * radius + 150;
              const y = Math.sin(angle) * radius + 150;

              return (
                <motion.line
                  key={index}
                  x1="150"
                  y1="150"
                  x2={x}
                  y2={y}
                  stroke={isMatrixMode ? 'rgb(34, 197, 94)' : 'rgb(59, 130, 246)'}
                  strokeWidth="1"
                  opacity="0.3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                />
              );
            })}
          </svg>
        )}
      </motion.div>

      {/* Matrix Rain Effect (Easter Egg) */}
      {isMatrixMode && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs opacity-20"
              style={{
                left: `${i * 5}%`,
                fontFamily: 'monospace',
              }}
              animate={{
                y: ['-100vh', '100vh'],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'linear',
              }}
            >
              {Array.from({ length: 20 }).map((_, j) => (
                <div key={j} style={{ marginBottom: '10px' }}>
                  {Math.random() > 0.5 ? '1' : '0'}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </motion.nav>
  );
};

export default QuantumNavigation;
