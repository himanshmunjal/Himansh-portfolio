import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X, Download } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const navLinks = [
  { name: 'Home', href: '/', section: 'hero' },
  { name: 'About', href: '/#about', section: 'about' },
  { name: 'Journey', href: '/#journey', section: 'journey' },
  { name: 'Projects', href: '/#projects', section: 'projects' },
  { name: 'Blog', href: '/#blog', section: 'blog' },
  { name: 'Connect', href: '/#connect', section: 'connect' },
];

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = (section: string) => {
    setIsMobileMenuOpen(false);
    
    if (location.pathname !== '/') {
      return;
    }
    
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
  const link = document.createElement('a');
  link.href = '/resume/Updated_resume2.pdf';
  link.download = 'Himansh_Munjal_Resume.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass-header">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
            HM
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => handleNavClick(link.section)}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={handleDownloadResume}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg gradient-button hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-secondary/50 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border/50">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => handleNavClick(link.section)}
                  className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-4 py-2 rounded-lg gradient-button hover:opacity-90 transition-opacity w-fit"
              >
                <Download className="w-4 h-4" />
                Resume
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
