import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiSpringboot, SiPhp, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase, SiFlutter, SiExpo,
  SiGit, SiDocker, SiAmazonwebservices as SiAmazonaws, SiGitlab, SiFigma,
  SiGithub, SiGo, SiGin
} from 'react-icons/si';
import { FaCode, FaMobile, FaDatabase, FaBoxes } from 'react-icons/fa';
import { motion, useInView, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Wipe, Blur, RuleReveal } from '../components/Reveal';

/* ─── Measured value. Counts once, when it is first seen. ─────────────── */
const Counter = ({ target, suffix = '', prefix = '' }) => {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: '-15% 0px' });
  const motionVal = useMotionValue(0);
  const spring = useSpring(motionVal, { duration: 1400, bounce: 0 });
  const [display, setDisplay] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setDisplay(target);
      return undefined;
    }
    if (inView) motionVal.set(target);
    return undefined;
  }, [inView, motionVal, target, reduce]);

  useEffect(() => {
    if (reduce) return undefined;
    return spring.on('change', (v) => setDisplay(Math.round(v)));
  }, [spring, reduce]);

  return (
    <span ref={ref} className="tnum">
      {prefix}
      {display}
      {suffix}
    </span>
  );
};

/* ─── The role line types itself, then holds. ─────────────────────────── */
const ROLES = ['Fullstack Developer', 'Backend Engineer', 'Mobile Developer'];

const TypingRole = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setTyped(ROLES[0]);
      return undefined;
    }
    const target = ROLES[roleIndex];
    let timeout;
    if (!deleting && typed.length < target.length) {
      timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 65);
    } else if (!deleting && typed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 35);
    } else {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIndex, reduce]);

  return (
    <span className="text-signal">
      {typed}
      {!reduce && <span className="animate-pulse-dot">|</span>}
    </span>
  );
};

/* ─── Section heading: hairline, display title, and a real fact. ──────── */
const SectionHead = ({ title, note }) => (
  <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-t border-line pt-6">
    <Wipe>
      <h2 className="font-display text-headline text-frost">{title}</h2>
    </Wipe>
    {note && <span className="font-mono text-micro uppercase tracking-[0.14em] text-muted">{note}</span>}
  </div>
);

const stats = [
  { value: 4, suffix: '+', label: 'Años construyendo software' },
  { value: 9, suffix: '+', label: 'Proyectos entregados' },
  { value: 2, suffix: '', label: 'Apps publicadas en stores' },
  { value: 25, suffix: '%', prefix: '+', label: 'Impacto en ventas de un cliente' },
];

const services = [
  {
    icon: <FaCode aria-hidden="true" />,
    title: 'Desarrollo web',
    desc: 'Sitios y aplicaciones con React y Tailwind, desde una landing hasta un sistema con autenticación, roles y APIs REST. Responsive de verdad, no un desktop comprimido.',
  },
  {
    icon: <FaDatabase aria-hidden="true" />,
    title: 'Backend y APIs',
    desc: 'Servicios REST con Spring Boot, Go o Node.js. Modelado de datos, seguridad con JWT y despliegue en Docker. Diseñados para aguantar carga, no para la demo.',
  },
  {
    icon: <FaMobile aria-hidden="true" />,
    title: 'Apps móviles',
    desc: 'React Native con Expo, publicadas en Google Play y App Store. Con soporte offline, sincronización en tiempo real y alertas push.',
  },
  {
    icon: <FaBoxes aria-hidden="true" />,
    title: 'Automatización y sistemas',
    desc: 'Software a medida que elimina tareas repetitivas: inventario, punto de venta, PDFs automáticos y control de caja. Menos errores, más tiempo para lo importante.',
  },
];

