// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowLeft } from 'lucide-react';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import { allBlogs } from '@/components/sections/BlogSection';
// import { useInView } from '@/hooks/useInView';

// const allTags = ['All', 'Java', 'SpringBoot', 'Backend', 'Coding', 'CleanCode', 'MachineLearning', 'DataScience', 'AI', 'Python'];

// const AllBlogs: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.05 });
//   const [selectedTag, setSelectedTag] = useState('All');

//   const filteredBlogs = selectedTag === 'All'
//     ? allBlogs
//     : allBlogs.filter(blog => blog.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase())));

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
//             <span className="gradient-text">All Blog Posts</span>
//           </h1>

//           <p className={`text-muted-foreground mb-8 max-w-2xl ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
//             Thoughts, tutorials, and insights on software development, data science, and technology.
//           </p>

//           {/* Tag Filter */}
//           <div className={`flex flex-wrap gap-2 mb-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
//             {allTags.map((tag) => (
//               <button
//                 key={tag}
//                 onClick={() => setSelectedTag(tag)}
//                 className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
//                   selectedTag === tag
//                     ? 'gradient-button'
//                     : 'glass-card hover:bg-primary/10 text-muted-foreground hover:text-primary'
//                 }`}
//               >
//                 {tag}
//               </button>
//             ))}
//           </div>

//           {/* Blogs Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredBlogs.map((blog, index) => (
//               <div
//                 key={blog.id}
//                 className={`glass-card-hover rounded-xl overflow-hidden group ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//                 style={{ animationDelay: `${0.3 + index * 0.1}s` }}
//               >
//                 {/* Image */}
//                 <div className="relative h-48 overflow-hidden">
//                   <img
//                     src={blog.image}
//                     alt={blog.title}
//                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//                   />
//                   <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
//                 </div>

//                 {/* Content */}
//                 <div className="p-6">
//                   <h3 className="text-lg font-bold text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
//                     {blog.title}
//                   </h3>

//                   <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
//                     {blog.excerpt}
//                   </p>

//                   <div className="flex flex-wrap gap-2">
//                     {blog.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
//                       >
//                         #{tag}
//                       </span>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredBlogs.length === 0 && (
//             <div className="text-center py-12">
//               <p className="text-muted-foreground">No blogs found with the selected filter.</p>
//             </div>
//           )}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AllBlogs;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Filter, Clock, Eye, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { allBlogs } from '@/components/sections/BlogSection';
import { useInView } from '@/hooks/useInView';

const allTags = ['All', 'Java', 'SpringBoot', 'Backend', 'Coding', 'CleanCode', 'MachineLearning', 'DataScience', 'AI', 'Python'];

const AllBlogs: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.05 });
  const [selectedTag, setSelectedTag] = useState('All');
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

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
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

  const filteredBlogs = selectedTag === 'All'
    ? allBlogs
    : allBlogs.filter(blog => blog.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase())));

  return (
    <div className="min-h-screen relative">
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="fixed inset-0 bg-[image:var(--gradient-mesh)] opacity-30 -z-10" />

      {/* Dynamic Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
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
              <BookOpen className="w-8 h-8 text-primary animate-bounce" />
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="gradient-text-vibrant relative inline-block">
                  All Blog Posts
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
                </span>
              </h1>
            </div>

            <p className="text-muted-foreground max-w-2xl">
              Thoughts, tutorials, and insights on software development, data science, and technology
            </p>
          </div>

          {/* Tag Filter */}
          <div className={`mb-12 ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center gap-3 mb-4">
              <Filter className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Filter by topic</span>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`group relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                    selectedTag === tag
                      ? 'text-white'
                      : 'glass-card text-muted-foreground hover:text-primary border border-primary/20 hover:border-primary/40'
                  }`}
                >
                  {selectedTag === tag && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl opacity-75 blur-lg" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-xl" />
                    </>
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tag}
                    {selectedTag === tag && <Sparkles className="w-3 h-3 animate-pulse" />}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((blog, index) => (
              <div
                key={blog.id}
                className={`group relative ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ 
                  animationDelay: `${0.3 + index * 0.05}s`,
                  perspective: '1000px',
                }}
              >
                {/* Glow effect */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500" />

                {/* Card */}
                <div className="relative glass-card rounded-2xl overflow-hidden backdrop-blur-xl bg-background/40 border border-primary/20 transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40 transform group-hover:scale-105">
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

                    <div className="flex flex-wrap gap-2">
                      {blog.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredBlogs.length === 0 && (
            <div className={`text-center py-20 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl glass-card border border-primary/20">
                <Sparkles className="w-5 h-5 text-primary" />
                <p className="text-muted-foreground">No blogs found with the selected filter.</p>
              </div>
            </div>
          )}
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

export default AllBlogs;