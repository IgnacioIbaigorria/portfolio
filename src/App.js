// import './portfolio-dark.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AnimatedBackground from './components/AnimatedBackground';

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
        <main className="relative z-10 mx-auto w-full max-w-shell flex-grow px-5 pb-24 pt-24 md:px-8 md:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
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
