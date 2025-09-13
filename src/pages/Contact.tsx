import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { sendContactEmail, sendContactEmailFallback } from '../services/emailService';
import Toast from '../components/Toast';

const Contact = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
    isVisible: boolean;
  }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToastClose = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.nameRequired');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.emailInvalid');
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = t('contact.subjectRequired');
    }
    
    if (!formData.message.trim()) {
      newErrors.message = t('contact.messageRequired');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Try to send email using EmailJS
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        // Show success message
        setToast({
          message: result.message,
          type: 'success',
          isVisible: true
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        // If EmailJS fails, try fallback
        const fallbackResult = await sendContactEmailFallback(formData);
        setToast({
          message: fallbackResult.message,
          type: fallbackResult.success ? 'success' : 'error',
          isVisible: true
        });
        if (fallbackResult.success) {
          setFormData({ name: '', email: '', subject: '', message: '' });
        }
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setToast({
        message: t('contact.error'),
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={handleToastClose}
      />
      <main 
        id="main-content"
        className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-200"
        role="main"
      >
      <div className="max-w-4xl mx-auto">
        <motion.h1 
          className="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {t('contact.title')}
        </motion.h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.section
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t('contact.sendMessage')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {t('contact.name')} <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input 
                  id="name"
                  name="name"
                  type="text" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.name ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.namePlaceholder')}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  aria-invalid={!!errors.name}
                  required
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {t('contact.email')} <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input 
                  id="email"
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.emailPlaceholder')}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  aria-invalid={!!errors.email}
                  required
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.email}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {t('contact.subject')} <span className="text-red-500" aria-label="required">*</span>
                </label>
                <input 
                  id="subject"
                  name="subject"
                  type="text" 
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.subjectPlaceholder')}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  aria-invalid={!!errors.subject}
                  required
                />
                {errors.subject && (
                  <p id="subject-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.subject}
                  </p>
                )}
              </div>
              
              <div>
                <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  {t('contact.message')} <span className="text-red-500" aria-label="required">*</span>
                </label>
                <textarea 
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder={t('contact.messagePlaceholder')}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  aria-invalid={!!errors.message}
                  required
                ></textarea>
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-sm mt-1" role="alert">
                    {errors.message}
                  </p>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-describedby={isSubmitting ? 'submitting-status' : undefined}
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>
              {isSubmitting && (
                <p id="submitting-status" className="sr-only">
                  {t('contact.submittingStatus')}
                </p>
              )}
            </form>
          </motion.section>

          {/* Contact Information */}
          <motion.section
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {t('contact.contactInfo')}
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('contact.email')}
                </h3>
                <div className="space-y-2">
                  <a 
                    href="mailto:dwang9521@gmail.com" 
                    className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
                  >
                    dwang9521@gmail.com
                  </a>
                  <a 
                    href="mailto:wangd148@mcmaster.ca" 
                    className="block text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
                  >
                    wangd148@mcmaster.ca
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  {t('contact.professionalLinks')}
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label={t('contact.githubAria')}
                  >
                    <span className="text-2xl" aria-hidden="true">📁</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://www.linkedin.com/in/dwang-9521ddd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label={t('contact.linkedinAria')}
                  >
                    <span className="text-2xl" aria-hidden="true">💼</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="/Di_Wang_Resume_2025.pdf" 
                    download="Di_Wang_Resume_2025.pdf"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label={t('contact.resumeAria')}
                  >
                    <span className="text-2xl" aria-hidden="true">📄</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{t('contact.downloadResume')}</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  {t('contact.location')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  Hamilton, ON, Canada
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {t('contact.availability')}
                </p>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </main>
    </>
  );
};

export default Contact; 