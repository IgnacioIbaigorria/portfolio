import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Improved ProjectCard with glassmorphism and dark palette
const ProjectCard = styled(motion.div)`
  background: rgba(26, 35, 50, 0.92);
  backdrop-filter: blur(14px);
  border-radius: 1.25rem;
  padding: 1.5rem;
  border: 1.5px solid #233554;
  box-shadow: 0 8px 32px 0 rgba(56, 189, 248, 0.10);
  transition: all 0.4s cubic-bezier(.4,2,.6,1);
  display: flex;
  flex-direction: column;
  height: 500px; /* Fixed height for all cards */

  &:hover {
    transform: translateY(-10px) scale(1.025);
    box-shadow: 0 16px 40px 0 rgba(56, 189, 248, 0.18);
    border-color: #38bdf8;
  }
`;

const Projects = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = React.useState({});
  const [modalImages, setModalImages] = React.useState(null);
  const [currentModalImage, setCurrentModalImage] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const projectsPerPage = 3;

  const projects = [
    {
      title: 'Servicold Web',
      description: 'Sitio web para la empresa Servicold SAS, landing page y sistema de gestión de usuarios y sensores.',
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
      live: 'https://servicoldingenieria.com'
    },
    {
      title: 'Servicold App',
      description: 'App para la empresa Servicold SAS, para la gestión de usuarios y sensores.',
      images: [
        '/images/projects/servicold-app/servicold-app1.jpg',
        '/images/projects/servicold-app/servicold-app2.jpg',
        '/images/projects/servicold-app/servicold-app3.jpg',
        '/images/projects/servicold-app/servicold-app4.jpg',
        '/images/projects/servicold-app/servicold-app5.jpg',
        '/images/projects/servicold-app/servicold-app6.jpg',
        '/images/projects/servicold-app/servicold-app7.jpg',
      ],
      technologies: ['React Native', 'Expo', 'Firebase', 'TypeScript'],
      github: 'https://github.com/IgnacioIbaigorria/servicold-app',
      live: 'https://play.google.com/store/apps/details?id=com.ignacioivan00.servicoldApp&hl=es_419'
    },
    {
      title: 'Punto Eco Ecommerce',
      description: 'Ecommerce para la tienda Punto Eco, venta de productos eco-friendly de limpieza y cuidado personal.',
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
      live: ''
    },
    {
      title: 'Gestión de Stock',
      description: 'Sistema de gestión de stock para pequeños y medianos negocios, con interfaz gráfica y funcionalidades para gestión de inventario, ventas, caja y clientes.',
      images: [
        '/images/projects/gestion-stock/gestion-stock1.jpg',
        '/images/projects/gestion-stock/gestion-stock2.jpg',
        '/images/projects/gestion-stock/gestion-stock3.jpg',
        '/images/projects/gestion-stock/gestion-stock4.jpg',
      ],
      technologies: ['Python','PyQt6', 'SQLite'],
      github: 'https://github.com/IgnacioIbaigorria/gestion-stock',
      live: ''
    },
    {
      title: 'Gestión Punto Eco',
      description: 'Sistema avanzado de gestión para Punto Eco con funcionalidades de inventario, ventas y análisis financiero. Incluye gestión de productos con etiquetas y categorías, actualización de precios por categoría, estadísticas de ventas, control de caja, y análisis de valor de inventario. Cuenta con tema oscuro/claro y soporte multiidioma.',
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
      technologies: ['React Native', 'Node.js', 'Firebase Database', 'Chart.js', 'i18next', 'Tailwind CSS'],
      github: 'https://github.com/IgnacioIbaigorria/gestion-app',
      live: ''
    },
    {
      title: 'Projects Management',
      description: 'Plataforma de gestión de proyectos de diseño con sistema de roles (cliente, diseñador, project manager) que permite solicitar, asignar y entregar proyectos con gestión de archivos integrada.',
      images: [
        '/images/projects/design-management/design-management1.jpg',
        '/images/projects/design-management/design-management2.jpg',
        '/images/projects/design-management/design-management3.jpg',
        '/images/projects/design-management/design-management4.jpg',
        '/images/projects/design-management/design-management5.jpg',
        '/images/projects/design-management/design-management6.jpg',
        '/images/projects/design-management/design-management7.jpg',
      ],
      technologies: ['Next.js', 'TypeScript', 'Node.js', 'Supabase (PostgreSQL)', 'Tailwind CSS', 'Shadcn UI'],
      github: 'https://github.com/IgnacioIbaigorria/grayola',
      live: 'https://grayola-eta.vercel.app/'
    }
    // Más proyectos...
  ];

  // Determinar qué proyectos mostrar basado en el tamaño de pantalla
  const displayedProjects = window.innerWidth < 768 
    ? projects // Mostrar todos los proyectos en móvil
    : projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage); // Carrusel en desktop

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(Math.floor((projects.length - 1) / projectsPerPage), prev + 1));
  };

  const openImageModal = (images) => {
    setModalImages(images);
    setCurrentModalImage(0);
    document.body.style.overflow = 'hidden'; // Previene el scroll
  };

  const closeImageModal = () => {
    setModalImages(null);
    document.body.style.overflow = 'unset';
  };

  const nextImage = () => {
    setCurrentModalImage((prev) => (prev + 1) % modalImages.length);
  };

  const prevImage = () => {
    setCurrentModalImage((prev) => (prev - 1 + modalImages.length) % modalImages.length);
  };


  return (
    <div className="relative p-2 max-w-7xl mx-auto">
      {/* Fondo animado igual que Home.js */}
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#0a192f] via-[#112240] to-[#233554] opacity-80 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent leading-relaxed py-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mis Proyectos
      </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, projectIndex) => (
            <ProjectCard
              key={projectIndex}
              className="h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/30 border border-slate-700/50 backdrop-blur-sm bg-slate-800/40"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projectIndex * 0.1 }}
            >
              {/* Imagen con galería */}
              <div 
                className="relative w-full h-56 overflow-hidden cursor-pointer group flex-shrink-0 rounded-xl mb-4"
                onClick={() => openImageModal(project.images)}
                onMouseEnter={() => {
                  const interval = setInterval(() => {
                    setCurrentImageIndexes(prev => ({
                      ...prev,
                      [projectIndex]: ((prev[projectIndex] || 0) + 1) % project.images.length
                    }));
                  }, 3000);
                  project.intervalId = interval;
                }}
                onMouseLeave={() => {
                  if (project.intervalId) {
                    clearInterval(project.intervalId);
                  }
                  setCurrentImageIndexes(prev => ({
                    ...prev,
                    [projectIndex]: 0
                  }));
                }}
              >
                {project.images.map((image, imgIndex) => (
                  <img 
                    key={imgIndex}
                    src={image} 
                    alt={`${project.title} - imagen ${imgIndex + 1}`} 
                    className="absolute top-0 left-0 w-full h-56 object-cover transition-all duration-500 ease-in-out group-hover:scale-105"
                    style={{
                      opacity: (currentImageIndexes[projectIndex] || 0) === imgIndex ? 1 : 0,
                    }}
                  />
                ))}
                <div className="absolute h-auto inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                  <p className="text-white text-sm mb-2">Click para ver galería</p>
                </div>
              </div>
              {/* Card content starts here, outside the image container */}
              <div className="flex flex-col flex-grow overflow-y-auto">
                <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent">{project.title}</h2>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-cyan-700/20 text-cyan-200 rounded-full text-xs font-semibold tracking-wide border border-cyan-700/40"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 mt-auto pt-3 border-t border-[#233554]/60">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    <FaGithub /> Código
                  </a>
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                    >
                      <FaExternalLinkAlt /> Demo
                    </a>
                  )}
                </div>
              </div>
            </ProjectCard>
          ))}
      </div>

      {/* Navigation buttons and modal remain unchanged, but you can update their colors if you wish */}
      <div className="hidden md:block">
        {projects.length > projectsPerPage && (
          <>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`fixed left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-blue-500/80 p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                currentPage === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              ←
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`fixed right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-blue-500/80 p-4 rounded-full backdrop-blur-sm transition-all duration-300 ${
                currentPage >= Math.floor((projects.length - 1) / projectsPerPage) ? 'opacity-50 cursor-not-allowed' : 'opacity-100'
              }`}
              onClick={handleNextPage}
              disabled={currentPage >= Math.floor((projects.length - 1) / projectsPerPage)}
            >
              →
            </motion.button>
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage ? 'bg-blue-400 scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de imágenes */}
      {modalImages && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-[999] flex items-center justify-center h-full"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl w-full mx-4 h-[90vh] flex items-center"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-16 md:top-16 right-2 text-white text-3xl hover:text-gray-300 transition-colors z-[1000] bg-slate-800/50 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={closeImageModal}
            >
              ×
            </button>
            <motion.img 
              key={currentModalImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={modalImages[currentModalImage]} 
              alt="Project preview" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/70 p-3 text-xl rounded-full transition-all duration-300"
              onClick={prevImage}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/50 hover:bg-slate-700/70 p-3 text-xl rounded-full transition-all duration-300"
              onClick={nextImage}
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/50 px-4 py-2 rounded-full">
              {modalImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentModalImage ? 'bg-blue-400 scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setCurrentModalImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
