import { Link, Navigate, useParams } from 'react-router-dom';
import { getAdjacentCaseStudies, getCaseStudyBySlug } from '../data/caseStudies';

export function WorkDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return <Navigate to="/work" replace />;
  }

  const { prev, next } = getAdjacentCaseStudies(caseStudy.slug);

  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-20 md:py-28" aria-labelledby="work-detail-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -right-64 -top-24 h-[36rem] w-[36rem] rounded-full bg-[#D0190F]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1100px] px-6 md:px-16">
        <Link
          to="/work"
          className="work-fade-in mb-8 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-500 transition-colors hover:text-white"
        >
          ← All Work
        </Link>

        <div className="work-fade-in mb-10 border-b border-white/10 pb-8" style={{ animationDelay: '60ms' }}>
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">
            <span className="inline-block h-px w-6 bg-[#D0190F]" />
            {caseStudy.category} · {caseStudy.client}
          </p>
          <h1 id="work-detail-title" className="mb-5 font-['Bebas_Neue'] text-5xl uppercase leading-[0.9] tracking-wide text-white md:text-7xl">
            {caseStudy.name}
          </h1>
          <p className="mb-6 max-w-2xl font-sans text-base leading-7 text-gray-400 md:text-lg">
            {caseStudy.summary}
          </p>
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-600">Sector</p>
              <p className="font-mono text-[11px] text-gray-300">{caseStudy.sector}</p>
            </div>
            <div>
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.12em] text-gray-600">Type</p>
              <p className="font-mono text-[11px] text-gray-300">{caseStudy.type}</p>
            </div>
          </div>
        </div>

        <div className="work-fade-in mb-10 h-[220px] overflow-hidden border border-white/10 md:h-[340px]" style={{ animationDelay: '100ms' }}>
          <img src={caseStudy.image} alt={caseStudy.imageAlt} className="h-full w-full object-cover" />
        </div>

        <div className="work-fade-in mb-10 grid grid-cols-1 gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_2fr] md:gap-10" style={{ animationDelay: '140ms' }}>
          <p className="flex items-start gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">
            <span className="mt-1 inline-block h-px w-6 flex-shrink-0 bg-[#D0190F]" />
            01 · The Challenge
          </p>
          <p className="font-sans text-base leading-7 text-gray-300">{caseStudy.challenge}</p>
        </div>

        <div className="work-fade-in mb-10 grid grid-cols-1 gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_2fr] md:gap-10" style={{ animationDelay: '180ms' }}>
          <p className="flex items-start gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">
            <span className="mt-1 inline-block h-px w-6 flex-shrink-0 bg-[#D0190F]" />
            02 · The System
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {caseStudy.systemPoints.map((point) => (
              <div key={point.title} className="work-step border border-white/10 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D0190F]/55">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.1em] text-[#ffb4a8]">{point.title}</p>
                <p className="font-sans text-xs leading-5 text-gray-400">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {caseStudy.testimonial && (
          <div className="work-fade-in mb-12 grid grid-cols-1 gap-6 border-b border-white/10 pb-10 md:grid-cols-[1fr_2fr] md:gap-10" style={{ animationDelay: '220ms' }}>
            <p className="flex items-start gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">
              <span className="mt-1 inline-block h-px w-6 flex-shrink-0 bg-[#D0190F]" />
              03 · Client Feedback
            </p>
            <blockquote className="border-l-2 border-[#D0190F] pl-5">
              <p className="font-sans text-lg italic leading-8 text-gray-200 md:text-xl">
                &ldquo;{caseStudy.testimonial.quote}&rdquo;
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500">
                {caseStudy.testimonial.author} — {caseStudy.testimonial.role}
              </footer>
            </blockquote>
          </div>
        )}

        <div className="work-fade-in flex flex-col gap-6 border-t border-white/10 pt-8" style={{ animationDelay: '260ms' }}>
          <div className="flex flex-wrap items-center justify-between gap-4">
            {prev ? (
              <Link to={`/work/${prev.slug}`} className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500 transition-colors hover:text-white">
                ← {prev.name}
              </Link>
            ) : <span />}
            {next && (
              <Link to={`/work/${next.slug}`} className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-500 transition-colors hover:text-white">
                {next.name} →
              </Link>
            )}
          </div>

          <div className="flex flex-col items-start justify-between gap-5 border border-white/10 bg-[#141313] p-6 sm:flex-row sm:items-center md:p-8">
            <div>
              <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.14em] text-[#ffb4a8]">Start a Project</p>
              <h2 className="font-['Bebas_Neue'] text-2xl uppercase text-white md:text-3xl">Building Something Similar?</h2>
            </div>
            <Link
              to="/contact"
              className="group inline-flex flex-shrink-0 items-center gap-4 border border-[#D0190F] bg-[#D0190F]/10 px-6 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-all hover:bg-[#D0190F]/20"
            >
              Talk to Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
