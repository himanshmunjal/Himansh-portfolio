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
      {showDoorAnimation && <DoorAnimation onComplete={handleAnimationComplete} />}
      
      <div className={`min-h-screen ${showDoorAnimation ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}`}>
        <Header />
        
        <main>
          <HeroSection />
          <AboutSection />
          <TechStrip />
          <JourneySection />
          <SkillsSection />
          <QuoteSection />
          <ProjectsSection />
          <BlogSection />
          <ConnectSection />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Index;
