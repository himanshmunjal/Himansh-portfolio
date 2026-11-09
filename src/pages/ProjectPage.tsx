import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLoaderData, useNavigate, type LoaderFunctionArgs } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, Maximize2, X } from 'lucide-react';
import SEO from '@/components/common/SEO';
import ReadingOptions from '@/components/notebook/ReadingOptions';
import ProjectPeek from '@/components/notebook/ProjectPeek';
import { Metrics, StatusStamp, projectTitleTransition } from '@/components/notebook/ExperimentCard';
import { allProjects, expNo, findProject, projectPath, shortTitle, type Project } from '@/data/projects';
import { alsoUsedIn, projectDoc, relatedProjects, type DocSection, type ProjectDoc } from '@/data/projectDocs';
import { allBlogs } from '@/data/blogs';
import { parseMarkdown } from '@/lib/markdown';

export function loader({ params }: LoaderFunctionArgs): Project {
  const project = findProject(params.slug ?? '');
  if (!project) throw new Response('Not found', { status: 404 });
  return project;
}

const ARCH = 'architecture';
const pageNo = (id: number) => String(id).padStart(2, '0');

/** Sections in reading order, with the Architecture section guaranteed to exist for the diagram */
function withArchitecture(doc: ProjectDoc): DocSection[] {
  if (doc.sections.some((s) => s.id === ARCH)) return doc.sections;
  const arch = { id: ARCH, title: 'Architecture', md: '' };
  return doc.sections.length ? [doc.sections[0], arch, ...doc.sections.slice(1)] : [arch];
}

// Which section is being read — drives the highlight in the contents rail
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-15% 0px -75% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

/* ─────────────────────────── Pieces ─────────────────────────── */

const Contents: React.FC<{ sections: DocSection[]; active?: string; onPick?: () => void }> = ({ sections, active, onPick }) => (
  <ol className="space-y-0.5 border-l rule">
    <li>
      <a href="#top" onClick={onPick} className="-ml-px block border-l-2 border-transparent py-1 pl-3 text-sm text-ink-3 hover:text-ink">
        (Top)
      </a>
    </li>
    {sections.map((s, i) => {
      const on = active === s.id;
      return (
        <li key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={onPick}
            aria-current={on ? 'location' : undefined}
            className={`-ml-px grid grid-cols-[1.5rem_1fr] border-l-2 py-1 pl-3 text-sm leading-snug transition-colors ${
              on ? 'border-[var(--accent)] text-ink' : 'border-transparent text-ink-3 hover:text-ink'
            }`}
          >
            <span className={`meta pt-[0.1rem] ${on ? 'accent' : ''}`}>{i + 1}</span>
            <span>{s.title}</span>
          </a>
        </li>
      );
    })}
  </ol>
);

/** The architecture PNG, pinned to the page; opens full-size in a dialog */
const DiagramFigure: React.FC<{ project: Project; doc: ProjectDoc }> = ({ project, doc }) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const alt = `Architecture diagram of ${shortTitle(project.title)}${doc.caption ? `. ${doc.caption}` : ''}`;

  if (!doc.diagram) {
    return (
      <figure className="sheet my-8 grid min-h-[15rem] place-items-center border-dashed p-8 text-center">
        <div>
          <p className="eyebrow"><span className="accent">Fig. 1</span> · Architecture</p>
          <p className="hand mt-3 text-3xl">diagram still on the drawing board</p>
          <p className="meta mt-2">This space is kept for the system sketch.</p>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <button
        type="button"
        onClick={() => dialog.current?.showModal()}
        className="group sheet tape relative block w-full cursor-zoom-in p-3 sm:p-4"
        aria-label="Open the diagram full size"
      >
        <img src={doc.diagram} alt={alt} width={1600} height={900} loading="lazy" decoding="async" className="mx-auto h-auto max-h-[34rem] w-auto max-w-full object-contain" />
        <span className="meta absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-[3px] border rule bg-card px-2 py-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-3 w-3" /> enlarge
        </span>
      </button>
      <figcaption className="mt-3 text-[0.9375rem] text-ink-3">
        <span className="meta accent mr-2">Fig. 1.</span>
        {doc.caption ?? `System architecture of ${shortTitle(project.title)}.`}
      </figcaption>

      <dialog
        ref={dialog}
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        className="m-auto max-h-[92vh] w-[min(96vw,80rem)] rounded-[3px] border rule bg-card p-0 text-ink-2 shadow-[var(--shadow)] backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4 border-b rule px-4 py-2">
          <p className="eyebrow"><span className="accent">Fig. 1</span> · {shortTitle(project.title)} architecture</p>
          <button type="button" onClick={() => dialog.current?.close()} className="grid h-8 w-8 place-items-center text-ink-3 hover:text-ink" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="overflow-auto p-4">
          {/* Full-resolution PNG; lazy, so it only downloads when the dialog is opened */}
          <img src={doc.diagramFull ?? doc.diagram} alt={alt} width={1600} height={900} loading="lazy" decoding="async" className="mx-auto h-auto max-w-none sm:max-w-full" />
        </div>
      </dialog>
    </figure>
  );
};

