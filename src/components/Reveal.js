import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];
const ONCE = { once: true, margin: '-8% 0px -6% 0px' };

/**
 * Two reveal primitives, used deliberately instead of the same fade-and-slide-up
 * on every block:
 *
 *   Wipe  — a clip wipe from the left. For headings only.
 *   Blur  — opacity + a 6px blur resolving. For content blocks.
 *
 * Both fire once when the block enters the viewport, and both collapse to a plain
 * element when the visitor asks for reduced motion.
 */

export const Wipe = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const reduce = useReducedMotion();

  if (reduce) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 0 }}
      whileInView={{ clipPath: 'inset(0 0% 0 0)', opacity: 1 }}
      viewport={ONCE}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

export const Blur = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const reduce = useReducedMotion();

  if (reduce) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[Tag] || motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={ONCE}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </MotionTag>
  );
};

/**
 * The single orchestrated moment on a page: a hairline that draws itself across,
 * then the content above it settles in. Used once per page, never per section.
 */
export const RuleReveal = ({ className = '', delay = 0 }) => {
  const reduce = useReducedMotion();

  if (reduce) return <div className={`h-px w-full bg-line ${className}`} />;

  return (
    <motion.div
      className={`h-px w-full origin-left bg-line ${className}`}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    />
  );
};
