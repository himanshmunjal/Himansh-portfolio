import React from 'react';
import { Code, Brain, BarChart3, Rocket, Calculator, Wrench } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';

const skillCategories = [
  {
    title: 'Programming Languages',
    icon: Code,
    skills: [
      { name: 'Python', level: 90 },
      { name: 'Java', level: 85 },
      { name: 'Go', level: 80 },
      { name: 'C/C++', level: 75 },
      { name: 'SQL', level: 82 },
      { name: 'R', level: 70 },
    ],
  },
  {
    title: 'Data Science',
    icon: Brain,
    skills: [
      { name: 'Machine Learning', level: 88 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'Deep Learning', level: 72 },
      { name: 'NLP', level: 78 },
      { name: 'Prefect', level: 60 },
      { name: 'MLflow', level: 65 },
    ],
  },
  {
    title: 'Data Analysis & Visualization',
    icon: BarChart3,
    skills: [
      { name: 'NumPy', level: 88 },
      { name: 'Pandas', level: 90 },
      { name: 'Matplotlib', level: 80 },
      { name: 'Seaborn', level: 78 },
      { name: 'Power BI', level: 75 },
      { name: 'Tableau', level: 65 },
    ],
  },
  {
    title: 'Full Stack Development',
    icon: Rocket,
    skills: [
      { name: 'React.js', level: 82 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Golang', level: 65 },
      { name: 'FastAPI', level: 70 },
      { name: 'JWT', level: 72 },
      { name: 'MongoDB', level: 60 },
      { name: 'PostgreSQL', level: 75 },
    ],
  },
  {
    title: 'Mathematics & Algorithms',
    icon: Calculator,
    skills: [
      { name: 'Linear Algebra', level: 80 },
      { name: 'Statistics', level: 82 },
      { name: 'Probability', level: 78 },
      { name: 'Multivariable Calculus', level: 72 },
      { name: 'Differential Equations', level: 70 },
      { name: 'Complex Variables', level: 80 },
    ],
  },
  {
    title: 'Other Skills',
    icon: Wrench,
    skills: [
      { name: 'Git', level: 85 },
      { name: 'GitHub', level: 88 },
      { name: 'Linux CLI', level: 75 },
      { name: 'Bash Scripting', level: 68 },
      { name: 'Shell Utility', level: 65 },
      { name: 'System Design', level: 70 },
    ],
  },
];

const SkillsSection: React.FC = () => (
  <section id="skills" className="relative scroll-mt-16 py-24 sm:py-32">
    <div className="wrap">
      <SectionHeading n="03" kicker="Skills" title={<>Technical <em className="text-accent">specimens</em></>} note="six families, one bar each, with honest levels">
        A breakdown of what I work with, grouped the way I actually use it, from languages to the maths underneath.
      </SectionHeading>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {skillCategories.map((cat, ci) => (
          <article key={cat.title} className="index-card reveal relative p-6 pt-0">
            <header className="flex h-[2.6rem] items-center justify-between">
              <p className="eyebrow">
                <span className="accent">Specimen {String.fromCharCode(65 + ci)}</span>
              </p>
              <cat.icon className="h-4 w-4 text-accent" aria-hidden="true" />
            </header>
            <h3 className="serif mt-4 text-[1.75rem] leading-tight">{cat.title}</h3>

            <ul className="mt-5 space-y-3.5">
              {cat.skills.map((s) => (
                <li key={s.name} className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1.5">
                  <span className="text-sm text-ink">{s.name}</span>
                  <span className="meta">{s.level}</span>
                  <span className="relative col-span-2 h-1.5 rounded-full bg-paper-2" aria-hidden="true">
                    <span
                      className="bar-grow absolute inset-y-0 left-0 rounded-full"
                      style={{ width: `${s.level}%`, background: s.level >= 85 ? 'var(--accent-mark)' : 'var(--baseline-mark)' }}
                    />
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <p className="meta mt-6 flex items-center gap-2">
        <span className="inline-block h-1.5 w-4 rounded-full" style={{ background: 'var(--accent-mark)' }} /> 85 and above
        <span className="ml-4 inline-block h-1.5 w-4 rounded-full" style={{ background: 'var(--baseline-mark)' }} /> below 85
        <span className="ml-4">· levels are self-assessed, out of 100</span>
      </p>
    </div>
  </section>
);

export default SkillsSection;
