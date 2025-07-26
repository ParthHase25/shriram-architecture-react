import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { 
  ArrowUp, 
  Mail, 
  Phone, 
  MapPin, 
  Instagram, 
  Linkedin, 
  Facebook,
  Zap,
  Shield,
  Award,
  Users,
  Building,
  Sparkles,
  Eye,
  Brain,
  Code,
  Cpu,
  Database
} from 'lucide-react';

const Footer = ({ theme, isMatrixMode, globalMousePosition, sectionIndex, isActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [systemUptime, setSystemUptime] = useState(0);

  // Update time and uptime
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setSystemUptime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Holographic effect
  const scrollY = useMotionValue(0);
  const hologramShift = useTransform(scrollY, [0, 1000], [0, 100]);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    {
      title: 'Services',
      links: [
        { name: 'Residential Design', href: '#services' },
        { name: 'Commercial Architecture', href: '#services' },
        { name: 'Interior Design', href: '#services' },
        { name: 'Urban Planning', href: '#services' },
        { name: 'Sustainability Consulting', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#about' },
        { name: 'Our Team', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Careers', href: '#contact' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', href: '#' },
        { name: 'Case Studies', href: '#projects' },
        { name: 'Design Guidelines', href: '#' },
        { name: 'FAQ', href: '#faq' },
        { name: 'Support', href: '#contact' }
      ]
    }
  ];

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://in.linkedin.com/company/shriram-architects',
      color: 'from-blue-600 to-blue-400',
      hoverColor: 'hover:text-blue-400'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      href: 'https://www.instagram.com/shriram_architects_/',
      color: 'from-pink-600 to-purple-400',
      hoverColor: 'hover:text-pink-400'
    },
    { 
      name: 'Facebook', 
      icon: Facebook, 
      href: 'https://www.facebook.com/people/Shriram-Architects/61560325332954/',
      color: 'from-blue-700 to-blue-500',
      hoverColor: 'hover:text-blue-500'
    }
  ];

  const achievements = [
    { icon: Award, value: '100+', label: 'Projects Completed' },
    { icon: Users, value: '50+', label: 'Happy Clients' },
    { icon: Building, value: '15+', label: 'Years Experience' },
    { icon: Sparkles, value: '25+', label: 'Awards Won' }
  ];

  const systemStats = [
    { icon: Eye, label: 'Vision Clarity', value: '99.9%' },
    { icon: Brain, label: 'AI Processing', value: 'ACTIVE' },
    { icon: Code, label: 'Innovation Level', value: 'MAXIMUM' },
    { icon: Cpu, label: 'Performance', value: 'OPTIMAL' }
  ];

  return (
    <footer 
      ref={ref}
      className={`relative ${theme.footer.background} ${theme.footer.text} py-20 overflow-hidden`}
    >
      {/* Holographic Grid Background */}
      <div className="absolute inset-0 opacity-30">
        <motion.svg 
          width="100%" 
          height="100%" 
          className={isMatrixMode ? "text-green-400" : theme.footer.accent}
          style={{ x: hologramShift }}
        >
          <defs>
            <pattern id="hologram-grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="0" cy="0" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="100" cy="0" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="0" cy="100" r="1" fill="currentColor" opacity="0.6"/>
              <circle cx="100" cy="100" r="1" fill="currentColor" opacity="0.6"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hologram-grid)" />
        </motion.svg>
      </div>

      {/* Floating Holographic Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-1 h-8 ${
              isMatrixMode ? 'bg-green-400/20' : 'bg-indigo-400/20'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scaleY: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* System Status Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <motion.div 
              className={`w-2 h-2 rounded-full ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'}`}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-sm font-mono tracking-widest ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
              SYSTEM_STATUS.hologram_active()
            </span>
            <motion.div 
              className={`w-2 h-2 rounded-full ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'}`}
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Shriram</span>{' '}
            <span className={`bg-gradient-to-r ${isMatrixMode ? 'from-green-400 to-emerald-400' : 'from-indigo-400 to-purple-400'} bg-clip-text text-transparent`}>
              Architecture
            </span>
          </h2>
          
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Neural Network Activated • Holographic Interface Online • Ready for Next Connection
          </p>
        </motion.div>

        {/* System Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {systemStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className={`p-4 rounded-xl border ${
                isMatrixMode 
                  ? 'bg-green-500/10 border-green-400/30' 
                  : 'bg-indigo-500/10 border-indigo-400/30'
              } text-center group hover:scale-105 transition-all duration-300`}
            >
              <stat.icon className={`h-6 w-6 mx-auto mb-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
              <div className={`text-lg font-bold ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-400 font-mono">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-12 mb-16">
          {/* Company Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:col-span-1"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-4 flex items-center">
                  <Building className={`h-5 w-5 mr-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  Shriram Architecture
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Pioneering the future of architectural design through innovative solutions, 
                  sustainable practices, and cutting-edge technology integration.
                </p>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className={`h-5 w-5 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  <span className="text-gray-300">info@shriramarchitecture.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className={`h-5 w-5 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  <span className="text-gray-300">+91 9931319292</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className={`h-5 w-5 mt-1 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  <div className="text-gray-300">
                    <div>Nandan Probiz, Unit no.1603</div>
                    <div>Balewadi High Street, Baner</div>
                    <div>Pune 411045 (MH-India)</div>
                  </div>
                </div>
              </div>

              {/* Real-time System Info */}
              <div className={`p-4 rounded-xl border ${
                isMatrixMode 
                  ? 'bg-green-500/10 border-green-400/30' 
                  : 'bg-indigo-500/10 border-indigo-400/30'
              }`}>
                <div className="text-sm font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-gray-400">TIME:</span>
                    <span className={isMatrixMode ? 'text-green-400' : 'text-indigo-400'}>
                      {currentTime.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">UPTIME:</span>
                    <span className={isMatrixMode ? 'text-green-400' : 'text-indigo-400'}>
                      {Math.floor(systemUptime / 60)}:{(systemUptime % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">STATUS:</span>
                    <span className={isMatrixMode ? 'text-green-400' : 'text-indigo-400'}>ONLINE</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + sectionIndex * 0.1, duration: 0.8 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-white mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li key={link.name}>
                    <motion.a
                      href={link.href}
                      className={`text-gray-300 hover:text-white transition-colors duration-300 flex items-center group`}
                      whileHover={{ x: 5 }}
                    >
                      <span className={`w-1 h-1 rounded-full mr-3 transition-all duration-300 ${
                        isMatrixMode 
                          ? 'bg-green-400/30 group-hover:bg-green-400' 
                          : 'bg-indigo-400/30 group-hover:bg-indigo-400'
                      }`} />
                      {link.name}
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.9 + index * 0.1, duration: 0.5 }}
              className="text-center group"
              whileHover={{ scale: 1.05 }}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${
                isMatrixMode 
                  ? 'from-green-500 to-emerald-400' 
                  : 'from-indigo-500 to-purple-400'
              } flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <achievement.icon className="h-8 w-8 text-white" />
              </div>
              <div className={`text-2xl font-bold ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
                {achievement.value}
              </div>
              <div className="text-gray-300 text-sm">{achievement.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className={`border-t ${
            isMatrixMode ? 'border-green-400/30' : 'border-indigo-400/30'
          } pt-8`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            {/* Social Links */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 font-medium">Connect with us:</span>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                >
                  <social.icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center md:text-right space-y-1">
              <p className="text-gray-400 text-sm">
                © 2024 Shriram Architecture. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs font-mono">
                Neural Network v3.14.159 | Holographic Interface Active
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r ${
          isMatrixMode 
            ? 'from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500' 
            : 'from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
        } text-white shadow-lg transition-all duration-300 z-50`}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <ArrowUp className="h-6 w-6 mx-auto" />
      </motion.button>

      {/* Holographic Scanlines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <motion.div
          className={`w-full h-1 ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'} shadow-lg`}
          animate={{
            y: [0, window.innerHeight || 800, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </footer>
  );
};

export default Footer;
