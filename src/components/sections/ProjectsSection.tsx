// import React from 'react';
// import { Link } from 'react-router-dom';
// import { ArrowRight } from 'lucide-react';
// import { useInView } from '@/hooks/useInView';

// export const allProjects = [
//   {
//     id: 1,
//     title: 'Taxi Fare Prediction System',
//     description: 'End-to-end ML pipeline for taxi fare prediction with geospatial & temporal feature engineering, workflow orchestration, and experiment tracking for real-time deployment readiness.',
//     tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'XGBoost', 'CatBoost', 'Prefect', 'MLflow', 'FastAPI', 'Docker'],
//   },
//   {
//     id: 2,
//     title: 'Job Fit & Skill Gap Intelligence System',
//     description: 'AI-driven system evaluating resume–job fit using NLP and ML, generating job readiness scores and personalized skill gap recommendations.',
//     tech: ['Python', 'spaCy', 'TF-IDF', 'Logistic Regression', 'XGBoost', 'PostgreSQL', 'Streamlit'],
//     ongoing: true,
//   },
//   {
//     id: 3,
//     title: 'DevConnect – Techies Social Platform',
//     description: 'Full-stack social platform for developers featuring authentication, profiles, project sharing, search, and image uploads with a React + Golang backend.',
//     tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Auth', 'Axios'],
//     ongoing: true,
//   },
//   {
//     id: 4,
//     title: 'Credit Card Fraud Detection',
//     description: 'High-accuracy fraud detection system using advanced ML on imbalanced datasets, with end-to-end preprocessing, feature engineering, and real-time risk prediction.',
//     tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
//   },
//   {
//     id: 5,
//     title: 'Airport Management Web – Flight Management & Booking System',
//     description: 'Role-based full-stack flight management system where admins manage flights/schedules and users can search, book flights, and track baggage. Secure JWT auth with React + Golang backend.',
//     tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication'],
//   },
//   {
//     id: 6,
//     title: 'RetailPulse – Sales & Profit Intelligence Dashboard',
//     description: 'End-to-end Power BI dashboard analyzing sales, profitability, and customer trends using a star-schema data model with advanced DAX calculations.',
//     tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
//   },
//   {
//     id: 7,
//     title: 'FinSight – Financial Performance & Forecasting Dashboard',
//     description: 'Financial analytics dashboard tracking revenue, expenses, EBITDA, and cash flow with budget vs. actual variance analysis and automated forecasting.',
//     tech: ['Power BI', 'DAX', 'Power Query', 'Financial Modeling'],
//   },
//   {
//     id: 8,
//     title: 'Sentiment Analysis – NLP-Based Text Classification System',
//     description: 'End-to-end sentiment analysis system classifying user reviews using NLP preprocessing and Random Forest, deployed as a real-time REST API via FastAPI.',
//     tech: ['Python', 'NLTK', 'Scikit-learn', 'Random Forest', 'FastAPI', 'REST APIs'],
//   },
//   {
//     id: 9,
//     title: 'Gesture-Controlled Snake Game – Computer Vision Interface',
//     description: 'Real-time Snake game controlled via hand gestures using MediaPipe hand tracking and OpenCV, mapped to Pygame game controls for a touchless experience.',
//     tech: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'NumPy'],
//   },
// ];

// const ProjectCard: React.FC<{
//   project: typeof allProjects[0];
//   index: number;
//   isInView: boolean;
// }> = ({ project, index, isInView }) => {
//   return (
//     <div
//       className={`glass-card-hover p-6 rounded-xl group ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
//       style={{ animationDelay: `${0.2 + index * 0.1}s` }}
//     >
//       <div className="flex items-start justify-between mb-4">
//         <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
//           {project.title}
//         </h3>
//         {project.ongoing && (
//           <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
//             Ongoing
//           </span>
//         )}
//       </div>

//       <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
//         {project.description}
//       </p>

