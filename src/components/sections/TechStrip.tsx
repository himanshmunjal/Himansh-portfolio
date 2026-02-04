import React from 'react';
import { motion } from 'framer-motion';

const TechStrip: React.FC = () => {
  const technologies = [
    'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Go', 'Java', 'C++',
    'TensorFlow', 'PyTorch', 'Scikit-learn', 'Pandas', 'NumPy', 'MongoDB', 'PostgreSQL',
    'Docker', 'Kubernetes', 'AWS', 'Git', 'Linux', 'FastAPI', 'Express.js', 'Tailwind CSS',
    'Power BI', 'Tableau', 'MLflow', 'Prefect', 'JWT', 'REST APIs', 'GraphQL'
  ];

  // Duplicate the array for seamless infinite scroll
  const duplicatedTechs = [...technologies, ...technologies];

  return (
    <section className="py-12 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-dark-800 dark:to-dark-700 overflow-hidden">
      <div className="relative">
        <motion.div
          animate={{ x: '-50%' }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="flex space-x-8 whitespace-nowrap"
        >
          {duplicatedTechs.map((tech, index) => (
            <motion.div
              key={`${tech}-${index}`}
              whileHover={{ scale: 1.1, y: -2 }}
              className="flex items-center space-x-3 glass px-6 py-3 rounded-full bg-white/20 dark:bg-white/5 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer group"
            >
              <div className="w-2 h-2 bg-primary-500 rounded-full group-hover:animate-pulse" />
              <span className="text-gray-800 dark:text-gray-200 font-medium text-sm">
                {tech}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStrip;