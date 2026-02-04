// import React, { useState } from 'react';
// import { Code, Brain, BarChart3, Rocket, Calculator, Wrench } from 'lucide-react';
// import { useInView } from '@/hooks/useInView';

// const skillCategories = [
//   {
//     title: 'Programming Languages',
//     icon: Code,
//     skills: [
//       { name: 'Python', level: 90 },
//       { name: 'Java', level: 85 },
//       { name: 'Go', level: 80 },
//       { name: 'C/C++', level: 75 },
//       { name: 'R', level: 70 },
//     ],
//   },
//   {
//     title: 'Data Science',
//     icon: Brain,
//     skills: [
//       { name: 'Machine Learning', level: 88 },
//       { name: 'Scikit-learn', level: 85 },
//       { name: 'Deep Learning', level: 72 },
//       { name: 'NLP', level: 78 },
//       { name: 'Prefect', level: 60 },
//       { name: 'MLflow', level: 65 },
//       { name: 'SQL', level: 82 },
//     ],
//   },
//   {
//     title: 'Data Analysis & Visualization',
//     icon: BarChart3,
//     skills: [
//       { name: 'NumPy', level: 88 },
//       { name: 'Pandas', level: 90 },
//       { name: 'Matplotlib', level: 80 },
//       { name: 'Seaborn', level: 78 },
//       { name: 'Power BI', level: 75 },
//       { name: 'Tableau', level: 65 },
//     ],
//   },
//   {
//     title: 'Full Stack Development',
//     icon: Rocket,
//     skills: [
//       { name: 'React.js', level: 82 },
//       { name: 'Tailwind CSS', level: 85 },
//       { name: 'Golang', level: 65 },
//       { name: 'FastAPI', level: 70 },
//       { name: 'JWT', level: 72 },
//       { name: 'MongoDB', level: 60 },
//       { name: 'PostgreSQL', level: 75 },
//     ],
//   },
//   {
//     title: 'Mathematics & Algorithms',
//     icon: Calculator,
//     skills: [
//       { name: 'Linear Algebra', level: 80 },
//       { name: 'Statistics', level: 82 },
//       { name: 'Probability', level: 78 },
//       { name: 'Multivariable Calculus', level: 72 },
//       { name: 'Differential Equations', level: 70 },
//     ],
//   },
//   {
//     title: 'Other Skills',
//     icon: Wrench,
//     skills: [
//       { name: 'Git', level: 85 },
//       { name: 'GitHub', level: 88 },
//       { name: 'Linux CLI', level: 75 },
//       { name: 'Bash Scripting', level: 68 },
//       { name: 'Shell Utility', level: 65 },
//       { name: 'System Design', level: 70 },
//     ],
//   },
// ];

// const SkillCard: React.FC<{
//   category: typeof skillCategories[0];
//   index: number;
//   isInView: boolean;
// }> = ({ category, index, isInView }) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { ref, isInView: cardInView } = useInView({ threshold: 0.3 });

//   const shouldAnimate = isHovered || cardInView;

//   return (
//     <div
//       ref={ref}
//       className={`glass-card-hover p-6 rounded-xl ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//       style={{ animationDelay: `${0.2 + index * 0.1}s` }}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div className="flex items-center gap-3 mb-6">
//         <category.icon className="w-6 h-6 text-primary" />
//         <h3 className="text-lg font-bold">{category.title}</h3>
//       </div>

//       <div className="space-y-4">
//         {category.skills.map((skill) => (
//           <div key={skill.name}>
//             <div className="flex justify-between items-center mb-1">
//               <span className="text-sm text-foreground/80">{skill.name}</span>
//               <span className="text-xs text-muted-foreground">{skill.level}%</span>
//             </div>
//             <div className="skill-bar">
//               <div
//                 className="skill-bar-fill"
//                 style={{
//                   width: shouldAnimate ? `${skill.level}%` : '0%',
//                   transitionDelay: shouldAnimate ? '0.2s' : '0s',
//                 }}
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const SkillsSection: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.1 });

//   return (
//     <section className="py-20 relative" ref={ref}>
//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Heading */}
//         <h2 className={`section-heading ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
//           <span className="gradient-text-vibrant">Skills & Expertise</span>
//         </h2>

//         {/* Skills Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//           {skillCategories.map((category, index) => (
//             <SkillCard
//               key={category.title}
//               category={category}
//               index={index}
//               isInView={isInView}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SkillsSection;

