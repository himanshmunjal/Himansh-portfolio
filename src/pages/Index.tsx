import React, { useState, useEffect } from 'react';
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
import BlogSection from '@/components/sections/BlogSection';
import ConnectSection from '@/components/sections/ConnectSection';
import StrengthsSection from '@/components/sections/StrengthsSection'
import SectionDivider from '@/components/common/SectionDivider';
import SectionDivider1 from '@/components/common/SectionDivider1';
import SectionDivider2 from '@/components/common/SectionDivider2';
import SectionDivider4 from '@/components/common/SectionDivider4';
import SEO from "@/components/common/SEO";

const Index: React.FC = () => {
  const [showDoorAnimation, setShowDoorAnimation] = useState(true);

  useEffect(() => {
    // Check if animation has been shown before in this session
    const hasSeenAnimation = sessionStorage.getItem('hasSeenDoorAnimation');
    if (hasSeenAnimation) {
      setShowDoorAnimation(false);
    }
  }, []);

  const handleAnimationComplete = () => {
    setShowDoorAnimation(false);
    sessionStorage.setItem('hasSeenDoorAnimation', 'true');
  };

  return (
    <>
    <SEO
        title="Home"
        description="Himansh Munjal — AI Engineer, Data Science student at VIT Vellore. Explore projects in Machine Learning, Deep Learning, NLP, and Full Stack Development."
        url="/" image={undefined}     
        keywords={["Himansh Munjal", "Portfolio", "Data Scientist"]} />
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
