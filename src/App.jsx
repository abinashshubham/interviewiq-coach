// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Core structural layout items are imported statically (fastest entry paint)
import Navbar from './components/Navbar/Navbar';
import Loader from './components/Loader/Loader';
import PageTransition from './components/PageTransition/PageTransition';

// Route chunks are loaded dynamically on demand using React.lazy
const Home = lazy(() => import('./pages/Home/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Setup = lazy(() => import('./pages/Setup/Setup'));
const Interview = lazy(() => import('./pages/Interview/Interview'));
const Result = lazy(() => import('./pages/Result/Result'));
const History = lazy(() => import('./pages/History/History'));

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
        {/* Suspense intercepts lazy chunks and presents our branded spinner during lazy downloads */}
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