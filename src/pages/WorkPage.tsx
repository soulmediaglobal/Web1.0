import { useMemo, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { ContentState } from '../components/ContentState';
import type { CaseStudy } from '../content/types';
import { useContent, useSiteCopy } from '../content/useContent';

const trustedBy = ['Sampoerna', 'Telkomsel', 'Angkasa Pura', 'Dompet Dhuafa', 'Agung Podomoro Land', 'Perumnas', 'Asia Pacific Fibers'];
const rowPatterns = [[7, 5], [3, 5, 4], [5, 7]] as const;
type WorkRow = { projects: CaseStudy[]; columns: readonly number[] };
type WorkRowStyle = CSSProperties & { '--work-row-columns': number };

function buildWorkRows(projects: CaseStudy[]): WorkRow[] {
  const rows: WorkRow[] = [];
  let cursor = 0;

  while (cursor < projects.length) {
    const remaining = projects.length - cursor;
    const preferred = rowPatterns[rows.length % rowPatterns.length];
    const itemCount = remaining === 1 ? 1 : Math.min(preferred.length, remaining);
    const columns = itemCount === 1 ? [12] : itemCount === 2 ? (rows.length % 2 === 0 ? rowPatterns[0] : rowPatterns[2]) : rowPatterns[1];
    rows.push({ projects: projects.slice(cursor, cursor + itemCount), columns });
    cursor += itemCount;
  }

  return rows;
}

export function WorkPage() {
  const { caseStudies, status, error } = useContent();
  const [activeFilter, setActiveFilter] = useState('all');
  const intro = useSiteCopy('work.intro', 'A record of platforms, command centers, and infrastructure delivered for government, banking, and enterprise clients across Indonesia.');
  const filters = useMemo(() => [{ key: 'all', label: 'All Work' }, ...Array.from(new Set(caseStudies.flatMap((item) => item.filterTags))).sort().map((key) => ({ key, label: key.split('-').map((word) => word[0].toUpperCase() + word.slice(1)).join(' ') }))], [caseStudies]);
  const visibleCaseStudies = useMemo(() => activeFilter === 'all' ? caseStudies : caseStudies.filter((item) => item.filterTags.includes(activeFilter)), [activeFilter, caseStudies]);
  const workRows = useMemo(() => buildWorkRows(visibleCaseStudies), [visibleCaseStudies]);

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
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-500">Business input · Connected system · Operational impact</p>
        </div>

        <div className="work-fade-in mb-14 border-b border-white/10 pb-10 md:mb-16" style={{ animationDelay: '60ms' }}>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]"><span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />Portfolio</p>
          <h1 id="work-title" className="max-w-4xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">Systems Built.<br />Problems Solved.</h1>
          <p className="mt-6 max-w-2xl font-sans text-base leading-7 text-gray-400 md:text-lg">{intro}</p>
        </div>

        <div className="work-fade-in mb-10 flex flex-wrap gap-2" style={{ animationDelay: '100ms' }} role="tablist" aria-label="Filter case studies by sector">
          {filters.map((filter) => (
            <button key={filter.key} type="button" role="tab" aria-selected={activeFilter === filter.key} onClick={() => setActiveFilter(filter.key)} className={`border px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] transition-colors ${activeFilter === filter.key ? 'border-[#D0190F] bg-[#D0190F]/10 text-white' : 'border-white/15 text-gray-400 hover:border-white/30 hover:text-white'}`}>
              {filter.label}
            </button>
          ))}
        </div>

        <div className="work-cinematic-grid">
          {workRows.map((row, rowIndex) => (
            <div key={`${activeFilter}-${rowIndex}`} className="work-cinematic-row" style={{ '--work-row-columns': row.projects.length } as WorkRowStyle}>
              {row.projects.map((project, projectIndex) => {
                const columnSpan = row.columns[projectIndex];
                const isNarrow = columnSpan <= 4;
                return (
                  <Link key={project.slug} to={`/work/${project.slug}`} className={`work-cinematic-card group ${isNarrow ? 'work-cinematic-card--narrow' : ''}`} style={{ '--work-column-span': columnSpan } as CSSProperties} aria-label={`View ${project.name} case study`}>
                    <img src={project.image} alt={project.imageAlt} className="work-cinematic-image" loading="lazy" />
                    <div className="work-cinematic-shade" />
                    <div className="work-cinematic-accent" />
                    <div className="work-cinematic-content">
                      <div className="flex items-start justify-between gap-4">
                        <p className="work-cinematic-meta"><span>{project.client}</span><span aria-hidden="true">/</span><span>{project.category}</span></p>
                        <span className="work-cinematic-number">{project.number}</span>
                      </div>
                      <div className="work-cinematic-copy">
                        <h2 className="work-cinematic-title">{project.name}</h2>
                        <p className="work-cinematic-summary">{project.summary}</p>
                        <span className="work-cinematic-link">View Case Study <span aria-hidden="true" className="work-cinematic-arrow">↗</span></span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
          {visibleCaseStudies.length === 0 && <p className="py-16 text-center font-mono text-xs uppercase tracking-[0.14em] text-gray-500">No case studies in this category yet.</p>}
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.16em] text-gray-600">Also trusted by</p>
          <div className="work-marquee-mask overflow-hidden"><div className="work-marquee flex w-max gap-2">
            {[...trustedBy, ...trustedBy].map((name, i) => <span key={`${name}-${i}`} className="flex-shrink-0 border border-white/10 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.1em] text-gray-400">{name}</span>)}
          </div></div>
        </div>
      </div>
    </section>
  );
}
