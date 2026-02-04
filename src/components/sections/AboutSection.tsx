// import React, { useEffect, useState } from 'react';
// import { Briefcase, Award, Code, Download } from 'lucide-react';
// import { useInView } from '@/hooks/useInView';

// const achievementStats = [
//   { icon: Briefcase, value: '5+', label: 'Years Experience' },
//   { icon: Code, value: '50+', label: 'Projects Built' },
//   { icon: Award, value: '15+', label: 'Certifications' },
// ];

// const AboutSection: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.2 });
//   const [animatedValues, setAnimatedValues] = useState<Record<string, string>>(
//     {}
//   );

//   const handleDownloadResume = () => {
//     const link = document.createElement('a');
//     link.href = '/resume/Updated_resume2.pdf';
//     link.download = 'Himansh_Munjal_Resume.pdf';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   useEffect(() => {
//     if (!isInView) return;

//     achievementStats.forEach((stat) => {
//       const target = parseInt(stat.value);
//       let current = 0;
//       const increment = target / 30;

//       const timer = setInterval(() => {
//         current += increment;
//         if (current >= target) {
//           setAnimatedValues((prev) => ({
//             ...prev,
//             [stat.label]: stat.value,
//           }));
//           clearInterval(timer);
//         } else {
//           setAnimatedValues((prev) => ({
//             ...prev,
//             [stat.label]: `${Math.floor(current)}+`,
//           }));
//         }
//       }, 30);
//     });
//   }, [isInView]);

//   return (
//     <section
//       ref={ref}
//       id="about"
//       className="relative py-32 bg-background overflow-hidden"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40 pointer-events-none" />
//       <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

//       <div className="relative max-w-7xl mx-auto px-4">
//         {/* Heading */}
//         <div className="text-center mb-24">
//           <h2 className={`section-heading ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
//             <span className="gradient-text-vibrant">About Me</span>
//           </h2>
//           <p
//             className={`text-muted-foreground mt-6 ${
//               isInView ? 'animate-fade-in' : 'opacity-0'
//             }`}
//             style={{ animationDelay: '0.2s' }}
//           >
//             Data Science | Data Analyst | Full Stack Enthusiast
//           </p>
//         </div>

//         {/* Split Layout */}
//         <div
//           className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 ${
//             isInView ? 'animate-fade-in' : 'opacity-0'
//           }`}
//           style={{ animationDelay: '0.3s' }}
//         >
//           {/* Image */}
//           <div className="flex justify-center lg:justify-start">
//             <div className="glass-card p-3 rounded-3xl animate-float">
//               <img
//                 src="/images/profile.png"
//                 alt="Himansh Munjal"
//                 className="w-80 h-80 md:w-[360px] md:h-[360px] object-cover rounded-2xl"
//               />
//             </div>
//           </div>

//           {/* Text */}
//           <div className="space-y-8 text-[1.05rem] md:text-[1.1rem] text-foreground/80 leading-[1.85]">
//             <p>
//               Hi, I’m <span className="gradient-text font-semibold">Himansh Munjal</span> —
//               a passionate technology enthusiast focused on Data Science, Data Analytics,
//               and Full Stack Development.
//             </p>

//             <p>
//               I specialize in building end-to-end machine learning pipelines,
//               predictive models, and scalable applications that transform raw data
//               into actionable insights.
//             </p>

//             <p>
//               With experience across React, Golang, PostgreSQL, and modern ML frameworks,
//               I enjoy solving complex problems at the intersection of analytics and engineering.
//             </p>

//             <p>
//               Driven by curiosity and continuous learning, I aim to build intelligent
//               systems that create meaningful real-world impact.
//             </p>
//           </div>
//         </div>

