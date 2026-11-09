import React from 'react';
import { Brain, Users, MessageSquare, Clock, Lightbulb, Target } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';

const coreStrengths = [
  {
    title: 'Analytical Problem-Solving',
    description: 'Expert at breaking down complex challenges into manageable components, identifying patterns, and developing data-driven solutions that address root causes effectively.',
    icon: Brain,
    stats: 'Strategic thinking',
  },
  {
    title: 'Leadership & Collaboration',
    description: 'Natural ability to guide teams, foster inclusive environments, and bring out the best in others while working seamlessly across diverse groups to achieve shared goals.',
    icon: Users,
    stats: 'Team synergy',
  },
  {
    title: 'Public Speaking & Communication',
    description: 'Confident presenter with the ability to articulate complex ideas clearly and persuasively to diverse audiences, from technical teams to executive stakeholders.',
    icon: MessageSquare,
    stats: 'Clear articulation',
  },
  {
    title: 'Time Management',
    description: 'Exceptional organizational skills with proven ability to prioritize tasks, meet tight deadlines, and maintain productivity while balancing multiple projects simultaneously.',
    icon: Clock,
    stats: 'Efficient execution',
  },
  {
    title: 'Creative Thinking',
    description: 'Innovative mindset that approaches problems from unique angles, generating original solutions and thinking beyond conventional boundaries to drive breakthrough results.',
    icon: Lightbulb,
    stats: 'Innovation driven',
  },
  {
    title: 'Attention to Detail',
    description: 'Meticulous approach ensuring accuracy and quality in every aspect of work, from code reviews to data analysis, catching issues before they become problems.',
    icon: Target,
    stats: 'Quality focused',
  },
];

const tilts = [-2, 1.5, -1, 2, -1.5, 1];

const StrengthsSection: React.FC = () => (
  <section id="strengths" className="relative scroll-mt-16 py-24 sm:py-32">
    <div className="wrap">
      <SectionHeading n="06" kicker="Core strengths" title={<>Observations, <em className="text-accent">pinned up</em></>} note="the non-technical half of the job" />

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {coreStrengths.map((s, i) => (
          <li
            key={s.title}
            className="note-paper reveal-tilt tape p-6 pb-8 pt-9 hover:!rotate-0"
            style={{ ['--tilt' as string]: `${tilts[i]}deg`, ['--tilt-from' as string]: `${tilts[i] * 3}deg`, transform: `rotate(${tilts[i]}deg)` }}
          >
            <div className="flex items-start justify-between gap-3">
              <span className="meta accent">Obs. {String(i + 1).padStart(2, '0')}</span>
              <s.icon className="h-5 w-5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="serif mt-3 text-[1.75rem] leading-tight">{s.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed">{s.description}</p>
            <p className="hand mt-4 text-2xl">↳ {s.stats}</p>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default StrengthsSection;
