import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const toggleDomain = (domain: string) => {
    setSelectedDomains(prev =>
      prev.includes(domain)
        ? prev.filter(item => item !== domain)
        : [...prev, domain]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
    }, 2000);
  };

  return (
    <div className="w-full pt-20 bg-[#131313] text-[#e5e2e1] min-h-screen">
      
      <div className="relative w-full overflow-hidden bg-[#131313]">
        <div className="absolute inset-0 pointer-events-none opacity-5 [background-size:48px_48px] [background-image:radial-gradient(#ffffff_1px,transparent_1px)]"></div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-16 w-full pt-16 pb-24 relative z-10">
          
          <div className="flex flex-col gap-6 md:w-2/3 xl:w-1/2 mb-16 relative pl-6 border-l-4 border-[#D0190F]">
            <span className="font-mono text-xs text-[#D0190F] tracking-widest uppercase">
              Secure Channel // Access Level 4
            </span>
            <h1 className="font-['Bebas_Neue'] text-5xl md:text-7xl text-white uppercase m-0 p-0 leading-none">
              Initiate Strategic Consultation
            </h1>
            <p className="font-sans text-base text-gray-400 max-w-xl leading-relaxed">
              Submit comprehensive RFP parameters or request architectural audits. Engaging with our enterprise engineering teams guarantees strict adherence to corporate security protocols.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* FORM CONTAINER */}
            <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-8 bg-[#1c1b1b] p-6 md:p-10 relative border border-white/10 shadow-xl">
              <div className="flex flex-col gap-2 border-b border-white/10 pb-4 justify-between md:flex-row md:items-center">
                <h2 className="font-['Bebas_Neue'] text-3xl text-white uppercase tracking-wide">
                  Inquiry Parameters
                </h2>
                <span className="font-mono text-[10px] text-gray-500 uppercase">SYS.REQ.889.B</span>
              </div>

              {submitSuccess ? (
                <div className="p-8 bg-[#D0190F]/10 border border-[#D0190F] flex flex-col gap-4 text-center items-center my-12">
                  <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">[ TRANSMISSION COMPLETE ]</span>
                  <h3 className="font-['Bebas_Neue'] text-4xl text-white uppercase">Inquiry Received</h3>
                  <p className="font-sans text-sm text-gray-300 max-w-md">
                    Our Security Operations & Enterprise Engagement team will review your briefing. An SLA initial response will be transmitted within 24 hours.
                  </p>
                  <button 
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 px-6 py-2 border border-white/20 text-xs font-mono uppercase hover:border-[#D0190F] transition-all"
                  >
                    Submit Another Protocol
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-gray-400 uppercase">
                        Executive Identity / Title *
                      </label>
                      <input 
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="J. Doe, VP Engineering" 
                        required 
                        type="text"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-gray-400 uppercase">
                        Corporate E-Mail *
                      </label>
                      <input 
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="j.doe@enterprise.com" 
                        required 
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-gray-400 uppercase">
                        Organization Name *
                      </label>
                      <input 
                        className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all placeholder-gray-600" 
                        placeholder="Global Corp Ltd." 
                        required 
                        type="text"
                      />
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <label className="font-mono text-xs text-gray-400 uppercase">
                        Capital Allocation Range
                      </label>
                      <select className="w-full bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all cursor-pointer">
                        <option className="bg-[#131313] text-gray-400" value="">Select Range</option>
                        <option className="bg-[#131313]" value="tier1">&lt; $10,000 USD</option>
                        <option className="bg-[#131313]" value="tier2">$10,000 - $50,000 USD</option>
                        <option className="bg-[#131313]" value="tier3">$50,000+ USD (Enterprise)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <label className="font-mono text-xs text-gray-400 uppercase">
                      Strategic Domain (Select Multiple)
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {[
                        { id: 'cloud', label: 'Cloud Infrastructure' },
                        { id: 'engineering', label: 'Custom Engineering' },
                        { id: 'audit', label: 'Cyber Security Audit' },
                        { id: 'architecture', label: 'Architecture Review' }
                      ].map(domain => {
                        const isSelected = selectedDomains.includes(domain.id);
                        return (
                          <button
                            type="button"
                            key={domain.id}
                            onClick={() => toggleDomain(domain.id)}
                            className={`px-5 py-3 border font-mono text-xs uppercase transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#D0190F]/20 border-[#D0190F] text-[#D0190F]'
                                : 'bg-[#131313] border-white/10 text-gray-300 hover:border-[#D0190F]/50'
                            }`}
                          >
                            {domain.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-gray-400 uppercase">
                      Briefing Summary *
                    </label>
                    <textarea 
                      className="bg-[#131313] p-4 text-sm text-white font-sans focus:outline-none focus:border-[#D0190F] border border-white/10 transition-all min-h-[160px] resize-y placeholder-gray-600" 
                      placeholder="Detail the core objectives, existing tech stack, and primary constraints..." 
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10">
                    <p className="font-mono text-[10px] text-gray-400 uppercase max-w-xs leading-relaxed">
                      🔒 All inquiries are bound by standard NDA and enterprise confidentiality protocols.
                    </p>
                    <button 
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-10 py-4 bg-[#D0190F] text-white font-mono text-xs uppercase tracking-widest hover:bg-[#a0130b] transition-all shadow-xl flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50" 
                      type="submit"
                    >
                      {isSubmitting ? 'TRANSMITTING...' : 'TRANSMIT INQUIRY →'}
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* RIGHT SIDEBAR / INFO */}
            <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6">
              
              <div className="bg-[#1c1b1b] p-8 flex flex-col gap-4 border-t-2 border-[#D0190F] shadow-xl border-x border-b border-white/10">
                <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">// SECURITY ASSURANCE</span>
                <h3 className="font-['Bebas_Neue'] text-3xl text-white uppercase leading-none">
                  Zero-Trust Data Protocol
                </h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  All submitted documentation is encrypted at rest. Guaranteed SLA initial response within <strong className="text-white">24 Hours</strong> for enterprise tier requests.
                </p>
              </div>

              <div className="bg-[#1c1b1b] p-8 flex flex-col gap-6 border border-white/10 shadow-xl">
                <div className="flex flex-col gap-2 border-b border-white/10 pb-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Direct Comms</span>
                  <a href="mailto:info@soulmedia.id" className="font-mono text-base text-[#D0190F] hover:underline flex items-center gap-2">
                    info@soulmedia.id →
                  </a>
                </div>

                <div className="flex flex-col gap-6">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Global Nodes</span>
                  
                  {/* HQ Jogja */}
                  <div className="flex flex-col gap-2 border-l-2 border-[#D0190F] pl-4">
                    <span className="font-mono text-xs text-white uppercase font-bold">HQ Yogyakarta, IND</span>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      RUKO DE MERCY<br />
                      Jl. Kapten Haryadi Ngebel Gede No.R.02<br />
                      Kec. Ngaglik, Kab. Sleman, DI Yogyakarta 55581
                    </p>
                    <div className="w-full h-28 mt-2 bg-[#131313] border border-white/10 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80" 
                        alt="Yogyakarta Tech Hub" 
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100" 
                      />
                    </div>
                  </div>

                  {/* Jakarta Node */}
                  <div className="flex flex-col gap-2 border-l-2 border-gray-600 pl-4 mt-2">
                    <span className="font-mono text-xs text-white uppercase font-bold">Jakarta Exchange Node</span>
                    <p className="font-sans text-xs text-gray-400 leading-relaxed">
                      [soon]
                    </p>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};