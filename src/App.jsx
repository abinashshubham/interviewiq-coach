// src/App.jsx
import React, { lazy, Suspense } from 'react';
// Changed BrowserRouter to HashRouter
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

// Core structural layout items are imported statically (fastest initial paint)
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import PageTransition from './components/PageTransition/PageTransition';
import ScrollToTop from './components/ScrollToTop'; // 👈 Imported ScrollToTop

// Route chunks are loaded dynamically on demand using React.lazy for optimized bundle chunks
const Home = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Setup = lazy(() => import('./pages/Setup/Setup'));
const Interview = lazy(() => import('./pages/Interview/Interview'));
const Result = lazy(() => import('./pages/Result/Result'));
const History = lazy(() => import('./pages/History/History'));

export default function App() {
  return (
    /* 
        HashRouter appends a system hash '#/' structure.
        This bypasses the static server 404 refresh limitation on platforms like GitHub Pages.
        It automatically handles base paths, so no explicit 'basename' is required.
    */
    <Router>
      <ScrollToTop /> {/* 👈 Reset scroll position on route change */}
      <Navbar />
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
        <Suspense fallback={<Loader message="Hydrating workspace assets..." />}>
          <Routes>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
            <Route path="/setup" element={<PageTransition><Setup /></PageTransition>} />
            <Route path="/interview" element={<PageTransition><Interview /></PageTransition>} />
            <Route path="/result" element={<PageTransition><Result /></PageTransition>} />
            <Route path="/history" element={<PageTransition><History /></PageTransition>} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}