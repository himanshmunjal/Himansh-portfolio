import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProjectsSection: React.FC = () => {
  const navigate = useNavigate();

  const projects = [
    {
      title: 'Taxi Fare Prediction System',
      description: 'Machine learning model to predict taxi fares using advanced regression techniques and feature engineering.',
      tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'ML'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Job Fit & Skill Gap Intelligence System',
      description: 'AI-powered platform analyzing job requirements and candidate skills to identify gaps and recommend improvements.',
      tech: ['Python', 'NLP', 'TensorFlow', 'React', 'FastAPI'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'DevConnect – Techies Social Platform',
      description: 'Social networking platform designed specifically for developers to connect, collaborate, and share knowledge.',
      tech: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'JWT'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Credit Card Fraud Detection System',
      description: 'Real-time fraud detection system using ensemble learning methods and anomaly detection algorithms.',
      tech: ['Python', 'Scikit-learn', 'XGBoost', 'Streamlit', 'ML'],
      image: '/api/placeholder/400/250',
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  ];

  const handleViewAllProjects = () => {
    navigate('/projects/all');
  };

  return (
    <section id="projects" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work in data science, machine learning, and full-stack development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
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
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: techIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewAllProjects}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;