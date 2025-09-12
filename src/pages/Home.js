import React from 'react';
import { FaCode, FaMobile, FaDatabase } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ParallaxLayer from '../components/ParallaxLayer';

const CircularProgress = ({ percentage }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-24 h-24">
      <svg className="w-24 h-24 transform -rotate-90">
        <circle
          className="text-slate-800"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
        <circle
          className="text-cyan-700 transition-all duration-1000 ease-out"
          strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="48"
          cy="48"
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-lg font-bold text-cyan-400">
        {percentage}%
      </span>
    </div>
  );
};

const Home = () => {
  const skills = [
    {
      category: "Desarrollo Frontend",
      level: 75,
      technologies: "React, JavaScript, TypeScript, HTML5, CSS3, Tailwind"
    },
    {
      category: "Desarrollo Backend",
      level: 90,
      technologies: "Node.js, Spring Boot, PHP, Python, Next.js, Django"
    },
    {
      category: "Bases de Datos",
      level: 80,
      technologies: "MySQL, PostgreSQL, MongoDB, Firebase"
    },
    {
      category: "Desarrollo Móvil",
      level: 85,
      technologies: "React Native, Expo, EAS"
    },
    {
      category: "Herramientas",
      level: 80,
      technologies: "Git, Docker, Metodologías Ágiles, Resolución de problemas"
    },
    {
      category: "UI/UX Design",
      level: 80,
      technologies: "Figma, Responsive Design, Tailwind"
    }
  ];

  // Animation variants for cards and sections
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
      {/* Animated background */}
      <motion.div className="fixed inset-0 -z-20 overflow-hidden" aria-hidden="true">
        <ParallaxLayer speed={0.05} className="absolute inset-0">
          <div className="w-full h-full bg-gradient-to-tr from-[#061024] to-[#112240]" />
        </ParallaxLayer>

        <ParallaxLayer speed={0.12} className="absolute inset-0">
          <div className="pointer-events-none w-full h-full">
            <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              {/* formas SVG aquí */}
            </svg>
          </div>
        </ParallaxLayer>

        <ParallaxLayer speed={0.25} className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full bg-cyan-700/10 blur-lg" />
        </ParallaxLayer>
      </motion.div>

      {/* Hero Section */}
      <section className="mb-16 relative flex flex-col items-center justify-center min-h-[350px]">
        {/* Foto de perfil con borde animado (no spin) */}
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#233554] to-[#0a192f] p-1 shadow-xl">
            <img
              src="/images/profile.png"
              alt="Ignacio Ibaigorria"
              className="w-full h-full object-cover rounded-full border-4 border-[#0a192f]"
            />
          </div>
        </motion.div>
        {/* Nombre y presentación animados */}
        <motion.h1
          className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent leading-relaxed z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          Ignacio Ibaigorria
        </motion.h1>
        <motion.p
          className="text-lg text-gray-200 leading-relaxed text-justify max-w-2xl z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          Ingeniero en Sistemas de Información en formación y desarrollador Full Stack apasionado 
          por crear experiencias digitales excepcionales. Con más de 3 años transformando ideas 
          en soluciones tecnológicas innovadoras, combino creatividad y expertise técnico para 
          desarrollar aplicaciones web y móviles que marcan la diferencia.
          <br />
          <span className="mt-4 block">
            Cuando no estoy programando, dedico mi tiempo a mis dos grandes pasiones: 
            el cuidado de animales y la exploración musical.
          </span>
        </motion.p>
      </section>

      {/* Servicios */}
      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
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
            }
          ].map((serv, i) => (
            <motion.div
              key={serv.title}
              className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 transition-transform hover:scale-105 hover:shadow-cyan-700/30 flex flex-col"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              {serv.icon}
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">{serv.title}</h3>
              <p className="text-gray-300 text-lg">{serv.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Experiencia Profesional */}
      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
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
                "Punto Eco Ecommerce: Desarrollo de plataforma de comercio electrónico para tienda de productos eco-friendly, implementando catálogo de productos, carrito de compras y sistema de pagos con React, Next.js y PostgreSQL.",
                "Gestión Punto Eco: Creación de sistema completo de gestión para inventario, ventas y análisis financiero con funcionalidades avanzadas como etiquetado de productos, actualización masiva de precios, estadísticas de ventas y control de caja. Implementación de tema oscuro/claro y soporte multiidioma.",
                "Sistema de Gestión de Stock: Desarrollo de aplicación de escritorio para pequeños y medianos negocios con Python y PyQt6, facilitando la gestión de inventario, ventas, caja y clientes con una interfaz intuitiva y eficiente.",
                "Consultoría técnica y optimización de bases de datos para diversos clientes, mejorando el rendimiento y la seguridad de sus sistemas existentes.",
                "Diseño e implementación de soluciones personalizadas según las necesidades específicas de cada cliente, priorizando la usabilidad y la experiencia del usuario final."
              ]
            },
      
          ].map((exp, i) => (
            <motion.div
              key={exp.title}
              className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 transition-transform hover:scale-105 hover:shadow-cyan-700/30"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
            >
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">{exp.title}</h3>
              <p className="text-cyan-600 text-xl mb-4">{exp.company}</p>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
                {exp.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Habilidades */}
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
              className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 transition-transform hover:scale-105 hover:shadow-cyan-700/30 flex flex-col items-center"
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={index}
            >
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">{skill.category}</h3>
              <CircularProgress percentage={skill.level} />
              <p className="text-gray-300 text-base mt-2">{skill.technologies}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Educación y Certificaciones */}
      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Educación
        </motion.h2>
        <div className="flex flex-col gap-6">
          <motion.div
            className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 transition-transform hover:scale-105 hover:shadow-cyan-700/30"
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Ingeniería en Sistemas de Información</h3>
            <p className="text-cyan-600 mb-2">Universidad Tecnológica Nacional | 2019 - Presente</p>
            <p className="text-gray-300 text-lg">Formación integral en desarrollo de software, bases de datos, redes y gestión de proyectos tecnológicos.</p>
          </motion.div>
        </div>
      </section>

      {/* Metodología de Trabajo */}
      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Mi metodología
        </motion.h2>
        <motion.div
          className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 hover:scale-105 hover:shadow-cyan-700/30"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-400">1</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Descubrimiento</h3>
              <p className="text-gray-300 text-lg">Entiendo a fondo tus necesidades y objetivos para diseñar la solución perfecta.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-400">2</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Desarrollo iterativo</h3>
              <p className="text-gray-300 text-lg">Trabajo en ciclos cortos con feedback constante para asegurar que el producto evolucione según tus expectativas.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-700/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-cyan-400">3</span>
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-cyan-400">Entrega y soporte</h3>
              <p className="text-gray-300 text-lg">Implementación cuidadosa y soporte continuo para garantizar el éxito a largo plazo de tu proyecto.</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Por qué trabajar conmigo */}
      <section className="mb-16">
        <motion.h2
          className="text-4xl font-bold mb-6 text-cyan-400"
          variants={sectionTitleVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          ¿Por qué trabajar conmigo?
        </motion.h2>
        <motion.div
          className="bg-[#1a2332]/90 backdrop-blur-lg rounded-2xl shadow-2xl border border-[#233554]/50 p-8 hover:scale-105 hover:shadow-cyan-700/30"
          variants={cardVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-cyan-400">✓</span>
                </span>
                Compromiso con la calidad
              </h3>
              <p className="text-gray-300 ml-10 text-lg">
                Cada línea de código que escribo refleja mi dedicación a la excelencia y a las mejores prácticas de la industria.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-cyan-400">✓</span>
                </span>
                Comunicación transparente
              </h3>
              <p className="text-gray-300 ml-10 text-lg">
                Mantengo una comunicación clara y constante durante todo el proceso de desarrollo.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-cyan-400">✓</span>
                </span>
                Soluciones a medida
              </h3>
              <p className="text-gray-300 ml-10 text-lg">
                Desarrollo soluciones personalizadas que se adaptan perfectamente a tus necesidades específicas.
              </p>
            </div>
            <div>
              <h3 className="text-2xl text-cyan-400 font-semibold mb-2 flex items-center">
                <span className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center mr-2">
                  <span className="text-cyan-400">✓</span>
                </span>
                Enfoque en resultados
              </h3>
              <p className="text-gray-300 ml-10 text-lg">
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