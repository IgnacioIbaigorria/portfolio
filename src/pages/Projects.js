import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChartLine, FaTimes, FaChevronLeft, FaChevronRight, FaApple } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';
import { getTechInfo } from '../utils/techData';

const CATEGORIES = ['Todos', 'Web', 'Móvil', 'Backend', 'Desktop'];

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [modalImages, setModalImages] = useState(null);
  const [currentModalImage, setCurrentModalImage] = useState(0);

  const hoverIntervalsRef = useRef({});
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      Object.values(hoverIntervalsRef.current).forEach(id => clearInterval(id));
    };
  }, []);

  const onMouseEnterProject = (projectIndex, length) => {
    if (length <= 1) return;
    const id = setInterval(() => {
      setCurrentImageIndexes(prev => ({
        ...prev,
        [projectIndex]: ((prev[projectIndex] || 0) + 1) % length
      }));
    }, 2000);
    hoverIntervalsRef.current[projectIndex] = id;
  };

  const onMouseLeaveProject = (projectIndex) => {
    const id = hoverIntervalsRef.current[projectIndex];
    if (id) {
      clearInterval(id);
      delete hoverIntervalsRef.current[projectIndex];
    }
    setCurrentImageIndexes(prev => ({ ...prev, [projectIndex]: 0 }));
  };

  const projects = [
    {
      title: 'TaskFlow',
      description: 'Plataforma colaborativa de gestión de tareas full-stack. Sincronización en tiempo real vía WebSockets, modo offline, autenticación biométrica y arquitectura basada en microservicios con Go.',
      images: [
        '/images/projects/taskflow/banner.png',
        '/images/projects/taskflow/taskflow1.jpeg',
        '/images/projects/taskflow/taskflow2.jpeg',
        '/images/projects/taskflow/taskflow3.jpeg',
        '/images/projects/taskflow/taskflow4.jpeg',
        '/images/projects/taskflow/taskflow5.jpeg',
        '/images/projects/taskflow/taskflow6.jpeg',
        '/images/projects/taskflow/taskflow7.jpeg',
      ],
      technologies: ['Go', 'Gin', 'PostgreSQL', 'Docker', 'React Native', 'Expo', 'WebSockets'],
      github: 'https://github.com/IgnacioIbaigorria/taskflow',
      live: '',
      categories: ['Móvil', 'Backend'],
      featured: true,
      metrics: [
        'Sincronización en tiempo real con latencia <100ms.',
        'Soporte offline completo con sincronización automática.',
      ]
    },
    {
      title: 'Servicold App',
      description: 'App para la empresa Servicold SAS — gestión de usuarios y sensores IoT en tiempo real, compatible con iOS y Android.',
      images: [
        '/images/projects/servicold-app/servicold_app1.jpg',
        '/images/projects/servicold-app/servicold_app2.jpg',
        '/images/projects/servicold-app/servicold_app3.jpg',
        '/images/projects/servicold-app/servicold_app4.jpg',
        '/images/projects/servicold-app/servicold_app5.jpg',
        '/images/projects/servicold-app/servicold-app7.jpg',
        '/images/projects/servicold-app/IMG_0006.PNG',
        '/images/projects/servicold-app/IMG_0007.PNG',
        '/images/projects/servicold-app/IMG_0008.PNG',
        '/images/projects/servicold-app/IMG_0009.PNG',
      ],
      technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
      github: 'https://github.com/IgnacioIbaigorria/servicold-app',
      stores: {
        android: 'https://play.google.com/store/apps/details?id=com.ignacioivan00.servicoldApp&hl=es_419',
        ios: 'https://apps.apple.com/ar/app/servicold-app/id6751702418'
      },
      categories: ['Móvil'],
      isLive: true,
      metrics: [
        'Publicada en Google Play y App Store.',
        'Aumento del 25% en ventas de sensores.',
      ]
    },
    {
      title: 'Servicold Web',
      description: 'Sitio web corporativo y sistema de gestión de sensores para Servicold SAS. Landing page + dashboard de administración.',
      images: [
        '/images/projects/servicold-web/servicold-web1.jpg',
        '/images/projects/servicold-web/servicold-web2.jpg',
        '/images/projects/servicold-web/servicold-web3.jpg',
        '/images/projects/servicold-web/servicold-web4.jpg',
        '/images/projects/servicold-web/servicold-web5.jpg',
        '/images/projects/servicold-web/servicold-web6.jpg',
        '/images/projects/servicold-web/servicold-web7.jpg',
      ],
      technologies: ['JavaScript', 'Bootstrap', 'PHP', 'phpMyAdmin'],
      github: 'https://github.com/IgnacioIbaigorria/ServiCold',
      live: 'https://servicoldingenieria.com',
      categories: ['Web'],
      isLive: true,
      metrics: [
        'Aumento del 25% en ventas de sensores.',
      ]
    },
    {
      title: 'Projects Management',
      description: 'Plataforma de gestión de proyectos de diseño con sistema de roles — cliente, diseñador, project manager — con gestión de archivos integrada.',
      images: [
        '/images/projects/design-management/design-management1.jpg',
        '/images/projects/design-management/design-management2.jpg',
        '/images/projects/design-management/design-management3.jpg',
        '/images/projects/design-management/design-management4.jpg',
        '/images/projects/design-management/design-management5.jpg',
        '/images/projects/design-management/design-management6.jpg',
        '/images/projects/design-management/design-management7.jpg',
      ],
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'Supabase', 'Tailwind CSS', 'Shadcn UI'],
      github: 'https://github.com/IgnacioIbaigorria/grayola',
      live: 'https://grayola-eta.vercel.app/',
      categories: ['Web'],
      isLive: true,
    },
    {
      title: 'Punto Eco Ecommerce',
      description: 'E-commerce completo para tienda eco-friendly: catálogo, carrito de compras y sistema de pagos. Optimización de base de datos y seguridad en endpoints.',
      images: [
        '/images/projects/punto-eco/punto-eco1.jpg',
        '/images/projects/punto-eco/punto-eco2.jpg',
        '/images/projects/punto-eco/punto-eco3.jpg',
        '/images/projects/punto-eco/punto-eco4.jpg',
        '/images/projects/punto-eco/punto-eco5.jpg',
        '/images/projects/punto-eco/punto-eco6.jpg',
        '/images/projects/punto-eco/punto-eco7.jpg',
        '/images/projects/punto-eco/punto-eco8.jpg',
      ],
      technologies: ['React', 'Tailwind CSS', 'Node.js', 'Next.js', 'PostgreSQL', 'Prisma'],
      github: 'https://github.com/IgnacioIbaigorria/PuntoEco',
      live: '',
      categories: ['Web'],
    },
    {
      title: 'Gestión App',
      description: 'App móvil de gestión para PyMEs: inventario, ventas, análisis financiero, generación de PDFs, control de caja y estadísticas. Tema oscuro/claro y multiidioma.',
      images: [
        '/images/projects/gestion-punto-eco/gestion-punto-eco1.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco2.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco3.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco4.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco5.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco6.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco7.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco8.jpg',
        '/images/projects/gestion-punto-eco/gestion-punto-eco9.jpg',
      ],
      technologies: ['React Native', 'Node.js', 'Firebase Database', 'Chart.js', 'i18next'],
      github: 'https://github.com/IgnacioIbaigorria/gestion-app',
      live: '',
      categories: ['Móvil'],
      metrics: [
        'Mejora del 20% en productividad y ventas.',
        'Ahorro significativo en generación de PDFs automáticos.',
      ]
    },
    {
      title: 'FaltaUno',
      description: 'API backend para organización de partidos de fútbol — creación, gestión y reserva de cupos con autenticación JWT y concurrencia controlada.',
      images: [
        '/images/projects/faltauno/faltauno1.jpg',
      ],
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker'],
      github: 'https://github.com/IgnacioIbaigorria/faltauno-api',
      live: '',
      categories: ['Backend'],
      metrics: [
        'API REST escalable con manejo de concurrencia.',
        'Autenticación segura con JWT.',
      ]
    },
    {
      title: 'Sistema de Gestión de Loterías',
      description: 'Aplicación full-stack para gestión de loterías: compra de números, control de usuarios, sistema de roles y lógica de validación con persistencia JPA/Hibernate.',
      images: [
        '/images/projects/loteria/loteria1.jpg',
      ],
      technologies: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL', 'JPA', 'Hibernate'],
      github: 'https://github.com/IgnacioIbaigorria/lottery',
      live: '',
      categories: ['Web', 'Backend'],
    },
    {
      title: 'Gestión de Stock',
      description: 'Sistema de escritorio para gestión de stock en PyMEs: inventario, ventas, caja y clientes. Interfaz gráfica nativa con PyQt6.',
      images: [
        '/images/projects/gestion-stock/gestion-stock1.jpg',
        '/images/projects/gestion-stock/gestion-stock2.jpg',
        '/images/projects/gestion-stock/gestion-stock3.jpg',
        '/images/projects/gestion-stock/gestion-stock4.jpg',
      ],
      technologies: ['Python', 'PyQt6', 'SQLite'],
      github: 'https://github.com/IgnacioIbaigorria/gestion-stock',
      live: '',
      categories: ['Desktop'],
      metrics: [
        'Mejora del 20% en productividad.',
        'Reducción del 30% en errores de registro.',
      ]
    },
  ];

  const filtered = activeFilter === 'Todos'
    ? projects
    : projects.filter(p => p.categories.includes(activeFilter));

  const openImageModal = (images) => {
    setModalImages(images);
    setCurrentModalImage(0);
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    setModalImages(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => setCurrentModalImage(prev => (prev + 1) % modalImages.length);
  const prevImage = () => setCurrentModalImage(prev => (prev - 1 + modalImages.length) % modalImages.length);

  // Handle keyboard navigation in modal
  useEffect(() => {
    const handleKey = (e) => {
      if (!modalImages) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeImageModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalImages, currentModalImage]);

  const featuredProject = filtered.find(p => p.featured);
  const regularProjects = filtered.filter(p => !p.featured || activeFilter !== 'Todos');

  return (
    <div className="relative p-4 max-w-7xl mx-auto">
      {/* Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/50 to-slate-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Header */}
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-3 text-center text-zinc-100 leading-relaxed py-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        Mis Proyectos
      </motion.h1>
      <motion.p
        className="text-lg text-center text-zinc-400 mb-8 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Desde APIs backend hasta apps móviles publicadas en stores — aquí están los proyectos que construí.
      </motion.p>

      {/* Filter tabs */}
      <motion.div
        className="flex flex-wrap justify-center gap-2 mb-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 border
              ${activeFilter === cat
                ? 'bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/20'
                : 'bg-zinc-900/60 text-zinc-400 border-zinc-700 hover:border-sky-500/50 hover:text-sky-400'
              }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeFilter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {/* Featured Project — full width */}
          {activeFilter === 'Todos' && featuredProject && (
            <FeaturedCard
              project={featuredProject}
              projectIndex={0}
              currentImageIndex={currentImageIndexes[0] || 0}
              onMouseEnter={() => onMouseEnterProject(0, featuredProject.images.length)}
              onMouseLeave={() => onMouseLeaveProject(0)}
              onOpenModal={() => openImageModal(featuredProject.images)}
            />
          )}

          {/* Regular grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
            {(activeFilter === 'Todos' ? regularProjects : filtered).map((project, idx) => {
              const projectIndex = activeFilter === 'Todos' ? idx + 1 : idx;
              return (
                <ProjectCard
                  key={project.title}
                  project={project}
                  projectIndex={projectIndex}
                  currentImageIndex={currentImageIndexes[projectIndex] || 0}
                  onMouseEnter={() => onMouseEnterProject(projectIndex, project.images.length)}
                  onMouseLeave={() => onMouseLeaveProject(projectIndex)}
                  onOpenModal={() => openImageModal(project.images)}
                  animDelay={idx * 0.08}
                />
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Image Modal */}
      <AnimatePresence>
        {modalImages && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[999] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="relative max-w-5xl w-full mx-4 flex items-center justify-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={e => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-white z-[1000] bg-slate-800/80 rounded-full w-10 h-10 flex items-center justify-center hover:bg-sky-600 transition-colors backdrop-blur-sm"
                onClick={closeImageModal}
              >
                <FaTimes />
              </button>

              <motion.img
                key={currentModalImage}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={modalImages[currentModalImage]}
                alt="Project preview"
                className="w-full h-auto max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />

              {modalImages.length > 1 && (
                <>
                  <button
                    className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-sky-600 p-3 text-xl rounded-full transition-all duration-300 backdrop-blur-sm text-white"
                    onClick={prevImage}
                  >
                    <FaChevronLeft />
                  </button>
                  <button
                    className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-sky-600 p-3 text-xl rounded-full transition-all duration-300 backdrop-blur-sm text-white"
                    onClick={nextImage}
                  >
                    <FaChevronRight />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/70 px-4 py-2 rounded-full backdrop-blur-sm">
                    {modalImages.map((_, index) => (
                      <button
                        key={index}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentModalImage ? 'bg-sky-400 scale-125' : 'bg-white/40 hover:bg-white/70'}`}
                        onClick={() => setCurrentModalImage(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ── Featured Card ── */
const FeaturedCard = ({ project, projectIndex, currentImageIndex, onMouseEnter, onMouseLeave, onOpenModal }) => (
  <motion.div
    className="relative rounded-2xl overflow-hidden border border-zinc-700 bg-zinc-900/60 backdrop-blur-sm mb-2 group"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    style={{ boxShadow: '0 0 40px rgba(14,165,233,0.06)' }}
  >
    {/* Featured badge */}
    <div className="absolute top-4 left-4 z-20 flex gap-2">
      <span className="bg-gradient-to-r from-sky-500 to-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
        ⭐ Destacado
      </span>
    </div>

    <div className="grid md:grid-cols-2 gap-0">
      {/* Image side */}
      <div
        className="relative h-64 md:h-full min-h-[280px] cursor-pointer overflow-hidden"
        onClick={onOpenModal}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {project.images.map((image, imgIndex) => (
          <img
            key={imgIndex}
            src={image}
            alt={`${project.title} - ${imgIndex + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
            style={{ opacity: currentImageIndex === imgIndex ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-zinc-900/60 opacity-0 md:opacity-100" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
          <p className="text-white text-sm mb-3 px-3 py-1 bg-sky-600/50 backdrop-blur-sm rounded-full">
            Ver galería ({project.images.length} imágenes)
          </p>
        </div>
      </div>

      {/* Content side */}
      <div className="p-8 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-3 text-zinc-100">{project.title}</h2>
          <p className="text-zinc-400 text-base leading-relaxed mb-5">{project.description}</p>

          {project.metrics && (
            <div className="mb-5 p-4 bg-sky-950/30 border border-sky-800/30 rounded-xl">
              <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                <FaChartLine /> Impacto
              </h4>
              <ul className="space-y-1.5">
                {project.metrics.map((m, i) => (
                  <li key={i} className="flex items-start gap-2 text-zinc-300 text-sm">
                    <span className="text-sky-400 mt-0.5">›</span> {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2 mb-6">
            <TechBadges technologies={project.technologies} />
          </div>
        </div>

        <ProjectLinks project={project} />
      </div>
    </div>
  </motion.div>
);

/* ── Regular Project Card ── */
const ProjectCard = ({ project, projectIndex, currentImageIndex, onMouseEnter, onMouseLeave, onOpenModal, animDelay }) => (
  <motion.div
    className="flex flex-col rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900/60 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-sky-500/40 hover:shadow-xl hover:shadow-sky-900/10"
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: animDelay, duration: 0.6 }}
  >
    {/* Image */}
    <div
      className="relative w-full h-52 overflow-hidden cursor-pointer group flex-shrink-0"
      onClick={onOpenModal}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {project.images.map((image, imgIndex) => (
        <img
          key={imgIndex}
          src={image}
          alt={`${project.title} - ${imgIndex + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
          style={{ opacity: currentImageIndex === imgIndex ? 1 : 0 }}
        />
      ))}
      {/* Badges overlay */}
      <div className="absolute top-3 left-3 flex gap-2 z-10">
        {project.isLive && (
          <span className="bg-emerald-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
            En producción
          </span>
        )}
        {project.stores && (
          <span className="bg-sky-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm">
            En stores
          </span>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
        <p className="text-white text-xs mb-3 px-3 py-1 bg-sky-600/50 backdrop-blur-sm rounded-full">
          {project.images.length > 1 ? `Ver galería (${project.images.length} imgs)` : 'Ver imagen'}
        </p>
      </div>
    </div>

    {/* Content */}
    <div className="flex flex-col flex-grow p-5">
      <h2 className="text-xl font-bold mb-2 text-zinc-100">{project.title}</h2>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4 flex-grow">{project.description}</p>

      {project.metrics && (
        <div className="mb-4 p-3 bg-sky-950/20 border border-sky-900/30 rounded-lg">
          <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <FaChartLine className="w-3 h-3" /> Impacto
          </h4>
          <ul className="space-y-1">
            {project.metrics.map((m, i) => (
              <li key={i} className="flex items-start gap-1.5 text-zinc-400 text-xs">
                <span className="text-sky-500 mt-0.5 flex-shrink-0">›</span> {m}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex flex-wrap gap-1.5 mb-4">
        <TechBadges technologies={project.technologies} small />
      </div>

      <div className="pt-3 border-t border-zinc-800">
        <ProjectLinks project={project} small />
      </div>
    </div>
  </motion.div>
);

/* ── Tech Badges ── */
const TechBadges = ({ technologies, small }) =>
  technologies.map((techName, i) => {
    const tech = getTechInfo(techName);
    return (
      <span
        key={i}
        className={`bg-zinc-800/80 text-zinc-300 font-medium rounded-full border border-zinc-700/60 flex items-center gap-1.5 ${small ? 'text-xs px-2 py-1' : 'text-xs px-2.5 py-1.5'}`}
      >
        {tech.icon && (
          <span className="text-base flex-shrink-0" style={{ color: tech.color }}>
            {tech.icon}
          </span>
        )}
        {tech.name}
      </span>
    );
  });

/* ── Project Links ── */
const ProjectLinks = ({ project, small }) => (
  <div className={`flex flex-wrap gap-3 ${small ? 'text-sm' : ''}`}>
    {project.github && (
      <a
        href={project.github}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition-colors duration-200 font-medium"
      >
        <FaGithub /> Código
      </a>
    )}
    {project.live && (
      <a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors duration-200 font-medium"
      >
        <FaExternalLinkAlt className="text-xs" /> Demo live
      </a>
    )}
    {project.stores?.android && (
      <a
        href={project.stores.android}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition-colors duration-200 font-medium"
      >
        <SiGoogleplay /> Android
      </a>
    )}
    {project.stores?.ios && (
      <a
        href={project.stores.ios}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-zinc-400 hover:text-sky-400 transition-colors duration-200 font-medium"
      >
        <FaApple /> iOS
      </a>
    )}
  </div>
);

export default Projects;