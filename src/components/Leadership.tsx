import React from 'react';

export const Leadership: React.FC = () => {
  const leaders = [
    {
      name: "Tomy Galih Prasetyo",
      role: "Co-Founder",
      quote: "Membangun arsitektur IT berstandar tinggi untuk mendorong efisiensi dan pertumbuhan bisnis enterprise.",
      email: "tomy@soulmedia.id"
    },
    {
      name: "Rayhan",
      role: "Co-Founder",
      quote: "Menghadirkan inovasi ekosistem digital yang tangguh, aman, dan adaptif untuk menjawab tantangan industri masa depan.",
      email: "rayhan@soulmedia.id"
    }
  ];

  return (
    <>
      {/* Leadership Section */}
      <section id="founders" className="w-full bg-[#0a0a0a] py-24 border-b border-white/5">
        <div className="max-w-[1440px] mx-auto px-12 md:px-28 flex flex-col gap-16">
          
          <div>
            <span className="font-mono text-xs text-[#D0190F] uppercase tracking-[0.2em] mb-3 block">
              Executive Board
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase tracking-wider">
              Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {leaders.map((leader, index) => (
              <div 
                key={index} 
                className="bg-[#1c1b1b] p-10 border border-white/10 flex flex-col justify-between relative group hover:border-[#D0190F] transition-all duration-300 min-h-[300px]"
              >
                <div className="absolute top-6 right-6 font-mono text-xs text-gray-600">
                  0{index + 1} // LEAD
                </div>

                <div>
                  <h3 className="font-['Bebas_Neue'] text-4xl text-white uppercase leading-none mb-2">
                    {leader.name}
                  </h3>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-px bg-[#D0190F] w-8" />
                    <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">
                      {leader.role}
                    </span>
                  </div>

                  <p className="font-sans text-base text-gray-300 italic border-l-2 border-white/20 pl-4 py-1 mb-8">
                    "{leader.quote}"
                  </p>
                </div>

                <div className="flex gap-4 items-center mt-auto pt-6 border-t border-white/5">
                  <a 
                    href={`mailto:${leader.email}`} 
                    className="px-4 py-2 border border-white/20 hover:border-[#D0190F] hover:bg-[#D0190F]/10 text-white font-mono text-xs uppercase transition-all"
                  >
                    Email
                  </a>
                  <a 
                    href="#" 
                    className="px-4 py-2 border border-white/20 hover:border-[#D0190F] hover:bg-[#D0190F]/10 text-white font-mono text-xs uppercase transition-all"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="w-full bg-[#0e0e0e] border-t border-white/5 py-16">
        <div className="max-w-[1440px] mx-auto px-12 md:px-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            <div className="flex flex-col gap-4">
              <span className="font-['Bebas_Neue'] text-3xl text-white tracking-widest">
                SOUL MEDIA GLOBAL
              </span>
              <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
                Architecting digital futures for high-stakes enterprise environments[cite: 2].
              </p>
            </div>

            <div className="flex flex-col gap-2 font-sans text-sm">
              <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest mb-1">
                HQ Yogyakarta
              </span>
              <p className="text-gray-400">
                DI Yogyakarta, Indonesia[cite: 1, 2]
              </p>
            </div>

            <div className="flex flex-col gap-2 font-sans text-sm">
              <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest mb-1">
                Jakarta Office
              </span>
              <p className="text-gray-400">
                DKI Jakarta, Indonesia[cite: 1, 2]
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            © {new Date().getFullYear()} PT SOUL MEDIA GLOBAL. ALL RIGHTS RESERVED.[cite: 1, 2]
          </div>
        </div>
      </footer>
    </>
  );
};