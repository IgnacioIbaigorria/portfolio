import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';
import { FaLinkedin, FaEnvelope, FaPaperPlane, FaGithub } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
      toast.success("¡Mensaje enviado con éxito!");
      formEl.reset();
    } catch (err) {
      console.error(err);
      toast.error("Hubo un problema al enviar el mensaje. Intenta otra vez.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto relative pt-2 md:pt-4">
      {/* Background */}
      <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-900/40 via-slate-950/50 to-slate-950 opacity-100" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <motion.div
        className="text-center mb-8 md:mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 text-zinc-100 leading-tight">
          Contacto
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          Tengo la bandeja de entrada abierta para nuevas oportunidades, colaboraciones o proyectos.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Formulario */}
        <motion.div
          className="lg:col-span-7 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-2xl border border-zinc-800 shadow-xl"
          variants={itemVariant}
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-5 text-zinc-100">
            Enviame un mensaje
          </h2>

          <form ref={form} onSubmit={sendEmail} className="space-y-4 sm:space-y-5">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 ml-0.5">
                Nombre completo <span className="text-sky-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Tu nombre"
                name="user_name"
                required
                className="w-full px-3.5 sm:px-4 py-3 bg-zinc-950/80 border border-zinc-700/80 rounded-xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 ml-0.5">
                Correo electrónico <span className="text-sky-400">*</span>
              </label>
              <input
                type="email"
                placeholder="tu@email.com"
                name="user_email"
                required
                className="w-full px-3.5 sm:px-4 py-3 bg-zinc-950/80 border border-zinc-700/80 rounded-xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-zinc-300 mb-1.5 ml-0.5">
                Mensaje <span className="text-sky-400">*</span>
              </label>
              <textarea
                placeholder="¿En qué te puedo ayudar?"
                name="message"
                required
                rows={5}
                className="w-full px-3.5 sm:px-4 py-3 bg-zinc-950/80 border border-zinc-700/80 rounded-xl text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-colors resize-y min-h-[120px]"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full py-3.5 px-6 bg-sky-500 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all flex items-center justify-center gap-2 text-base"
            >
              {loading ? (
                <span>Enviando mensaje...</span>
              ) : (
                <>
                  <span>Enviar Mensaje</span>
                  <FaPaperPlane className="text-sm" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Canales directos */}
        <motion.div
          className="lg:col-span-5 bg-zinc-900/60 backdrop-blur-sm p-5 sm:p-7 md:p-8 rounded-2xl border border-zinc-800 flex flex-col justify-between"
          variants={itemVariant}
        >
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 text-zinc-100">
              Otras formas de conectar
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-6">
              Si preferís comunicarte directamente, podés escribirme a mi correo o agregarme en mis redes profesionales:
            </p>

            <div className="space-y-3">
              <a
                href="mailto:ignacioibaigorria@gmail.com"
                className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-200 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-950/20 transition-all group"
              >
                <div className="p-2.5 bg-zinc-900 rounded-lg text-sky-400 group-hover:scale-105 transition-transform flex-shrink-0">
                  <FaEnvelope className="text-lg" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">Email</div>
                  <div className="font-medium text-sm sm:text-base truncate">ignacioibaigorria@gmail.com</div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/ignacio-ibaigorria-08a9a9298/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-200 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-950/20 transition-all group"
              >
                <div className="p-2.5 bg-zinc-900 rounded-lg text-sky-400 group-hover:scale-105 transition-transform flex-shrink-0">
                  <FaLinkedin className="text-lg" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">LinkedIn</div>
                  <div className="font-medium text-sm sm:text-base truncate">ignacio-ibaigorria</div>
                </div>
              </a>

              <a
                href="https://github.com/IgnacioIbaigorria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 p-3.5 sm:p-4 bg-zinc-950/60 border border-zinc-800 rounded-xl text-zinc-200 hover:text-sky-400 hover:border-sky-500/40 hover:bg-sky-950/20 transition-all group"
              >
                <div className="p-2.5 bg-zinc-900 rounded-lg text-sky-400 group-hover:scale-105 transition-transform flex-shrink-0">
                  <FaGithub className="text-lg" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">GitHub</div>
                  <div className="font-medium text-sm sm:text-base truncate">IgnacioIbaigorria</div>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-5 border-t border-zinc-800/80">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Respondo habitualmente en menos de 24 hs.</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;