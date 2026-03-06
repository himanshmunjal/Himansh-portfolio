import React, { useState, useEffect, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Send,
  Sparkles,
  CheckCircle,
  XCircle,
} from "lucide-react";

import { useInView } from "@/hooks/useInView";
import emailjs from "@emailjs/browser";
const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "munjalhimansh2211@gmail.com",
    href: "mailto:munjalhimansh2211@gmail.com",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91-9812445531",
    href: "tel:+919812445531",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Vellore, Tamil Nadu, India",
    color: "from-purple-500 to-pink-500",
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com/himanshmunjal', label: 'GitHub', color: "from-gray-500 to-gray-700" },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/himansh-munjal/', label: 'LinkedIn', color: "from-blue-500 to-blue-600" },
  { icon: Instagram, href: "https://www.instagram.com/munjal.himansh/", label: 'Instagram', color: "from-pink-500 to-purple-500" },
];

const ConnectSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [toast, setToast] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  /* ==============================
     AUTO CLOSE TOAST
  ============================== */
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  /* ==============================
     PARTICLES
  ============================== */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
    }

    const colors = [
      "rgba(236,72,153,0.6)",
      "rgba(168,85,247,0.6)",
      "rgba(59,130,246,0.6)",
    ];

    const particles: Particle[] = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 4 + 2,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  /* ==============================
     HANDLERS
  ============================== */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      // Use the emailjs object imported at the top of your file
      await emailjs.send(
        // Replace with your EmailJS public key
        "service_g02b7qp",
        "template_7hopjmh",
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "xc6Qd4zsm5eP2i4Zf"
      );

      setToast({
        type: "success",
        message: `Thanks ${formData.name}! Message sent successfully.`,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setToast({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSending(false);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="connect" className="py-20 relative overflow-hidden" ref={ref}>
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold gradient-text-vibrant">
            Let's Connect
          </h2>
          <p className="mt-4 text-gray-400">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </div>

        {/* BOXED DESIGN START */}
        <div className={`max-w-5xl mx-auto ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="group relative">
            {/* Animated border glow (Glassmorphism gradient) */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-500 opacity-60 blur-3xl group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />

            <div className="relative glass-card p-8 md:p-12 rounded-2xl backdrop-blur-3xl 
            bg-gradient-to-br from-[#1a1a2e]/60 via-[#16213e]/70 to-[#0f172a]/80
            border border-purple-500/20 shadow-[0_0_60px_rgba(168,85,247,0.2)] overflow-hidden">

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* CONTACT INFO */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Get in Touch
                    </h3>
                  </div>

                  <div className="space-y-6 mb-8">
                    {contactInfo.map((info, idx) => (
                      <div
                        key={info.label}
                        className="group/item flex items-center gap-4 animate-fade-in"
                        style={{ animationDelay: `${0.3 + idx * 0.1}s` }}
                      >
                        <div className="relative">
                          {/* Glow effect */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${info.color} opacity-0 group-hover/item:opacity-50 blur-lg transition-opacity duration-300`} />

                          {/* Icon container */}
                          <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center transform group-hover/item:scale-110 group-hover/item:rotate-6 transition-all duration-300`}>
                            <info.icon className="w-6 h-6 text-white" />
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-white hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-white font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div>
                    <p className="text-sm text-gray-400 mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      Follow me on
                    </p>
                    <div className="flex items-center gap-4">
                      {socialLinks.map((social, idx) => (
                        <a
                          key={social.label}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/social relative"
                          aria-label={social.label}
                          style={{
                            animation: 'float 3s ease-in-out infinite',
                            animationDelay: `${idx * 0.2}s`,
                          }}
                        >
                          {/* Glow */}
                          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${social.color} opacity-0 group-hover/social:opacity-50 blur-lg transition-opacity duration-300`} />

                          {/* Button */}
                          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} opacity-70 group-hover/social:opacity-100 flex items-center justify-center transition-all duration-300 transform group-hover/social:scale-110 group-hover/social:rotate-12`}>
                            <social.icon className="w-5 h-5 text-white" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Send className="w-6 h-6 text-teal-400 animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Send a Message
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                        Name
                        {focusedField === 'name' && <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" />}
                      </label>
                      <div className="relative group/input">
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all backdrop-blur-md"
                          placeholder="Your name"
                        />
                        {focusedField === 'name' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                        Email
                        {focusedField === 'email' && <Sparkles className="w-3 h-3 text-blue-400 animate-pulse" />}
                      </label>
                      <div className="relative group/input">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('email')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all backdrop-blur-md"
                          placeholder="your.email@example.com"
                        />
                        {focusedField === 'email' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                        Message
                        {focusedField === 'message' && <Sparkles className="w-3 h-3 text-teal-400 animate-pulse" />}
                      </label>
                      <div className="relative group/input">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('message')}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-purple-400/30 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:bg-white/15 transition-all resize-none backdrop-blur-md"
                          placeholder="Your message..."
                        />
                        {focusedField === 'message' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="group/button relative w-full overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover/button:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold transform group-hover/button:scale-[1.02] transition-all duration-300">
                        {isSending ? (
                          <>
                            <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                            <span>Send Message</span>
                          </>
                        )}
                        <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* BOXED DESIGN END */}
      </div>

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            className={`flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-xl border shadow-xl ${toast.type === "success"
                ? "bg-green-500/20 border-green-400/40"
                : "bg-red-500/20 border-red-400/40"
              }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="text-green-400 w-5 h-5" />
            ) : (
              <XCircle className="text-red-400 w-5 h-5" />
            )}
            <p className="text-white text-sm">{toast.message}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ConnectSection;