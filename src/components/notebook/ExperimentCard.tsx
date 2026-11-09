import React from 'react';
import { Link } from 'react-router-dom';
import { Github, ArrowRight } from 'lucide-react';
import { expNo, projectPath, shortTitle, type Project } from '@/data/projects';
import { projectDoc } from '@/data/projectDocs';

export const StatusStamp: React.FC<{ ongoing?: boolean }> = ({ ongoing }) => (
  <span className={`stamp ${ongoing ? '' : 'stamp-ink'}`}>{ongoing ? 'In progress' : 'Complete'}</span>
);

export const Metrics: React.FC<{ metrics?: Project['metrics']; size?: 'lg' | 'md' }> = ({ metrics, size = 'md' }) =>
  metrics?.length ? (
    <dl className={`grid gap-x-6 gap-y-4 ${metrics.length > 2 ? 'grid-cols-3' : 'grid-cols-2'}`}>
      {metrics.map((m) => (
        <div key={m.label} className="flex flex-col border-t-2 border-[var(--ink)] pt-2">
          <dt className="meta order-2 mt-1 leading-tight">{m.label}</dt>
          <dd className={`serif order-1 leading-none text-ink ${size === 'lg' ? 'text-5xl sm:text-6xl' : 'text-4xl'}`}>{m.value}</dd>
        </div>
      ))}
    </dl>
  ) : null;

export const ProjectLinks: React.FC<{ project: Project }> = ({ project }) => (
  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
    <a href={project.link} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1.5">
      <Github className="h-4 w-4" /> Source ↗
    </a>
    {project.writeup && (
      <Link to={`/blog/${project.writeup}`} viewTransition className="link inline-flex items-center gap-1.5">
        Read the write-up <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    )}
  </div>
);

/** Shared with the project page's <h1>, so the title glides into place when an entry opens */
export const projectTitleTransition = (id: number): React.CSSProperties => ({ viewTransitionName: `exp-${id}` });

/** Index card for one project: the intro line from its .md, headline numbers, and the stack. Opens /project/:slug. */
const ExperimentCard: React.FC<{ project: Project; tilt?: number }> = ({ project, tilt = 0 }) => {
  const { intro } = projectDoc(project);
  const shown = project.tech.slice(0, 6);
  return (
    <article
      id={expNo(project.id).toLowerCase()}
      className="index-card reveal group relative flex h-full min-w-0 scroll-mt-24 flex-col p-6 pt-0 transition-transform duration-300 hover:-translate-y-1"
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined }}
    >
      <header className="flex h-[2.6rem] items-center justify-between gap-3">
        <p className="eyebrow truncate">
          <span className="accent">{expNo(project.id)}</span> · {project.category}
        </p>
        <StatusStamp ongoing={project.ongoing} />
      </header>

      <h3 className="serif mt-5 text-[1.85rem] leading-[1.08]">
        {/* Stretched link: the whole card opens the entry */}
        <Link
          to={projectPath(project)}
          viewTransition
          className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
          style={projectTitleTransition(project.id)}
        >
          {shortTitle(project.title)}
        </Link>
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{intro}</p>

      {project.metrics && (
        <div className="mt-5">
          <Metrics metrics={project.metrics} />
        </div>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {shown.map((t) => (
          <li key={t} className="tag">{t}</li>
        ))}
        {project.tech.length > shown.length && <li className="tag">+{project.tech.length - shown.length}</li>}
      </ul>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-ink">
          Open the entry <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
        <a href={project.link} target="_blank" rel="noopener noreferrer" className="link relative z-10 inline-flex items-center gap-1.5">
          <Github className="h-4 w-4" /> Source ↗
        </a>
      </div>
    </article>
  );
};

export default ExperimentCard;
