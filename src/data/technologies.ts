// The toolkit as a periodic table: every technology is an "element".
// `group` sets which family it belongs to; like a real periodic table, each family gets a colour,
// and the list is ordered by family so the colours sit together.
// 45 elements = 5 full rows of the 9-column desktop grid; keep it a multiple of 9 if you can.
export const technologies = [
  // Languages
  { name: 'Python', sym: 'Py', icon: '🐍', group: 'lang' },
  { name: 'Go', sym: 'Go', icon: '🔷', group: 'lang' },
  { name: 'Java', sym: 'Ja', icon: '☕', group: 'lang' },
  { name: 'SQL', sym: 'Sq', icon: '🗃️', group: 'lang' },
  { name: 'R', sym: 'R', icon: '📊', group: 'lang' },
  { name: 'Bash', sym: 'Sh', icon: '💲', group: 'lang' },

  // ML & AI
  { name: 'Machine Learning', sym: 'Ml', icon: '🤖', group: 'ml' },
  { name: 'PyTorch', sym: 'Pt', icon: '🔥', group: 'ml' },
  { name: 'Scikit-learn', sym: 'Sk', icon: '🔬', group: 'ml' },
  { name: 'LightGBM', sym: 'Lg', icon: '🌲', group: 'ml' },
  { name: 'TensorFlow', sym: 'Tf', icon: '🧠', group: 'ml' },
  { name: 'Hugging Face', sym: 'Hf', icon: '🤗', group: 'ml' },
  { name: 'LLMs & RAG', sym: 'Ll', icon: '💬', group: 'ml' },
  { name: 'NLP', sym: 'Nl', icon: '📝', group: 'ml' },
  { name: 'SciPy & Stats', sym: 'Sp', icon: '📐', group: 'ml' },

  // Data
  { name: 'Pandas', sym: 'Pd', icon: '🐼', group: 'data' },
  { name: 'NumPy', sym: 'Np', icon: '🔢', group: 'data' },
  { name: 'PostgreSQL', sym: 'Pg', icon: '🐘', group: 'data' },
  { name: 'Redis', sym: 'Rd', icon: '🟥', group: 'data' },
  { name: 'BigQuery', sym: 'Bq', icon: '☁️', group: 'data' },
  { name: 'DVC', sym: 'Dv', icon: '🗂️', group: 'data' },

  // Visualisation
  { name: 'Power BI', sym: 'Pb', icon: '📈', group: 'viz' },
  { name: 'Tableau', sym: 'Tb', icon: '📉', group: 'viz' },
  { name: 'Streamlit', sym: 'St', icon: '👑', group: 'viz' },
  { name: 'Matplotlib', sym: 'Mp', icon: '📊', group: 'viz' },
  { name: 'Seaborn', sym: 'Sb', icon: '🌊', group: 'viz' },

  // Web & APIs
  { name: 'React.js', sym: 'Re', icon: '⚛️', group: 'web' },
  { name: 'Tailwind CSS', sym: 'Tw', icon: '🎨', group: 'web' },
  { name: 'FastAPI', sym: 'Fa', icon: '⚡', group: 'web' },
  { name: 'Gin', sym: 'Gn', icon: '🍸', group: 'web' },
  { name: 'WebSockets', sym: 'Ws', icon: '🔌', group: 'web' },
  { name: 'JWT', sym: 'Jw', icon: '🔐', group: 'web' },

  // Tooling
  { name: 'Git', sym: 'Gi', icon: '🔀', group: 'tools' },
  { name: 'GitHub', sym: 'Gh', icon: '🐙', group: 'tools' },
  { name: 'GitHub Actions', sym: 'Ga', icon: '⚙️', group: 'tools' },
  { name: 'Docker', sym: 'Dk', icon: '🐳', group: 'tools' },
  { name: 'Linux', sym: 'Lx', icon: '🐧', group: 'tools' },
  { name: 'Jupyter', sym: 'Ju', icon: '📓', group: 'tools' },
];
