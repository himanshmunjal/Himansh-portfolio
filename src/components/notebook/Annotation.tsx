import React from 'react';

type Dir = 'left' | 'right' | 'down' | 'up-left' | 'down-left' | 'down-right';

// Hand-drawn arrows, one path each; drawn in on scroll via the `.draw` class (pathLength=1)
const ARROWS: Record<Dir, { d: string; head: string; w: number; h: number }> = {
  left: { d: 'M58 14 C 42 4, 22 6, 6 16', head: 'M14 8 L6 16 L16 20', w: 64, h: 28 },
  right: { d: 'M6 14 C 22 4, 42 6, 58 16', head: 'M50 8 L58 16 L48 20', w: 64, h: 28 },
  down: { d: 'M16 4 C 6 18, 8 34, 18 50', head: 'M10 44 L18 50 L22 41', w: 30, h: 56 },
  'up-left': { d: 'M56 40 C 40 38, 18 30, 8 8', head: 'M5 17 L8 8 L16 13', w: 62, h: 46 },
  'down-left': { d: 'M56 6 C 40 8, 16 18, 8 40', head: 'M4 31 L8 40 L15 33', w: 62, h: 46 },
  'down-right': { d: 'M6 6 C 22 8, 46 18, 54 40', head: 'M47 33 L54 40 L58 31', w: 62, h: 46 },
};

interface Props {
  children: React.ReactNode;
  dir?: Dir;
  className?: string;
  /** Arrow before or after the text */
  arrowFirst?: boolean;
  rotate?: number;
}

/** A handwritten margin note with a drawn arrow — decorative, hidden from screen readers */
const Annotation: React.FC<Props> = ({ children, dir = 'left', className = '', arrowFirst = true, rotate = -3 }) => {
  const a = ARROWS[dir];
  const arrow = (
    <svg width={a.w} height={a.h} viewBox={`0 0 ${a.w} ${a.h}`} fill="none" className="shrink-0 text-accent" aria-hidden="true">
      <path className="draw" pathLength={1} d={a.d} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d={a.head} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  const vertical = dir === 'down';
  return (
    <span
      aria-hidden="true"
      className={`hand pointer-events-none select-none inline-flex ${vertical ? 'flex-col items-start' : 'items-center'} gap-1 text-[1.4rem] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {arrowFirst && arrow}
      <span className="whitespace-nowrap">{children}</span>
      {!arrowFirst && arrow}
    </span>
  );
};

export default Annotation;
