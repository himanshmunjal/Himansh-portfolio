import React, { useEffect, useMemo, useState } from 'react';

// Live from the public GitHub events API (no token; 60 req/h per visitor, so results are
// cached for the session). The API only covers ~90 days, which is why the grid shows 12 weeks.

const WEEKS = 12;
const CACHE_KEY = 'gh-events-v1';
const CACHE_MS = 15 * 60 * 1000;

interface GhEvent {
  type: string;
  created_at: string;
  repo: { name: string };
}

const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

async function fetchEvents(user: string): Promise<GhEvent[]> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null');
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.events;
  } catch {
    /* storage unavailable — just fetch */
  }

  const events: GhEvent[] = [];
  for (let page = 1; page <= 3; page++) {
    const res = await fetch(`https://api.github.com/users/${user}/events/public?per_page=100&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json' },
    });
    if (!res.ok) throw new Error(String(res.status));
    const batch: GhEvent[] = await res.json();
    events.push(...batch.map(({ type, created_at, repo }) => ({ type, created_at, repo: { name: repo.name } })));
    if (batch.length < 100) break;
  }

  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), events }));
  } catch {
    /* ignore */
  }
  return events;
}

const relative = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 60) return `${Math.max(mins, 1)} min ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs} h ago`;
  const days = Math.round(hrs / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
};

// Sequential: one hue (the accent), light → dark, with an empty step that's just the rule colour
const level = (n: number) => (n === 0 ? 0 : n === 1 ? 1 : n <= 3 ? 2 : n <= 6 ? 3 : 4);
const LEVEL_FILL = [
  'var(--rule)',
  'color-mix(in srgb, var(--accent-mark) 30%, var(--paper))',
  'color-mix(in srgb, var(--accent-mark) 55%, var(--paper))',
  'color-mix(in srgb, var(--accent-mark) 80%, var(--paper))',
  'var(--accent-mark)',
];

const GitHubActivity: React.FC<{ user: string }> = ({ user }) => {
  const [events, setEvents] = useState<GhEvent[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [hover, setHover] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetchEvents(user)
      .then((e) => alive && setEvents(e))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [user]);

  // Columns are weeks (oldest → newest), rows are weekdays Sun → Sat
  const { days, total } = useMemo(() => {
    const counts = new Map<string, number>();
    events?.forEach((e) => {
      const k = dayKey(new Date(e.created_at));
      counts.set(k, (counts.get(k) ?? 0) + 1);
    });
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const start = new Date(today);
    start.setDate(today.getDate() - today.getDay() - (WEEKS - 1) * 7);

    const out: { date: Date; count: number; future: boolean }[] = [];
    let sum = 0;
    for (let i = 0; i < WEEKS * 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      const count = counts.get(dayKey(d)) ?? 0;
      sum += count;
      out.push({ date: d, count, future: d > today });
    }
    return { days: out, total: sum };
  }, [events]);

  const latestPush = events?.find((e) => e.type === 'PushEvent');
  const fmt = (d: Date) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });

  if (failed) {
    return (
      <p className="meta">
        GitHub activity is unavailable right now.{' '}
        <a className="link" href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer">
          See the profile ↗
        </a>
      </p>
    );
  }

  return (
    <figure aria-busy={!events}>
      <figcaption className="meta mb-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span>
          <span className="accent">●</span> live · public GitHub events, last {WEEKS} weeks
        </span>
        {events && <span className="whitespace-nowrap text-ink">{total} events</span>}
      </figcaption>

      <div
        role="img"
        aria-label={events ? `${total} public GitHub events in the last ${WEEKS} weeks` : 'Loading GitHub activity'}
        className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${WEEKS}, 0.8rem)`, gridTemplateRows: 'repeat(7, 0.8rem)' }}
        onMouseLeave={() => setHover(null)}
      >
        {days.map(({ date, count, future }) => (
          <span
            key={date.toISOString()}
            onMouseEnter={() => setHover(`${fmt(date)} · ${count} event${count === 1 ? '' : 's'}`)}
            className="rounded-[2px] transition-colors duration-500"
            style={{
              background: future ? 'transparent' : events ? LEVEL_FILL[level(count)] : 'var(--rule)',
              opacity: events ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      <div className="meta mt-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <span aria-live="polite" className="truncate">
          {hover ??
            (latestPush
              ? `last push → ${latestPush.repo.name.split('/')[1]} · ${relative(latestPush.created_at)}`
              : ' ')}
        </span>
        <span className="flex shrink-0 items-center gap-1" aria-hidden="true">
          less
          {LEVEL_FILL.map((f) => (
            <span key={f} className="inline-block h-2 w-2 rounded-[1px]" style={{ background: f }} />
          ))}
          more
        </span>
      </div>
    </figure>
  );
};

export default GitHubActivity;
