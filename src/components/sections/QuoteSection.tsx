import React, { useState, useEffect } from 'react';
import { useInView } from '@/hooks/useInView';

const inspirationalQuotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke" },
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
];

const QuoteSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.3 });
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
        setOpacity(1);
      }, 500);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const currentQuote = inspirationalQuotes[currentQuoteIndex];

  return (
    <section className="py-20 relative overflow-hidden" ref={ref}>
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-pink-500/5" />
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />
        
        {/* Animated Particle Dots */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-cyan-400/40 animate-float" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 rounded-full bg-purple-500/30 animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-3/4 w-2 h-2 rounded-full bg-pink-500/35 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-cyan-400/30 animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto ${isInView ? 'animate-scale-in' : 'opacity-0'}`}>
          <div className="animated-gradient-border">
            <div className="glass-card p-12 md:p-16 rounded-xl text-center">
            <div
              className="transition-opacity duration-500"
              style={{ opacity }}
            >
              <blockquote className="text-2xl md:text-4xl font-light italic text-foreground/90 mb-6 leading-relaxed">
                "<span className="gradient-text-vibrant">{currentQuote.text}</span>"
              </blockquote>
              <cite className="text-lg gradient-text font-medium not-italic">
                — {currentQuote.author}
              </cite>
            </div>

              {/* Quote Indicator Dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {inspirationalQuotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setOpacity(0);
                      setTimeout(() => {
                        setCurrentQuoteIndex(index);
                        setOpacity(1);
                      }, 300);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? 'w-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500'
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to quote ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
