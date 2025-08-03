import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle = () => {
  const { language, toggleLanguage, t } = useLanguage();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleLanguage();
    }
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      onKeyDown={handleKeyDown}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={t('a11y.languageToggle')}
      role="switch"
      aria-pressed={language === 'zh'}
      tabIndex={0}
    >
      <motion.div
        initial={false}
        animate={{ rotate: language === 'zh' ? 360 : language === 'fr' ? 720 : 0 }}
        transition={{ duration: 0.3 }}
        className="text-lg font-medium text-gray-800 dark:text-white dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        aria-hidden="true"
      >
        {language === 'en' ? '中' : language === 'zh' ? 'FR' : 'EN'}
      </motion.div>
      <span className="sr-only">
        {language === 'en' ? 'Switch to Mandarin' : language === 'zh' ? 'Switch to English' : 'Switch to French'}
      </span>
    </motion.button>
  );
};

export default LanguageToggle; 