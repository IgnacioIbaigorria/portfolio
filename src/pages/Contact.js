import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

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

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm(
        'service_gpg94po',
        'template_cvgv8ji',
        form.current,
        'D9CllueuoU4GrB7Lm'
    )
    .then((result) => {
        alert('Mensaje enviado con éxito!');
        form.current.reset();
    }, (error) => {
        alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
    });
  };  

  return (
    <div className="p-2 max-w-2xl mx-auto relative">
      {/* Fondo animado igual que Home.js */}
      <motion.div
        className="fixed inset-0 -z-10 bg-gradient-to-tr from-[#0a192f] via-[#112240] to-[#233554] opacity-80 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-cyan-700 bg-clip-text text-transparent leading-relaxed"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Contacto
      </motion.h1>
      <motion.p 
        className="text-xl text-center mb-8 text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        ¿Interesado en colaborar conmigo o contratar mis servicios? ¡Hablemos!
      </motion.p>
      <motion.form ref={form} onSubmit={sendEmail}
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div>
          <FormInput 
            type="text" 
            placeholder="Nombre"
            name="user_name" 
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <FormInput 
            type="email" 
            placeholder="Email"
            name="user_email"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <div>
          <FormTextarea 
            placeholder="Mensaje"
            name="message"
            whileFocus={{ scale: 1.01 }}
          />
        </div>
        <motion.button
          className="w-full py-3 px-6 bg-cyan-700 text-white rounded-lg font-semibold
                     hover:bg-cyan-600 transition-colors duration-300"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Enviar Mensaje
        </motion.button>
      </motion.form>
    </div>
  );
};

export default Contact;