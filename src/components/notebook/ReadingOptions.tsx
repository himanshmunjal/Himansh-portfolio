import React from 'react';
import { useTheme, type Paper, type TextSize } from '@/contexts/ThemeContext';

const PAPERS: { value: Paper; label: string; swatch: string }[] = [
  { value: 'graph', label: 'Graph', swatch: 'linear-gradient(var(--rule-strong) 1px, transparent 1px) 0 0 / 6px 6px, linear-gradient(90deg, var(--rule-strong) 1px, transparent 1px) 0 0 / 6px 6px' },
  { value: 'dots', label: 'Dots', swatch: 'radial-gradient(var(--ink-3) 0.8px, transparent 1.1px) 0 0 / 6px 6px' },
  { value: 'ruled', label: 'Ruled', swatch: 'repeating-linear-gradient(to bottom, transparent 0 5px, var(--rule-strong) 5px 6px)' },
  { value: 'plain', label: 'Plain', swatch: 'none' },
];

const SIZES: { value: TextSize; label: string; px: string }[] = [
  { value: 'sm', label: 'Small', px: '0.8rem' },
  { value: 'md', label: 'Standard', px: '0.95rem' },
  { value: 'lg', label: 'Large', px: '1.15rem' },
];

const Group: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <fieldset>
    <legend className="eyebrow mb-2">{label}</legend>
    <div className="grid grid-cols-4 gap-1.5">{children}</div>
  </fieldset>
);

const Option: React.FC<{ on: boolean; onClick: () => void; label: string; children: React.ReactNode; span?: number }> = ({
  on,
  onClick,
  label,
  children,
  span = 1,
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={on}
    aria-label={label}
    title={label}
    className={`flex flex-col items-center gap-1 rounded-[3px] border px-1 py-1.5 transition-colors ${
      on ? 'border-[var(--accent)] text-ink' : 'rule text-ink-3 hover:text-ink'
    }`}
    style={{ gridColumn: `span ${span}` }}
  >
    {children}
  </button>
);

/** Paper, ink and text-size settings for the notebook. Saved per visitor. */
const ReadingOptions: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme, paper, setPaper, textSize, setTextSize } = useTheme();

  return (
    <div className={`space-y-5 ${className}`}>
      <Group label="Paper">
        {PAPERS.map((p) => (
          <Option key={p.value} on={paper === p.value} onClick={() => setPaper(p.value)} label={`${p.label} paper`}>
            <span aria-hidden="true" className="h-6 w-full rounded-[2px] border rule bg-card" style={{ background: `${p.swatch}, var(--card)` }} />
            <span className="meta text-[0.625rem]">{p.label}</span>
          </Option>
        ))}
      </Group>

      <Group label="Ink">
        {(['dark', 'light'] as const).map((t) => (
          <Option key={t} on={theme === t} onClick={() => setTheme(t)} label={t === 'dark' ? 'Charcoal page, light ink' : 'Cream page, dark ink'} span={2}>
            <span className="meta text-[0.6875rem]">{t === 'dark' ? 'Charcoal' : 'Cream'}</span>
          </Option>
        ))}
      </Group>

      <Group label="Text">
        {SIZES.map((s) => (
          <Option key={s.value} on={textSize === s.value} onClick={() => setTextSize(s.value)} label={`${s.label} text`}>
            <span className="serif leading-none" style={{ fontSize: s.px }} aria-hidden="true">Aa</span>
          </Option>
        ))}
      </Group>
    </div>
  );
};

export default ReadingOptions;
