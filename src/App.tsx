import React from 'react';
import { Hero } from './components/Hero';
import { VisionMission } from './components/VisionMission';
import { Services } from './components/Services';
import { Leadership } from './components/Leadership';
import logo from './assets/logo.svg';

export function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#D0190F] selection:text-white">
      {/* Header / Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="h-28 max-w-[1440px] mx-auto px-12 md:px-28 flex items-center justify-between">
          
          {/* Logo Brand SVG */}
          <a href="#" className="flex items-center gap-3 group py-2">
            <img 
              src={logo} 
              alt="Soul Media Global Logo" 
              className="h-24 w-auto object-contain mix-blend-screen transition-transform duration-300 group-hover:scale-105" 
            />
          </a>

          <nav className="hidden lg:flex items-center gap-10 font-mono text-xs uppercase tracking-widest text-gray-400">
            <a href="#solutions" className="text-[#D0190F] border-b-2 border-[#D0190F] pb-1">Solutions</a>
            <a href="#vision" className="hover:text-white transition-colors">Vision & Mission</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#founders" className="hover:text-white transition-colors">Leadership</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </nav>

          <button className="px-6 py-2.5 border border-[#D0190F] text-[#D0190F] font-mono text-xs uppercase hover:bg-[#D0190F] hover:text-white transition-all cursor-pointer">
            Get Started
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-28">
        <Hero />
        <VisionMission />
        <Services />
        <Leadership />
      </main>
    </div>
  );
}

export default App;