import React from 'react';
import { FaCode, FaMobile, FaDatabase } from 'react-icons/fa';

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
      technologies: "Node.js, PHP, Python, Next.js, Django, Laravel"
    },
    {
      category: "Bases de Datos",
      level: 80,
      technologies: "MySQL, PostgreSQL, MongoDB, Firebase"
    },
    {
      category: "Desarrollo Móvil",
      level: 90,
      technologies: "React Native, Expo, Android Studio"
    },
    {
      category: "Herramientas y Otros",
      level: 80,
      technologies: "Git, Docker, AWS, Figma, Metodologías Ágiles"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <section className="mb-12">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent leading-relaxed">
          Ignacio Ibaigorria
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Ingeniero en Sistemas de Información en formación y desarrollador Full Stack apasionado 
          por crear experiencias digitales excepcionales. Con más de 3 años transformando ideas 
          en soluciones tecnológicas innovadoras, combino creatividad y expertise técnico para 
          desarrollar aplicaciones web y móviles que marcan la diferencia.
          <br />
          <span className="mt-4 block">
            Cuando no estoy programando, dedico mi tiempo a mis dos grandes pasiones: 
            el cuidado de animales y la exploración musical.
          </span>
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 
          <div className="p-6 bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-slate-900/80">
            <FaCode className="text-3xl text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Desarrollo Web</h3>
            <p className="text-gray-300">
              Transformo ideas en experiencias web cautivadoras, combinando diseño intuitivo con tecnologías de vanguardia. Desarrollo sitios web dinámicos y responsivos que no solo destacan visualmente, sino que también ofrecen una experiencia de usuario excepcional.
            </p>
            </div>
          <div className="p-6 bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-slate-900/80">
            <FaMobile className="text-3xl text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Desarrollo Móvil</h3>
            <p className="text-gray-300">Creo aplicaciones móviles innovadoras que conectan con los usuarios. Desde apps nativas hasta soluciones multiplataforma, desarrollo experiencias móviles fluidas y potentes que destacan en las tiendas de aplicaciones y cautivan a los usuarios.</p>
          </div>
          <div className="p-6 bg-slate-900/60 backdrop-blur-md rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 hover:bg-slate-900/80">
            <FaDatabase className="text-3xl text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Desarrollo y mantenimiento de bases de datos</h3>
            <p className="text-gray-300">Diseño e implemento arquitecturas de datos robustas y escalables. Especializado en soluciones SQL y NoSQL, optimizo el rendimiento y garantizo la seguridad de los datos, construyendo los cimientos sólidos que tu aplicación necesita para crecer.</p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Experiencia Profesional</h2>
        <div className="bg-slate-900/60 backdrop-blur-md p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Ingeniero de Software</h3>
          <p className="text-blue-400 mb-4">Servicold SAS | Marzo 2024 - Presente</p>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Desarrollo de sitio web con landing page, sistema de usuarios y sensores permitiendo la visualización en vivo de los sensores, utilizando JavaScript, Bootstrap, PHP y MySQL.</li>
            <li>Desarrollo de aplicación móvil multiplataforma con sistema de usuarios y sensores, replicando las funciones del sitio web.</li>
            <li>Automatización de los sensores de la empresa mediante Arduino con C++.</li>
            {/* Aquí puedes agregar más detalles específicos */}
          </ul>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-4xl font-bold mb-6 text-blue-400">Habilidades</h2>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div key={index} className="bg-slate-900/60 backdrop-blur-md p-6 rounded-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between mb-2">
                <h3 className="text-xl font-semibold">{skill.category}</h3>
                <span className="text-blue-400">{skill.level}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2.5 mb-3">
                <div 
                  className="bg-gradient-to-r from-blue-400 to-cyan-300 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <p className="text-gray-300 text-sm">{skill.technologies}</p>
            </div>
          ))}
        </div>
      </section>


    </div>
  );
};

export default Home;