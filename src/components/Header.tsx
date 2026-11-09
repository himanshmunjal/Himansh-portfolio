import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Download, SlidersHorizontal } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import ReadingOptions from '@/components/notebook/ReadingOptions';

// Save the résumé as public/resume/Himansh_Munjal_Resume.pdf (the hero's download button uses the same path)
const RESUME_URL = '/resume/Himansh_Munjal_Resume.pdf';

const navLinks = [
  { name: 'Home', href: '/', section: 'hero' },
  { name: 'About', href: '/#about', section: 'about' },
  { name: 'Journey', href: '/#journey', section: 'journey' },
  { name: 'Projects', href: '/#projects', section: 'projects' },
  { name: 'Blog', href: '/#blog', section: 'blog' },
  { name: 'Connect', href: '/#connect', section: 'connect' },
];

// Which section is under the header right now (home page only)
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    if (!enabled) return;
    const els = navLinks.map((l) => document.getElementById(l.section)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return active;
}

/** Paper / ink / text settings in a small popover; closes on outside click or Escape */
const AppearanceMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Appearance: paper, ink and text size"
        className={`grid h-9 w-9 place-items-center rounded-[3px] transition-colors hover:text-ink ${open ? 'text-ink' : 'text-ink-3'}`}
      >
        <SlidersHorizontal className="h-[18px] w-[18px]" />
      </button>
      {open && (
        <div className="sheet animate-fade-up absolute right-0 top-full z-50 mt-2 w-[17rem] p-5">
          <p className="hand mb-4 text-2xl">choose your paper</p>
          <ReadingOptions />
        </div>
      )}
    </div>
  );
};

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const onHome = location.pathname === '/';
  const active = useActiveSection(onHome);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (section: string) => {
    setIsMobileMenuOpen(false);
    if (!onHome) return;
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  };

  const isActive = (section: string) =>
    onHome ? active === section : (section === 'projects' && location.pathname.startsWith('/project')) ||
      (section === 'blog' && location.pathname.startsWith('/blog'));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled || isMobileMenuOpen ? 'border-b rule backdrop-blur-md' : 'border-b border-transparent'
      }`}
      style={{ background: scrolled || isMobileMenuOpen ? 'color-mix(in srgb, var(--paper) 86%, transparent)' : 'transparent' }}
    >
      <div className="wrap flex h-16 items-center justify-between gap-6">
        {/* Monogram + notebook label */}
        <Link to="/" viewTransition className="group flex items-center gap-3" onClick={() => handleNavClick('hero')}>
          <span className="serif grid h-9 w-9 place-items-center rounded-[3px] border-2 border-[var(--ink)] text-lg leading-none text-ink transition-transform group-hover:-rotate-6">
            HM
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="serif block text-lg text-ink">Himansh Munjal</span>
            <span className="eyebrow block text-[0.6rem]">Lab notebook · Vol. I</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link.section)}
                  aria-current={isActive(link.section) ? 'true' : undefined}
                  className={`relative block px-3 py-2 text-sm transition-colors ${
                    isActive(link.section) ? 'text-ink' : 'text-ink-3 hover:text-ink'
                  }`}
                >
                  {link.name}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 60 8"
                    preserveAspectRatio="none"
                    className={`absolute inset-x-2 -bottom-0.5 h-2 w-[calc(100%-1rem)] text-accent transition-opacity ${
                      isActive(link.section) ? 'opacity-100' : 'opacity-0'
                    }`}
                  >
                    <path d="M2 5 C 15 1, 30 7, 45 3 S 58 4, 58 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <AppearanceMenu />
          <button
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-[3px] text-ink-3 transition-colors hover:text-ink"
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
          </button>

          <a href={RESUME_URL} download className="btn hidden !py-2 md:inline-flex">
            <Download className="h-4 w-4" />
            Resume
          </a>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-9 w-9 place-items-center rounded-[3px] text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation — an index page */}
      {isMobileMenuOpen && (
        <nav className="wrap animate-fade-up border-t rule pb-6 pt-2 md:hidden" aria-label="Mobile">
          <ol>
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <Link
                  to={link.href}
                  onClick={() => handleNavClick(link.section)}
                  className="flex items-baseline gap-4 border-b border-dashed rule py-3"
                >
                  <span className="meta accent w-6">{String(i).padStart(2, '0')}</span>
                  <span className={`serif text-2xl ${isActive(link.section) ? 'text-accent' : 'text-ink'}`}>{link.name}</span>
                </Link>
              </li>
            ))}
          </ol>
          <a href={RESUME_URL} download className="btn mt-5">
            <Download className="h-4 w-4" />
            Resume
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