import React, { useState, useEffect, useRef } from 'react';
import { Code, Brain, BarChart3, Rocket, Calculator, Wrench, Sparkles, Zap, TrendingUp } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.3)',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Go', level: 80 },
      { name: 'C/C++', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'R', level: 70 },
    ],
  },
  {
    title: 'Data Science',
    icon: Brain,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.3)',
    skills: [
      { name: 'Machine Learning', level: 88 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Deep Learning', level: 72 },
      { name: 'NLP', level: 78 },
      { name: 'Prefect', level: 60 },
      { name: 'MLflow', level: 65 },
    ],
  },
  {
    title: 'Data Analysis & Visualization',
    icon: BarChart3,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.3)',
    skills: [
      { name: 'NumPy', level: 88 },
      { name: 'Pandas', level: 90 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Seaborn', level: 78 },
      { name: 'Power BI', level: 75 },
      { name: 'Tableau', level: 65 },
    ],
  },
  {
    title: 'Full Stack Development',
    icon: Rocket,
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.3)',
    skills: [
      { name: 'React.js', level: 82 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Golang', level: 65 },
      { name: 'FastAPI', level: 70 },
      { name: 'JWT', level: 72 },
      { name: 'MongoDB', level: 60 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
  {
    title: 'Mathematics & Algorithms',
    icon: Calculator,
    color: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.3)',
    skills: [
      { name: 'Linear Algebra', level: 80 },
      { name: 'Statistics', level: 82 },
      { name: 'Probability', level: 78 },
      { name: 'Multivariable Calculus', level: 72 },
      { name: 'Differential Equations', level: 70 },
      { name: 'Complex Variables', level: 80},
    ],
  },
  {
    title: 'Other Skills',
    icon: Wrench,
    color: 'from-indigo-500 to-purple-500',
    glowColor: 'rgba(99, 102, 241, 0.3)',
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 88 },
      { name: 'Linux CLI', level: 75 },
      { name: 'Bash Scripting', level: 68 },
      { name: 'Shell Utility', level: 65 },
      { name: 'System Design', level: 70 },
    ],
  },
];

interface FloatingParticle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
}

