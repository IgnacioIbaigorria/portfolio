import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import emailjs from '@emailjs/browser';

const FormInput = styled(motion.input)`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const FormTextarea = styled(motion.textarea)`
  width: 100%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  color: white;
  min-height: 150px;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
  }
`;

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  
    emailjs.sendForm(
        'service_gpg94po', // Reemplaza con tu Service ID
        'template_cvgv8ji', // Reemplaza con tu Template ID
        form.current,
        'D9CllueuoU4GrB7Lm' // Reemplaza con tu Public Key
    )
    .then((result) => {
        alert('Mensaje enviado con éxito!');
        form.current.reset(); // Limpiar el formulario
    }, (error) => {
        alert('Hubo un problema al enviar el mensaje. Inténtalo de nuevo.');
    });
  };  

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <motion.h1 
        className="text-5xl font-bold mb-8 text-center"
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
          className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg font-semibold
                     hover:bg-blue-600 transition-colors duration-300"
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