import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView, useMotionValue, useTransform } from 'framer-motion';
import { 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Zap,
  Shield,
  CheckCircle,
  AlertCircle,
  Wifi,
  Globe,
  MessageSquare,
  User,
  Building
} from 'lucide-react';

const ContactSection = ({ theme, isMatrixMode, globalMousePosition, sectionIndex, isActive }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, threshold: 0.3 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    project: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [connectionStrength, setConnectionStrength] = useState(0);

  // Neural network effect
  const scrollY = useMotionValue(0);
  const networkRotation = useTransform(scrollY, [0, 1000], [0, 360]);

  useEffect(() => {
    const updateScrollY = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", updateScrollY);
    return () => window.removeEventListener("scroll", updateScrollY);
  }, [scrollY]);

  // Calculate connection strength based on form completion
  useEffect(() => {
    const filledFields = Object.values(formData).filter(value => value.trim() !== '').length;
    const totalFields = Object.keys(formData).length;
    setConnectionStrength((filledFields / totalFields) * 100);
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubmitStatus('success');
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        company: '',
        project: '',
        budget: '',
        message: ''
      });
      setSubmitStatus(null);
    }, 3000);
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'hello@shriramarchitecture.com',
      color: 'from-blue-500 to-cyan-400',
      description: 'Send us your project details'
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 98765 43210',
      color: 'from-emerald-500 to-teal-400',
      description: 'Speak with our architects'
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: 'Mumbai, Bangalore, Delhi',
      color: 'from-purple-500 to-pink-400',
      description: 'Multiple office locations'
    },
    {
      icon: Clock,
      label: 'Work Hours',
      value: 'Mon - Sat, 9AM - 6PM',
      color: 'from-orange-500 to-red-400',
      description: 'Always available for consultation'
    }
  ];

  const formFields = [
    { name: 'name', type: 'text', label: 'Full Name', icon: User, required: true },
    { name: 'email', type: 'email', label: 'Email Address', icon: Mail, required: true },
    { name: 'company', type: 'text', label: 'Company/Organization', icon: Building, required: false },
    { name: 'project', type: 'select', label: 'Project Type', icon: Zap, required: true, 
      options: ['Residential', 'Commercial', 'Industrial', 'Mixed-Use', 'Renovation', 'Other'] },
    { name: 'budget', type: 'select', label: 'Budget Range', icon: Shield, required: false,
      options: ['< ₹50L', '₹50L - ₹1Cr', '₹1Cr - ₹5Cr', '₹5Cr - ₹10Cr', '> ₹10Cr'] }
  ];

  return (
    <section 
      ref={ref}
      id="contact"
      className={`min-h-screen ${theme.contact.background} ${theme.contact.text} py-20 overflow-hidden relative`}
    >
      {/* Neural Network Background */}
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ rotate: networkRotation }}
      >
        <svg width="100%" height="100%" className={isMatrixMode ? "text-green-400" : theme.contact.accent}>
          <defs>
            <pattern id="neural-net" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="60" cy="60" r="3" fill="currentColor" opacity="0.6"/>
              <circle cx="20" cy="20" r="2" fill="currentColor" opacity="0.4"/>
              <circle cx="100" cy="20" r="2" fill="currentColor" opacity="0.4"/>
              <circle cx="20" cy="100" r="2" fill="currentColor" opacity="0.4"/>
              <circle cx="100" cy="100" r="2" fill="currentColor" opacity="0.4"/>
              <line x1="60" y1="60" x2="20" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <line x1="60" y1="60" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <line x1="60" y1="60" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <line x1="60" y1="60" x2="100" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#neural-net)" />
        </svg>
      </motion.div>

      {/* Floating Neural Nodes */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'
            } opacity-30`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -50, 0],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
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
              className={`w-2 h-2 rounded-full ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'}`}
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className={`text-sm font-mono tracking-widest ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
              NEURAL_CONNECT.establish()
            </span>
            <motion.div 
              className={`w-2 h-2 rounded-full ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'}`}
              animate={{ scale: [1, 2, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Neural</span>{' '}
            <span className={`bg-gradient-to-r ${isMatrixMode ? 'from-green-400 to-emerald-400' : 'from-indigo-400 to-purple-400'} bg-clip-text text-transparent`}>
              Connection
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Establish a direct neural link with our architectural consciousness. 
            Your vision + Our innovation = Extraordinary results.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            {/* Connection Strength Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-mono text-gray-400">CONNECTION_STRENGTH</span>
                <span className={`text-sm font-bold ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
                  {Math.round(connectionStrength)}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${
                    isMatrixMode 
                      ? 'from-green-500 to-emerald-400' 
                      : 'from-indigo-500 to-purple-400'
                  } rounded-full`}
                  animate={{ width: `${connectionStrength}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  className="relative group"
                >
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <field.icon className="inline h-4 w-4 mr-2" />
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField(field.name)}
                      onBlur={() => setActiveField(null)}
                      required={field.required}
                      className={`w-full px-4 py-3 bg-gray-800/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        activeField === field.name
                          ? isMatrixMode 
                            ? 'border-green-400 bg-green-500/10' 
                            : 'border-indigo-400 bg-indigo-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options.map(option => (
                        <option key={option} value={option} className="bg-gray-800">
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      onFocus={() => setActiveField(field.name)}
                      onBlur={() => setActiveField(null)}
                      required={field.required}
                      placeholder={`Enter your ${field.label.toLowerCase()}`}
                      className={`w-full px-4 py-3 bg-gray-800/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 ${
                        activeField === field.name
                          ? isMatrixMode 
                            ? 'border-green-400 bg-green-500/10' 
                            : 'border-indigo-400 bg-indigo-500/10'
                          : 'border-gray-700 hover:border-gray-600'
                      }`}
                    />
                  )}

                  {/* Field Status Indicator */}
                  {formData[field.name] && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute right-3 top-9 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}
                    >
                      <CheckCircle className="h-5 w-5" />
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Message Field */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1, duration: 0.5 }}
                className="relative group"
              >
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <MessageSquare className="inline h-4 w-4 mr-2" />
                  Project Details
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  required
                  rows="4"
                  placeholder="Describe your architectural vision, project requirements, timeline, and any specific needs..."
                  className={`w-full px-4 py-3 bg-gray-800/50 border-2 rounded-lg text-white placeholder-gray-400 focus:outline-none transition-all duration-300 resize-none ${
                    activeField === 'message'
                      ? isMatrixMode 
                        ? 'border-green-400 bg-green-500/10' 
                        : 'border-indigo-400 bg-indigo-500/10'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                />
                {formData.message && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`absolute right-3 top-9 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}
                  >
                    <CheckCircle className="h-5 w-5" />
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting || submitStatus === 'success'}
                className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 relative overflow-hidden ${
                  isSubmitting 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : submitStatus === 'success'
                      ? isMatrixMode 
                        ? 'bg-green-600' 
                        : 'bg-indigo-600'
                      : isMatrixMode
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
                        : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500'
                }`}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                {/* Button Content */}
                <div className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>ESTABLISHING CONNECTION...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      <span>CONNECTION ESTABLISHED</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>INITIATE NEURAL LINK</span>
                    </>
                  )}
                </div>

                {/* Button Glow Effect */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${
                    isMatrixMode 
                      ? 'from-green-400/20 to-emerald-400/20' 
                      : 'from-indigo-400/20 to-purple-400/20'
                  } rounded-lg opacity-0`}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8"
          >
            {/* Connection Status */}
            <div className={`p-6 rounded-2xl border-2 ${
              isMatrixMode 
                ? 'bg-green-500/10 border-green-400/30' 
                : 'bg-indigo-500/10 border-indigo-400/30'
            }`}>
              <div className="flex items-center space-x-3 mb-4">
                <motion.div
                  className={`w-3 h-3 rounded-full ${isMatrixMode ? 'bg-green-400' : 'bg-indigo-400'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="font-mono text-sm">NEURAL_NETWORK.status()</span>
              </div>
              <p className="text-gray-300">
                <Wifi className="inline h-4 w-4 mr-2" />
                Connection: ACTIVE | Response Time: &lt;24hrs | Success Rate: 99.8%
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="group p-6 bg-gray-800/50 rounded-2xl border border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer"
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} group-hover:scale-110 transition-transform duration-300`}>
                      <method.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{method.label}</h3>
                      <p className={`font-mono text-sm mb-1 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`}>
                        {method.value}
                      </p>
                      <p className="text-gray-400 text-sm">{method.description}</p>
                    </div>
                    <Globe className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response Promise */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2, duration: 0.5 }}
              className={`p-6 rounded-2xl bg-gradient-to-r ${
                isMatrixMode 
                  ? 'from-green-500/20 to-emerald-500/20 border-green-400/30' 
                  : 'from-indigo-500/20 to-purple-500/20 border-indigo-400/30'
              } border-2`}
            >
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Zap className={`h-5 w-5 mr-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                Neural Response Guarantee
              </h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <CheckCircle className={`h-4 w-4 mr-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  Response within 2 hours during business hours
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`h-4 w-4 mr-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  Free initial consultation and project assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className={`h-4 w-4 mr-2 ${isMatrixMode ? 'text-green-400' : 'text-indigo-400'}`} />
                  Detailed project proposal within 48 hours
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
