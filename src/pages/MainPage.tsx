import React from 'react';
import HeroSection from '../components/sections/HeroSection';
import AboutSection from '../components/sections/AboutSection';
import TechStrip from '../components/sections/TechStrip';
import JourneySection from '../components/sections/JourneySection';
import SkillsSection from '../components/sections/SkillsSection';
import QuoteSection from '../components/sections/QuoteSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import BlogSection from '../components/sections/BlogSection';
import ConnectSection from '../components/sections/ConnectSection';
import Footer from '../components/Footer';

const MainPage: React.FC = () => {
  return (
    <div className="pt-20">
      <HeroSection />
      <AboutSection />
      <TechStrip />
      <JourneySection />
      <SkillsSection />
      <QuoteSection />
      <ProjectsSection />
      <BlogSection />
      <ConnectSection />
      <Footer />
    </div>
  );
};

export default MainPage;