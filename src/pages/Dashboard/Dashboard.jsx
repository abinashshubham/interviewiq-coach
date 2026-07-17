import React from 'react';
import { motion } from 'framer-motion';
import Sidebar from '../../components/Sidebar/Sidebar';
import InterviewCard from '../../components/InterviewCard/InterviewCard';
import { FiAward, FiGrid, FiClock } from 'react-icons/fi';
import './Dashboard.css';

// Mock temporary layout tracking data sets
const sampleHistory = [
  { id: '1', role: 'Senior React Engineer', level: 'Advanced', score: 88, date: 'July 14, 2026' },
  { id: '2', role: 'Full Stack Developer', level: 'Intermediate', score: 74, date: 'July 10, 2026' }
];

export default function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Performance Overview</h1>
          <p>Track metrics, analyze skill gaps, and spin up isolated interview runs.</p>
        </header>

        {/* Analytical Quick Cards */}
        <section className="metrics-grid">
          <div className="metric-tile">
            <FiAward className="metric-icon primary" />
            <div>
              <span className="metric-label">Average Score</span>
              <h2 className="metric-value">81%</h2>
            </div>
          </div>
          <div className="metric-tile">
            <FiGrid className="metric-icon secondary" />
            <div>
              <span className="metric-label">Completed Runs</span>
              <h2 className="metric-value">12 Sessions</h2>
            </div>
          </div>
          <div className="metric-tile">
            <FiClock className="metric-icon accent" />
            <div>
              <span className="metric-label">Practice Time</span>
              <h2 className="metric-value">4.8 Hours</h2>
            </div>
          </div>
        </section>

        {/* Recent Evaluation Cards Layout */}
        <section className="recent-section">
          <h2 className="section-title">Recent System Appraisals</h2>
          <div className="recent-grid">
            {sampleHistory.map((session) => (
              <InterviewCard key={session.id} interview={session} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}