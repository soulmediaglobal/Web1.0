import { useState } from 'react';
import { Link } from 'react-router-dom';
import strategyVisual from '../assets/services/strategy.png';
import productVisual from '../assets/services/product.png';
import aiIntegrationVisual from '../assets/services/ai-integration.png';
import cloudPlatformVisual from '../assets/services/cloud-platform.png';

const capabilities = [
  {
    title: 'Digital Strategy & Product Architecture',
    shortTitle: 'Strategy',
    description: 'Define the right product direction, system structure, and roadmap before development begins.',
    signal: 'Direction / Structure / Roadmap',
    node: '01',
    image: strategyVisual,
    imageAlt: 'Abstract system architecture and strategic network visualization',
  },
  {
    title: 'Custom Software & Enterprise Applications',
    shortTitle: 'Product',
    description: 'Build web applications, internal systems, platforms, dashboards, and business-critical tools.',
    signal: 'Applications / Platforms / Tools',
    node: '02',
    image: productVisual,
    imageAlt: 'Abstract modular software and application platform visualization',
  },
  {
    title: 'AI, Automation & System Integration',
    shortTitle: 'Intelligence',
    description: 'Connect systems, automate workflows, and apply AI where it creates real operational value.',
    signal: 'AI / Workflows / Integration',
    node: '03',
    image: aiIntegrationVisual,
    imageAlt: 'Abstract intelligent data flow and system integration visualization',
  },
  {
    title: 'Cloud & Platform Engineering',
    shortTitle: 'Infrastructure',
    description: 'Design reliable infrastructure, deployment environments, and scalable technical foundations.',
    signal: 'Cloud / Deployment / Scale',
    node: '04',
    image: cloudPlatformVisual,
    imageAlt: 'Abstract distributed cloud infrastructure and platform visualization',
  },
];

export function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];

  return (
    <section id="services" className="relative w-full overflow-hidden border-y border-white/5 bg-[#0e0e0e] py-24 md:py-36" aria-labelledby="services-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="pointer-events-none absolute right-[-20rem] top-[-16rem] h-[50rem] w-[50rem] rounded-full bg-[#D0190F]/10 blur-[170px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
              <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
              What We Do
            </p>
            <h2 id="services-title" className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
              From Strategy to<br />Scalable Systems.
            </h2>
          </div>
          <p className="max-w-xl font-sans text-base leading-7 text-gray-400 md:text-lg lg:col-span-5 lg:pl-10">
            We help businesses define, build, and scale digital systems across product, engineering, automation, and infrastructure.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 overflow-hidden border border-white/10 bg-[#111]/80 lg:mt-20 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {capabilities.map((capability, index) => {
              const isActive = activeIndex === index;
              return (
                <button
                  key={capability.title}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className={`group relative grid w-full grid-cols-[3rem_1fr_auto] items-center gap-4 border-b border-white/10 px-5 py-7 text-left transition-all duration-500 last:border-b-0 lg:px-8 lg:py-9 ${isActive ? 'bg-[#1b1717]' : 'bg-transparent hover:bg-white/[0.025]'}`}
                >
                  <span className={`font-mono text-xs transition-colors ${isActive ? 'text-[#ffb4a8]' : 'text-gray-600'}`}>
                    {capability.node}
                  </span>
                  <span className={`font-['Bebas_Neue'] text-2xl uppercase leading-tight tracking-wide transition-all duration-300 md:text-4xl ${isActive ? 'translate-x-2 text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                    {capability.title}
                  </span>
                  <span className={`text-xl transition-all duration-300 ${isActive ? 'translate-x-0 text-[#D0190F]' : '-translate-x-2 text-white/10'}`}>→</span>
                  <span className={`absolute bottom-0 left-0 h-px bg-[#D0190F] transition-all duration-500 ${isActive ? 'w-full' : 'w-0'}`} />
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[520px] overflow-hidden border-t border-white/10 bg-[#0b0b0b] lg:col-span-5 lg:border-l lg:border-t-0">
            <div className="services-system-map absolute left-1/2 top-[42%] h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true">
              <div className="services-orbit services-orbit--outer" />
              <div className="services-orbit services-orbit--middle" />
              <div className="services-orbit services-orbit--inner" />
              <div key={active.node} className="services-visual-image">
                <img src={active.image} alt={active.imageAlt} />
              </div>
              <div className="services-core">
                <span>{active.node}</span>
              </div>
              {capabilities.map((capability, index) => (
                <div key={capability.node} className={`services-node services-node--${index + 1} ${activeIndex === index ? 'is-active' : ''}`}>
                  <i />
                  <span>{capability.shortTitle}</span>
                </div>
              ))}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 360 360">
                <line className="services-connection" x1="180" y1="180" x2="180" y2="36" />
                <line className="services-connection" x1="180" y1="180" x2="324" y2="180" />
                <line className="services-connection" x1="180" y1="180" x2="180" y2="324" />
                <line className="services-connection" x1="180" y1="180" x2="36" y2="180" />
              </svg>
            </div>

            <div key={active.node} className="services-active-copy absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#101010]/90 p-6 backdrop-blur-md md:p-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#ffb4a8]">{active.signal}</p>
              <p className="mt-3 font-sans text-sm leading-6 text-gray-400 md:text-base">{active.description}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-end">
          <Link to="/solutions" className="group inline-flex items-center gap-5 border border-white/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all hover:border-[#D0190F] hover:bg-[#D0190F]/10">
            Explore Solutions
            <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
