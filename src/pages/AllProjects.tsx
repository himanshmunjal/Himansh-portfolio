// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft, Github } from 'lucide-react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { allProjects } from '@/components/sections/ProjectsSection';
// import { useInView } from '@/hooks/useInView';

// const AllProjects: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.05 });

//   return (
//     <div className="min-h-screen">
//       <Header />

//       <main className="pt-24 pb-20" ref={ref}>
//         <div className="container mx-auto px-4">
//           {/* Back Link */}
//           <Link
//             to="/"
//             className={`inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Link>

//           {/* Section Heading */}
//           <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
//             <span className="gradient-text">All Projects</span>
//           </h1>

//           <p className={`text-muted-foreground mb-12 max-w-2xl ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
//             A collection of my work spanning data science, machine learning, full-stack development, and data visualization.
//           </p>

//           {/* Projects Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//             {allProjects.map((project, index) => (
//               <div
//                 key={project.id}
//                 className={`glass-card-hover p-6 rounded-xl group ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//                 style={{ animationDelay: `${0.2 + index * 0.05}s` }}
//               >
//                 <div className="flex items-start justify-between mb-4">
//                   <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
//                     {project.title}
//                   </h3>
//                   {project.ongoing && (
//                     <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 whitespace-nowrap ml-2">
//                       Ongoing
//                     </span>
//                   )}
//                 </div>

//                 <p className="text-sm text-muted-foreground mb-4">
//                   {project.description}
//                 </p>

//                 <div className="flex flex-wrap gap-2">
//                   {project.tech.map((t) => (
//                     <span key={t} className="tech-badge">
//                       {t}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* GitHub Link */}
//           <div className={`text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
//             <a
//               href="https://github.com"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-3 px-8 py-4 rounded-xl gradient-button hover:opacity-90 transition-all shadow-lg shadow-primary/25"
//             >
//               <Github className="w-5 h-5" />
//               View More on GitHub
//             </a>
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AllProjects;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Sparkles, Rocket, Code, Zap, Star, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allProjects } from '@/components/sections/ProjectsSection';
import { useInView } from '@/hooks/useInView';

const AllProjects: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const colors = [
      'rgba(168, 85, 247, 0.6)',
      'rgba(236, 72, 153, 0.6)',
      'rgba(59, 130, 246, 0.6)',
    ];

    const particles: Particle[] = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="fixed inset-0 bg-[image:var(--gradient-mesh)] opacity-30 -z-10" />

      {/* Dynamic Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div 
          className="gradient-orb gradient-orb-pink w-[500px] h-[500px] top-20 -right-40 blur-3xl"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-purple w-[450px] h-[450px] bottom-20 -left-40 blur-3xl"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>

      <Header />

      <main className="pt-32 pb-20 relative z-10" ref={ref}>
        <div className="container mx-auto px-4">
          {/* Back Link */}
          <Link
            to="/"
            className={`group inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Section Heading */}
          <div className={`mb-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="w-8 h-8 text-primary animate-bounce" />
              <Code className="w-8 h-8 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text-vibrant relative inline-block">
                  All Projects
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
                </span>
              </h1>
            </div>

            <p className="text-muted-foreground max-w-2xl">
              A comprehensive collection of my work spanning data science, machine learning, full-stack development, and data visualization
            </p>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="group glass-card p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-5 h-5 text-yellow-400 group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {allProjects.length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Total Projects</p>
            </div>

            <div className="group glass-card p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="w-5 h-5 text-yellow-400 group-hover:scale-125 transition-transform" />
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  {allProjects.filter(p => p.ongoing).length}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Ongoing</p>
            </div>

            <div className="group glass-card p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Code className="w-5 h-5 text-blue-400 group-hover:rotate-12 transition-transform" />
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  {new Set(allProjects.flatMap(p => p.tech)).size}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Technologies</p>
            </div>

            <div className="group glass-card p-4 rounded-xl border border-primary/20 hover:border-primary/40 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
                <span className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-rose-400 bg-clip-text text-transparent">
                  {new Set(allProjects.map(p => p.category)).size}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {allProjects.map((project, index) => (
              <div
                key={project.id}
                className={`group relative ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.03}s`,
                  perspective: '1000px',
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Glow effect */}
                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500`} />

                {/* Card */}
                <div className="relative glass-card rounded-2xl p-6 backdrop-blur-xl bg-background/40 border border-primary/20 overflow-hidden transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40 transform group-hover:scale-105">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`} />
                        <span className="text-xs text-muted-foreground">{project.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    {project.ongoing && (
                      <div className="relative">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 whitespace-nowrap flex items-center gap-1">
                          <Zap className="w-3 h-3 animate-pulse" />
                          Ongoing
                        </span>
                        <div className="absolute inset-0 rounded-full bg-yellow-500/20 blur-md animate-pulse" />
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed relative z-10">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action buttons */}
                  {hoveredProject === project.id && (
                    <div className="flex items-center gap-3 relative z-10 animate-fade-in">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 hover:from-primary/30 hover:to-purple-500/30 transition-all text-sm font-medium text-primary">
                        <ExternalLink className="w-4 h-4" />
                        View
                      </button>
                      <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 hover:from-primary/30 hover:to-purple-500/30 transition-all">
                        <Github className="w-4 h-4 text-primary" />
                      </button>
                    </div>
                  )}

                  {/* Decorative elements */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
                </div>
              </div>
            ))}
          </div>

          {/* GitHub Link */}
          <div className={`text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
            >
              {/* Animated gradient border */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[2px] rounded-xl">
                <div className="w-full h-full rounded-xl bg-background/95 backdrop-blur-xl" />
              </div>
              
              {/* Content */}
              <Github className="relative z-10 w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
              <span className="relative z-10 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                View More on GitHub
              </span>
              <Sparkles className="relative z-10 w-5 h-5 text-primary animate-pulse" />
              
              {/* Shimmer */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </a>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AllProjects;