import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/projects', label: 'Proyectos' },
  { path: '/contact', label: 'Contacto' }
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/' },
  { icon: FaGithub, href: 'https://github.com/IgnacioIbaigorria' },
  { icon: FaEnvelope, href: 'mailto:ignacioibaigorria@gmail.com' }
];

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Botón menú móvil mejorado */}
      <button
        className="fixed md:hidden top-2 right-2 text-xl z-[300] text-cyan-300 hover:text-cyan-400 transition-colors duration-300"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Abrir menú"
      >
        <motion.span
          initial={false}
          animate={isMenuOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {isMenuOpen ? '✕' : '☰'}
        </motion.span>
      </button>

      {/* Header principal */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full top-0 z-[45] bg-[#0a192f]/80 backdrop-blur-xl border-b border-cyan-700/30 shadow-lg"
        style={{
          boxShadow: '0 4px 32px 0 rgba(56,189,248,0.10)'
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3 md:py-4">
          {/* Logo con texto y gradiente */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="p-2 rounded-full bg-gradient-to-tr from-cyan-700 to-cyan-400 shadow-lg"
            >
              <FaCode className="text-2xl md:text-3xl text-white group-hover:text-cyan-100 transition-colors" />
            </motion.div>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ path, label }) => (
              <motion.div
                key={path}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="relative"
              >
                <Link
                  to={path}
                  className={`text-2xl font-medium px-2 py-1 transition-all duration-300
                    ${location.pathname === path ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
                >
                  {label}
                  {/* Subrayado animado */}
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-cyan-400 to-cyan-700 rounded-full transition-all duration-300
                      ${location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                    style={{
                      transitionProperty: 'width'
                    }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Íconos sociales desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {socialLinks.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.18, y: -2, color: "#22d3ee", filter: "drop-shadow(0 0 6px #22d3ee)" }}
                whileTap={{ scale: 0.92 }}
                className="text-2xl text-cyan-200 hover:text-cyan-400 transition-colors duration-300"
              >
                <item.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.header>

      {/* Menú móvil mejorado */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-[#0a192f]/95 backdrop-blur-xl
              flex flex-col items-center pt-20 px-4 border-l border-cyan-700/30 shadow-xl z-[200] md:hidden"
          >
            {/* Navegación móvil */}
            <nav className="flex flex-col items-center w-full space-y-6 p-4">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-lg font-medium transition-all duration-300 w-full text-center py-2
                    ${location.pathname === path ? 'text-cyan-400' : 'text-white hover:text-cyan-400'}`}
                >
                  {label}
                </Link>
              ))}
            </nav>
            {/* Redes sociales móvil */}
            <div className="flex justify-center space-x-8 w-full p-4">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{ color: "#22d3ee", filter: "drop-shadow(0 0 6px #22d3ee)" }}
                  className="text-2xl text-cyan-200 hover:text-cyan-400 transition-colors duration-300"
                >
                  <item.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;