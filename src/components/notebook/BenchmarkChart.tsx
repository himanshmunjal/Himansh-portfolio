import React, { useState } from 'react';
import type { BenchPanel } from '@/data/benchmarks';

// Two measures on different scales → separate small panels, never a shared axis.
// Every bar carries its value as a direct label; the hover/focus line adds the comparison.

const Panel: React.FC<{ panel: BenchPanel }> = ({ panel }) => {
  const [active, setActive] = useState<number | null>(null);
  const base = panel.rows.find((r) => !r.highlight);

  const describe = (i: number) => {
    const row = panel.rows[i];
    if (!base || row === base) return `${row.label}: ${panel.format(row.value)} (baseline)`;
    const ratio = row.value / base.value;
    const diff = panel.unit === '%' ? `+${row.value - base.value} pts` : `${ratio.toFixed(1)}×`;
    return `${row.label}: ${panel.format(row.value)}, ${diff} vs ${base.label}`;
  };

  return (
    <figure className="min-w-0">
      <figcaption className="mb-4 text-sm text-ink">{panel.title}</figcaption>

      <div className="space-y-2.5" onMouseLeave={() => setActive(null)}>
        {panel.rows.map((row, i) => {
          const pct = (row.value / panel.max) * 100;
          return (
            <div
              key={row.label}
              tabIndex={0}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              aria-label={describe(i)}
              className="grid grid-cols-[6.5rem_1fr] items-center gap-3 py-0.5 outline-offset-2 cursor-default"
            >
              <span className={`meta ${row.highlight ? 'text-ink' : ''}`}>{row.label}</span>
              <div className="relative h-4">
                {/* faint track marks the scale max */}
                <div className="absolute inset-y-0 left-0 right-0 border-l rule" />
                <div
                  className="bar-grow absolute inset-y-0 left-0 rounded-r-[4px] transition-opacity"
                  style={{
                    width: `${pct}%`,
                    background: row.highlight ? 'var(--accent-mark)' : 'var(--baseline-mark)',
                    opacity: active === null || active === i ? 1 : 0.45,
                  }}
                />
                {/* Long bars hold their label inside so it never runs off the panel */}
                <span
                  className="meta absolute top-1/2 -translate-y-1/2 px-2 whitespace-nowrap"
                  style={
                    pct > 80
                      ? { right: `${100 - pct}%`, color: 'var(--paper)' }
                      : { left: `${pct}%`, color: 'var(--ink)' }
                  }
                >
                  {panel.format(row.value)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Scale: 0 … max */}
      <div className="mt-2 grid grid-cols-[6.5rem_1fr] gap-3">
        <span />
        <div className="meta flex justify-between text-[0.625rem]">
          <span>0</span>
          <span>{panel.format(panel.max)}</span>
        </div>
      </div>

      <p className="meta mt-3 min-h-[1.25rem]" aria-live="polite">
        {active !== null ? describe(active) : ' '}
      </p>

      <table className="sr-only">
        <caption>{panel.title}</caption>
        <thead>
          <tr><th scope="col">Variant</th><th scope="col">{panel.unit}</th></tr>
        </thead>
        <tbody>
          {panel.rows.map((r) => (
            <tr key={r.label}><th scope="row">{r.label}</th><td>{r.value}</td></tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
};

const BenchmarkChart: React.FC<{ panels: BenchPanel[]; source: string; fig?: string }> = ({ panels, source, fig = 'Fig. 1' }) => (
  <div className="sheet tape relative p-5 pt-7 sm:p-7 sm:pt-9">
    <p className="eyebrow mb-5">
      <span className="accent">{fig}</span> · JMH benchmark results
    </p>
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
      {panels.map((p) => (
        <Panel key={p.title} panel={p} />
      ))}
    </div>
    <p className="meta mt-4 border-t border-dashed rule pt-3">{source}</p>
  </div>
);

export default BenchmarkChart;
