import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllProjects: React.FC = () => {
  const navigate = useNavigate();

  const allProjects = [
    {
      title: 'Taxi Fare Prediction System',
      description: 'Machine learning model to predict taxi fares using advanced regression techniques and feature engineering. Implemented with Python, Scikit-learn, and deployed using Flask.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'ML'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Machine Learning'
    },
    {
      title: 'Job Fit & Skill Gap Intelligence System',
      description: 'AI-powered platform analyzing job requirements and candidate skills to identify gaps and recommend improvements. Uses NLP for job description analysis.',
      tech: ['Python', 'NLP', 'TensorFlow', 'React', 'FastAPI'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'AI/ML'
    },
    {
      title: 'DevConnect – Techies Social Platform',
      description: 'Social networking platform designed specifically for developers to connect, collaborate, and share knowledge. Features real-time messaging and project collaboration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Full Stack'
    },
    {
      title: 'Credit Card Fraud Detection System',
      description: 'Real-time fraud detection system using ensemble learning methods and anomaly detection algorithms. Achieves 99.2% accuracy with minimal false positives.',
      tech: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'ML'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Machine Learning'
    },
    {
      title: 'E-Commerce Analytics Dashboard',
      description: 'Comprehensive analytics dashboard for e-commerce businesses with real-time sales tracking, customer behavior analysis, and predictive insights.',
      tech: ['Python', 'Dash', 'Plotly', 'PostgreSQL', 'Pandas'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Data Analytics'
    },
    {
      title: 'Smart Home IoT System',
      description: 'IoT-based smart home automation system with mobile app control, voice commands, and energy optimization features.',
      tech: ['Arduino', 'React Native', 'Firebase', 'Node.js', 'IoT'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'IoT'
    },
    {
      title: 'Stock Price Prediction Model',
      description: 'Deep learning model for stock price prediction using LSTM networks and technical indicators. Includes backtesting and risk analysis.',
      tech: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'Matplotlib'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Deep Learning'
    },
    {
      title: 'Task Management API',
      description: 'RESTful API for task management with user authentication, role-based access control, and real-time notifications.',
      tech: ['Go', 'PostgreSQL', 'JWT', 'Docker', 'REST API'],
      github: 'https://github.com',
      demo: 'https://demo.com',
      category: 'Backend'
    }
  ];

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="pt-20 min-h-screen">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center space-x-2 text-primary-500 hover:text-primary-600 mb-6 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </motion.button>

          <h1 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            All Projects
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            A comprehensive collection of my work spanning machine learning, full-stack development, 
            data analytics, and emerging technologies. Each project represents a unique challenge 
            and learning experience in my journey as a developer.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {allProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="glass-card group overflow-hidden"
            >
              {/* Project Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <div className="text-primary-500 text-6xl font-bold opacity-20">
                    {project.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-white/90 dark:bg-dark-800/90 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
                    {project.category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex space-x-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <Github className="w-5 h-5 text-gray-800" />
                    </motion.a>
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/90 rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-800" />
                    </motion.a>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* GitHub Redirect Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 glass-card hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 text-lg font-medium"
          >
            <Github className="w-8 h-8" />
            <div>
              <div className="text-gray-900 dark:text-white">View More on GitHub</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Explore my complete repository</div>
            </div>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AllProjects;