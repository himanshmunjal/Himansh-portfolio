import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import DoorAnimation from '@/components/DoorAnimation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechStrip from '@/components/sections/TechStrip';
import JourneySection from '@/components/sections/JourneySection';
import SkillsSection from '@/components/sections/SkillsSection';
import QuoteSection from '@/components/sections/QuoteSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection, { allBlogs } from '@/components/sections/BlogSection';
import ConnectSection from '@/components/sections/ConnectSection';
import StrengthsSection from '@/components/sections/StrengthsSection'
import SectionDivider from '@/components/common/SectionDivider';
import SectionDivider1 from '@/components/common/SectionDivider1';
import SectionDivider2 from '@/components/common/SectionDivider2';
import SectionDivider4 from '@/components/common/SectionDivider4';
import SEO from "@/components/common/SEO";

const shouldPlayIntro = (hasDeepLink: boolean) => {
  if (hasDeepLink) return false; // someone following a link to a post/section wants the content
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('hasSeenDoorAnimation');
  } catch {
    return true;
  }
};

const Index: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { hash } = useLocation();
  const blog = slug ? allBlogs.find((b) => b.slug === slug) : undefined;

  const [showDoorAnimation, setShowDoorAnimation] = useState(() => shouldPlayIntro(Boolean(slug || hash)));

  const handleAnimationComplete = () => {
    setShowDoorAnimation(false);
    try {
      sessionStorage.setItem('hasSeenDoorAnimation', 'true');
    } catch {
      /* storage unavailable — intro just replays next visit */
    }
  };

  // Router doesn't scroll to #hash on its own (e.g. /projects/all → /#about)
  useEffect(() => {
    if (showDoorAnimation || !hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' });
  }, [hash, showDoorAnimation]);

  return (
    <>
      {blog ? (
        <SEO
          title={blog.title}
          description={blog.excerpt}
          url={`/blog/${blog.slug}`}
          image={blog.image}
          type="article"
          keywords={blog.tags}
          article={{ tags: blog.tags }}
        />
      ) : (
        <SEO
          title="Home"
          description="Himansh Munjal — AI Engineer, Data Science student at VIT Vellore. Explore projects in Machine Learning, Deep Learning, NLP, and Full Stack Development."
          url="/"
        />
      )}
      {showDoorAnimation && <DoorAnimation onComplete={handleAnimationComplete} />}
      
      <div className={`min-h-screen ${showDoorAnimation ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Header />
        
        <main>
          <HeroSection />
          <SectionDivider1 />
          <AboutSection />
          <TechStrip />
          <JourneySection />
          <SectionDivider color='purple'/>
          <SkillsSection />
          <QuoteSection />
          <ProjectsSection />
          <SectionDivider2 />
          <BlogSection />
          <SectionDivider4/>
          <StrengthsSection />
          <ConnectSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
