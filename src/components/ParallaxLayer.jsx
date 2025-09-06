import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxLayer = ({ children, speed = 0.2, className = '', style = {}, maxShift = 30 }) => {
  const { scrollYProgress } = useScroll();
  const [reduced, setReduced] = useState(false);
  const [enabled, setEnabled] = useState(true);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onReduce = () => setReduced(mq.matches);
    onReduce();
    if (mq.addEventListener) mq.addEventListener('change', onReduce);
    else mq.addListener(onReduce);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onReduce);
      else mq.removeListener(onReduce);
    };
  }, []);

  // desactivar en pantallas pequeñas
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    const onMatch = () => setEnabled(!mq.matches);
    onMatch();
    if (mq.addEventListener) mq.addEventListener('change', onMatch);
    else mq.addListener(onMatch);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', onMatch);
      else mq.removeListener(onMatch);
    };
  }, []);

  // --- Llamar al Hook useTransform SIEMPRE (no condicionalmente) ---
  const endShift = -maxShift * speed; // ej: -30 * 0.2 = -6 (%)
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${endShift}%`], { clamp: false });

  // Si reducido o no habilitado -> usar valor estático '0%' (pero sin romper el orden de Hooks)
  const translateYValue = (reduced || !enabled) ? '0%' : y;

  return (
    <motion.div
      className={className}
      style={{ translateY: translateYValue, willChange: 'transform', pointerEvents: 'none', ...style }}
      aria-hidden="true"
    >
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;
