import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { expNo, projectPath, shortTitle, type Project } from '@/data/projects';
import { projectDoc } from '@/data/projectDocs';

/**
 * A link to another entry that, on hover or keyboard focus, shows a small index card
 * with its intro — so readers can check where a cross-reference goes before following it.
 * Touch devices never fire the hover, so on phones it's a plain link.
 */
const ProjectPeek: React.FC<{ project: Project; className?: string; children?: React.ReactNode }> = ({ project, className = '', children }) => {
  const [open, setOpen] = useState(false);
  const timer = useRef<number>();
  const doc = projectDoc(project);

  const show = () => {
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setOpen(true), 350);
  };
  const hide = () => {
    window.clearTimeout(timer.current);
    setOpen(false);
  };
  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <span className="relative inline-block max-w-full" onMouseEnter={show} onMouseLeave={hide}>
      <Link to={projectPath(project)} viewTransition className={className} onFocus={show} onBlur={hide} onClick={hide}>
        {children ?? shortTitle(project.title)}
      </Link>
      {open && (
        <span
          role="tooltip"
          className="index-card animate-fade-up pointer-events-none absolute left-0 top-full z-30 mt-2 hidden w-[19rem] p-4 pt-0 text-left md:block"
        >
          <span className="eyebrow flex h-[2.6rem] items-center justify-between gap-2">
            <span className="truncate"><span className="accent">{expNo(project.id)}</span> · {project.category}</span>
            <span className="meta shrink-0">{project.ongoing ? 'in progress' : 'complete'}</span>
          </span>
          <span className="serif mt-3 block text-2xl leading-tight text-ink">{shortTitle(project.title)}</span>
          <span className="mt-2 block text-sm leading-relaxed text-ink-2">{doc.intro}</span>
        </span>
      )}
    </span>
  );
};

export default ProjectPeek;
