import React from 'react';
import { technologies } from '@/data/technologies';

const groups: Record<string, { label: string; color: string }> = {
  lang: { label: 'Languages', color: 'var(--accent)' },
  ml: { label: 'ML & AI', color: 'var(--c-violet)' },
  data: { label: 'Data', color: 'var(--c-teal)' },
  viz: { label: 'Visualisation', color: 'var(--c-gold)' },
  web: { label: 'Web & APIs', color: 'var(--c-blue)' },
  tools: { label: 'Tooling', color: 'var(--c-green)' },
};

const TechStrip: React.FC = () => (
  <section id="toolkit" className="relative scroll-mt-16 py-16 sm:py-20" aria-labelledby="toolkit-title">
    <div className="wrap">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow"><span className="accent">Fig. 3</span> · The toolkit</p>
          <h2 id="toolkit-title" className="serif mt-2 text-4xl sm:text-5xl">A periodic table of tools</h2>
        </div>
        <ul className="flex flex-wrap gap-x-4 gap-y-1">
          {Object.entries(groups).map(([k, g]) => (
            <li key={k} className="meta flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-[2px]" style={{ background: g.color }} />
              {g.label}
            </li>
          ))}
        </ul>
      </div>

      <ol className="grid grid-cols-3 gap-1.5 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-9">
        {technologies.map((tech, i) => {
          const g = groups[tech.group];
          return (
          <li
            key={tech.name}
            className="reveal group relative aspect-square border border-t-[3px] p-2 transition-all duration-200 hover:z-10 hover:-translate-y-1 hover:shadow-[var(--shadow)]"
            style={{
              borderColor: `color-mix(in srgb, ${g.color} 35%, var(--rule))`,
              borderTopColor: g.color,
              background: `color-mix(in srgb, ${g.color} 7%, var(--card))`,
            }}
            title={`${tech.name} · ${g.label}`}
          >
            <span className="meta flex justify-between text-[0.6rem]">
              <span>{i + 1}</span>
              <span aria-hidden="true" className="opacity-70 grayscale transition group-hover:opacity-100 group-hover:grayscale-0">{tech.icon}</span>
            </span>
            <span className="serif mt-1 block text-center text-[2rem] leading-none transition-colors sm:text-[2.2rem]" style={{ color: g.color }}>
              {tech.sym}
            </span>
            <span className="absolute inset-x-1 bottom-1.5 truncate text-center text-[0.6875rem] text-ink-2">{tech.name}</span>
            <span className="sr-only">, {g.label}</span>
          </li>
          );
        })}
      </ol>
    </div>
  </section>
);

export default TechStrip;
