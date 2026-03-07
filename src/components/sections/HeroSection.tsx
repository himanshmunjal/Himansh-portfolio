import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

// Lazy load the 3D object
const Hero3DObject = lazy(() => import('../common/Hero3DObject'));

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/munjal.himansh/', label: 'Instagram' },
];

const roles = [
  { title: 'DATA', subtitle: 'SCIENTIST' },
  { title: 'DATA', subtitle: 'ANALYST' },
  { title: 'FULL STACK', subtitle: 'DEVELOPER' },
];

const CanvasLoader = () => (
  <div className="w-full h-full flex items-center justify-center" aria-hidden="true">
    <div className="w-12 h-12 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const scrollYRef = useRef(0);

  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [show3D, setShow3D] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // ── Detect mobile ──────────────────────────────────────────────────
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // ── Defer 3D canvas ────────────────────────────────────────────────
  useEffect(() => {
    const id = setTimeout(() => setShow3D(true), isMobile ? 1500 : 200);
    return () => clearTimeout(id);
  }, [isMobile]);

  // ── Passive scroll listener ────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const el = heroRef.current;
        if (!el) return;
        const progress = Math.min(window.scrollY / el.offsetHeight, 1);
        const opacity = Math.max(1 - progress * 2, 0);
        if (Math.abs(progress - scrollYRef.current) > 0.005) {
          scrollYRef.current = progress;
          setScrollOpacity(opacity);
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Role cycling ───────────────────────────────────────────────────
  useEffect(() => {
    const id = setInterval(() => setRoleIndex(p => (p + 1) % roles.length), 4000);
    return () => clearInterval(id);
  }, []);

  // ── Resume download ────────────────────────────────────────────────
  const handleDownloadResume = () => {
    const a = document.createElement('a');
    a.href = '/resume/Updated_resume2.pdf';
    a.download = 'Himansh_Munjal_Resume.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const fadeStyle = { opacity: scrollOpacity };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="min-h-screen bg-background w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* ── Background glow ─────────────────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                   w-[400px] h-[400px] md:w-[800px] md:h-[800px]
                   bg-purple-600/20 md:bg-purple-600/30
                   rounded-full blur-[80px] md:blur-[100px]
                   pointer-events-none will-change-opacity"
        style={fadeStyle}
        aria-hidden="true"
      />

      {/* ── Social icons ────────────────────────────────────────────────
          Mobile : horizontal row pinned bottom-left (clear of all text)
          md+    : vertical column centered on left edge (original)
      ── */}
      <div className="
        absolute z-50
        bottom-8 left-4 flex flex-row gap-5
        md:bottom-auto md:top-1/2 md:-translate-y-1/2
        md:left-6 lg:left-12 md:flex-col md:gap-6
      ">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            aria-label={label}
          >
            <Icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </a>
        ))}
      </div>

      {/* ── z-0: Blurred role TITLE (behind model) ──────────────────────
          Mobile : top-right corner, right-aligned, shifted up
          md+    : original centered-right layout
      ── */}
      <div
        className="
          absolute z-0 pointer-events-none select-none
          top-[20%] right-5 text-right
          md:top-1/2 md:right-0 md:-translate-y-1/2 md:text-left
          md:w-full md:max-w-[500px] lg:max-w-[600px] md:px-0
        "
        style={fadeStyle}
        aria-hidden="true"
      >
        <p className="text-[11px] md:text-lg lg:text-2xl text-[#c084fc] mb-1 md:mb-2 font-medium">
          A Creative
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="
              font-black leading-[1] tracking-tighter whitespace-nowrap
              text-white/20 blur-[2px] md:blur-[3px]
              text-[2rem] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
            ">
              {roles[roleIndex].title}
            </h2>
            {/* Invisible height spacer */}
            <h2 className="
              font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap mt-1 md:mt-2
              text-[2rem] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
            ">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── z-10: 3D Canvas (deferred) ──────────────────────────────── */}
      {show3D ? (
        <div className="absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas
              camera={{ position: [0, 0, 8], fov: 45 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]}
              performance={{ min: 0.5 }}
              frameloop={isMobile ? 'demand' : 'always'}
            >
              <Environment preset="city" />
              <Hero3DObject scrollProgress={scrollYRef.current} />
            </Canvas>
          </Suspense>
        </div>
      ) : (
        <div
          className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none"
          aria-hidden="true"
        >
          <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* ── z-20: Name — LCP element ────────────────────────────────────
          Mobile : top-left, pushed well above character (~20% from top)
          md+    : original vertically-centered left position
      ── */}
      <div
        className="
          absolute z-20 pointer-events-none
          top-[20%] left-4
          md:top-1/2 md:left-[5%] lg:left-[10%] xl:left-[15%] md:-translate-y-1/2
        "
        style={fadeStyle}
      >
        <p className="text-[11px] md:text-lg lg:text-2xl text-[#c084fc] mb-1 md:mb-2 font-medium">
          Hello! I'm
        </p>
        <h1 className="
          font-black text-white leading-[1] tracking-tighter drop-shadow-2xl
          text-[2.1rem] sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
        ">
          HIMANSH<br />MUNJAL
        </h1>
      </div>

      {/* ── z-20: Crisp role SUBTITLE (in front of model) ───────────────
          Mobile : aligned with blurred title block in top-right
          md+    : original layout
      ── */}
      <div
        className="
          absolute z-20 pointer-events-none
          top-[20%] right-5 text-right
          md:top-1/2 md:right-0 md:-translate-y-1/2 md:text-left
          md:w-full md:max-w-[500px] lg:max-w-[600px] md:px-0
        "
        style={fadeStyle}
      >
        {/* Spacer matches label height */}
        <p className="text-[11px] md:text-lg mb-1 md:mb-2 opacity-0 select-none" aria-hidden="true">
          A Creative
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Spacer matches blurred title height */}
            <h2
              className="
                font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap select-none
                text-[2rem] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
              "
              aria-hidden="true"
            >
              {roles[roleIndex].title}
            </h2>
            {/* Visible crisp subtitle */}
            <h2 className="
              font-black text-white leading-[1] tracking-tighter whitespace-nowrap
              drop-shadow-[0_4px_32px_rgba(0,0,0,1)]
              mt-1 md:mt-2
              text-[2rem] md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl
            ">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Resume button ─────────────────────────────────────────────── */}
      {/* On mobile, nudge left so it doesn't crowd the social icons     */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-50">
        <button
          onClick={handleDownloadResume}
          className="flex items-center gap-2 md:gap-3
                     text-xs md:text-sm lg:text-base font-bold uppercase
                     tracking-[0.15em] md:tracking-[0.2em]
                     text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
          aria-label="Download Resume"
        >
          Resume <FileText className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;