//         {/* Stats */}
//         <div
//           className={`mb-32 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//           style={{ animationDelay: '0.5s' }}
//         >
//           <div className="glass-card p-14 rounded-3xl">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
//               {achievementStats.map((stat, index) => {
//                 const Icon = stat.icon;
//                 return (
//                   <div key={index} className="text-center">
//                     <div className="mb-6 p-4 rounded-xl bg-primary/10 inline-flex">
//                       <Icon className="w-10 h-10 text-primary" />
//                     </div>
//                     <div className="text-5xl font-bold gradient-text mb-2">
//                       {animatedValues[stat.label] || '0+'}
//                     </div>
//                     <div className="text-muted-foreground">
//                       {stat.label}
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Dot Grid */}
//             <div className="flex justify-center">
//               <div className="grid grid-cols-8 gap-3">
//                 {[...Array(64)].map((_, i) => (
//                   <div
//                     key={i}
//                     className="w-3 h-3 rounded-full bg-primary/40 hover:bg-primary transition-all hover:scale-150"
//                     style={{
//                       animationDelay: `${i * 30}ms`,
//                       animation: isInView ? 'pulse 4s infinite' : 'none',
//                     }}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Resume */}
//         <div
//           className={`flex justify-center ${
//             isInView ? 'animate-fade-in' : 'opacity-0'
//           }`}
//           style={{ animationDelay: '0.7s' }}
//         >
//           <button
//             onClick={handleDownloadResume}
//             className="inline-flex items-center gap-3 px-10 py-4 rounded-xl gradient-button hover:opacity-90 transition-all shadow-lg"
//           >
//             <Download className="w-5 h-5" />
//             Download Resume
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

