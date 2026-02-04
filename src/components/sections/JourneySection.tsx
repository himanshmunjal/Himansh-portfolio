// import React from 'react';
// import { GraduationCap, Briefcase } from 'lucide-react';
// import { useInView } from '@/hooks/useInView';

// const education = [
//   {
//     institution: 'Vellore Institute of Technology, Vellore, Tamil Nadu',
//     degree: 'Bachelor of Technology – Computer Science and Engineering',
//     specialization: 'Data Science',
//     cgpa: '8.58',
//     status: 'Expected 2027',
//   },
//   {
//     institution: 'Parth Public School, Karnal, Haryana',
//     degree: '10+2 – CBSE',
//     date: 'May 2023',
//     result: 'Merit | 87.8%',
//   },
//   {
//     institution: 'Pratap Public School, Karnal, Haryana',
//     degree: '10th – CBSE',
//     date: 'July 2021',
//     result: 'First Division | 93.2%',
//   },
// ];

// const experience = [
//   {
//     company: 'Beryl System Pvt. Ltd.',
//     role: 'Full Stack Intern – Web',
//     duration: 'May 2025 – June 2025',
//     description: 'As a Full Stack Intern at Beryl System Pvt. Ltd., I actively developed scalable web applications using Go, React, and PostgreSQL. My work involved integrating secure APIs, optimizing database performance, and ensuring smooth communication between frontend and backend systems. I tackled authentication challenges and CORS issues, applying best practices to create efficient and secure applications.',
//   },
// ];

// const JourneySection: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.1 });

//   return (
//     <section id="journey" className="py-20 relative" ref={ref}>
//       {/* Background */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
//       {/* Gradient Orbs */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="gradient-orb gradient-orb-primary w-[400px] h-[400px] -top-20 -left-20" style={{ animationDelay: '1s' }} />
//         <div className="gradient-orb gradient-orb-purple w-[350px] h-[350px] bottom-20 right-0" style={{ animationDelay: '3s' }} />
//       </div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Heading */}
//         <h2 className={`section-heading ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
//           <span className="gradient-text-vibrant">My Journey</span>
//         </h2>

//         {/* Timeline */}
//         <div className="max-w-4xl mx-auto relative">
//           {/* Timeline Line */}
//           <div className="absolute left-8 md:left-1/2 top-0 bottom-0 timeline-line transform md:-translate-x-0.5" />

//           {/* Education Section */}
//           <div className={`mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
//             <div className="flex items-center gap-4 mb-8 md:justify-center">
//               <GraduationCap className="w-8 h-8 text-primary" />
//               <h3 className="text-2xl font-bold">Education</h3>
//             </div>

//             {education.map((edu, index) => (
//               <div
//                 key={edu.institution}
//                 className={`relative mb-8 md:mb-12 ${index % 2 === 0 ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'}`}
//               >
//                 {/* Timeline Dot */}
//                 <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 timeline-dot" />
                
//                 {/* Card */}
//                 <div className={`ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
//                   <div className="glass-card-hover p-6 rounded-xl">
//                     <h4 className="text-lg font-bold text-foreground mb-2">{edu.institution}</h4>
//                     <p className="text-primary font-medium mb-2">{edu.degree}</p>
//                     {edu.specialization && (
//                       <p className="text-sm text-muted-foreground mb-1">Specialization: {edu.specialization}</p>
//                     )}
//                     {edu.cgpa && (
//                       <p className="text-sm text-muted-foreground mb-1">CGPA: {edu.cgpa}</p>
//                     )}
//                     {edu.status && (
//                       <p className="text-sm text-primary/80">{edu.status}</p>
//                     )}
//                     {edu.date && (
//                       <p className="text-sm text-muted-foreground mb-1">{edu.date}</p>
//                     )}
//                     {edu.result && (
//                       <p className="text-sm text-green-400">{edu.result}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Experience Section */}
//           <div className={`${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
//             <div className="flex items-center gap-4 mb-8 md:justify-center">
//               <Briefcase className="w-8 h-8 text-primary" />
//               <h3 className="text-2xl font-bold">Experience</h3>
//             </div>

//             {experience.map((exp, index) => (
//               <div
//                 key={exp.company}
//                 className="relative mb-8 md:pl-[50%] md:ml-auto"
//               >
//                 {/* Timeline Dot */}
//                 <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 timeline-dot" />
                
//                 {/* Card */}
//                 <div className="ml-16 md:ml-8">
//                   <div className="glass-card-hover p-6 rounded-xl">
//                     <h4 className="text-lg font-bold text-foreground mb-1">{exp.company}</h4>
//                     <p className="text-primary font-medium mb-2">{exp.role}</p>
//                     <p className="text-sm text-muted-foreground mb-4">{exp.duration}</p>
//                     <p className="text-sm text-foreground/70 leading-relaxed">{exp.description}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default JourneySection;

