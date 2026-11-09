import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Instagram, FileText, ArrowDown } from 'lucide-react';
import Annotation from '@/components/notebook/Annotation';
import { allProjects } from '@/data/projects';
import { allBlogs } from '@/data/blogs';
import { technologies } from '@/data/technologies';

// three.js + fiber + drei (~900 KB) live in this chunk. It's only requested once the
// intro has finished, the figure is near the viewport and the browser is idle, so it never
// competes with first paint. On phones the figure sits below the text, so it loads on scroll.
const Hero3DScene = lazy(() => import('../common/Hero3DScene'));

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/munjal.himansh/', label: 'Instagram' },
];

const roles = [
  { title: 'Data', subtitle: 'Scientist' },
  { title: 'Data', subtitle: 'Analyst' },
  { title: 'Full Stack', subtitle: 'Developer' },
];

const readings = [
  { value: '8.58', label: 'CGPA at VIT Vellore', href: '/#journey', color: 'var(--c-gold)' },
  { value: String(technologies.length), label: 'tools in the kit', href: '/#toolkit', color: 'var(--c-teal)' },
  { value: String(allProjects.length), label: 'experiments logged', href: '/projects/all', color: 'var(--accent)' },
  { value: String(allBlogs.length), label: 'notebook entries', href: '/blogs/all', color: 'var(--c-violet)' },
];

/** WebGL can be missing (hardware acceleration off, old devices, locked-down browsers) */
const supportsWebGL = () => {
  try {
    const c = document.createElement('canvas');
    return Boolean(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
};

/** If the 3D scene still throws (lost context, driver bugs), show the placeholder instead of
    letting the error reach the router, which would replace the whole page with the 404 screen */
class FigureBoundary extends React.Component<{ children: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? <FigurePlaceholder label="figure unavailable" /> : this.props.children;
  }
}

const hasIdle = typeof window !== 'undefined' && typeof window.requestIdleCallback === 'function';
const idle = (cb: () => void): number => (hasIdle ? window.requestIdleCallback(cb, { timeout: 2500 }) : window.setTimeout(cb, 800));
const cancelIdle = (id: number) => (hasIdle ? window.cancelIdleCallback(id) : window.clearTimeout(id));

/** Crop marks + caption around the 3D figure */
const FigureFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <figure className="relative h-full w-full">
    {(['left-0 top-0 border-l-2 border-t-2', 'right-0 top-0 border-r-2 border-t-2', 'bottom-8 left-0 border-b-2 border-l-2', 'bottom-8 right-0 border-b-2 border-r-2'] as const).map((c) => (
      <span key={c} aria-hidden="true" className={`absolute h-5 w-5 border-[var(--ink-3)] ${c}`} />
    ))}
    <div className="absolute inset-x-0 bottom-8 top-0">{children}</div>
    <figcaption className="meta absolute inset-x-0 bottom-0 flex justify-between">
      <span><span className="accent">Fig. 0</span> · the author, rendered in three.js</span>
      <span className="hidden sm:inline">drag to rotate</span>
    </figcaption>
  </figure>
);

