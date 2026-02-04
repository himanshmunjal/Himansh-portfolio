import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import LoadingScreen from './components/LoadingScreen';
import MainPage from './pages/MainPage';
import AllProjects from './pages/AllProjects';
import AllBlogs from './pages/AllBlogs';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 transition-colors duration-300">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <LoadingScreen key="loading" />
            ) : (
              <motion.div
                key="main"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen"
              >
                <Header />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/projects/all" element={<AllProjects />} />
                  <Route path="/blogs/all" element={<AllBlogs />} />
                </Routes>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;