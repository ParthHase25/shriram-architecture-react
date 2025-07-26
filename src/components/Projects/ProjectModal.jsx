import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Calendar, Users, Award, Home, Zap, Droplets, Utensils, Monitor, Waves } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose, theme }) => {
  if (!project) return null;

  const features = {
    1: [
      { icon: Home, text: "Smart Home Technology" },
      { icon: Zap, text: "Solar Panels" },
      { icon: Droplets, text: "Rainwater Harvesting" },
      { icon: Utensils, text: "Modern Kitchen" },
      { icon: Monitor, text: "Home Theater" },
      { icon: Waves, text: "Swimming Pool" }
    ],
    2: [
      { icon: Home, text: "Green Architecture" },
      { icon: Zap, text: "Solar Water Heating" },
      { icon: Droplets, text: "Rainwater Harvesting" },
      { icon: Utensils, text: "Eco Kitchen" },
      { icon: Monitor, text: "Natural Ventilation" },
      { icon: Waves, text: "Landscape Gardens" }
    ],
    3: [
      { icon: Home, text: "Landscape Gardens" },
      { icon: Zap, text: "Green Roof" },
      { icon: Droplets, text: "Natural Materials" },
      { icon: Utensils, text: "Outdoor Kitchen" },
      { icon: Monitor, text: "Garden Views" },
      { icon: Waves, text: "Water Features" }
    ],
    4: [
      { icon: Home, text: "Home Automation" },
      { icon: Zap, text: "Smart Glass" },
      { icon: Droplets, text: "Premium Finishes" },
      { icon: Utensils, text: "Luxury Kitchen" },
      { icon: Monitor, text: "City Views" },
      { icon: Waves, text: "Infinity Pool" }
    ],
    5: [
      { icon: Home, text: "IoT Integration" },
      { icon: Zap, text: "Smart Lighting" },
      { icon: Droplets, text: "Space Optimization" },
      { icon: Utensils, text: "Modular Kitchen" },
      { icon: Monitor, text: "Smart Controls" },
      { icon: Waves, text: "Compact Design" }
    ],
    6: [
      { icon: Home, text: "Industrial Design" },
      { icon: Zap, text: "Open Layouts" },
      { icon: Droplets, text: "Contemporary Finishes" },
      { icon: Utensils, text: "Open Kitchen" },
      { icon: Monitor, text: "Urban Views" },
      { icon: Waves, text: "Modern Aesthetics" }
    ]
  };

  const currentFeatures = features[project.id] || features[1];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`${theme.projects.card} rounded-3xl max-w-4xl max-h-[90vh] overflow-y-auto relative`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-70 transition-all"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 md:h-80 overflow-hidden rounded-t-3xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-white/90 text-lg">
                  {project.area} • {project.team} BHK
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {/* Description */}
              <p className={`text-white text-lg mb-8 leading-relaxed`}>
                {project.description}
              </p>

              {/* Project Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className={`text-white text-xl font-bold mb-4`}>
                    Project Details
                  </h3>
                  <div className="space-y-3">
                    <div className={`flex items-center space-x-3 text-white`}>
                      <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Size:</span>
                      <span>{project.area}</span>
                    </div>
                    <div className={`flex items-center space-x-3 text-white`}>
                      <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Bedrooms:</span>
                      <span>{project.team} BHK</span>
                    </div>
                    <div className={`flex items-center space-x-3 text-white`}>
                      <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Location:</span>
                      <span>{project.location}</span>
                    </div>
                    <div className={`flex items-center space-x-3 text-white`}>
                      <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Style:</span>
                      <span>Modern Contemporary</span>
                    </div>
                    <div className={`flex items-center space-x-3 text-white`}>
                      <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      <span className="font-medium">Completed:</span>
                      <span>{project.year}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className={`text-white text-xl font-bold mb-4`}>
                    Key Features
                  </h3>
                  <div className="space-y-3">
                    {currentFeatures.map((feature, index) => (
                      <div key={index} className={`flex items-center space-x-3 text-white`}>
                        <div className={`w-6 h-6 rounded-full ${theme.projects.accent} flex items-center justify-center`}>
                          <feature.icon className="h-3 w-3 text-white" />
                        </div>
                        <span>{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  className={`flex-1 ${theme.projects.accent} text-white px-8 py-4 rounded-full font-semibold text-lg transition-all`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    // Handle discuss similar project
                    console.log('Discuss similar project');
                  }}
                >
                  Discuss Similar Project
                </motion.button>
                <motion.button
                  className={`flex-1 ${theme.projects.border} text-white px-8 py-4 rounded-full font-semibold text-lg transition-all border-2`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onClose}
                >
                  Close
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
