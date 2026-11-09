import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import DoorAnimation from '@/components/DoorAnimation';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import TechStrip from '@/components/sections/TechStrip';
import JourneySection from '@/components/sections/JourneySection';
import SkillsSection from '@/components/sections/SkillsSection';
import QuoteSection from '@/components/sections/QuoteSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import BlogSection from '@/components/sections/BlogSection';
import ConnectSection from '@/components/sections/ConnectSection';
import StrengthsSection from '@/components/sections/StrengthsSection';
import SectionDivider from '@/components/common/SectionDivider';
import SEO from '@/components/common/SEO';

const shouldPlayIntro = (hasDeepLink: boolean) => {
  if (hasDeepLink) return false; // someone following a link to a section wants the content
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    return !sessionStorage.getItem('hasSeenDoorAnimation');
  } catch {
    return true;
  }
};

const Index: React.FC = () => {
  const { hash } = useLocation();
  const [showDoorAnimation, setShowDoorAnimation] = useState(() => shouldPlayIntro(Boolean(hash)));

  const handleAnimationComplete = () => {
    setShowDoorAnimation(false);
    try {
      sessionStorage.setItem('hasSeenDoorAnimation', 'true');
    } catch {
      /* storage unavailable — intro just replays next visit */
    }
  };

  return (
    <>
      <SEO
        description="Himansh Munjal — AI Engineer, Data Science student at VIT Vellore. Explore projects in Machine Learning, Deep Learning, NLP, and Full Stack Development."
        url="/"
      />
      {showDoorAnimation && <DoorAnimation onComplete={handleAnimationComplete} />}

      <div className={showDoorAnimation ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>
        <HeroSection introDone={!showDoorAnimation} />
        <SectionDivider variant="pulse" />
        <AboutSection />
        <TechStrip />
        <JourneySection />
        <SectionDivider variant="dashed" />
        <SkillsSection />
        <QuoteSection />
        <ProjectsSection />
        <SectionDivider variant="particles" />
        <BlogSection />
        <SectionDivider variant="beam" />
        <StrengthsSection />
        <ConnectSection />
      </div>
    </>
  );
};

export default Index;
