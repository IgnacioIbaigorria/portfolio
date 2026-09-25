import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaApple, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { SiGoogleplay } from 'react-icons/si';
import { AnimatePresence, motion } from 'framer-motion';
import { getTechInfo } from '../utils/techData';
import { useFocusTrap } from '../utils/useFocusTrap';
import { Wipe, Blur } from '../components/Reveal';

const CATEGORIES = ['Todos', 'Web', 'Móvil', 'Backend', 'Desktop'];

const projects = [
  {
    title: 'TaskFlow',
    description:
      'Plataforma colaborativa de gestión de tareas full-stack. Sincronización en tiempo real vía WebSockets, modo offline, autenticación biométrica y arquitectura basada en microservicios con Go.',
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
    technologies: ['Go', 'Gin', 'PostgreSQL', 'Docker', 'React Native', 'Expo'],
    github: 'https://github.com/IgnacioIbaigorria/taskflow',
    live: '',
    categories: ['Móvil', 'Backend'],
    featured: true,
    metrics: ['Sincronización en tiempo real con latencia por debajo de 100 ms.', 'Soporte offline completo con sincronización automática.'],
  },
  {
    title: 'Servicold App',
    description:
      'App móvil para monitoreo remoto de sensores IoT de temperatura y combustible. Datos en tiempo real, históricos con gráficos, reportes en Excel, alertas push y acceso por niveles de suscripción.',
    images: [
      '/images/projects/servicold-app/servicold_app1.jpeg',
      '/images/projects/servicold-app/servicold_app2.jpeg',
      '/images/projects/servicold-app/servicold_app3.jpeg',
      '/images/projects/servicold-app/servicold_app4.jpeg',
      '/images/projects/servicold-app/servicold_app5.jpeg',
      '/images/projects/servicold-app/servicold_app6.jpeg',
      '/images/projects/servicold-app/servicold_app7.jpeg',
    ],
    technologies: ['React Native', 'Expo', 'TypeScript', 'PHP', 'MySQL', 'Arduino'],
    github: 'https://github.com/IgnacioIbaigorria/servicold-app',
    stores: {
      android: 'https://play.google.com/store/apps/details?id=com.ignacioivan00.servicoldApp&hl=es_419',
      ios: 'https://apps.apple.com/ar/app/servicold-app/id6751702418',
    },
    categories: ['Móvil'],
    isLive: true,
    metrics: ['Publicada en Google Play y App Store.', 'Alertas push, gráficos históricos y exportación a Excel.', 'Aumento del 25% en ventas de sensores para el cliente.'],
  },
  {
    title: 'Servicold Web',
    description:
      'Dashboard web de monitoreo de sensores IoT y sitio corporativo para Servicold SAS. Gráficos en tiempo real, descarga de históricos en Excel y gestión de sensores y usuarios.',
    images: [
      '/images/projects/servicold-web/servicold-web1.jpg',
      '/images/projects/servicold-web/servicold-web2.jpg',
      '/images/projects/servicold-web/servicold-web3.jpg',
      '/images/projects/servicold-web/servicold-web4.jpg',
      '/images/projects/servicold-web/servicold-web5.jpg',
      '/images/projects/servicold-web/servicold-web6.jpg',
      '/images/projects/servicold-web/servicold-web7.jpg',
    ],
    technologies: ['JavaScript', 'Bootstrap', 'PHP', 'MySQL', 'Hostinger'],
    github: 'https://github.com/IgnacioIbaigorria/ServiCold',
    live: 'https://servicoldingenieria.com',
    categories: ['Web'],
    isLive: true,
    metrics: ['Dashboard compartido con la app móvil sobre la misma API.', 'Exportación de históricos a Excel por rango de fechas.', 'Aumento del 25% en ventas de sensores.'],
  },
  {
    title: 'Projects Management',
    description:
      'Gestión de proyectos de diseño con roles diferenciados — cliente, diseñador y project manager — y manejo de archivos integrado en el mismo lugar.',
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
    title: 'Punto Eco',
    description:
      'E-commerce completo para una tienda eco-friendly: catálogo, carrito de compras, sistema de pagos, optimización de base de datos y endurecimiento de endpoints.',
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
    description:
      'App móvil de gestión para PyMEs: inventario, ventas, análisis financiero, generación de PDFs, control de caja y estadísticas. Con tema oscuro y claro, y multiidioma.',
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
    metrics: ['Mejora del 20% en productividad y ventas.', 'Ahorro importante con generación automática de PDFs.'],
  },
  {
    title: 'FaltaUno',
    description:
      'API backend para organizar partidos de fútbol: creación de eventos, gestión de cupos y reservas, con autenticación JWT y control de concurrencia.',
    images: ['/images/projects/faltauno/faltauno1.jpg'],
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'JWT', 'Docker'],
    github: 'https://github.com/IgnacioIbaigorria/faltauno-api',
    live: '',
    categories: ['Backend'],
    metrics: ['API REST escalable con manejo de concurrencia.', 'Autenticación segura con JWT.'],
  },
  {
    title: 'Sistema de gestión de loterías',
    description:
      'Aplicación full-stack para loterías: compra de números, control de usuarios, sistema de roles y lógica de validación con persistencia JPA e Hibernate.',
    images: ['/images/projects/loteria/loteria1.jpg'],
    technologies: ['Java', 'Spring Boot', 'Next.js', 'PostgreSQL', 'JPA', 'Hibernate'],
    github: 'https://github.com/IgnacioIbaigorria/lottery',
    live: '',
    categories: ['Web', 'Backend'],
  },
  {
    title: 'Gestión de stock',
    description:
      'Sistema de escritorio para PyMEs: inventario, ventas, caja y clientes con interfaz gráfica nativa de escritorio.',
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
    metrics: ['Mejora del 20% en productividad.', 'Reducción del 30% en errores de registro.'],
  },
];

