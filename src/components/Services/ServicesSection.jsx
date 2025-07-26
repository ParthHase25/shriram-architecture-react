import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { 
  Building2, 
  Zap, 
  Layers, 
  Cpu, 
  TreePine, 
  Shield, 
  Eye,
  MousePointer2,
  Code,
  Lightbulb,
  Compass,
  Wrench
} from 'lucide-react';

const ServicesSection = ({ theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredTool, setHoveredTool] = useState(null);

  // Parallax effects
  const scrollY = useMotionValue(0);
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -300]);
  const floatingY = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const services = [
    {
      id: 0,
      title: "Architectural Design",
      subtitle: "Creative Blueprints",
      description: "Transforming visions into detailed architectural masterpieces with cutting-edge design methodologies",
      icon: Building2,
      color: "from-blue-500 to-cyan-400",
      tools: ["AutoCAD", "SketchUp", "Revit", "3ds Max"],
      projects: 150,
      satisfaction: 98,
      timeline: "8-16 weeks",
      tech: ["BIM", "Parametric Design", "VR Visualization"]
    },
    {
      id: 1,
      title: "Smart Buildings",
      subtitle: "Intelligent Spaces",
      description: "Integrating IoT, AI, and sustainable technologies for next-generation intelligent structures",
      icon: Cpu,
      color: "from-purple-500 to-pink-400",
      tools: ["IoT Sensors", "AI Analytics", "Smart Glass", "Energy Mgmt"],
      projects: 75,
      satisfaction: 95,
      timeline: "12-20 weeks",
      tech: ["Machine Learning", "Automation", "Energy Optimization"]
    },
    {
      id: 2,
      title: "Sustainable Design",
      subtitle: "Green Architecture",
      description: "Eco-conscious designs that harmonize with nature while maximizing energy efficiency",
      icon: TreePine,
      color: "from-emerald-500 to-teal-400",
      tools: ["Solar Analysis", "Green Roofs", "Recycled Materials", "Wind Studies"],
      projects: 120,
      satisfaction: 96,
      timeline: "10-18 weeks",
      tech: ["LEED Certification", "Carbon Neutral", "Renewable Energy"]
    },
    {
      id: 3,
      title: "Structural Engineering",
      subtitle: "Foundation Excellence",
      description: "Advanced structural analysis ensuring safety, durability, and architectural integrity",
      icon: Shield,
      color: "from-orange-500 to-red-400",
      tools: ["FEA Analysis", "Seismic Design", "Load Calculations", "Material Testing"],
      projects: 200,
      satisfaction: 99,
      timeline: "6-12 weeks",
      tech: ["Advanced Materials", "Earthquake Resistance", "3D Modeling"]
    }
  ];

  const designTools = [
    { name: "Sketch", icon: Eye, position: { x: 15, y: 20 }, delay: 0 },
    { name: "Blueprint", icon: Layers, position: { x: 85, y: 15 }, delay: 0.5 },
    { name: "Measure", icon: Compass, position: { x: 20, y: 80 }, delay: 1 },
    { name: "Build", icon: Wrench, position: { x: 80, y: 75 }, delay: 1.5 },
    { name: "Code", icon: Code, position: { x: 50, y: 50 }, delay: 2 },
    { name: "Innovate", icon: Lightbulb, position: { x: 65, y: 25 }, delay: 2.5 }
  ];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveService((prev) => (prev + 1) % services.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      ref={ref} 
      id="services" 
      className={`min-h-screen ${theme.services.background} ${theme.services.text} py-20 overflow-hidden relative`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Grid Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ y: backgroundY }}
      >
        <svg width="100%" height="120%" className="text-blue-400">
          <defs>
            <pattern id="architect-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <rect width="20" height="20" x="30" y="30" fill="none" stroke="currentColor" strokeWidth="0.8"/>
              <circle cx="40" cy="40" r="2" fill="currentColor" opacity="0.6"/>
              <line x1="10" y1="40" x2="70" y2="40" stroke="currentColor" strokeWidth="0.3"/>
              <line x1="40" y1="10" x2="40" y2="70" stroke="currentColor" strokeWidth="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#architect-grid)" />
        </svg>
      </motion.div>

      {/* Floating Design Tools */}
      <div className="absolute inset-0 pointer-events-none">
        {designTools.map((tool, index) => (
          <motion.div
            key={tool.name}
            className="absolute"
            style={{
              left: `${tool.position.x}%`,
              top: `${tool.position.y}%`
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: 0.3, 
              scale: 1,
              y: [0, -20, 0],
              rotate: [0, 360]
            } : {}}
            transition={{ 
              delay: tool.delay,
              y: { duration: 3 + index, repeat: Infinity },
              rotate: { duration: 8 + index * 2, repeat: Infinity, ease: "linear" }
            }}
          >
            <div className="p-3 bg-blue-500/20 rounded-full backdrop-blur-sm border border-blue-400/30">
              <tool.icon className="h-6 w-6 text-blue-300" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-blue-400 tracking-widest">DIGITAL_WORKSPACE.init()</span>
            <motion.div 
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Architect's</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Toolkit
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Advanced solutions engineered for tomorrow's architectural challenges
          </p>
        </motion.div>

        {/* Interactive Service Display */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Service Selector */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-500 ${
                  activeService === index 
                    ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 border-2 border-blue-500/50 shadow-2xl' 
                    : 'bg-gray-800/50 border border-gray-700 hover:border-blue-500/30'
                }`}
                onClick={() => setActiveService(index)}
                onMouseEnter={() => setHoveredTool(index)}
                onMouseLeave={() => setHoveredTool(null)}
                whileHover={{ scale: 1.02, x: 10 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: index * 0.1 }}
              >
                {/* Service Icon and Title */}
                <div className="flex items-center space-x-4 mb-4">
                  <motion.div 
                    className={`p-3 rounded-xl bg-gradient-to-r ${service.color}`}
                    animate={activeService === index ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <service.icon className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold">{service.title}</h3>
                    <p className="text-blue-400 text-sm">{service.subtitle}</p>
                  </div>
                  {activeService === index && (
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <MousePointer2 className="h-5 w-5 text-blue-400" />
                    </motion.div>
                  )}
                </div>

                {/* Service Description */}
                <p className="text-gray-300 mb-4">{service.description}</p>

                {/* Service Tools */}
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, toolIndex) => (
                    <motion.span
                      key={tool}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={hoveredTool === index ? { opacity: 1, scale: 1 } : { opacity: 0.7, scale: 0.95 }}
                      transition={{ delay: toolIndex * 0.1 }}
                    >
                      {tool}
                    </motion.span>
                  ))}
                </div>

                {/* Progress Bar */}
                {activeService === index && (
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-b-2xl"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Dynamic Service Details */}
          <motion.div
            key={activeService}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            {/* Interactive Canvas */}
            <div className="relative bg-gray-800/50 rounded-3xl p-8 border border-gray-700 overflow-hidden">
              {/* Mouse Follower Effect */}
              <motion.div
                className="absolute w-32 h-32 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl"
                style={{
                  left: `${mousePosition.x}%`,
                  top: `${mousePosition.y}%`,
                  transform: "translate(-50%, -50%)"
                }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
              />

              <div className="relative z-10">
                <div className="flex items-center space-x-4 mb-6">
                  <div className={`p-4 rounded-2xl bg-gradient-to-r ${services[activeService].color}`}>
                    {React.createElement(services[activeService].icon, { className: "h-10 w-10 text-white" })}
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold">{services[activeService].title}</h3>
                    <p className="text-blue-400">{services[activeService].subtitle}</p>
                  </div>
                </div>

                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  {services[activeService].description}
                </p>

                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-blue-400 mb-2"
                      key={`projects-${activeService}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {services[activeService].projects}+
                    </motion.div>
                    <p className="text-sm text-gray-400">Projects</p>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-3xl font-bold text-emerald-400 mb-2"
                      key={`satisfaction-${activeService}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                    >
                      {services[activeService].satisfaction}%
                    </motion.div>
                    <p className="text-sm text-gray-400">Satisfaction</p>
                  </div>
                  <div className="text-center">
                    <motion.div 
                      className="text-lg font-bold text-purple-400 mb-2"
                      key={`timeline-${activeService}`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {services[activeService].timeline}
                    </motion.div>
                    <p className="text-sm text-gray-400">Timeline</p>
                  </div>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="text-lg font-semibold mb-4 text-blue-400">Core Technologies</h4>
                  <div className="flex flex-wrap gap-3">
                    {services[activeService].tech.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full text-sm border border-blue-500/30"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Interactive Process Flow */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <h3 className="text-3xl font-bold mb-12">
            <span className="text-gray-400">Process_</span>
            <span className="text-blue-400">Flow.execute()</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: "01", title: "Analyze", icon: Eye },
              { step: "02", title: "Design", icon: Lightbulb },
              { step: "03", title: "Build", icon: Wrench },
              { step: "04", title: "Deploy", icon: Zap }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2 + 1 }}
                whileHover={{ y: -10 }}
              >
                <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 group-hover:border-blue-500/50 transition-colors">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4">
                    <phase.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{phase.step}</div>
                  <div className="text-lg font-semibold">{phase.title}</div>
                </div>
                
                {index < 3 && (
                  <motion.div
                    className="hidden md:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ delay: index * 0.2 + 1.5, duration: 0.5 }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;