import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar } from 'lucide-react';

const JourneySection: React.FC = () => {
  const educationData = [
    {
      institution: 'Vellore Institute of Technology, Vellore',
      degree: 'B.Tech CSE (Data Science)',
      grade: 'CGPA 8.58',
      period: 'Expected 2027',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      institution: 'Parth Public School',
      degree: 'CBSE 12th',
      grade: 'Merit | 87.8%',
      period: '2023',
      icon: Award,
      color: 'from-green-500 to-green-600'
    },
    {
      institution: 'Pratap Public School',
      degree: 'CBSE 10th',
      grade: 'First Division | 93.2%',
      period: '2021',
      icon: Award,
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const experienceData = {
    company: 'Beryl System Pvt. Ltd.',
    position: 'Full Stack Intern – Web',
    period: 'May 2025 – June 2025',
    description: 'Developed secure web applications using Go, React, and PostgreSQL. Implemented robust authentication systems, CORS handling, and seamless backend-frontend integration.',
    technologies: ['Go', 'React', 'PostgreSQL', 'JWT', 'REST APIs', 'CORS'],
    icon: Briefcase
  };

  return (
    <section id="journey" className="section-padding">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            My Journey
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Education & Experience that shaped my path in technology
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Education Timeline */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <GraduationCap className="w-6 h-6 mr-3 text-primary-500" />
              Education
            </h3>
            
            <div className="space-y-6">
              {educationData.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 10 }}
                  className="glass-card group cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-gradient-to-r ${edu.color} rounded-full group-hover:shadow-lg transition-all duration-300`}>
                      <edu.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {edu.institution}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                        {edu.degree}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <span className="flex items-center">
                          <Award className="w-4 h-4 mr-1" />
                          {edu.grade}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {edu.period}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
              <Briefcase className="w-6 h-6 mr-3 text-primary-500" />
              Experience
            </h3>

            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              className="glass-card group cursor-pointer h-fit"
            >
              <div className="flex items-start space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full group-hover:shadow-lg group-hover:shadow-primary-500/25 transition-all duration-300">
                  <experienceData.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {experienceData.company}
                  </h4>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                    {experienceData.position}
                  </p>
                  <span className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-1" />
                    {experienceData.period}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {experienceData.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {experienceData.technologies.map((tech, index) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JourneySection;