const skills = [
  {
    category: 'Frontend',
    technologies: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#FFFFFF' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E' },
      { name: 'Tailwind', icon: <SiTailwindcss />, color: '#06B6D4' },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <SiCss3 />, color: '#1572B6' },
    ],
  },
  {
    category: 'Backend',
    technologies: [
      { name: 'Spring Boot', icon: <SiSpringboot />, color: '#6DB33F' },
      { name: 'Go', icon: <SiGo />, color: '#4DD0E1' },
      { name: 'Gin', icon: <SiGin />, color: '#4DD0E1' },
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#5FA04E' },
      { name: 'Express', icon: <SiExpress />, color: '#AAAAAA' },
      { name: 'PHP', icon: <SiPhp />, color: '#777BB4' },
      { name: 'Python', icon: <SiPython />, color: '#3776AB' },
    ],
  },
  {
    category: 'Datos',
    technologies: [
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
      { name: 'MySQL', icon: <SiMysql />, color: '#4479A1' },
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
      { name: 'Firebase', icon: <SiFirebase />, color: '#FFCA28' },
      { name: 'Supabase', icon: <SiSupabase />, color: '#3ECF8E' },
    ],
  },
  {
    category: 'Móvil',
    technologies: [
      { name: 'React Native', icon: <SiReact />, color: '#61DAFB' },
      { name: 'Expo', icon: <SiExpo />, color: '#AAAAAA' },
      { name: 'Flutter', icon: <SiFlutter />, color: '#027DFD' },
    ],
  },
  {
    category: 'DevOps',
    technologies: [
      { name: 'Docker', icon: <SiDocker />, color: '#2496ED' },
      { name: 'AWS', icon: <SiAmazonaws />, color: '#FF9900' },
      { name: 'Git', icon: <SiGit />, color: '#F05032' },
      { name: 'GitHub', icon: <SiGithub />, color: '#CCCCCC' },
      { name: 'GitLab', icon: <SiGitlab />, color: '#FCA121' },
    ],
  },
  {
    category: 'Diseño',
    technologies: [
      { name: 'Figma', icon: <SiFigma />, color: '#F24E1E' },
      { name: 'Responsive design', icon: null, color: null },
      { name: 'Metodologías ágiles', icon: null, color: null },
    ],
  },
];

const experience = [
  {
    period: '2022 — hoy',
    title: 'Desarrollador independiente',
    company: 'Freelance',
    highlights: [
      { name: 'Servicold', desc: 'Plataforma IoT de gestión de sensores con visualización en tiempo real. +25% en ventas.' },
      { name: 'Gestión App', desc: 'App móvil para PyMEs: inventario, ventas, caja y PDFs automáticos. +20% en productividad.' },
      { name: 'Punto Eco', desc: 'E-commerce completo con catálogo, carrito, pagos y endpoints seguros.' },
      { name: 'TaskFlow', desc: 'App colaborativa con sincronización en tiempo real por debajo de 100 ms y soporte offline.' },
      { name: 'Loterías', desc: 'Plataforma full-stack con roles, validaciones y operaciones transaccionales.' },
      { name: 'Consultoría', desc: 'Optimización de bases de datos, contenerización con Docker, CI/CD y seguridad con JWT.' },
    ],
  },
];

const education = [
  {
    degree: 'Ingeniería en Sistemas de Información',
    school: 'Universidad Tecnológica Nacional',
    period: '2019 — hoy',
    topics: [
      'Arquitecturas de software y diseño de APIs',
      'Modelado relacional y NoSQL',
      'POO, estructuras de datos y patrones SOLID',
      'Redes, sistemas operativos y arquitectura',
      'Metodologías ágiles y trabajo en equipo',
    ],
  },
];

const method = [
  {
    step: '01',
    title: 'Entender',
    desc: 'Antes de escribir código necesito saber qué se mide hoy, qué está roto y qué debería pasar después. Salgo de esa conversación con un alcance escrito.',
  },
  {
    step: '02',
    title: 'Construir',
    desc: 'Ciclos cortos, cambios chicos y algo funcionando en cada uno. Vas a ver el avance, no un relatório de avance.',
  },
  {
    step: '03',
    title: 'Entregar',
    desc: 'Despliegue, documentación y acompañamiento. Si algo falla el día 30, seguimos hablando.',
  },
];

