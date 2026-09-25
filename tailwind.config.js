/** @type {import('tailwindcss').Config} */

// Dark-only. The palette is deliberately small: an ink ground, hairlines for
// structure, one warm signal accent, and a status green reserved for a 6px dot.
module.exports = {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Flat on purpose: nesting these under `ink` would make the classes
        // `bg-ink-inset` / `bg-ink-raised`, which is easy to get wrong.
        ink: '#0A0C0E',
        raised: '#101416',
        inset: '#161B1E',
        line: {
          DEFAULT: '#232B2F',
          soft: '#1A2124',
        },
        frost: '#E9EDED',
        muted: '#8A979B',
        signal: {
          DEFAULT: '#E3A94F',
          dim: '#7A5F2C',
        },
        live: '#6FCF97',
        // Functional only: form validation. Never decorative — reusing `signal`
        // for errors would make a wrong field look like a focused one.
        danger: '#E5484D',
      },
      fontFamily: {
        // Variable: opsz is set automatically by the browser per size, wdth is
        // pulled in per type step below.
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        sans: ['"IBM Plex Sans"', "system-ui", "-apple-system", "sans-serif"],
        mono: ['"IBM Plex Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        // NB: the width axis of the display face is set in index.css, not here —
        // Tailwind silently ignores unknown keys in these option objects.
        display: ["clamp(2.6rem, 8.6vw, 5.75rem)", { lineHeight: "0.94", letterSpacing: "-0.04em", fontWeight: "600" }],
        headline: ["clamp(1.875rem, 4.2vw, 3rem)", { lineHeight: "1.06", letterSpacing: "-0.035em", fontWeight: "600" }],
        title: ["1.5rem", { lineHeight: "1.24", letterSpacing: "-0.02em", fontWeight: "500" }],
        lead: ["clamp(1.125rem, 1.4vw, 1.3125rem)", { lineHeight: "1.6" }],
        body: ["1.0625rem", { lineHeight: "1.65" }],
        small: ["0.9375rem", { lineHeight: "1.6" }],
        // Only for real machine data and short functional tags — never as decoration.
        micro: ["0.8125rem", { lineHeight: "1.2", letterSpacing: "0.1em" }],
      },
      maxWidth: {
        measure: "68ch",
        shell: "78rem",
      },
      borderRadius: {
        sm: "2px",
        DEFAULT: "3px",
        md: "3px",
        lg: "4px",
        xl: "6px",
        "2xl": "8px",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "rule-draw": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        glow: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "0.72" },
        },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.3", transform: "scale(0.8)" },
        },
      },
      animation: {
        "rule-draw": "rule-draw 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        glow: "glow 28s ease-in-out infinite",
        "pulse-dot": "pulse-dot 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