import React, { useEffect, useState, useRef } from 'react';
import { Briefcase, Award, Code, Download, Sparkles, Zap, Target, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const achievementStats = [
  { icon: Briefcase, value: '2+', label: 'Years Experience', color: 'from-purple-500 to-pink-500' },
  { icon: Code, value: '10+', label: 'Projects Built', color: 'from-pink-500 to-blue-500' },
  { icon: Award, value: '5+', label: 'Hackathons', color: 'from-blue-500 to-purple-500' },
];

const skills = [
  { name: 'Machine Learning', level: 95, icon: Target },
  { name: 'Full Stack Dev', level: 90, icon: Code },
  { name: 'Data Analytics', level: 92, icon: TrendingUp },
  { name: 'Problem Solving', level: 88, icon: Zap },
];

const floatingWords = ['Innovate', 'Create', 'Analyze', 'Build', 'Transform', 'Optimize'];

const AboutSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [animatedValues, setAnimatedValues] = useState<Record<string, string>>({});
  const [hoveredStat, setHoveredStat] = useState<number | null>(null);
  const [skillLevels, setSkillLevels] = useState<number[]>([0, 0, 0, 0]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume/Updated_resume2.pdf';
    link.download = 'Himansh_Munjal_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Mouse tracking for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = imageRef.current?.getBoundingClientRect();
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Animate stats
  useEffect(() => {
    if (!isInView) return;

    achievementStats.forEach((stat) => {
      const target = parseInt(stat.value);
      let current = 0;
      const increment = target / 30;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setAnimatedValues((prev) => ({
            ...prev,
            [stat.label]: stat.value,
          }));
          clearInterval(timer);
        } else {
          setAnimatedValues((prev) => ({
            ...prev,
            [stat.label]: `${Math.floor(current)}+`,
          }));
        }
      }, 30);
    });
  }, [isInView]);

  // Animate skill bars
  useEffect(() => {
    if (!isInView) return;

    skills.forEach((skill, index) => {
      setTimeout(() => {
        let current = 0;
        const increment = skill.level / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= skill.level) {
            setSkillLevels((prev) => {
              const newLevels = [...prev];
              newLevels[index] = skill.level;
              return newLevels;
            });
            clearInterval(timer);
          } else {
            setSkillLevels((prev) => {
              const newLevels = [...prev];
              newLevels[index] = Math.floor(current);
              return newLevels;
            });
          }
        }, 20);
      }, index * 200);
    });
  }, [isInView]);

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-32 bg-background overflow-hidden"
    >
      {/* Enhanced Background with moving gradients */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40 pointer-events-none" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-pink-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '4s' }} />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-bl from-blue-500/20 to-purple-500/30 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '6s', animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '5s', animationDelay: '2s' }} />
      </div>

      {/* Floating words background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingWords.map((word, i) => (
          <div
            key={word}
            className="absolute text-6xl font-bold opacity-[0.02] select-none"
            style={{
              top: `${(i * 15) % 80}%`,
              left: `${(i * 20) % 90}%`,
              animation: `float-random ${5 + i}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            {word}
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Heading with sparkles */}
        <div className="text-center mb-24 relative">
          <div className={`inline-block ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="relative">
              <Sparkles className="absolute -top-6 -left-8 w-8 h-8 text-purple-500 animate-spin-slow" />
              <Sparkles className="absolute -top-4 -right-6 w-6 h-6 text-pink-500 animate-spin-slow" style={{ animationDelay: '1s' }} />
              <h2 className="section-heading">
                <span className="gradient-text-vibrant relative">
                  About Me
                  <span className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full" />
                </span>
              </h2>
            </div>
          </div>
          <p
            className={`text-muted-foreground mt-8 text-lg ${
              isInView ? 'animate-fade-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="gradient-text font-semibold">Data Science</span> | <span className="gradient-text font-semibold">Data Analyst</span> | <span className="gradient-text font-semibold">Full Stack Enthusiast</span>
          </p>
        </div>

        {/* Split Layout with enhanced effects */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 ${
            isInView ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Enhanced Image Section */}
          <div className="flex justify-center lg:justify-start">
            <div 
              ref={imageRef}
              className="relative group"
              style={{
                transform: `perspective(1000px) rotateY(${mousePosition.x * 10}deg) rotateX(${-mousePosition.y * 10}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              {/* Animated rings */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute inset-0 rounded-full border-2 border-pink-500/30 animate-ping" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDuration: '5s', animationDelay: '2s' }} />
              </div>

              {/* Gradient border animation */}
              <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 animate-gradient-xy">
                <div className="glass-card p-3 rounded-3xl bg-background relative overflow-hidden">
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <img
                    src="/images/profile.png"
                    alt="Himansh Munjal"
                    className="w-80 h-80 md:w-[360px] md:h-[360px] object-cover rounded-2xl relative z-10 group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Corner accents */}
                  <div className="absolute top-6 left-6 w-8 h-8 border-l-2 border-t-2 border-purple-500 rounded-tl-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-6 right-6 w-8 h-8 border-r-2 border-t-2 border-pink-500 rounded-tr-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 left-6 w-8 h-8 border-l-2 border-b-2 border-blue-500 rounded-bl-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-6 right-6 w-8 h-8 border-r-2 border-b-2 border-purple-500 rounded-br-lg opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              {/* Floating particles around image */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `float-particle ${3 + i}s ease-in-out infinite`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Text Section */}
          <div className="space-y-8 text-[1.05rem] md:text-[1.1rem] text-foreground/80 leading-[1.85]">
            <p className="relative pl-6 border-l-4 border-gradient-to-b from-purple-500 to-pink-500">
              Hi, I'm <span className="gradient-text font-semibold">Himansh Munjal</span> —
              a passionate technology enthusiast focused on Data Science, Data Analytics,
              and Full Stack Development.
            </p>

            <p className="relative pl-6 border-l-4 border-gradient-to-b from-pink-500 to-blue-500">
              I specialize in building end-to-end machine learning pipelines,
              predictive models, and scalable applications that transform raw data
              into actionable insights.
            </p>

            <p className="relative pl-6 border-l-4 border-gradient-to-b from-blue-500 to-purple-500">
              With experience across React, Golang, PostgreSQL, and modern ML frameworks,
              I enjoy solving complex problems at the intersection of analytics and engineering.
            </p>

            <p className="relative pl-6 border-l-4 border-gradient-to-b from-purple-500 via-pink-500 to-blue-500">
              Driven by curiosity and continuous learning, I aim to build intelligent
              systems that create meaningful real-world impact.
            </p>

            {/* Skill bars */}
            <div className="mt-12 space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                return (
                  <div key={skill.name} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold text-foreground/70">{skill.name}</span>
                      </div>
                      <span className="text-sm font-bold gradient-text">{skillLevels[index]}%</span>
                    </div>
                    <div className="h-2 bg-muted/30 rounded-full overflow-hidden backdrop-blur-sm">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
                        style={{ width: `${skillLevels[index]}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div
          className={`mb-32 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
          style={{ animationDelay: '0.5s' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {achievementStats.map((stat, index) => {
              const Icon = stat.icon;
              const isHovered = hoveredStat === index;
              
              return (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  style={{
                    animation: `float ${3 + index * 0.5}s ease-in-out infinite`,
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div className={`glass-card p-8 rounded-2xl relative overflow-hidden transition-all duration-500 ${
                    isHovered ? 'scale-105 shadow-2xl' : ''
                  }`}>
                    {/* Animated background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                    <div className="relative z-10 text-center">
                      {/* Icon with glow */}
                      <div className="mb-6 inline-flex relative">
                        <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-10 relative`}>
                          <Icon className={`w-10 h-10 text-transparent bg-gradient-to-r ${stat.color} bg-clip-text group-hover:scale-110 transition-transform duration-500`} />
                        </div>
                      </div>

                      {/* Animated value */}
                      <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 group-hover:scale-110 transition-transform duration-500`}>
                        {animatedValues[stat.label] || '0+'}
                      </div>

                      {/* Label */}
                      <div className="text-muted-foreground font-medium">
                        {stat.label}
                      </div>

                      {/* Progress ring */}
                      <div className="absolute -bottom-2 -right-2 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity">
                        <svg className="w-full h-full animate-spin-slow" viewBox="0 0 100 100" style={{ animationDuration: '10s' }}>
                          <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="url(#gradient)"
                            strokeWidth="2"
                            strokeDasharray="283"
                            strokeDashoffset="70"
                          />
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#8b5cf6" />
                              <stop offset="100%" stopColor="#ec4899" />
                            </linearGradient>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enhanced Dot Grid */}
          <div className="glass-card p-12 rounded-3xl relative overflow-hidden group">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-gradient-xy" />
            
            <div className="flex justify-center relative z-10">
              <div className="grid grid-cols-8 gap-3">
                {[...Array(64)].map((_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500/40 via-pink-500/40 to-blue-500/40 hover:from-purple-500 hover:via-pink-500 hover:to-blue-500 transition-all hover:scale-150 cursor-pointer relative group/dot"
                    style={{
                      animationDelay: `${i * 30}ms`,
                      animation: isInView ? 'pulse 4s infinite' : 'none',
                    }}
                  >
                    {/* Ripple effect on hover */}
                    <div className="absolute inset-0 rounded-full bg-purple-500 opacity-0 group-hover/dot:opacity-50 group-hover/dot:scale-[3] transition-all duration-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Resume Button */}
        <div
          className={`flex justify-center ${
            isInView ? 'animate-fade-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.7s' }}
        >
          <button
            onClick={handleDownloadResume}
            className="relative group inline-flex items-center gap-3 px-10 py-4 rounded-xl overflow-hidden transition-all shadow-lg hover:shadow-2xl"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 animate-gradient-xy" />
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3">
              <Download className="w-5 h-5 group-hover:animate-bounce" />
              <span className="font-semibold">Download Resume</span>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 blur-xl bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-0 group-hover:opacity-50 transition-opacity -z-10" />
          </button>
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

        @keyframes float-random {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -10px) rotate(5deg);
          }
          50% {
            transform: translate(-5px, -20px) rotate(-5deg);
          }
          75% {
            transform: translate(-10px, -10px) rotate(3deg);
          }
        }

        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.8;
          }
        }

        @keyframes gradient-xy {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-gradient-xy {
          background-size: 200% 200%;
          animation: gradient-xy 3s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;