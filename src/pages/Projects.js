import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-15px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
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
      github: 'https://github.com/IgnacioIbaigorria/ServiColdApp',
      live: ''
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
    <div className="relative p-4 md:p-8 max-w-7xl mx-auto">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Mis Proyectos
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProjects.map((project, projectIndex) => (
          <ProjectCard
            key={projectIndex}
            className="h-full flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: projectIndex * 0.1 }}
          >
            <div 
              className="relative w-full h-64 mb-4 overflow-hidden rounded-lg cursor-pointer"
              onClick={() => openImageModal(project.images)}
              onMouseEnter={() => {
                const interval = setInterval(() => {
                  setCurrentImageIndexes(prev => ({
                    ...prev,
                    [projectIndex]: ((prev[projectIndex] || 0) + 1) % project.images.length
                  }));
                }, 3000);
                // Guardar el ID del intervalo
                project.intervalId = interval;
              }}
              onMouseLeave={() => {
                // Limpiar el intervalo cuando el mouse sale
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
                  className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out"
                  style={{
                    opacity: (currentImageIndexes[projectIndex] || 0) === imgIndex ? 1 : 0,
                  }}
                />
              ))}
            </div>
            <div className="flex flex-col flex-grow">
              <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
              <p className="text-gray-300 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-green-500/20 rounded-full text-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4 mt-auto">
                <a href={project.github} className="flex items-center gap-2 hover:text-blue-400">
                  <FaGithub /> Código
                </a>
                <a href={project.live} className="flex items-center gap-2 hover:text-blue-400">
                  <FaExternalLinkAlt /> Demo
                </a>
              </div>
            </div>
          </ProjectCard>
        ))}
      </div>

      {/* Botones de navegación solo para desktop */}
      <div className="hidden md:block">
        {projects.length > projectsPerPage && (
          <>
            <button 
              className="fixed left-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700/80 p-4 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            >
              ←
            </button>
            <button 
              className="fixed right-4 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700/80 p-4 rounded-full backdrop-blur-sm transition-all duration-300"
              onClick={handleNextPage}
              disabled={currentPage >= Math.floor((projects.length - 1) / projectsPerPage)}
            >
              →
            </button>
          </>
        )}
      </div>

      {/* Modal de imágenes */}
      {modalImages && (
        <div 
          className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center h-full"
          onClick={closeImageModal}
        >
          <div 
            className="relative max-w-4xl w-full mx-4 h-[90vh] flex items-center"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-10"
              onClick={closeImageModal}
            >
              ×
            </button>
            <img 
              src={modalImages[currentModalImage]} 
              alt="Project preview" 
              className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-gray/10 hover:bg-white/40 p-2 text-xl rounded-full"
              onClick={prevImage}
            >
              ←
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray/10 hover:bg-white/40 p-2 text-xl rounded-full"
              onClick={nextImage}
            >
              →
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {modalImages.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentModalImage ? 'bg-white' : 'bg-white/50'
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