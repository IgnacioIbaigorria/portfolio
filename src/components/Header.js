import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useFocusTrap } from '../utils/useFocusTrap';

const navLinks = [
  { path: '/', label: 'Inicio' },
  { path: '/projects', label: 'Proyectos' },
  { path: '/contact', label: 'Contacto' },
];

const socialLinks = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/IgnacioIbaigorria', label: 'GitHub' },
  { icon: FaEnvelope, href: 'mailto:ignacioibaigorria@gmail.com', label: 'Email' },
];

/** A schematic corner mark: hairline frame, diagonal, one signal dot. */
const Mark = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true" className="shrink-0">
    <rect x="0.5" y="0.5" width="21" height="21" stroke="#232B2F" />
    <path d="M0.5 15.5 L15.5 0.5" stroke="#232B2F" />
    <circle cx="16" cy="16" r="2.5" fill="#E3A94F" />
  </svg>
);

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);
  const reduce = useReducedMotion();

  useFocusTrap(isMenuOpen, panelRef);

  // Close the drawer on navigation.
  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  // Rotating a phone or resizing past the breakpoint hides the drawer, but the
  // state (and the body scroll lock) would survive and leave the page unscrollable.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e) => {
      if (e.matches) setIsMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Escape closes, and the page behind it must not scroll.
  useEffect(() => {
    if (!isMenuOpen) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        buttonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const panelMotion = reduce
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { x: '100%' },
        animate: { x: 0 },
        exit: { x: '100%' },
        transition: { type: 'spring', stiffness: 320, damping: 34 },
      };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
        className="fixed right-5 top-5 z-[60] flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
      >
        <span
          className="block h-px w-6 bg-frost transition-transform duration-300 ease-out"
          style={{ transform: isMenuOpen ? 'translateY(3px) rotate(45deg)' : 'none' }}
        />
        <span
          className="block h-px w-6 transition-opacity duration-200"
          style={{ background: isMenuOpen ? '#E3A94F' : '#E9EDED', opacity: isMenuOpen ? 0 : 1 }}
        />
        <span
          className="block h-px w-6 bg-frost transition-transform duration-300 ease-out"
          style={{ transform: isMenuOpen ? 'translateY(-3px) rotate(-45deg)' : 'none' }}
        />
      </button>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-shell items-center justify-between gap-6 px-5 md:px-8">
          <Link to="/" className="group flex items-center gap-3" aria-label="Ignacio Ibaigorria — inicio">
            <Mark />
            <span className="text-[0.9375rem] font-medium tracking-tight text-frost transition-colors duration-300 group-hover:text-signal">
              Ignacio Ibaigorria
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
            {navLinks.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className="link text-small"
                data-active={location.pathname === path}
                aria-current={location.pathname === path ? 'page' : undefined}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="text-muted transition-colors duration-300 hover:text-signal"
              >
                <Icon aria-hidden="true" />
              </a>
            ))}
            <span className="flex items-center gap-2 border-l border-line pl-5 font-mono text-micro uppercase tracking-[0.14em] text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-live" />
              Disponible
            </span>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            {...panelMotion}
            ref={panelRef}
            className="fixed inset-y-0 right-0 z-[55] flex w-72 flex-col border-l border-line bg-ink px-8 pb-10 pt-28 md:hidden"
          >
            <nav className="flex flex-col" aria-label="Navegación principal">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  className={`border-b border-line py-5 text-title transition-colors duration-300 ${
                    location.pathname === path ? 'text-signal' : 'text-frost'
                  }`}
                  aria-current={location.pathname === path ? 'page' : undefined}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pt-10">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-3 text-small text-muted transition-colors duration-300 hover:text-signal"
                >
                  <Icon aria-hidden="true" className="text-signal" />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
