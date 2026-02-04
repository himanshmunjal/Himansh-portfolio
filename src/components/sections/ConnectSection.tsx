// import React, { useState } from 'react';
// import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, Send } from 'lucide-react';
// import { useInView } from '@/hooks/useInView';

// const contactInfo = [
//   { icon: Mail, label: 'Email', value: 'himansh.munjal@gmail.com', href: 'mailto:himansh.munjal@gmail.com' },
//   { icon: Phone, label: 'Phone', value: '+91-XXXXXXXXXX', href: 'tel:+91XXXXXXXXXX' },
//   { icon: MapPin, label: 'Location', value: 'Vellore, Tamil Nadu, India' },
// ];

// const socialLinks = [
//   { icon: Github, href: 'https://github.com', label: 'GitHub' },
//   { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
//   { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
//   { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
// ];

// const ConnectSection: React.FC = () => {
//   const { ref, isInView } = useInView({ threshold: 0.1 });
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: '',
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log('Form submitted:', formData);
//     alert('Thank you for your message! I will get back to you soon.');
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   return (
//     <section id="connect" className="py-20 relative" ref={ref}>
//       {/* Background */}
//       <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
//       {/* Gradient Orbs */}
//       <div className="absolute inset-0 pointer-events-none overflow-hidden">
//         <div className="gradient-orb gradient-orb-pink w-[400px] h-[400px] -top-10 right-0" style={{ animationDelay: '2s' }} />
//         <div className="gradient-orb gradient-orb-primary w-[350px] h-[350px] bottom-0 -left-10" style={{ animationDelay: '4s' }} />
//       </div>
      
//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section Heading */}
//         <h2 className={`section-heading ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
//           <span className="gradient-text-vibrant">Let's Connect</span>
//         </h2>

//         <div className={`max-w-5xl mx-auto ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
//           <div className="animated-gradient-border">
//             <div className="glass-card p-8 md:p-12 rounded-xl">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//                 {/* Contact Info */}
//                 <div>
//                   <h3 className="text-xl font-bold mb-6 gradient-text">Get in Touch</h3>

//                   <div className="space-y-6 mb-8">
//                     {contactInfo.map((info) => (
//                       <div key={info.label} className="flex items-center gap-4">
//                         <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center">
//                           <info.icon className="w-5 h-5 text-primary" />
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">{info.label}</p>
//                           {info.href ? (
//                             <a
//                               href={info.href}
//                               className="text-foreground hover:text-primary transition-colors"
//                             >
//                               {info.value}
//                             </a>
//                           ) : (
//                             <p className="text-foreground">{info.value}</p>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Social Links */}
//                   <div>
//                     <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
//                     <div className="flex items-center gap-4">
//                       {socialLinks.map((social) => (
//                         <a
//                           key={social.label}
//                           href={social.href}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 flex items-center justify-center hover:from-primary/20 hover:to-purple-500/20 transition-colors group"
//                           aria-label={social.label}
//                         >
//                           <social.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
//                         </a>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Contact Form */}
//                 <div>
//                   <h3 className="text-xl font-bold mb-6 gradient-text">Send a Message</h3>

//                   <form onSubmit={handleSubmit} className="space-y-6">
//                     <div>
//                       <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
//                         Name
//                       </label>
//                       <input
//                         type="text"
//                         id="name"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
//                         placeholder="Your name"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
//                         Email
//                       </label>
//                       <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                         required
//                         className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all"
//                         placeholder="your.email@example.com"
//                       />
//                     </div>

//                     <div>
//                       <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
//                         Message
//                       </label>
//                       <textarea
//                         id="message"
//                         name="message"
//                         value={formData.message}
//                         onChange={handleChange}
//                         required
//                         rows={4}
//                         className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-border/50 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent transition-all resize-none"
//                         placeholder="Your message..."
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       className="w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg gradient-button-vibrant hover:opacity-90 transition-all glow-vibrant"
//                     >
//                       <Send className="w-5 h-5" />
//                       <span>Send Message</span>
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ConnectSection;

import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Github, Linkedin, Instagram, Twitter, Send, Sparkles, MessageCircle, Heart } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const contactInfo = [
  { 
    icon: Mail, 
    label: 'Email', 
    value: 'munjalhimansh2211@gmail.com', 
    href: 'mailto:munjalhimansh2211@gmail.com',
    color: 'from-blue-500 to-cyan-500',
  },
  { 
    icon: Phone, 
    label: 'Phone', 
    value: '+91-9812445531', 
    href: 'tel:+919812445531',
    color: 'from-emerald-500 to-teal-500',
  },
  { 
    icon: MapPin, 
    label: 'Location', 
    value: 'Vellore, Tamil Nadu, India',
    color: 'from-purple-500 to-pink-500',
  },
];

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'from-gray-500 to-gray-700' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'from-blue-500 to-blue-600' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram', color: 'from-pink-500 to-purple-500' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'from-sky-400 to-blue-500' },
];

