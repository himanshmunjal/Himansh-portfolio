import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { useInView } from '@/hooks/useInView';
// Put this at the top of BlogSection.tsx, outside the component
const blogImports: Record<string, () => Promise<{ default: string }>> = {
  'full-stack-airport-management':        () => import('../blogs/full-stack-airport-management.md?raw'),
  'data-science-notebook-to-production':  () => import('../blogs/data-science-notebook-to-production.md?raw'),
  'roberta-disaster-tweet-triage':        () => import('../blogs/roberta-disaster-tweet-triage.md?raw'),
  'finguard-deep-learning-architecture':  () => import('../blogs/finguard-deep-learning-architecture.md?raw'),
  'explainability-crisis-black-box-ai':   () => import('../blogs/explainability-crisis-black-box-ai.md?raw'),
};
import { Link, useNavigate, useParams } from 'react-router-dom';

// ---------------------------------------------------------------------------
// Blog metadata — slug must match the filename in /public/blogs/
// ---------------------------------------------------------------------------
export const allBlogs = [
  {
    id: 1,
    slug: 'full-stack-airport-management',
    title: 'Surviving Full-Stack Hell: Lessons From Building an Airport Management System in Go + React',
    excerpt:
      'What looks like a clean architecture on a whiteboard turns into a distributed debugging nightmare the moment real users hit it. Every mistake I made building a JWT-secured, role-based full-stack system in Golang and React — and what I would do differently.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=500&fit=crop&q=80',
    tags: ['FullStack', 'Golang', 'React', 'JWT', 'PostgreSQL', 'SystemDesign'],
    readTime: '12 min read',
    views: '4.1k',
    category: 'Full Stack',
    categoryColor: '#6366f1',
  },
  {
    id: 2,
    slug: 'data-science-notebook-to-production',
    title: 'From Notebook to Nowhere: The Real Reason Data Science Projects Fail Before Deployment',
    excerpt:
      'I have built ML pipelines that never made it past a Jupyter notebook. After the Taxi Fare project with MLflow, Prefect, FastAPI, and Docker, I finally understand why a production mindset changes everything from day one.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&q=80',
    tags: ['DataScience', 'MLOps', 'MLflow', 'Prefect', 'FastAPI', 'Docker'],
    readTime: '10 min read',
    views: '7.2k',
    category: 'Data Science',
    categoryColor: '#f59e0b',
  },
  {
    id: 3,
    slug: 'roberta-disaster-tweet-triage',
    title: 'Fine-Tuning RoBERTa for Disaster Tweet Triage — What the Papers Do Not Tell You',
    excerpt:
      'NLP benchmarks make fine-tuning look clean. Real disaster datasets are messy, imbalanced, and ethically loaded. The full story of building DisasterTweet AI — including the parts where it broke.',
    image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop&q=80',
    tags: ['NLP', 'RoBERTa', 'HuggingFace', 'DisasterResponse', 'Transformers', 'CrisisNLP'],
    readTime: '13 min read',
    views: '2.7k',
    category: 'AI/NLP',
    categoryColor: '#10b981',
  },
  {
    id: 4,
    slug: 'finguard-deep-learning-architecture',
    title: 'Building FinGuard: What Three Architecture Rewrites Taught Me About Deep Learning',
    excerpt:
      'The first version of FinGuard used a single model. The second used two. The third with GNNs, Transformers, XGBoost, and SHAP finally worked. Here is why each layer exists and what I learned failing to build without it.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=500&fit=crop&q=80',
    tags: ['GNN', 'Transformers', 'SHAP', 'XGBoost', 'FraudDetection', 'DeepLearning'],
    readTime: '14 min read',
    views: '3.4k',
    category: 'Deep Learning',
    categoryColor: '#ef4444',
  },
  {
    id: 5,
    slug: 'explainability-crisis-black-box-ai',
    title: 'The Explainability Crisis: Why Black-Box AI Is Failing the Industries That Need It Most',
    excerpt:
      'SHAP and LIME are useful. They are also approximations that can mislead. As AI enters credit, healthcare, and hiring, the gap between explainable and trustworthy is becoming a systemic risk.',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=500&fit=crop&q=80',
    tags: ['XAI', 'SHAP', 'ResponsibleAI', 'Explainability', 'AIPolicy', 'EUAIAct'],
    readTime: '11 min read',
    views: '6.1k',
    category: 'AI Research',
    categoryColor: '#8b5cf6',
  },
];

type Blog = typeof allBlogs[0];

