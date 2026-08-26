
import tomyImg from '../assets/tomy.png';
import rayhanImg from '../assets/ray.png';

export function Leadership() {
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
    <section id="founders" className="py-24 px-6 md:px-28 bg-[#0a0a0a]">
      <div className="max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-mono text-xs text-[#D0190F] tracking-[0.2em] uppercase mb-3">
            Command Center
          </span>
          <h2 className="font-['Bebas_Neue'] text-5xl md:text-6xl text-white uppercase">
            Executive Leadership
          </h2>
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent opacity-90"></div>

                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-2">
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-mono text-[10px] text-[#D0190F] uppercase tracking-widest bg-[#0a0a0a]/80 backdrop-blur px-2.5 py-1 border border-[#D0190F]/30">
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
  );
}