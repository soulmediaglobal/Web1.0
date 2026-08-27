import { useState } from 'react';
import { Link } from 'react-router-dom';
import tomyImg from '../assets/tomy.png';
import rayhanImg from '../assets/ray.png';
import { useScrollProgress } from '../hooks/useScrollProgress';

const founders = [
  {
    number: '01',
    name: 'Rayhan',
    role: 'Founder — Product & Technology',
    description: 'Focused on digital products, system architecture, and turning complex business needs into scalable technology.',
    image: rayhanImg,
    position: 'object-center lg:object-[center_12%]',
  },
  {
    number: '02',
    name: 'Tomy Galih Prasetyo',
    role: 'Founder — Business & Marketing',
    description: 'Focused on business execution, marketing strategy, and building systems that support real-world growth.',
    image: tomyImg,
    position: 'object-center lg:object-[center_12%]',
  },
];

export function Leadership() {
  const sectionRef = useScrollProgress<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} id="founders" className="parallax-section founders-parallax relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36" aria-labelledby="founders-title">
      <div className="pointer-events-none absolute left-[-12rem] top-1/4 h-[34rem] w-[34rem] rounded-full bg-[#D0190F]/8 blur-[150px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
              <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
              Founders
            </p>
            <h2 id="founders-title" className="max-w-5xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
              Built by Operators,<br />Product Thinkers,<br />and Technologists.
            </h2>
          </div>
          <p className="max-w-xl font-sans text-base leading-7 text-gray-400 md:text-lg lg:col-span-4">
            Soul Media Global is led by founders with hands-on experience across business operations, digital products, and technology execution.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:mt-24 lg:grid-cols-2">
          {founders.map((founder, index) => {
            const isActive = activeIndex === index;
            return (
              <article
                key={founder.name}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onMouseEnter={() => {
                  if (window.matchMedia('(hover: hover)').matches) setActiveIndex(index);
                }}
                onMouseLeave={() => {
                  if (window.matchMedia('(hover: hover)').matches) setActiveIndex(null);
                }}
                onFocus={() => setActiveIndex(index)}
                onBlur={() => setActiveIndex(null)}
                onClick={() => {
                  if (!window.matchMedia('(hover: hover)').matches) setActiveIndex(isActive ? null : index);
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveIndex(isActive ? null : index);
                  }
                }}
                className="founder-panel group cursor-pointer overflow-hidden border border-white/10 bg-[#111] transition-colors duration-500 hover:border-white/20 focus-visible:border-[#D0190F] focus-visible:outline-none"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b] md:aspect-[5/4] lg:aspect-[4/5]">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    loading="lazy"
                    decoding="async"
                    className={`founder-image h-full w-full ${founder.position} object-cover grayscale transition-[filter,opacity] duration-700 opacity-75 group-hover:opacity-90 group-hover:grayscale-0`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
                  <span className="absolute left-6 top-6 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8] md:left-8 md:top-8">Founder {founder.number}</span>
                </div>

                <div className="border-t border-white/10 p-7 md:p-9">
                  <h3 className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.9] tracking-wide text-white md:text-6xl">
                    {founder.name}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-500 ease-out ${isActive ? 'mt-6 max-h-64 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}>
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb4a8]">{founder.role}</p>
                    <p className="max-w-2xl border-l border-[#D0190F] pl-5 font-sans text-sm leading-6 text-gray-400 md:text-base md:leading-7">
                      {founder.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex justify-end">
          <Link to="/about" className="group inline-flex items-center gap-5 border border-white/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all hover:border-[#D0190F] hover:bg-[#D0190F]/10">
            Meet the Founders
            <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
