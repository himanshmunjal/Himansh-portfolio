// Blog metadata. Each slug must have a matching file in src/components/blogs/<slug>.md
export const allBlogs = [
  {
    id: 1,
    slug: 'concurrency-bottlenecks-in-java-caches',
    title: "Concurrency Bottlenecks in Java Caches: Coarse Locks vs Segmented Locking vs Lock-Free Designs",
    excerpt: "Building a high-performance cache is not just about choosing the right data structure—it is about managing contention between threads. In this article, I explore the trade-offs between coarse-grained locking, segmented locking, and lock-free designs while developing JCache, a distributed in-memory cache server in Java. Through real benchmark results and engineering lessons, I show why reducing contention often has a greater impact on scalability than optimizing individual operations.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=500&fit=crop&q=80",
    tags: ["Concurrency", "Java", "Cache", "Segmented Cache", "Coarse Lock", "Lock-Free"],
    readTime: "7 min read",
    views: "5.1k",
    category: "Technical Deep Dive",
    categoryColor: "#3b82f6"
  },
  {
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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
  {
    id: 7,
    slug: 'from-scattered-focus-to-clarity',
    title: "From Scattered Focus to Strategic Clarity: Why Doing Everything Was Holding Me Back",
    excerpt: "I found myself jumping between Data Science, DSA, iOS, backend, and more—constantly learning but never compounding. This is how I realized that confusion wasn’t my weakness, lack of focus was, and why choosing fewer, aligned skills changed everything.",
    image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=500&fit=crop&q=80",
    tags: ["Productivity", "Learning", "Focus", "Career", "SelfGrowth"],
    readTime: "7 min read",
    views: "5.1k",
    category: "Career",
    categoryColor: "#3b82f6"
  },
];

export type Blog = (typeof allBlogs)[number];

// Post bodies are split into their own chunks and only fetched when opened
export const blogLoaders: Record<string, () => Promise<{ default: string }>> = {
  'concurrency-bottlenecks-in-java-caches': () => import('../components/blogs/concurrency-bottlenecks-in-java-caches.md?raw'),
  'full-stack-airport-management':          () => import('../components/blogs/full-stack-airport-management.md?raw'),
  'data-science-notebook-to-production':    () => import('../components/blogs/data-science-notebook-to-production.md?raw'),
  'roberta-disaster-tweet-triage':          () => import('../components/blogs/roberta-disaster-tweet-triage.md?raw'),
  'finguard-deep-learning-architecture':    () => import('../components/blogs/finguard-deep-learning-architecture.md?raw'),
  'explainability-crisis-black-box-ai':     () => import('../components/blogs/explainability-crisis-black-box-ai.md?raw'),
  'from-scattered-focus-to-clarity':        () => import('../components/blogs/from-scattered-focus-to-clarity.md?raw'),
};

export const postNo = (id: number) => `No. ${String(id).padStart(2, '0')}`;