/* ─── Small parts ──────────────────────────────────────────────────── */

const TechList = ({ technologies }) => (
  <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
    {technologies.map((name) => {
      const tech = getTechInfo(name);
      return (
        <li key={name} className="flex items-center gap-1.5 font-mono text-[0.75rem] text-muted">
          {tech.icon && (
            <span className="text-[0.85rem] leading-none" style={{ color: tech.color }} aria-hidden="true">
              {tech.icon}
            </span>
          )}
          {tech.name}
        </li>
      );
    })}
  </ul>
);

const ProjectLinks = ({ project, onOpenGallery }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
    {project.github && (
      <a href={project.github} target="_blank" rel="noopener noreferrer" className="link flex items-center gap-1.5 font-mono text-[0.75rem]">
        <FaGithub aria-hidden="true" /> Código
      </a>
    )}
    {project.live && (
      <a href={project.live} target="_blank" rel="noopener noreferrer" className="link flex items-center gap-1.5 font-mono text-[0.75rem]">
        <FaExternalLinkAlt aria-hidden="true" /> Demo
      </a>
    )}
    {project.stores?.android && (
      <a href={project.stores.android} target="_blank" rel="noopener noreferrer" className="link flex items-center gap-1.5 font-mono text-[0.75rem]">
        <SiGoogleplay aria-hidden="true" /> Android
      </a>
    )}
    {project.stores?.ios && (
      <a href={project.stores.ios} target="_blank" rel="noopener noreferrer" className="link flex items-center gap-1.5 font-mono text-[0.75rem]">
        <FaApple aria-hidden="true" /> iOS
      </a>
    )}
    <button type="button" onClick={onOpenGallery} className="link font-mono text-[0.75rem] text-signal">
      {project.images.length > 1 ? `Galería (${project.images.length})` : 'Ver imagen'}
    </button>
  </div>
);

