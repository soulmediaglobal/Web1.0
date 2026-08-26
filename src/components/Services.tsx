import React from 'react';

export const Services: React.FC = () => {
  const servicesList = [
    {
      title: "Digital Strategy & Architecture",
      desc: "Merancang cetak biru arsitektur IT enterprise untuk menyelaraskan investasi teknologi dengan target pertumbuhan bisnis korporasi.",
    },
    {
      title: "Enterprise Infrastructure",
      desc: "Desain dan implementasi lingkungan infrastruktur server & cloud berkeandalan tinggi (zero-trust & high-availability).",
    },
    {
      title: "System Integration",
      desc: "Menghubungkan berbagai aplikasi enterprise terpisah menjadi satu ekosistem operasional yang padu, aman, dan efisien.",
    },
    {
      title: "Custom Software Engineering",
      desc: "Pengembangan aplikasi web dan mobile berskala besar berstandar industri dengan arsitektur microservices dan performa tinggi.",
    },
    {
      title: "Cybersecurity & Governance",
      desc: "Proteksi aset data kritis korporasi melalui audit keamanan terpadu, pemenuhan standar regulasi, dan mitigasi risiko siber.",
    },
    {
      title: "Managed IT Operations",
      desc: "Dukungan operasional dan pemeliharaan infrastruktur teknologi secara berkelanjutan dengan SLA tingkat enterprise.",
    },
  ];

  return (
    <section id="services" className="w-full bg-[#0e0e0e] py-24 border-t border-b border-white/5">
      <div className="max-w-[1440px] mx-auto px-12 md:px-28 flex flex-col gap-16">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <span className="font-mono text-xs text-[#D0190F] uppercase tracking-[0.2em] mb-3 block">
              Core Capabilities
            </span>
            <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase tracking-wider">
              Strategic Services
            </h2>
          </div>
          <a 
            href="#contact" 
            className="font-mono text-xs text-gray-400 hover:text-[#D0190F] transition-colors uppercase border-b border-white/20 pb-1 flex items-center gap-2 w-max"
          >
            Consultation Request →
          </a>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <div 
              key={index}
              className="group bg-[#1c1b1b] p-10 border-t-2 border-transparent hover:border-[#D0190F] transition-all duration-300 flex flex-col justify-between min-h-[300px]"
            >
              <div className="font-mono text-xs text-gray-500 group-hover:text-[#D0190F] transition-colors">
                0{index + 1} // PROTOCOL
              </div>
              
              <div className="flex flex-col gap-4 mt-8">
                <h3 className="font-['Bebas_Neue'] text-3xl text-white uppercase tracking-wide">
                  {service.title}
                </h3>
                <p className="font-sans text-sm text-gray-400 leading-relaxed">
                  {service.desc}
                </p>
                <div className="w-0 overflow-hidden group-hover:w-full transition-all duration-500 ease-out mt-2">
                  <span className="font-mono text-xs text-[#D0190F] uppercase whitespace-nowrap">
                    Initialize Protocol _
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};