const ConnectSection: React.FC = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Particle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
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
      'rgba(236, 72, 153, 0.6)',
      'rgba(168, 85, 247, 0.6)',
      'rgba(59, 130, 246, 0.6)',
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

      particles.forEach(particle => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.shadowBlur = 20;
        ctx.shadowColor = particle.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw connections
        particles.forEach(otherParticle => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! I will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="connect" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Background */}
      <div className="absolute inset-0 bg-[image:var(--gradient-mesh)] opacity-40" />
      
      {/* Dynamic Gradient Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="gradient-orb gradient-orb-pink w-[600px] h-[600px] -top-40 right-0 blur-3xl"
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
        <div 
          className="gradient-orb gradient-orb-primary w-[550px] h-[550px] bottom-0 -left-40 blur-3xl"
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            transition: 'transform 0.3s ease-out',
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Heading */}
        <div className={`text-center mb-16 ${isInView ? 'animate-fade-in' : 'opacity-0'}`}>
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-pulse" />
            <MessageCircle className="w-6 h-6 text-primary animate-bounce" />
            <Heart className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="h-px w-12 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-pulse" />
          </div>
          
          <h2 className="section-heading relative inline-block">
            <span className="gradient-text-vibrant relative">
              Let's Connect
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full animate-gradient-x" />
            </span>
          </h2>
          
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </div>

        <div className={`max-w-5xl mx-auto ${isInView ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
          <div className="group relative">
            {/* Animated border glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative glass-card p-8 md:p-12 rounded-2xl backdrop-blur-xl bg-background/40 border border-primary/20">
              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-2xl" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
                {/* Contact Info */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Sparkles className="w-6 h-6 text-primary animate-pulse" />
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
                          <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-foreground hover:text-transparent hover:bg-gradient-to-r hover:bg-clip-text hover:from-purple-400 hover:to-pink-400 transition-all duration-300 font-medium"
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-foreground font-medium">{info.value}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div>
                    <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-primary" />
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
                          <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} opacity-20 group-hover/social:opacity-100 flex items-center justify-center transition-all duration-300 transform group-hover/social:scale-110 group-hover/social:rotate-12`}>
                            <social.icon className="w-5 h-5 text-white" />
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Send className="w-6 h-6 text-primary animate-pulse" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                      Send a Message
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        Name
                        {focusedField === 'name' && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
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
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border-2 border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background/70 transition-all backdrop-blur-sm"
                          placeholder="Your name"
                        />
                        {focusedField === 'name' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        Email
                        {focusedField === 'email' && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
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
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border-2 border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background/70 transition-all backdrop-blur-sm"
                          placeholder="your.email@example.com"
                        />
                        {focusedField === 'email' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        Message
                        {focusedField === 'message' && <Sparkles className="w-3 h-3 text-primary animate-pulse" />}
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
                          className="w-full px-4 py-3 rounded-xl bg-background/50 border-2 border-primary/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:bg-background/70 transition-all resize-none backdrop-blur-sm"
                          placeholder="Your message..."
                        />
                        {focusedField === 'message' && (
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 blur-xl -z-10 animate-pulse" />
                        )}
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="group/button relative w-full overflow-hidden"
                    >
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 opacity-75 blur-lg group-hover/button:opacity-100 transition-opacity duration-300" />
                      
                      {/* Button */}
                      <div className="relative flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold transform group-hover/button:scale-105 transition-all duration-300">
                        <Send className="w-5 h-5 group-hover/button:translate-x-1 transition-transform" />
                        <span>Send Message</span>
                        
                        {/* Shimmer */}
                        <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                      </div>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% auto;
          animation: gradient-x 3s ease infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
};

export default ConnectSection;