import { describe, it, expect } from 'vitest';
import { parseMarkdown } from '@/lib/markdown';
import { allBlogs, blogLoaders } from '@/data/blogs';

describe('parseMarkdown', () => {
  it('escapes raw HTML so posts cannot inject markup', () => {
    const html = parseMarkdown('<img src=x onerror="alert(1)">\n\n## <script>alert(1)</script>');
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<script');
    expect(html).toContain('&lt;img src=x onerror=&quot;alert(1)&quot;&gt;');
  });

  it('escapes HTML inside code blocks and inline code', () => {
    const html = parseMarkdown('```\n<b>x</b>\n```\n\nuse `<div>`');
    expect(html).toContain('<pre><code>&lt;b&gt;x&lt;/b&gt;</code></pre>');
    expect(html).toContain('<code>&lt;div&gt;</code>');
  });

  it('renders the supported block and inline syntax', () => {
    const html = parseMarkdown('# T\n\n- a\n- **b**\n\n1. one\n2. *two*\n\n> q\n\n---');
    expect(html).toBe(
      '<h1 id="t">T</h1>\n<ul><li>a</li><li><strong>b</strong></li></ul>\n' +
      '<ol><li>one</li><li><em>two</em></li></ol>\n<blockquote>q</blockquote>\n<hr />',
    );
  });

  it('terminates on lines that start with # but are not headings', () => {
    expect(parseMarkdown('#hashtag\n####')).toBe('<p>#hashtag</p>\n<p>####</p>');
  });
});

describe('blog data', () => {
  it('has a content loader and unique slug for every post', () => {
    const slugs = allBlogs.map((b) => b.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(blogLoaders[slug]).toBeTypeOf('function');
  });
});

describe('parseMarkdown lists and anchors', () => {
  it('treats "* " lines as bullets without breaking bold text', () => {
    const html = parseMarkdown('* one\n* two\n\n**bold** start');
    expect(html).toContain('<ul><li>one</li><li>two</li></ul>');
    expect(html).toContain('<p><strong>bold</strong> start</p>');
  });

  it('gives section headings a stable id', () => {
    expect(parseMarkdown('## Benchmarking with JMH')).toContain('<h2 id="benchmarking-with-jmh">');
  });
});
