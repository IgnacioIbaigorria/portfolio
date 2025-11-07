// --- Importa los íconos ---
import {
  SiReact, SiNextdotjs, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss,
  SiNodedotjs, SiExpress, SiSpringboot, SiPhp, SiPython, SiDjango, SiLaravel,
  SiPostgresql, SiMysql, SiMongodb, SiFirebase, SiSupabase, SiFlutter, SiExpo,
  SiGit, SiDocker, SiAmazonwebservices as SiAmazonaws, SiGitlab, SiGithub, SiFigma, SiAdobe, SiJira, SiBootstrap, SiPhpmyadmin, SiSqlite, SiChartdotjs, SiI18Next, SiShadcnui, SiPrisma
} from 'react-icons/si';

// --- Crea un mapa de búsqueda ---
export const techInfoMap = {
  'javascript': { icon: <SiJavascript />, color: "#F7DF1E" },
  'bootstrap': { icon: <SiBootstrap />, color: "#7952B3" },
  'php': { icon: <SiPhp />, color: "#777BB4" },
  'phpmyadmin': { icon: <SiPhpmyadmin />, color: "#FF9900" },
  'react native': { icon: <SiReact />, color: "#61DAFB" },
  'expo': { icon: <SiExpo />, color: "#FFFFFF" },
  'firebase': { icon: <SiFirebase />, color: "#FFCA28" },
  'typescript': { icon: <SiTypescript />, color: "#3178C6" },
  'react': { icon: <SiReact />, color: "#61DAFB" },
  'tailwind css': { icon: <SiTailwindcss />, color: "#06B6D4" },
  'node.js': { icon: <SiNodedotjs />, color: "#5FA04E" },
  'next.js': { icon: <SiNextdotjs />, color: "#FFFFFF" },
  'postgresql': { icon: <SiPostgresql />, color: "#4169E1" },
  'prisma': { icon: <SiPrisma />, color: "#2D3748" },
  'python': { icon: <SiPython />, color: "#3776AB" },
  'pyqt6': { icon: null, color: "#44b78b" }, // Sin logo, pero con color
  'sqlite': { icon: <SiSqlite />, color: "#003B57" },
  'firebase database': { icon: <SiFirebase />, color: "#FFCA28" },
  'chart.js': { icon: <SiChartdotjs />, color: "#FF6384" },
  'i18next': { icon: <SiI18Next />, color: "#26A69A" },
  'supabase': { icon: <SiSupabase />, color: "#3ECF8E" },
  'shadcn ui': { icon: <SiShadcnui />, color: "#FFFFFF" },
  'django': { icon: <SiDjango />, color: "#092E20" },
  'laravel': { icon: <SiLaravel />, color: "#FF2D20" },
  'mysql': { icon: <SiMysql />, color: "#4479A1" },
  'mongodb': { icon: <SiMongodb />, color: "#47A248" },
  'flutter': { icon: <SiFlutter />, color: "#02569B" },
  'git': { icon: <SiGit />, color: "#F05032" },
  'docker': { icon: <SiDocker />, color: "#2496ED" },
  'amazon aws': { icon: <SiAmazonaws />, color: "#FF9900" },
  'github': { icon: <SiGithub />, color: "#171515" },
  'spring boot': { icon: <SiSpringboot />, color: "#6DB33F" },
  'gitlab': { icon: <SiGitlab />, color: "#FCA121" },
  'express': { icon: <SiExpress />, color: "#FFFFFF" },
  'figma': { icon: <SiFigma />, color: "#F24E1E" },
  'html5': { icon: <SiHtml5 />, color: "#E34F26" },
  'css3': { icon: <SiCss3 />, color: "#1572B6" },
};

// --- Función de ayuda para obtener la información ---
export const getTechInfo = (techName) => {
  const info = techInfoMap[techName.toLowerCase()];
  if (!info) {
    return { name: techName, icon: null, color: "#9ca3af" }; // Color gris por defecto
  }
  return { name: techName, ...info };
};