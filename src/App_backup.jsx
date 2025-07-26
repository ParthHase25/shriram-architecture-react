import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LoadingScreen, CustomCursor, QuantumNavigation, ArchitecturalGrid, ThemeToggle } from './components/UI';
import { HeroSection } from './components/Hero';
import { AboutSection } from './components/About';
import { ServicesSection } from './components/Services';
import { ProjectsSection } from './components/Projects';
import { ContactSection } from './components/Contact';
import { Footer } from './components/Footer';

function AppContent() {
  const [currentSection, setCurrentSection] = useState(0);
  const [globalMousePosition, setGlobalMousePosition] = useState({ x: 0, y: 0 });
  const { currentTheme, config, isMatrix } = useTheme();
  const { scrollYProgress } = useScroll();
  
  // Global parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const scaleBackground = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const rotateBackground = useTransform(scrollYProgress, [0, 1], [0, 360]);

  const sections = [
    { id: 'hero', component: HeroSection, name: 'GENESIS' },
    { id: 'about', component: AboutSection, name: 'EVOLUTION' },
    { id: 'services', component: ServicesSection, name: 'ARSENAL' },
    { id: 'projects', component: ProjectsSection, name: 'UNIVERSE' },
    { id: 'contact', component: ContactSection, name: 'CONNECT' },
    { id: 'footer', component: Footer, name: 'LEGACY' }
  ];

  // Global mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setGlobalMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for section tracking
  useEffect(() => {
    const observers = sections.map((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentSection(index);
            }
          });
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
      
      return observer;
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <LoadingScreen>
      <div className="App relative min-h-screen overflow-x-hidden">
        {/* Global Dynamic Background */}
        <motion.div 
          className="fixed inset-0 z-0"
          style={{ 
            y: backgroundY,
            scale: scaleBackground,
            rotate: isMatrixMode ? rotateBackground : 0
          }}
        >
          {/* Quantum Field Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
            <ArchitecturalGrid isMatrixMode={isMatrixMode} mousePosition={globalMousePosition} />
          </div>
          
          {/* Floating Quantum Particles */}
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
              }}
            />
          ))}
        </motion.div>

        {/* Revolutionary Quantum Navigation */}
        <QuantumNavigation 
          sections={sections}
          currentSection={currentSection}
          isMatrixMode={isMatrixMode}
          onSectionChange={setCurrentSection}
        />

        {/* Enhanced Custom Cursor */}
        <CustomCursor 
          isMatrixMode={isMatrixMode}
          currentSection={currentSection}
        />

        {/* Main Content with Revolutionary Transitions */}
        <main className="relative z-10">
          <AnimatePresence mode="wait">
            {sections.map((Section, index) => (
              <motion.div
                key={Section.id}
                id={Section.id}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8,
                  rotateX: -15,
                  y: 100
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  rotateX: 0,
                  y: 0
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 1.2,
                  rotateX: 15,
                  y: -100
                }}
                transition={{
                  duration: 1.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1
                }}
                className={`section-container ${
                  isMatrixMode ? 'matrix-mode' : ''
                }`}
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >
                <Section.component 
                  isMatrixMode={isMatrixMode}
                  globalMousePosition={globalMousePosition}
                  sectionIndex={index}
                  isActive={currentSection === index}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </main>

        {/* Revolutionary Section Progress Indicator */}
        <motion.div 
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="flex flex-col space-y-4">
            {sections.map((section, index) => (
              <motion.button
                key={section.id}
                onClick={() => {
                  document.getElementById(section.id)?.scrollIntoView({ 
                    behavior: 'smooth' 
                  });
                }}
                className={`group relative w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-blue-400 scale-150' 
                    : 'bg-gray-600 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 2 }}
                whileTap={{ scale: 0.8 }}
              >
                {/* Section Name Tooltip */}
                <motion.div
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                  style={{ pointerEvents: 'none' }}
                >
                  {section.name}
                </motion.div>
                
                {/* Active Section Glow */}
                {currentSection === index && (
                  <motion.div
                    className="absolute inset-0 bg-blue-400 rounded-full"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Matrix Mode Indicator */}
        <AnimatePresence>
          {isMatrixMode && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="fixed top-4 left-4 z-50 bg-green-500 text-black px-4 py-2 rounded-lg font-mono text-sm"
            >
              MATRIX_MODE.active()
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Scroll Progress */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
          style={{ scaleX: scrollYProgress }}
        />

        <style jsx>{`
          .matrix-mode {
            filter: hue-rotate(120deg) contrast(1.2) brightness(1.1);
          }
          
          .section-container {
            transform-style: preserve-3d;
          }
          
          .App {
            background: linear-gradient(45deg, #0f172a, #1e293b, #334155);
          }
        `}</style>
      </div>
    </LoadingScreen>
  );
}

export default App;
