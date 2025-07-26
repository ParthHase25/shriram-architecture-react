import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Mail, ArrowUpRight } from 'lucide-react';

const Navbar = ({ theme }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    const navItems = [
        { id: 'hero', label: 'Home', href: '#hero' },
        { id: 'about', label: 'About', href: '#about' },
        { id: 'services', label: 'Services', href: '#services' },
        { id: 'projects', label: 'Projects', href: '#projects' },
        { id: 'contact', label: 'Contact', href: '#contact' }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleSectionScroll = () => {
            const sections = navItems.map(item => item.id);
            let current = 'hero';

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        current = section;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleSectionScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleSectionScroll);
        };
    }, []);

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled 
                        ? `${theme.navigation.background} backdrop-blur-md shadow-lg ${theme.navigation.border}` 
                        : 'bg-transparent'
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <motion.div
                            className="flex-shrink-0"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                        >
                            <a 
                                href="#hero" 
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('#hero');
                                }}
                                className="flex items-center space-x-3"
                            >
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">S</span>
                                </div>
                                <div className="hidden sm:block">
                                    <span className={`text-xl font-bold transition-colors duration-300 ${
                                        isScrolled ? theme.navigation.text : 'text-white'
                                    }`}>
                                        Shriram Architecture
                                    </span>
                                </div>
                            </a>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center space-x-1">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={item.id}
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection(item.href);
                                    }}
                                    className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg group ${
                                        activeSection === item.id
                                            ? (isScrolled ? 'text-blue-600' : 'text-blue-300')
                                            : (isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white/90 hover:text-white')
                                    }`}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    {item.label}
                                    
                                    {/* Active indicator */}
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                            layoutId="activeTab"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                    
                                    {/* Hover effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.a>
                            ))}
                        </div>

                        {/* Contact Info & CTA */}
                        <div className="hidden lg:flex items-center space-x-4">
                            <motion.div
                                className="flex items-center space-x-3 text-sm"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.4, delay: 0.6 }}
                            >
                                <a 
                                    href="tel:+919876543210"
                                    className={`flex items-center space-x-1 transition-colors duration-300 ${
                                        isScrolled ? 'text-gray-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
                                    }`}
                                >
                                    <Phone className="w-4 h-4" />
                                    <span>+91 98765 43210</span>
                                </a>
                            </motion.div>
                            
                            <motion.a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    scrollToSection('#contact');
                                }}
                                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: 0.8 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Get Quote
                                <ArrowUpRight className="w-4 h-4 ml-1" />
                            </motion.a>
                        </div>

                        {/* Mobile menu button */}
                        <motion.button
                            className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${
                                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-300'
                            }`}
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </motion.button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        
                        {/* Menu Panel */}
                        <motion.div
                            className="fixed top-16 right-4 left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/20 z-50 lg:hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="p-6">
                                {/* Navigation Links */}
                                <nav className="space-y-4">
                                    {navItems.map((item, index) => (
                                        <motion.a
                                            key={item.id}
                                            href={item.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                scrollToSection(item.href);
                                            }}
                                            className={`block px-4 py-3 text-lg font-medium rounded-xl transition-all duration-300 ${
                                                activeSection === item.id
                                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                                    : 'text-gray-700 hover:bg-gray-100'
                                            }`}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            {item.label}
                                        </motion.a>
                                    ))}
                                </nav>

                                {/* Contact Info */}
                                <motion.div
                                    className="mt-6 pt-6 border-t border-gray-200 space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                >
                                    <a 
                                        href="tel:+919876543210"
                                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span>+91 98765 43210</span>
                                    </a>
                                    <a 
                                        href="mailto:info@shriramarchitecture.com"
                                        className="flex items-center space-x-3 text-gray-600 hover:text-blue-600 transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        <span>info@shriramarchitecture.com</span>
                                    </a>
                                </motion.div>

                                {/* CTA Button */}
                                <motion.a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        scrollToSection('#contact');
                                    }}
                                    className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: 0.6 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Get Free Quote
                                    <ArrowUpRight className="w-5 h-5 ml-2" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;