import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "David Wang - Hardware Engineer | Embedded Systems Specialist | Hamilton, ON",
  description = "Hardware engineer specializing in STM32, PCB design, and embedded systems. View my 3D mapping system, Bluetooth car, and drone projects. Based in Hamilton, Ontario.",
  keywords = "hardware engineer, embedded systems, STM32, PCB design, electrical engineering, Hamilton, Ontario, Canada",
  image = "https://ddwang.org/images/3d-mapping-prototype.png",
  url = "https://ddwang.org"
}: SEOProps) => {
  const location = useLocation();

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.name = name;
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Update primary meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);

    // Update Open Graph tags
    updatePropertyTag('og:title', title);
    updatePropertyTag('og:description', description);
    updatePropertyTag('og:image', image);
    updatePropertyTag('og:url', url + location.pathname);

    // Update Twitter tags
    updatePropertyTag('twitter:title', title);
    updatePropertyTag('twitter:description', description);
    updatePropertyTag('twitter:image', image);
    updatePropertyTag('twitter:url', url + location.pathname);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url + location.pathname;

    // Track page view in Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'G-GMTM749PNG', {
        page_title: title,
        page_location: url + location.pathname
      });
    }
  }, [title, description, keywords, image, url, location.pathname]);

  return null; // This component doesn't render anything
};

export default SEO;