const SkillCard: React.FC<{
  category: typeof skillCategories[0];
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
}> = ({ category, index, isInView, mousePosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSkill, setActiveSkill] = useState<number | null>(null);
  const { ref: cardRef, isInView: cardInView } = useInView({ threshold: 0.3 });

  const shouldAnimate = isHovered || cardInView;

  // Calculate tilt based on mouse position relative to card
  const getTilt = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = (mousePosition.x - cardCenterX) / (rect.width / 2);
    const deltaY = (mousePosition.y - cardCenterY) / (rect.height / 2);
    
    return { x: deltaY * -10, y: deltaX * 10 };
  };

  const tilt = getTilt();

  return (
    <div
      ref={cardRef}
      className={`group relative ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ 
        animationDelay: `${0.2 + index * 0.1}s`,
        perspective: '1000px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveSkill(null);
      }}
    >
      {/* Animated glow effect */}
      <div 
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500`}
        style={{
          boxShadow: isHovered ? `0 0 60px ${category.glowColor}` : 'none',
        }}
      />

      {/* Floating particles on hover */}
      {isHovered && (
        <>
          <div className="absolute -top-2 -left-2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-ping" />
          <div className="absolute -top-2 -right-2 w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="absolute -bottom-2 -left-2 w-2 h-2 rounded-full bg-gradient-to-r from-emerald-400 to-teal-400 animate-ping" style={{ animationDelay: '0.6s' }} />
          <div className="absolute -bottom-2 -right-2 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-red-400 animate-ping" style={{ animationDelay: '0.9s' }} />
        </>
      )}

      {/* Card */}
      <div
        className="relative glass-card rounded-2xl p-6 backdrop-blur-xl bg-background/40 border border-primary/20 overflow-hidden transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40"
        style={{
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'all 0.3s ease-out',
        }}
      >
        {/* Animated gradient border */}
        <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Header */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center gap-3 mb-3">
            {/* Icon with animated background */}
            <div className="relative">
              <div className={`absolute inset-0 bg-gradient-to-r ${category.color} blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-xl`} />
              <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-r ${category.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <category.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                {category.title}
              </h3>
              <div className="flex items-center gap-1 mt-1">
                <Sparkles className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {category.skills.length} skills
                </span>
              </div>
            </div>
          </div>
          
          {/* Decorative line */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent">
            <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
          </div>
        </div>

        {/* Skills */}
        <div className="relative z-10 space-y-4">
          {category.skills.map((skill, skillIndex) => (
            <div 
              key={skill.name}
              onMouseEnter={() => setActiveSkill(skillIndex)}
              onMouseLeave={() => setActiveSkill(null)}
              className="group/skill"
            >
              {/* Skill name and percentage */}
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground/80 group-hover/skill:text-foreground transition-colors duration-300">
                    {skill.name}
                  </span>
                  {activeSkill === skillIndex && (
                    <Zap className="w-3 h-3 text-yellow-400 animate-pulse" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-medium transition-all duration-300 ${
                    activeSkill === skillIndex 
                      ? `bg-gradient-to-r ${category.color} bg-clip-text text-transparent` 
                      : 'text-muted-foreground'
                  }`}>
                    {skill.level}%
                  </span>
                  {skill.level >= 85 && (
                    <TrendingUp className="w-3 h-3 text-green-400 opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300" />
                  )}
                </div>
              </div>
              
              {/* Skill bar container */}
              <div className="relative h-2 bg-background/60 rounded-full overflow-hidden border border-primary/10 group-hover/skill:border-primary/30 transition-all duration-300">
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-10`} />
                
                {/* Animated fill */}
                <div
                  className={`relative h-full bg-gradient-to-r ${category.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                  style={{
                    width: shouldAnimate ? `${skill.level}%` : '0%',
                    transitionDelay: shouldAnimate ? `${0.2 + skillIndex * 0.1}s` : '0s',
                    boxShadow: activeSkill === skillIndex 
                      ? `0 0 20px ${category.glowColor}, 0 0 40px ${category.glowColor}` 
                      : `0 0 10px ${category.glowColor}`,
                  }}
                >
                  {/* Shimmer effect on bar */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/skill:translate-x-full transition-transform duration-1000" />
                  
                  {/* Pulse dot at the end */}
                  {shouldAnimate && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse">
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${category.color} animate-ping`} />
                    </div>
                  )}
                </div>
                
                {/* Progress glow */}
                <div 
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${category.color} blur-md opacity-0 group-hover/skill:opacity-30 transition-all duration-500`}
                  style={{ width: shouldAnimate ? `${skill.level}%` : '0%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 mt-6 pt-4 border-t border-primary/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" />
            <span className="text-xs text-muted-foreground">
              Avg: {Math.round(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length)}%
            </span>
          </div>
          <div className="flex items-center gap-1">
            {[...Array(Math.ceil(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length / 20))].map((_, i) => (
              <div 
                key={i} 
                className={`w-1 h-3 rounded-full bg-gradient-to-t ${category.color}`}
                style={{ 
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0.5 + (i * 0.1),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [floatingParticles, setFloatingParticles] = useState<FloatingParticle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse movement tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize floating particles
  useEffect(() => {
    const colors = [
      'rgba(168, 85, 247, 0.6)', // purple
      'rgba(59, 130, 246, 0.6)',  // blue
      'rgba(16, 185, 129, 0.6)',  // emerald
      'rgba(249, 115, 22, 0.6)',  // orange
      'rgba(236, 72, 153, 0.6)',  // pink
    ];

    const particles: FloatingParticle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));
    setFloatingParticles(particles);
  }, []);

  // Animate floating particles
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

      setFloatingParticles(prevParticles =>
        prevParticles.map(particle => {
          let newX = particle.x + particle.speedX;
          let newY = particle.y + particle.speedY;

          if (newX < 0 || newX > canvas.width) particle.speedX *= -1;
          if (newY < 0 || newY > canvas.height) particle.speedY *= -1;

          newX = Math.max(0, Math.min(canvas.width, newX));
          newY = Math.max(0, Math.min(canvas.height, newY));

          // Draw particle with glow
          ctx.beginPath();
          ctx.arc(newX, newY, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 15;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.shadowBlur = 0;

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

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb gradient-orb-primary w-[600px] h-[600px] -top-40 -left-40 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/3 -right-40 blur-3xl"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[550px] h-[550px] bottom-0 left-1/4 blur-3xl"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading with Enhanced Animation */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <Code className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.1s' }} />
            <Brain className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Rocket className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.3s' }} />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              Skills & Expertise
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
              {/* Glow effect */}
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 -z-10 animate-pulse" />
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of technologies and frameworks I've mastered through hands-on experience
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        {/* Bottom decoration */}
        <div className={`mt-16 flex items-center justify-center gap-4 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-sm text-muted-foreground">Continuously learning and growing</span>
          <Sparkles className="w-5 h-5 text-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
      </div>

      <style>{`
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

export default SkillsSection;