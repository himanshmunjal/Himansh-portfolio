// import React, { useState, useEffect, useRef, Suspense } from 'react';
// import { Github, Linkedin, Instagram, FileText } from 'lucide-react';
// import { Canvas } from '@react-three/fiber';
// import { Environment } from '@react-three/drei';
// import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';
// import Hero3DObject from '../common/Hero3DObject';

// const socialLinks = [
//   { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
//   { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
//   { icon: Instagram, href: "https://www.instagram.com/munjal.himansh/", label: 'Instagram' },
// ];

// const HeroSection: React.FC = () => {
//   const heroRef = useRef<HTMLElement>(null);
//   const [roleIndex, setRoleIndex] = useState(0);

//   const roles = [
//     { title: "DATA", subtitle: "SCIENTIST" },
//     { title: "DATA", subtitle: "ANALYST" },
//     { title: "FULL STACK", subtitle: "DEVELOPER" }
//   ];

//   const { scrollYProgress } = useScroll({
//     target: heroRef,
//     offset: ["start start", "end start"]
//   });

//   const [currentScroll, setCurrentScroll] = useState(0);

//   useEffect(() => {
//     return scrollYProgress.onChange((latest) => {
//       setCurrentScroll(latest);
//     });
//   }, [scrollYProgress]);

//   // Role cycle timer
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setRoleIndex((prev) => (prev + 1) % roles.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, [roles.length]);

//   return (
//     <section ref={heroRef} id="hero" className="min-h-screen bg-background w-full flex items-center justify-center relative overflow-hidden">

//       {/* Background Glow */}
//       <motion.div
//         className="absolute top-1/2 left-1/2 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-purple-600/30 rounded-full blur-[100px] pointer-events-none"
//         style={{
//           x: "-50%",
//           y: "-50%",
//           opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
//         }}
//       />

//       {/* Social Icons (Left Sidebar) */}
//       <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-6 z-50">
//         {socialLinks.map((social) => (
//           <a
//             key={social.label}
//             href={social.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform"
//             aria-label={social.label}
//           >
//             <social.icon className="w-5 h-5 md:w-6 md:h-6" />
//           </a>
//         ))}
//       </div>

//       {/* =====================================================
//           LAYER z-0: Right role title — BLURRED, BEHIND MODEL
//           This line (e.g. "DATA") peeks out behind the character.
//           The character sandwiches between this and z-20.
//           MOVED FURTHER RIGHT to avoid character overlap
//           ===================================================== */}
//       <motion.div
//         className="absolute right-[0%] md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[320px] md:max-w-[500px] lg:max-w-[600px] z-0 pointer-events-none select-none"
//         style={{
//           y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
//           opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
//         }}
//       >
//         <p className="text-lg md:text-2xl text-[#c084fc] mb-2 font-medium">A Creative</p>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={roleIndex}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Blurred title sits at the "middle" vertical position — behind character */}
//             <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white/20 leading-[1] tracking-tighter blur-[3px] whitespace-nowrap">
//               {roles[roleIndex].title}
//             </h2>
//             {/* Invisible height spacer so z-0 and z-20 share the same bounding box height */}
//             <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap mt-2">
//               {roles[roleIndex].subtitle}
//             </h2>
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>

//       {/* =====================================================
//           LAYER z-10: 3D MODEL — Sandwiched between the two text layers
//           ===================================================== */}
//       <div className="absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
//         <Suspense fallback={null}>
//           <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
//             <Environment preset="city" />
//             <Hero3DObject scrollProgress={currentScroll} />
//           </Canvas>
//         </Suspense>
//       </div>

//       {/* =====================================================
//           LAYER z-20: Left name + Right role subtitle — CRISP, IN FRONT
//           MOVED FURTHER RIGHT to avoid character overlap
//           ===================================================== */}

