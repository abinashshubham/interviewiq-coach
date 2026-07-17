// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Page Components
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';
import Setup from './pages/Setup/Setup';
import Interview from './pages/Interview/Interview';
import Result from './pages/Result/Result';
import History from './pages/History/History';

export default function App() {
  return (
    <Router>
      {/* Structural layout components like Navbar can be placed here later */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/result" element={<Result />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </Router>
  );
}