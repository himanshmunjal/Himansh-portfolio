import React from 'react';

type Variant = 'pulse' | 'dashed' | 'particles' | 'beam';

/** Notebook-style breaks between sections — all decorative */
const SectionDivider: React.FC<{ variant?: Variant }> = ({ variant = 'dashed' }) => {
  if (variant === 'pulse') {
    // Hand-drawn squiggle
    return (
      <div className="wrap py-2" aria-hidden="true">
        <svg viewBox="0 0 600 24" preserveAspectRatio="none" className="h-6 w-full text-[var(--rule-strong)]">
          <path
            className="draw"
            pathLength={1}
            d="M2 12 C 40 2, 60 22, 100 12 S 160 2, 200 12 S 260 22, 300 12 S 360 2, 400 12 S 460 22, 500 12 S 560 2, 598 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (variant === 'particles') {
    // Asterism
    return (
      <div className="wrap flex items-center justify-center gap-6 py-4 text-accent" aria-hidden="true">
        <span className="h-px flex-1 bg-[var(--rule)]" />
        <span className="serif text-2xl tracking-[0.6em]">✳✳✳</span>
        <span className="h-px flex-1 bg-[var(--rule)]" />
      </div>
    );
  }

  if (variant === 'beam') {
    // Perforated page edge
    return (
      <div className="wrap py-4" aria-hidden="true">
        <div
          className="h-3 w-full"
          style={{
            backgroundImage: 'radial-gradient(circle, var(--rule-strong) 2.5px, transparent 3px)',
            backgroundSize: '18px 12px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-x',
          }}
        />
      </div>
    );
  }

  // Cut here
  return (
    <div className="wrap flex items-center gap-3 py-4 text-ink-3" aria-hidden="true">
      <span className="text-lg">✂</span>
      <span className="h-0 flex-1 border-t-2 border-dashed rule" />
      <span className="hand text-xl">cut here</span>
    </div>
  );
};

export default SectionDivider;
