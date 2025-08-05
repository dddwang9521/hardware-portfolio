import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const navItems = [
    { name: t('nav.home'), path: '/', description: 'Go to home page', key: 'home' },
    { name: t('nav.about'), path: '/about', description: 'Learn more about me', key: 'about' },
    { name: t('nav.projects'), path: '/projects', description: 'View my hardware projects', key: 'projects' },
    { name: t('nav.skills'), path: '/skills', description: 'See my technical skills', key: 'skills' },
    { name: t('nav.contact'), path: '/contact', description: 'Get in touch with me', key: 'contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav 
      className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
            aria-label="Hardware Engineer Portfolio - Home"
            onClick={closeMobileMenu}
          >
            🔧 Hardware Engineer
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <ul className="flex gap-6" role="menubar">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const isHovered = hoveredItem === item.name;
                
                return (
                  <li key={item.name} role="none">
                    <motion.div
                      whileHover={{ y: -2 }}
                      onHoverStart={() => setHoveredItem(item.name)}
                      onHoverEnd={() => setHoveredItem(null)}
                    >
                      <Link
                        to={item.path}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 font-semibold' 
                            : isHovered 
                              ? 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-800' 
                              : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
                        }`}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                        aria-describedby={`nav-${item.name.toLowerCase()}-desc`}
                      >
                        {item.name}
                      </Link>
                      <span 
                        id={`nav-${item.name.toLowerCase()}-desc`} 
                        className="sr-only"
                      >
                        {item.description}
                      </span>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
            <LanguageToggle />
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-5 h-0.5 bg-current transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 border-t border-gray-200 dark:border-gray-700"
            >
              <ul className="py-4 space-y-2" role="menubar">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <li key={item.name} role="none">
                      <Link
                        to={item.path}
                        className={`block px-4 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
                          isActive 
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900 font-semibold' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        role="menuitem"
                        aria-current={isActive ? 'page' : undefined}
                        onClick={closeMobileMenu}
                      >
                        {item.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar; 