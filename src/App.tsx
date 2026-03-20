import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from 'sonner';
import BlogSection from './components/sections/BlogSection';

// Lazy load every page — only the landing page JS loads initially
const Index       = lazy(() => import('./pages/Index'));
const AllProjects = lazy(() => import('./pages/AllProjects'));
const AllBlogs    = lazy(() => import('./pages/AllBlogs'));
const NotFound    = lazy(() => import('./pages/NotFound'));
const BlogPost    = lazy(() => import('./pages/BlogPost'));

// Minimal fallback — no spinner needed, content appears instantly
const PageFallback = () => (
  <div className="min-h-screen bg-background" aria-hidden="true" />
);

function App() {

  return (
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* future flags silence React Router v7 warnings + prevent unnecessary transitions */}
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/"             element={<Index />} />
              <Route path="/blog/:slug"   element={<Index />} />  {/* ← only this one */}
              <Route path="/projects/all" element={<AllProjects />} />
              <Route path="/blogs/all"    element={<AllBlogs />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;