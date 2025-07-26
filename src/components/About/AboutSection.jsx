import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Code, Layers, Zap, Target, Users, Trophy, Calendar, MapPin } from 'lucide-react';

const AboutSection = ({ theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });
  const mainControls = useAnimation();
  const [activeBlueprint, setActiveBlueprint] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  // Blueprint scrolling effect
  const scrollY = useMotionValue(0);
  const blueprintY = useTransform(scrollY, [0, 1000], [0, -100]);

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const blueprintStages = [
    {
      title: "CONCEPTION",
      year: "2009",
      description: "Founded with a vision to revolutionize architectural design in India",
      metrics: { projects: 0, team: 3, awards: 0 },
      icon: Target,
      color: "from-blue-500 to-cyan-400"
    },
    {
      title: "EXPANSION", 
      year: "2015",
      description: "Expanded operations across 5 major cities, pioneering sustainable design",
      metrics: { projects: 50, team: 15, awards: 5 },
      icon: Layers,
      color: "from-emerald-500 to-teal-400"
    },
    {
      title: "INNOVATION",
      year: "2020", 
      description: "Introduced smart building technologies and AI-driven design processes",
      metrics: { projects: 150, team: 35, awards: 15 },
      icon: Zap,
      color: "from-purple-500 to-pink-400"
    },
    {
      title: "LEADERSHIP",
      year: "2025",
      description: "Industry leaders in sustainable architecture and smart city development",
      metrics: { projects: 200, team: 50, awards: 25 },
      icon: Trophy,
      color: "from-orange-500 to-red-400"
    }
  ];

  const capabilities = [
    { name: "Architectural Design", level: 95, icon: Code },
    { name: "Structural Engineering", level: 88, icon: Layers },
    { name: "Sustainable Solutions", level: 92, icon: Zap },
    { name: "Project Management", level: 90, icon: Target },
    { name: "Client Satisfaction", level: 98, icon: Users }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <section 
      ref={ref} 
      id="about" 
      className={`min-h-screen ${theme.about.background} ${theme.about.text} py-20 overflow-hidden relative`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Blueprint Background */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        style={{ y: blueprintY }}
      >
        <svg width="100%" height="120%" className={theme.about.accent}>
          <defs>
            <pattern id="blueprint" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              <rect width="20" height="20" x="10" y="10" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <circle cx="80" cy="80" r="8" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              <line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" strokeWidth="0.3"/>
              <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprint)" />
        </svg>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={mainControls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
          }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              animate={{ width: [16, 64, 16] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className={`text-sm font-mono ${theme.about.accent} tracking-widest`}>BUILDING_TOMORROW.exe</span>
            <motion.div 
              className="w-16 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
              animate={{ width: [16, 64, 16] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
            />
          </div>
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className={theme.about.text}>Digital</span>{' '}
            <span className={`bg-gradient-to-r ${theme.about.gradient} bg-clip-text text-transparent`}>
              Architecture
            </span>
          </h2>
          <p className={`text-xl ${theme.about.secondary} max-w-3xl mx-auto`}>
            We don't just design buildings – we engineer experiences, code communities, and architect the future
          </p>
        </motion.div>

        {/* Interactive Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={mainControls}
          variants={{
            visible: { opacity: 1, transition: { staggerChildren: 0.2, delay: 0.5 } }
          }}
          className="mb-20"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-8 lg:space-y-0">
            {/* Timeline Navigation */}
            <div className="lg:w-1/3 space-y-4">
              {blueprintStages.map((stage, index) => (
                <motion.div
                  key={index}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    activeBlueprint === index 
                      ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50' 
                      : 'bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700'
                  }`}
                  onClick={() => setActiveBlueprint(index)}
                  whileHover={{ scale: 1.02, x: 10 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stage.color}`}>
                      <stage.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{stage.title}</h3>
                      <p className="text-sm text-gray-400">{stage.year}</p>
                    </div>
                    {activeBlueprint === index && (
                      <motion.div
                        className="ml-auto w-2 h-2 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dynamic Content Display */}
            <div className="lg:w-2/3 lg:pl-12">
              <motion.div
                key={activeBlueprint}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-4">
                  <h3 className="text-4xl font-bold">{blueprintStages[activeBlueprint].year}</h3>
                  <div className={`w-20 h-1 bg-gradient-to-r ${blueprintStages[activeBlueprint].color} rounded-full`} />
                </div>
                
                <p className="text-xl text-gray-300 leading-relaxed">
                  {blueprintStages[activeBlueprint].description}
                </p>

                {/* Animated Metrics */}
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-blue-400 mb-2"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(59, 130, 246, 0)",
                          "0 0 10px rgba(59, 130, 246, 0.8)",
                          "0 0 0px rgba(59, 130, 246, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {blueprintStages[activeBlueprint].metrics.projects}+
                    </motion.div>
                    <p className="text-sm text-gray-400">Projects</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-emerald-400 mb-2"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(16, 185, 129, 0)",
                          "0 0 10px rgba(16, 185, 129, 0.8)",
                          "0 0 0px rgba(16, 185, 129, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
                    >
                      {blueprintStages[activeBlueprint].metrics.team}
                    </motion.div>
                    <p className="text-sm text-gray-400">Team Size</p>
                  </motion.div>
                  
                  <motion.div 
                    className="text-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div 
                      className="text-3xl font-bold text-purple-400 mb-2"
                      animate={{ 
                        textShadow: [
                          "0 0 0px rgba(139, 92, 246, 0)",
                          "0 0 10px rgba(139, 92, 246, 0.8)",
                          "0 0 0px rgba(139, 92, 246, 0)"
                        ]
                      }}
                      transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
                    >
                      {blueprintStages[activeBlueprint].metrics.awards}
                    </motion.div>
                    <p className="text-sm text-gray-400">Awards</p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Capabilities Matrix */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={mainControls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.8 } }
          }}
          className="mb-20"
        >
          <h3 className="text-3xl font-bold text-center mb-12">
            <span className="text-gray-400">Capability_</span>
            <span className="text-blue-400">Matrix.json</span>
          </h3>
          
          <div className="space-y-6">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.name}
                className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-colors"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <capability.icon className="h-6 w-6 text-blue-400" />
                    <span className="font-semibold text-lg">{capability.name}</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{capability.level}%</span>
                </div>
                
                <div className="relative w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${capability.level}%` } : {}}
                    transition={{ delay: index * 0.2 + 1, duration: 1, ease: "easeOut" }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-white/20 to-transparent rounded-full"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Cursor Follower */}
        <motion.div
          className="fixed pointer-events-none z-50 w-20 h-20 border border-blue-500/50 rounded-full bg-blue-500/10 backdrop-blur-sm"
          style={{
            left: cursorPosition.x - 40,
            top: cursorPosition.y - 40,
          }}
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: 360 
          }}
          transition={{ 
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 8, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="absolute inset-2 border border-blue-400/30 rounded-full">
            <div className="absolute inset-2 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-mono text-blue-400">SCAN</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
