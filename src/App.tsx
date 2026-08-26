import { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { VisionMission } from './components/VisionMission';
import { Services } from './components/Services';
import { Leadership } from './components/Leadership';
import { SolutionsPage } from './pages/SolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import logo from './assets/logo.png';

function HomePage() {
  return (
    <>
      <Hero />
      <VisionMission />
      <Services />
      <Leadership />
    </>
  );
}

export function App() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getLinkClass = (path: string) => {
    return location.pathname === path
      ? "text-[#D0190F] font-bold border-b-2 border-[#D0190F] pb-1"
      : "text-gray-400 hover:text-white transition-colors";
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#D0190F] selection:text-white flex flex-col justify-between">
      
      {/* Header / Navbar */}
      <header className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10">
        <div className="h-24 md:h-28 max-w-[1440px] mx-auto px-6 md:px-28 relative flex items-center justify-between">
          
          <Link 
            to="/" 
            onClick={closeMenu} 
            className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 flex items-center gap-3 group py-2"
          >
            <img 
              src={logo} 
              alt="Soul Media Global Logo" 
              className="h-24 md:h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-10 font-mono text-xs uppercase tracking-widest">
            <Link to="/" className={getLinkClass('/')}>Home</Link>
            <Link to="/solutions" className={getLinkClass('/solutions')}>Solutions</Link>
            <Link to="/about" className={getLinkClass('/about')}>About & Leadership</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>Contact</Link>
          </nav>

          <div className="hidden lg:block">
            <Link to="/contact">
              <button className="px-6 py-2.5 border border-[#D0190F] text-[#D0190F] font-mono text-xs uppercase hover:bg-[#D0190F] hover:text-white transition-all cursor-pointer">
                Get Started
              </button>
            </Link>
          </div>

          <div className="lg:hidden w-8"></div>

          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 text-gray-300 hover:text-[#D0190F] focus:outline-none z-10 ml-auto"
          >
            <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"/>
              ) : (
                <path fillRule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"/>
              )}
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-8 flex flex-col gap-6 font-mono text-sm uppercase tracking-widest">
            <Link to="/" onClick={closeMenu} className={getLinkClass('/')}>// Home</Link>
            <Link to="/solutions" onClick={closeMenu} className={getLinkClass('/solutions')}>// Solutions</Link>
            <Link to="/about" onClick={closeMenu} className={getLinkClass('/about')}>// About & Leadership</Link>
            <Link to="/contact" onClick={closeMenu} className={getLinkClass('/contact')}>// Contact</Link>
            
            <Link to="/contact" onClick={closeMenu} className="mt-4">
              <button className="w-full py-3 border border-[#D0190F] bg-[#D0190F]/10 text-[#D0190F] font-mono text-xs uppercase hover:bg-[#D0190F] hover:text-white transition-all">
                Get Started _
              </button>
            </Link>
          </div>
        )}
      </header>

      {/* Main Routes */}
      <main className="pt-24 md:pt-28 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Global Corporate Footer */}
      <footer className="w-full bg-[#0e0e0e] border-t border-white/5 py-16">
        <div className="max-w-[1440px] mx-auto px-6 md:px-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
            
            <div className="flex flex-col gap-4">
              <span className="font-['Bebas_Neue'] text-4xl text-white tracking-wider">
                SOUL MEDIA GLOBAL
              </span>
              <p className="font-sans text-sm text-gray-400 max-w-xs leading-relaxed">
                Architecting digital futures and enterprise-grade resilience for high-stakes environments.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">
                HQ Yogyakarta
              </span>
              <p className="font-sans text-sm text-gray-400 leading-relaxed">
                RUKO DE MERCY<br />
                Jl. Kapten Haryadi Ngebel Gede No.R.02<br />
                Kec. Ngaglik, Kab. Sleman, DI Yogyakarta 55581
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs text-[#D0190F] uppercase tracking-widest">
                Jakarta Office
              </span>
              <p className="font-sans text-sm text-gray-400 leading-relaxed">
                [soon]
              </p>
            </div>

          </div>

          <div className="mt-16 pt-8 border-t border-white/5 text-center font-mono text-xs text-gray-500 uppercase tracking-widest">
            © 2026 PT SOUL MEDIA GLOBAL. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;