import React, { useEffect, useRef, useState } from 'react';

const inspirationalQuotes = [
  { text: 'The best way to predict the future is to invent it.', author: 'Alan Kay' },
  { text: 'Any sufficiently advanced technology is indistinguishable from magic.', author: 'Arthur C. Clarke' },
  { text: 'The only limit to our realization of tomorrow will be our doubts of today.', author: 'Franklin D. Roosevelt' },
];

/** Pinned epigraph — cycles through the quotes, pauses on hover/focus */
const QuoteSection: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const paused = useRef(false);
  const current = useRef(0);
  const swap = useRef<ReturnType<typeof setTimeout>>();

  const show = (next: number) => {
    current.current = next;
    setVisible(false);
    clearTimeout(swap.current);
    swap.current = setTimeout(() => {
      setIndex(next);
      setVisible(true);
    }, 400);
  };

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) show((current.current + 1) % inspirationalQuotes.length);
    }, 6500);
    return () => {
      clearInterval(id);
      clearTimeout(swap.current);
    };
  }, []);

  const q = inspirationalQuotes[index];

  return (
    <section className="relative py-20 sm:py-28" aria-label="Quotes">
      <div className="wrap">
        <figure
          className="note-paper tape reveal-tilt relative mx-auto max-w-3xl px-8 pb-10 pt-12 sm:px-14 sm:pb-12 sm:pt-14"
          style={{ ['--tilt' as string]: '-1deg', transform: 'rotate(-1deg)' }}
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onFocus={() => (paused.current = true)}
          onBlur={() => (paused.current = false)}
        >
          <span aria-hidden="true" className="serif absolute left-5 top-0 text-[7rem] leading-none text-accent opacity-60">“</span>
          <blockquote
            className="serif min-h-[7.5rem] text-[1.9rem] leading-[1.15] text-ink transition-all duration-500 sm:text-[2.6rem]"
            style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(6px)' }}
            aria-live="polite"
          >
            {q.text}
          </blockquote>
          <figcaption className="mt-6 flex items-center justify-between gap-4">
            <span className="hand text-3xl" style={{ opacity: visible ? 1 : 0, transition: 'opacity .5s' }}>— {q.author}</span>
            <span className="flex gap-2">
              {inspirationalQuotes.map((item, i) => (
                <button
                  key={item.author}
                  type="button"
                  onClick={() => show(i)}
                  aria-label={`Show quote by ${item.author}`}
                  aria-pressed={i === index}
                  className={`h-2.5 rounded-full transition-all ${i === index ? 'w-7 bg-[var(--accent)]' : 'w-2.5 bg-[var(--rule-strong)] hover:bg-[var(--ink-3)]'}`}
                />
              ))}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default QuoteSection;
