import { Link } from 'react-router-dom';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { useContent, useSiteCopy } from '../content/ContentProvider';
import { ContentState } from './ContentState';

export function SelectedWork() {
  const sectionRef = useScrollProgress<HTMLElement>();
  const { caseStudies, status, error } = useContent();
  const projects = caseStudies.filter((project) => project.featured);
  const eyebrow = useSiteCopy('home.work.eyebrow', 'Selected Work');
  const title = useSiteCopy('home.work.title', 'Built for Real\nBusiness Problems.');
  const description = useSiteCopy('home.work.description', 'A selection of digital products, platforms, and systems designed to solve real operational and business challenges.');
  if (status === 'loading') return <ContentState kind="loading" />;
  if (status === 'error') return <ContentState kind="error" message={error ?? undefined} />;
  if (!projects.length) return <ContentState kind="empty" />;
  return (
    <section ref={sectionRef} className="parallax-section work-parallax relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36" aria-labelledby="selected-work-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-64 top-40 h-[36rem] w-[36rem] rounded-full bg-[#D0190F]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:mb-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
              <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
              {eyebrow}
            </p>
            <h2 id="selected-work-title" className="max-w-4xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
              {title.split('\n').map((line, index) => <span key={line}>{index > 0 && <br />}{line}</span>)}
            </h2>
          </div>
          <p className="max-w-lg font-sans text-base leading-7 text-gray-400 md:text-lg">
            {description}
          </p>
        </div>

        <div className="work-portfolio flex flex-col gap-16 md:gap-24">
          {projects.map((project, projectIndex) => (
            <article
              key={project.number}
              className="work-card group grid grid-cols-1 overflow-hidden border border-white/10 bg-[#101010] transition-colors duration-500 hover:border-white/20 lg:grid-cols-12"
            >
              <div className={`relative min-h-[340px] overflow-hidden md:min-h-[500px] lg:col-span-7 ${projectIndex % 2 ? 'lg:order-2' : ''}`}>
                <img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" className="work-card-image absolute inset-0 h-full w-full object-cover opacity-80 transition-[opacity,transform] duration-700 group-hover:scale-[1.025] group-hover:opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <span className="absolute left-6 top-6 border border-white/15 bg-black/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-[#ffb4a8] backdrop-blur-md md:left-8 md:top-8">
                  Project {project.number}
                </span>
              </div>

              <div className={`relative flex flex-col justify-center border-t border-white/10 p-7 md:p-10 lg:col-span-5 lg:border-t-0 ${projectIndex % 2 ? 'lg:order-1 lg:border-r' : 'lg:border-l'}`}>
                  <span className="mb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">{project.category}</span>
                  <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.14em] text-white/50">{project.client}</p>
                  <h3 className="max-w-xl font-['Bebas_Neue'] text-4xl uppercase leading-[0.95] tracking-wide text-white md:text-5xl">
                    {project.name}
                  </h3>
                  <p className="mt-6 max-w-xl border-l border-[#D0190F]/60 pl-5 font-sans text-sm leading-6 text-gray-400 md:text-base">
                    {project.summary}
                  </p>
                  <Link to={`/work/${project.slug}`} className="mt-9 inline-flex w-max items-center gap-4 border-b border-[#D0190F] pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white transition-colors hover:text-[#ffb4a8]">
                    View Case Study
                    <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-1">↗</span>
                  </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">Selected case studies</p>
          <Link to="/work" className="group inline-flex items-center gap-5 border border-white/20 px-7 py-4 font-mono text-xs uppercase tracking-[0.16em] text-white transition-all hover:border-[#D0190F] hover:bg-[#D0190F]/10">
            View All Work
            <span className="text-[#D0190F] transition-transform duration-300 group-hover:translate-x-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