//       {/* Left: "Hello! I'm / HIMANSH MUNJAL" */}
//       <motion.div
//         className="absolute left-[5%] md:left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 z-20 pointer-events-none"
//         style={{
//           y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
//           opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
//         }}
//       >
//         <p className="text-lg md:text-2xl text-[#c084fc] mb-2 font-medium">Hello! I'm</p>
//         <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1] tracking-tighter drop-shadow-2xl">
//           HIMANSH<br />MUNJAL
//         </h1>
//       </motion.div>

//       {/* Right: subtitle floats in FRONT of character (z-20) - MOVED FURTHER RIGHT */}
//       <motion.div
//         className="absolute right-[0%] md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[320px] md:max-w-[500px] lg:max-w-[600px] z-20 pointer-events-none"
//         style={{
//           y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
//           opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
//         }}
//       >
//         {/* Invisible spacer — matches "A Creative" height from z-0 layer */}
//         <p className="text-lg md:text-2xl mb-2 opacity-0 select-none">A Creative</p>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={roleIndex}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.5 }}
//           >
//             {/* Invisible spacer — matches blurred title from z-0 so subtitle sits below it */}
//             <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap select-none">
//               {roles[roleIndex].title}
//             </h2>
//             {/* Crisp, bold, white subtitle — sits below where the character head is */}
//             <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1] tracking-tighter mt-2 whitespace-nowrap drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">
//               {roles[roleIndex].subtitle}
//             </h2>
//           </motion.div>
//         </AnimatePresence>
//       </motion.div>

//       {/* Bottom Right Resume Button */}
//       <div className="absolute bottom-8 right-8 z-50">
//         <a
//           href="/public/resume/updated_resume2.pdf"
//           className="flex items-center gap-3 text-sm md:text-base font-bold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Resume <FileText className="w-4 h-4 md:w-5 md:h-5" />
//         </a>
//       </div>

//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useScroll, useTransform, motion, AnimatePresence } from 'framer-motion';

// Lazy load the 3D object for better initial performance
const Hero3DObject = lazy(() => import('../common/Hero3DObject'));

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  { icon: Instagram, href: "https://www.instagram.com/munjal.himansh/", label: 'Instagram' },
];

