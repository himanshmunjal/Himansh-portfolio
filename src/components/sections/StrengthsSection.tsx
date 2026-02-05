import React, { useState, useEffect, useRef } from 'react';
import { 
  Brain, 
  Users, 
  MessageSquare, 
  Clock, 
  Lightbulb, 
  Target,
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const coreStrengths = [
  {
    title: 'Analytical Problem-Solving',
    description: 'Expert at breaking down complex challenges into manageable components, identifying patterns, and developing data-driven solutions that address root causes effectively.',
    icon: Brain,
    color: 'from-purple-500 to-pink-500',
    glowColor: 'rgba(168, 85, 247, 0.4)',
    stats: 'Strategic thinking',
  },
  {
    title: 'Leadership & Collaboration',
    description: 'Natural ability to guide teams, foster inclusive environments, and bring out the best in others while working seamlessly across diverse groups to achieve shared goals.',
    icon: Users,
    color: 'from-blue-500 to-cyan-500',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    stats: 'Team synergy',
  },
  {
    title: 'Public Speaking & Communication',
    description: 'Confident presenter with the ability to articulate complex ideas clearly and persuasively to diverse audiences, from technical teams to executive stakeholders.',
    icon: MessageSquare,
    color: 'from-emerald-500 to-teal-500',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    stats: 'Clear articulation',
  },
  {
    title: 'Time Management',
    description: 'Exceptional organizational skills with proven ability to prioritize tasks, meet tight deadlines, and maintain productivity while balancing multiple projects simultaneously.',
    icon: Clock,
    color: 'from-orange-500 to-red-500',
    glowColor: 'rgba(249, 115, 22, 0.4)',
    stats: 'Efficient execution',
  },
  {
    title: 'Creative Thinking',
    description: 'Innovative mindset that approaches problems from unique angles, generating original solutions and thinking beyond conventional boundaries to drive breakthrough results.',
    icon: Lightbulb,
    color: 'from-yellow-500 to-orange-500',
    glowColor: 'rgba(234, 179, 8, 0.4)',
    stats: 'Innovation driven',
  },
  {
    title: 'Attention to Detail',
    description: 'Meticulous approach ensuring accuracy and quality in every aspect of work, from code reviews to data analysis, catching issues before they become problems.',
    icon: Target,
    color: 'from-pink-500 to-rose-500',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    stats: 'Quality focused',
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

const StrengthCard: React.FC<{
  strength: typeof coreStrengths[0];
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
}> = ({ strength, index, isInView, mousePosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getTilt = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = (mousePosition.x - cardCenterX) / (rect.width / 2);
    const deltaY = (mousePosition.y - cardCenterY) / (rect.height / 2);
    
    return { x: deltaY * -8, y: deltaX * 8 };
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
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating particles on hover */}
      {isHovered && (
        <>
          <div className={`absolute -top-3 -left-3 w-2 h-2 rounded-full bg-gradient-to-r ${strength.color} animate-ping`} />
          <div className={`absolute -top-3 -right-3 w-2 h-2 rounded-full bg-gradient-to-r ${strength.color} animate-ping`} style={{ animationDelay: '0.2s' }} />
          <div className={`absolute -bottom-3 -left-3 w-2 h-2 rounded-full bg-gradient-to-r ${strength.color} animate-ping`} style={{ animationDelay: '0.4s' }} />
          <div className={`absolute -bottom-3 -right-3 w-2 h-2 rounded-full bg-gradient-to-r ${strength.color} animate-ping`} style={{ animationDelay: '0.6s' }} />
        </>
      )}

      {/* Glow effect */}
      <div 
        className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${strength.color} opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500`}
        style={{
          boxShadow: isHovered ? `0 0 60px ${strength.glowColor}` : 'none',
        }}
      />

      {/* Card */}
      <div
        className="relative glass-card rounded-2xl p-8 backdrop-blur-xl bg-background/40 border border-primary/20 overflow-hidden transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40"
        style={{
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.05)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'all 0.3s ease-out',
        }}
      >
        {/* Animated gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${strength.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Icon */}
        <div className="relative mb-6">
          {/* Icon glow */}
          <div className={`absolute inset-0 bg-gradient-to-r ${strength.color} blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 rounded-2xl`} />
          
          {/* Icon container */}
          <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${strength.color} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
            <strength.icon className="w-8 h-8 text-white" />
          </div>

          {/* Floating badge */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
            <div className="relative">
              <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
              <div className="absolute inset-0 blur-md bg-yellow-400/50 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {strength.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 group-hover:text-foreground/80 transition-colors duration-300">
            {strength.description}
          </p>

          {/* Stats badge */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r ${strength.color} bg-opacity-20 border border-primary/30`}>
              <Zap className="w-3 h-3 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary">{strength.stats}</span>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${strength.color} opacity-5 rounded-full blur-3xl group-hover:opacity-15 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${strength.color} opacity-5 rounded-full blur-2xl group-hover:opacity-15 transition-opacity duration-500`} />

        {/* Corner accent */}
        <div className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-tl ${strength.color} opacity-20 rounded-tl-full`} />
        </div>
      </div>
    </div>
  );
};

const CoreStrengthsSection: React.FC = () => {
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
      'rgba(234, 179, 8, 0.6)',   // yellow
      'rgba(236, 72, 153, 0.6)',  // pink
    ];

    const particles: FloatingParticle[] = Array.from({ length: 35 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.5 + 0.3,
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
          ctx.shadowBlur = 20;
          ctx.shadowColor = particle.color;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Draw connections
          prevParticles.forEach(otherParticle => {
            const dx = newX - otherParticle.x;
            const dy = newY - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(newX, newY);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${0.15 * (1 - distance / 120)})`;
              ctx.lineWidth = 1;
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

  return (
    <section id="strengths" className="py-20 relative overflow-hidden" ref={ref}>
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
            transform: `translate(${mousePosition.x * 0.03}px, ${mousePosition.y * 0.03}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-1/2 -right-40 blur-3xl"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.02}px, ${-mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[550px] h-[550px] bottom-0 left-1/3 blur-3xl"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <Brain className="w-6 h-6 text-primary animate-bounce" />
            <TrendingUp className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Sparkles className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              Core Strengths
              {/* Animated underline */}
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
              {/* Glow effect */}
              <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-blue-500/30 -z-10 animate-pulse" />
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Key attributes that drive excellence and innovation in everything I do
          </p>
        </div>

        {/* Strengths Grid - 2 rows x 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {coreStrengths.map((strength, index) => (
            <StrengthCard
              key={strength.title}
              strength={strength}
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
          <span className="text-sm text-muted-foreground">Building tomorrow, today</span>
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

export default CoreStrengthsSection;