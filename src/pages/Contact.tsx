import { useState } from 'react';
import { motion } from 'framer-motion';
import { sendContactEmail, sendContactEmailFallback } from '../services/emailService';
import Toast from '../components/Toast';

const Contact = () => {
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
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
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
        message: 'An error occurred while sending your message. Please try again later.',
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
          Get In Touch
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
              Send a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <div>
                <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Name <span className="text-red-500" aria-label="required">*</span>
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
                  placeholder="Your Name"
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
                  Email <span className="text-red-500" aria-label="required">*</span>
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
                  placeholder="your.email@example.com"
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
                  Subject <span className="text-red-500" aria-label="required">*</span>
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
                  placeholder="Subject of your message"
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
                  Message <span className="text-red-500" aria-label="required">*</span>
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
                  placeholder="Your message..."
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
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {isSubmitting && (
                <p id="submitting-status" className="sr-only">
                  Form is being submitted
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
              Contact Information
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Email
                </h3>
                <a 
                  href="mailto:your.email@example.com" 
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 rounded"
                >
                  your.email@example.com
                </a>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                  Professional Links
                </h3>
                
                <div className="space-y-3">
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label="Visit my GitHub profile (opens in new tab)"
                  >
                    <span className="text-2xl" aria-hidden="true">📁</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                  </a>
                  
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label="Visit my LinkedIn profile (opens in new tab)"
                  >
                    <span className="text-2xl" aria-hidden="true">💼</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">LinkedIn</span>
                  </a>
                  
                  <a 
                    href="/resume.pdf" 
                    download
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                    aria-label="Download my resume (PDF file)"
                  >
                    <span className="text-2xl" aria-hidden="true">📄</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">Download Resume</span>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                  Location
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  [Your City, Country]
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  Available for opportunities
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