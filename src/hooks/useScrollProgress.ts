import { useEffect, useRef } from 'react';

export function useScrollProgress<T extends HTMLElement>(mode: 'journey' | 'exit' = 'journey') {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const progress = motion.matches ? 0.5 : mode === 'exit'
        ? Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height * .72)))
        : Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      element.style.setProperty('--scroll-progress', progress.toFixed(4));
      element.style.setProperty('--scroll-shift', ((progress - 0.5) * 2).toFixed(4));
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };

    update();
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    motion.addEventListener('change', requestUpdate);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', requestUpdate);
      window.removeEventListener('resize', requestUpdate);
      motion.removeEventListener('change', requestUpdate);
    };
  }, [mode]);

  return ref;
}
