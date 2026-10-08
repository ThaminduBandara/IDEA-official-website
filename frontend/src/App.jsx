import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ContactPage } from './pages/ContactPage';
import { JoinUsModal } from './components/common/JoinUsModal';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export function App() {
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-800 selection:text-white flex flex-col">
        {/* Navigation Header */}
        <Navbar onOpenJoinUs={() => setIsJoinUsOpen(true)} />

        {/* Global Join IDEA Drawer / Modal */}
        <JoinUsModal isOpen={isJoinUsOpen} onClose={() => setIsJoinUsOpen(false)} />

        {/* Dynamic Route Pages */}
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/downloads" element={<DownloadsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            {/* Catch-all fallback route to Home */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>

        {/* Modern Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