/** The specimen card: Wikipedia's infobox, re-cut as a lab data sheet */
const DataSheet: React.FC<{ project: Project; doc: ProjectDoc }> = ({ project, doc }) => {
  const writeup = allBlogs.find((b) => b.slug === project.writeup);
  const row = 'grid grid-cols-[5.5rem_1fr] gap-3 border-t border-dashed rule py-2.5';
  return (
    <aside className="index-card p-5 pt-0 text-sm" aria-label="Data sheet">
      <div className="flex h-[2.6rem] items-center justify-between gap-3">
        <p className="eyebrow"><span className="accent">Data sheet</span> · {expNo(project.id)}</p>
      </div>

      {doc.diagram && (
        <a href={`#${ARCH}`} className="mt-4 block border rule bg-paper p-1.5 transition-colors hover:border-[var(--accent)]" title="Jump to the diagram">
          <img src={doc.diagram} alt="" width={400} height={300} loading="lazy" decoding="async" className="aspect-[4/3] h-auto w-full object-contain" />
        </a>
      )}

      <dl className="mt-4">
        <div className={row}>
          <dt className="meta">Status</dt>
          <dd><StatusStamp ongoing={project.ongoing} /></dd>
        </div>
        <div className={row}>
          <dt className="meta">Field</dt>
          <dd className="text-ink">{project.category}</dd>
        </div>
        <div className={row}>
          <dt className="meta">Entry</dt>
          <dd className="text-ink">{project.id} of {allProjects.length}</dd>
        </div>
        <div className={row}>
          <dt className="meta">Stack</dt>
          <dd>
            <ul className="flex flex-wrap gap-1">
              {project.tech.map((t) => <li key={t} className="tag">{t}</li>)}
            </ul>
          </dd>
        </div>
        <div className={row}>
          <dt className="meta">Source</dt>
          <dd>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="link inline-flex items-center gap-1 break-all">
              <Github className="h-3.5 w-3.5 shrink-0" /> {project.link.replace('https://github.com/', '')} ↗
            </a>
          </dd>
        </div>
        {writeup && (
          <div className={row}>
            <dt className="meta">Write-up</dt>
            <dd><Link to={`/blog/${writeup.slug}`} viewTransition className="link">{writeup.title}</Link></dd>
          </div>
        )}
      </dl>

      {project.metrics && (
        <div className="mt-2 border-t border-dashed rule pt-4">
          <p className="eyebrow mb-3">Measured</p>
          <dl className="space-y-3">
            {project.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline gap-3">
                <dd className="serif w-20 shrink-0 text-3xl leading-none text-ink">{m.value}</dd>
                <dt className="meta leading-tight">{m.label}</dt>
              </div>
            ))}
          </dl>
        </div>
      )}
    </aside>
  );
};

