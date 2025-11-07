import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
// --- MEJORA: Importar iconos para los enlaces alternativos ---
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

// --- Inputs y Textarea (sin cambios) ---
const FormInput = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: rgba(26, 35, 50, 0.92);
  border: 1.5px solid #233554;
  border-radius: 0.5rem;
  color: #e0f2fe;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px #38bdf8;
  }
`;

const FormTextarea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  background: rgba(26, 35, 50, 0.92);
  border: 1.5px solid #233554;
  border-radius: 0.5rem;
  color: #e0f2fe;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px #38bdf8;
  }
`;

// --- MEJORA 4: Botón con styled-components para consistencia ---
const FormButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #0e7490; // bg-cyan-700
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0e94b8; // hover:bg-cyan-600
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// --- MEJORA 5: Variantes de animación para las columnas ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Anima los hijos con 0.2s de diferencia
    },
  },
};

const columnVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};


const Contact = () => {
  const form = useRef();
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    // ... tu función sendEmail (sin cambios) ...
    e.preventDefault();
    const formEl = form.current;
    const formData = new FormData(formEl);
    const name = formData.get("user_name")?.trim();
    const email = formData.get("user_email")?.trim();
    const message = formData.get("message")?.trim();

    if (!name || !email || !message) {
      toast.error("Por favor completa todos los campos obligatorios.");
      return;
    }

    setLoading(true);
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE,
        formEl,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLICKEY
      );
      toast.success("Mensaje enviado con éxito!");
      formEl.reset();
    } catch (err) {
      console.error(err);
      toast.error("Hubo un problema al enviar el mensaje. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // --- MEJORA 1: Aumentado el max-w para el layout de 2 columnas ---
    <div className="p-4 max-w-4xl mx-auto relative">
      {/* Fondo animado (sin cambios) */}
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#0a192f] via-[#112240] to-[#233554] opacity-80 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.h1 
        className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contacto
      </motion.h1>
      
      {/* --- MEJORA 3: Texto (CTA) más personal --- */}
      <motion.p 
        className="text-xl text-center mb-12 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Tengo la bandeja de entrada abierta para nuevas oportunidades y colaboraciones.
        <br />
        No dudes en escribirme.
      </motion.p>
      
      {/* --- MEJORA 1 & 5: Contenedor de 2 columnas con animación "stagger" --- */}
      <motion.div 
        className="grid md:grid-cols-2 md:gap-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* --- Columna Izquierda: El Formulario --- */}
        <motion.form 
          ref={form} 
          onSubmit={sendEmail}
          className="space-y-6"
          variants={columnVariant} // Animación de hijo
        >
          <div>
            <FormInput 
              type="text" 
              placeholder="Nombre"
              name="user_name" 
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          <div>
            <FormInput 
              type="email" 
              placeholder="Email"
              name="user_email"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          <div>
            <FormTextarea 
              placeholder="Mensaje"
              name="message"
              whileFocus={{ scale: 1.01 }}
              required
            />
          </div>
          
          {/* --- MEJORA 4: Usando el botón de styled-components --- */}
          <FormButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </FormButton>
        </motion.form>

        {/* --- MEJORA 2: Columna Derecha: Contacto Alternativo --- */}
        <motion.div 
          className="mt-12 md:mt-0"
          variants={columnVariant} // Animación de hijo
        >
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">
            Otras formas de conectar
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            Si prefieres no usar formularios, puedes encontrarme aquí:
          </p>
          <div className="space-y-4">
            <a 
              href="mailto:ignacioibaigorria@gmail.com"
              className="flex items-center gap-4 p-4 bg-slate-800/70 border border-[#233554] rounded-lg
                         text-gray-200 hover:text-cyan-400 hover:border-cyan-600 transition-all duration-300"
            >
              <FaEnvelope className="text-2xl text-cyan-500" />
              <span className="font-medium">ignacioibaigorria@gmail.com</span>
            </a>
            <a 
              href="https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-slate-800/70 border border-[#233554] rounded-lg
                         text-gray-200 hover:text-cyan-400 hover:border-cyan-600 transition-all duration-300"
            >
              <FaLinkedin className="text-2xl text-cyan-500" />
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Contact;