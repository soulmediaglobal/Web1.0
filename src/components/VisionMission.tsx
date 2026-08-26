

export function VisionMission() {
  return (
    <>
      <div className="w-full bg-[#0e0e0e] border-t border-white/5 py-4">
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex flex-wrap gap-8 items-center justify-between font-mono text-xs text-gray-400 uppercase opacity-60">
          <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-[#D0190F] block"></span> System Status: Nominal</span>
          <span>Latency: 12ms</span>
          <span>Uptime: 99.999%</span>
          <span className="text-right">HQ: YOGYAKARTA | JAKARTA: [soon]</span>
        </div>
      </div>

      <section className="w-full bg-[#131313] py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '64px 64px' }}></div>
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 p-px">
            
            <div className="bg-[#1c1b1b] p-12 md:p-16 flex flex-col gap-12 group hover:bg-[#252424] transition-colors duration-500">
              <div className="flex items-start justify-between">
                <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase tracking-wider relative">
                  Vision
                  <span className="absolute -bottom-4 left-0 w-12 h-1 bg-[#D0190F] group-hover:w-full transition-all duration-700 ease-out"></span>
                </h2>
                <span className="font-mono text-xs text-gray-400 opacity-50">01</span>
              </div>
              <p className="font-sans text-lg text-gray-300 max-w-md mt-auto leading-relaxed">
                To be the undisputed regional leader in enterprise IT architecture, setting the standard for resilience, scalability, and technological elegance in Southeast Asia.
              </p>
            </div>

            <div className="bg-[#1c1b1b] p-12 md:p-16 flex flex-col gap-12 group hover:bg-[#252424] transition-colors duration-500">
              <div className="flex items-start justify-between">
                <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase tracking-wider relative">
                  Mission
                  <span className="absolute -bottom-4 left-0 w-12 h-1 bg-[#D0190F] group-hover:w-full transition-all duration-700 ease-out"></span>
                </h2>
                <span className="font-mono text-xs text-gray-400 opacity-50">02</span>
              </div>
              <div className="mt-auto flex flex-col gap-6">
                <p className="font-sans text-lg text-gray-300 max-w-md leading-relaxed">
                  Empowering market leaders through uncompromising commitment to excellence and transformative digital strategies.
                </p>
                <ul className="flex flex-col gap-3 font-mono text-xs text-white uppercase tracking-wider">
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#D0190F] block"></span> Strategic IT Alignment</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#D0190F] block"></span> High-Availability Infrastructure</li>
                  <li className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-[#D0190F] block"></span> Enterprise Security First</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}