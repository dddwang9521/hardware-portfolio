import emailjs from '@emailjs/browser';

// EmailJS configuration
const EMAILJS_SERVICE_ID = 'service_f4dl6wo';
const EMAILJS_TEMPLATE_ID = 'template_2am8gf3';
const EMAILJS_PUBLIC_KEY = 'YFi-ykeSEGrsD6rSW';

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const sendContactEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Send email using EmailJS
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: 'Hardware Engineer Portfolio',
      },
      EMAILJS_PUBLIC_KEY
    );

    if (result.status === 200) {
      return {
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      };
    } else {
      return {
        success: false,
        message: 'Failed to send message. Please try again later.'
      };
    }
  } catch (error) {
    console.error('Email sending error:', error);
    return {
      success: false,
      message: 'An error occurred while sending your message. Please try again later.'
    };
  }
};

// Fallback function for development/testing without EmailJS
export const sendContactEmailFallback = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Simulate success (in real implementation, this would be replaced with actual email service)
  return {
    success: true,
    message: 'Thank you for your message! I will get back to you soon.'
  };
}; 