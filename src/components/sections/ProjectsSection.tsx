import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Rocket, Code, Database, Zap, ExternalLink, Github, Star } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import SEO from '../common/SEO';

// export const allProjects = [
//   {
//     id: 1,
//     title: 'Job Fit & Skill Gap Intelligence System',
//     description: 'AI-driven system evaluating resume—job fit using NLP and ML, generating job readiness scores and personalized skill gap recommendations.',
//     tech: ['Python', 'spaCy', 'TF-IDF', 'Logistic Regression', 'XGBoost', 'PostgreSQL', 'Streamlit'],
//     ongoing: true,
//     category: 'AI/NLP',
//     color: 'from-purple-500 to-pink-500',
//     link: 'https://github.com/himanshmunjal/Job-fit-skill-gap-Analyzer'
//   },
//   {
//     id: 2,
//     title: 'Taxi Fare Prediction System',
//     description: 'End-to-end ML pipeline for taxi fare prediction with geospatial & temporal feature engineering, workflow orchestration, and experiment tracking for real-time deployment readiness.',
//     tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'XGBoost', 'CatBoost', 'Prefect', 'MLflow', 'FastAPI', 'Docker'],
//     category: 'Machine Learning',
//     color: 'from-blue-500 to-cyan-500',
//     link: 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 5,
//     title: 'Airport Management Web – Flight Management & Booking System',
//     description: 'Role-based full-stack flight management system where admins manage flights/schedules and users can search, book flights, and track baggage. Secure JWT auth with React + Golang backend.',
//     tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication'],
//     category: 'Full Stack',
//     color: 'from-indigo-500 to-purple-500',
//     link : 'https://github.com/himanshmunjal/Training'
//   },
//   {
//     id: 4,
//     title: 'GridSense — AI Grid Demand Forecasting & Anomaly Detection System',
//     description: 'Developed a deep learning system for a multi-zone electricity distribution network, performing 24-hour ahead hourly demand forecasting using LSTM and Transformer architectures with temporal and lag-based feature engineering. Implemented an anomaly detection pipeline using Isolation Forest on model residuals to automatically flag abnormal consumption events and pre-alert grid operators before failure occurrence. Built an interactive real-time dashboard for zone-wise forecast visualization and alert monitoring.',
//     tech: ['Python', 'PyTorch', 'Scikit-Learn', 'Pandas', 'Streamlit', 'Plotly'],
//     category: 'Data Science',
//     color: 'from-orange-500 to-red-500',
//     link : 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 3,
//     title: 'DisasterTweet AI — Real-Time Disaster Tweet Triage & Urgency Ranking System',
//     description: 'Built an NLP pipeline to classify and prioritize disaster-related tweets during active emergencies, fine-tuning RoBERTa for multi-class classification across categories including SOS, medical emergency, infrastructure damage, and misinformation. Engineered an urgency ranking algorithm combining classification confidence, severity signals, and recency to generate a ranked alert feed for first responders. Simulated a real-time tweet stream with live dashboard filtering and color-coded urgency visualization.',
//     tech: ['Python', 'HuggingFace', 'Transformers', 'PyTorch', 'Pandas', 'Streamlit', 'Plotly'],
//     ongoing: false,
//     category: 'Full Stack',
//     color: 'from-emerald-500 to-teal-500',
//     link : 'https://github.com/himanshmunjal/DevConnect'
//   },
//   {
//     id: 10,
//     title: 'FinGuard — Hybrid Deep Learning Financial Fraud Detection Engine',
//     description: 'Designed a three-layer hybrid fraud detection system combining Graph Neural Networks for coordinated fraud ring detection, a Transformer-based sequence model for behavioral anomaly detection in transaction histories, and an XGBoost ensemble layer integrating outputs from all upstream models. Applied SHAP explainability to surface the top contributing features per fraud decision, and built a real-time transaction stream simulator with per-transaction risk tiering and network graph visualization of detected fraud clusters.',
//     tech: ['Python', 'PyTorch', 'PyTorch Geometric', 'XGBoost', 'SHAP', 'Pandas', 'Streamlit', 'Plotly'],
//     ongoing: true,
//     category: 'Deep Learning',
//     color: 'from-orange-500 to-red-500',
//     link : 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 6,
//     title: 'RetailPulse – Sales & Profit Intelligence Dashboard',
//     description: 'End-to-end Power BI dashboard analyzing sales, profitability, and customer trends using a star-schema data model with advanced DAX calculations.',
//     tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
//     category: 'Analytics',
//     color: 'from-pink-500 to-rose-500',
//     link : 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 7,
//     title: 'FinSight – Financial Performance & Forecasting Dashboard',
//     description: 'Financial analytics dashboard tracking revenue, expenses, EBITDA, and cash flow with budget vs. actual variance analysis and automated forecasting.',
//     tech: ['Power BI', 'DAX', 'Power Query', 'Financial Modeling'],
//     category: 'Analytics',
//     color: 'from-yellow-500 to-orange-500',
//     link : 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 8,
//     title: 'Sentiment Analysis – NLP-Based Text Classification System',
//     description: 'End-to-end sentiment analysis system classifying user reviews using NLP preprocessing and Random Forest, deployed as a real-time REST API via FastAPI.',
//     tech: ['Python', 'NLTK', 'Scikit-learn', 'Random Forest', 'FastAPI', 'REST APIs'],
//     category: 'NLP',
//     color: 'from-green-500 to-emerald-500',
//     link : 'https://github.com/himanshmunjal'
//   },
//   {
//     id: 9,
//     title: 'Gesture-Controlled Snake Game – Computer Vision Interface',
//     description: 'Real-time Snake game controlled via hand gestures using MediaPipe hand tracking and OpenCV, mapped to Pygame game controls for a touchless experience.',
//     tech: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'NumPy'],
//     category: 'Computer Vision',
//     color: 'from-cyan-500 to-blue-500',
//     link : 'https://github.com/himanshmunjal/Hand-Gesture'
//   },
// ];