import React, { useState, useEffect, useRef } from 'react';
import { GraduationCap, Briefcase, Award, TrendingUp, Zap, Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const education = [
  {
    institution: 'Pratap Public School, Karnal, Haryana',
    degree: 'Secondary – CBSE',
    date: 'July 2021',
    result: 'First Division | 93.2%',
    icon: Star,
    color: 'from-pink-500 to-orange-500',
  },
  {
    institution: 'Parth Public School, Karnal, Haryana',
    degree: 'Senior Secondary(Mathematics) – CBSE',
    date: 'May 2023',
    result: 'Merit | 87.8%',
    icon: Award,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    institution: 'Vellore Institute of Technology, Vellore, Tamil Nadu',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    specialization: 'Data Science',
    cgpa: '8.58',
    status: 'Expected 2027',
    icon: GraduationCap,
    color: 'from-purple-500 to-pink-500',
  },
];

const experience = [
  {
    company: 'Beryl System Pvt. Ltd.',
    role: 'Full Stack Intern – Web',
    duration: 'May 2025 – June 2025',
    description: 'As a Full Stack Intern at Beryl System Pvt. Ltd., I actively developed scalable web applications using Go, React, and PostgreSQL. My work involved integrating secure APIs, optimizing database performance, and ensuring smooth communication between frontend and backend systems. I tackled authentication challenges and CORS issues, applying best practices to create efficient and secure applications.',
    icon: Briefcase,
    color: 'from-emerald-500 to-teal-500',
    skills: ['Go', 'React', 'PostgreSQL', 'API Integration'],
  },
];

interface TimelineParticle {
  y: number;
  opacity: number;
  size: number;
  speed: number;
}

const JourneySection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [timelineParticles, setTimelineParticles] = useState<TimelineParticle[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize timeline particles
  useEffect(() => {
    const initParticles: TimelineParticle[] = Array.from({ length: 20 }, () => ({
      y: Math.random() * 100,
      opacity: Math.random() * 0.5 + 0.3,
      size: Math.random() * 4 + 2,
      speed: Math.random() * 0.5 + 0.2,
    }));
    setTimelineParticles(initParticles);
  }, []);

  // Animate timeline particles
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setTimelineParticles(prev =>
        prev.map(particle => ({
          ...particle,
          y: particle.y >= 100 ? 0 : particle.y + particle.speed,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="journey" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb gradient-orb-primary w-[500px] h-[500px] -top-40 -left-40 blur-3xl"
          style={{ 
            animationDelay: '1s',
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            transition: 'transform 0.3s ease-out',
          }} 
        />
        <div 
          className="gradient-orb gradient-orb-purple w-[450px] h-[450px] top-1/2 -right-40 blur-3xl"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }} 
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[400px] h-[400px] bottom-0 left-1/3 blur-3xl"
          style={{ 
            animationDelay: '5s',
            transform: `translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }} 
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading with Enhanced Animation */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <TrendingUp className="w-6 h-6 text-primary animate-bounce" />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              My Journey
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
            </span>
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            From classroom to code, every step has been a learning adventure
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto relative" ref={timelineRef}>
          {/* Enhanced Timeline Line with Particles */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5">
            {/* Gradient line */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 blur-sm" />
            
            {/* Animated particles along timeline */}
            {timelineParticles.map((particle, idx) => (
              <div
                key={idx}
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                style={{
                  top: `${particle.y}%`,
                  width: `${particle.size}px`,
                  height: `${particle.size}px`,
                  opacity: particle.opacity,
                  boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                }}
              />
            ))}
            
            {/* Pulsing glow */}
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/20 via-pink-500/20 to-blue-500/20 animate-pulse" />
          </div>

          {/* Education Section */}
          <div className={`mb-20 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-4 mb-12 md:justify-center">
              <div className="relative">
                <GraduationCap className="w-10 h-10 text-primary relative z-10" />
                <div className="absolute inset-0 bg-primary/30 blur-xl animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Education
                </span>
              </h3>
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>

            {education.map((edu, index) => {
              const IconComponent = edu.icon;
              const isLeft = index % 2 === 0;
              const cardIndex = index;
              
              return (
                <div
                  key={edu.institution}
                  className={`relative mb-12 ${isLeft ? 'md:pr-[50%] md:text-right' : 'md:pl-[50%] md:ml-auto'} ${
                    isInView ? 'animate-slide-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                  onMouseEnter={() => setActiveCard(cardIndex)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Timeline Dot with Enhanced Animation */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-6 z-20">
                    <div className="relative">
                      {/* Pulsing rings */}
                      <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${edu.color} opacity-20 animate-ping`} />
                      <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${edu.color} opacity-40 blur-md`} />
                      
                      {/* Main dot */}
                      <div className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${edu.color} shadow-lg flex items-center justify-center border-2 border-background`}>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      </div>
                      
                      {/* Rotating ring */}
                      <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-transparent border-t-white/50 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-12' : 'md:ml-12'}`}>
                    <div 
                      className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                        activeCard === cardIndex ? 'scale-105' : ''
                      }`}
                    >
                      {/* Animated border gradient */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${edu.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${edu.color} p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                        <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 glass-card rounded-2xl p-6 backdrop-blur-xl bg-background/40 border border-primary/20 group-hover:bg-background/60 transition-all duration-500">
                        {/* Icon badge */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${edu.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                          {edu.institution}
                        </h4>
                        <p className={`font-medium mb-2 bg-gradient-to-r ${edu.color} bg-clip-text text-transparent`}>
                          {edu.degree}
                        </p>
                        
                        {edu.specialization && (
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                            <p className="text-sm text-muted-foreground">
                              Specialization: <span className="text-foreground/80">{edu.specialization}</span>
                            </p>
                          </div>
                        )}
                        
                        {edu.cgpa && (
                          <div className="flex items-center gap-2 mb-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <p className="text-sm text-muted-foreground">
                              CGPA: <span className="text-foreground font-semibold">{edu.cgpa}</span>
                            </p>
                          </div>
                        )}
                        
                        {edu.status && (
                          <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/30 mt-2">
                            <p className="text-sm text-primary font-medium">{edu.status}</p>
                          </div>
                        )}
                        
                        {edu.date && (
                          <p className="text-sm text-muted-foreground mb-2">{edu.date}</p>
                        )}
                        
                        {edu.result && (
                          <div className="flex items-center gap-2 mt-2">
                            <Award className="w-4 h-4 text-green-400" />
                            <p className="text-sm text-green-400 font-medium">{edu.result}</p>
                          </div>
                        )}
                        
                        {/* Hover shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Experience Section */}
          <div className={`${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
            <div className="flex items-center gap-4 mb-12 md:justify-center">
              <div className="relative">
                <Briefcase className="w-10 h-10 text-primary relative z-10" />
                <div className="absolute inset-0 bg-primary/30 blur-xl animate-pulse" />
              </div>
              <h3 className="text-3xl font-bold">
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Experience
                </span>
              </h3>
              <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>

            {experience.map((exp, index) => {
              const IconComponent = exp.icon;
              const cardIndex = education.length + index;
              
              return (
                <div
                  key={exp.company}
                  className={`relative mb-12 md:pl-[50%] md:ml-auto ${
                    isInView ? 'animate-slide-in' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${1 + index * 0.15}s` }}
                  onMouseEnter={() => setActiveCard(cardIndex)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 top-6 z-20">
                    <div className="relative">
                      <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} opacity-20 animate-ping`} />
                      <div className={`absolute inset-0 w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} opacity-40 blur-md`} />
                      <div className={`relative w-6 h-6 rounded-full bg-gradient-to-r ${exp.color} shadow-lg flex items-center justify-center border-2 border-background`}>
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                      </div>
                      <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-transparent border-t-white/50 animate-spin" style={{ animationDuration: '3s' }} />
                    </div>
                  </div>
                  
                  {/* Card */}
                  <div className="ml-16 md:ml-12">
                    <div 
                      className={`group relative p-6 rounded-2xl transition-all duration-500 ${
                        activeCard === cardIndex ? 'scale-105' : ''
                      }`}
                    >
                      {/* Animated border */}
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${exp.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl`} />
                      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${exp.color} p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500`}>
                        <div className="w-full h-full rounded-2xl bg-background/95 backdrop-blur-xl" />
                      </div>
                      
                      {/* Content */}
                      <div className="relative z-10 glass-card rounded-2xl p-6 backdrop-blur-xl bg-background/40 border border-primary/20 group-hover:bg-background/60 transition-all duration-500">
                        {/* Icon badge */}
                        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${exp.color} mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        
                        <h4 className="text-xl font-bold text-foreground mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-emerald-400 group-hover:to-teal-400 transition-all duration-300">
                          {exp.company}
                        </h4>
                        <p className={`text-lg font-medium mb-2 bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                          {exp.role}
                        </p>
                        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          {exp.duration}
                        </p>
                        
                        <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                          {exp.description}
                        </p>
                        
                        {/* Skills tags */}
                        {exp.skills && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {exp.skills.map((skill, idx) => (
                              <span
                                key={skill}
                                className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border border-primary/30 text-primary hover:scale-110 transition-transform duration-300 cursor-default"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {/* Hover shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.6s ease-out forwards;
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
      `}</style>
    </section>
  );
};

export default JourneySection;