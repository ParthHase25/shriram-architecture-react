import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = ({ theme, isMatrixMode, currentSection }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorMode, setCursorMode] = useState('default'); // 'default', 'text', 'link', 'button'

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      setIsVisible(true);
    };

    const hideCursor = () => setIsVisible(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', hideCursor);

    // Enhanced cursor interactions
    const handleMouseEnter = (e) => {
      const target = e.target;
      
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.onclick) {
        setIsHovering(true);
        setCursorMode('link');
        setCursorText('CLICK');
      } else if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        setIsHovering(true);
        setCursorMode('text');
        setCursorText('TYPE');
      } else if (target.getAttribute('data-cursor-text')) {
        setIsHovering(true);
        setCursorMode('custom');
        setCursorText(target.getAttribute('data-cursor-text'));
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorMode('default');
      setCursorText('');
    };

    // Add event listeners to all interactive elements
    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, input, textarea, [data-cursor-text]');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    // Initial setup and periodic updates for dynamic content
    addListeners();
    const intervalId = setInterval(addListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', hideCursor);
      clearInterval(intervalId);
    };
  }, [cursorX, cursorY]);

  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    return null; // Hide cursor on mobile devices
  }

  const sectionThemes = [
    { color: 'from-blue-500 to-cyan-400', name: 'GENESIS' },
    { color: 'from-purple-500 to-pink-400', name: 'EVOLUTION' },
    { color: 'from-emerald-500 to-teal-400', name: 'ARSENAL' },
    { color: 'from-orange-500 to-red-400', name: 'UNIVERSE' },
    { color: 'from-indigo-500 to-purple-400', name: 'CONNECT' },
    { color: 'from-gray-500 to-slate-400', name: 'LEGACY' }
  ];

  const currentTheme = sectionThemes[currentSection] || sectionThemes[0];

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          scale: { duration: 0.3, ease: "backOut" },
          opacity: { duration: 0.3 },
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className={`w-full h-full rounded-full border-2 ${
            isMatrixMode 
              ? 'border-green-400 bg-green-400/20' 
              : `border-blue-400 bg-gradient-to-r ${currentTheme.color} opacity-20`
          }`}
          animate={{
            rotate: 360,
            scale: isHovering ? [1, 1.2, 1] : 1,
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.6, repeat: isHovering ? Infinity : 0 },
          }}
        />

        {/* Inner Dot */}
        <motion.div
          className={`absolute top-1/2 left-1/2 w-2 h-2 transform -translate-x-1/2 -translate-y-1/2 rounded-full ${
            isMatrixMode ? 'bg-green-400' : 'bg-white'
          }`}
          animate={{
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />

        {/* Cursor Mode Indicator */}
        {cursorMode !== 'default' && (
          <motion.div
            className={`absolute top-10 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-mono rounded ${
              isMatrixMode 
                ? 'bg-green-500/90 text-black' 
                : 'bg-black/90 text-white'
            }`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {cursorText}
          </motion.div>
        )}
      </motion.div>

      {/* Cursor Trail */}
      <motion.div
        className="fixed top-0 left-0 w-16 h-16 pointer-events-none z-[9998] opacity-30"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-full h-full rounded-full border ${
            isMatrixMode 
              ? 'border-green-400/30' 
              : 'border-blue-400/30'
          }`}
          animate={{
            scale: [0, 1],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
          }}
        />
      </motion.div>

      {/* Section Name Display */}
      <motion.div
        className="fixed bottom-8 left-8 pointer-events-none z-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className={`px-4 py-2 rounded-lg backdrop-blur-lg border font-mono text-sm ${
            isMatrixMode 
              ? 'bg-green-500/20 border-green-400 text-green-400' 
              : `bg-gradient-to-r ${currentTheme.color} bg-opacity-20 border-blue-400 text-blue-400`
          }`}
          animate={{
            boxShadow: isMatrixMode 
              ? ['0 0 10px rgba(0, 255, 0, 0.2)', '0 0 20px rgba(0, 255, 0, 0.4)', '0 0 10px rgba(0, 255, 0, 0.2)']
              : ['0 0 10px rgba(59, 130, 246, 0.2)', '0 0 20px rgba(59, 130, 246, 0.4)', '0 0 10px rgba(59, 130, 246, 0.2)']
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SECTOR: {currentTheme.name}
        </motion.div>
      </motion.div>

      {/* Matrix Mode Digital Rain on Cursor */}
      {isMatrixMode && (
        <motion.div
          className="fixed top-0 left-0 pointer-events-none z-[9997]"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-green-400 font-mono text-xs"
              style={{
                left: `${i * 8 - 16}px`,
                top: '32px',
              }}
              animate={{
                y: [0, 40],
                opacity: [1, 0],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </motion.div>
      )}
    </>
  );
};

export default CustomCursor;
