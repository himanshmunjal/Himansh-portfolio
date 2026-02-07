import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, BookOpen, Clock, TrendingUp, Eye } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

export const allBlogs = [
  {
    id: 1,
    title: 'Getting Started with Java Spring Boot – A Beginner\'s Guide',
    excerpt: 'Spring Boot has revolutionized the way developers build Java applications. In this post, we explore the basics of setting up your first Spring Boot project, understanding auto-configuration, and building your first REST endpoint with ease...',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop',
    tags: ['Java', 'SpringBoot', 'Backend', 'REST', 'BeginnerFriendly'],
    readTime: '8 min read',
    views: '1.2k',
  },
  {
    id: 2,
    title: 'Clean Code Principles Every Developer Should Know',
    excerpt: 'Writing clean code is more than just style – it\'s about maintainability, readability, and collaboration. This blog dives into the most important clean code principles from Robert Martin\'s iconic book and how to apply them daily...',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600&h=400&fit=crop',
    tags: ['Coding', 'CleanCode', 'SoftwareEngineering', 'BestPractices', 'Tips'],
    readTime: '10 min read',
    views: '2.1k',
  },
  {
    id: 3,
    title: 'Demystifying Machine Learning: From Theory to Real Projects',
    excerpt: 'Machine learning can feel intimidating at first, but once you break it down into digestible chunks, it becomes one of the most exciting fields in tech. Let\'s walk through the core concepts and see how they map to real-world projects...',
    image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop',
    tags: ['MachineLearning', 'DataScience', 'AI', 'Python', 'Tutorial'],
    readTime: '12 min read',
    views: '3.5k',
  },
];

const BlogCard: React.FC<{
  blog: typeof allBlogs[0];
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
}> = ({ blog, index, isInView, mousePosition }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getTilt = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0 };
    
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    
    const deltaX = (mousePosition.x - cardCenterX) / (rect.width / 2);
    const deltaY = (mousePosition.y - cardCenterY) / (rect.height / 2);
    
    return { x: deltaY * -5, y: deltaX * 5 };
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
      {/* Glow effect */}
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />

      {/* Card */}
      <div
        className="relative glass-card rounded-2xl overflow-hidden backdrop-blur-xl bg-background/40 border border-primary/20 transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40"
        style={{
          transform: isHovered 
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'all 0.3s ease-out',
        }}
      >
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />
        
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Floating bookmark icon */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          
          {/* Stats overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground/80">{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20">
              <Eye className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground/80">{blog.views}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {blog.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors cursor-default"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>

          {/* Read more link */}
          <Link
            to={`/blog/${blog.id}`}
            className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
          >
            <span className="font-medium">Read article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

const BlogSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
      speedY: number;
      opacity: number;
    }

    const particles: Particle[] = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(particle => {
        particle.y += particle.speedY;
        if (particle.y > canvas.height) particle.y = 0;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <section id="blog" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb gradient-orb-primary w-[500px] h-[500px] -top-40 -left-40 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-pink w-[450px] h-[450px] top-1/2 -right-40 blur-3xl"
          style={{ 
            animationDelay: '3s',
            transform: `translate(${-mousePosition.x * 0.015}px, ${-mousePosition.y * 0.015}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <BookOpen className="w-6 h-6 text-primary animate-bounce" />
            <TrendingUp className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              My Blog
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Insights, tutorials, and thoughts on software development and technology
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {allBlogs.map((blog, index) => (
            <BlogCard
              key={blog.id}
              blog={blog}
              index={index}
              isInView={isInView}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
          <Link
            to="/blogs/all"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[2px] rounded-xl">
              <div className="w-full h-full rounded-xl bg-background/95 backdrop-blur-xl" />
            </div>
            
            {/* Content */}
            <span className="relative z-10 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              View All Blogs
            </span>
            <ArrowRight className="relative z-10 w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
            
            {/* Shimmer */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </Link>
        </div>
      </div>

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
    </section>
  );
};

export default BlogSection;