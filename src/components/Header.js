import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/projects', label: 'Proyectos' },
  { path: '/contact', label: 'Contacto' }
];

// Iconos sociales con colores de marca
const socialLinks = [
  {
    icon: FaLinkedin,
    href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/',
    color: '#0A66C2' // Color de LinkedIn
  },
  {
    icon: FaGithub,
    href: 'https://github.com/IgnacioIbaigorria',
    color: '#FFFFFF' // Color de GitHub (blanco)
  },
  {
    icon: FaEnvelope,
    href: 'mailto:ignacioibaigorria@gmail.com',
    color: '#0284c7' // Cyan/Sky 600
  }
];

// Variantes de animación para el menú móvil
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren"
    }
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const mobileMenuItemVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 120 }
  }
};


// Componente para el botón de menú animado
const AnimatedMenuButton = ({ isOpen, onClick }) => {
  const barCommonStyles = "block w-6 h-0.5 bg-cyan-300 transition-all duration-300";

  return (
    <button
      className="fixed md:hidden top-4 right-4 w-10 h-10 z-[300] flex flex-col justify-center items-center gap-1.5"
      onClick={onClick}
      aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
    >
      <motion.span
        className={barCommonStyles}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
      <motion.span
        className={barCommonStyles}
        animate={{
          opacity: isOpen ? 0 : 1
        }}
        transition={{ duration: 0.1 }}
      />
      <motion.span
        className={barCommonStyles}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </button>
  );
};

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <AnimatedMenuButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Header principal */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full top-0 z-[45] bg-slate-950/80 backdrop-blur-xl border-b border-zinc-800 shadow-sm"
        style={{
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-8 py-3">
          {/* Logo con tu nombre */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="p-2 rounded-full bg-gradient-to-tr from-sky-600 to-sky-400 shadow-lg"
            >
              <FaCode className="text-xl md:text-2xl text-white" />
            </motion.div>
            <span className="text-xl md:text-2xl font-bold text-zinc-100 hidden sm:block">
              Ignacio Ibaigorria
            </span>
          </Link>

          {/* Navegación desktop */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ path, label }) => (
              <motion.div
                key={path}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.97 }}
                className="relative group"
              >
                <Link
                  to={path}
                  className={`text-lg font-medium px-2 py-1 transition-all duration-300
                    ${location.pathname === path ? 'text-sky-400' : 'text-zinc-400 hover:text-sky-400'}`}
                >
                  {label}
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

          {/* --- CORRECCIÓN AQUÍ --- */}
          {/* Íconos sociales desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {socialLinks.map((item, idx) => (
              <motion.a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  scale: 1.18,
                  y: -2,
                  color: item.color, // Color de marca en hover
                  filter: `drop-shadow(0 0 6px ${item.color})`,
                  transition: { duration: 0.2 } // Añade transición suave de framer-motion
                }}
                whileTap={{ scale: 0.92 }}
                className="text-2xl text-zinc-500 hover:text-sky-400"
              >
                <item.icon />
              </motion.a>
            ))}
          </div>
        </div>
      </motion.header >

      {/* Menú móvil mejorado */}
      < AnimatePresence >
        {isMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 bottom-0 w-64 bg-slate-950/95 backdrop-blur-xl
              flex flex-col items-center pt-24 px-4 border-l border-zinc-800 shadow-xl z-[200] md:hidden"
          >
            {/* Navegación móvil con animación 'stagger' */}
            <motion.nav
              className="flex flex-col items-center w-full space-y-6 p-4"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map(({ path, label }) => (
                <motion.div key={path} variants={mobileMenuItemVariants} className="w-full">
                  <Link
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-xl font-medium transition-all duration-300 w-full text-center py-2
                      ${location.pathname === path ? 'text-sky-400' : 'text-zinc-300 hover:text-sky-400'}`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* --- CORRECCIÓN AQUÍ (móvil) --- */}
            <div className="flex justify-center space-x-8 w-full p-4 mt-8 border-t border-cyan-700/30">
              {socialLinks.map((item, idx) => (
                <motion.a
                  key={idx}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.9 }}
                  whileHover={{
                    color: item.color,
                    filter: `drop-shadow(0 0 6px ${item.color})`,
                    transition: { duration: 0.2 }
                  }}
                  // --- SE ELIMINÓ "transition-colors" Y "duration-300" ---
                  className="text-2xl text-gray-500"
                >
                  <item.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        )
        }
      </AnimatePresence >
    </>
  );
};

export default Header;