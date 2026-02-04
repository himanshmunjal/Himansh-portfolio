import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AllBlogs: React.FC = () => {
  const navigate = useNavigate();

  const allBlogs = [
    {
      title: 'Mastering Java: From Basics to Advanced Concepts',
      excerpt: 'A comprehensive guide to Java programming covering OOP principles, design patterns, and best practices for enterprise development. Learn how to write clean, maintainable Java code.',
      date: '2024-01-15',
      readTime: '8 min read',
      tags: ['Java', 'Programming', 'OOP', 'Design Patterns'],
      category: 'Programming',
      featured: true
    },
    {
      title: 'Clean Code Practices Every Developer Should Know',
      excerpt: 'Essential coding practices that make your code more readable, maintainable, and efficient. Learn the principles that separate good developers from great ones.',
      date: '2024-01-10',
      readTime: '6 min read',
      tags: ['Clean Code', 'Best Practices', 'Development', 'Software Engineering'],
      category: 'Best Practices',
      featured: true
    },
    {
      title: 'Spring Boot: Building Scalable Web Applications',
      excerpt: 'Deep dive into Spring Boot framework, exploring microservices architecture, dependency injection, and building production-ready applications.',
      date: '2024-01-05',
      readTime: '12 min read',
      tags: ['Spring Boot', 'Java', 'Microservices', 'Web Development'],
      category: 'Framework',
      featured: true
    },
    {
      title: 'Understanding Data Structures and Algorithms',
      excerpt: 'Master the fundamental concepts of data structures and algorithms with practical examples and real-world applications.',
      date: '2023-12-28',
      readTime: '10 min read',
      tags: ['DSA', 'Algorithms', 'Data Structures', 'Problem Solving'],
      category: 'Computer Science',
      featured: false
    },
    {
      title: 'Machine Learning Fundamentals for Beginners',
      excerpt: 'Introduction to machine learning concepts, algorithms, and practical implementation using Python and popular ML libraries.',
      date: '2023-12-20',
      readTime: '15 min read',
      tags: ['Machine Learning', 'Python', 'AI', 'Data Science'],
      category: 'Machine Learning',
      featured: false
    },
    {
      title: 'Building RESTful APIs with Node.js and Express',
      excerpt: 'Learn how to create robust and scalable RESTful APIs using Node.js, Express, and MongoDB with authentication and validation.',
      date: '2023-12-15',
      readTime: '9 min read',
      tags: ['Node.js', 'Express', 'REST API', 'Backend'],
      category: 'Backend Development',
      featured: false
    },
    {
      title: 'React Hooks: A Complete Guide',
      excerpt: 'Comprehensive guide to React Hooks including useState, useEffect, custom hooks, and advanced patterns for modern React development.',
      date: '2023-12-10',
      readTime: '11 min read',
      tags: ['React', 'Hooks', 'Frontend', 'JavaScript'],
      category: 'Frontend Development',
      featured: false
    },
    {
      title: 'Database Design Best Practices',
      excerpt: 'Essential principles for designing efficient and scalable databases, covering normalization, indexing, and performance optimization.',
      date: '2023-12-05',
      readTime: '7 min read',
      tags: ['Database', 'SQL', 'Design', 'Performance'],
      category: 'Database',
      featured: false
    }
  ];

  const handleGoBack = () => {
    navigate('/');
  };

  const featuredBlogs = allBlogs.filter(blog => blog.featured);
  const regularBlogs = allBlogs.filter(blog => !blog.featured);

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
            All Blog Posts
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl">
            Insights, tutorials, and thoughts on programming, software development, and technology. 
            Sharing knowledge and experiences from my journey in the tech world.
          </p>
        </motion.div>

        {/* Featured Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span className="w-2 h-8 bg-primary-500 rounded-full mr-3"></span>
            Featured Posts
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card group cursor-pointer overflow-hidden border-2 border-primary-200 dark:border-primary-800"
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 flex items-center justify-center">
                    <div className="text-primary-500 text-6xl font-bold opacity-20">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary-500 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
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
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </motion.span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* All Posts */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center">
            <span className="w-2 h-8 bg-gray-500 rounded-full mr-3"></span>
            All Posts
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {regularBlogs.map((post, index) => (
              <motion.article
                key={post.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card group cursor-pointer overflow-hidden"
              >
                {/* Blog Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                    <div className="text-gray-400 text-6xl font-bold opacity-20">
                      {post.title.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-dark-800/90 text-xs font-medium text-gray-700 dark:text-gray-300 rounded-full">
                      {post.category}
                    </span>
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
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: tagIndex * 0.05 }}
                        className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                      >
                        <Tag className="w-3 h-3" />
                        <span>{tag}</span>
                      </motion.span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full text-xs">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        {/* External Blog Link */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <motion.a
            href="https://medium.com/@himansh"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center space-x-3 glass-card hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 text-lg font-medium"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <div className="text-gray-900 dark:text-white">Read More on Medium</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Follow for latest updates</div>
            </div>
            <ExternalLink className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
};

export default AllBlogs;