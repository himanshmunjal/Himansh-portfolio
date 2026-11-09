// Build step: give every route its own index.html with the right <title>, description,
// canonical URL, Open Graph / Twitter tags and JSON-LD, and write sitemap.xml.
//
// Why: link-preview bots (LinkedIn, WhatsApp, Slack, X) and some crawlers don't run
// JavaScript, so without this every shared link would show the home page's title.
// The tags carry data-rh="true", so react-helmet replaces them on client-side navigation
// instead of adding duplicates.
//
// Data comes straight from src/data (projects, blogs) and the write-ups' front matter,
// so new projects and posts are picked up automatically.
import fs from 'node:fs';
import path from 'node:path';
import { createServer, type Plugin } from 'vite';
import type { Project } from './src/data/projects.ts';

type Blog = { slug: string; title: string; excerpt: string; image?: string; tags: string[] };
interface SiteData {
  allProjects: Project[];
  projectSlug: (p: Project) => string;
  allBlogs: Blog[];
}

/** Load src/data through Vite (blogs.ts lazily imports `*.md?raw`, which only Vite can resolve) */
async function loadData(root: string): Promise<SiteData> {
  const server = await createServer({
    root,
    configFile: false,
    logLevel: 'silent',
    server: { middlewareMode: true, hmr: false, ws: false },
    appType: 'custom',
    optimizeDeps: { noDiscovery: true, include: [] },
    resolve: { alias: { '@': path.join(root, 'src') } },
  });
  try {
    const projects = await server.ssrLoadModule('/src/data/projects.ts');
    const blogs = await server.ssrLoadModule('/src/data/blogs.ts');
    return { allProjects: projects.allProjects, projectSlug: projects.projectSlug, allBlogs: blogs.allBlogs };
  } finally {
    await server.close();
  }
}

const SITE = 'https://himansh-portfolio.vercel.app';
const NAME = 'Himansh Munjal';
const DEFAULT_TITLE = 'Himansh Munjal — AI Engineer | Data Science | Full Stack Developer';
const DEFAULT_DESC =
  'Portfolio of Himansh Munjal — Computer Science (Data Science) student at VIT Vellore building machine learning systems, NLP pipelines and full-stack applications.';
const DEFAULT_IMAGE = { url: `${SITE}/og-image.jpg`, width: 1200, height: 630 };

interface Route {
  path: string;
  /** Page module (lazy-loaded by the router); its chunk is preloaded in this route's HTML */
  page: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  image?: { url: string; width: number; height: number };
  jsonLd?: Record<string, unknown>;
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
/** Search snippets are cut at ~160 characters; end on a word, not mid-word */
const clip = (s: string, n = 160) => (s.length <= n ? s : `${s.slice(0, s.lastIndexOf(' ', n - 1))}…`);

/** File in dir whose name slugifies to `slug` (names are matched loosely, as in projectDocs.ts) */
const findBySlug = (dir: string, slug: string, exts: string[]) =>
  fs.existsSync(dir)
    ? fs.readdirSync(dir).find((f) => {
        const ext = path.extname(f).slice(1).toLowerCase();
        return exts.includes(ext) && !f.startsWith('_') && slugify(path.basename(f, path.extname(f))) === slug;
      })
    : undefined;

const frontMatter = (raw: string): Record<string, string> => {
  const m = raw.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---/);
  const meta: Record<string, string> = {};
  for (const line of m?.[1].split(/\r?\n/) ?? []) {
    const kv = line.match(/^([A-Za-z][\w-]*)\s*:\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, '$2');
  }
  return meta;
};

function buildRoutes(root: string, outDir: string, { allProjects, projectSlug, allBlogs }: SiteData): Route[] {
  const person = { '@type': 'Person', name: NAME, url: `${SITE}/` };
  const routes: Route[] = [
    { path: '/', page: 'src/pages/Index.tsx', title: DEFAULT_TITLE, description: DEFAULT_DESC, type: 'website' },
    {
      path: '/projects/all',
      page: 'src/pages/AllProjects.tsx',
      title: `All Projects | ${NAME}`,
      description:
        'Every project by Himansh Munjal, logged as an experiment: the question, the method and the result. AI products, systems, machine learning and data science.',
      type: 'website',
    },
    {
      path: '/blogs/all',
      page: 'src/pages/AllBlogs.tsx',
      title: `Blog | ${NAME}`,
      description: 'Long-form notes by Himansh Munjal on machine learning, NLP, MLOps, concurrency and full-stack engineering.',
      type: 'website',
    },
  ];

  const docsDir = path.join(root, 'src/content/projects');
  const archDir = path.join(root, 'src/content/architecture');
  fs.mkdirSync(path.join(outDir, 'og'), { recursive: true });

  for (const p of allProjects) {
    const slug = projectSlug(p);
    const doc = findBySlug(docsDir, slug, ['md']);
    const intro = doc ? frontMatter(fs.readFileSync(path.join(docsDir, doc), 'utf8')).intro : undefined;
    // The architecture diagram is the share image; copied under a stable, unhashed name
    const png = findBySlug(archDir, slug, ['png']);
    let image = DEFAULT_IMAGE;
    if (png) {
      fs.copyFileSync(path.join(archDir, png), path.join(outDir, 'og', `${slug}.png`));
      image = { url: `${SITE}/og/${slug}.png`, width: 3200, height: 1800 };
    }
    const description = clip(intro || p.subtitle);
    routes.push({
      path: `/project/${slug}`,
      page: 'src/pages/ProjectPage.tsx',
      title: `${p.title.replace(/ [—–-] /, ': ')} | ${NAME}`,
      description,
      type: 'article',
      image,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: p.title,
        headline: p.title,
        description,
        url: `${SITE}/project/${slug}`,
        image: image.url,
        keywords: p.tech.join(', '),
        genre: p.category,
        author: person,
        ...(p.link.includes('github.com/himanshmunjal/') ? { codeRepository: p.link } : {}),
      },
    });
  }

  for (const b of allBlogs) {
    const description = clip(b.excerpt);
    routes.push({
      path: `/blog/${b.slug}`,
      page: 'src/pages/BlogPost.tsx',
      title: `${b.title} | ${NAME}`,
      description,
      type: 'article',
      image: b.image ? { url: b.image, width: 800, height: 500 } : DEFAULT_IMAGE,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: b.title,
        description,
        url: `${SITE}/blog/${b.slug}`,
        image: b.image,
        keywords: b.tags.join(', '),
        author: person,
      },
    });
  }
  return routes;
}