//       <div className="flex flex-wrap gap-2">
//         {project.tech.slice(0, 5).map((t) => (
//           <span key={t} className="tech-badge">
//             {t}
//           </span>
//         ))}
//         {project.tech.length > 5 && (
//           <span className="tech-badge">+{project.tech.length - 5}</span>
//         )}
//       </div>
//     </div>
//   );
// };

// const ProjectsSection: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.1 });
//   const featuredProjects = allProjects.slice(0, 4);

//   return (
//     <section id="projects" className="py-20 relative" ref={ref}>
//       {/* Background */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />
      
//       {/* Gradient Orbs */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="gradient-orb gradient-orb-pink w-[350px] h-[350px] top-20 -right-20" style={{ animationDelay: '2s' }} />
//         <div className="gradient-orb gradient-orb-purple w-[300px] h-[300px] bottom-20 -left-10" style={{ animationDelay: '4s' }} />
//       </div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Heading */}
//         <h2 className={`section-heading ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
//           <span className="gradient-text-vibrant">My Projects</span>
//         </h2>

//         {/* Projects Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
//           {featuredProjects.map((project, index) => (
//             <ProjectCard
//               key={project.id}
//               project={project}
//               index={index}
//               isInView={isInView}
//             />
//           ))}
//         </div>

//         {/* View All Button */}
//         <div className={`text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
//           <Link
//             to="/projects/all"
//             className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-border-card font-semibold text-foreground hover:text-primary transition-all group"
//           >
//             <span className="relative z-10">View All Projects</span>
//             <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProjectsSection;

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket, Code, Database, Zap, ExternalLink, Github, Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { link } from 'fs';

export const allProjects = [
  {
    id: 1,
    title: 'Taxi Fare Prediction System',
    description: 'End-to-end ML pipeline for taxi fare prediction with geospatial & temporal feature engineering, workflow orchestration, and experiment tracking for real-time deployment readiness.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'XGBoost', 'CatBoost', 'Prefect', 'MLflow', 'FastAPI', 'Docker'],
    category: 'Machine Learning',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://github.com/himanshmunjal'
  },
  {
    id: 2,
    title: 'Job Fit & Skill Gap Intelligence System',
    description: 'AI-driven system evaluating resume—job fit using NLP and ML, generating job readiness scores and personalized skill gap recommendations.',
    tech: ['Python', 'spaCy', 'TF-IDF', 'Logistic Regression', 'XGBoost', 'PostgreSQL', 'Streamlit'],
    ongoing: true,
    category: 'AI/NLP',
    color: 'from-purple-500 to-pink-500',
    link: 'https://github.com/himanshmunjal/Job-fit-skill-gap-Analyzer'
  },
  {
    id: 3,
    title: 'DevConnect – Techies Social Platform',
    description: 'Full-stack social platform for developers featuring authentication, profiles, project sharing, search, and image uploads with a React + Golang backend.',
    tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Auth', 'Axios'],
    ongoing: true,
    category: 'Full Stack',
    color: 'from-emerald-500 to-teal-500',
    link : 'https://github.com/himanshmunjal/DevConnect'
  },
  {
    id: 4,
    title: 'Credit Card Fraud Detection',
    description: 'High-accuracy fraud detection system using advanced ML on imbalanced datasets, with end-to-end preprocessing, feature engineering, and real-time risk prediction.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
    category: 'Data Science',
    color: 'from-orange-500 to-red-500',
    link : 'https://github.com/himanshmunjal'
  },
  {
    id: 5,
    title: 'Airport Management Web – Flight Management & Booking System',
    description: 'Role-based full-stack flight management system where admins manage flights/schedules and users can search, book flights, and track baggage. Secure JWT auth with React + Golang backend.',
    tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication'],
    category: 'Full Stack',
    color: 'from-indigo-500 to-purple-500',
    link : 'https://github.com/himanshmunjal/Training'
  },
  {
    id: 6,
    title: 'RetailPulse – Sales & Profit Intelligence Dashboard',
    description: 'End-to-end Power BI dashboard analyzing sales, profitability, and customer trends using a star-schema data model with advanced DAX calculations.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    category: 'Analytics',
    color: 'from-pink-500 to-rose-500',
    link : 'https://github.com/himanshmunjal'
  },
  {
    id: 7,
    title: 'FinSight – Financial Performance & Forecasting Dashboard',
    description: 'Financial analytics dashboard tracking revenue, expenses, EBITDA, and cash flow with budget vs. actual variance analysis and automated forecasting.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Financial Modeling'],
    category: 'Analytics',
    color: 'from-yellow-500 to-orange-500',
    link : 'https://github.com/himanshmunjal'
  },
  {
    id: 8,
    title: 'Sentiment Analysis – NLP-Based Text Classification System',
    description: 'End-to-end sentiment analysis system classifying user reviews using NLP preprocessing and Random Forest, deployed as a real-time REST API via FastAPI.',
    tech: ['Python', 'NLTK', 'Scikit-learn', 'Random Forest', 'FastAPI', 'REST APIs'],
    category: 'NLP',
    color: 'from-green-500 to-emerald-500',
    link : 'https://github.com/himanshmunjal'
  },
  {
    id: 9,
    title: 'Gesture-Controlled Snake Game – Computer Vision Interface',
    description: 'Real-time Snake game controlled via hand gestures using MediaPipe hand tracking and OpenCV, mapped to Pygame game controls for a touchless experience.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'NumPy'],
    category: 'Computer Vision',
    color: 'from-cyan-500 to-blue-500',
    link : 'https://github.com/himanshmunjal/Hand-Gesture'
  },
];

