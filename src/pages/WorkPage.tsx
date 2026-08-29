import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentState } from '../components/ContentState';
import { useContent, useSiteCopy } from '../content/ContentProvider';

const trustedBy = [
  'Sampoerna',
  'Telkomsel',
  'Angkasa Pura',
  'Dompet Dhuafa',
  'Agung Podomoro Land',
  'Perumnas',
  'Asia Pacific Fibers',
];

export function WorkPage() {
  const { caseStudies, status, error } = useContent();
  const [activeFilter, setActiveFilter] = useState('all');
  const intro = useSiteCopy('work.intro', 'A record of platforms, command centers, and infrastructure delivered for government, banking, and enterprise clients across Indonesia.');
  const filters = useMemo(() => [{ key: 'all', label: 'All Work' }, ...Array.from(new Set(caseStudies.flatMap((item) => item.filterTags))).sort().map((key) => ({ key, label: key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ') }))], [caseStudies]);

  const visibleCaseStudies = useMemo(() => {
    if (activeFilter === 'all') return caseStudies;
    return caseStudies.filter((c) => c.filterTags.includes(activeFilter));
  }, [activeFilter, caseStudies]);

  if (status === 'loading') return <ContentState kind="loading" />;
  if (status === 'error') return <ContentState kind="error" message={error ?? undefined} />;
  if (!caseStudies.length) return <ContentState kind="empty" />;

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28" aria-labelledby="work-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-64 top-24 h-[36rem] w-[36rem] rounded-full bg-[#D0190F]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="work-fade-in mb-10 flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-center">
          <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
            <span className="work-livedot inline-block h-1.5 w-1.5 rounded-full bg-[#D0190F]" />
            Systems tracked {String(caseStudies.length).padStart(2, '0')}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">
            Business input · Connected system · Operational impact
          </p>
        </div>

        <div className="work-fade-in mb-14 border-b border-white/10 pb-10 md:mb-16" style={{ animationDelay: '60ms' }}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
            <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
            Portfolio
          </p>
          <h1 id="work-title" className="max-w-4xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
            Systems Built.<br />Problems Solved.
          </h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-gray-400 md:text-lg">
            {intro}
          </p>
        </div>

        <div className="work-fade-in mb-10 flex flex-wrap gap-2" style={{ animationDelay: '100ms' }} role="tablist" aria-label="Filter case studies by sector">
          {filters.map((filter) => (
            <button
              key={filter.key}
              type="button"
              role="tab"
              aria-selected={activeFilter === filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${
                activeFilter === filter.key
                  ? 'border-[#D0190F] bg-[#D0190F]/10 text-white'
                  : 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {visibleCaseStudies.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className={`work-card group relative overflow-hidden border border-white/10 bg-[#141313] transition-all duration-500 hover:-translate-y-1 hover:border-[#D0190F]/60 ${
                project.featured ? 'min-h-[560px] lg:col-span-7 lg:row-span-2' : 'min-h-[300px] lg:col-span-5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#0b0b0b]/45 to-black/10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,transparent_0%,rgba(8,8,8,.12)_38%,rgba(8,8,8,.76)_100%)]" />
              </div>

              <div className="relative flex h-full min-h-[inherit] flex-col justify-between p-7 md:p-10">
                <div className="flex items-start justify-between gap-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">{project.category}</span>
                  <span className="font-['Bebas_Neue'] text-3xl text-white/20 transition-colors duration-300 group-hover:text-[#D0190F]">{project.number}</span>
                </div>

                <div>
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">{project.client}</p>
                  <h2 className={`font-['Bebas_Neue'] uppercase leading-none tracking-wide text-white ${project.featured ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
                    {project.name}
                  </h2>
                  <p className="mt-5 max-w-xl border-l border-[#D0190F]/60 pl-5 font-sans text-sm leading-6 text-gray-400 md:text-base">
                    {project.summary}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-4 border-b border-[#D0190F] pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors group-hover:text-[#ffb4a8]">
                    View Case Study
                    <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-1">↗</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}

          {visibleCaseStudies.length === 0 && (
            <p className="col-span-12 py-16 text-center font-mono text-xs uppercase tracking-[0.14em] text-gray-500">
              No case studies in this category yet.
            </p>
          )}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-600">Also trusted by</p>
          <div className="work-marquee-mask overflow-hidden">
            <div className="work-marquee flex w-max gap-2">
              {[...trustedBy, ...trustedBy].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="flex-shrink-0 border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-gray-400"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
