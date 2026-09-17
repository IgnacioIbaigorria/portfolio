import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaMobile, FaDatabase, FaArrowRight } from 'react-icons/fa';
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
  useScroll,
  useMotionTemplate,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiSpringboot, SiPhp, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase, SiFlutter, SiExpo,
  SiGit, SiDocker, SiAmazonwebservices as SiAmazonaws, SiGitlab, SiFigma,
  SiGithub, SiGo, SiGin
} from 'react-icons/si';

/* ─── Animated Counter ─────────────────────────────────────── */
const AnimatedCounter = ({ target, suffix = '', duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionVal.set(target);
  }, [isInView, motionVal, target]);

  useEffect(() => spring.on('change', v => setDisplay(Math.round(v))), [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
};

/* ─── Typing Effect ─────────────────────────────────────────── */
const ROLES = ['FullStack Developer', 'Backend Engineer', 'Mobile Developer', 'Problem Solver'];
const TypingText = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const target = ROLES[roleIndex];
    let timeout;
    if (!deleting && displayed.length < target.length) {
      timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex(i => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <span className="text-sky-400 font-semibold">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
};

/* ─── Scroll Progress Bar ──────────────────────────────────── */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-500 via-cyan-400 to-sky-500 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

/* ─── Cursor-following Spotlight ───────────────────────────── */
const CursorSpotlight = () => {
  const mouseX = useMotionValue(-400);
  const mouseY = useMotionValue(-400);

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(650px circle at ${mouseX}px ${mouseY}px, rgba(56,189,248,0.07), transparent 80%)`;

  return (
    <motion.div
      className="fixed inset-0 -z-10 pointer-events-none hidden md:block"
      style={{ background }}
    />
  );
};

/* ─── Magnetic Button Wrapper ──────────────────────────────── */
const MagneticWrapper = ({ children }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.5 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.35);
    y.set(relY * 0.35);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
};

/* ─── Tilt Card (3D hover) ─────────────────────────────────── */
const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-50, 50], [-8, 8]), { stiffness: 200, damping: 20 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 600 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

/* ─── Main Component ────────────────────────────────────────── */
const Home = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.8', 'end 0.4'],
  });

  const sectionTitleVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
  };

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, type: 'spring' }
    })
  };

  const tagContainerVariant = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05 } }
  };

  const tagVariant = {
    hidden: { opacity: 0, scale: 0.7, y: 8 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } }
  };

  const skills = [
    {
      category: 'Frontend',
      color: 'from-sky-500/10 to-cyan-500/5',
      border: 'border-sky-500/20',
      technologies: [
        { name: 'React', icon: <SiReact />, color: '#61DAFB' },
        { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
        { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
        { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
        { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
        { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
        { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
      ]
    },
    {
      category: 'Backend',
      color: 'from-emerald-500/10 to-teal-500/5',
      border: 'border-emerald-500/20',
      technologies: [
        { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F' },
        { name: 'Go', icon: <SiGo />, color: '#4DD0E1' },
        { name: 'Gin', icon: <SiGin />, color: '#4DD0E1' },
        { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E' },
        { name: 'Express', icon: <SiExpress />, color: '#aaaaaa' },
        { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
        { name: 'Python', icon: <SiPython />, color: '#3776AB' },
      ]
    },
    {
      category: 'Bases de Datos',
      color: 'from-violet-500/10 to-purple-500/5',
      border: 'border-violet-500/20',
      technologies: [
        { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
        { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
        { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
        { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
        { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
      ]
    },
    {
      category: 'Móvil',
      color: 'from-pink-500/10 to-rose-500/5',
      border: 'border-pink-500/20',
      technologies: [
        { name: 'React Native', icon: <SiReact />, color: '#61DAFB' },
        { name: 'Flutter', icon: <SiFlutter />, color: '#027DFD' },
        { name: 'Expo', icon: <SiExpo />, color: '#aaaaaa' },
      ]
    },
    {
      category: 'DevOps & Cloud',
      color: 'from-orange-500/10 to-amber-500/5',
      border: 'border-orange-500/20',
      technologies: [
        { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
        { name: 'AWS', icon: <SiAmazonaws />, color: '#FF9900' },
        { name: 'Git', icon: <SiGit />, color: '#F05032' },
        { name: 'GitHub', icon: <SiGithub />, color: '#cccccc' },
        { name: 'GitLab', icon: <SiGitlab />, color: '#FCA121' },
      ]
    },
    {
      category: 'Diseño & Tools',
      color: 'from-fuchsia-500/10 to-pink-500/5',
      border: 'border-fuchsia-500/20',
      technologies: [
        { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
        { name: 'Responsive Design', icon: null, color: null },
        { name: 'Metodologías Ágiles', icon: null, color: null },
      ]
    }
  ];

  const experience = [
    {
      period: 'Ene 2021 – Presente',
      title: 'Desarrollador Independiente',
      company: 'Freelance',
      highlights: [
        { name: 'Servicold', desc: 'Plataforma IoT de gestión de sensores con visualización en tiempo real — +25% en ventas.' },
        { name: 'Gestión App', desc: 'App móvil para PyMEs con inventario, ventas, caja y generación de PDFs — +20% productividad.' },
        { name: 'Punto Eco', desc: 'E-commerce completo con catálogo, carrito y sistema de pagos.' },
        { name: 'TaskFlow', desc: 'App colaborativa con sincronización en tiempo real <100ms y soporte offline.' },
        { name: 'Sistema de Loterías', desc: 'Plataforma full-stack con roles, validaciones y operaciones transaccionales.' },
        { name: 'Consultoría', desc: 'Optimización de BDs, contenerización con Docker, CI/CD y seguridad con JWT/OAuth2.' },
      ]
    }
  ];

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      <ScrollProgress />
      <CursorSpotlight />

      {/* Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/50 to-slate-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* ── HERO ── */}
      <section className="mb-16 relative flex flex-col items-center justify-center min-h-[380px] text-center">
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.7, type: 'spring' }}
        >
          {/* Pulsing glow behind avatar */}
          <motion.div
            className="absolute inset-0 rounded-full bg-sky-500/30 blur-2xl -z-10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <div className="w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr from-sky-800 to-zinc-900 p-1 shadow-2xl ring-2 ring-sky-500/20">
            <img
              src="/images/profile.png"
              alt="Ignacio Ibaigorria"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5" title="Disponible">
            <motion.span
              className="absolute inline-flex h-full w-full rounded-full bg-emerald-400"
              animate={{ scale: [1, 1.8], opacity: [0.7, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            />
            <span className="relative inline-flex rounded-full h-5 w-5 bg-emerald-500 border-2 border-slate-950" />
          </span>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-2 text-zinc-100 leading-tight z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Ignacio Ibaigorria
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-zinc-400 mb-2 z-10 h-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <TypingText />
        </motion.p>

        <motion.p
          className="text-base text-zinc-500 mb-8 max-w-xl z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Ingeniería en Sistemas de Información · Construyo aplicaciones web y móviles que generan impacto real en los negocios.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 z-10"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <MagneticWrapper>
            <Link
              to="/projects"
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-sky-500/20 hover:shadow-sky-400/30"
            >
              Ver proyectos <FaArrowRight className="text-sm" />
            </Link>
          </MagneticWrapper>
          <MagneticWrapper>
            <Link
              to="/contact"
              className="flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-semibold px-6 py-3 rounded-xl transition-colors duration-200 border border-zinc-700 hover:border-zinc-500"
            >
              Contactame
            </Link>
          </MagneticWrapper>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="mb-16">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {[
            { value: 4, suffix: '+', label: 'Años de experiencia' },
            { value: 9, suffix: '+', label: 'Proyectos entregados' },
            { value: 2, suffix: '', label: 'Apps en stores' },
            { value: 25, suffix: '%', label: 'Impacto en ventas' },
          ].map((stat, i) => (
            <TiltCard
              key={i}
              className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl border border-zinc-800 p-5 text-center hover:border-sky-500/30 transition-colors duration-300"
            >
              <div className="text-3xl md:text-4xl font-bold text-sky-400 mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-zinc-400">{stat.label}</div>
            </TiltCard>
          ))}
        </motion.div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[
            {
              icon: <FaCode className="text-2xl" />,
              title: 'Desarrollo Web',
              desc: 'Sitios y aplicaciones web modernas, responsivas y de alto rendimiento. Desde landing pages hasta sistemas complejos con autenticación, roles y APIs REST.'
            },
            {
              icon: <FaMobile className="text-2xl" />,
              title: 'Desarrollo Móvil',
              desc: 'Apps iOS y Android con React Native y Expo. Publicadas en Google Play y App Store, con soporte offline y experiencias fluidas.'
            },
            {
              icon: <FaDatabase className="text-2xl" />,
              title: 'Backend & APIs',
              desc: 'APIs REST escalables con Spring Boot, Go o Node.js. Diseño de bases de datos, seguridad con JWT/OAuth2 y despliegue con Docker.'
            },
            {
              icon: <FaCode className="text-2xl" />,
              title: 'Automatización & Sistemas',
              desc: 'Sistemas a medida que automatizan procesos, reducen errores y mejoran resultados operativos con métricas measurables.'
            }
          ].map((serv, i) => (
            <motion.div
              key={serv.title}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-sky-500/30 hover:shadow-lg transition-all duration-300 flex gap-4"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="flex-shrink-0 w-12 h-12 bg-sky-900/30 rounded-xl flex items-center justify-center text-sky-400"
                whileHover={{ scale: 1.15, rotate: [0, -8, 8, -8, 0] }}
                transition={{ duration: 0.5 }}
              >
                {serv.icon}
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-zinc-100">{serv.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{serv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCIA — Timeline ── */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Experiencia profesional
        </motion.h2>

        <div ref={timelineRef} className="relative pl-6 space-y-0">
          {/* Track line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-zinc-800" />
          {/* Animated progress line */}
          <motion.div
            className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-400 to-sky-600 origin-top"
            style={{ scaleY: timelineProgress }}
          />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              className="relative"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-sky-500 border-2 border-slate-950 shadow-lg shadow-sky-500/30"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              >
                <motion.span
                  className="absolute inset-0 rounded-full bg-sky-400"
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                />
              </motion.div>

              <div className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 mb-6 hover:border-sky-500/20 transition-colors duration-300 ml-4">
                <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-zinc-100">{exp.title}</h3>
                    <p className="text-sky-400 font-medium text-sm">{exp.company}</p>
                  </div>
                  <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
                    {exp.period}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {exp.highlights.map((h, j) => (
                    <motion.div
                      key={j}
                      className="flex gap-3 p-3 bg-zinc-800/40 rounded-xl border border-zinc-700/40 hover:border-sky-500/20 transition-colors"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: j * 0.06, duration: 0.4 }}
                    >
                      <span className="text-sky-400 font-bold text-sm flex-shrink-0 mt-0.5">›</span>
                      <div>
                        <span className="text-zinc-200 font-semibold text-sm">{h.name}: </span>
                        <span className="text-zinc-400 text-sm">{h.desc}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── HABILIDADES ── */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Habilidades
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className={`bg-gradient-to-br ${skill.color} backdrop-blur-sm rounded-2xl border ${skill.border} p-5 hover:scale-[1.02] transition-transform duration-300`}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <h3 className="text-base font-bold mb-3 text-zinc-200">{skill.category}</h3>
              <motion.div
                className="flex flex-wrap gap-2"
                variants={tagContainerVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                {skill.technologies.map((tech) => (
                  <motion.span
                    key={tech.name}
                    variants={tagVariant}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="bg-zinc-900/60 text-zinc-300 text-xs font-medium px-2.5 py-1.5 rounded-full border border-zinc-700/50 flex items-center gap-1.5 hover:border-sky-500/30 transition-colors"
                  >
                    {tech.icon && (
                      <motion.span
                        className="text-base"
                        style={{ color: tech.color }}
                        whileHover={{ scale: 1.25, rotate: 12 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 12 }}
                      >
                        {tech.icon}
                      </motion.span>
                    )}
                    {tech.name}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── EDUCACIÓN ── */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Educación
        </motion.h2>
        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6 hover:border-sky-500/20 transition-colors duration-300"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
            <div>
              <h3 className="text-xl font-bold text-zinc-100">Ingeniería en Sistemas de Información</h3>
              <p className="text-sky-400 font-medium text-sm">Universidad Tecnológica Nacional</p>
            </div>
            <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full whitespace-nowrap">
              2019 – Presente
            </span>
          </div>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-zinc-400 text-sm">
            {[
              'Arquitecturas de software, APIs y desarrollo backend',
              'Modelado de bases de datos relacionales y NoSQL',
              'POO, estructuras de datos y patrones SOLID',
              'Análisis de requerimientos y sistemas escalables',
              'Redes, sistemas operativos y arquitectura de computadoras',
              'Metodologías ágiles (Scrum) y trabajo en equipo',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-sky-400 mt-0.5">›</span> {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ── METODOLOGÍA ── */}
      <section className="mb-16">
        <motion.h2
          className="text-3xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Mi metodología
        </motion.h2>
        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl border border-zinc-800 p-6"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: '01', title: 'Descubrimiento', desc: 'Entiendo a fondo tus necesidades y objetivos antes de escribir una sola línea de código.' },
              { step: '02', title: 'Desarrollo iterativo', desc: 'Trabajo en ciclos cortos con feedback constante para asegurar que el producto evolucione correctamente.' },
              { step: '03', title: 'Entrega y soporte', desc: 'Implementación cuidadosa y soporte continuo para garantizar el éxito a largo plazo.' },
            ].map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                className="text-center"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
              >
                <motion.div
                  className="w-14 h-14 bg-sky-900/30 border border-sky-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                >
                  <span className="text-xl font-bold text-sky-400">{step}</span>
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 text-zinc-100">{title}</h3>
                <p className="text-zinc-400 text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="mb-8">
        <motion.div
          className="bg-gradient-to-br from-sky-900/30 to-zinc-900/50 backdrop-blur-sm rounded-2xl border border-sky-500/20 p-8 text-center"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-100 mb-3">¿Tenés un proyecto en mente?</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto">Hablemos. Estoy disponible para proyectos freelance y oportunidades laborales.</p>
          <MagneticWrapper>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-3 rounded-xl transition-colors duration-200 shadow-lg shadow-sky-500/20"
            >
              Contactame <FaArrowRight className="text-sm" />
            </Link>
          </MagneticWrapper>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
