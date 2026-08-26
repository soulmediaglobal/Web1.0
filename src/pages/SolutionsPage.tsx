import React from 'react';
import { Link } from 'react-router-dom';

export const SolutionsPage: React.FC = () => {
  const capabilities = [
    {
      num: "01",
      title: "Digital Strategy &\nEnterprise Architecture",
      desc: "Strategic alignment of IT infrastructure with business objectives, ensuring scalability and future-proof design.",
      items: ["Monolith to Microservices", "Cloud-Native Roadmapping"],
      tags: ["AWS", "Kubernetes", "Terraform"]
    },
    {
      num: "02",
      title: "Zero-Trust Cloud &\nServer Infrastructure",
      desc: "Deploying rigorous, identity-first security models across hybrid and multi-cloud enterprise environments.",
      items: ["Identity Access Management", "Network Micro-segmentation"],
      tags: ["Azure", "Docker", "Linux"]
    },
    {
      num: "03",
      title: "Enterprise System\nIntegration & APIs",
      desc: "Seamlessly connecting disparate legacy systems into a unified, high-throughput digital nervous system.",
      items: ["Event-Driven Architecture", "Legacy System Modernization"],
      tags: ["GraphQL", "Node.js", "Go"]
    },
    {
      num: "04",
      title: "Custom Software &\nScalable Microservices",
      desc: "Engineering high-performance, bespoke applications designed to handle massive transactional loads.",
      items: ["High-Concurrency Systems", "React / Next.js Frontends"],
      tags: ["React", "TypeScript", "PostgreSQL"]
    },
    {
      num: "05",
      title: "Cybersecurity Audit &\nGovernance Compliance",
      desc: "Comprehensive vulnerability assessments and governance alignment to global security standards.",
      items: ["Penetration Testing", "Compliance Readiness"],
      tags: ["ISO 27001", "SOC2", "NIST"]
    },
    {
      num: "06",
      title: "Managed IT Operations &\nEnterprise SLAs",
      desc: "Proactive, 24/7 infrastructure management guaranteeing maximum uptime and operational continuity.",
      items: ["Automated Remediation", "Site Reliability Engineering"],
      tags: ["24/7 SOC", "DevOps", "CI/CD"]
    }
  ];

  return (
    <div className="w-full pt-20 bg-[#131313] text-[#e5e2e1] min-h-screen">
      
      {/* HERO SECTION */}
      <div className="relative w-full flex flex-col justify-center px-6 md:px-16 py-20 min-h-[75vh] overflow-hidden border-b border-white/5">
        
        {/* Glowing Background & Glow Effects */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#D0190F]/20 blur-[140px] rounded-full"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px] opacity-10"></div>
        </div>

        <div className="relative z-10 max-w-[1440px] mx-auto w-full flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="h-[2px] w-12 bg-[#D0190F]"></div>
            <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">
              SMG Infrastructure Group
            </span>
          </div>
          
          <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl text-white uppercase max-w-5xl tracking-tight leading-none">
            Enterprise-Grade Architecture & <br/>
            <span className="text-[#D0190F]">Digital Solutions</span>
          </h1>
          
          <p className="font-sans text-lg text-gray-400 max-w-2xl mt-2 leading-relaxed">
            We architect resilient, high-availability ecosystems and zero-trust frameworks for market leaders. SMG delivers uncompromising structural integrity and operational superiority.
          </p>
        </div>
      </div>

      {/* CORE CAPABILITIES GRID */}
      <div className="relative w-full z-20 px-6 md:px-16 -mt-10 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <div 
                key={idx}
                className="group flex flex-col bg-[#1c1b1b] hover:bg-[#252424] transition-all duration-300 border border-white/5 p-8 gap-6 relative overflow-hidden min-h-[380px]"
              >
                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#D0190F] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></div>
                
                <div className="flex items-center justify-between text-[#D0190F]">
                  <span className="font-mono text-xs text-gray-500">// CAPABILITY</span>
                  <span className="font-mono text-xs text-gray-500 opacity-60">{cap.num}</span>
                </div>

                <h3 className="font-['Bebas_Neue'] text-3xl text-white uppercase whitespace-pre-line tracking-wide">
                  {cap.title}
                </h3>

                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  {cap.desc}
                </p>

                <ul className="flex flex-col gap-2 font-sans text-sm text-gray-300 mt-2">
                  {cap.items.map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-[#D0190F] text-xs">▸</span> {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/5">
                  {cap.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="px-3 py-1 bg-[#2e2d2d] text-gray-300 font-mono text-[10px] uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ENTERPRISE SLA SECTION */}
      <div className="w-full bg-[#0e0e0e] px-6 md:px-16 py-24 border-t border-b border-white/5">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col gap-6">
            <span className="font-mono text-xs text-[#D0190F] uppercase tracking-[0.2em]">
              [ SYSTEM RELIABILITY ]
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase leading-none">
              Uncompromising<br/>Operational Metrics
            </h2>
            <p className="font-sans text-base text-gray-400 max-w-lg leading-relaxed">
              We do not guess; we measure. SMG commits to rigorous Service Level Agreements backed by real-time telemetric monitoring and a dedicated Security Operations Center.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#1c1b1b] p-8 flex flex-col justify-center border border-white/10 gap-2">
              <span className="font-['Bebas_Neue'] text-6xl text-[#D0190F]">99.99%</span>
              <span className="font-mono text-xs text-gray-400 uppercase">Availability Guarantee</span>
            </div>
            <div className="bg-[#1c1b1b] p-8 flex flex-col justify-center border border-white/10 gap-2">
              <span className="font-['Bebas_Neue'] text-6xl text-[#D0190F]">24/7</span>
              <span className="font-mono text-xs text-gray-400 uppercase">Active SOC Monitoring</span>
            </div>
            <div className="bg-[#1c1b1b] p-8 flex flex-col justify-center border border-white/10 gap-2 sm:col-span-2">
              <span className="font-['Bebas_Neue'] text-5xl text-[#D0190F]">ISO/IEC 27001</span>
              <span className="font-mono text-xs text-gray-400 uppercase">Information Security Readiness</span>
            </div>
          </div>

        </div>
      </div>

      {/* CTA BANNER */}
      <div className="w-full bg-[#D0190F] px-6 md:px-16 py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-8 relative z-10">
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase leading-tight tracking-wide">
            Ready for a Structural Upgrade?
          </h2>
          <p className="font-sans text-base text-white/90 max-w-xl leading-relaxed">
            Engage SMG engineers for a comprehensive technical audit of your existing infrastructure and identify immediate modernization vectors.
          </p>
          <Link to="/contact">
            <button className="bg-[#0a0a0a] text-white font-mono text-xs px-10 py-5 uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-2xl">
              Initialize Technical Audit →
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
};