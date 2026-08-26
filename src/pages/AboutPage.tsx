import React from 'react';
import tomyImg from '../assets/tomy.png';
import rayhanImg from '../assets/ray.png';

export const AboutPage: React.FC = () => {
  const leaders = [
    {
      name: "Tomy Galih Prasetyo",
      role: "Co-Founder",
      tag: "Architecture & Governance",
      quote: "True architectural integrity isn't visible; it's felt in the absence of failure.",
      email: "tomy@soulmedia.id",
      img: tomyImg
    },
    {
      name: "Rayhan",
      role: "Co-Founder",
      tag: "Innovation & Engineering",
      quote: "Innovation at scale requires a ruthless commitment to elegant engineering.",
      email: "rayhan@soulmedia.id",
      img: rayhanImg
    }
  ];

  return (
    <div className="w-full pt-20 bg-[#131313] text-[#e5e2e1] min-h-screen">
      
      {/* HERO / GENESIS SECTION */}
      <section className="relative min-h-[65vh] flex items-center py-20 px-6 md:px-16 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10 [background-size:32px_32px] [background-image:radial-gradient(#ffffff_1px,transparent_1px)]"></div>
        
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          <div className="lg:col-span-8 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[2px] bg-[#D0190F]"></span>
              <span className="font-mono text-xs text-[#D0190F] tracking-[0.2em] uppercase">01 / The SMG Genesis</span>
            </div>
            
            <h1 className="font-['Bebas_Neue'] text-6xl md:text-8xl leading-[0.9] text-white uppercase tracking-tight">
              Engineering<br/>
              <span className="text-gray-400">The Future</span>
            </h1>
            
            <p className="font-sans text-base md:text-lg text-gray-400 max-w-2xl mt-2 border-l-2 border-[#D0190F]/50 pl-6 leading-relaxed">
              We do not just build software; we architect digital resilience. PT Soul Media Global stands at the intersection of legacy infrastructure and next-generation systems, engineering solutions that command authority in high-stakes enterprise environments.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-8 border-t border-white/5">
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-4xl text-[#D0190F]">05+</span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1">Years Active</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-4xl text-[#D0190F]">50M+</span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1">Data Points Processed</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-4xl text-[#D0190F]">12</span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1">Enterprise Partners</span>
              </div>
              <div className="flex flex-col">
                <span className="font-['Bebas_Neue'] text-4xl text-[#D0190F]">99.99%</span>
                <span className="font-mono text-[10px] text-gray-400 uppercase mt-1">System Uptime</span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4 items-center justify-center">
            <div className="w-[280px] h-[280px] rounded-full border border-[#D0190F]/30 relative animate-[spin_60s_linear_infinite]">
              <div className="absolute inset-4 rounded-full border border-white/10 border-dashed"></div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#D0190F] rounded-full shadow-[0_0_15px_#D0190F]"></div>
              <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* VISION & MISSION SECTION */}
      <section className="py-24 px-6 md:px-16 bg-[#0e0e0e] border-b border-white/5">
        <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 flex flex-col gap-6 bg-[#131313] p-10 border-l-4 border-[#D0190F] shadow-2xl relative overflow-hidden">
            <span className="font-mono text-xs text-[#D0190F] tracking-widest uppercase">Vision</span>
            <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase leading-none">
              Your Digital Transformation & Architecture Partner
            </h2>
            <p className="font-sans text-sm text-gray-400 leading-relaxed">
              To architect the unseen foundations that power the region's most critical enterprises, ensuring technological supremacy and uncompromising reliability in an era of rapid digital escalation.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1c1b1b] p-6 flex flex-col gap-4 border border-white/5 hover:border-[#D0190F]/50 transition-colors">
              <span className="font-mono text-xs text-gray-500">01 // PILLAR</span>
              <h3 className="font-['Bebas_Neue'] text-2xl text-white uppercase mt-auto">Technical Excellence</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Deploying robust, scalable, and performant architectures that defy legacy constraints and establish new industry standards.
              </p>
            </div>

            <div className="bg-[#1c1b1b] p-6 flex flex-col gap-4 border border-white/5 hover:border-[#D0190F]/50 transition-colors">
              <span className="font-mono text-xs text-gray-500">02 // PILLAR</span>
              <h3 className="font-['Bebas_Neue'] text-2xl text-white uppercase mt-auto">Uncompromising Security</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Engineering zero-trust environments and fortified data pipelines to protect critical intellectual property and operations.
              </p>
            </div>

            <div className="bg-[#1c1b1b] p-6 flex flex-col gap-4 border border-white/5 hover:border-[#D0190F]/50 transition-colors">
              <span className="font-mono text-xs text-gray-500">03 // PILLAR</span>
              <h3 className="font-['Bebas_Neue'] text-2xl text-white uppercase mt-auto">Business Continuity</h3>
              <p className="font-sans text-xs text-gray-400 leading-relaxed">
                Architecting resilient systems that guarantee operational fluidity, mitigating risk during high-stakes structural transitions.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* EXECUTIVE LEADERSHIP */}
      <section className="py-24 px-6 md:px-16 bg-[#131313]">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col items-center text-center mb-16">
            <span className="font-mono text-xs text-[#D0190F] tracking-[0.2em] uppercase mb-3">Command Center</span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase">Executive Leadership</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
            {leaders.map((leader, index) => (
              <div key={index} className="group flex flex-col gap-6 relative">
                <div className="relative overflow-hidden aspect-[4/5] bg-[#1c1b1b] border border-white/10">
                  <img 
                    src={leader.img} 
                    alt={leader.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/40 to-transparent opacity-90"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="font-mono text-[10px] text-[#D0190F] uppercase tracking-widest bg-[#131313]/80 backdrop-blur px-2.5 py-1 border border-[#D0190F]/30">
                        {leader.tag}
                      </span>
                      <span className="font-mono text-xs text-gray-400">0{index + 1} // LEAD</span>
                    </div>

                    <h3 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase leading-none tracking-wide">
                      {leader.name}
                    </h3>

                    <p className="font-sans text-sm text-gray-300 italic border-l-2 border-[#D0190F] pl-4 my-3">
                      "{leader.quote}"
                    </p>

                    <div className="flex gap-4 items-center pt-2">
                      <a href={`mailto:${leader.email}`} className="px-4 py-2 border border-white/20 hover:border-[#D0190F] hover:bg-[#D0190F] text-white font-mono text-xs uppercase transition-all">
                        Email
                      </a>
                      <a href="#" className="px-4 py-2 border border-white/20 hover:border-[#D0190F] hover:bg-[#D0190F] text-white font-mono text-xs uppercase transition-all">
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};