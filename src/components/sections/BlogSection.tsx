import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BlogSection: React.FC = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: 'Mastering Java: From Basics to Advanced Concepts',
      excerpt: 'A comprehensive guide to Java programming covering OOP principles, design patterns, and best practices for enterprise development.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Java', 'Programming', 'OOP'],
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Clean Code Practices Every Developer Should Know',
      excerpt: 'Essential coding practices that make your code more readable, maintainable, and efficient. Learn the principles that separate good developers from great ones.',
      date: '2024-01-10',
      readTime: '6 min read',
      tags: ['Clean Code', 'Best Practices', 'Development'],
      image: '/api/placeholder/400/250'
    },
    {
      title: 'Spring Boot: Building Scalable Web Applications',
      excerpt: 'Deep dive into Spring Boot framework, exploring microservices architecture, dependency injection, and building production-ready applications.',
      date: '2024-01-05',
      readTime: '12 min read',
      tags: ['Spring Boot', 'Java', 'Microservices'],
      image: '/api/placeholder/400/250'
    }
  ];

  const handleViewAllBlogs = () => {
    navigate('/blogs/all');
  };

  return (
    <section id="blog" className="section-padding bg-white/50 dark:bg-dark-800/50">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-6">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Sharing insights, tutorials, and thoughts on technology, programming, and software development
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="glass-card group cursor-pointer overflow-hidden"
            >
              {/* Blog Image */}
              <div className="relative overflow-hidden rounded-lg mb-6">
                <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                  <div className="text-primary-500 text-6xl font-bold opacity-20">
                    {post.title.charAt(0)}
                  </div>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
              </div>

              {/* Blog Content */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, tagIndex) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                      viewport={{ once: true }}
                      className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                    >
                      <Tag className="w-3 h-3" />
                      <span>{tag}</span>
                    </motion.span>
                  ))}
                </div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-center space-x-2 text-primary-500 dark:text-primary-400 font-medium pt-2"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Blogs Button */}
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
            onClick={handleViewAllBlogs}
            className="btn-primary inline-flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>View All Blogs</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;