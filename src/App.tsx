import { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Hero } from './components/Hero';
import { SelectedWork } from './components/SelectedWork';
import { WhySMG } from './components/WhySMG';
import { FinalCTA } from './components/FinalCTA';
import { Services } from './components/Services';
import { Leadership } from './components/Leadership';
import { SolutionsPage } from './pages/SolutionsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { WorkPage } from './pages/WorkPage';
import { WorkDetailPage } from './pages/WorkDetailPage';
import { AuthProvider } from './auth/AuthProvider';
import { RequireCmsUser } from './auth/RequireCmsUser';
import { CmsLoginPage } from './pages/cms/CmsLoginPage';
import { CmsShell } from './pages/cms/CmsShell';
import logo from './assets/Logo.png';
import { ContentProvider } from './content/ContentProvider';
import { useContent, useSiteCopy } from './content/useContent';

function HomePage() {
  return (
    <>
      <div className="hero-services-journey relative">
        <Hero />
        <Services />
      </div>
      <SelectedWork />
      <WhySMG />
      <Leadership />
      <FinalCTA />
    </>
  );
}

export function App() {
  const location = useLocation();

  if (location.pathname.startsWith('/cms')) {
    return (
      <AuthProvider>
        <Routes>
          <Route path="/cms/login" element={<CmsLoginPage />} />
          <Route element={<RequireCmsUser />}>
            <Route path="/cms" element={<CmsShell />} />
          </Route>
        </Routes>
      </AuthProvider>
    );
  }

  return (
    <ContentProvider>
      <PublicSite />
    </ContentProvider>
  );
}

function PublicSite() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pages } = useContent();
  const footerTagline = useSiteCopy('shared.footer.tagline', 'Digital Transformation & Technology Partner');
  const footerPractice = useSiteCopy('shared.footer.practice', 'Strategy. Product. Engineering. AI. Infrastructure.');
  const footerLocation = useSiteCopy('shared.footer.location', 'Yogyakarta, Indonesia');

  useEffect(() => {
    const routeSlug = location.pathname === '/' ? 'home' : location.pathname.split('/')[1];
    const metadata = pages.find((page) => page.slug === routeSlug);
    if (metadata) document.title = `${metadata.title} — Soul Media Global`;
  }, [location.pathname, pages]);

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
            <Link to="/" className={getLinkClass('/')}>HOME</Link>
            <Link to="/solutions" className={getLinkClass('/solutions')}>SOLUTIONS</Link>
            <Link to="/work" className={getLinkClass('/work')}>WORK</Link>
            <Link to="/about" className={getLinkClass('/about')}>ABOUT</Link>
            <Link to="/contact" className={getLinkClass('/contact')}>CONTACT</Link>
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
            <Link to="/" onClick={closeMenu} className={getLinkClass('/')}>// HOME</Link>
            <Link to="/solutions" onClick={closeMenu} className={getLinkClass('/solutions')}>// SOLUTIONS</Link>
            <Link to="/work" onClick={closeMenu} className={getLinkClass('/work')}>// WORK</Link>
            <Link to="/about" onClick={closeMenu} className={getLinkClass('/about')}>// ABOUT</Link>
            <Link to="/contact" onClick={closeMenu} className={getLinkClass('/contact')}>// CONTACT</Link>
            
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
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:slug" element={<WorkDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      <footer className="relative w-full overflow-hidden border-t border-white/5 bg-[#0a0a0a] py-16 md:py-24">
        <div className="pointer-events-none absolute -bottom-28 -left-8 font-['Bebas_Neue'] text-[15rem] leading-none text-white/[0.018] md:text-[24rem]" aria-hidden="true">SMG</div>
        <div className="relative mx-auto max-w-[1440px] px-6 md:px-16">
          <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-16 md:grid-cols-12 md:pb-20">
            <div className="md:col-span-6">
              <Link to="/" className="font-['Bebas_Neue'] text-4xl uppercase tracking-wider text-white md:text-5xl">
                Soul Media Global
              </Link>
              <p className="mt-5 font-sans text-base text-gray-300">
                {footerTagline}
              </p>
              <p className="mt-3 max-w-xl font-mono text-[10px] uppercase leading-6 tracking-[0.14em] text-gray-500">
                {footerPractice}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">Navigate</p>
              <nav aria-label="Footer navigation" className="flex flex-col items-start gap-3 font-sans text-sm text-gray-400">
                <Link className="transition-colors hover:text-white" to="/solutions">Solutions</Link>
                <Link className="transition-colors hover:text-white" to="/work">Work</Link>
                <Link className="transition-colors hover:text-white" to="/about">About</Link>
                <Link className="transition-colors hover:text-white" to="/contact">Contact</Link>
              </nav>
            </div>

            <div className="md:col-span-2">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">Location</p>
              <p className="font-sans text-sm leading-6 text-gray-400">{footerLocation}</p>
            </div>

            <div className="md:col-span-2">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[#ffb4a8]">Social</p>
              <span className="font-sans text-sm text-gray-400">LinkedIn</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-8 font-mono text-[9px] uppercase tracking-[0.14em] text-gray-600 sm:flex-row sm:items-center sm:justify-between">
            <span>© 2026 Soul Media Global. All rights reserved.</span>
            <span>{footerLocation}</span>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default App;
