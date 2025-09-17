import React, { useState, useEffect, useRef } from 'react';
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

// Nuevo componente para las etiquetas de tecnologías
const TechTag = styled.span`
  padding: 0.375rem 0.75rem;
  background: rgba(8, 145, 178, 0.2);
  color: #7dd3fc;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.025em;
  border: 1px solid rgba(8, 145, 178, 0.4);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(8, 145, 178, 0.3);
    transform: translateY(-2px);
  }
`;

// Nuevo componente para los botones de navegación
const NavButton = styled(motion.button)`
  background: rgba(30, 41, 59, 0.8);
  color: white;
  border: none;
  border-radius: 9999px;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.15);
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    background: rgba(14, 165, 233, 0.8);
    box-shadow: 0 8px 25px rgba(14, 165, 233, 0.25);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Projects = () => {
  const [currentImageIndexes, setCurrentImageIndexes] = useState({});
  const [modalImages, setModalImages] = useState(null);
  const [currentModalImage, setCurrentModalImage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : true);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);


  // manejar intervalos sin mutar objects
  const hoverIntervalsRef = useRef({});
  useEffect(() => {
    return () => {
      // limpiar todos al desmontar
      Object.values(hoverIntervalsRef.current).forEach(id => clearInterval(id));
    };
  }, []);

  const onMouseEnterProject = (projectIndex, length) => {
    const id = setInterval(() => {
      setCurrentImageIndexes(prev => ({
        ...prev,
        [projectIndex]: ((prev[projectIndex] || 0) + 1) % length
      }));
    }, 3000);
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
      description: 'App para la empresa Servicold SAS, para la gestión de usuarios y sensores, compatible con iOS y Android.',
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
        ios: 'https://apps.apple.com/ar/app/servicold-app/id6751702418' // Reemplaza con tu URL real de App Store
      }
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
      title: 'Gestión App',
      description: 'App móvil de sistema avanzado de gestión para pequeñas y medianas empresas, con funcionalidades de inventario, ventas y análisis financiero. Incluye gestión de productos con etiquetas y categorías, actualización de precios por categoría, estadísticas de ventas, control de caja, y análisis de valor de inventario. Cuenta con tema oscuro/claro y soporte multiidioma.',
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

  const displayedProjects = isMobile ? projects : projects.slice(currentPage * projectsPerPage, (currentPage + 1) * projectsPerPage);

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
    <div className="relative p-4 max-w-7xl mx-auto">
      {/* Fondo animado mejorado */}
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#0a192f] via-[#112240] to-[#233554] opacity-80 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      
      {/* Título con animación mejorada */}
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-700 bg-clip-text text-transparent leading-relaxed py-1"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        Mis Proyectos
      </motion.h1>
      
      {/* Descripción breve */}
      <motion.p
        className="text-lg text-center text-gray-300 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Explora mi portafolio de proyectos destacados, desde aplicaciones móviles hasta sitios web y sistemas de gestión.
      </motion.p>
      
      {/* Grid de proyectos con animación mejorada */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedProjects.map((project, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            className="h-full flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:border-blue-500/30 border border-slate-700/50 backdrop-blur-sm bg-slate-800/40"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: projectIndex * 0.15, duration: 0.7 }}
          >
            {/* Imagen con galería mejorada */}
            <div 
              className="relative w-full h-56 overflow-hidden cursor-pointer group flex-shrink-0 rounded-xl mb-4"
              onClick={() => openImageModal(project.images)}
              onMouseEnter={() => onMouseEnterProject(projectIndex, project.images.length)}
              onMouseLeave={() => onMouseLeaveProject(projectIndex)}
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center">
                <p className="text-white text-sm mb-3 px-3 py-1 bg-cyan-700/50 backdrop-blur-sm rounded-full">
                  Click para ver galería ({project.images.length} imágenes)
                </p>
              </div>
            </div>
            
            {/* Contenido de la tarjeta mejorado */}
            <div className="flex flex-col flex-grow overflow-y-auto">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              
              {/* Etiquetas de tecnologías mejoradas */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <TechTag key={i}>
                    {tech}
                  </TechTag>
                ))}
              </div>
              
              {/* Enlaces mejorados */}
              <div className="flex flex-wrap gap-4 mt-auto pt-3 border-t border-[#233554]/60">
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                >
                  <FaGithub /> Código
                </a>
                
                {/* Mostrar enlace normal si existe */}
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
                
                {/* Mostrar enlaces a tiendas si existen */}
                {project.stores && (
                  <div className="flex gap-3">
                    {project.stores.android && (
                      <a 
                        href={project.stores.android} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                        title="Google Play"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3.609 1.814L13.792 12 3.609 22.186c-.181.181-.29.423-.29.684v.065c0 .36.186.687.491.873l.457.228c.306.153.661.153.967 0l10.384-5.192L3.6 1.814H3.61zm17.011 9.293l-3.827-2.209-3.142 3.102 3.142 3.102 3.827-2.209c.392-.226.589-.636.589-1.044s-.198-.816-.589-1.044v.002z"/>
                          <path d="M.306 1.071C.116 1.34 0 1.648 0 2v20c0 .352.116.66.306.929l11.434-10.857L.306 1.071z"/>
                          <path d="M15.992 14.184L13.298 12l-3.828 3.828 6.521 6.521c.15.15.339.247.551.247.212 0 .401-.098.551-.247.3-.3.3-.784 0-1.084l-1.101-1.101v.02z"/>
                        </svg>
                        Android
                      </a>
                    )}
                    {project.stores.ios && (
                      <a 
                        href={project.stores.ios} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                        title="App Store"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M16.289 3.713c1.69 0 3.434 1.847 3.434 3.434 0 0-.13 1.95-1.95 3.434-1.736 1.302-3.434 1.084-3.434 1.084s-.217-1.736 1.517-3.434c1.084-1.084 1.95-1.084 1.95-1.084s-1.517-3.434-1.517-3.434z"/>
                          <path d="M12.855 5.663c.65 0 2.6.217 4.334 1.95 0 0 1.517 1.517 1.517 4.334 0 2.6-1.95 4.334-1.95 4.334-.867 1.084-2.167 2.6-4.334 2.6-1.95 0-3.434-1.3-3.434-1.3s-1.95.433-3.434.433c-1.3 0-2.6-1.95-2.6-1.95-1.517-1.95-2.817-4.984-1.3-7.801.867-1.517 2.6-2.6 4.334-2.6 1.517 0 3.434 1.3 3.434 1.3s1.95-1.3 3.434-1.3z"/>
                        </svg>
                        iOS
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </ProjectCard>
        ))}
      </div>

      {/* Botones de navegación mejorados */}
      <div className="hidden md:block">
        {projects.length > projectsPerPage && (
          <>
            <NavButton 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`fixed left-4 top-1/2 -translate-y-1/2 z-10`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              ←
            </NavButton>
            <NavButton 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`fixed right-4 top-1/2 -translate-y-1/2 z-10`}
              onClick={handleNextPage}
              disabled={currentPage >= Math.floor((projects.length - 1) / projectsPerPage)}
            >
              →
            </NavButton>
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/70 px-4 py-2 rounded-full backdrop-blur-sm z-10">
              {Array.from({ length: Math.ceil(projects.length / projectsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentPage ? 'bg-cyan-400 scale-125' : 'bg-white/50 hover:bg-white/80'
                  }`}
                  onClick={() => setCurrentPage(index)}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modal de imágenes mejorado */}
      {modalImages && (
        <div 
          className="fixed inset-10 bg-black/90 backdrop-blur-md z-[999] flex items-center justify-center h-full"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-5xl w-full mx-4 h-[90vh] flex items-center"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-cyan-300 transition-colors z-[1000] bg-slate-800/70 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"
              onClick={closeImageModal}
            >
              ×
            </button>
            <motion.img 
              key={currentModalImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={modalImages[currentModalImage]} 
              alt="Project preview" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg shadow-2xl"
            />
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-slate-800/70 hover:bg-cyan-700/70 p-3 text-xl rounded-full transition-all duration-300 backdrop-blur-sm"
              onClick={prevImage}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-slate-800/70 hover:bg-cyan-700/70 p-3 text-xl rounded-full transition-all duration-300 backdrop-blur-sm"
              onClick={nextImage}
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-slate-800/70 px-4 py-2 rounded-full backdrop-blur-sm">
              {modalImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentModalImage ? 'bg-cyan-400 scale-125' : 'bg-white/50 hover:bg-white/80'
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
