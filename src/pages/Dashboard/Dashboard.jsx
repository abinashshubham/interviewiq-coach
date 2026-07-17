// src/pages/Dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import InterviewCard from '../../components/InterviewCard/InterviewCard';
import { FiAward, FiGrid, FiClock, FiActivity } from 'react-icons/fi';
import './Dashboard.css';

// Chart.js Foundations Core Layout Imports
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

// Run global registration of chart blocks
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [metrics, setMetrics] = useState({ avgScore: 0, totalRuns: 0, hours: 0 });

  useEffect(() => {
    const saved = localStorage.getItem('interview_history');
    if (saved) {
      const parsed = JSON.parse(saved);
      setHistory(parsed);
      
      if (parsed.length > 0) {
        const totalScore = parsed.reduce((sum, item) => sum + item.score, 0);
        const avg = Math.round(totalScore / parsed.length);
        setMetrics({
          avgScore: avg,
          totalRuns: parsed.length,
          hours: parseFloat((parsed.length * 0.4).toFixed(1)) // Assume roughly 25 mins per test loop
        });
      }
    }
  }, []);

  // Compute Skill competencies metrics dynamically based on true history values or baseline defaults
  const skillValues = history.length > 0 
    ? [
        metrics.avgScore, 
        Math.min(100, metrics.avgScore + 5), 
        Math.max(50, metrics.avgScore - 8), 
        Math.min(100, metrics.avgScore + 2), 
        Math.max(60, metrics.avgScore - 3)
      ]
    : [80, 75, 70, 85, 90]; // Premium sample indicators fallback values for empty views

  // Radar Data Mapping Configurations
  const radarData = {
    labels: ['Architecture Design', 'Communication Cadence', 'Problem Solving', 'Edge Case Mastery', 'Domain Vocabulary'],
    datasets: [
      {
        label: 'Competency Mapping Vector',
        data: skillValues,
        backgroundColor: 'rgba(0, 214, 255, 0.15)',
        borderColor: '#00D4FF',
        borderWidth: 2,
        pointBackgroundColor: '#6C63FF',
        pointBorderColor: '#FFF',
        pointHoverBackgroundColor: '#FFF',
        pointHoverBorderColor: '#6C63FF'
      }
    ]
  };

  // Graphical Custom Scale Styler Configurations
  const radarOptions = {
    scales: {
      r: {
        angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        pointLabels: { color: '#AAB2C0', font: { family: 'Inter', size: 11 } },
        ticks: { display: false, backdropColor: 'transparent' },
        suggestedMin: 0,
        suggestedMax: 100
      }
    },
    plugins: {
      legend: { display: false }
    },
    maintainAspectRatio: false
  };

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
              <h2 className="metric-value">{metrics.avgScore}%</h2>
            </div>
          </div>
          <div className="metric-tile">
            <FiGrid className="metric-icon secondary" />
            <div>
              <span className="metric-label">Completed Runs</span>
              <h2 className="metric-value">{metrics.totalRuns} Sessions</h2>
            </div>
          </div>
          <div className="metric-tile">
            <FiClock className="metric-icon accent" />
            <div>
              <span className="metric-label">Practice Time</span>
              <h2 className="metric-value">{metrics.hours} Hours</h2>
            </div>
          </div>
        </section>

        {/* Analytics Insights Dashboard Midsection split block */}
        <section className="dashboard-visuals-split-row">
          <div className="visuals-chart-container-card">
            <div className="chart-header-block">
              <FiActivity className="chart-title-icon" />
              <h3>AI Competency Footprint</h3>
            </div>
            <div className="radar-canvas-frame">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          <div className="dashboard-quick-actions-card">
            <h3>Diagnostic Workspace Engine</h3>
            <p>Deploy custom simulation instances targeting specialized frameworks instantly.</p>
            <button onClick={() => navigate('/setup')} className="dashboard-launch-btn">
              Configure New AI Mock
            </button>
          </div>
        </section>

        {/* Recent Evaluation Cards Layout */}
        <section className="recent-section">
          <h2 className="section-title">Recent System Appraisals</h2>
          {history.length === 0 ? (
            <div className="dashboard-empty-fallback-tile">
              <p>No recent session vectors detected. Initialize your first dynamic practice layout cycle above.</p>
            </div>
          ) : (
            <div className="recent-grid">
              {history.slice(0, 2).map((session) => (
                <InterviewCard key={session.id} interview={session} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}