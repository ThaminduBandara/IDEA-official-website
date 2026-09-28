import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

export function App() {
  const [isJoinUsOpen, setIsJoinUsOpen] = useState(false);

  return (
    <Router>
      <div className="w-full min-h-screen bg-slate-50 font-sans text-slate-800 antialiased selection:bg-emerald-800 selection:text-white flex flex-col">
        {/* Navigation Header (Fixed/Sticky Top) */}
        <Navbar onOpenJoinUs={() => setIsJoinUsOpen(true)} />

        {/* Dynamic Route Pages */}
        <main className="w-full flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
          </Routes>
        </main>

        {/* Modern Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
