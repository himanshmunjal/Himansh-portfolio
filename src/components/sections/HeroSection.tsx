import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
import Hero3DObject from '../common/Hero3DObject';

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  { icon: Instagram, href: "https://www.instagram.com/munjal.himansh/", label: 'Instagram' },
];

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = [
    { title: "DATA", subtitle: "SCIENTIST" },
    { title: "DATA", subtitle: "ANALYST" },
    { title: "FULL STACK", subtitle: "DEVELOPER" }
  ];

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      setCurrentScroll(latest);
    });
  }, [scrollYProgress]);

  // Role cycle timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section ref={heroRef} id="hero" className="min-h-screen bg-background w-full flex items-center justify-center relative overflow-hidden">

      {/* Background Glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"
        style={{
          x: "-50%",
          y: "-50%",
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      />

      {/* Social Icons (Left Sidebar) */}
      <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            aria-label={social.label}
          >
            <social.icon className="w-5 h-5 md:w-6 md:h-6" />
          </a>
        ))}
      </div>

      {/* =====================================================
          LAYER z-0: Right role title — BLURRED, BEHIND MODEL
          This line (e.g. "DATA") peeks out behind the character.
          The character sandwiches between this and z-20.
          MOVED FURTHER RIGHT to avoid character overlap
          ===================================================== */}
      <motion.div
        className="absolute right-[0%] md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[320px] md:max-w-[500px] lg:max-w-[600px] z-0 pointer-events-none select-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        <p className="text-lg md:text-2xl text-[#c084fc] mb-2 font-medium">A Creative</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blurred title sits at the "middle" vertical position — behind character */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/20 leading-[1] tracking-tighter blur-[3px] whitespace-nowrap">
              {roles[roleIndex].title}
            </h2>
            {/* Invisible height spacer so z-0 and z-20 share the same bounding box height */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap mt-2">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* =====================================================
          LAYER z-10: 3D MODEL — Sandwiched between the two text layers
          ===================================================== */}
      <div className="absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Environment preset="city" />
            <Hero3DObject scrollProgress={currentScroll} />
          </Canvas>
        </Suspense>
      </div>

      {/* =====================================================
          LAYER z-20: Left name + Right role subtitle — CRISP, IN FRONT
          MOVED FURTHER RIGHT to avoid character overlap
          ===================================================== */}

      {/* Left: "Hello! I'm / HIMANSH MUNJAL" */}
      <motion.div
        className="absolute left-[5%] md:left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        <p className="text-lg md:text-2xl text-[#c084fc] mb-2 font-medium">Hello! I'm</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter drop-shadow-2xl">
          HIMANSH<br />MUNJAL
        </h1>
      </motion.div>

      {/* Right: subtitle floats in FRONT of character (z-20) - MOVED FURTHER RIGHT */}
      <motion.div
        className="absolute right-[0%] md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[320px] md:max-w-[500px] lg:max-w-[600px] z-20 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        {/* Invisible spacer — matches "A Creative" height from z-0 layer */}
        <p className="text-lg md:text-2xl mb-2 opacity-0 select-none">A Creative</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Invisible spacer — matches blurred title from z-0 so subtitle sits below it */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap select-none">
              {roles[roleIndex].title}
            </h2>
            {/* Crisp, bold, white subtitle — sits below where the character head is */}
            <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1] tracking-tighter mt-2 whitespace-nowrap drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Right Resume Button */}
      <div className="absolute bottom-8 right-8 z-50">
        <a
          href="/public/resume/updated_resume2.pdf"
          className="flex items-center gap-3 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          Resume <FileText className="w-4 h-4 md:w-5 md:h-5" />
        </a>
      </div>

    </section>
  );
};

export default HeroSection;