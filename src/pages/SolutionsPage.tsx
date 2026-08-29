import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent, useSiteCopy } from '../content/useContent';
import { ContentState } from '../components/ContentState';

const nodePresentation = [
  { pos: { left: '50%', top: '9%' }, line: { x2: 160, y2: 30 } },
  { pos: { left: '90.5%', top: '50%' }, line: { x2: 290, y2: 160 } },
  { pos: { left: '50%', top: '91%' }, line: { x2: 160, y2: 290 } },
  { pos: { left: '9.5%', top: '50%' }, line: { x2: 30, y2: 160 } },
];

export const SolutionsPage: React.FC = () => {
  const { solutions, status, error } = useContent();
  const pillars = solutions.map((solution, index) => ({ ...solution, ...nodePresentation[index] }));
  const [activeKey, setActiveKey] = useState('strategy');
  const active = pillars.find((p) => p.key === activeKey) ?? pillars[0];
  const intro = useSiteCopy('solutions.intro', 'Select a node to see how each capability connects to your business system — the same core capabilities behind every system we build.');
  if (status === 'loading') return <ContentState kind="loading" />;
  if (status === 'error') return <ContentState kind="error" message={error ?? undefined} />;
  if (!active || pillars.length !== nodePresentation.length) return <ContentState kind="empty" />;

  return (
    <div className="relative w-full overflow-hidden bg-[#0a0a0a] pt-20 pb-24 text-[#e5e2e1] md:pb-36">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-64 top-24 h-[36rem] w-[36rem] rounded-full bg-[#D0190F]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1100px] px-6 py-16 md:px-16">
        <div className="mb-14 border-b border-white/10 pb-10">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
            <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
            Solutions
          </p>
          <h1 className="max-w-3xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
            One System.<br />Four Connected Capabilities.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-gray-400 md:text-lg">
            {intro}
          </p>
        </div>

        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          <div className="relative mx-auto aspect-square w-full max-w-[380px]">
            <div className="solutions-ring solutions-ring--outer" aria-hidden="true" />
            <div className="solutions-ring solutions-ring--inner" aria-hidden="true" />

            <svg viewBox="0 0 320 320" className="absolute inset-0 h-full w-full" aria-hidden="true">
              {pillars.map((pillar) => (
                <line
                  key={pillar.key}
                  x1="160"
                  y1="160"
                  x2={pillar.line.x2}
                  y2={pillar.line.y2}
                  className="solutions-line"
                  stroke={activeKey === pillar.key ? '#D0190F' : 'rgba(208,25,15,.3)'}
                  strokeWidth={activeKey === pillar.key ? 2 : 1}
                />
              ))}
            </svg>

            <div className="solutions-core" aria-hidden="true">
              <span className="font-['Bebas_Neue'] text-xs leading-tight tracking-wide text-white">
                SMG<br />SYSTEM
              </span>
            </div>

            {pillars.map((pillar) => (
              <button
                key={pillar.key}
                type="button"
                aria-pressed={activeKey === pillar.key}
                onClick={() => setActiveKey(pillar.key)}
                onMouseEnter={() => setActiveKey(pillar.key)}
                onFocus={() => setActiveKey(pillar.key)}
                className="solutions-node group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 bg-transparent p-1"
                style={{ left: pillar.pos.left, top: pillar.pos.top }}
              >
                <span className={`solutions-node-dot ${activeKey === pillar.key ? 'is-active' : ''}`} />
                <span className={`whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.1em] transition-colors duration-300 ${activeKey === pillar.key ? 'text-[#ffb4a8]' : 'text-gray-600 group-hover:text-gray-400'}`}>
                  {pillar.shortTitle}
                </span>
              </button>
            ))}
          </div>

          <div key={active.key} className="solutions-panel border border-white/10 bg-[#141313] p-6 md:p-8">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#ffb4a8]">{active.numLabel}</p>
            <h2 className="mb-3 font-['Bebas_Neue'] text-2xl uppercase leading-tight tracking-wide text-white md:text-3xl">
              {active.title}
            </h2>
            <p className="mb-5 font-sans text-sm leading-6 text-gray-400 md:text-base">{active.desc}</p>
            <div className="flex flex-wrap gap-2">
              {active.chips.map((chip) => (
                <span key={chip} className="border border-white/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-gray-400">
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 border border-white/10 bg-[#141313] p-7 sm:flex-row sm:items-center md:p-9">
          <div>
            <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#ffb4a8]">See it in practice</p>
            <h3 className="font-['Bebas_Neue'] text-2xl uppercase text-white md:text-3xl">These Capabilities, Built for Real Clients</h3>
          </div>
          <Link
            to="/work"
            className="group inline-flex flex-shrink-0 items-center gap-4 border border-white/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all hover:border-[#D0190F] hover:bg-[#D0190F]/10"
          >
            View Case Studies
            <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