export const allProjects = [
  {
    id: 10,
    title: 'FinGuard — Hybrid Deep Learning Financial Fraud Detection Engine',
    description: 'Designed a multi-layer fraud detection architecture combining Graph Neural Networks for detecting coordinated fraud rings, a Transformer-based sequence model for behavioral anomaly detection in transaction histories, and an XGBoost ensemble layer aggregating upstream predictions. Integrated SHAP explainability for transparent risk attribution and built a real-time transaction stream simulator with network graph visualization of detected fraud clusters.',
    tech: ['Python', 'PyTorch', 'PyTorch Geometric', 'XGBoost', 'SHAP', 'Pandas', 'Streamlit', 'Plotly'],
    ongoing: true,
    category: 'Deep Learning',
    color: 'from-orange-500 to-red-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 4,
    title: 'GridSense — AI Grid Demand Forecasting & Anomaly Detection System',
    description: 'Developed a deep learning forecasting system for multi-zone electricity grids using LSTM and Transformer architectures to predict 24-hour ahead hourly demand. Engineered temporal and lag-based features and implemented an anomaly detection pipeline using Isolation Forest on forecast residuals to proactively flag abnormal consumption events. Built an interactive monitoring dashboard for zone-wise forecasts and grid anomaly alerts.',
    tech: ['Python', 'PyTorch', 'Scikit-Learn', 'Pandas', 'Streamlit', 'Plotly'],
    category: 'Data Science',
    color: 'from-orange-500 to-red-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 3,
    title: 'DisasterTweet AI — Real-Time Disaster Tweet Triage & Urgency Ranking System',
    description: 'Built an NLP intelligence system to classify and prioritize disaster-related tweets during emergencies by fine-tuning RoBERTa for multi-class classification across categories such as SOS, medical emergencies, infrastructure damage, and misinformation. Designed an urgency ranking algorithm combining model confidence, severity indicators, and recency to generate a prioritized alert feed for first responders with a real-time visualization dashboard.',
    tech: ['Python', 'HuggingFace', 'Transformers', 'PyTorch', 'Pandas', 'Streamlit', 'Plotly'],
    ongoing: false,
    category: 'AI/NLP',
    color: 'from-emerald-500 to-teal-500',
    link: 'https://github.com/himanshmunjal/DevConnect'
  },

  {
    id: 1,
    title: 'Job Fit & Skill Gap Intelligence System',
    description: 'Developed an AI-driven resume intelligence system that evaluates candidate-job compatibility using NLP feature extraction and machine learning classification models. The system generates a job readiness score and identifies missing competencies by comparing resume skills against job descriptions, providing personalized skill gap insights and improvement recommendations.',
    tech: ['Python', 'spaCy', 'TF-IDF', 'Logistic Regression', 'XGBoost', 'PostgreSQL', 'Streamlit'],
    ongoing: true,
    category: 'AI/NLP',
    color: 'from-purple-500 to-pink-500',
    link: 'https://github.com/himanshmunjal/Job-fit-skill-gap-Analyzer'
  },

  {
    id: 2,
    title: 'Taxi Fare Prediction System',
    description: 'Developed a production-style machine learning pipeline to predict taxi fares using geospatial and temporal feature engineering. Implemented experiment tracking with MLflow, workflow orchestration using Prefect, and exposed the trained model via FastAPI for real-time predictions. Containerized the system with Docker to simulate deployment-ready ML infrastructure.',
    tech: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'XGBoost', 'CatBoost', 'Prefect', 'MLflow', 'FastAPI', 'Docker'],
    category: 'Machine Learning',
    color: 'from-blue-500 to-cyan-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 5,
    title: 'Airport Management Web – Flight Management & Booking System',
    description: 'Built a role-based full-stack airport management system where administrators manage flight schedules while users search, book flights, track baggage status, and submit complaints. Implemented secure authentication using JWT and developed a RESTful backend with Golang (Gin + GORM) integrated with PostgreSQL, with a responsive React frontend.',
    tech: ['React.js', 'Tailwind CSS', 'Golang', 'Gin', 'GORM', 'PostgreSQL', 'JWT Authentication'],
    category: 'Full Stack',
    color: 'from-indigo-500 to-purple-500',
    link: 'https://github.com/himanshmunjal/Training'
  },

  {
    id: 8,
    title: 'Sentiment Analysis – NLP-Based Text Classification System',
    description: 'Developed an NLP pipeline for sentiment classification of user reviews using text preprocessing, feature extraction, and a Random Forest classifier. Deployed the model as a REST API using FastAPI, enabling real-time sentiment prediction and integration with external applications.',
    tech: ['Python', 'NLTK', 'Scikit-learn', 'Random Forest', 'FastAPI', 'REST APIs'],
    category: 'NLP',
    color: 'from-green-500 to-emerald-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 6,
    title: 'RetailPulse – Sales & Profit Intelligence Dashboard',
    description: 'Designed an interactive Power BI dashboard analyzing sales performance, profitability trends, and customer behavior using a star-schema data model. Implemented advanced DAX calculations and dynamic filtering to enable business users to explore revenue drivers and profitability insights.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Data Modeling'],
    category: 'Analytics',
    color: 'from-pink-500 to-rose-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 7,
    title: 'FinSight – Financial Performance & Forecasting Dashboard',
    description: 'Developed a financial analytics dashboard tracking key business metrics including revenue, expenses, EBITDA, and cash flow. Implemented budget vs actual variance analysis and forecasting models to support financial planning and performance monitoring.',
    tech: ['Power BI', 'DAX', 'Power Query', 'Financial Modeling'],
    category: 'Analytics',
    color: 'from-yellow-500 to-orange-500',
    link: 'https://github.com/himanshmunjal'
  },

  {
    id: 9,
    title: 'Gesture-Controlled Snake Game – Computer Vision Interface',
    description: 'Built a computer vision-based interactive game where users control a Snake game using hand gestures detected via MediaPipe. Integrated real-time hand tracking with OpenCV and mapped gestures to Pygame controls to create a touchless gaming experience.',
    tech: ['Python', 'MediaPipe', 'OpenCV', 'Pygame', 'NumPy'],
    category: 'Computer Vision',
    color: 'from-cyan-500 to-blue-500',
    link: 'https://github.com/himanshmunjal/Hand-Gesture'
  },
];

