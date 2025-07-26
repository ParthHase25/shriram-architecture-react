import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award,
  Play,
  Pause,
  Grid3X3,
  Zap,
  Eye,
  List
} from 'lucide-react';
import ProjectModal from './ProjectModal';

const ProjectsSection = ({ theme }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.2 });
  const [activeProject, setActiveProject] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [viewMode, setViewMode] = useState('3d'); // '3d', 'grid', 'list'
  const [filter, setFilter] = useState('all');
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      title: "Luxury Villa - Baner",
      category: "villa",
      location: "Baner, Pune",
      year: "2023",
      area: "3500 sq ft",
      team: "4",
      status: "completed",
      award: "Best Residential Design 2023",
      description: "A stunning 4 BHK luxury villa featuring modern architecture with sustainable design elements. This project showcases our expertise in creating elegant living spaces that harmonize with nature.",
      technologies: ["Smart Home Technology", "Solar Panels", "Rainwater Harvesting", "Modern Kitchen"],
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2070",
      color: "from-blue-600 to-cyan-400",
      progress: 100,
      stats: { sustainability: 95, innovation: 88, efficiency: 92 }
    },
    {
      id: 2,
      title: "Eco Villa - Lonavala",
      category: "villa",
      location: "Lonavala, Maharashtra",
      year: "2024",
      area: "4200 sq ft",
      team: "5",
      status: "completed",
      award: "Green Building Excellence",
      description: "Eco-friendly villa complex with integrated vertical gardens and natural ventilation systems. A perfect blend of luxury and environmental consciousness.",
      technologies: ["Green Roofs", "Natural Ventilation", "Solar Water Heating", "Waste Management"],
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070",
      color: "from-emerald-600 to-teal-400",
      progress: 100,
      stats: { sustainability: 98, innovation: 85, efficiency: 88 }
    },
    {
      id: 3,
      title: "Garden Villa - Hinjewadi",
      category: "villa",
      location: "Hinjewadi, Pune",
      year: "2022",
      area: "2500 sq ft",
      team: "3",
      status: "completed",
      award: "Architectural Innovation Award",
      description: "A beautiful villa that seamlessly blends indoor and outdoor living with extensive gardens and green architecture principles.",
      technologies: ["Landscape Gardens", "Green Roof", "Natural Materials", "Outdoor Kitchen"],
      image: "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?q=80&w=2026",
      color: "from-purple-600 to-pink-400",
      progress: 100,
      stats: { sustainability: 82, innovation: 95, efficiency: 90 }
    },
    {
      id: 4,
      title: "Sky Penthouse - Koregaon Park",
      category: "penthouse",
      location: "Koregaon Park, Pune",
      year: "2024",
      area: "5000 sq ft",
      team: "4",
      status: "construction",
      award: "Luxury Design Excellence",
      description: "State-of-the-art penthouse with panoramic city views and advanced home automation systems. Features premium finishes and smart living solutions.",
      technologies: ["Home Automation", "Smart Glass", "Premium Finishes", "City Views"],
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=2070",
      color: "from-orange-600 to-red-400",
      progress: 75,
      stats: { sustainability: 90, innovation: 92, efficiency: 95 }
    },
    {
      id: 5,
      title: "Smart Apartment - Wakad",
      category: "apartment",
      location: "Wakad, Pune",
      year: "2023",
      area: "1200 sq ft",
      team: "2",
      status: "completed",
      award: "Smart Home Innovation",
      description: "Compact yet luxurious 2 BHK apartment with intelligent space utilization and cutting-edge smart home technology.",
      technologies: ["IoT Integration", "Space Optimization", "Smart Lighting", "Modular Furniture"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070",
      color: "from-indigo-600 to-blue-400",
      progress: 100,
      stats: { sustainability: 85, innovation: 95, efficiency: 90 }
    },
    {
      id: 6,
      title: "Urban Loft - Viman Nagar",
      category: "loft",
      location: "Viman Nagar, Pune",
      year: "2024",
      area: "1800 sq ft",
      team: "3",
      status: "planning",
      award: "Contemporary Design Award",
      description: "Modern urban loft with industrial aesthetics and contemporary living spaces. Perfect for the modern professional lifestyle.",
      technologies: ["Industrial Design", "Open Layouts", "Contemporary Finishes", "Urban Aesthetics"],
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053",
      color: "from-gray-600 to-slate-400",
      progress: 30,
      stats: { sustainability: 80, innovation: 88, efficiency: 85 }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'villa', name: 'Villas', count: projects.filter(p => p.category === 'villa').length },
    { id: 'penthouse', name: 'Penthouses', count: projects.filter(p => p.category === 'penthouse').length },
    { id: 'apartment', name: 'Apartments', count: projects.filter(p => p.category === 'apartment').length },
    { id: 'loft', name: 'Lofts', count: projects.filter(p => p.category === 'loft').length }
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

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeProjectModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
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
              <div className={`w-3 h-3 ${theme.projects.accent} rounded-full animate-pulse`} />
              <span className={`text-sm font-mono tracking-wider ${theme.projects.secondary}`}>PROJECT_{project.id.toString().padStart(2, '0')}</span>
            </div>
            <div className="text-right">
              <div className={`text-sm ${theme.projects.secondary}`}>{project.year}</div>
              <div className={`text-xs ${theme.projects.muted}`}>{project.status.toUpperCase()}</div>
            </div>
          </div>

          <div className="flex-1">
            <h3 className={`text-3xl md:text-4xl font-bold mb-4 leading-tight text-white`}>
              {project.title}
            </h3>
            
            <p className={`text-white text-lg mb-6 leading-relaxed`}>
              {project.description}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className={`flex items-center space-x-2 text-sm text-white`}>
                  <MapPin className="h-4 w-4" />
                  <span>{project.location}</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm text-white`}>
                  <Users className="h-4 w-4" />
                  <span>{project.team} BHK</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className={`flex items-center space-x-2 text-sm text-white`}>
                  <Calendar className="h-4 w-4" />
                  <span>{project.area}</span>
                </div>
                <div className={`flex items-center space-x-2 text-sm text-white`}>
                  <Award className="h-4 w-4" />
                  <span className={`text-xs text-white`}>{project.status.charAt(0).toUpperCase() + project.status.slice(1)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-auto">
            <div className="flex justify-between items-center mb-2">
              <span className={`text-sm text-white`}>Project Progress</span>
              <span className={`text-sm font-bold text-white`}>{project.progress}%</span>
            </div>
            <div className={`w-full h-2 ${theme.projects.muted} bg-opacity-20 rounded-full overflow-hidden`}>
              <motion.div
                className={`h-full ${theme.projects.accent} rounded-full`}
                initial={{ width: 0 }}
                animate={isActive ? { width: `${project.progress}%` } : {}}
                transition={{ delay: 0.5, duration: 1 }}
              />
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className={`absolute top-1/4 right-4 w-16 h-16 border ${theme.projects.border} rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute bottom-1/4 left-4 w-8 h-8 ${theme.projects.accent} bg-opacity-20 rounded-lg`}
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
              className={`w-2 h-2 ${theme.projects.accent} rounded-full`}
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-sm font-mono ${theme.projects.accent} tracking-widest`}>PORTFOLIO_EXPLORER.load()</span>
            <motion.div 
              className={`w-2 h-2 ${theme.projects.accent} rounded-full`}
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Project</span>{' '}
            <span className={`bg-gradient-to-r ${theme.projects.gradient} bg-clip-text text-transparent`}>
              Universe
            </span>
          </h2>
          
          <p className={`text-xl ${theme.projects.secondary} max-w-3xl mx-auto`}>
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
                    ? `${theme.projects.accent} text-white` 
                    : `${theme.projects.card} ${theme.projects.secondary} hover:${theme.projects.hover}`
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
            <div className={`flex ${theme.projects.card} rounded-lg p-1`}>
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
                      ? `${theme.projects.accent} text-white` 
                      : `${theme.projects.muted} hover:text-white`
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
                className={`p-2 rounded-lg ${theme.projects.card} ${theme.projects.secondary} hover:text-white transition-colors`}
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
                  className={`${theme.projects.card} rounded-3xl overflow-hidden group cursor-pointer shadow-2xl border border-white/10`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, scale: 1.03 }}
                  onClick={() => openProjectModal(project)}
                >
                  {/* Image Header */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-80`} />
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        project.status === 'completed' 
                          ? 'bg-green-500/90 text-white' 
                          : project.status === 'construction'
                          ? 'bg-yellow-500/90 text-white'
                          : 'bg-blue-500/90 text-white'
                      }`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white border border-white/30">
                        {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                      </span>
                    </div>

                    {/* Overlay Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center space-x-2 text-white/90 text-sm mb-2">
                          <MapPin className="h-4 w-4" />
                          <span>{project.location}</span>
                        </div>
                        <div className="flex items-center space-x-4 text-white/80 text-xs">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{project.year}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Award className="h-3 w-3" />
                            <span>{project.team} BHK</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title and Basic Info */}
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex items-center justify-between text-sm text-white/70">
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <span>{project.area}</span>
                        </span>
                        <span className="text-blue-400 font-medium">{project.year}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70 border border-white/20"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            +{project.technologies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Progress and Stats */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-white/60">Project Progress</span>
                        <span className="text-xs font-bold text-white">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={{ width: `${project.progress}%` }}
                          transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                        />
                      </div>
                      
                      {/* Mini Stats */}
                      <div className="grid grid-cols-3 gap-2 pt-2">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-xs font-bold text-white">{value}%</div>
                            <div className="text-xs text-white/50 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* View Details Button */}
                    <motion.button
                      className="w-full mt-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openProjectModal(project);
                      }}
                    >
                      View Details
                    </motion.button>
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
            { label: "Total Projects", value: "200+", icon: Grid3X3, color: theme.projects.accent },
            { label: "Countries", value: "5", icon: MapPin, color: theme.projects.accent },
            { label: "Awards Won", value: "25+", icon: Award, color: theme.projects.accent },
            { label: "Innovation Score", value: "95%", icon: Zap, color: theme.projects.accent }
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
                <div className={`p-4 ${theme.projects.card} rounded-2xl group-hover:${theme.projects.hover} transition-colors`}>
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
              <p className={theme.projects.muted}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeProjectModal}
          theme={theme}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
