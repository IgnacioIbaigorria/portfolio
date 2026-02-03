import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';

const FormInput = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: #18181b; /* Zinc 900 */
  border: 1px solid #27272a; /* Zinc 800 */
  border-radius: 0.5rem;
  color: #fafafa; /* Zinc 50 */
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0ea5e9; /* Sky 500 */
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
    background: #09090b; /* Zinc 950 */
  }
`;

const FormTextarea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  background: #18181b; /* Zinc 900 */
  border: 1px solid #27272a; /* Zinc 800 */
  border-radius: 0.5rem;
  color: #fafafa;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0ea5e9;
    box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
    background: #09090b;
  }
`;

const FormButton = styled(motion.button)`
  width: 100%;
  padding: 0.75rem 1.5rem;
  background-color: #0ea5e9; // Sky 500
  color: white;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    background-color: #0284c7; // Sky 600
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
    <div className="p-4 max-w-4xl mx-auto relative pt-2 md:pt-2">
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/50 to-slate-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>
      <motion.h1
        className="text-5xl font-bold mb-4 text-center text-zinc-100 leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contacto
      </motion.h1>

      <motion.p
        className="text-xl text-center mb-12 text-zinc-400"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Tengo la bandeja de entrada abierta para nuevas oportunidades y colaboraciones.
        <br />
        No dudes en escribirme.
      </motion.p>

      <motion.div
        className="grid md:grid-cols-2 md:gap-16 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6"
          variants={columnVariant}
        >
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300 ml-1">Nombre</label>
            <FormInput
              type="text"
              placeholder="Tu nombre"
              name="user_name"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300 ml-1">Email</label>
            <FormInput
              type="email"
              placeholder="tu@email.com"
              name="user_email"
              required
              whileFocus={{ scale: 1.01 }}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-zinc-300 ml-1">Mensaje</label>
            <FormTextarea
              placeholder="Escribe tu mensaje aquí..."
              name="message"
              whileFocus={{ scale: 1.01 }}
              required
            />
          </div>

          <FormButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar Mensaje'}
          </FormButton>
        </motion.form>

        <motion.div
          className="mt-12 md:mt-0 bg-zinc-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-zinc-800"
          variants={columnVariant}
        >
          <h2 className="text-2xl font-bold mb-6 text-zinc-100">
            Otras formas de conectar
          </h2>
          <p className="text-zinc-400 text-lg mb-8">
            Si prefieres no usar formularios, puedes encontrarme directamente en mis redes o correo:
          </p>
          <div className="space-y-4">
            <a
              href="mailto:ignacioibaigorria@gmail.com"
              className="flex items-center gap-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl
                         text-zinc-300 hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-900/10 transition-all duration-300 group"
            >
              <div className="p-2 bg-zinc-900 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <FaEnvelope className="text-xl text-sky-500" />
              </div>
              <span className="font-medium">ignacioibaigorria@gmail.com</span>
            </a>
            <a
              href="https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-zinc-800/50 border border-zinc-700 rounded-xl
                         text-zinc-300 hover:text-sky-400 hover:border-sky-500/30 hover:bg-sky-900/10 transition-all duration-300 group"
            >
              <div className="p-2 bg-zinc-900 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                <FaLinkedin className="text-xl text-sky-500" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Contact;