import { useEffect } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Keeps Tab inside an open overlay. Both the mobile drawer and the project
 * gallery are real modals, so focus has to land inside them and cycle there
 * instead of wandering off to the page underneath.
 *
 * The caller is still responsible for Escape and for returning focus.
 */
export const useFocusTrap = (active, containerRef) => {
  useEffect(() => {
    if (!active) return undefined;

    const node = containerRef.current;
    if (!node) return undefined;

    const items = () => Array.from(node.querySelectorAll(FOCUSABLE)).filter((el) => el.offsetParent !== null);

    items()[0]?.focus();

    const onKey = (e) => {
      if (e.key !== 'Tab') return;

      const focusable = items();
      if (focusable.length === 0) return;

      const index = focusable.indexOf(document.activeElement);

      if (e.shiftKey && index <= 0) {
        e.preventDefault();
        focusable[focusable.length - 1].focus();
      } else if (!e.shiftKey && index === focusable.length - 1) {
        e.preventDefault();
        focusable[0].focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [active, containerRef]);
};
