import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const [greeting, setGreeting] = useState('');
  const [currentRole, setCurrentRole] = useState(0);
  const [currentQuote, setCurrentQuote] = useState(0);

  const roles = [
    'Data Scientist',
    'Data Analyst', 
    'Full Stack Developer'
  ];

  const quotes = [
    "Data is the new oil, but analytics is the refinery.",
    "Code is poetry written in logic.",
    "Innovation distinguishes between a leader and a follower.",
    "The best way to predict the future is to create it.",
    "Simplicity is the ultimate sophistication."
  ];

  useEffect(() => {
    const updateGreeting = () => {
      const hour = new Date().getHours();
      if (hour < 12) setGreeting('Good Morning');
      else if (hour < 17) setGreeting('Good Afternoon');
      else if (hour < 21) setGreeting('Good Evening');
      else setGreeting('Good Night');
    };

    updateGreeting();
    const greetingInterval = setInterval(updateGreeting, 60000);

    return () => clearInterval(greetingInterval);
  }, []);

  useEffect(() => {
    const roleInterval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);

    return () => clearInterval(roleInterval);
  }, []);

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    return () => clearInterval(quoteInterval);
  }, []);

  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Greeting */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-lg text-gray-600 dark:text-gray-400 font-medium"
              >
                {greeting} 👋
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-xl text-gray-700 dark:text-gray-300"
              >
                Hi, my name is
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-5xl lg:text-7xl font-bold text-gradient"
              >
                Himansh Munjal
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="text-2xl lg:text-3xl font-semibold text-gray-800 dark:text-gray-200 h-12 flex items-center"
              >
                <motion.span
                  key={currentRole}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="typing-animation"
                >
                  {roles[currentRole]}
                </motion.span>
              </motion.div>
            </div>

            {/* Social Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex space-x-6"
            >
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 animate-glow"
              >
                <Github className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 glass rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300 animate-glow"
              >
                <Linkedin className="w-6 h-6" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Right Column - Rotating Quotes */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="flex items-center justify-center"
          >
            <div className="glass-card max-w-md text-center p-8">
              <motion.blockquote
                key={currentQuote}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-lg italic text-gray-700 dark:text-gray-300 leading-relaxed"
              >
                "{quotes[currentQuote]}"
              </motion.blockquote>
              <div className="mt-4 flex justify-center space-x-2">
                {quotes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentQuote 
                        ? 'bg-primary-500 w-8' 
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="p-2 glass rounded-full hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-300"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;