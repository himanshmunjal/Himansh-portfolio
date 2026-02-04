import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const QuoteSection: React.FC = () => {
  return (
    <section className="section-padding bg-gradient-to-r from-primary-500 to-primary-600 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-24 h-24 border border-white rounded-full" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-white rounded-full" />
      </div>

      <div className="container-custom relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
              <Quote className="w-12 h-12 text-white" />
            </div>
          </motion.div>

          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-2xl lg:text-4xl font-light text-white leading-relaxed mb-8"
          >
            "The future belongs to those who understand that{' '}
            <span className="font-semibold">data is not just numbers</span>, but stories waiting to be told, 
            and <span className="font-semibold">code is not just logic</span>, but the bridge between imagination and reality."
          </motion.blockquote>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="text-white/80 text-lg"
          >
            — Himansh Munjal
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default QuoteSection;