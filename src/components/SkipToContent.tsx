import { useState } from 'react';

const SkipToContent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleFocus = () => setIsVisible(true);
  const handleBlur = () => setIsVisible(false);

  return (
    <a
      href="#main-content"
      className={`fixed top-4 left-4 z-50 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transform transition-all duration-200 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } focus:translate-y-0 focus:opacity-100`}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      Skip to main content
    </a>
  );
};

export default SkipToContent; 