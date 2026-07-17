// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Setup from './pages/Setup/Setup';
import Interview from './pages/Interview/Interview';
import Result from './pages/Result/Result';
import History from './pages/History/History';
import PageTransition from './components/PageTransition/PageTransition';

export default function App() {
  return (
    <Router>
      <Navbar />
      <main style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
        <Routes>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
          <Route path="/setup" element={<PageTransition><Setup /></PageTransition>} />
          <Route path="/interview" element={<PageTransition><Interview /></PageTransition>} />
          <Route path="/result" element={<PageTransition><Result /></PageTransition>} />
          <Route path="/history" element={<PageTransition><History /></PageTransition>} />
        </Routes>
      </main>
    </Router>
  );
}