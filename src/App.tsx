import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import SkipToContent from './components/SkipToContent';
import CircuitBackground from './components/CircuitBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import TailwindTest from './pages/TailwindTest';
import PageTransition from './components/PageTransition';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tailwind-test" element={<TailwindTest />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <CircuitBackground />
            <SkipToContent />
            <Navbar />
            <AnimatedRoutes />
          </div>
        </Router>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
