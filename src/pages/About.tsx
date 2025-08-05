import { useLanguage } from '../contexts/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          {t('about.title')}
        </h1>
        
        <div className="text-center mb-12">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-5xl">
            👨‍💻
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl mx-auto">
            {t('about.description')}
          </p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('about.education')}
          </h2>
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <p className="mb-2 text-gray-800 dark:text-gray-200">• {t('about.education.year')}</p>
            <p className="mb-2 text-gray-800 dark:text-gray-200">• {t('about.education.focus')}</p>
            <p className="mb-0 text-gray-800 dark:text-gray-200">• {t('about.education.gpa')}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            {t('about.philosophy.title')}
          </h2>
          <div className="bg-blue-50 dark:bg-blue-900 border-l-4 border-blue-500 p-6 rounded-lg">
            <p className="italic text-blue-800 dark:text-blue-300 text-lg">
              {t('about.philosophy.quote')}
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            {t('about.whyHardware.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {t('about.whyHardware.reason1.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about.whyHardware.reason1.description')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {t('about.whyHardware.reason2.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about.whyHardware.reason2.description')}
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                {t('about.whyHardware.reason3.title')}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {t('about.whyHardware.reason3.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 