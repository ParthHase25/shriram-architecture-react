import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, Play, Compass, Ruler, Zap } from 'lucide-react';
import { getSectionTheme } from '../../contexts/ThemeContext';
import useCounter from '../../hooks/useCounter';

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", label, color }) => {
  const { count, elementRef } = useCounter(end, 2500);
  
  return (
    <div ref={elementRef} className="text-center">
      <div className={`text-6xl font-bold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-gray-400 mt-1">
        {label}
      </div>
    </div>
  );
};

const HeroSection = ({ isMatrixMode, globalMousePosition, sectionIndex, isActive, theme }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [activeQuadrant, setActiveQuadrant] = useState(0);
  const ref = useRef(null);

  // Get section-specific theme
  const sectionTheme = theme?.sections?.hero || theme?.primary || {
    bg: 'from-slate-900 via-blue-900 to-indigo-900',
    text: 'text-white',
    accent: 'from-blue-400 to-indigo-400'
  };

  // Mouse tracking for parallax effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  // Transform values for parallax layers
  const backgroundX = useTransform(smoothMouseX, [-500, 500], [-50, 50]);
  const backgroundY = useTransform(smoothMouseY, [-500, 500], [-30, 30]);
  const layer1X = useTransform(smoothMouseX, [-500, 500], [-30, 30]);
  const layer1Y = useTransform(smoothMouseY, [-500, 500], [-20, 20]);
  const layer2X = useTransform(smoothMouseX, [-500, 500], [-20, 20]);
  const layer2Y = useTransform(smoothMouseY, [-500, 500], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = ref.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        setMousePosition({ x, y });
        mouseX.set(x);
        mouseY.set(y);

        // Determine active quadrant
        const quadrant = x > 0 ? (y > 0 ? 3 : 1) : (y > 0 ? 2 : 0);
        setActiveQuadrant(quadrant);
      }
    };

    const element = ref.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      return () => element.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  const businessStory = [
    {
      title: "VISION",
      subtitle: "Architectural Innovation",
      description: "We don't just design buildings, we craft experiences that transform how people live and work",
      icon: Compass,
      color: "from-blue-500 to-cyan-400",
      number: 50,
      suffix: "+",
      label: "Innovative Designs"
    },
    {
      title: "PRECISION",
      subtitle: "Technical Excellence", 
      description: "years of precision engineering and sustainable design practices",
      icon: Ruler,
      color: "from-purple-500 to-pink-400",
      number: 15,
      suffix: "+",
      label: "Years Experience"
    },
    {
      title: "IMPACT",
      subtitle: "Community Transformation",
      description: "projects that have redefined skylines and enhanced communities across India",
      icon: Zap,
      color: "from-emerald-500 to-teal-400",
      number: 200,
      suffix: "+",
      label: "Projects Completed"
    },
    {
      title: "FUTURE",
      subtitle: "Next-Gen Architecture",
      description: "Pioneering smart buildings and sustainable solutions for tomorrow's world",
      icon: Play,
      color: "from-orange-500 to-red-400",
      number: 98,
      suffix: "%",
      label: "Client Satisfaction"
    }
  ];

  const currentStory = businessStory[activeQuadrant];

  return (
    <section 
      ref={ref}
      id="home" 
      className={`relative min-h-screen overflow-hidden bg-gradient-to-br ${sectionTheme.bg} transition-colors duration-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Dynamic Background Layers */}
      <motion.div 
        className="absolute inset-0"
        style={{ x: backgroundX, y: backgroundY }}
      >
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="animate-pulse">
            <defs>
              <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M 100 0 L 0 0 0 100" fill="none" stroke="url(#gridGradient)" strokeWidth="1"/>
              </pattern>
              <linearGradient id="gridGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Floating Architectural Elements */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <div className={`w-4 h-4 bg-gradient-to-r ${businessStory[i % 4].color} rounded-full opacity-60`} />
          </motion.div>
        ))}
      </motion.div>

      {/* Interactive Building Visualization */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ x: layer1X, y: layer1Y }}
      >
        <motion.div
          className="relative w-96 h-96"
          animate={{ 
            rotateY: mousePosition.x * 0.1,
            rotateX: -mousePosition.y * 0.1,
            scale: isHovered ? 1.1 : 1
          }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {/* 3D Building Structure */}
          <div className="absolute inset-0 transform-gpu preserve-3d">
            {/* Building Base */}
            <motion.div
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-48 bg-gradient-to-t from-gray-800 to-gray-600 shadow-2xl"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(-10deg) rotateY(15deg)"
              }}
              animate={{
                boxShadow: [
                  "0 20px 50px rgba(59, 130, 246, 0.3)",
                  "0 20px 50px rgba(139, 92, 246, 0.3)",
                  "0 20px 50px rgba(59, 130, 246, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Building Windows */}
              {[...Array(16)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-4 bg-gradient-to-b from-blue-400 to-blue-600 m-1"
                  style={{
                    left: `${(i % 4) * 20 + 10}%`,
                    top: `${Math.floor(i / 4) * 20 + 10}%`,
                  }}
                  animate={{
                    opacity: [0.4, 1, 0.4],
                    backgroundColor: [
                      "rgb(59, 130, 246)",
                      "rgb(139, 92, 246)",
                      "rgb(59, 130, 246)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Text Elements */}
            <motion.div
              className={`absolute top-1/4 left-0 ${sectionTheme.accent.includes('green') ? 'text-green-400' : sectionTheme.accent.includes('blue') ? 'text-blue-400' : 'text-purple-400'} font-mono text-sm transition-colors duration-500`}
              animate={{ x: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              INNOVATION++
            </motion.div>
            <motion.div
              className={`absolute top-1/2 right-0 ${sectionTheme.accent.includes('green') ? 'text-emerald-400' : sectionTheme.accent.includes('blue') ? 'text-purple-400' : 'text-pink-400'} font-mono text-sm transition-colors duration-500`}
              animate={{ x: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            >
              DESIGN.exe
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Interactive Story Content */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ x: layer2X, y: layer2Y }}
      >
        <div className="text-center space-y-8 max-w-4xl px-4">
          {/* Dynamic Title */}
          <motion.div
            key={activeQuadrant}
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <motion.div className="flex items-center justify-center space-x-4 mb-4">
              <currentStory.icon className={`h-12 w-12 ${sectionTheme.text} transition-colors duration-500`} />
              <div className={`w-24 h-1 bg-gradient-to-r ${currentStory.color} rounded-full`} />
            </motion.div>
            
            <h1 className={`text-6xl md:text-8xl font-bold ${sectionTheme.text} leading-tight transition-colors duration-500`}>
              <span className={`bg-gradient-to-r ${currentStory.color} bg-clip-text text-transparent`}>
                {currentStory.title}
              </span>
            </h1>
            
            <h2 className={`text-2xl md:text-3xl ${theme?.muted || 'text-gray-300'} font-light transition-colors duration-500`}>
              {currentStory.subtitle}
            </h2>
            
            <p className={`text-xl ${theme?.muted || 'text-gray-400'} max-w-2xl mx-auto leading-relaxed transition-colors duration-500`}>
              {currentStory.description}
            </p>
            
            {/* Animated Counter */}
            <div className="mt-8">
              <AnimatedCounter 
                end={currentStory.number}
                suffix={currentStory.suffix}
                label={currentStory.label}
                color={currentStory.color}
              />
            </div>
          </motion.div>

          {/* Interactive Quadrant Indicator */}
          <motion.div 
            className="grid grid-cols-2 gap-4 w-32 h-32 mx-auto mt-12 pointer-events-auto"
            whileHover={{ scale: 1.1 }}
          >
            {businessStory.map((story, index) => (
              <motion.div
                key={index}
                className={`w-14 h-14 border-2 ${theme?.border || 'border-gray-600'} rounded-lg cursor-pointer transition-all ${
                  activeQuadrant === index 
                    ? `bg-gradient-to-r ${story.color} border-transparent shadow-lg` 
                    : `hover:${theme?.border?.replace('border-', 'border-').replace('-700', '-400') || 'hover:border-gray-400'}`
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveQuadrant(index)}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <story.icon className={`h-6 w-6 ${
                    activeQuadrant === index ? 'text-white' : theme?.muted?.replace('text-', 'text-').replace('-300', '-500') || 'text-gray-500'
                  } transition-colors duration-300`} />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <motion.button
              className={`group px-8 py-4 bg-gradient-to-r ${currentStory.color} text-white rounded-full font-semibold text-lg transition-all shadow-lg`}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="flex items-center space-x-2">
                <span>Explore Our Vision</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.div>
              </span>
            </motion.button>
            
            <motion.button
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-semibold border border-white/20 hover:bg-white/20 transition-all"
              whileHover={{ scale: 1.05, rotate: -1 }}
              whileTap={{ scale: 0.95 }}
            >
              Watch Our Story
            </motion.button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/60 cursor-pointer"
             onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}>
          <span className="text-sm mb-2">Discover More</span>
          <ChevronDown className="h-6 w-6" />
        </div>
      </motion.div>

      {/* Mouse Follower Tooltip */}
      <motion.div
        className="fixed pointer-events-none z-50 bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm"
        style={{
          x: mousePosition.x + 20,
          y: mousePosition.y - 30,
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
      >
        Move to explore our story
      </motion.div>
    </section>
  );
};

export default HeroSection;