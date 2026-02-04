import React, { useState, useEffect } from 'react';

interface DoorAnimationProps {
  onComplete: () => void;
}

const DoorAnimation: React.FC<DoorAnimationProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 500);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2000);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-500 bg-background ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Door Container */}
      <div className="relative w-full h-full flex">
        {/* Left Door */}
        <div
          className={`door-left w-1/2 h-full relative bg-card border-r border-primary/30 ${isOpening ? 'animate-door-left' : ''}`}
        >
          {/* Door Texture */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              hsl(var(--primary) / 0.03) 20px,
              hsl(var(--primary) / 0.03) 21px
            )`
          }} />
          
          {/* Door Handle */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2">
            <div className="w-3 h-16 rounded-full bg-primary/50 shadow-lg shadow-primary/20" />
          </div>
        </div>

        {/* Right Door */}
        <div
          className={`door-right w-1/2 h-full relative bg-card border-l border-primary/30 ${isOpening ? 'animate-door-right' : ''}`}
        >
          {/* Door Texture */}
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 20px,
              hsl(var(--primary) / 0.03) 20px,
              hsl(var(--primary) / 0.03) 21px
            )`
          }} />
          
          {/* Door Handle */}
          <div className="absolute left-8 top-1/2 -translate-y-1/2">
            <div className="w-3 h-16 rounded-full bg-primary/50 shadow-lg shadow-primary/20" />
          </div>
        </div>

        {/* Center Logo */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-300 ${isOpening ? 'opacity-0' : 'opacity-100'}`}>
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 blur-2xl bg-primary/30 rounded-full scale-150" />
            
            {/* Logo */}
            <div className="relative glass-card p-8 rounded-2xl">
              <span className="text-6xl font-bold gradient-text">HM</span>
            </div>
          </div>
        </div>

        {/* Decorative Light Beams */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-transparent to-primary/20" />
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20" />
        </div>
      </div>
    </div>
  );
};

export default DoorAnimation;
