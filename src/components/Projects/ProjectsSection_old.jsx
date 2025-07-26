import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, ExternalLink } from 'lucide-react';

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [selectedProject, setSelectedProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Serenity Gardens",
      category: "Residential",
      description: "A modern residential complex that harmonizes with nature",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop",
      year: "2024",
      location: "Mumbai, India"
    },
    {
      id: 2,
      title: "Skyline Splendor",
      category: "Commercial",
      description: "An iconic commercial tower redefining urban architecture",
      image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=2070&auto=format&fit=crop",
      year: "2024",
      location: "Pune, India"
    },
    {
      id: 3,
      title: "Seaside Manor",
      category: "Luxury Villa",
      description: "Contemporary coastal living with panoramic ocean views",
      image: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
      location: "Goa, India"
    },
    {
      id: 4,
      title: "Urban Oasis",
      category: "Mixed Use",
      description: "Sustainable mixed-use development in the heart of the city",
      image: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?q=80&w=2070&auto=format&fit=crop",
      year: "2023",
      location: "Bangalore, India"
    },
    {
      id: 5,
      title: "Heritage Revival",
      category: "Restoration",
      description: "Breathing new life into a historic architectural masterpiece",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
      year: "2022",
      location: "Delhi, India"
    },
    {
      id: 6,
      title: "Green Campus",
      category: "Educational",
      description: "Eco-friendly educational facility promoting sustainable learning",
      image: "https://images.unsplash.com/photo-1562813733-b31f71025d54?q=80&w=2069&auto=format&fit=crop",
      year: "2022",
      location: "Chennai, India"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={ref} id="projects" className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
              Case Studies
              <span className="text-blue-600"> /</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience dynamic animations and visualizations that bring our designs to life,
              captivating your imagination and showcasing our creativity
            </p>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="grid lg:grid-cols-2 gap-16 items-start"
        >
          {/* Project Gallery */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="relative overflow-hidden rounded-3xl aspect-[4/3] group">
              <motion.img
                key={selectedProject}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                src={projects[selectedProject].image}
                alt={projects[selectedProject].title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-2xl font-bold mb-2">{projects[selectedProject].title}</h3>
                <p className="text-gray-200">{projects[selectedProject].description}</p>
              </div>
            </div>

            {/* Project Details */}
            <motion.div
              key={selectedProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                  {projects[selectedProject].category}
                </span>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span>{projects[selectedProject].year}</span>
                  <span>•</span>
                  <span>{projects[selectedProject].location}</span>
                </div>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                <span>View Full Project</span>
                <ExternalLink className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Project List */}
          <motion.div variants={itemVariants} className="space-y-4">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => setSelectedProject(index)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                  selectedProject === index
                    ? 'bg-white shadow-lg border-l-4 border-blue-600'
                    : 'bg-white/50 hover:bg-white hover:shadow-md'
                }`}
                whileHover={{ x: selectedProject === index ? 0 : 8 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-blue-600 font-medium">{project.category}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-500">{project.year}</span>
                    </div>
                  </div>
                  <ArrowRight className={`h-5 w-5 transition-colors ${
                    selectedProject === index ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Floating Tags */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-wrap justify-center gap-4 mt-16"
        >
          {[
            "Creative Innovation",
            "Quality Craftsmanship",
            "Precision Design", 
            "Reliable Expertise",
            "Creative Solutions"
          ].map((tag, index) => (
            <motion.div
              key={tag}
              variants={itemVariants}
              className="bg-white px-6 py-3 rounded-full text-gray-800 font-medium shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "#3B82F6",
                color: "white"
              }}
              transition={{ duration: 0.3 }}
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