const HeroSection: React.FC<{ introDone?: boolean }> = ({ introDone = true }) => {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const figureRef = useRef<HTMLDivElement>(null);
  const [figureNear, setFigureNear] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Is the figure on (or about to come on) screen? Once true, it stays true.
  useEffect(() => {
    const el = figureRef.current;
    if (!el || figureNear) return;
    // Phones: the figure starts low in the first screen, so wait until half of it is visible
    // (one small scroll) instead of spending ~900 KB of 3D on first load. Larger screens: load a bit early.
    const phone = window.matchMedia('(max-width: 767px)').matches;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setFigureNear(true),
      phone ? { threshold: 0.5 } : { rootMargin: '200px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [figureNear]);

  // Defer the 3D chunk until the intro is done, the figure is near and the main thread is free
  useEffect(() => {
    if (!introDone || !figureNear || show3D || !supportsWebGL()) return;
    const id = idle(() => setShow3D(true));
    return () => cancelIdle(id);
  }, [introDone, figureNear, show3D]);

  // Stop rendering the canvas while the hero is off screen
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Role cycling: fade out, swap, fade in
  useEffect(() => {
    const id = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((p) => (p + 1) % roles.length);
        setRoleVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  const role = roles[roleIndex];

  return (
    <section ref={heroRef} id="hero" className="relative flex min-h-[100svh] flex-col justify-center pb-10 pt-24">
      <div className="wrap grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-6">
        {/* ── Text ── */}
        <div className="relative z-10">
          <p className="eyebrow animate-fade-up flex items-center gap-3">
            <span className="accent">Entry 001</span>
            <span className="h-px w-8 bg-[var(--rule-strong)]" aria-hidden="true" />
            <span>Hello! I&apos;m</span>
          </p>

          <h1 className="serif animate-fade-up mt-4 text-[clamp(3.6rem,10vw,8.2rem)] leading-[0.88] text-ink" style={{ animationDelay: '80ms' }}>
            Himansh
            <br />
            <em className="text-accent">Munjal</em>
          </h1>

          <div className="animate-fade-up mt-6 flex flex-wrap items-baseline gap-x-3 text-2xl sm:text-3xl" style={{ animationDelay: '160ms' }}>
            <span className="hand text-3xl sm:text-4xl">a creative</span>
            <span
              aria-live="polite"
              className="serif text-ink transition-all duration-300"
              style={{ opacity: roleVisible ? 1 : 0, transform: roleVisible ? 'none' : 'translateY(8px)' }}
            >
              <span className="highlight">{role.title} {role.subtitle}</span>
            </span>
          </div>

          <p className="animate-fade-up mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed" style={{ animationDelay: '240ms' }}>
            Data Science student at VIT Vellore. I build machine-learning pipelines, predictive models and the
            systems underneath them, and I log every project like an experiment: <em>question, method, result</em>.
          </p>

          <div className="animate-fade-up mt-8 flex flex-wrap items-center gap-3" style={{ animationDelay: '320ms' }}>
            <a href="#projects" className="btn">
              See the experiments <ArrowDown className="h-4 w-4" />
            </a>
            <a href="/resume/Himansh_Munjal_Resume.pdf" download className="btn-ghost" aria-label="Download Resume">
              Resume <FileText className="h-4 w-4" />
            </a>
            <div className="ml-1 flex items-center gap-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full text-ink-3 transition-colors hover:text-accent"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ── Fig. 0: the 3D author ── */}
        <div ref={figureRef} className="relative h-[52vh] min-h-[340px] sm:h-[60vh] lg:h-[68vh]">
          <FigureFrame>
            {show3D ? (
              <div className="h-full w-full pointer-events-none sm:pointer-events-auto">
                <FigureBoundary>
                  <Suspense fallback={<FigurePlaceholder label="loading model…" />}>
                    <Hero3DScene isMobile={isMobile} paused={!onScreen} scrollProgress={0} />
                  </Suspense>
                </FigureBoundary>
              </div>
            ) : (
              <FigurePlaceholder label="specimen arriving…" />
            )}
          </FigureFrame>
          <Annotation dir="down-left" className="absolute -top-2 right-0 hidden text-2xl lg:inline-flex" arrowFirst={false} rotate={4}>
            yes, that&apos;s me
          </Annotation>
        </div>
      </div>

      {/* ── Readings strip ── */}
      <div className="wrap mt-10 lg:mt-4">
        <dl className="grid grid-cols-2 border-y rule sm:grid-cols-4">
          {/* dt/dd must sit directly in a <dl> or a <div> inside it, so the link lives in the <dd>
              and its ::after stretches over the whole cell to keep the full click target */}
          {readings.map((r, i) => (
            <div
              key={r.label}
              className={`group relative flex flex-col-reverse px-1 py-4 sm:px-5 ${i > 0 ? 'sm:border-l sm:border-dashed rule' : ''} ${i % 2 ? 'border-l border-dashed rule pl-4 sm:pl-5' : ''}`}
            >
              <dt className="meta flex items-center gap-2">
                <span aria-hidden="true" className="h-0.5 w-3 transition-all duration-300 group-hover:w-6" style={{ background: r.color }} />
                {r.label}
              </dt>
              <dd className="serif mb-1 text-4xl leading-none transition-opacity group-hover:opacity-80" style={{ color: r.color }}>
                <Link to={r.href} viewTransition className="after:absolute after:inset-0" aria-label={`${r.value} ${r.label}`}>
                  {r.value}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};

const FigurePlaceholder: React.FC<{ label: string }> = ({ label }) => (
  <div className="grid h-full w-full place-items-center" aria-hidden="true">
    <div className="relative grid h-40 w-40 place-items-center rounded-full border border-dashed border-[var(--rule-strong)]">
      <span className="absolute inset-x-0 top-1/2 border-t border-dashed rule" />
      <span className="absolute inset-y-0 left-1/2 border-l border-dashed rule" />
      <span className="meta relative bg-paper px-2">{label}</span>
    </div>
  </div>
);

export default HeroSection;
