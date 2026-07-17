// src/pages/History/History.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTrash2, FiMaximize2, FiCalendar, FiAward, FiArchive } from 'react-icons/fi';
import './History.css';

export default function History() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  // Load persistent history on mount
  useEffect(() => {
    const savedData = localStorage.getItem('interview_history');
    if (savedData) {
      setLogs(JSON.parse(savedData));
    }
  }, []);

  const deleteLog = (id, e) => {
    e.stopPropagation(); // Stop click bubbling
    const targetConfirmation = window.confirm("Are you sure you want to scrub this evaluation record?");
    if (!targetConfirmation) return;

    const updated = logs.filter(log => log.id !== id);
    setLogs(updated);
    localStorage.setItem('interview_history', JSON.stringify(updated));
  };

  const clearAllHistory = () => {
    const doubleCheck = window.confirm("WARNING: You are about to wipe all saved session logs permanently. Proceed?");
    if (!doubleCheck) return;

    setLogs([]);
    localStorage.removeItem('interview_history');
  };

  return (
    <div className="history-view-container">
      <header className="history-header">
        <div>
          <h1>Session History Logs</h1>
          <p>Review metrics and deep performance tracking data points over time.</p>
        </div>
        {logs.length > 0 && (
          <button onClick={clearAllHistory} className="clear-history-trigger-btn">
            <FiTrash2 /> <span>Wipe Matrix Logs</span>
          </button>
        )}
      </header>

      {logs.length === 0 ? (
        <div className="empty-history-fallback">
          <FiArchive className="fallback-icon" />
          <h3>No Performance Files Detected</h3>
          <p>You haven't completed any AI simulation cycles yet.</p>
          <button onClick={() => navigate('/setup')} className="history-setup-redirect-btn">
            Deploy New Workspace Session
          </button>
        </div>
      ) : (
        <div className="history-logs-stack">
          {logs.map((log) => (
            <div 
              className="history-log-row" 
              key={log.id}
              onClick={() => navigate(`/result?id=${log.id}`)}
            >
              <div className="log-primary-meta">
                <div className="log-icon-frame">
                  <FiCalendar />
                </div>
                <div>
                  <h3>{log.role}</h3>
                  <span className="log-meta-tag">{log.level}</span>
                </div>
              </div>

              <div className="log-performance-metrics">
                <div className="log-date-stamp">
                  <span>Completed On</span>
                  <strong>{log.date}</strong>
                </div>

                <div className="log-score-display-block">
                  <span>Score</span>
                  <strong className={log.score >= 80 ? 'good' : log.score >= 65 ? 'average' : 'poor'}>
                    {log.score}%
                  </strong>
                </div>

                <div className="log-row-actions">
                  <button 
                    onClick={(e) => deleteLog(log.id, e)} 
                    className="log-delete-inline-btn"
                    title="Delete Entry"
                  >
                    <FiTrash2 />
                  </button>
                  <div className="log-inspect-chevron">
                    <FiMaximize2 />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}