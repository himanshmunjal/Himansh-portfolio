import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '@/lib/markdown';
import { allProjects, findProject, projectSlug } from '@/data/projects';
import { projectDoc, splitFrontMatter, splitSections } from '@/data/projectDocs';

describe('project slugs', () => {
  it('are unique and resolve back to their project', () => {
    const slugs = allProjects.map(projectSlug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const p of allProjects) expect(findProject(projectSlug(p))).toBe(p);
    expect(projectSlug(allProjects[0])).toBe('jcache');
  });
});

describe('project docs', () => {
  it('reads front matter', () => {
    const { meta, body } = splitFrontMatter('---\nintro: "Hello: world"\ncaption: Fig\n---\n## About\nx');
    expect(meta).toEqual({ intro: 'Hello: world', caption: 'Fig' });
    expect(body).toBe('## About\nx');
  });

  it('splits sections and keeps ids unique', () => {
    const { lead, sections } = splitSections('# Title\nlead\n## About\na\n## **Tech** stack\nb\n## About\nc');
    expect(lead).toBe('lead');
    expect(sections.map((s) => s.id)).toEqual(['about', 'tech-stack', 'about-2']);
    expect(sections[1].title).toBe('Tech stack');
  });

  it('gives every project an intro and sections, written or not', () => {
    for (const p of allProjects) {
      const doc = projectDoc(p);
      expect(doc.intro.length).toBeGreaterThan(10);
      expect(doc.sections.length).toBeGreaterThan(0);
    }
    expect(projectDoc(allProjects[0]).written).toBe(true);
  });

  it('puts the written projects first, each with its diagram', () => {
    const top = allProjects.slice(0, 12);
    expect(top.map(projectSlug)).toEqual([
      'jcache', 'chaukanna', 'allowance', 'codesense-ai', 'ope-lab', 'syncengine',
      'ephemeral-share', 'adaptive-kv-cache', 'customer-360', 'gridsense', 'oss-contributor-analytics', 'dual-attention-har',
    ]);
    for (const p of top) {
      const doc = projectDoc(p);
      expect(doc.written).toBe(true);
      expect(doc.diagram).toMatch(/\.webp/);
      expect(doc.diagramFull).toMatch(/\.png/);
    }
  });

  it('numbers projects 1..n in order', () => {
    expect(allProjects.map((p) => p.id)).toEqual(allProjects.map((_, i) => i + 1));
  });
});

describe('parseMarkdown tables and links', () => {
  it('renders a table with a header row', () => {
    const html = parseMarkdown('| A | B |\n|---|---|\n| 1 | **2** |');
    expect(html).toBe('<div class="table-wrap"><table><thead><tr><th>A</th><th>B</th></tr></thead><tbody><tr><td>1</td><td><strong>2</strong></td></tr></tbody></table></div>');
  });

  it('only links http(s) and site-relative URLs, and escapes them', () => {
    expect(parseMarkdown('[x](/blog/a)')).toBe('<p><a href="/blog/a">x</a></p>');
    expect(parseMarkdown('[x](https://a.b/?q="1")')).toContain('href="https://a.b/?q=&quot;1&quot;"');
    expect(parseMarkdown('[x](javascript:alert(1))')).not.toContain('<a');
  });
});
