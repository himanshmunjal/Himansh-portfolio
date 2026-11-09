import React, { useEffect, useState } from 'react';
import { Briefcase, Code, Award, Target, TrendingUp, Zap } from 'lucide-react';
import { useInView } from '@/hooks/useInView';
import SectionHeading from '@/components/notebook/SectionHeading';
import Annotation from '@/components/notebook/Annotation';
import GitHubActivity from '@/components/notebook/GitHubActivity';

const achievementStats = [
  { icon: Briefcase, value: '2+', label: 'Years Experience' },
  { icon: Code, value: '10+', label: 'Projects Built' },
  { icon: Award, value: '5+', label: 'Hackathons' },
];

const skills = [
  { name: 'Machine Learning', level: 95, icon: Target },
  { name: 'Full Stack Dev', level: 90, icon: Code },
  { name: 'Data Analytics', level: 92, icon: TrendingUp },
  { name: 'Problem Solving', level: 88, icon: Zap },
];

const floatingWords = ['Innovate', 'Create', 'Analyze', 'Build', 'Transform', 'Optimize'];

const AboutSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });
  const [counts, setCounts] = useState(achievementStats.map(() => 0));

  // Count the stats up once the section is visible
  useEffect(() => {
    if (!isInView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCounts(achievementStats.map((s) => parseInt(s.value)));
      return;
    }
    let frame = 0;
    const total = 36;
    const id = setInterval(() => {
      frame++;
      setCounts(achievementStats.map((s) => Math.round((parseInt(s.value) * Math.min(frame, total)) / total)));
      if (frame >= total) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [isInView]);

  return (
    <section id="about" className="relative scroll-mt-16 py-24 sm:py-32" ref={ref}>
      <div className="wrap">
        <SectionHeading n="01" kicker="About me" title={<>The person behind <em className="text-accent">the notebook</em></>} note="Data Science · Data Analyst · Full Stack enthusiast" />

        <div className="grid gap-14 lg:grid-cols-[22rem_1fr] lg:gap-20">
          {/* ── Portrait + stats ── */}
          <div className="relative">
            <figure
              className="reveal-tilt tape relative mx-auto w-[min(100%,19rem)] bg-card p-3 pb-14 shadow-[var(--shadow)] lg:mx-0"
              style={{ ['--tilt' as string]: '-2.5deg', ['--tilt-from' as string]: '-8deg', transform: 'rotate(-2.5deg)' }}
            >
              <img
                src="/images/profile.webp"
                alt="Portrait of Himansh Munjal"
                width={360}
                height={360}
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="hand absolute inset-x-0 bottom-3 text-center text-2xl" style={{ color: 'var(--ink)' }}>
                Himansh, in the lab
              </figcaption>
            </figure>

            <dl className="mt-12 grid grid-cols-3 gap-3">
              {achievementStats.map((stat, i) => (
                <div key={stat.label} className="sheet reveal flex flex-col items-start p-3 sm:p-4">
                  <stat.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                  {/* dt must come before dd in the markup; flex order puts the number on top */}
                  <dt className="meta order-2 mt-1 leading-tight">{stat.label}</dt>
                  <dd className="serif order-1 mt-2 text-4xl leading-none text-ink">{counts[i]}+</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ── Text + skills ── */}
          <div className="relative">
            <div className="reveal space-y-5 text-[1.0625rem] leading-[1.8]">
              <p className="text-xl leading-relaxed text-ink">
                Hi, I&apos;m <span className="highlight highlight-sweep">Himansh Munjal</span>, a passionate technology
                enthusiast focused on Data Science, Data Analytics, and Full Stack Development.
              </p>
              <p>
                I specialize in building <strong className="text-ink">end-to-end machine learning pipelines</strong>,
                predictive models, and scalable applications that transform raw data into actionable insights.
              </p>
              <p>
                With experience across React, Golang, PostgreSQL, and modern ML frameworks, I enjoy solving complex
                problems at the intersection of <span className="highlight highlight-sweep">analytics and engineering</span>.
              </p>
              <p>
                Driven by curiosity and continuous learning, I aim to build intelligent systems that create meaningful
                real-world impact.
              </p>
            </div>

            {/* Skill calibration */}
            <div className="sheet reveal relative mt-12 p-6 sm:p-7">
              <p className="eyebrow mb-6"><span className="accent">Table 1</span> · Core competencies</p>
              <ul className="space-y-5">
                {skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <span className="flex items-center gap-2 text-sm font-medium text-ink">
                        <skill.icon className="h-4 w-4 text-accent" aria-hidden="true" />
                        {skill.name}
                      </span>
                      <span className="meta text-ink">{skill.level}%</span>
                    </div>
                    <div className="relative h-3 overflow-hidden rounded-[2px] border rule bg-paper" role="meter" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100} aria-label={skill.name}>
                      <div className="hatch bar-grow h-full" style={{ width: `${skill.level}%` }} />
                      {/* tick marks every 25% */}
                      {[25, 50, 75].map((t) => (
                        <span key={t} className="absolute inset-y-0 border-l rule" style={{ left: `${t}%` }} aria-hidden="true" />
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
              <Annotation dir="up-left" className="absolute -bottom-10 right-4 hidden sm:inline-flex" rotate={-4}>
                self-assessed, honestly
              </Annotation>
            </div>
          </div>
        </div>

        {/* ── Live activity + keywords ── */}
        <div className="mt-24 grid grid-cols-[minmax(0,1fr)] items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="sheet reveal p-6 sm:p-7">
            <p className="eyebrow mb-4"><span className="accent">Fig. 2</span> · Lab activity</p>
            <GitHubActivity user="himanshmunjal" />
          </div>
          <div className="reveal">
            <p className="eyebrow mb-4">Working principles</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {floatingWords.map((word, i) => (
                <li
                  key={word}
                  className="serif text-4xl text-ink sm:text-5xl"
                  style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}
                >
                  {word}
                  <span className="text-accent">.</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
