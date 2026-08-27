import { Link } from 'react-router-dom';
import { caseStudies } from '../data/caseStudies';

export function SelectedWork() {
  return (
    <section className="relative overflow-hidden bg-[#0a0a0a] py-24 md:py-36" aria-labelledby="selected-work-title">
      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
      <div className="pointer-events-none absolute -left-64 top-40 h-[36rem] w-[36rem] rounded-full bg-[#D0190F]/10 blur-[140px]" />

      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mb-14 flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-10 md:mb-20 lg:flex-row lg:items-end">
          <div>
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-[#ffb4a8]">
              <span className="mr-3 inline-block h-px w-8 bg-[#D0190F] align-middle" />
              Selected Work
            </p>
            <h2 id="selected-work-title" className="max-w-4xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide text-white md:text-7xl">
              Built for Real<br />Business Problems.
            </h2>
          </div>
          <p className="max-w-lg font-sans text-base leading-7 text-gray-400 md:text-lg">
            A selection of digital products, platforms, and systems designed to solve real operational and business challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {caseStudies.map((project) => (
            <Link
              key={project.slug}
              to={`/work/${project.slug}`}
              className={`group relative overflow-hidden border border-white/10 bg-[#141313] transition-all duration-500 hover:-translate-y-1 hover:border-[#D0190F]/60 ${
                project.featured ? 'min-h-[650px] lg:col-span-7 lg:row-span-2' : 'min-h-[310px] lg:col-span-5'
              }`}
            >
              <div className="absolute inset-0 overflow-hidden">
                <img src={project.image} alt={project.imageAlt} className="h-full w-full object-cover opacity-75 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90" />
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
                  <h3 className={`font-['Bebas_Neue'] uppercase leading-none tracking-wide text-white ${project.featured ? 'text-5xl md:text-7xl' : 'text-4xl md:text-5xl'}`}>
                    {project.name}
                  </h3>
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
