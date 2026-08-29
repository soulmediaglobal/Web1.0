import { Link } from 'react-router-dom';
import { useContent } from '../content/useContent';
import { ContentState } from '../components/ContentState';

const principles = [
  { number: '01', title: 'Clarity Over Complexity', description: 'We turn complicated requirements, workflows, and constraints into a system people can understand and operate.' },
  { number: '02', title: 'Ownership Over Handoff', description: 'We stay connected across strategy, product, engineering, and implementation instead of treating each phase as a separate transaction.' },
  { number: '03', title: 'Useful Over Impressive', description: 'Technology only matters when it improves how the business works, makes decisions, and serves the people who depend on it.' },
  { number: '04', title: 'Systems Over Shortcuts', description: 'We design foundations that can adapt to new teams, changing workflows, and the next stage of the business.' },
];

const process = [
  { number: '01', title: 'Discover', description: 'Understand the business context, people, workflows, data, and constraints.' },
  { number: '02', title: 'Define', description: 'Turn the problem into priorities, architecture, scope, and a practical roadmap.' },
  { number: '03', title: 'Build', description: 'Design and engineer the product with continuous business alignment.' },
  { number: '04', title: 'Integrate', description: 'Connect systems, data, and operational processes into one working environment.' },
  { number: '05', title: 'Evolve', description: 'Support iteration, adoption, and scale as the organization moves forward.' },
];

const facts = [
  { label: 'Company', value: 'PT Soul Media Global' },
  { label: 'Based In', value: 'Yogyakarta, Indonesia' },
  { label: 'Core Practice', value: 'Strategy · Product · Engineering · AI · Infrastructure' },
  { label: 'Experience Across', value: 'Government · Banking · Property · Automotive · Construction · Telecommunications' },
];

