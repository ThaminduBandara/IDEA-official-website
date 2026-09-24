import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';

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
            {/* Additional page routes will be added step-by-step */}
          </Routes>
        </main>

        {/* Modern Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
