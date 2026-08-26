import React from 'react';

export const VisionMission: React.FC = () => {
  return (
    <>
      {/* System Status Ticker */}
      <div className="w-full bg-[#0e0e0e] border-t border-b border-white/5 py-4">
        <div className="max-w-[1440px] mx-auto px-12 md:px-28 flex flex-wrap gap-8 items-center justify-between font-['JetBrains_Mono'] text-xs text-gray-400 uppercase tracking-widest opacity-80">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#D0190F] animate-pulse block" /> SYSTEM STATUS: NOMINAL
          </span>
          <span>LATENCY: 12MS</span>
          <span>UPTIME: 99.999%</span>
          <span className="text-right">HQ: YOGYAKARTA | JAKARTA</span>
        </div>
      </div>

      {/* Vision & Mission Grid */}
      <section id="vision" className="w-full bg-[#1c1b1b] py-24 relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ 
            backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
            backgroundSize: '64px 64px' 
          }} 
        />

        <div className="max-w-[1440px] mx-auto px-12 md:px-28 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            
            {/* Vision */}
            <div className="bg-[#2a2a2a] p-12 md:p-16 flex flex-col gap-10 group hover:bg-[#353534] transition-colors duration-500">
              <div className="flex items-start justify-between">
                <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase tracking-wider relative">
                  Vision
                  <span className="absolute -bottom-3 left-0 w-12 h-1 bg-[#D0190F] group-hover:w-full transition-all duration-700 ease-out" />
                </h2>
                <span className="font-['JetBrains_Mono'] text-xs text-gray-400">01</span>
              </div>
              <p className="font-['Inter'] text-lg text-gray-300 leading-relaxed mt-auto">
                Menjadi mitra transformasi digital enterprise tepercaya di Indonesia yang mendefinisikan ulang efisiensi, keamanan, dan keandalan sistem teknologi informasi[cite: 1].
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#2a2a2a] p-12 md:p-16 flex flex-col gap-10 group hover:bg-[#353534] transition-colors duration-500">
              <div className="flex items-start justify-between">
                <h2 className="font-['Bebas_Neue'] text-4xl md:text-5xl text-white uppercase tracking-wider relative">
                  Mission
                  <span className="absolute -bottom-3 left-0 w-12 h-1 bg-[#D0190F] group-hover:w-full transition-all duration-700 ease-out" />
                </h2>
                <span className="font-['JetBrains_Mono'] text-xs text-gray-400">02</span>
              </div>
              <div className="mt-auto flex flex-col gap-6">
                <p className="font-['Inter'] text-lg text-gray-300 leading-relaxed">
                  Memberdayakan korporasi dan institusi publik melalui arsitektur software berstandar industri dan integrasi ekosistem digital yang adaptif[cite: 1].
                </p>
                <ul className="flex flex-col gap-3 font-['JetBrains_Mono'] text-xs text-white uppercase tracking-wider">
                  <li className="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-[#D0190F] block" /> Strategic IT Alignment</li>
                  <li className="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-[#D0190F] block" /> High-Availability Infrastructure</li>
                  <li className="flex items-center gap-3"><span class="w-1.5 h-1.5 bg-[#D0190F] block" /> Enterprise Security First</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};