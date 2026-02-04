// import React, { useState, useEffect } from 'react';
// import { Github, Linkedin, Twitter } from 'lucide-react';

// const roles = ['Data Scientist', 'Data Analyst', 'Full Stack Developer'];

// const quotes = [
//   { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
//   { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
//   { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
//   { text: "Sometimes it is the people no one imagines anything of who do the things no one can imagine.", author: "Alan Turing" },
//   { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
//   { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
// ];

// const getGreeting = (): { text: string; emoji: string } => {
//   const hour = new Date().getHours();
//   if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' };
//   if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
//   if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌇' };
//   return { text: 'Good Night', emoji: '🌙' };
// };

// const socialLinks = [
//   { icon: Github, href: 'https://github.com', label: 'GitHub' },
//   { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
//   { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
// ];

// const HeroSection: React.FC = () => {
//   const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
//   const [displayedRole, setDisplayedRole] = useState('');
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
//   const [quoteOpacity, setQuoteOpacity] = useState(1);

//   const greeting = getGreeting();

//   // Typewriter effect
//   useEffect(() => {
//     const currentRole = roles[currentRoleIndex];
//     const typingSpeed = isDeleting ? 50 : 100;

//     const timeout = setTimeout(() => {
//       if (!isDeleting) {
//         if (displayedRole.length < currentRole.length) {
//           setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
//         } else {
//           setTimeout(() => setIsDeleting(true), 2000);
//         }
//       } else {
//         if (displayedRole.length > 0) {
//           setDisplayedRole(displayedRole.slice(0, -1));
//         } else {
//           setIsDeleting(false);
//           setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
//         }
//       }
//     }, typingSpeed);

//     return () => clearTimeout(timeout);
//   }, [displayedRole, isDeleting, currentRoleIndex]);

//   // Quote rotation
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setQuoteOpacity(0);
//       setTimeout(() => {
//         setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
//         setQuoteOpacity(1);
//       }, 500);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
//       {/* Background Mesh Gradient */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)]" />
      
//       {/* Animated Gradient Orbs */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="gradient-orb gradient-orb-primary w-[500px] h-[500px] top-1/4 -left-20" />
//         <div className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/4 right-0" style={{ animationDelay: '2s' }} />
//         <div className="gradient-orb gradient-orb-pink w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2" style={{ animationDelay: '4s' }} />
//       </div>

//       <div className="container mx-auto px-4 text-center relative z-10">
//         {/* Greeting */}
//         <div className="mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
//           <span className="text-xl md:text-2xl text-muted-foreground">
//             {greeting.text} {greeting.emoji}
//           </span>
//         </div>

//         {/* Name */}
//         <h1 
//           className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in"
//           style={{ animationDelay: '0.4s' }}
//         >
//           Hi, I'm{' '}
//           <span className="gradient-text-vibrant">Himansh Munjal</span>
//         </h1>

//         {/* Typewriter Role */}
//         <div 
//           className="h-12 md:h-16 flex items-center justify-center mb-8 animate-fade-in"
//           style={{ animationDelay: '0.6s' }}
//         >
//           <span className="text-2xl md:text-4xl font-semibold text-primary">
//             {displayedRole}
//             <span className="animate-pulse">|</span>
//           </span>
//         </div>

//         {/* Rotating Quote */}
//         <div 
//           className="max-w-2xl mx-auto mb-12 animate-fade-in"
//           style={{ animationDelay: '0.8s' }}
//         >
//           <div className="animated-gradient-border">
//             <div className="glass-card p-6 rounded-xl">
//               <div
//                 className="transition-opacity duration-500"
//                 style={{ opacity: quoteOpacity }}
//               >
//                 <p className="text-lg md:text-xl italic text-foreground/80 mb-2">
//                   "{quotes[currentQuoteIndex].text}"
//                 </p>
//                 <p className="text-sm gradient-text">
//                   — {quotes[currentQuoteIndex].author}
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Social Links */}
//         <div 
//           className="flex items-center justify-center gap-6 animate-fade-in"
//           style={{ animationDelay: '1s' }}
//         >
//           {socialLinks.map((social) => (
//             <a
//               key={social.label}
//               href={social.href}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="p-4 rounded-xl glass-card-hover group"
//               aria-label={social.label}
//             >
//               <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
//             </a>
//           ))}
//         </div>

//         {/* Scroll Indicator */}
//         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
//             <div className="w-1.5 h-3 rounded-full bg-primary animate-pulse" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;

import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Twitter, Sparkles, Code2, Database, Rocket } from 'lucide-react';

const roles = ['Data Scientist', 'Data Analyst', 'Full Stack Developer'];

const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "Sometimes it is the people no one imagines anything of who do the things no one can imagine.", author: "Alan Turing" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
];

const skillIcons = [
  { Icon: Code2, label: 'Development', delay: 0 },
  { Icon: Database, label: 'Data Science', delay: 0.2 },
  { Icon: Rocket, label: 'Innovation', delay: 0.4 },
];

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

