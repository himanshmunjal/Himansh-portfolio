import { useEffect, useState, type RefObject } from 'react';

/**
 * Pointer position in viewport coordinates, for parallax / card-tilt effects.
 *
 * Listens only while `ref` is on screen, updates at most once per animation
 * frame, and does nothing on touch devices or for reduced-motion users — so a
 * section is not re-rendered on every mouse move of the whole page.
 */
export const useMousePosition = (ref: RefObject<Element>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf = 0;
    let latest = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      latest = { x: e.clientX, y: e.clientY };
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setPosition(latest);
      });
    };

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener('mousemove', onMove, { passive: true });
      } else {
        window.removeEventListener('mousemove', onMove);
      }
    });
    io.observe(el);

    return () => {
      io.disconnect();
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return position;
};
