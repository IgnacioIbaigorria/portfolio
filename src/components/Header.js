import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope, FaCode } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button 
        className="fixed md:hidden top-4 right-4 text-2xl z-[300] text-white hover:text-blue-400 transition-colors duration-300"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        style={{ color: 'white' }}
      >
        {isMenuOpen ? '✕' : '☰'}
      </button>

      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed w-full top-0 z-[45] bg-gradient-to-r from-[#020617]/95 to-[#0f172a]/95 backdrop-blur-md text-white p-4 md:p-6 flex justify-around items-center h-auto md:h-22 shadow-xl border-b border-blue-900/30"
      >
        {/* Logo */}
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.3 }}
        >
          <FaCode className="text-[2rem] md:text-[2.5rem] text-blue-400 hover:text-blue-300" />
        </motion.div>

        {/* Navegación desktop */}
        <nav className="hidden md:flex items-center space-x-10">
          {['/', '/projects', '/contact'].map((path) => (
            <motion.div
              key={path}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to={path} 
                className={`text-[1.5rem] font-medium transition-all duration-300 relative group
                  ${location.pathname === path ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                {path === '/' ? 'Inicio' : path === '/projects' ? 'Proyectos' : 'Contacto'}
                <span 
                  className={`absolute -bottom-1 left-0 h-0.5 bg-blue-400 transition-all duration-300
                    ${location.pathname === path ? 'w-full' : 'w-0 group-hover:w-full'}`}
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Íconos sociales desktop */}
        <div className="hidden md:flex space-x-8">
          {[
            { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/' },
            { icon: FaGithub, href: 'https://github.com/IgnacioIbaigorria' },
            { icon: FaEnvelope, href: 'mailto:ignacioibaigorria@gmail.com' }
          ].map((item, index) => (
            <motion.a
              key={index}
              whileHover={{ scale: 1.2, y: -2 }}
              whileTap={{ scale: 0.9 }}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[1.5rem] md:text-[2rem] hover:text-blue-400 transition-colors duration-300"
            >
              <item.icon />
            </motion.a>
          ))}
        </div>
      </motion.header>

      {/* Menú móvil */}
      {isMenuOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed top-0 right-0 bottom-0 w-64 bg-slate-900/95 
            flex flex-col items-center pt-20 px-4 
            border-l border-blue-900/30 shadow-xl z-[200] md:hidden"
        >
          {/* Enlaces de navegación móvil */}
          <nav className="flex flex-col items-center w-full space-y-6 p-4 bg-slate-900">
            {['/', '/projects', '/contact'].map((path) => (
              <Link 
                key={path}
                to={path} 
                onClick={() => setIsMenuOpen(false)}
                className={`text-lg font-medium transition-all duration-300 w-full text-center py-2
                  ${location.pathname === path ? 'text-blue-400' : 'text-white hover:text-blue-400'}`}
              >
                {path === '/' ? 'Inicio' : path === '/projects' ? 'Proyectos' : 'Contacto'}
              </Link>
            ))}
          </nav>

          {/* Redes sociales en menú móvil */}
          <div className="flex justify-center space-x-8 w-full bg-slate-900 p-4">
            {[
              { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/' },
              { icon: FaGithub, href: 'https://github.com/IgnacioIbaigorria' },
              { icon: FaEnvelope, href: 'mailto:ignacioibaigorria@gmail.com' }
            ].map((item, index) => (
              <motion.a
                key={index}
                whileTap={{ scale: 0.9 }}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-blue-400 transition-colors duration-300"
              >
                <item.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Header;