const Home = () => {
  const reduce = useReducedMotion();

  const rise = (delay) =>
    reduce
      ? {}
      : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] },
      };

  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-12 items-end gap-x-6 gap-y-12 pt-6 md:pt-10">
        <div className="col-span-12 lg:col-span-7">
          <motion.p
            {...rise(0.05)}
            className="font-mono text-micro uppercase tracking-[0.14em] text-muted"
          >
            Argentina
          </motion.p>

          <motion.h1
            {...rise(0.12)}
            className="mt-6 font-display text-display text-frost"
          >
            Ignacio
            <br />
            Ibaigorria
          </motion.h1>

          <motion.p {...rise(0.24)} className="mt-8 max-w-[46ch] font-display text-headline text-signal">
            <TypingRole />
          </motion.p>

          <motion.p {...rise(0.32)} className="mt-6 max-w-measure text-lead text-muted">
            Construyo software que se puede medir: backends con Spring Boot y Go, frontends con React
            y apps móviles en las stores. Trabajo con empresas que necesitan resultados, no
            maquetas.
          </motion.p>

          <motion.div {...rise(0.42)} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to="/contact"
              className="bg-signal px-7 py-3.5 text-small font-medium text-ink transition-colors duration-300 ease-out hover:bg-[#F0BC63]"
            >
              Contame tu proyecto
            </Link>
            <Link to="/projects" className="link text-small">
              Ver los proyectos
            </Link>
          </motion.div>
        </div>

        <motion.div {...rise(0.3)} className="col-span-12 lg:col-span-5">
          <figure className="relative">
            <div className="overflow-hidden border border-line bg-inset">
              <img
                src="/images/profile.png"
                alt="Ignacio Ibaigorria"
                width="640"
                height="800"
                className="aspect-[4/5] w-full object-cover grayscale-[0.15]"
              />
            </div>
            <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 font-mono text-micro uppercase tracking-[0.14em] text-muted">
              <span>Desarrollador Fullstack</span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-live" />
                Disponible
              </span>
            </figcaption>
          </figure>
        </motion.div>

        <div className="col-span-12 mt-4">
          <RuleReveal delay={0.5} />
        </div>
      </section>

      {/* ── MEASURED OUTCOMES ────────────────────────────────────────── */}
      <section className="grid grid-cols-2 gap-x-6 gap-y-10 pt-10 md:grid-cols-4 md:pt-12">
        {stats.map((stat, i) => (
          <Blur key={stat.label} delay={i * 0.06}>
            <div className="font-display text-[2.25rem] font-medium leading-none text-frost sm:text-[2.75rem]">
              <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
            </div>
            <p className="mt-3 max-w-[22ch] text-small text-muted">{stat.label}</p>
          </Blur>
        ))}
      </section>

      {/* ── SERVICIOS ────────────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <SectionHead title="Qué hago" note="4 servicios" />
        <ul className="mt-4 grid grid-cols-1 gap-x-16 border-b border-line md:grid-cols-2">
          {services.map((service, i) => (
            <Blur as="li" key={service.title} delay={i * 0.05}>
              <div className="border-t border-line py-9 md:[&:nth-child(2n+1)]:pl-0 md:[&:nth-child(2n)]:border-l md:[&:nth-child(2n)]:border-line-soft md:[&:nth-child(2n)]:pl-16">
                <div className="flex items-center gap-3 text-signal">
                  <span className="text-lg leading-none">{service.icon}</span>
                  <h3 className="font-display text-title text-frost">{service.title}</h3>
                </div>
                <p className="mt-3 max-w-measure text-small text-muted">{service.desc}</p>
              </div>
            </Blur>
          ))}
        </ul>
      </section>

      {/* ── EXPERIENCIA ──────────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <SectionHead title="Experiencia" note="2022 — hoy" />
        {experience.map((exp) => (
          <div key={exp.title} className="mt-12 grid grid-cols-12 gap-x-6">
            <div className="col-span-12 md:col-span-4">
              <Blur>
                <h3 className="font-display text-title text-frost">{exp.title}</h3>
                <p className="mt-1 text-small text-signal">{exp.company}</p>
                <p className="mt-4 font-mono text-micro uppercase tracking-[0.14em] text-muted">
                  {exp.period}
                </p>
              </Blur>
            </div>
            <div className="col-span-12 border-line-soft md:col-span-8 md:border-l md:pl-10">
              <Blur delay={0.08}>
                <ul className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
                  {exp.highlights.map((h) => (
                    <li key={h.name} className="border-t border-line pt-3">
                      <span className="text-small font-medium text-frost">{h.name}</span>
                      <p className="mt-1 text-small text-muted">{h.desc}</p>
                    </li>
                  ))}
                </ul>
              </Blur>
            </div>
          </div>
        ))}
      </section>

      {/* ── HABILIDADES ──────────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <SectionHead title="Con qué trabajo" note="6 categorías" />
        <div className="mt-10 grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Blur key={group.category} delay={i * 0.04}>
              <div>
                <h3 className="font-mono text-micro uppercase tracking-[0.14em] text-muted">
                  {group.category}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5">
                  {group.technologies.map((tech) => (
                    <li key={tech.name} className="flex items-center gap-1.5 text-small text-frost">
                      {tech.icon && (
                        <span className="text-[0.95rem] leading-none" style={{ color: tech.color }} aria-hidden="true">
                          {tech.icon}
                        </span>
                      )}
                      <span className="font-mono text-[0.8125rem]">{tech.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Blur>
          ))}
        </div>
      </section>

      {/* ── EDUCACIÓN ────────────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <SectionHead title="Formación" note="En curso" />
        {education.map((ed) => (
          <Blur key={ed.degree}>
            <div className="mt-10 grid grid-cols-12 items-baseline gap-x-6 gap-y-3">
              <h3 className="col-span-12 font-display text-headline text-frost md:col-span-6">
                {ed.degree}
              </h3>
              <p className="col-span-12 text-small text-signal md:col-span-3">{ed.school}</p>
              <p className="col-span-12 font-mono text-micro uppercase tracking-[0.14em] text-muted md:col-span-3 md:text-right">
                {ed.period}
              </p>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-2 border-t border-line pt-5 sm:grid-cols-2 lg:grid-cols-3">
              {ed.topics.map((topic) => (
                <li key={topic} className="text-small text-muted">
                  {topic}
                </li>
              ))}
            </ul>
          </Blur>
        ))}
      </section>

      {/* ── METODOLOGÍA ──────────────────────────────────────────────── */}
      <section className="mt-20 md:mt-28">
        <SectionHead title="Cómo trabajo" note="3 pasos" />
        <ol className="mt-10 grid grid-cols-1 gap-x-16 md:grid-cols-3">
          {method.map((m, i) => (
            <Blur key={m.step} delay={i * 0.07} as="li">
              <div className="border-t border-line pt-5">
                <span className="font-mono text-micro tracking-[0.14em] text-signal">{m.step}</span>
                <h3 className="mt-3 font-display text-title text-frost">{m.title}</h3>
                <p className="mt-2 max-w-measure text-small text-muted">{m.desc}</p>
              </div>
            </Blur>
          ))}
        </ol>
      </section>

      {/* ── CIERRE ───────────────────────────────────────────────────── */}
      <section className="mt-24 md:mt-32">
        <RuleReveal />
        <Wipe className="mt-10">
          <h2 className="max-w-[18ch] font-display text-headline text-frost md:text-[3.5rem] md:leading-[1.05]">
            ¿Tenés algo que necesita funcionar de verdad?
          </h2>
        </Wipe>
        <Blur className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link
            to="/contact"
            className="bg-signal px-7 py-3.5 text-small font-medium text-ink transition-colors duration-300 ease-out hover:bg-[#F0BC63]"
          >
            Escribime
          </Link>
          <a href="mailto:ignacioibaigorria@gmail.com" className="link font-mono text-[0.8125rem]">
            ignacioibaigorria@gmail.com
          </a>
        </Blur>
      </section>
    </div>
  );
};

export default Home;
