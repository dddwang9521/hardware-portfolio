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
    'home.viewProjectsAria': 'View all projects',
    'home.contactMeAria': 'Contact me for opportunities',
    'home.featuredProjects': 'Featured Projects',
    'home.project1.title': '3D Mapping System',
    'home.project1.description': 'Time-of-flight sensor with stepper motor control',
    'home.project1.ariaLabel': 'View 3D Mapping System project details',
    'home.project2.title': 'Bluetooth Car',
    'home.project2.description': 'STM32-based wireless control system',
    'home.project2.ariaLabel': 'View Bluetooth Car project details',
    'home.project3.title': 'Drone Project',
    'home.project3.description': 'Flight control system in development',
    'home.project3.ariaLabel': 'View Drone Project details',
    
    // About page
    'about.title': 'About Me',
    'about.subtitle': 'Hardware Engineer & Embedded Systems Specialist',
    'about.description': 'I\'m a 3rd year Electrical Engineering student passionate about hardware design and embedded systems. While AI transforms software development, hardware remains uniquely human - requiring physical intuition, hands-on skills, and real-world problem solving.',
    'about.education': 'Education',
    'about.education.year': '3rd Year Electrical Engineering',
    'about.education.focus': 'Focus: Hardware Design & Embedded Systems',
    'about.education.gpa': 'GPA: [Your GPA]',
    'about.philosophy.title': 'Hardware Philosophy',
    'about.philosophy.quote': 'While AI transforms software development, hardware remains uniquely human - requiring physical intuition, hands-on skills, and real-world problem solving.',
    'about.whyHardware.title': 'Why Hardware Over Software?',
    'about.whyHardware.reason1.title': 'Physical Problem Solving',
    'about.whyHardware.reason1.description': 'Real-world challenges that require hands-on expertise',
    'about.whyHardware.reason2.title': 'AI-Resistant Skills',
    'about.whyHardware.reason2.description': 'Skills that AI cannot easily replicate',
    'about.whyHardware.reason3.title': 'Growing Demand',
    'about.whyHardware.reason3.description': 'High demand in IoT and embedded systems',
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
    'contact.sendMessage': 'Send a Message',
    'contact.name': 'Name',
    'contact.email': 'Email',
    'contact.subject': 'Subject',
    'contact.message': 'Message',
    'contact.namePlaceholder': 'Your Name',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subjectPlaceholder': 'Subject of your message',
    'contact.messagePlaceholder': 'Your message...',
    'contact.send': 'Send Message',
    'contact.sending': 'Sending...',
    'contact.submittingStatus': 'Form is being submitted',
    'contact.sent': 'Message Sent!',
    'contact.error': 'Error sending message',
    'contact.nameRequired': 'Name is required',
    'contact.emailRequired': 'Email is required',
    'contact.emailInvalid': 'Please enter a valid email',
    'contact.subjectRequired': 'Subject is required',
    'contact.messageRequired': 'Message is required',
    'contact.contactInfo': 'Contact Information',
    'contact.professionalLinks': 'Professional Links',
    'contact.githubAria': 'Visit my GitHub profile (opens in new tab)',
    'contact.linkedinAria': 'Visit my LinkedIn profile (opens in new tab)',
    'contact.downloadResume': 'Download Resume',
    'contact.resumeAria': 'Download my resume (PDF file)',
    'contact.location': 'Location',
    'contact.locationPlaceholder': '[Your City, Country]',
    'contact.availability': 'Available for opportunities',
    
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
    'home.viewProjectsAria': '查看所有项目',
    'home.contactMeAria': '联系我获取机会',
    'home.featuredProjects': '精选项目',
    'home.project1.title': '3D 测绘系统',
    'home.project1.description': '飞行时间传感器与步进电机控制',
    'home.project1.ariaLabel': '查看3D测绘系统项目详情',
    'home.project2.title': '蓝牙汽车',
    'home.project2.description': '基于STM32的无线控制系统',
    'home.project2.ariaLabel': '查看蓝牙汽车项目详情',
    'home.project3.title': '无人机项目',
    'home.project3.description': '飞行控制系统开发中',
    'home.project3.ariaLabel': '查看无人机项目详情',
    
    // About page
    'about.title': '关于我',
    'about.subtitle': '硬件工程师 & 嵌入式系统专家',
    'about.description': '我是一名三年级电气工程学生，热衷于硬件设计和嵌入式系统。虽然AI正在改变软件开发，但硬件仍然独特地属于人类 - 需要物理直觉、动手技能和现实世界的问题解决能力。',
    'about.education': '教育背景',
    'about.education.year': '三年级电气工程',
    'about.education.focus': '重点：硬件设计与嵌入式系统',
    'about.education.gpa': 'GPA：[您的GPA]',
    'about.philosophy.title': '硬件哲学',
    'about.philosophy.quote': '虽然AI正在改变软件开发，但硬件仍然独特地属于人类 - 需要物理直觉、动手技能和现实世界的问题解决能力。',
    'about.whyHardware.title': '为什么选择硬件而非软件？',
    'about.whyHardware.reason1.title': '物理问题解决',
    'about.whyHardware.reason1.description': '需要动手专业知识的现实世界挑战',
    'about.whyHardware.reason2.title': 'AI抗性技能',
    'about.whyHardware.reason2.description': 'AI无法轻易复制的技能',
    'about.whyHardware.reason3.title': '不断增长的需求',
    'about.whyHardware.reason3.description': '物联网和嵌入式系统的高需求',
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
    'contact.sendMessage': '发送消息',
    'contact.name': '姓名',
    'contact.email': '邮箱',
    'contact.subject': '主题',
    'contact.message': '消息',
    'contact.namePlaceholder': '您的姓名',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subjectPlaceholder': '消息主题',
    'contact.messagePlaceholder': '您的消息...',
    'contact.send': '发送消息',
    'contact.sending': '发送中...',
    'contact.submittingStatus': '正在提交表单',
    'contact.sent': '消息已发送！',
    'contact.error': '发送消息时出错',
    'contact.nameRequired': '姓名是必填项',
    'contact.emailRequired': '邮箱是必填项',
    'contact.emailInvalid': '请输入有效的邮箱地址',
    'contact.subjectRequired': '主题是必填项',
    'contact.messageRequired': '消息是必填项',
    'contact.contactInfo': '联系信息',
    'contact.professionalLinks': '专业链接',
    'contact.githubAria': '访问我的GitHub个人资料（在新标签页中打开）',
    'contact.linkedinAria': '访问我的LinkedIn个人资料（在新标签页中打开）',
    'contact.downloadResume': '下载简历',
    'contact.resumeAria': '下载我的简历（PDF文件）',
    'contact.location': '位置',
    'contact.locationPlaceholder': '[您的城市，国家]',
    'contact.availability': '可接受机会',
    
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
    'home.viewProjectsAria': 'Voir tous les projets',
    'home.contactMeAria': 'Me contacter pour des opportunités',
    'home.featuredProjects': 'Projets Vedettes',
    'home.project1.title': 'Système de Cartographie 3D',
    'home.project1.description': 'Capteur de temps de vol avec contrôle de moteur pas à pas',
    'home.project1.ariaLabel': 'Voir les détails du projet de cartographie 3D',
    'home.project2.title': 'Voiture Bluetooth',
    'home.project2.description': 'Système de contrôle sans fil basé sur STM32',
    'home.project2.ariaLabel': 'Voir les détails du projet de voiture Bluetooth',
    'home.project3.title': 'Projet Drone',
    'home.project3.description': 'Système de contrôle de vol en développement',
    'home.project3.ariaLabel': 'Voir les détails du projet drone',
    
    // About page
    'about.title': 'À Propos de Moi',
    'about.subtitle': 'Ingénieur Matériel & Spécialiste des Systèmes Embarqués',
    'about.description': 'Je suis un étudiant en 3ème année d\'ingénierie électrique passionné par la conception matérielle et les systèmes embarqués. Bien que l\'IA transforme le développement logiciel, le matériel reste uniquement humain - nécessitant une intuition physique, des compétences pratiques et la résolution de problèmes du monde réel.',
    'about.education': 'Éducation',
    'about.education.year': '3ème Année d\'Ingénierie Électrique',
    'about.education.focus': 'Focus: Conception Matérielle & Systèmes Embarqués',
    'about.education.gpa': 'GPA: [Votre GPA]',
    'about.philosophy.title': 'Philosophie Matérielle',
    'about.philosophy.quote': 'Bien que l\'IA transforme le développement logiciel, le matériel reste uniquement humain - nécessitant une intuition physique, des compétences pratiques et la résolution de problèmes du monde réel.',
    'about.whyHardware.title': 'Pourquoi le Matériel plutôt que le Logiciel ?',
    'about.whyHardware.reason1.title': 'Résolution de Problèmes Physiques',
    'about.whyHardware.reason1.description': 'Défis du monde réel qui nécessitent une expertise pratique',
    'about.whyHardware.reason2.title': 'Compétences Résistantes à l\'IA',
    'about.whyHardware.reason2.description': 'Compétences que l\'IA ne peut pas facilement reproduire',
    'about.whyHardware.reason3.title': 'Demande Croissante',
    'about.whyHardware.reason3.description': 'Forte demande dans l\'IoT et les systèmes embarqués',
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
    'contact.sendMessage': 'Envoyer un Message',
    'contact.name': 'Nom',
    'contact.email': 'Email',
    'contact.subject': 'Sujet',
    'contact.message': 'Message',
    'contact.namePlaceholder': 'Votre Nom',
    'contact.emailPlaceholder': 'your.email@example.com',
    'contact.subjectPlaceholder': 'Sujet de votre message',
    'contact.messagePlaceholder': 'Votre message...',
    'contact.send': 'Envoyer le Message',
    'contact.sending': 'Envoi en cours...',
    'contact.submittingStatus': 'Le formulaire est en cours de soumission',
    'contact.sent': 'Message Envoyé !',
    'contact.error': 'Erreur lors de l\'envoi du message',
    'contact.nameRequired': 'Le nom est requis',
    'contact.emailRequired': 'L\'email est requis',
    'contact.emailInvalid': 'Veuillez entrer un email valide',
    'contact.subjectRequired': 'Le sujet est requis',
    'contact.messageRequired': 'Le message est requis',
    'contact.contactInfo': 'Informations de Contact',
    'contact.professionalLinks': 'Liens Professionnels',
    'contact.githubAria': 'Visiter mon profil GitHub (s\'ouvre dans un nouvel onglet)',
    'contact.linkedinAria': 'Visiter mon profil LinkedIn (s\'ouvre dans un nouvel onglet)',
    'contact.downloadResume': 'Télécharger le CV',
    'contact.resumeAria': 'Télécharger mon CV (fichier PDF)',
    'contact.location': 'Localisation',
    'contact.locationPlaceholder': '[Votre Ville, Pays]',
    'contact.availability': 'Disponible pour des opportunités',
    
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
    const translation = translations[language] as Record<string, string>;
    return translation[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}; 