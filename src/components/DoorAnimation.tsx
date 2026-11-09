import React, { useState, useEffect } from 'react';

interface DoorAnimationProps {
  onComplete: () => void;
}

// Book-cloth texture for the cover boards
const cloth: React.CSSProperties = {
  backgroundColor: '#1f2a26',
  backgroundImage: `
    repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px),
    repeating-linear-gradient(90deg, rgba(0,0,0,0.12) 0 1px, transparent 1px 4px),
    radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.06), transparent 60%)`,
};

/** Intro: a lab notebook's cover swings open to reveal the site (click to skip) */
const DoorAnimation: React.FC<DoorAnimationProps> = ({ onComplete }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const openTimer = setTimeout(() => setIsOpening(true), 1400);
    const fadeTimer = setTimeout(() => setIsFading(true), 3000);
    const completeTimer = setTimeout(() => onComplete(), 3500);
    return () => {
      clearTimeout(openTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      role="presentation"
      onClick={onComplete}
      title="Click to skip"
      className={`fixed inset-0 z-50 cursor-pointer overflow-hidden transition-opacity duration-500 ${
        isFading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
      style={{ background: 'var(--paper)' }}
    >
      <div className="absolute inset-0 flex">
        {/* Left board */}
        <div
          className={`relative h-full w-1/2 shadow-[inset_-30px_0_40px_-30px_rgba(0,0,0,0.6)] ${isOpening ? 'animate-cover-left' : ''}`}
          style={cloth}
        >
          {/* Spine stitching */}
          <div className="absolute inset-y-0 right-0 w-3 border-r-2 border-dashed border-white/10" />
        </div>
        {/* Right board */}
        <div
          className={`relative h-full w-1/2 shadow-[inset_30px_0_40px_-30px_rgba(0,0,0,0.6)] ${isOpening ? 'animate-cover-right' : ''}`}
          style={cloth}
        >
          {/* Elastic band */}
          <div className="absolute inset-y-0 right-[14%] w-4 bg-[#b5441b] shadow-[2px_0_6px_rgba(0,0,0,0.4)]" />
        </div>
      </div>

      {/* Cover label plate */}
      <div
        className={`absolute left-1/2 top-1/2 z-10 w-[min(82vw,22rem)] -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
          isOpening ? 'scale-95 opacity-0' : 'opacity-100'
        }`}
      >
        <div className="rounded-[3px] border-[3px] border-double border-[#2a2620] bg-[#f4ecd6] px-6 py-6 text-[#1a1815] shadow-2xl">
          <p className="text-center font-mono text-[0.6rem] uppercase tracking-[0.3em] text-[#6f6a60]">Laboratory Notebook</p>
          <p className="serif mt-2 text-center text-5xl leading-none">HM</p>
          <div className="mt-5 space-y-2 font-mono text-[0.7rem]">
            {[
              ['Name', 'Himansh Munjal'],
              ['Subject', 'Data Science & Systems'],
              ['Volume', 'I'],
            ].map(([k, v]) => (
              <p key={k} className="flex items-end gap-2">
                <span className="uppercase tracking-wider text-[#6f6a60]">{k}</span>
                <span className="hand flex-1 border-b border-[#1a1815]/30 pb-0.5 text-xl leading-none" style={{ color: '#1a1815' }}>
                  {v}
                </span>
              </p>
            ))}
          </div>
        </div>
        <p className="mt-4 text-center font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/50">Click to open</p>
      </div>
    </div>
  );
};

export default DoorAnimation;