const ProjectCard: React.FC<{
  project: typeof allProjects[0];
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
}> = ({ project, index, isInView }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`group relative ${isInView ? 'animate-fade-in' : 'opacity-0'}`}
      style={{ 
        animationDelay: `${0.2 + index * 0.1}s`,
        perspective: '1500px',
        transformStyle: "preserve-3d"
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-75 blur-xl transition-all duration-500`} />

      {/* Card */}
      <motion.div
        className="relative glass-card rounded-2xl p-6 backdrop-blur-xl bg-background/40 border border-primary/20 overflow-hidden group-hover:bg-background/60 group-hover:border-primary/40 group-hover:shadow-2xl h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
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
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${project.color} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} style={{ transform: "translateZ(10px)" }} />
        <div className={`absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr ${project.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity duration-500`} style={{ transform: "translateZ(10px)" }} />
      </motion.div>
    </motion.div>
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
    <>
    <SEO
        title="Projects"
        description="Explore AI, Machine Learning, Data Science, and Full Stack projects built by Himansh Munjal."
        url="/projects/all"
        keywords={["AI projects", "Machine Learning projects", "React projects", "Golang projects", "Data Science projects", "Himansh Munjal projects", "Power BI dashboards", "NLP projects"]}
      />
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
    </>
  );
};

export default ProjectsSection;