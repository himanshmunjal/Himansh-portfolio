import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Brain, Download } from 'lucide-react';

const AboutSection: React.FC = () => {
  const stats = [
    { label: 'Years of Experience', value: '2+', icon: Code },
    { label: 'Projects Built', value: '15+', icon: Database },
    { label: 'Technologies Mastered', value: '20+', icon: Brain },
  ];

  const handleResumeDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Himansh_Munjal_Resume.pdf';
    link.click();
  };

  return (
    <section id="about" className="section-padding bg-white/50 dark:bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            About Me
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8">
              I'm a passionate <span className="text-primary-500 font-semibold">Data Science, Data Analyst, and Full Stack enthusiast</span> with 
              a deep love for building scalable systems, ML pipelines, and impactful data products. 
              My journey spans across artificial intelligence, system design, and production-grade engineering, 
              where I thrive on transforming complex problems into elegant solutions.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              With expertise in modern technologies and a keen interest in AI innovation, 
              I'm dedicated to creating meaningful digital experiences that bridge the gap between 
              data insights and user-centric applications.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {/* Stats Cards */}
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="glass-card text-center group"
            >
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-primary-500/10 rounded-full group-hover:bg-primary-500/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-primary-500" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}

          {/* Resume Download Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="glass-card text-center group cursor-pointer"
            onClick={handleResumeDownload}
          >
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                <Download className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Resume
            </div>
            <div className="text-gray-600 dark:text-gray-400 font-medium">
              Download CV
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;