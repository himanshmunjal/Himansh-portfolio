import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import ParticleCanvas from '@/components/common/ParticleCanvas';

const PARTICLE_COLORS = [
  'hsla(270, 70%, 60%, 0.5)',
  'hsla(320, 70%, 60%, 0.5)',
  'hsla(210, 70%, 60%, 0.5)',
  'hsla(160, 70%, 55%, 0.5)',
];
const PARTICLE_SIZE: [number, number] = [1, 3];

const technologies = [
  { name: 'Python', icon: '🐍', color: 'from-yellow-500 to-blue-500' },
  { name: 'Java', icon: '☕', color: 'from-orange-500 to-red-600' },
  { name: 'C++', icon: '⚡', color: 'from-blue-500 to-purple-500' },
  { name: 'R', icon: '📊', color: 'from-blue-400 to-cyan-500' },
  { name: 'Go', icon: '🔷', color: 'from-cyan-400 to-blue-500' },
  { name: 'React.js', icon: '⚛️', color: 'from-cyan-400 to-blue-600' },
  { name: 'Tailwind CSS', icon: '🎨', color: 'from-teal-400 to-blue-500' },
  { name: 'PostgreSQL', icon: '🐘', color: 'from-blue-600 to-indigo-600' },
  { name: 'MongoDB', icon: '🍃', color: 'from-green-500 to-emerald-600' },
  { name: 'Machine Learning', icon: '🤖', color: 'from-purple-500 to-pink-500' },
  { name: 'Scikit-learn', icon: '🔬', color: 'from-orange-400 to-orange-600' },
  { name: 'TensorFlow', icon: '🧠', color: 'from-orange-500 to-yellow-500' },
  { name: 'NumPy', icon: '🔢', color: 'from-blue-400 to-indigo-500' },
  { name: 'Pandas', icon: '🐼', color: 'from-blue-500 to-purple-600' },
  { name: 'Power BI', icon: '📈', color: 'from-yellow-500 to-orange-500' },
  { name: 'Tableau', icon: '📉', color: 'from-blue-500 to-cyan-500' },
  { name: 'Git', icon: '🔀', color: 'from-orange-600 to-red-600' },
  { name: 'GitHub', icon: '🐙', color: 'from-gray-600 to-gray-800' },
  { name: 'Docker', icon: '🐳', color: 'from-blue-500 to-cyan-600' },
  { name: 'FastAPI', icon: '⚡', color: 'from-teal-500 to-emerald-500' },
  { name: 'Linux', icon: '🐧', color: 'from-yellow-500 to-orange-600' },
  { name: 'JWT', icon: '🔐', color: 'from-purple-500 to-pink-500' },
  { name: 'NLP', icon: '📝', color: 'from-green-500 to-teal-500' },
  { name: 'Jupyter', icon: '📓', color: 'from-orange-500 to-red-500' },
  { name: 'Matplotlib', icon: '📊', color: 'from-blue-500 to-purple-500' },
  { name: 'Seaborn', icon: '🌊', color: 'from-blue-400 to-cyan-500' },
];

const TechStrip: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Duplicate the array for seamless loop
  const duplicatedTech = [...technologies, ...technologies, ...technologies];

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Particle Canvas */}
      <ParticleCanvas variant="fall" count={15} size={PARTICLE_SIZE} colors={PARTICLE_COLORS} speed={0.05} />

      {/* Background with glass effect */}
      <div className="absolute inset-0 glass-card rounded-none opacity-40 backdrop-blur-sm" />
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 animate-gradient-x" />
      
      {/* Gradient Overlays for fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
      
      {/* Sparkle decorations */}
      <div className="absolute top-4 left-1/4 z-10">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
      </div>
      <div className="absolute bottom-4 right-1/3 z-10">
        <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Title */}
      <div className="text-center mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full glass-card border border-primary/20 backdrop-blur-xl">
          <Sparkles className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Technologies & Tools
          </span>
          <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: '0.3s' }} />
        </div>
      </div>
      
      {/* Marquee Container */}
      <div className="relative flex">
        <div className="marquee flex items-center gap-6 py-6">
          {duplicatedTech.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className="group relative flex items-center gap-3 px-6 py-4 rounded-2xl glass-card backdrop-blur-xl bg-background/40 border border-primary/20 whitespace-nowrap hover:bg-background/60 hover:border-primary/40 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                animation: hoveredIndex === index ? 'none' : undefined,
              }}
            >
              {/* Glow effect on hover */}
              {hoveredIndex === index && (
                <>
                  <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${tech.color} opacity-75 blur-xl transition-opacity duration-300`} />
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Sparkles className="w-3 h-3 text-yellow-400 animate-ping" />
                  </div>
                </>
              )}
              
              {/* Icon */}
              <div className="relative">
                <span 
                  className={`text-3xl transform group-hover:scale-125 transition-transform duration-300 inline-block ${
                    hoveredIndex === index ? 'animate-bounce' : ''
                  }`}
                >
                  {tech.icon}
                </span>
              </div>
              
              {/* Name */}
              <span className={`relative text-sm font-medium transition-all duration-300 ${
                hoveredIndex === index 
                  ? `bg-gradient-to-r ${tech.color} bg-clip-text text-transparent font-bold` 
                  : 'text-muted-foreground group-hover:text-foreground'
              }`}>
                {tech.name}
              </span>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl" />

              {/* Corner accent */}
              {hoveredIndex === index && (
                <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${tech.color} opacity-20 rounded-bl-full blur-md`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

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
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </section>
  );
};

export default TechStrip;