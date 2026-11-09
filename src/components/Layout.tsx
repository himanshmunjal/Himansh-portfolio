import React, { useEffect } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout: React.FC = () => {
  const { hash, pathname } = useLocation();

  // ScrollRestoration doesn't follow #hash links (e.g. /blogs/all → /#about, /projects/all#exp-05)
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    // wait a frame so lazily rendered sections exist
    const raf = requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView());
    return () => cancelAnimationFrame(raf);
  }, [hash, pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="btn sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-50">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
};

export default Layout;
