import React from 'react';

/**
 * The site's substrate. Rendered once by App, behind everything.
 *
 * Three layers, cheapest first: ink ground, a faint engineering grid masked to the
 * top of the page, a slow signal glow, and film grain. The glow drift is the only
 * ambient motion in the build; index.css stops it for reduced-motion visitors.
 *
 * The grain is inlined as an SVG data URI so the page makes no third-party
 * request for texture.
 */

const GRID =
  'linear-gradient(to right, #232B2F 1px, transparent 1px), linear-gradient(to bottom, #232B2F 1px, transparent 1px)';

const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const AnimatedBackground = () => (
  <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute inset-0 bg-ink" />

    <div
      className="absolute inset-0 opacity-70"
      style={{
        backgroundImage: GRID,
        backgroundSize: '72px 72px',
        maskImage: 'radial-gradient(ellipse 90% 62% at 50% 0%, #000 0%, transparent 76%)',
        WebkitMaskImage: 'radial-gradient(ellipse 90% 62% at 50% 0%, #000 0%, transparent 76%)',
      }}
    />

    <div
      className="absolute -top-48 left-1/2 h-[44rem] w-[44rem] -translate-x-1/2 animate-glow rounded-full bg-signal/[0.07] blur-[140px]"
      style={{ willChange: 'opacity' }}
    />

    <div
      className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
      style={{ backgroundImage: NOISE, backgroundSize: '180px 180px' }}
    />
  </div>
);

export default AnimatedBackground;
