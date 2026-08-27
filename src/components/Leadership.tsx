import { useState } from 'react';
import { Link } from 'react-router-dom';
import tomyImg from '../assets/tomy.png';
import rayhanImg from '../assets/ray.png';

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
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="founders" className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36" aria-labelledby="founders-title">
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

        <div className="mt-16 flex flex-col gap-4 md:mt-24 lg:h-[720px] lg:flex-row">
          {founders.map((founder, index) => {
            const isActive = activeIndex === index;
            return (
              <article
                key={founder.name}
                role="button"
                tabIndex={0}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    setActiveIndex(index);
                  }
                }}
                className={`founder-panel group relative min-h-[570px] cursor-pointer overflow-hidden border border-white/10 bg-[#171717] transition-[flex] duration-700 ease-out lg:min-h-0 ${isActive ? 'lg:flex-[1.15]' : 'lg:flex-[0.85]'}`}
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className={`absolute inset-0 h-full w-full ${founder.position} object-cover grayscale transition-all duration-700 ${isActive ? 'opacity-85 grayscale-0' : 'opacity-45'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/38 to-black/5" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/70 via-[#080808]/15 to-transparent" />

                <div className="absolute left-0 top-0 flex w-full items-center justify-between p-6 md:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">Founder {founder.number}</span>
                  <span className={`h-2 w-2 rounded-full transition-all duration-500 ${isActive ? 'bg-[#D0190F] shadow-[0_0_18px_#D0190F]' : 'border border-white/30'}`} />
                </div>

                <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                  <p className={`mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb4a8] transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0 lg:opacity-0'}`}>
                    {founder.role}
                  </p>
                  <h3 className={`font-['Bebas_Neue'] uppercase leading-[0.88] tracking-wide text-white transition-all duration-700 ${isActive ? 'text-6xl md:text-8xl' : 'text-5xl md:text-6xl'}`}>
                    {founder.name}
                  </h3>
                  <div className={`overflow-hidden transition-all duration-700 ${isActive ? 'mt-6 max-h-40 opacity-100' : 'mt-0 max-h-0 opacity-0'}`}>
                    <p className="max-w-2xl border-l border-[#D0190F] pl-5 font-sans text-sm leading-6 text-gray-300 md:text-base md:leading-7">
                      {founder.description}
                    </p>
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 h-1 bg-[#D0190F] transition-all duration-700 ${isActive ? 'w-full' : 'w-0'}`} />
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