export function AboutPage() {
  const { leadership: founders, status, error } = useContent();
  if (status === 'loading') return <ContentState kind="loading" />;
  if (status === 'error') return <ContentState kind="error" message={error ?? undefined} />;
  if (!founders.length) return <ContentState kind="empty" />;
  return (
    <div className="overflow-hidden bg-[#0a0a0a] text-white">
      <section className="relative isolate overflow-hidden border-b border-white/10 px-6 py-20 md:px-16 md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,.7)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.7)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="pointer-events-none absolute -right-40 top-0 h-[42rem] w-[42rem] rounded-full bg-[#D0190F]/12 blur-[150px]" />
        <div className="pointer-events-none absolute right-[-3rem] top-1/2 hidden -translate-y-1/2 font-['Bebas_Neue'] text-[18rem] leading-none text-white/[0.018] lg:block xl:text-[25rem]" aria-hidden="true">SMG</div>
        <div className="relative mx-auto grid min-h-[520px] w-full max-w-[1440px] grid-cols-1 content-center gap-14 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-7 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]"><span className="h-px w-10 bg-[#D0190F]" />About Soul Media Global</p>
            <h1 className="max-w-5xl font-['Bebas_Neue'] text-6xl uppercase leading-[0.88] tracking-wide text-white md:text-7xl xl:text-[6.5rem]">Built Around<br />Business Problems,<br /><span className="text-white/35">Not Technology Trends.</span></h1>
          </div>
          <div className="border-l border-[#D0190F]/60 pl-6 lg:col-span-4 lg:mb-2">
            <p className="font-sans text-base leading-7 text-gray-300 md:text-lg">Soul Media Global is a technology company combining business understanding, product thinking, and engineering execution to build systems that work in the real world.</p>
            <p className="mt-6 font-mono text-[9px] uppercase leading-5 tracking-[0.16em] text-gray-600">Yogyakarta, Indonesia · Working across public and private sectors</p>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-b border-white/10 bg-[#0e0e0e] px-6 py-24 md:px-16 md:py-32" aria-labelledby="origin-title">
        <div className="pointer-events-none absolute -left-48 top-1/2 h-[32rem] w-[32rem] -translate-y-1/2 rounded-full bg-[#D0190F]/8 blur-[140px]" />
        <div className="relative mx-auto max-w-[1440px]">
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">01 · Why We Exist</p>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
            <h2 id="origin-title" className="max-w-5xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide md:text-7xl lg:col-span-7">The Gap Was Never<br />Just Technology.</h2>
            <p className="max-w-xl border-l border-[#D0190F]/60 pl-6 font-sans text-base leading-7 text-gray-400 md:text-lg lg:col-span-5">Organizations often know where they want to go, but their processes, data, and technology move in different directions.</p>
          </div>

          <div className="mt-16 grid grid-cols-1 overflow-hidden border border-white/10 bg-[#111] lg:mt-20 lg:grid-cols-12">
            <div className="flex flex-col justify-center border-b border-white/10 p-7 md:p-10 lg:col-span-4 lg:border-b-0 lg:border-r">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-600">Business Input</span>
              <h3 className="mt-4 font-['Bebas_Neue'] text-4xl uppercase leading-none tracking-wide">Intent Without<br />Alignment</h3>
              <p className="mt-5 max-w-sm font-sans text-sm leading-6 text-gray-500">Business priorities, operational workflows, and available data often evolve separately.</p>
            </div>

            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden bg-[#0b0b0b] lg:col-span-4" aria-hidden="true">
              <div className="about-bridge-grid absolute inset-0" />
              <div className="about-bridge-orbit about-bridge-orbit--outer" />
              <div className="about-bridge-orbit about-bridge-orbit--inner" />
              <div className="about-bridge-line about-bridge-line--left"><i /></div>
              <div className="about-bridge-line about-bridge-line--right"><i /></div>
              <div className="about-bridge-node about-bridge-node--left">Business</div>
              <div className="about-bridge-core"><span>SMG</span><small>Connected System</small></div>
              <div className="about-bridge-node about-bridge-node--right">Technology</div>
            </div>

            <div className="flex flex-col justify-center border-t border-white/10 p-7 md:p-10 lg:col-span-4 lg:border-l lg:border-t-0">
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffb4a8]">Connected System</span>
              <h3 className="mt-4 font-['Bebas_Neue'] text-4xl uppercase leading-none tracking-wide">One Direction,<br />Built to Evolve</h3>
              <p className="mt-5 max-w-sm font-sans text-sm leading-6 text-gray-500">We connect business intent with product decisions and technical execution so teams can operate, trust, and evolve the result.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 px-6 py-24 md:px-16 md:py-36" aria-labelledby="principles-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid grid-cols-1 gap-8 md:mb-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">02 · How We Think</p><h2 id="principles-title" className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide md:text-7xl">Principles That Shape<br />Every Decision.</h2></div>
            <p className="max-w-lg font-sans text-base leading-7 text-gray-500 lg:col-span-4">Not corporate values for a wall. These are the standards we use when deciding what to build and how to build it.</p>
          </div>
          <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 md:grid-cols-2">
            {principles.map((principle) => (
              <article key={principle.number} className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden bg-[#0d0d0d] p-7 transition-colors duration-300 hover:bg-[#141111] md:min-h-[360px] md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-[#ffb4a8]">{principle.number} / 04</span>
                  <span className="h-2 w-2 rounded-full border border-[#D0190F] transition-colors duration-300 group-hover:bg-[#D0190F]" />
                </div>
                <div className="relative z-10 max-w-xl">
                  <h3 className="max-w-md font-['Bebas_Neue'] text-4xl uppercase leading-[0.94] tracking-wide md:text-5xl">{principle.title}</h3>
                  <p className="mt-6 border-t border-white/10 pt-5 font-sans text-sm leading-6 text-gray-500 md:text-base md:leading-7">{principle.description}</p>
                </div>
                <span className="pointer-events-none absolute -bottom-12 -right-2 font-['Bebas_Neue'] text-[11rem] leading-none text-white/[0.018] transition-colors group-hover:text-[#D0190F]/[0.045]" aria-hidden="true">{principle.number}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 bg-[#0e0e0e] px-6 py-24 md:px-16 md:py-36" aria-labelledby="process-title">
        <div className="pointer-events-none absolute inset-0 opacity-[0.025] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:48px_48px]" />
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5 lg:pt-4">
            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">03 · How We Work</p>
            <h2 id="process-title" className="max-w-3xl font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide md:text-7xl">One Connected Process,<br />From Context to Scale.</h2>
            <p className="mt-8 max-w-md border-l border-[#D0190F]/60 pl-6 font-sans text-base leading-7 text-gray-500">Each stage informs the next, while business intent stays visible from the first conversation through long-term evolution.</p>
          </div>
          <div className="relative lg:col-span-7">
            <div className="absolute bottom-8 left-[1.15rem] top-8 w-px bg-white/10 md:left-[1.65rem]" aria-hidden="true" />
            <div className="relative border-t border-white/10">
              {process.map((step) => (
                <article key={step.number} className="group grid grid-cols-[2.4rem_1fr] gap-5 border-b border-white/10 py-7 md:grid-cols-[3.4rem_10rem_1fr] md:items-start md:gap-7 md:py-9">
                  <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-[#0e0e0e] font-mono text-[9px] text-[#ffb4a8] transition-colors group-hover:border-[#D0190F] md:h-12 md:w-12">{step.number}</span>
                  <h3 className="font-['Bebas_Neue'] text-4xl uppercase leading-none tracking-wide md:pt-2">{step.title}</h3>
                  <p className="col-start-2 font-sans text-sm leading-6 text-gray-500 md:col-start-auto md:pt-2 md:text-base md:leading-7">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-white/10 px-6 py-24 md:px-16 md:py-36" aria-labelledby="people-title">
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-16 grid grid-cols-1 gap-8 md:mb-20 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">04 · The People</p><h2 id="people-title" className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide md:text-7xl">The People Behind<br />The Systems.</h2></div>
            <p className="max-w-lg font-sans text-base leading-7 text-gray-500 lg:col-span-4">Different disciplines, one shared responsibility: keeping business intent connected to execution.</p>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {founders.map((founder) => (
              <article key={founder.name} className="group grid grid-cols-1 overflow-hidden border border-white/10 bg-[#111] md:grid-cols-[0.8fr_1.2fr] lg:grid-cols-1 xl:grid-cols-[0.8fr_1.2fr]">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#0b0b0b]"><img src={founder.image} alt={founder.imageAlt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-contain grayscale opacity-75 transition-[filter,opacity] duration-700 group-hover:grayscale-0 group-hover:opacity-90" /><div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" /><span className="absolute left-5 top-5 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ffb4a8]">Founder {founder.number}</span></div>
                <div className="flex min-h-[300px] flex-col justify-end border-t border-white/10 p-7 md:min-h-0 md:border-l md:border-t-0 md:p-8 lg:min-h-[280px] lg:border-l-0 lg:border-t xl:min-h-0 xl:border-l xl:border-t-0"><p className="font-mono text-[9px] uppercase tracking-[0.14em] text-[#ffb4a8]">{founder.role}</p><h3 className="mt-4 font-['Bebas_Neue'] text-5xl uppercase leading-[0.9] tracking-wide">{founder.name}</h3><p className="mt-6 border-l border-[#D0190F] pl-5 font-sans text-sm leading-6 text-gray-500 md:text-base md:leading-7">{founder.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#0e0e0e] px-6 py-24 md:px-16 md:py-32" aria-labelledby="facts-title">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffb4a8]">05 · Company Facts</p><h2 id="facts-title" className="font-['Bebas_Neue'] text-5xl uppercase leading-[0.92] tracking-wide md:text-6xl">The Short<br />Version.</h2></div>
          <dl className="border-t border-white/10 lg:col-span-8">{facts.map((fact) => <div key={fact.label} className="grid grid-cols-1 gap-3 border-b border-white/10 py-7 sm:grid-cols-[11rem_1fr] sm:items-start"><dt className="font-mono text-[9px] uppercase tracking-[0.16em] text-gray-600">{fact.label}</dt><dd className="font-sans text-base leading-7 text-gray-300">{fact.value}</dd></div>)}</dl>
        </div>
      </section>

      <section className="relative isolate overflow-hidden bg-[#D0190F] px-6 py-24 text-white md:px-16 md:py-36" aria-labelledby="about-cta-title">
        <div className="pointer-events-none absolute -bottom-24 -right-6 font-['Bebas_Neue'] text-[16rem] leading-none text-black/10 md:text-[28rem]" aria-hidden="true">SMG</div>
        <div className="relative mx-auto grid max-w-[1440px] grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8"><p className="mb-7 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">Start a Conversation</p><h2 id="about-cta-title" className="font-['Bebas_Neue'] text-6xl uppercase leading-[0.86] tracking-wide md:text-8xl xl:text-[7rem]">Looking for a Partner<br />Who Can Think<br />Beyond the Brief?</h2></div>
          <div className="lg:col-span-4"><p className="max-w-md font-sans text-base leading-7 text-white/75 md:text-lg">Bring us the business problem. We’ll help make the system around it clear.</p><Link to="/contact" className="group mt-8 inline-flex items-center justify-between gap-8 border border-white bg-white px-7 py-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#620700] transition-colors hover:bg-transparent hover:text-white">Start a Project<span className="transition-transform duration-300 group-hover:translate-x-2">→</span></Link></div>
        </div>
      </section>
    </div>
  );
}
