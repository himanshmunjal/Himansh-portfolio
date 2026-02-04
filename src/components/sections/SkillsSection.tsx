import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Database, BarChart3, Globe, Calculator, Wrench } from 'lucide-react';

const SkillsSection: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skillCategories = [
    {
      title: 'Programming Languages',
      icon: Code,
      skills: ['Python', 'Java', 'C/C++', 'R', 'Go'],
      percentage: 90,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Data Science',
      icon: Database,
      skills: ['ML', 'Scikit-learn', 'Deep Learning', 'NLP', 'Prefect', 'MLflow', 'SQL'],
      percentage: 85,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Data Analysis & Visualization',
      icon: BarChart3,
      skills: ['NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
      percentage: 88,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Full Stack Development',
      icon: Globe,
      skills: ['React', 'Tailwind', 'Golang', 'FastAPI', 'JWT', 'MongoDB', 'PostgreSQL'],
      percentage: 82,
      color: 'from-orange-500 to-orange-600'
    },
    {
      title: 'Mathematics & Algorithms',
      icon: Calculator,
      skills: ['Linear Algebra', 'Probability', 'Statistics', 'Calculus', 'Differential Equations'],
      percentage: 87,
      color: 'from-red-500 to-red-600'
    },
    {
      title: 'Other Skills',
      icon: Wrench,
      skills: ['Git', 'GitHub', 'Linux CLI', 'Bash', 'System Design'],
      percentage: 85,
      color: 'from-teal-500 to-teal-600'
    }
  ];

  return (
    <section className="section-padding bg-white/50 dark:bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            Skills & Expertise
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and areas of expertise
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -5 }}
              onHoverStart={() => setHoveredSkill(index)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="skill-card"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 bg-gradient-to-r ${category.color} rounded-full mr-4 group-hover:shadow-lg transition-all duration-300`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-3 mb-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {skill}
                    </span>
                    <div className="w-2 h-2 bg-primary-500 rounded-full opacity-60" />
                  </motion.div>
                ))}
              </div>

              {/* Skill Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Proficiency
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: hoveredSkill === index ? 1 : 0 
                    }}
                    className="text-sm font-bold text-primary-600 dark:text-primary-400"
                  >
                    {category.percentage}%
                  </motion.span>
                </div>
                <div className="skill-progress">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${category.percentage}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="skill-progress-bar"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;