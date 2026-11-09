import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import SectionHeading from '@/components/notebook/SectionHeading';

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
};

const LIMITS = { name: 100, email: 254, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'munjalhimansh2211@gmail.com', href: 'mailto:munjalhimansh2211@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91-9812445531', href: 'tel:+919812445531' },
  { icon: MapPin, label: 'Location', value: 'Vellore, Tamil Nadu, India' },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub', handle: '@himanshmunjal' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn', handle: 'in/himansh-munjal' },
  { icon: Instagram, href: 'https://www.instagram.com/munjal.himansh/', label: 'Instagram', handle: '@munjal.himansh' },
];

// Inline "fill in the blank" input that grows with its content
const Blank: React.FC<React.InputHTMLAttributes<HTMLInputElement> & { label: string }> = ({ label, value, ...rest }) => (
  <label className="relative inline-block align-baseline">
    <span className="sr-only">{label}</span>
    <input
      {...rest}
      value={value}
      size={Math.max(String(value ?? '').length, rest.placeholder?.length ?? 10)}
      className="hand max-w-full border-0 border-b-2 border-dashed border-[var(--rule-strong)] bg-transparent px-1 text-[1.9rem] leading-none text-ink outline-none transition-colors placeholder:text-[var(--ink-3)] placeholder:opacity-60 focus:border-[var(--accent)]"
      style={{ color: 'var(--ink)' }}
    />
  </label>
);

const ConnectSection: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSending) return;

    // Honeypot: hidden from people, but naive bots fill every field
    if (new FormData(e.currentTarget).get('company')) return;

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();
    if (!name || !message || !EMAIL_RE.test(email)) {
      setToast({ type: 'error', message: 'Please enter your name, a valid email and a message.' });
      return;
    }
    if (!EMAILJS.serviceId || !EMAILJS.templateId || !EMAILJS.publicKey) {
      setToast({ type: 'error', message: 'The contact form is unavailable right now — please email me directly.' });
      return;
    }

    setIsSending(true);
    try {
      // Loaded on demand so the SDK isn't part of the initial bundle
      const { default: emailjs } = await import('@emailjs/browser');
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        { from_name: name, reply_to: email, message },
        { publicKey: EMAILJS.publicKey, blockHeadless: true, limitRate: { id: 'contact-form', throttle: 30_000 } }
      );
      setToast({ type: 'success', message: 'Thanks! Your message was sent successfully.' });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      const tooSoon = (error as { status?: number })?.status === 429;
      if (import.meta.env.DEV) console.error('EmailJS error:', error);
      setToast({
        type: 'error',
        message: tooSoon
          ? 'You just sent a message — please wait a few seconds before sending another.'
          : 'Failed to send message. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <section id="connect" className="relative scroll-mt-16 py-24 sm:py-32">
      <div className="wrap">
        <SectionHeading n="07" kicker="Let's connect" title={<>Write me <em className="text-accent">a letter</em></>} note="internships, research, or just a good problem">
          Open to internships and collaborations in machine learning, data and full-stack engineering. Fill in the blanks
          below, or reach me directly.
        </SectionHeading>

        <div className="grid gap-12 lg:grid-cols-[20rem_1fr] lg:gap-16">
          {/* ── Contact card ── */}
          <aside className="space-y-6">
            <div className="index-card reveal p-6 pt-0">
              <p className="eyebrow flex h-[2.6rem] items-center"><span className="accent">Contact card</span></p>
              <ul className="mt-4 space-y-4">
                {contactInfo.map((info) => (
                  <li key={info.label} className="flex items-start gap-3">
                    <info.icon className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="meta">{info.label}</p>
                      {info.href ? (
                        <a href={info.href} className="link break-all text-[0.9375rem]">{info.value}</a>
                      ) : (
                        <p className="text-[0.9375rem] text-ink">{info.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <ul className="reveal space-y-2">
              {socialLinks.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-[3px] border rule bg-card px-4 py-3 transition-colors hover:border-[var(--accent)]"
                  >
                    <s.icon className="h-5 w-5 text-ink-3 transition-colors group-hover:text-accent" />
                    <span className="text-sm text-ink">{s.label}</span>
                    <span className="meta ml-auto">{s.handle} ↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>

          {/* ── The letter ── */}
          <form onSubmit={handleSubmit} noValidate className="sheet reveal relative overflow-hidden p-6 sm:p-10">
            {/* Honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <div className="flex items-start justify-between gap-4">
              <p className="meta">To: Himansh Munjal · Vellore, India</p>
              <span className="stamp hidden sm:inline-block">Air mail</span>
            </div>

            <div className="mt-8 text-lg leading-[3.1rem] text-ink-2 sm:text-xl">
              <p className="hand text-3xl" style={{ color: 'var(--ink)' }}>Dear Himansh,</p>
              <p>
                My name is{' '}
                <Blank label="Your name" name="name" placeholder="your name" autoComplete="name" required maxLength={LIMITS.name} value={formData.name} onChange={handleChange} />{' '}
                and you can reach me at{' '}
                <Blank label="Your email" name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={LIMITS.email} value={formData.email} onChange={handleChange} />.
              </p>
            </div>

            <label className="mt-4 block">
              <span className="sr-only">Your message</span>
              <textarea
                name="message"
                required
                maxLength={LIMITS.message}
                value={formData.message}
                onChange={handleChange}
                placeholder="I'm writing because…"
                rows={6}
                className="ruled hand block w-full resize-y border-0 bg-transparent text-[1.75rem] leading-[28px] outline-none placeholder:text-[var(--ink-3)] placeholder:opacity-60"
                style={{ color: 'var(--ink)', backgroundAttachment: 'local', paddingTop: '2px' }}
              />
              <span className="meta mt-1 block text-right">{formData.message.length}/{LIMITS.message}</span>
            </label>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
              <p className="hand text-3xl" style={{ color: 'var(--ink)' }}>
                Yours, {formData.name.trim() || '…'}
              </p>
              <button type="submit" className="btn" disabled={isSending}>
                {isSending ? 'Sending…' : 'Send letter'} <Send className="h-4 w-4" />
              </button>
            </div>

            {toast && (
              <div
                role={toast.type === 'error' ? 'alert' : 'status'}
                className="animate-fade-up mt-6 flex items-start gap-3 rounded-[3px] border p-4 text-sm"
                style={{ borderColor: toast.type === 'error' ? 'var(--accent)' : 'var(--rule-strong)', background: 'var(--paper-2)' }}
              >
                {toast.type === 'success' ? (
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-ink" />
                ) : (
                  <AlertCircle className="h-5 w-5 shrink-0 text-accent" />
                )}
                <span className="text-ink">{toast.message}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
