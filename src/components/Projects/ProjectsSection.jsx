import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  ExternalLink, 
  Calendar, 
  MapPin, 
  Users, 
  Award,
  Play,
  Pause,
  RotateCcw,
  Maximize2,
  Filter,
  Grid3X3,
  List,
  Eye,
  Zap
} from 'lucide-react';

const ProjectsSection = ({ theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'grid', 'list'
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  // Parallax effects
  const scrollY = useMotionValue(0);
  const rotateX = useTransform(scrollY, [0, 1000], [0, 15]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, -15]);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const projects = [
    {
      id: 1,
      title: "Neo-Tech Corporate Tower",
      category: "commercial",
      location: "Mumbai, India",
      year: "2024",
      area: "150,000 sq ft",
      team: 25,
      status: "completed",
      award: "Best Commercial Design 2024",
      description: "A revolutionary 40-story smart building featuring AI-driven energy management and sustainable design principles",
      technologies: ["Smart Glass", "IoT Integration", "Solar Panels", "Rainwater Harvesting"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
      color: "from-blue-600 to-cyan-400",
      progress: 100,
      stats: { sustainability: 95, innovation: 98, efficiency: 92 }
    },
    {
      id: 2,
      title: "Harmony Residential Complex",
      category: "residential",
      location: "Bangalore, India",
      year: "2024",
      area: "80,000 sq ft",
      team: 18,
      status: "construction",
      award: "Green Building Excellence",
      description: "Eco-friendly residential complex with integrated community spaces and vertical gardens",
      technologies: ["Green Roofs", "Natural Ventilation", "Solar Water Heating", "Waste Management"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070",
      color: "from-emerald-600 to-teal-400",
      progress: 75,
      stats: { sustainability: 98, innovation: 85, efficiency: 88 }
    },
    {
      id: 3,
      title: "Cultural Arts Center",
      category: "cultural",
      location: "Delhi, India",
      year: "2023",
      area: "120,000 sq ft",
      team: 22,
      status: "completed",
      award: "Architectural Innovation Award",
      description: "Dynamic cultural space featuring fluid architecture and interactive exhibition areas",
      technologies: ["Parametric Design", "LED Integration", "Acoustic Engineering", "Flexible Spaces"],
      image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=2026",
      color: "from-purple-600 to-pink-400",
      progress: 100,
      stats: { sustainability: 82, innovation: 95, efficiency: 90 }
    },
    {
      id: 4,
      title: "Healthcare Innovation Hub",
      category: "healthcare",
      location: "Chennai, India",
      year: "2024",
      area: "200,000 sq ft",
      team: 30,
      status: "planning",
      award: "Healthcare Design Excellence",
      description: "State-of-the-art medical facility with healing architecture and advanced technology integration",
      technologies: ["Healing Gardens", "Smart Ventilation", "Antimicrobial Surfaces", "Robotic Systems"],
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2070",
      color: "from-orange-600 to-red-400",
      progress: 25,
      stats: { sustainability: 90, innovation: 92, efficiency: 95 }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'commercial', name: 'Commercial', count: projects.filter(p => p.category === 'commercial').length },
    { id: 'residential', name: 'Residential', count: projects.filter(p => p.category === 'residential').length },
    { id: 'cultural', name: 'Cultural', count: projects.filter(p => p.category === 'cultural').length },
    { id: 'healthcare', name: 'Healthcare', count: projects.filter(p => p.category === 'healthcare').length }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  useEffect(() => {
    if (isAutoplay && viewMode === '3d') {
      const interval = setInterval(() => {
        setActiveProject((prev) => (prev + 1) % filteredProjects.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoplay, viewMode, filteredProjects.length]);

  const Project3DCard = ({ project, isActive, index }) => (
    <motion.div
      className={`absolute inset-0 rounded-3xl overflow-hidden cursor-pointer ${
        isActive ? 'z-20' : 'z-10'
      }`}
      style={{
        rotateY: isActive ? 0 : (index - activeProject) * 45,
        z: isActive ? 0 : (index - activeProject) * -100,
        scale: isActive ? 1 : 0.8,
      }}
      animate={{
        rotateY: isActive ? 0 : (index - activeProject) * 45,
        z: isActive ? 0 : (index - activeProject) * -100,
        scale: isActive ? 1 : 0.8,
        opacity: isActive ? 1 : 0.3
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={() => setActiveProject(index)}
      whileHover={{ scale: isActive ? 1.02 : 0.85 }}
    >
      <div className={`h-full bg-gradient-to-br ${project.color} p-8 text-white relative overflow-hidden`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="text-white">
            <defs>
              <pattern id={`project-pattern-${project.id}`} width="60" height="60" patternUnits="userSpaceOnUse">
                <rect width="60" height="60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                <circle cx="30" cy="30" r="8" fill="none" stroke="currentColor" strokeWidth="0.3"/>
                <rect width="16" height="16" x="22" y="22" fill="none" stroke="currentColor" strokeWidth="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#project-pattern-${project.id})`} />
          </svg>
        </div>

        {/* Project Content */}
        <div className="relative z-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
              <span className="text-sm font-mono tracking-wider">PROJECT_{project.id.toString().padStart(2, '0')}</span>
            </div>
            <div className="text-right">
              <div className="text-sm opacity-80">{project.year}</div>
              <div className="text-xs opacity-60">{project.status.toUpperCase()}</div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
              {project.title}
            </h3>
            
            <p className="text-white/90 text-lg mb-6 leading-relaxed">
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Users className="h-4 w-4" />
                  <span>{project.team} Team Members</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>{project.area}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Award className="h-4 w-4" />
                  <span className="text-xs">{project.award}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Project Progress</span>
              <span className="text-sm font-bold">{project.progress}%</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ width: 0 }}
                animate={isActive ? { width: `${project.progress}%` } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-1/4 right-4 w-16 h-16 border border-white/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-4 w-8 h-8 bg-white/20 rounded-lg"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );

  return (
    <section 
      ref={ref} 
      id="projects" 
      className={`min-h-screen ${theme.projects.background} ${theme.projects.text} py-20 overflow-hidden relative`}
      onMouseMove={handleMouseMove}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ rotateX, rotateY }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-purple-900/50 to-pink-900/50" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className="w-2 h-2 bg-blue-400 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-mono text-blue-400 tracking-widest">PORTFOLIO_EXPLORER.load()</span>
            <motion.div 
              className="w-2 h-2 bg-purple-400 rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Project</span>{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Universe
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Navigate through our architectural achievements in an immersive 3D experience
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap items-center justify-between mb-12 gap-4"
        >
          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name} ({category.count})
              </motion.button>
            ))}
          </div>

          {/* View Mode Controls */}
          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-800 rounded-lg p-1">
              {[
                { mode: '3d', icon: Eye, label: '3D View' },
                { mode: 'grid', icon: Grid3X3, label: 'Grid' },
                { mode: 'list', icon: List, label: 'List' }
              ].map((view) => (
                <motion.button
                  key={view.mode}
                  onClick={() => setViewMode(view.mode)}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === view.mode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <view.icon className="h-4 w-4" />
                </motion.button>
              ))}
            </div>
            
            {viewMode === '3d' && (
              <motion.button
                onClick={() => setIsAutoplay(!isAutoplay)}
                className="p-2 rounded-lg bg-gray-800 text-gray-300 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isAutoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Project Display */}
        <AnimatePresence mode="wait">
          {viewMode === '3d' && (
            <motion.div
              key="3d-view"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative h-[600px] mb-16"
              style={{ perspective: "1000px" }}
            >
              {filteredProjects.map((project, index) => (
                <Project3DCard
                  key={project.id}
                  project={project}
                  isActive={activeProject === index}
                  index={index}
                />
              ))}
              
              {/* Navigation Dots */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                {filteredProjects.map((_, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setActiveProject(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      activeProject === index ? 'bg-white' : 'bg-white/30'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid-view"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className="bg-gray-800 rounded-2xl overflow-hidden group cursor-pointer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 p-6 relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 text-sm">{project.location} • {project.year}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-400">{project.category}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-400">{project.progress}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Project Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {[
            { label: "Total Projects", value: "200+", icon: Grid3X3, color: "text-blue-400" },
            { label: "Countries", value: "5", icon: MapPin, color: "text-emerald-400" },
            { label: "Awards Won", value: "25+", icon: Award, color: "text-purple-400" },
            { label: "Innovation Score", value: "95%", icon: Zap, color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center group"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-4 bg-gray-800 rounded-2xl group-hover:bg-gray-700 transition-colors">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
              <motion.div 
                className={`text-4xl font-bold ${stat.color} mb-2`}
                animate={{ 
                  textShadow: [
                    "0 0 0px rgba(59, 130, 246, 0)",
                    "0 0 20px rgba(59, 130, 246, 0.5)",
                    "0 0 0px rgba(59, 130, 246, 0)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
