import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, ArrowUp, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full" />
      </div>

      <div className="container-custom section-padding relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left - Social Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center space-x-6 mb-6 md:mb-0"
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300 text-gray-300 hover:text-white"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>

          {/* Center - Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-6 md:mb-0"
          >
            <p className="text-gray-400 mb-2">
              © {new Date().getFullYear()} All rights reserved
            </p>
            <p className="text-gray-500 flex items-center justify-center space-x-2">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-current" />
              </motion.div>
              <span>using React & Tailwind</span>
            </p>
          </motion.div>

          {/* Right - Back to Top */}
          <motion.button
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl group"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5 group-hover:animate-bounce" />
          </motion.button>
        </div>

        {/* Bottom Border */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 pt-8 border-t border-gray-800"
        >
          <div className="text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="text-gray-500 text-sm"
            >
              "Building the future, one line of code at a time."
            </motion.p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;