/** Replace the content/href of one data-rh tag in the template */
function setTag(html: string, selector: RegExp, value: string): string {
  if (!selector.test(html)) throw new Error(`prerender-meta: tag ${selector} not found in index.html`);
  return html.replace(selector, (tag) => tag.replace(/(content|href)="[^"]*"/, `$1="${esc(value)}"`));
}

type Manifest = Record<string, { file: string; css?: string[]; imports?: string[]; isEntry?: boolean }>;

/** The page chunk plus its static imports (not the entry, which index.html already loads) */
function preloadsFor(manifest: Manifest, page: string): { js: string[]; css: string[] } {
  const js = new Set<string>();
  const css = new Set<string>();
  const visit = (key: string) => {
    const c = manifest[key];
    if (!c || c.isEntry || js.has(c.file)) return;
    js.add(c.file);
    c.css?.forEach((f) => css.add(f));
    c.imports?.forEach(visit);
  };
  visit(page);
  return { js: [...js], css: [...css] };
}

function renderRoute(template: string, r: Route, manifest: Manifest): string {
  const url = r.path === '/' ? `${SITE}/` : `${SITE}${r.path}`;
  const img = r.image ?? DEFAULT_IMAGE;
  let html = template.replace(/<title data-rh="true">[^<]*<\/title>/, `<title data-rh="true">${esc(r.title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, r.description);
  html = setTag(html, /<link rel="canonical"[^>]*>/, url);
  html = setTag(html, /<meta property="og:type"[^>]*>/, r.type);
  html = setTag(html, /<meta property="og:title"[^>]*>/, r.title);
  html = setTag(html, /<meta property="og:description"[^>]*>/, r.description);
  html = setTag(html, /<meta property="og:url"[^>]*>/, url);
  html = setTag(html, /<meta property="og:image"[^>]*>/, img.url);
  html = setTag(html, /<meta property="og:image:width"[^>]*>/, String(img.width));
  html = setTag(html, /<meta property="og:image:height"[^>]*>/, String(img.height));
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, r.title);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, r.description);
  html = setTag(html, /<meta name="twitter:image"[^>]*>/, img.url);
  // Fetch this page's code in parallel with the entry instead of after it has run
  const { js, css } = preloadsFor(manifest, r.page);
  const links = [
    ...css.filter((f) => !template.includes(`/${f}"`)).map((f) => `<link rel="stylesheet" href="/${f}" />`),
    ...js.filter((f) => !template.includes(`/${f}"`)).map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`),
  ];
  if (links.length) html = html.replace('</head>', `  ${links.join('\n    ')}\n  </head>`);
  if (r.jsonLd) {
    // `<` is escaped so a title can never close the script element
    const json = JSON.stringify(r.jsonLd).replace(/</g, '\\u003c');
    html = html.replace('</head>', `  <script type="application/ld+json" data-rh="true">${json}</script>\n  </head>`);
  }
  return html;
}

export function prerenderMeta(): Plugin {
  let root = process.cwd();
  let outDir = 'dist';
  return {
    name: 'prerender-meta',
    apply: 'build',
    configResolved(c) {
      root = c.root;
      outDir = path.resolve(c.root, c.build.outDir);
    },
    async closeBundle() {
      const template = fs.readFileSync(path.join(outDir, 'index.html'), 'utf8');
      const routes = buildRoutes(root, outDir, await loadData(root));
      const manifestFile = path.join(outDir, '.vite/manifest.json');
      const manifest: Manifest = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : {};
      for (const r of routes) {
        // /project/x -> project/x.html; vercel.json sets cleanUrls so Vercel serves it at /project/x
        const file = r.path === '/' ? path.join(outDir, 'index.html') : path.join(outDir, `${r.path}.html`);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, renderRoute(template, r, manifest));
      }
      // The manifest was only needed here; don't publish it
      fs.rmSync(path.join(outDir, '.vite'), { recursive: true, force: true });
      const today = new Date().toISOString().slice(0, 10);
      const urls = routes
        .map((r) => `  <url><loc>${SITE}${r.path === '/' ? '/' : r.path}</loc><lastmod>${today}</lastmod></url>`)
        .join('\n');
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
      );
      this.info?.(`prerendered meta for ${routes.length} routes + sitemap.xml`);
    },
  };
}
