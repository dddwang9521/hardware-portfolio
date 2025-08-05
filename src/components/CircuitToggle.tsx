import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CircuitToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
}

const CircuitToggle = ({ isEnabled, onToggle }: CircuitToggleProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle(!isEnabled);
    }
  };

  return (
    <motion.button
      onClick={() => onToggle(!isEnabled)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle circuit board background animation"
      role="switch"
      aria-pressed={isEnabled}
      tabIndex={0}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: isEnabled ? 360 : 0,
          scale: isHovered ? 1.1 : 1
        }}
        transition={{ duration: 0.3 }}
        className="text-lg font-medium text-gray-800 dark:text-white dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        aria-hidden="true"
      >
        {isEnabled ? '⚡' : '🔌'}
      </motion.div>
      <span className="sr-only">
        {isEnabled ? 'Disable circuit animation' : 'Enable circuit animation'}
      </span>
    </motion.button>
  );
};

export default CircuitToggle; 