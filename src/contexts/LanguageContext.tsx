import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

type Language = 'en' | 'zh' | 'fr';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// Translation object
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.contact': 'Contact',
    
    // Home page
    'home.title': 'Hardware Engineering Portfolio',
    'home.subtitle': 'Welcome to my hardware engineering projects showcase',
    'home.description': 'I specialize in embedded systems, PCB design, and hardware prototyping. Explore my projects below.',
    'home.viewProjects': 'View Projects',
    'home.contactMe': 'Contact Me',
    
    // About page
    'about.title': 'About Me',
    'about.subtitle': 'Hardware Engineer & Embedded Systems Specialist',
    'about.description': 'I am passionate about creating innovative hardware solutions and pushing the boundaries of what\'s possible in embedded systems.',
    'about.education': 'Education',
    'about.experience': 'Experience',
    'about.interests': 'Interests',
    
    // Projects page
    'projects.title': 'My Projects',
    'projects.subtitle': 'Hardware Engineering Portfolio',
    'projects.description': 'A collection of my hardware engineering projects, from embedded systems to PCB design.',
    'projects.viewDetails': 'View Details',
    'projects.technologies': 'Technologies',
    
    // Skills page
    'skills.title': 'Skills & Technologies',
    'skills.subtitle': 'Technical Expertise',
    'skills.description': 'My technical skills and expertise in hardware engineering and related technologies.',
    'skills.hardware': 'Hardware Design',
    'skills.software': 'Software Development',
    'skills.tools': 'Tools & Software',
    
    // Contact page
    'contact.title': 'Get In Touch',
    'contact.subtitle': 'Let\'s Connect',
    'contact.description': 'I\'m always interested in new opportunities and collaborations. Feel free to reach out!',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.sent': 'Message Sent!',
    'contact.error': 'Error sending message',
    'contact.nameRequired': 'Name is required',
    'contact.emailRequired': 'Email is required',
    'contact.emailInvalid': 'Please enter a valid email',
    'contact.subjectRequired': 'Subject is required',
    'contact.messageRequired': 'Message is required',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.close': 'Close',
    
    // Accessibility
    'a11y.languageToggle': 'Toggle language between English and Mandarin',
    'a11y.themeToggle': 'Toggle between light and dark mode',
    'a11y.skipToContent': 'Skip to main content',
    'a11y.navigation': 'Main navigation',
    'a11y.currentPage': 'Current page',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.projects': '项目',
    'nav.skills': '技能',
    'nav.contact': '联系',
    
    // Home page
    'home.title': '硬件工程作品集',
    'home.subtitle': '欢迎来到我的硬件工程项目展示',
    'home.description': '我专注于嵌入式系统、PCB设计和硬件原型制作。请查看下面的项目。',
    'home.viewProjects': '查看项目',
    'home.contactMe': '联系我',
    
    // About page
    'about.title': '关于我',
    'about.subtitle': '硬件工程师 & 嵌入式系统专家',
    'about.description': '我热衷于创造创新的硬件解决方案，并推动嵌入式系统可能性的边界。',
    'about.education': '教育背景',
    'about.experience': '工作经验',
    'about.interests': '兴趣爱好',
    
    // Projects page
    'projects.title': '我的项目',
    'projects.subtitle': '硬件工程作品集',
    'projects.description': '我的硬件工程项目集合，从嵌入式系统到PCB设计。',
    'projects.viewDetails': '查看详情',
    'projects.technologies': '技术栈',
    
    // Skills page
    'skills.title': '技能与技术',
    'skills.subtitle': '技术专长',
    'skills.description': '我在硬件工程和相关技术方面的技能和专业知识。',
    'skills.hardware': '硬件设计',
    'skills.software': '软件开发',
    'skills.tools': '工具与软件',
    
    // Contact page
    'contact.title': '联系我',
    'contact.subtitle': '让我们联系',
    'contact.description': '我一直对新的机会和合作感兴趣。请随时联系我！',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.subject': '主题',
    'contact.message': '消息',
    'contact.send': '发送消息',
    'contact.sending': '发送中...',
    'contact.sent': '消息已发送！',
    'contact.error': '发送消息时出错',
    'contact.nameRequired': '姓名是必填项',
    'contact.emailRequired': '邮箱是必填项',
    'contact.emailInvalid': '请输入有效的邮箱地址',
    'contact.subjectRequired': '主题是必填项',
    'contact.messageRequired': '消息是必填项',
    
    // Common
    'common.loading': '加载中...',
    'common.error': '错误',
    'common.success': '成功',
    'common.back': '返回',
    'common.next': '下一步',
    'common.close': '关闭',
    
    // Accessibility
    'a11y.languageToggle': '在英语和中文之间切换语言',
    'a11y.themeToggle': '在浅色和深色模式之间切换',
    'a11y.skipToContent': '跳转到主要内容',
    'a11y.navigation': '主导航',
    'a11y.currentPage': '当前页面',
  },
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.skills': 'Compétences',
    'nav.contact': 'Contact',
    
    // Home page
    'home.title': 'Portfolio d\'Ingénierie Matérielle',
    'home.subtitle': 'Bienvenue dans ma vitrine de projets d\'ingénierie matérielle',
    'home.description': 'Je me spécialise dans les systèmes embarqués, la conception de PCB et le prototypage matériel. Explorez mes projets ci-dessous.',
    'home.viewProjects': 'Voir les Projets',
    'home.contactMe': 'Me Contacter',
    
    // About page
    'about.title': 'À Propos de Moi',
    'about.subtitle': 'Ingénieur Matériel & Spécialiste des Systèmes Embarqués',
    'about.description': 'Je suis passionné par la création de solutions matérielles innovantes et la poussée des limites du possible dans les systèmes embarqués.',
    'about.education': 'Éducation',
    'about.experience': 'Expérience',
    'about.interests': 'Intérêts',
    
    // Projects page
    'projects.title': 'Mes Projets',
    'projects.subtitle': 'Portfolio d\'Ingénierie Matérielle',
    'projects.description': 'Une collection de mes projets d\'ingénierie matérielle, des systèmes embarqués à la conception de PCB.',
    'projects.viewDetails': 'Voir les Détails',
    'projects.technologies': 'Technologies',
    
    // Skills page
    'skills.title': 'Compétences & Technologies',
    'skills.subtitle': 'Expertise Technique',
    'skills.description': 'Mes compétences techniques et expertise en ingénierie matérielle et technologies connexes.',
    'skills.hardware': 'Conception Matérielle',
    'skills.software': 'Développement Logiciel',
    'skills.tools': 'Outils & Logiciels',
    
    // Contact page
    'contact.title': 'Me Contacter',
    'contact.subtitle': 'Connectons-nous',
    'contact.description': 'Je suis toujours intéressé par de nouvelles opportunités et collaborations. N\'hésitez pas à me contacter !',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi en cours...',
    'contact.sent': 'Message Envoyé !',
    'contact.error': 'Erreur lors de l\'envoi du message',
    'contact.nameRequired': 'Le nom est requis',
    'contact.emailRequired': 'L\'email est requis',
    'contact.emailInvalid': 'Veuillez entrer un email valide',
    'contact.subjectRequired': 'Le sujet est requis',
    'contact.messageRequired': 'Le message est requis',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.back': 'Retour',
    'common.next': 'Suivant',
    'common.close': 'Fermer',
    
    // Accessibility
    'a11y.languageToggle': 'Basculer entre anglais, chinois et français',
    'a11y.themeToggle': 'Basculer entre mode clair et sombre',
    'a11y.skipToContent': 'Aller au contenu principal',
    'a11y.navigation': 'Navigation principale',
    'a11y.currentPage': 'Page actuelle',
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) {
      return savedLanguage;
    }
    // Check browser language
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    if (browserLang.startsWith('fr')) {
      return 'fr';
    }
    return 'en';
  });

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem('language', language);
    
    // Update document language attribute for accessibility
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prevLanguage => {
      if (prevLanguage === 'en') return 'zh';
      if (prevLanguage === 'zh') return 'fr';
      return 'en';
    });
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 