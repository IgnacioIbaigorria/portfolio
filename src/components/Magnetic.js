import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Leans a primary CTA toward the cursor and presses it on tap. The lean is
 * clamped so the button never runs away from the cursor, and it only answers
 * to a real mouse — touch taps get the button exactly where it was drawn.
 *
 * Under reduced motion it is a plain wrapper: the lean is decoration on top
 * of a button that already works, so it goes first.
 */
const Magnetic = ({ children, strength = 0.3, className = '' }) => {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const spring = { stiffness: 260, damping: 22, mass: 0.5 };
  const sx = useSpring(x, spring);
  const sy = useSpring(y, spring);

  if (reduce) return <div className={`inline-block ${className}`}>{children}</div>;

  const clamp = (v, max) => Math.max(-max, Math.min(max, v));

  const onPointerMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(clamp((e.clientX - rect.left - rect.width / 2) * strength, 10));
    y.set(clamp((e.clientY - rect.top - rect.height / 2) * strength, 8));
  };

  const onPointerLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      style={{ x: sx, y: sy }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;