// ---------------------------------------------------------------------------
// Markdown → HTML  (inline + block parser, no external deps)
// ---------------------------------------------------------------------------
function inlineMd(raw: string): string {
  return raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function parseMd(md: string): string {
  const lines = md.split('\n');
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '')          { i++; continue; }
    if (line.startsWith('# '))       { out.push('<h1>' + inlineMd(line.slice(2))  + '</h1>'); i++; continue; }
    if (line.startsWith('## '))      { out.push('<h2>' + inlineMd(line.slice(3))  + '</h2>'); i++; continue; }
    if (line.startsWith('### '))     { out.push('<h3>' + inlineMd(line.slice(4))  + '</h3>'); i++; continue; }
    if (line.startsWith('> '))       { out.push('<blockquote>' + inlineMd(line.slice(2)) + '</blockquote>'); i++; continue; }
    if (line.trim() === '---')       { out.push('<hr />'); i++; continue; }

    // Unordered list — collect consecutive items
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push('<li>' + inlineMd(lines[i].slice(2)) + '</li>');
        i++;
      }
      out.push('<ul>' + items.join('') + '</ul>');
      continue;
    }

    // Paragraph — collect until blank / special line
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('- ') &&
      lines[i].trim() !== '---'
    ) {
      para.push(inlineMd(lines[i]));
      i++;
    }
    if (para.length) out.push('<p>' + para.join('<br />') + '</p>');
  }

  return out.join('\n');
}

// ---------------------------------------------------------------------------
// useBlogContent — fetches /public/blogs/<slug>.md on demand, caches results
// ---------------------------------------------------------------------------
const contentCache: Record<string, string> = {};

type FetchState = 'idle' | 'loading' | 'ready' | 'error';