// Simple loading fallback for 3D canvas
const CanvasLoader = () => (
  <div className="w-full h-full flex items-center justify-center">
    <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
  </div>
);

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [is3DLoaded, setIs3DLoaded] = useState(false);

  const roles = [
    { title: "DATA", subtitle: "SCIENTIST" },
    { title: "DATA", subtitle: "ANALYST" },
    { title: "FULL STACK", subtitle: "DEVELOPER" }
  ];

  // Detect mobile devices
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Delay 3D loading on mobile for better initial performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIs3DLoaded(true);
    }, isMobile ? 500 : 100); // Delay more on mobile
    
    return () => clearTimeout(timer);
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const [currentScroll, setCurrentScroll] = useState(0);

  useEffect(() => {
    // Throttle scroll updates for better performance
    let rafId: number;
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setCurrentScroll(latest);
      });
    });

    return () => {
      unsubscribe();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [scrollYProgress]);

  // Role cycle timer
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles.length]);

  // Resume download function
  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Updated_resume2.pdf';
    link.download = 'Himansh_Munjal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section 
      ref={heroRef} 
      id="hero" 
      className="min-h-screen bg-background w-full flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Glow - Simplified on mobile */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-purple-600/20 md:bg-purple-600/30 rounded-full blur-[80px] md:blur-[100px] pointer-events-none"
        style={{
          x: "-50%",
          y: "-50%",
          opacity: isMobile ? 0.5 : useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      />

      {/* Social Icons (Left Sidebar) */}
      <div className="absolute left-4 md:left-6 lg:left-12 top-1/2 -translate-y-1/2 flex flex-col gap-4 md:gap-6 z-50">
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white transition-colors duration-300 hover:scale-110 transform"
            aria-label={social.label}
          >
            <social.icon className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
          </a>
        ))}
      </div>

      {/* =====================================================
          LAYER z-0: Right role title — BLURRED, BEHIND MODEL
          ===================================================== */}
      <motion.div
        className="absolute right-0 md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[280px] md:max-w-[500px] lg:max-w-[600px] z-0 pointer-events-none select-none px-4 md:px-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        <p className="text-sm md:text-lg lg:text-2xl text-[#c084fc] mb-1 md:mb-2 font-medium">A Creative</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Blurred title - reduced blur on mobile for performance */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white/20 leading-[1] tracking-tighter blur-[2px] md:blur-[3px] whitespace-nowrap">
              {roles[roleIndex].title}
            </h2>
            {/* Invisible height spacer */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap mt-1 md:mt-2">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* =====================================================
          LAYER z-10: 3D MODEL — Load conditionally on mobile
          ===================================================== */}
      {is3DLoaded && (
        <div className="absolute inset-0 z-10 pointer-events-none sm:pointer-events-auto">
          <Suspense fallback={<CanvasLoader />}>
            <Canvas 
              camera={{ position: [0, 0, 8], fov: 45 }}
              dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower pixel ratio on mobile
              performance={{ min: 0.5 }} // Allow frame rate to drop if needed
            >
              <Environment preset="city" />
              <Hero3DObject scrollProgress={currentScroll} />
            </Canvas>
          </Suspense>
        </div>
      )}

      {/* Fallback gradient if 3D not loaded yet */}
      {!is3DLoaded && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
        </div>
      )}

      {/* =====================================================
          LAYER z-20: Left name + Right role subtitle — CRISP
          ===================================================== */}

      {/* Left: "Hello! I'm / HIMANSH MUNJAL" */}
      <motion.div
        className="absolute left-4 md:left-[5%] lg:left-[10%] xl:left-[15%] top-1/2 -translate-y-1/2 z-20 pointer-events-none"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        <p className="text-sm md:text-lg lg:text-2xl text-[#c084fc] mb-1 md:mb-2 font-medium">Hello! I'm</p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-[1] tracking-tighter drop-shadow-2xl">
          HIMANSH<br />MUNJAL
        </h1>
      </motion.div>

      {/* Right: subtitle floats in FRONT of character (z-20) */}
      <motion.div
        className="absolute right-0 md:right-[0%] lg:right-[0%] xl:right-[0%] top-1/2 -translate-y-1/2 text-left w-full max-w-[280px] md:max-w-[500px] lg:max-w-[600px] z-20 pointer-events-none px-4 md:px-0"
        style={{
          y: useTransform(scrollYProgress, [0, 1], ["-50%", "0%"]),
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0])
        }}
      >
        {/* Invisible spacer */}
        <p className="text-sm md:text-lg lg:text-2xl mb-1 md:mb-2 opacity-0 select-none">A Creative</p>
        <AnimatePresence mode="wait">
          <motion.div
            key={roleIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Invisible spacer */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black leading-[1] tracking-tighter opacity-0 whitespace-nowrap select-none">
              {roles[roleIndex].title}
            </h2>
            {/* Crisp subtitle */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-black text-white leading-[1] tracking-tighter mt-1 md:mt-2 whitespace-nowrap drop-shadow-[0_4px_32px_rgba(0,0,0,1)]">
              {roles[roleIndex].subtitle}
            </h2>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom Right Resume Button */}
      <div className="absolute bottom-6 md:bottom-8 right-6 md:right-8 z-50">
        <button
          onClick={handleDownloadResume}
          className="flex items-center gap-2 md:gap-3 text-xs md:text-sm lg:text-base font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/50 hover:text-white transition-colors duration-300 cursor-pointer"
          aria-label="Download Resume"
        >
          Resume <FileText className="w-3 h-3 md:w-4 md:h-4 lg:w-5 lg:h-5" />
        </button>
      </div>

    </section>
  );
};

export default HeroSection;