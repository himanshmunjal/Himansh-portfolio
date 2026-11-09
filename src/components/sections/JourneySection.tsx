import React from 'react';
import { GraduationCap, Award, Star, Briefcase } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';
import Annotation from '@/components/notebook/Annotation';

const education = [
  {
    institution: 'Pratap Public School, Karnal, Haryana',
    degree: 'Secondary – CBSE',
    date: 'July 2021',
    result: 'First Division | 93.2%',
    icon: Star,
  },
  {
    institution: 'Parth Public School, Karnal, Haryana',
    degree: 'Senior Secondary(Mathematics) – CBSE',
    date: 'May 2023',
    result: 'Merit | 87.8%',
    icon: Award,
  },
  {
    institution: 'Vellore Institute of Technology, Vellore, Tamil Nadu',
    degree: 'Bachelor of Technology – Computer Science and Engineering',
    specialization: 'Data Science',
    cgpa: '8.58',
    status: 'Expected 2027',
    icon: GraduationCap,
  },
];

const experience = [
  {
    company: 'Beryl System Pvt. Ltd.',
    role: 'Full Stack Intern – Web',
    duration: 'May 2025 – June 2025',
    description: 'As a Full Stack Intern at Beryl System Pvt. Ltd., I actively developed scalable web applications using Go, React, and PostgreSQL. My work involved integrating secure APIs, optimizing database performance, and ensuring smooth communication between frontend and backend systems. I tackled authentication challenges and CORS issues, applying best practices to create efficient and secure applications.',
    icon: Briefcase,
    skills: ['Go', 'React', 'PostgreSQL', 'API Integration'],
  },
];

// Two separate logs, each newest first
type Entry =
  | { kind: 'education'; when: string; data: (typeof education)[number] }
  | { kind: 'experience'; when: string; data: (typeof experience)[number] };

const experienceLog: Entry[] = experience.map((e) => ({ kind: 'experience', when: e.duration, data: e }));

const educationLog: Entry[] = [
  { kind: 'education', when: 'Now → 2027', data: education[2] },
  { kind: 'education', when: education[1].date, data: education[1] },
  { kind: 'education', when: education[0].date, data: education[0] },
];

const EntryCard: React.FC<{ entry: Entry; first: boolean }> = ({ entry, first }) => {
  const Icon = entry.data.icon;
  return (
    <li className="reveal relative grid gap-3 pb-12 pl-10 last:pb-0 md:grid-cols-[10rem_1fr] md:gap-12 md:pl-0">
      {/* date */}
      <div className="md:pt-5 md:text-right">
        <p className="meta text-ink">{entry.when}</p>
        <span className={`stamp mt-2 ${entry.kind === 'experience' ? '' : 'stamp-ink'}`}>{entry.kind}</span>
      </div>

      {/* node */}
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 border-[var(--accent)] bg-paper md:left-[11rem] md:top-5"
      >
        <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
      </span>

      {/* card */}
      {entry.kind === 'education' ? (
        <article className="sheet relative p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border rule bg-paper-2 text-accent">
              <Icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="serif text-2xl leading-tight sm:text-3xl">{entry.data.institution}</h3>
              <p className="mt-1 text-[0.9375rem] text-ink-2">{entry.data.degree}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {'specialization' in entry.data && entry.data.specialization && (
                  <span className="tag">Specialization · {entry.data.specialization}</span>
                )}
                {'cgpa' in entry.data && entry.data.cgpa && <span className="tag">CGPA · {entry.data.cgpa}</span>}
                {'status' in entry.data && entry.data.status && <span className="tag">{entry.data.status}</span>}
                {'result' in entry.data && entry.data.result && <span className="tag">{entry.data.result}</span>}
              </div>
            </div>
            {'cgpa' in entry.data && entry.data.cgpa && (
              <p className="hidden text-right sm:block">
                <span className="serif block text-5xl leading-none text-ink">{entry.data.cgpa}</span>
                <span className="meta">CGPA</span>
              </p>
            )}
          </div>
          {first && (
            <Annotation dir="down-left" className="absolute -top-12 right-24 hidden xl:inline-flex" arrowFirst={false} rotate={2}>
              currently here
            </Annotation>
          )}
        </article>
      ) : (
        <article className="index-card ruled relative p-6 pt-3 sm:p-7 sm:pt-3">
          <div className="flex h-8 items-center justify-between gap-4">
            <p className="eyebrow"><span className="accent">Field work</span> · Internship</p>
            <Icon className="h-4 w-4 text-accent" aria-hidden="true" />
          </div>
          <h3 className="serif mt-5 text-3xl leading-tight">{entry.data.role}</h3>
          <p className="meta mt-1 text-ink-2">{entry.data.company}</p>
          <p className="mt-4 text-[0.9375rem] leading-[1.75rem]">{entry.data.description}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {entry.data.skills.map((s) => (
              <li key={s} className="tag">{s}</li>
            ))}
          </ul>
        </article>
      )}
    </li>
  );
};

const Timeline: React.FC<{ title: string; entries: Entry[]; annotateFirst?: boolean }> = ({ title, entries, annotateFirst }) => (
  <div>
    <h3 className="eyebrow mb-8 flex items-center gap-3">
      <span className="accent">{title}</span>
      <span className="h-px flex-1 bg-[var(--rule-strong)]" aria-hidden="true" />
    </h3>
    <ol className="relative">
      {/* the timeline rule */}
      <span aria-hidden="true" className="absolute bottom-0 left-[0.6875rem] top-2 border-l-2 border-dashed rule md:left-[11.6875rem]" />
      {entries.map((entry, i) => (
        <EntryCard key={i} entry={entry} first={!!annotateFirst && i === 0} />
      ))}
    </ol>
  </div>
);

const JourneySection: React.FC = () => (
  <section id="journey" className="relative scroll-mt-16 py-24 sm:py-32">
    <div className="wrap">
      <SectionHeading n="02" kicker="My journey" title={<>Education &amp; <em className="text-accent">experience</em></>} note="the log so far, newest entry first" />

      <div className="space-y-20">
        <Timeline title="Experience" entries={experienceLog} />
        <Timeline title="Education" entries={educationLog} annotateFirst />
      </div>
    </div>
  </section>
);

export default JourneySection;
