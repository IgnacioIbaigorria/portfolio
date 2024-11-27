import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  useEffect(() => {
    // Ajusta la altura del viewport en dispositivos móviles
    const setVH = () => {
      let vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVH();
    window.addEventListener('resize', setVH);

    return () => window.removeEventListener('resize', setVH);
  }, []);

  return (
    <Router>
      <div className="relative overflow-hidden" style={{ minHeight: 'calc(var(--vh, 1vh) * 100)' }}>
        <AnimatedBackground />
        <Header />
        <main className="relative z-[40] container mx-auto px-4 md:px-6 lg:px-8 py-8 pt-24 md:pt-28">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;