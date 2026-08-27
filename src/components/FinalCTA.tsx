import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';

export function FinalCTA() {
  const sectionRef = useScrollProgress<HTMLElement>();
  return (
    <section ref={sectionRef} className="parallax-section final-cta cta-parallax relative isolate overflow-hidden bg-[#D0190F] py-24 text-white md:py-36" aria-labelledby="final-cta-title">
      <div className="final-cta-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="final-cta-orbit final-cta-orbit--one pointer-events-none" aria-hidden="true" />
      <div className="final-cta-orbit final-cta-orbit--two pointer-events-none" aria-hidden="true" />
      <div className="final-cta-signal pointer-events-none" aria-hidden="true"><i /></div>
      <div className="pointer-events-none absolute -bottom-16 -right-4 font-['Bebas_Neue'] text-[15rem] leading-none text-black/10 md:text-[27rem]" aria-hidden="true">SMG</div>

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <p className="mb-7 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
          Start a Conversation
        </p>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <h2 id="final-cta-title" className="max-w-6xl font-['Bebas_Neue'] text-6xl uppercase leading-[0.86] tracking-wide text-white md:text-8xl xl:text-[8rem]">
              Have a Complex<br />Problem Worth Solving?
            </h2>
          </div>

          <div className="relative z-10 lg:col-span-4">
            <p className="max-w-md font-sans text-base leading-7 text-white/75 md:text-lg">
              Let’s turn it into a clear, scalable digital solution built around your business.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Link to="/contact" className="group inline-flex items-center justify-between gap-6 border border-white bg-white px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-[#620700] transition-all hover:bg-transparent hover:text-white">
                Start a Project
                <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
              </Link>
              <Link to="/contact" className="group inline-flex items-center justify-between gap-6 border border-white/45 px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-white transition-all hover:border-white hover:bg-white/10">
                Contact Us
                <span className="transition-transform duration-300 group-hover:translate-x-2">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
