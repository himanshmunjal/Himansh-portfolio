// Minimal Markdown → HTML for the blog posts (headings, quotes, lists, rules,
// fenced code, tables, links, bold/italic/inline code). Output is injected with dangerouslySetInnerHTML,
// so every piece of text is HTML-escaped *before* any tags are added — raw HTML in a
// post can never reach the DOM. Links only accept http(s) and site-relative URLs; images are unsupported.

const escapeHtml = (raw: string) =>
  raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

function inline(raw: string): string {
  return escapeHtml(raw)
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // [text](url): the URL was escaped with everything else, so it can't break out of the attribute
    .replace(/\[([^\]]+)\]\(((?:https?:\/\/|\/)[^\s)]+)\)/g, (_, text: string, url: string) =>
      url.startsWith('/')
        ? `<a href="${url}">${text}</a>`
        : `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`
    );
}

const isTableRow = (line: string) => line.trim().startsWith('|');
const cells = (line: string) => line.trim().replace(/^\||\|$/g, '').split('|').map((c) => c.trim());

const isBullet = (line: string) => line.startsWith('- ') || line.startsWith('* ');

export const slugify = (raw: string) =>
  raw.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const isBlockStart = (line: string) =>
  line.startsWith('#') || line.startsWith('> ') || isBullet(line) ||
  line.startsWith('```') || /^\d+\. /.test(line) || line.trim() === '---' || isTableRow(line);

export function parseMarkdown(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '')      { i++; continue; }
    if (line.startsWith('# '))   { out.push(`<h1 id="${slugify(line.slice(2))}">${inline(line.slice(2))}</h1>`); i++; continue; }
    if (line.startsWith('## '))  { out.push(`<h2 id="${slugify(line.slice(3))}">${inline(line.slice(3))}</h2>`); i++; continue; }
    if (line.startsWith('### ')) { out.push(`<h3>${inline(line.slice(4))}</h3>`); i++; continue; }
    if (line.startsWith('> '))   { out.push(`<blockquote>${inline(line.slice(2))}</blockquote>`); i++; continue; }
    if (line.trim() === '---')   { out.push('<hr />'); i++; continue; }

    // Fenced code block — contents are escaped but otherwise kept verbatim
    if (line.startsWith('```')) {
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        code.push(escapeHtml(lines[i]));
        i++;
      }
      i++; // closing fence
      out.push(`<pre><code>${code.join('\n')}</code></pre>`);
      continue;
    }

    // Table: header row, a |---| separator, then body rows
    if (isTableRow(line)) {
      const rows: string[] = [];
      while (i < lines.length && isTableRow(lines[i])) {
        rows.push(lines[i]);
        i++;
      }
      const hasHead = rows.length > 1 && /^[\s|:-]+$/.test(rows[1]);
      const head = hasHead ? `<thead><tr>${cells(rows[0]).map((c) => `<th>${inline(c)}</th>`).join('')}</tr></thead>` : '';
      const body = (hasHead ? rows.slice(2) : rows)
        .map((r) => `<tr>${cells(r).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
        .join('');
      out.push(`<div class="table-wrap"><table>${head}<tbody>${body}</tbody></table></div>`);
      continue;
    }

    if (isBullet(line)) {
      const items: string[] = [];
      while (i < lines.length && isBullet(lines[i])) {
        items.push(`<li>${inline(lines[i].slice(2))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\. /, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !isBlockStart(lines[i])) {
      para.push(inline(lines[i]));
      i++;
    }
    // A line like "#hashtag" is not a heading but would otherwise never be consumed
    if (para.length === 0) {
      para.push(inline(lines[i]));
      i++;
    }
    out.push(`<p>${para.join('<br />')}</p>`);
  }

  return out.join('\n');
}