/** Each material, and the other entries it also turns up in */
const Materials: React.FC<{ project: Project }> = ({ project }) => (
  <section aria-labelledby="materials" className="mt-20">
    <p className="eyebrow"><span className="accent">Appendix A</span></p>
    <h2 id="materials" className="serif mt-1 text-[2rem] leading-tight">Materials, and where else they appear</h2>
    <div className="table-wrap mt-6">
      <table className="w-full text-sm">
        <thead>
          <tr>
            <th className="w-[38%]">Material</th>
            <th>Also used in</th>
          </tr>
        </thead>
        <tbody>
          {project.tech.map((t) => {
            const others = alsoUsedIn(project, t);
            return (
              <tr key={t}>
                <td className="text-ink">{t}</td>
                <td>
                  {others.length ? (
                    <span className="flex flex-wrap gap-x-3 gap-y-1">
                      {others.map((o) => (
                        <ProjectPeek key={o.id} project={o} className="link">
                          <span className="meta accent mr-1">{expNo(o.id)}</span>
                          {shortTitle(o.title)}
                        </ProjectPeek>
                      ))}
                    </span>
                  ) : (
                    <span className="meta">only here</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </section>
);

const today = () => new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

/** Lab notebooks end each entry with a signature and a witness */
const SignOff: React.FC<{ project: Project }> = ({ project }) => (
  <div className="mt-20 grid gap-6 border-t-2 border-[var(--ink)] pt-5 sm:grid-cols-3">
    <div>
      <p className="eyebrow">Recorded by</p>
      <p className="hand mt-1 border-b rule pb-1 text-3xl" style={{ color: 'var(--ink)' }}>H. Munjal</p>
    </div>
    <div>
      <p className="eyebrow">Status</p>
      <p className="mt-2"><StatusStamp ongoing={project.ongoing} /></p>
    </div>
    <div>
      <p className="eyebrow">Witnessed</p>
      <p className="hand mt-1 border-b rule pb-1 text-3xl">you, {today()}</p>
    </div>
  </div>
);

/* ─────────────────────────── Page ─────────────────────────── */

const ProjectPage: React.FC = () => {
  const project = useLoaderData() as Project;
  const navigate = useNavigate();
  const doc = projectDoc(project);
  const sections = useMemo(() => withArchitecture(doc), [doc]);
  const html = useMemo(() => sections.map((s) => parseMarkdown(s.md)), [sections]);
  const ids = useMemo(() => sections.map((s) => s.id), [sections]);
  const active = useActiveSection(ids);
  const related = relatedProjects(project);
  const index = allProjects.findIndex((p) => p.id === project.id);
  const prev = allProjects[index - 1];
  const next = allProjects[index + 1];
  const contentsRef = useRef<HTMLDetailsElement>(null);

  // Site-relative links inside the markdown navigate client-side instead of reloading
  const onProseClick = (e: React.MouseEvent) => {
    const a = (e.target as HTMLElement).closest('a');
    const href = a?.getAttribute('href');
    if (!href?.startsWith('/') || a?.target || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    navigate(href, { viewTransition: true });
  };

  return (
    <>
      <SEO
        title={project.title.replace(/ [—–-] /, ': ')}
        description={doc.intro}
        url={projectPath(project)}
        image={doc.diagramFull}
        type="article"
        keywords={project.tech}
      />

      <div aria-hidden="true" className="read-progress fixed inset-x-0 top-16 z-40 h-0.5" style={{ background: 'var(--accent)', transform: 'scaleX(0)' }} />

      <div id="top" className="wrap max-w-[104rem] scroll-mt-24 pb-10 pt-24 sm:pt-28">
        {/* Running head, like the top of a notebook page */}
        <div className="meta mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-dashed rule pb-3">
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link to="/" viewTransition className="hover:text-ink">Notebook</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link to="/projects/all" viewTransition className="hover:text-ink">Projects</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="accent">{expNo(project.id)}</li>
            </ol>
          </nav>
          <span>Vol. I · p. {pageNo(project.id)} of {pageNo(allProjects.length)}</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[12.5rem_minmax(0,1fr)] xl:grid-cols-[12.5rem_minmax(0,1fr)_17rem] xl:gap-12">
          {/* ── Left rail: contents + reading options ── */}
          <aside className="hidden lg:block">
            <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] space-y-10 overflow-y-auto pb-6">
              <nav aria-label="Contents">
                <p className="eyebrow mb-3">Contents</p>
                <Contents sections={sections} active={active} />
              </nav>
              <div>
                <p className="eyebrow mb-4 border-t border-dashed rule pt-6">Appearance</p>
                <ReadingOptions />
              </div>
            </div>
          </aside>

          {/* ── Main column ── */}
          <article className="min-w-0">
            <header>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="eyebrow"><span className="accent">{expNo(project.id)}</span> · {project.category}</p>
                <StatusStamp ongoing={project.ongoing} />
              </div>
              <h1 className="serif mt-4 text-[clamp(2.75rem,7vw,5.25rem)] leading-[0.95]" style={projectTitleTransition(project.id)}>
                {shortTitle(project.title)}
              </h1>
              <p className="meta mt-3">From the lab notebook of Himansh Munjal</p>
              <p className="mt-6 max-w-[62ch] text-[1.25rem] leading-relaxed text-ink">{doc.intro}</p>
            </header>

            {/* Narrower screens: data sheet + contents sit under the intro */}
            <div className="mt-8 grid gap-6 sm:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:hidden">
              <DataSheet project={project} doc={doc} />
              <details ref={contentsRef} className="sheet self-start p-5 lg:hidden" open>
                <summary className="eyebrow cursor-pointer">Contents · {sections.length}</summary>
                <div className="mt-4">
                  <Contents sections={sections} active={active} onPick={() => window.innerWidth < 640 && contentsRef.current?.removeAttribute('open')} />
                </div>
              </details>
            </div>

            {project.metrics && (
              <div className="mt-10 hidden xl:block">
                <Metrics metrics={project.metrics} size="lg" />
              </div>
            )}

            {/* Post HTML comes from our own markdown files and is escaped by parseMarkdown */}
            <div className="reading mt-12" onClick={onProseClick}>
              {doc.lead && <div className="prose mb-12" dangerouslySetInnerHTML={{ __html: parseMarkdown(doc.lead) }} />}

              <div className="space-y-16">
              {sections.map((s, i) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="scroll-mt-24">
                  <h2 id={`${s.id}-h`} className="serif flex items-baseline gap-3 border-b rule pb-2 text-[2rem] leading-tight">
                    <span className="meta accent text-sm">§ {i + 1}</span>
                    {s.title}
                  </h2>
                  {s.id === ARCH && <DiagramFigure project={project} doc={doc} />}
                  {html[i] && <div className="prose mt-6" dangerouslySetInnerHTML={{ __html: html[i] }} />}
                </section>
              ))}
              </div>
            </div>

            <Materials project={project} />

            {related.length > 0 && (
              <section aria-labelledby="see-also" className="mt-20">
                <p className="eyebrow"><span className="accent">Appendix B</span></p>
                <h2 id="see-also" className="serif mt-1 text-[2rem] leading-tight">See also</h2>
                <ul className="mt-6 grid gap-4 sm:grid-cols-3">
                  {related.map((r) => (
                    <li key={r.id}>
                      <Link to={projectPath(r)} viewTransition className="group sheet flex h-full flex-col p-4 transition-transform hover:-translate-y-0.5">
                        <span className="meta"><span className="accent">{expNo(r.id)}</span> · {r.category}</span>
                        <span className="serif mt-2 text-xl leading-tight text-ink transition-colors group-hover:text-accent">{shortTitle(r.title)}</span>
                        <span className="mt-2 line-clamp-3 text-sm text-ink-3">{projectDoc(r).intro}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <SignOff project={project} />

            {/* Page turns */}
            <nav aria-label="Other entries" className="mt-12 grid gap-4 sm:grid-cols-2">
              {prev ? (
                <Link to={projectPath(prev)} viewTransition className="group sheet p-5">
                  <span className="meta inline-flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> p. {pageNo(prev.id)} · previous entry</span>
                  <span className="serif mt-1 block text-2xl leading-snug text-ink transition-colors group-hover:text-accent">{shortTitle(prev.title)}</span>
                </Link>
              ) : <span className="hidden sm:block" />}
              {next && (
                <Link to={projectPath(next)} viewTransition className="group sheet p-5 sm:text-right">
                  <span className="meta inline-flex items-center gap-1">next entry · p. {pageNo(next.id)} <ArrowRight className="h-3 w-3" /></span>
                  <span className="serif mt-1 block text-2xl leading-snug text-ink transition-colors group-hover:text-accent">{shortTitle(next.title)}</span>
                </Link>
              )}
            </nav>

            <p className="meta mt-12 text-center">— p. {pageNo(project.id)} —</p>
          </article>

          {/* ── Right rail: data sheet ── */}
          <div className="hidden xl:block">
            <div className="no-scrollbar sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-6">
              <DataSheet project={project} doc={doc} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectPage;