const ProjectCard: React.FC<{
  project: typeof allProjects[0];
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
}> = ({ project, index, isInView, mousePosition }) => {
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
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500`} />

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
        {/* Shimmer effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        {/* Header */}
        <div className="flex items-start justify-between mb-4 relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.color} animate-pulse`} />
              <span className="text-xs text-muted-foreground">{project.category}</span>
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
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
        <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed relative z-10">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4 relative z-10">
          {project.tech.slice(0, 5).map((t, idx) => (
            <span
              key={t}
              className="px-3 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all cursor-default"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className="px-3 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20">
              +{project.tech.length - 5}
            </span>
          )}
        </div>

        {/* Action buttons - shown on hover */}
        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 relative z-10">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 hover:from-primary/30 hover:to-purple-500/30 transition-all text-sm font-medium text-primary">
            <ExternalLink className="w-4 h-4" />
            View Project
          </button>
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-r from-primary/20 to-purple-500/20 border border-primary/30 hover:from-primary/30 hover:to-purple-500/30 transition-all">
            <a href = {project.link} ><Github className="w-4 h-4 text-primary" /></a>
          </button>
        </div>

        {/* Decorative elements */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${project.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`} />
      </div>
    </div>
  );
};

const ProjectsSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const featuredProjects = allProjects.slice(0, 4);

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

    const particles: Particle[] = Array.from({ length: 25 }, () => ({
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
    <section id="projects" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
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
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <Rocket className="w-6 h-6 text-primary animate-bounce" />
            <Code className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <Database className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.4s' }} />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              My Projects
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Innovative solutions spanning ML, full-stack development, and data analytics
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              mousePosition={mousePosition}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className={`text-center ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
          <Link
            to="/projects/all"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
          >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[2px] rounded-xl">
              <div className="w-full h-full rounded-xl bg-background/95 backdrop-blur-xl" />
            </div>
            
            {/* Content */}
            <Star className="relative z-10 w-5 h-5 text-primary group-hover:rotate-180 transition-transform duration-500" />
            <span className="relative z-10 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              View All Projects
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

export default ProjectsSection;