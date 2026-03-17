import React from 'react';
import { FaCode, FaMobile, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
// import ParallaxLayer from '../components/ParallaxLayer'; // Eliminado en refactor
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiSpringboot, SiPhp, SiPython,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase, SiFlutter, SiExpo,
  SiGit, SiDocker, SiAmazonwebservices as SiAmazonaws, SiGitlab, SiFigma, SiJira,
  SiGithub, SiGo, SiGin
} from 'react-icons/si';


const Home = () => {

  const skills = [
    {
      category: "Desarrollo Frontend",
      technologies: [
        { name: "React", icon: <SiReact />, color: "text-[#61DAFB]" },
        { name: "Next.js", icon: <SiNextdotjs />, color: "text-white" }, // El logo es negro/blanco
        { name: "JavaScript", icon: <SiJavascript />, color: "text-[#F7DF1E]" },
        { name: "TypeScript", icon: <SiTypescript />, color: "text-[#3178C6]" },
        { name: "HTML5", icon: <SiHtml5 />, color: "text-[#E34F26]" },
        { name: "CSS3", icon: <SiCss3 />, color: "text-[#1572B6]" },
        { name: "Tailwind", icon: <SiTailwindcss />, color: "text-[#06B6D4]" }
      ]
    },
    {
      category: "Desarrollo Backend",
      technologies: [
        { name: "Node.js", icon: <SiNodedotjs />, color: "text-[#5FA04E]" },
        { name: "Go", icon: <SiGo />, color: "text-[#4DD0E1]" },
        { name: "Gin", icon: <SiGin />, color: "text-[#4DD0E1]" },
        { name: "Express", icon: <SiExpress />, color: "text-gray-400" }, // Logo simple
        { name: "Spring Boot", icon: <SiSpringboot />, color: "text-[#6DB33F]" },
        { name: "PHP", icon: <SiPhp />, color: "text-[#777BB4]" },
        { name: "Python", icon: <SiPython />, color: "text-[#3776AB]" },
      ]
    },
    {
      category: "Bases de Datos",
      technologies: [
        { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-[#4169E1]" },
        { name: "MySQL", icon: <SiMysql />, color: "text-[#4479A1]" },
        { name: "MongoDB", icon: <SiMongodb />, color: "text-[#47A248]" },
        { name: "Firebase", icon: <SiFirebase />, color: "text-[#FFCA28]" },
        { name: "Supabase", icon: <SiSupabase />, color: "text-[#3ECF8E]" }
      ]
    },
    {
      category: "Desarrollo Móvil",
      technologies: [
        { name: "React Native", icon: <SiReact />, color: "text-[#61DAFB]" },
        { name: "Flutter", icon: <SiFlutter />, color: "text-[#027DFD]" },
        { name: "Expo", icon: <SiExpo />, color: "text-gray-400" } // Logo simple
      ]
    },
    {
      category: "DevOps & Herramientas",
      technologies: [
        { name: "Git", icon: <SiGit />, color: "text-[#F05032]" },
        { name: "GitHub", icon: <SiGithub />, color: "text-[#171515]" },
        { name: "Docker", icon: <SiDocker />, color: "text-[#2496ED]" },
        { name: "AWS", icon: <SiAmazonaws />, color: "text-[#FF9900]" },
        { name: "GitLab", icon: <SiGitlab />, color: "text-[#FCA121]" },
        { name: "Met. Ágiles", icon: <SiJira />, color: "text-[#0052CC]" }
      ]
    },
    {
      category: "UI/UX Design",
      technologies: [
        { name: "Figma", icon: <SiFigma />, color: "text-[#F24E1E]" },
        { name: "Responsive Design", icon: null, color: null }
      ]
    }
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.7, type: "spring" }
    })
  };

  const sectionTitleVariant = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7 } }
  };

  return (
    <div className="relative max-w-5xl mx-auto p-4">
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/50 to-slate-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <section className="mb-16 relative flex flex-col items-center justify-center min-h-[350px]">
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-sky-900 to-zinc-900 p-1 shadow-lg ring-1 ring-zinc-800">
            <img
              src="/images/profile.png"
              alt="Ignacio Ibaigorria"
              className="w-full h-full object-cover rounded-full border-4 border-zinc-900"
            />
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl font-bold mb-4 text-zinc-100 leading-relaxed z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Ignacio Ibaigorria
        </motion.h1>

        <motion.p
          className="text-lg text-zinc-400 leading-relaxed text-justify max-w-2xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Ingeniería en Sistemas de Información (en curso) y FullStack Developer con más de <strong>4 años</strong> construyendo aplicaciones web y móviles
          enfocadas en <strong>backend robusto</strong> (Java, Spring Boot) y frontend con React y React Native (Expo). Creo APIs REST escalables, diseño modelos de datos relacionales y NoSQL,
          y despliego soluciones reproducibles con Docker y pipelines CI/CD.
          <span className="mt-4 block">
            Me especializo en transformar requisitos de negocio en soluciones técnicas que mejoran la operación: optimizo procesos, automatizo tareas y entrego resultados medibles
            (monitoring, auditoría y seguridad con JWT / OAuth2 y Spring Security).
          </span>
          <span className="mt-4 block">
            Cuando no estoy programando, me apasiona el cuidado de animales y la exploración musical.
          </span>
        </motion.p>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Servicios
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <FaCode className="text-3xl text-cyan-400 mb-4" />,
              title: "Desarrollo web",
              desc: "Transformo ideas en experiencias web cautivadoras, combinando diseño intuitivo con tecnologías de vanguardia. Desarrollo sitios web dinámicos y responsivos que no solo destacan visualmente, sino que también ofrecen una experiencia de usuario excepcional."
            },
            {
              icon: <FaMobile className="text-3xl text-cyan-400 mb-4" />,
              title: "Desarrollo móvil",
              desc: "Creo aplicaciones móviles innovadoras que conectan con los usuarios. Desde apps nativas hasta soluciones multiplataforma, desarrollo experiencias móviles fluidas y potentes que destacan en las tiendas de aplicaciones y cautivan a los usuarios."
            },
            {
              icon: <FaDatabase className="text-3xl text-cyan-400 mb-4" />,
              title: "Desarrollo y mantenimiento de bases de datos",
              desc: "Diseño e implemento arquitecturas de datos robustas y escalables. Especializado en soluciones SQL y NoSQL, optimizo el rendimiento y garantizo la seguridad de los datos, construyendo los cimientos sólidos que tu aplicación necesita para crecer."
            },
            {
              icon: <FaCode className="text-3xl text-cyan-400 mb-4" />,
              title: "Soluciones para problemas empresariales",
              desc: "Analizo los retos de tu empresa y entrego sistemas a medida que automatizan procesos, reducen errores y mejoran resultados operativos."
            }
          ].map((serv, i) => (
            <motion.div
              key={serv.title}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-sky-500/30 flex flex-col"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <div className="text-sky-400">{serv.icon}</div>
              <h3 className="text-2xl font-semibold mb-2 text-zinc-100">{serv.title}</h3>
              <p className="text-zinc-400 text-lg">{serv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Experiencia profesional
        </motion.h2>
        <div className="flex flex-col gap-6">
          {[
            {
              title: "Desarrollador Independiente",
              company: "Freelance | Enero 2022 - Presente",
              items: [
                "Desarrollo de APIs REST escalables con Spring Boot y Express.js, incluyendo validación, manejo centralizado de errores y diseño de endpoints.",

                "Servicold: Plataforma de gestión de sensores con visualización en tiempo real, roles y permisos, exportación a Excel y notificaciones. Contribuyó a un aumento del 25% en ventas de sensores.",

                "Punto Eco: Desarrollo de e-commerce completo con catálogo, carrito y sistema de pagos. Optimización de base de datos y seguridad en endpoints.",

                "Gestión App: Sistema integral para inventario, ventas y análisis financiero con generación automática de PDFs, control de caja y procesos masivos. Mejora del 15% en productividad.",

                "Sistema de gestión de stock de escritorio para PYMEs, enfocado en usabilidad y eficiencia operativa (Python, PyQt6).",

                "Plataforma de gestión de loterías con autenticación, roles y operaciones transaccionales utilizando Spring Boot, Next.js y PostgreSQL.",

                "Implementación de autenticación y autorización con JWT y OAuth2, incluyendo control de acceso con Spring Security.",

                "Contenerización de aplicaciones con Docker y configuración de entornos reproducibles con Docker Compose.",

                "Consultoría técnica y optimización de bases de datos, mejorando rendimiento, seguridad y escalabilidad.",

                "Diseño de soluciones backend orientadas a negocio, priorizando mantenibilidad, performance y experiencia de usuario."
              ]
            },

          ].map((exp, i) => (
            <motion.div
              key={exp.title}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-sky-500/30"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <h3 className="text-2xl font-semibold mb-2 text-zinc-100">{exp.title}</h3>
              <p className="text-sky-400 text-xl mb-4 font-medium">{exp.company}</p>
              <ul className="list-disc list-inside text-zinc-400 space-y-2 text-lg">
                {exp.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Habilidades
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 transition-all hover:scale-[1.02] hover:shadow-lg hover:border-sky-500/30 flex flex-col items-center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <h3 className="text-2xl font-semibold mb-4 text-zinc-100 text-center">{skill.category}</h3>

              <div className="flex flex-wrap justify-center gap-2">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech.name}
                    className="bg-zinc-800 text-zinc-300 text-sm font-medium px-3 py-1.5 rounded-full border border-zinc-700 flex items-center gap-2"
                  >
                    {tech.icon && (
                      <span className={`text-lg ${tech.color ? tech.color : 'text-sky-400'}`}>
                        {tech.icon}
                      </span>
                    )}
                    <span>{tech.name}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Educación
        </motion.h2>
        <div className="flex flex-col gap-6">
          <motion.div
            className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 transition-all hover:scale-[1.01] hover:shadow-lg hover:border-sky-500/30"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h3 className="text-2xl font-semibold mb-2 text-zinc-100">
              Ingeniería en Sistemas de Información
            </h3>
            <p className="text-sky-400 mb-4 font-medium">
              Universidad Tecnológica Nacional | 2019 - Presente
            </p>

            <ul className="list-disc list-inside text-zinc-400 space-y-2 text-lg">
              <li>
                Formación en diseño de arquitecturas de software, desarrollo backend y construcción de APIs orientadas a servicios.
              </li>
              <li>
                Modelado y diseño de bases de datos relacionales y NoSQL, incluyendo normalización, optimización de consultas e integridad de datos.
              </li>
              <li>
                Aplicación de programación orientada a objetos, estructuras de datos y patrones de diseño (clean code, principios SOLID).
              </li>
              <li>
                Análisis de requerimientos y diseño de sistemas escalables enfocados en resolver problemas de negocio.
              </li>
              <li>
                Fundamentos de redes, sistemas operativos y arquitectura de computadoras.
              </li>
              <li>
                Introducción a metodologías ágiles (Scrum) y trabajo colaborativo en equipos de desarrollo.
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Mi metodología
        </motion.h2>
        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 hover:scale-[1.02] hover:shadow-lg hover:border-sky-500/30"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-400">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-sky-400">Descubrimiento</h3>
              <p className="text-zinc-400 text-lg">Entiendo a fondo tus necesidades y objetivos para diseñar la solución perfecta.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-400">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-sky-400">Desarrollo iterativo</h3>
              <p className="text-zinc-400 text-lg">Trabajo en ciclos cortos con feedback constante para asegurar que el producto evolucione según tus expectativas.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-sky-400">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-sky-400">Entrega y soporte</h3>
              <p className="text-zinc-400 text-lg">Implementación cuidadosa y soporte continuo para garantizar el éxito a largo plazo de tu proyecto.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-zinc-100"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ¿Por qué trabajar conmigo?
        </motion.h2>
        <motion.div
          className="bg-zinc-900/50 backdrop-blur-sm rounded-2xl shadow-sm border border-zinc-800 p-8 hover:scale-[1.02] hover:shadow-lg hover:border-sky-500/30"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl text-sky-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-sky-900/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sky-400">✓</span>
                </span>
                Compromiso con la calidad
              </h3>
              <p className="text-zinc-400 ml-10 text-lg">
                Cada línea de código que escribo refleja mi dedicación a la excelencia y a las mejores prácticas de la industria.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-sky-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-sky-900/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sky-400">✓</span>
                </span>
                Comunicación transparente
              </h3>
              <p className="text-zinc-400 ml-10 text-lg">
                Mantengo una comunicación clara y constante durante todo el proceso de desarrollo.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-sky-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-sky-900/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sky-400">✓</span>
                </span>
                Resolución de problemas
              </h3>
              <p className="text-zinc-400 ml-10 text-lg">
                No solo entrego código; diseño sistemas que atacan y solucionan los problemas de raíz en la operación de mis clientes.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-sky-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-sky-900/30 rounded-full flex items-center justify-center mr-2">
                  <span className="text-sky-400">✓</span>
                </span>
                Enfoque en resultados
              </h3>
              <p className="text-zinc-400 ml-10 text-lg">
                Me centro en crear soluciones que generen un impacto real y medible en tu negocio.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;