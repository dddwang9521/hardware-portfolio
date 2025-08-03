import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  const projectCards = [
    {
      title: '3D Mapping System',
      description: 'Time-of-flight sensor with stepper motor control',
      icon: '🗺️',
      path: '/projects',
      ariaLabel: 'View 3D Mapping System project details'
    },
    {
      title: 'Bluetooth Car',
      description: 'STM32-based wireless control system',
      icon: '🚗',
      path: '/projects',
      ariaLabel: 'View Bluetooth Car project details'
    },
    {
      title: 'Drone Project',
      description: 'Flight control system in development',
      icon: '🚁',
      path: '/projects',
      ariaLabel: 'View Drone Project details'
    }
  ];

  return (
    <main 
      id="main-content"
      className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-200"
      role="main"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1 
          className="text-5xl font-bold text-gray-800 dark:text-white mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('home.title')}
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {t('home.subtitle')}
        </motion.p>
        <motion.div 
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link 
            to="/projects"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="View all projects"
          >
            {t('home.viewProjects')}
          </Link>
          <Link 
            to="/contact"
            className="px-6 py-3 border-2 border-blue-500 text-blue-500 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label="Contact me for opportunities"
          >
            {t('home.contactMe')}
          </Link>
        </motion.div>
        
        <section aria-labelledby="featured-projects-heading">
          <h2 id="featured-projects-heading" className="sr-only">
            Featured Projects
          </h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            role="list"
            aria-label="Featured projects"
          >
            {projectCards.map((project, index) => (
              <motion.article
                key={project.title}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 dark:focus-within:ring-offset-gray-900"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                role="listitem"
              >
                <Link 
                  to={project.path}
                  className="block focus:outline-none"
                  aria-label={project.ariaLabel}
                >
                  <div className="text-4xl mb-4" aria-hidden="true">{project.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {project.description}
                  </p>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        </section>
      </div>
    </main>
  );
};

export default Home; 