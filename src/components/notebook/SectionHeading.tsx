import React from 'react';

interface Props {
  n: string;
  title: React.ReactNode;
  kicker?: string;
  /** Handwritten margin note */
  note?: string;
  children?: React.ReactNode;
  center?: boolean;
}

/** Notebook section opener: "§ 03 · Kicker", big serif title, optional handwritten aside */
const SectionHeading: React.FC<Props> = ({ n, title, kicker, note, children, center }) => (
  <header className={`reveal relative mb-12 sm:mb-16 ${center ? 'text-center' : ''}`}>
    <p className={`eyebrow flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
      <span className="accent">§ {n}</span>
      {kicker && (
        <>
          <span className="h-px w-8 bg-[var(--rule-strong)]" aria-hidden="true" />
          <span>{kicker}</span>
        </>
      )}
    </p>
    <h2 className="serif mt-3 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h2>
    {note && (
      <p className={`hand mt-2 text-2xl sm:text-[1.7rem] ${center ? '' : 'sm:-rotate-1'}`}>{note}</p>
    )}
    {children && <div className={`mt-5 max-w-[60ch] text-[1.0625rem] leading-relaxed ${center ? 'mx-auto' : ''}`}>{children}</div>}
  </header>
);

export default SectionHeading;
