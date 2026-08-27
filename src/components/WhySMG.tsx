import { useState } from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

const pillars = [
  {
    number: '01',
    title: 'Business-First Thinking',
    shortTitle: 'Business First',
    description: 'We start with the business problem, then choose the technology that actually fits.',
  },
  {
    number: '02',
    title: 'End-to-End Execution',
    shortTitle: 'Connected Execution',
    description: 'From strategy and architecture to engineering, automation, and deployment — we keep the process connected.',
  },
  {
    number: '03',
    title: 'Built for Adaptability',
    shortTitle: 'Adaptable Systems',
    description: 'We design systems that can evolve with changing teams, workflows, and business needs.',
  },
];

export function WhySMG() {
  const sectionRef = useScrollProgress<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = pillars[activeIndex];

  return (
    <section ref={sectionRef} className="parallax-section why-parallax relative overflow-hidden border-y border-white/5 bg-[#101010] py-24 md:py-36" aria-labelledby="why-smg-title">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_65%,rgba(208,25,15,.11),transparent_38%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[48rem] w-[48rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.025]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
            Why Soul Media Global
          </p>
          <h2 id="why-smg-title" className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
            Built to Think Beyond the Brief.
          </h2>
          <p className="mx-auto mt-7 max-w-3xl font-sans text-base leading-7 text-gray-400 md:text-lg">
            We combine business thinking, product strategy, and technical execution to build solutions that are useful today and adaptable tomorrow.
          </p>
        </div>

        <div className="why-triad relative mx-auto mt-14 h-[650px] max-w-[980px] md:mt-20 md:h-[760px]" role="group" aria-label="Soul Media Global operating principles">
          <svg className="why-triad-lines absolute inset-0 h-full w-full" viewBox="0 0 980 760" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="why-triad-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#D0190F" stopOpacity=".12" />
                <stop offset=".5" stopColor="#ffb4a8" stopOpacity=".55" />
                <stop offset="1" stopColor="#D0190F" stopOpacity=".12" />
              </linearGradient>
            </defs>
            <path className="why-triad-path" d="M490 108 L180 606 L800 606 Z" />
            <path className="why-triad-path why-triad-path--inner" d="M490 220 L300 548 L680 548 Z" />
            <circle className="why-triad-signal why-triad-signal--one" cx="490" cy="108" r="5" />
            <circle className="why-triad-signal why-triad-signal--two" cx="180" cy="606" r="5" />
            <circle className="why-triad-signal why-triad-signal--three" cx="800" cy="606" r="5" />
          </svg>

          <div className="why-triad-core" aria-live="polite">
            <div key={active.number} className="why-triad-core-inner">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">Principle {active.number}</span>
              <strong className="mt-3 font-['Bebas_Neue'] text-3xl uppercase leading-none tracking-wide text-white md:text-4xl">{active.shortTitle}</strong>
              <p className="mt-4 max-w-[18rem] font-sans text-xs leading-5 text-gray-400 md:text-sm md:leading-6">{active.description}</p>
            </div>
          </div>

          {pillars.map((pillar, index) => (
            <button
              key={pillar.number}
              type="button"
              aria-pressed={activeIndex === index}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className={`why-triad-node why-triad-node--${index + 1} group ${activeIndex === index ? 'is-active' : ''}`}
            >
              <span className="why-triad-node-ring"><i>{pillar.number}</i></span>
              <span className="why-triad-node-copy">
                <strong>{pillar.title}</strong>
                <small>{pillar.shortTitle}</small>
              </span>
            </button>
          ))}

          <span className="why-triad-caption why-triad-caption--one">Understand</span>
          <span className="why-triad-caption why-triad-caption--two">Build</span>
          <span className="why-triad-caption why-triad-caption--three">Evolve</span>
        </div>
      </div>
    </section>
  );
}
