import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: 'Home', path: '/', description: 'Go to home page' },
    { name: 'About', path: '/about', description: 'Learn more about me' },
    { name: 'Projects', path: '/projects', description: 'View my hardware projects' },
    { name: 'Skills', path: '/skills', description: 'See my technical skills' },
    { name: 'Contact', path: '/contact', description: 'Get in touch with me' },
  ];

  return (
    <nav 
      className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 transition-colors duration-200"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto px-8 py-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 rounded"
            aria-label="Hardware Engineer Portfolio - Home"
          >
            🔧 Hardware Engineer
          </Link>
          
          <div className="flex items-center gap-6">
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
                            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 font-semibold' 
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
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 