const getGreeting = (): { text: string; emoji: string } => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return { text: 'Good Morning', emoji: '☀️' };
  if (hour >= 12 && hour < 17) return { text: 'Good Afternoon', emoji: '🌤️' };
  if (hour >= 17 && hour < 21) return { text: 'Good Evening', emoji: '🌇' };
  return { text: 'Good Night', emoji: '🌙' };
};

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  // { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
];

const HeroSection: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [quoteOpacity, setQuoteOpacity] = useState(1);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  const greeting = getGreeting();

  // Mouse movement tracking for magnetic effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize particles
  useEffect(() => {
    const initParticles: Particle[] = Array.from({ length: 50 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    setParticles(initParticles);
  }, []);

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      setParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < 0 || newX > canvas.width) particle.speedX *= -1;
          if (newY < 0 || newY > canvas.height) particle.speedY *= -1;

          newX = Math.max(0, Math.min(canvas.width, newX));
          newY = Math.max(0, Math.min(canvas.height, newY));

          // Draw particle
          ctx.beginPath();
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
          ctx.fill();

          // Draw connections
          prevParticles.forEach(otherParticle => {
            const dx = newX - otherParticle.x;
            const dy = newY - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - distance / 100)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });

          return { ...particle, x: newX, y: newY };
        })
      );

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Typewriter effect
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayedRole.length < currentRole.length) {
          setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayedRole.length > 0) {
          setDisplayedRole(displayedRole.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // Quote rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteOpacity(0);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
        setQuoteOpacity(1);
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
      {/* Animated Gradient Orbs with enhanced blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb gradient-orb-primary w-[500px] h-[500px] top-1/4 -left-20 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-purple w-[400px] h-[400px] bottom-1/4 right-0 blur-3xl" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }} 
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[300px] h-[300px] top-1/2 left-1/2 -translate-x-1/2 blur-3xl" 
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
            transition: 'transform 0.3s ease-out',
          }} 
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Greeting with sparkle effect */}
        <div className="mb-6 animate-fade-in flex items-center justify-center gap-2" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-xl md:text-2xl text-muted-foreground">
            {greeting.text} {greeting.emoji}
          </span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Name with 3D tilt effect and animated background */}
        <div
          ref={nameRef}
          className="mb-6 animate-fade-in perspective-1000"
          style={{ 
            animationDelay: '0.4s',
          }}
        >
          <h1 
            className="text-4xl md:text-6xl lg:text-7xl font-bold relative inline-block"
            style={{
              transform: `rotateX(${(mousePosition.y - window.innerHeight / 2) * 0.01}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) * 0.01}deg)`,
              transition: 'transform 0.1s ease-out',
            }}
          >
            <span className="relative">
              Hi, I'm{' '}
              <span className="gradient-text-vibrant relative inline-block">
                Himansh Munjal
                {/* Animated underline */}
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-pulse" />
                {/* Glow effect */}
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 -z-10 animate-pulse" />
              </span>
            </span>
          </h1>
        </div>
            
        {/* Skill Icons floating around typewriter */}
        <div className="relative mb-8">

          {/* Typewriter Role with enhanced styling */}
          <div 
            className="h-12 md:h-16 flex items-center justify-center animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            <span className="text-2xl md:text-4xl font-semibold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent animate-gradient-x">
              {displayedRole}
              <span className="animate-pulse text-primary">|</span>
            </span>
            
          </div>
        </div>

        {/* Rotating Quote with enhanced glass morphism */}
        <div 
          className="max-w-2xl mx-auto mb-12 animate-fade-in"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="animated-gradient-border group hover:scale-105 transition-transform duration-300">
            <div className="glass-card p-6 rounded-xl backdrop-blur-xl bg-background/40 border border-primary/20 relative overflow-hidden">
              {/* Animated shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              
              <div
                className="transition-opacity duration-500 relative z-10"
                style={{ opacity: quoteOpacity }}
              >
                <p className="text-lg md:text-xl italic text-foreground/80 mb-2">
                  "{quotes[currentQuoteIndex].text}"
                </p>
                <p className="text-sm gradient-text font-semibold">
                  — {quotes[currentQuoteIndex].author}
                </p>
              </div>
            </div>
          </div>
          
        </div>

        {/* Social Links with magnetic hover effect */}
        <div 
          className="flex items-center justify-center gap-6 animate-fade-in"
          style={{ animationDelay: '1s' }}
        >
          {socialLinks.map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl glass-card-hover group relative overflow-hidden"
              aria-label={social.label}
              style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`,
              }}
            >
              {/* Ripple effect on hover */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/20 group-hover:via-pink-500/20 group-hover:to-blue-500/20 transition-all duration-300" />
              
              <social.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:scale-110 transition-all relative z-10" />
              
              {/* Hover glow */}
              <div className="absolute inset-0 blur-xl bg-primary/0 group-hover:bg-primary/30 transition-all duration-300 -z-10" />
            </a>
          ))}
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="relative">
            <div className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2 backdrop-blur-sm bg-background/20">
              <div className="w-1.5 h-3 rounded-full bg-gradient-to-b from-purple-500 to-pink-500 animate-pulse" />
            </div>
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary/20 blur-sm animate-ping" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;