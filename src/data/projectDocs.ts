// Long-form project pages (/project/:slug) come from src/content/:
//   projects/<slug>.md       front matter (intro, caption) + a body of "## Section" blocks
//   architecture/<slug>.png  the architecture diagram (.svg / .jpg also work). A <slug>.webp next to it
//                            is shown on the page (smaller); the .png is kept for the full-size view and link previews.
// The slug is the project's short title in kebab case: see projectSlug() and _template.md.
// File names are matched loosely, so "Adaptive-KV Cache.md" and "Jcache.png" both work.
// A project without a .md gets a page assembled from its entry in projects.ts.
import { allProjects, projectSlug, type Project } from './projects';
import { slugify } from '@/lib/markdown';

// Eager, because the intro line is shown on the project cards. Files starting with _ are ignored.
const docs = import.meta.glob(['../content/projects/*.md', '!../content/projects/_*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const diagrams = import.meta.glob('../content/architecture/*.{png,svg,webp,jpg,jpeg}', {
  query: '?url',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const fileSlug = (path: string) => slugify(path.split('/').pop()!.replace(/\.[^.]+$/, ''));
const ext = (path: string) => path.split('.').pop()!.toLowerCase();
const extRank = (path: string) => ['png', 'svg', 'jpg', 'jpeg', 'webp'].indexOf(ext(path));
const docBySlug = new Map(Object.entries(docs).map(([path, raw]) => [fileSlug(path), raw]));
// Sorted so the preferred format is set last and wins when a diagram exists in several
const diagramBySlug = new Map(
  Object.entries(diagrams)
    .sort(([a], [b]) => extRank(b) - extRank(a))
    .map(([path, url]) => [fileSlug(path), url])
);
const webpBySlug = new Map(
  Object.entries(diagrams)
    .filter(([path]) => ext(path) === 'webp')
    .map(([path, url]) => [fileSlug(path), url])
);

/** "---\nkey: value\n---\nbody" → { meta, body }. Values are plain strings; quotes are optional. */
export function splitFrontMatter(raw: string): { meta: Record<string, string>; body: string } {
  const m = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!m) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return { meta, body: raw.slice(m[0].length) };
}

export interface DocSection {
  id: string;
  title: string;
  /** Markdown for the section body (everything up to the next "## ") */
  md: string;
}

export interface ProjectDoc {
  intro: string;
  caption?: string;
  /** Diagram shown on the page: the .webp when there is one */
  diagram?: string;
  /** Full-resolution diagram (.png preferred) for the zoom view and link previews */
  diagramFull?: string;
  /** Markdown before the first "## " heading */
  lead: string;
  sections: DocSection[];
  /** false while the page is assembled from projects.ts */
  written: boolean;
}

/** Split a body into "## " sections; the page renders the headings itself */
export function splitSections(body: string): { lead: string; sections: DocSection[] } {
  const parts = body.replace(/^\s*# .*\n/, '').split(/^## (.+)$/m);
  const seen = new Map<string, number>();
  const sections: DocSection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    const title = parts[i].replace(/[*`_]/g, '').trim();
    const base = slugify(title) || 'section';
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    sections.push({ id: n ? `${base}-${n + 1}` : base, title, md: parts[i + 1] ?? '' });
  }
  return { lead: parts[0].trim(), sections };
}

/** Paragraphs of ~3 sentences, so the long descriptions don't arrive as one wall of text */
const paragraphs = (text: string) => {
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join('').trim());
  return out.join('\n\n');
};

const fallbackBody = (p: Project) =>
  [
    `## About\n\n${paragraphs(p.description)}`,
    `## The question\n\n${p.problem}`,
    `## Architecture\n`,
    `## How it's built\n\n${p.approach.map((a) => `- ${a}`).join('\n')}`,
    `## Results\n\n${p.result}`,
  ].join('\n\n');

const cache = new Map<number, ProjectDoc>();

export function projectDoc(p: Project): ProjectDoc {
  const hit = cache.get(p.id);
  if (hit) return hit;

  const slug = projectSlug(p);
  const raw = docBySlug.get(slug);
  const { meta, body } = raw ? splitFrontMatter(raw) : { meta: {}, body: fallbackBody(p) };
  // HTML comments (like the template's instructions) would otherwise be escaped and shown
  const { lead, sections } = splitSections(body.replace(/<!--[\s\S]*?-->/g, ''));

  const doc: ProjectDoc = {
    intro: meta.intro || p.subtitle,
    caption: meta.caption,
    diagram: webpBySlug.get(slug) ?? diagramBySlug.get(slug),
    diagramFull: diagramBySlug.get(slug),
    lead,
    sections,
    written: Boolean(raw),
  };
  cache.set(p.id, doc);
  return doc;
}

/** Other entries ranked by shared tech, then same category */
export function relatedProjects(p: Project, n = 3): Project[] {
  const tech = new Set(p.tech.map((t) => t.toLowerCase()));
  return allProjects
    .filter((o) => o.id !== p.id)
    .map((o) => ({
      o,
      score: o.tech.filter((t) => tech.has(t.toLowerCase())).length * 2 + (o.category === p.category ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.o.id - b.o.id)
    .slice(0, n)
    .map((x) => x.o);
}

/** Where else each of this project's technologies shows up */
export const alsoUsedIn = (p: Project, tech: string) =>
  allProjects.filter((o) => o.id !== p.id && o.tech.some((t) => t.toLowerCase() === tech.toLowerCase()));