/* ─── Page ─────────────────────────────────────────────────────────── */

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [hovered, setHovered] = useState(null);
  const [gallery, setGallery] = useState(null); // { title, images, index }
  const galleryRef = useRef(null);

  useFocusTrap(Boolean(gallery), galleryRef);

  const filtered = activeFilter === 'Todos' ? projects : projects.filter((p) => p.categories.includes(activeFilter));
  // Look inside `filtered`, not `projects`, so the preview can never show a
  // project the active filter has just hidden.
  const preview = filtered.find((p) => p.title === hovered) || filtered[0] || projects[0];

  const openGallery = (project) => setGallery({ title: project.title, images: project.images, index: 0 });
  const closeGallery = () => setGallery(null);
  const step = (delta) =>
    setGallery((prev) => (prev ? { ...prev, index: (prev.index + delta + prev.images.length) % prev.images.length } : prev));

  useEffect(() => {
    if (!gallery) return undefined;

    const onKey = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gallery]);

  return (
    <div>
      {/* ── Page head ───────────────────────────────────────────────── */}
      <header className="border-t border-line pt-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <Wipe>
            <h1 className="font-display text-headline text-frost">Proyectos</h1>
          </Wipe>
          <span className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
            {filtered.length} {filtered.length === 1 ? 'proyecto' : 'proyectos'}
          </span>
        </div>
        <Blur className="mt-6 max-w-measure">
          <p className="text-lead text-muted">
            De APIs backend a apps publicadas en las stores. Todos con código, y la mayoría con
            números de lo que cambió después de entregarlos.
          </p>
        </Blur>
      </header>

      {/* ── Filters ─────────────────────────────────────────────────── */}
      {/* On phones the five tabs are wider than the screen: they scroll sideways
          rather than wrap, because a wrapped row would strand the active tab's
          underline in the middle of the block. */}
      <div className="no-scrollbar -mx-5 mt-10 flex items-center gap-x-1 overflow-x-auto border-b border-line px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
        {CATEGORIES.map((cat) => {
          const isActive = activeFilter === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              aria-pressed={isActive}
              className={`relative -mb-px shrink-0 whitespace-nowrap border-b-2 px-4 py-3 text-small transition-colors duration-300 ${isActive
                  ? 'border-signal text-frost'
                  : 'border-transparent text-muted hover:border-line hover:text-frost'
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── Index + preview ─────────────────────────────────────────── */}
      <div className="mt-2 grid grid-cols-12 gap-x-10">
        <ul className="col-span-12 lg:col-span-7 xl:col-span-8">
          {filtered.map((project) => {
            const isPreview = preview?.title === project.title;
            return (
              <li
                key={project.title}
                onMouseEnter={() => setHovered(project.title)}
                onMouseLeave={() => setHovered(null)}
                className="group relative border-b border-line"
              >
                <span
                  className={`absolute left-0 top-8 h-9 w-px bg-signal transition-opacity duration-500 ease-out ${isPreview ? 'opacity-100' : 'opacity-0'
                    }`}
                  aria-hidden="true"
                />

                <div className="py-8 pl-5 lg:pl-6">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <h2
                      className={`font-display text-title transition-colors duration-300 ${isPreview ? 'text-signal' : 'text-frost'
                        }`}
                    >
                      {project.title}
                    </h2>
                    {project.featured && activeFilter === 'Todos' && (
                      <span className="font-mono text-micro uppercase tracking-[0.14em] text-signal">
                        destacado
                      </span>
                    )}
                    {project.isLive && (
                      <span className="flex items-center gap-1.5 font-mono text-micro uppercase tracking-[0.14em] text-muted">
                        <span className="h-1.5 w-1.5 rounded-full bg-live" />
                        en producción
                      </span>
                    )}
                    {project.stores && (
                      <span className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                        en stores
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-measure text-small text-muted">{project.description}</p>

                  <div className="mt-5">
                    <TechList technologies={project.technologies} />
                  </div>

                  <div className="mt-5">
                    <ProjectLinks project={project} onOpenGallery={() => openGallery(project)} />
                  </div>

                  {/* Touch devices have no hover, so the image travels with the row. */}
                  {project.images[0] && (
                    <button
                      type="button"
                      onClick={() => openGallery(project)}
                      className="mt-5 block w-full max-w-sm overflow-hidden border border-line bg-inset lg:hidden"
                    >
                      <img
                        src={project.images[0]}
                        alt={`${project.title} — captura`}
                        loading="lazy"
                        className="aspect-[16/10] w-full object-cover"
                      />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {/* Sticky preview: the one place on this page allowed to be loud. */}
        <div className="col-span-12 hidden lg:col-span-5 lg:block xl:col-span-4">
          <div className="sticky top-24 pt-8">
            <div className="border border-line bg-inset">
              <AnimatePresence mode="wait" initial={false}>
                {preview?.images[0] && (
                  <motion.img
                    key={preview.title}
                    src={preview.images[0]}
                    alt={`${preview.title} — vista previa`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="aspect-[4/5] w-full object-cover"
                  />
                )}
              </AnimatePresence>
            </div>

            {preview && (
              <div className="mt-4">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-small text-frost">{preview.title}</p>
                  <span className="tnum font-mono text-micro uppercase tracking-[0.14em] text-muted">
                    01 / {String(preview.images.length).padStart(2, '0')}
                  </span>
                </div>
                {preview.metrics && (
                  <ul className="mt-3 space-y-1.5">
                    {preview.metrics.map((m) => (
                      <li key={m} className="text-small text-muted">
                        {m}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Gallery ─────────────────────────────────────────────────── */}
      {gallery && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Galería de ${gallery.title}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 backdrop-blur-md"
          onClick={closeGallery}
        >
          <div className="relative w-full max-w-4xl px-4 sm:px-12" onClick={(e) => e.stopPropagation()} ref={galleryRef}>
            <button
              type="button"
              onClick={closeGallery}
              aria-label="Cerrar galería"
              className="absolute right-2 top-2 z-10 flex h-10 w-10 items-center justify-center border border-line bg-ink text-frost transition-colors duration-300 hover:border-signal hover:text-signal sm:right-4 sm:top-4"
            >
              <FaTimes aria-hidden="true" />
            </button>

            <img
              key={gallery.images[gallery.index]}
              src={gallery.images[gallery.index]}
              alt={`${gallery.title} — imagen ${gallery.index + 1}`}
              className="max-h-[70vh] w-full border border-line object-contain sm:max-h-[76vh]"
            />

            <div className="mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
              <p className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                {gallery.title}
              </p>
              <p className="tnum font-mono text-micro uppercase tracking-[0.14em] text-signal">
                {String(gallery.index + 1).padStart(2, '0')} / {String(gallery.images.length).padStart(2, '0')}
              </p>
            </div>

            {gallery.images.length > 1 && (
              <div className="mt-4 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Imagen anterior"
                  className="flex h-9 w-9 items-center justify-center border border-line text-frost transition-colors duration-300 hover:border-signal hover:text-signal"
                >
                  <FaChevronLeft aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Imagen siguiente"
                  className="flex h-9 w-9 items-center justify-center border border-line text-frost transition-colors duration-300 hover:border-signal hover:text-signal"
                >
                  <FaChevronRight aria-hidden="true" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