function useBlogContent(slug: string | null) {
  const [html, setHtml] = useState<string>('');
  const [state, setState] = useState<FetchState>('idle');

  useEffect(() => {
    if (!slug) return;

    if (contentCache[slug]) {
      setHtml(contentCache[slug]);
      setState('ready');
      return;
    }

    const loader = blogImports[slug];
    if (!loader) { setState('error'); return; }

    setState('loading');
    setHtml('');

    loader()
      .then((mod) => {
        const parsed = parseMd(mod.default);
        contentCache[slug] = parsed;
        setHtml(parsed);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, [slug]);

  return { html, state };
}

// ---------------------------------------------------------------------------
// BlogReader modal
// ---------------------------------------------------------------------------
const BlogReader: React.FC<{
  blog: Blog;
  onClose: () => void;
  onNavigate: (id: number) => void;
}> = ({ blog, onClose, onNavigate }) => {
  const currentIndex = allBlogs.findIndex((b) => b.id === blog.id);
  const prev = currentIndex > 0 ? allBlogs[currentIndex - 1] : null;
  const next = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : null;
  const related = allBlogs.filter((b) => b.id !== blog.id).slice(0, 2);

  const { html, state } = useBlogContent(blog.slug);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-2xl overflow-y-auto">

      {/* ── Top bar ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-white/10 bg-background/80 backdrop-blur-xl">
        <button
          onClick={onClose}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> All Posts
        </button>

        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <button
            onClick={() => prev && onNavigate(prev.id)}
            disabled={!prev}
            className="p-2 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition-all"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span>{currentIndex + 1} / {allBlogs.length}</span>
          <button
            onClick={() => next && onNavigate(next.id)}
            disabled={!next}
            className="p-2 rounded-lg border border-white/10 hover:border-white/30 disabled:opacity-30 transition-all"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 rounded-lg border border-white/10 hover:border-primary/40 transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* ── Article body ────────────────────────────────────────────────── */}
      <article className="max-w-3xl mx-auto w-full px-6 py-12">

        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 aspect-video">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <span
            className="absolute bottom-4 left-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: blog.categoryColor + '33',
              color: blog.categoryColor,
              border: '1px solid ' + blog.categoryColor + '55',
            }}
          >
            {blog.category}
          </span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {blog.readTime}</span>
          <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {blog.views} views</span>
        </div>

        <h1 className="text-3xl font-bold text-foreground mb-6 leading-tight">{blog.title}</h1>

        <div className="flex flex-wrap gap-2 mb-10">
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
            >
              <Tag className="w-3 h-3" />#{tag}
            </span>
          ))}
        </div>

        {/* Content states */}
        {state === 'loading' && (
          <div className="flex items-center justify-center gap-3 py-24 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading article…</span>
          </div>
        )}

        {state === 'error' && (
          <div className="flex flex-col items-center gap-3 py-24 text-muted-foreground">
            <AlertCircle className="w-8 h-8 text-red-400" />
            <p className="text-sm">Could not load the article. Make sure the file exists at</p>
            <code className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-lg">
              /public/blogs/{blog.slug}.md
            </code>
          </div>
        )}

        {state === 'ready' && (
          <div
            className="markdown-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      </article>

      {/* ── You might also enjoy ────────────────────────────────────────── */}
      <div className="max-w-3xl mx-auto w-full px-6 pb-16">
        <hr className="border-white/10 mb-10" />

        <div className="flex items-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-foreground">You might also enjoy</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {related.map((r) => (
            <button
              key={r.id}
              onClick={() => onNavigate(r.id)}
              className="group text-left rounded-2xl overflow-hidden border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all duration-300"
            >
              <div className="relative h-36 overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
                <span
                  className="absolute bottom-3 left-3 text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: r.categoryColor + '33',
                    color: r.categoryColor,
                    border: '1px solid ' + r.categoryColor + '55',
                  }}
                >
                  {r.category}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {r.readTime}</span>
                </div>
                <p className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {r.title}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {r.tags.slice(0, 2).map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary/80 border border-primary/15">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {prev ? (
            <button
              onClick={() => onNavigate(prev.id)}
              className="group text-left p-5 rounded-2xl border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all"
            >
              <span className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <ChevronLeft className="w-3 h-3" /> Previous
              </span>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {prev.title}
              </p>
            </button>
          ) : <div />}

          {next ? (
            <button
              onClick={() => onNavigate(next.id)}
              className="group text-right p-5 rounded-2xl border border-white/10 hover:border-white/25 bg-white/5 hover:bg-white/10 transition-all"
            >
              <span className="flex items-center justify-end gap-1 text-xs text-muted-foreground mb-1">
                Next <ChevronRight className="w-3 h-3" />
              </span>
              <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                {next.title}
              </p>
            </button>
          ) : <div />}
        </div>

        {/* Bottom CTA */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/15 hover:border-white/30 bg-white/5 text-sm font-medium transition-all"
          >
            <BookOpen className="w-4 h-4" /> All Posts
          </button>
          <a
            href="/"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            &#127968; Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// BlogCard
// ---------------------------------------------------------------------------
const BlogCard: React.FC<{
  blog: Blog;
  index: number;
  isInView: boolean;
  mousePosition: { x: number; y: number };
  onClick: () => void;
}> = ({ blog, index, isInView, mousePosition, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getTilt = () => {
    if (!cardRef.current || !isHovered) return { x: 0, y: 0 };
    const rect = cardRef.current.getBoundingClientRect();
    const dx = (mousePosition.x - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (mousePosition.y - (rect.top + rect.height / 2)) / (rect.height / 2);
    return { x: dy * -5, y: dx * 5 };
  };
  const tilt = getTilt();

  return (
    <div
      ref={cardRef}
      className={'group relative cursor-pointer ' + (isInView ? 'animate-fade-in' : 'opacity-0')}
      style={{ animationDelay: (0.2 + index * 0.1) + 's', perspective: '1000px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-60 blur-xl transition-all duration-500" />

      <div
        className="relative glass-card rounded-2xl overflow-hidden backdrop-blur-xl bg-background/40 border border-primary/20 transition-all duration-500 group-hover:bg-background/60 group-hover:border-primary/40"
        style={{
          transform: isHovered
            ? 'rotateX(' + tilt.x + 'deg) rotateY(' + tilt.y + 'deg) scale(1.02)'
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
          transition: 'all 0.3s ease-out',
        }}
      >
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent z-10" />

        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <span
            className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full"
            style={{
              background: blog.categoryColor + '33',
              color: blog.categoryColor,
              border: '1px solid ' + blog.categoryColor + '55',
            }}
          >
            {blog.category}
          </span>

          <div className="absolute top-3 right-3 w-9 h-9 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <BookOpen className="w-4 h-4 text-primary" />
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20">
              <Clock className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground/80">{blog.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-background/80 backdrop-blur-sm border border-primary/20">
              <Eye className="w-3 h-3 text-primary" />
              <span className="text-xs text-foreground/80">{blog.views}</span>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="relative p-6">
          <h3 className="text-base font-bold text-foreground mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {blog.title}
          </h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
            {blog.excerpt}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {blog.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                #{tag}
              </span>
            ))}
            {blog.tags.length > 3 && (
              <span className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
                +{blog.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <span className="font-medium">Read article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// BlogSection — main export
// ---------------------------------------------------------------------------
const BlogSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  const activeBlog = allBlogs.find((b) => b.slug === slug) ?? null;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = Array.from({ length: 20 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 0.5 + 0.2,
      opacity: Math.random() * 0.5 + 0.3,
    }));
    let rafId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.y += p.speedY;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(168, 85, 247, ' + p.opacity + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.5)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      rafId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(rafId);
  }, []);

  const handleNavigate = useCallback((id: number) => {
    const found = allBlogs.find((b) => b.id === id);
    if (found) navigate('/blog/' + found.slug);
  }, [navigate]);

  return (
    <>
      {activeBlog && (
        <BlogReader
          blog={activeBlog}
          onClose={() => navigate(-1)}
          onNavigate={handleNavigate}
        />
      )}

      <section id="blog" className="py-20 relative overflow-hidden" ref={ref}>
        <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />
        <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-30" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className="gradient-orb gradient-orb-primary w-[500px] h-[500px] -top-40 -left-40 blur-3xl"
            style={{
              transform: 'translate(' + mousePosition.x * 0.02 + 'px, ' + mousePosition.y * 0.02 + 'px)',
              transition: 'transform 0.3s ease-out',
            }}
          />
          <div
            className="gradient-orb gradient-orb-pink w-[450px] h-[450px] top-1/2 -right-40 blur-3xl"
            style={{
              animationDelay: '3s',
              transform: 'translate(' + (-mousePosition.x * 0.015) + 'px, ' + (-mousePosition.y * 0.015) + 'px)',
              transition: 'transform 0.3s ease-out',
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">

          {/* Section heading */}
          <div className={'text-center mb-16 ' + (isInView ? 'animate-fade-in' : 'opacity-0')}>
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
              <BookOpen className="w-6 h-6 text-primary animate-bounce" />
              <TrendingUp className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
              <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
            </div>
            <h2 className="section-heading relative inline-block">
              <span className="gradient-text-vibrant relative">
                My Blog
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
              </span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
              Real-world lessons from building AI systems — the failures, the rewrites, and what actually works in production.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {allBlogs.slice(0, 3).map((blog, index) => (
              <BlogCard
                key={blog.id}
                blog={blog}
                index={index}
                isInView={isInView}
                mousePosition={mousePosition}
                onClick={() => navigate('/blog/' + blog.slug)}
              />
            ))}
          </div>

          {/* View All */}
          <div
            className={'text-center ' + (isInView ? 'animate-fade-in' : 'opacity-0')}
            style={{ animationDelay: '0.5s' }}
          >
            <Link
              to="/blogs/all"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 p-[2px] rounded-xl">
                <div className="w-full h-full rounded-xl bg-background/95 backdrop-blur-xl" />
              </div>
              <span className="relative z-10 font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                View All Blogs
              </span>
              <ArrowRight className="relative z-10 w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50%       { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% auto; animation: gradient-x 3s ease infinite; }

        .markdown-body { color: hsl(var(--foreground) / 0.85); line-height: 1.8; font-size: 0.97rem; }
        .markdown-body h1 { font-size: 1.6rem; font-weight: 800; margin: 2rem 0 1rem; color: hsl(var(--foreground)); }
        .markdown-body h2 { font-size: 1.25rem; font-weight: 700; margin: 1.75rem 0 0.75rem; color: hsl(var(--foreground)); border-left: 3px solid hsl(var(--primary)); padding-left: 0.75rem; }
        .markdown-body h3 { font-size: 1.05rem; font-weight: 700; margin: 1.4rem 0 0.6rem; color: hsl(var(--foreground) / 0.9); }
        .markdown-body p  { margin-bottom: 1.1rem; }
        .markdown-body strong { color: hsl(var(--foreground)); font-weight: 700; }
        .markdown-body em { color: hsl(var(--foreground) / 0.8); font-style: italic; }
        .markdown-body code { font-family: 'JetBrains Mono', monospace; background: hsl(var(--primary) / 0.12); color: hsl(var(--primary)); padding: 0.15em 0.45em; border-radius: 4px; font-size: 0.88em; }
        .markdown-body blockquote { border-left: 3px solid hsl(var(--primary) / 0.5); margin: 1.5rem 0; padding: 0.75rem 1rem; background: hsl(var(--primary) / 0.06); border-radius: 0 8px 8px 0; color: hsl(var(--foreground) / 0.75); font-style: italic; }
        .markdown-body ul { list-style: none; margin: 0.5rem 0 1.2rem; padding: 0; }
        .markdown-body li { position: relative; padding-left: 1.4rem; margin-bottom: 0.45rem; }
        .markdown-body li::before { content: '\\25B8'; position: absolute; left: 0; color: hsl(var(--primary)); font-size: 0.8em; top: 0.15em; }
        .markdown-body hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 2rem 0; }
      `}</style>
    </>
  );
};

export default BlogSection;