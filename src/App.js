// import './portfolio-dark.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AnimatedBackground from './components/AnimatedBackground';

/* Envuelve cada página para animar su entrada/salida */
const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ duration: 0.35, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

/* Necesita estar dentro de <Router> para poder usar useLocation */
const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/projects" element={<PageTransition><Projects /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  useEffect(() => {
    const setVH = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);
    window.addEventListener('orientationchange', setVH);

    return () => {
      window.removeEventListener('resize', setVH);
      window.removeEventListener('orientationchange', setVH);
    };
  }, []);

  return (
    <Router>
      <div className="relative flex min-h-screen flex-col">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow relative z-[40] container mx-auto px-4 md:px-6 lg:px-8 py-8 pt-24 md:pt-28">
          <AnimatedRoutes />
        </main>
      </div>

      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#101416',
            color: '#E9EDED',
            border: '1px solid #232B2F',
            borderRadius: '3px',
            fontFamily: '"IBM Plex Sans", system-ui, sans-serif',
            fontSize: '0.875rem',
            maxWidth: 'min(340px, calc(100vw - 2rem))',
            boxShadow: '0 24px 48px -24px rgba(0, 0, 0, 0.9)',
          },
          success: { iconTheme: { primary: '#6FCF97', secondary: '#101416' } },
          error: { iconTheme: { primary: '#E3A94F', secondary: '#101416' } },
        }}
      />
    </Router>
  );
}

export default App;
