import React from 'react';
import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/munjal.himansh/', label: 'Instagram' },
];

const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative mt-10 border-t rule">
      <div className="wrap py-12">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="hand text-3xl">— end of notebook (for now) —</p>
            <p className="serif mt-2 text-3xl text-ink">Himansh Munjal</p>
            <p className="meta mt-1">Data Science · Data Analytics · Full Stack</p>
          </div>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border rule bg-card text-ink-3 transition-all hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-accent"
              >
                <social.icon className="h-[18px] w-[18px]" />
              </a>
            ))}
            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="ml-2 grid h-10 w-10 place-items-center rounded-full bg-[var(--ink)] text-paper transition-transform hover:-translate-y-0.5"
            >
              <ArrowUp className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-dashed rule pt-6 sm:flex-row sm:justify-between">
          <p className="meta">© {new Date().getFullYear()} Himansh Munjal. All rights reserved.</p>
          <p className="meta">Set in Instrument Serif, Inter, JetBrains Mono &amp; Caveat · Built with React</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
