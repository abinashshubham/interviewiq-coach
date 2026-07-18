// src/components/ScoreCard/ScoreCard.jsx
import React from 'react';
import './ScoreCard.css';

export default function ScoreCard({ score, role, level }) {
  // Determine color matching band dynamically based on the performance tier
  const getPerformanceTier = (val) => {
    if (val >= 85) return { label: 'Elite Architect', class: 'tier-elite' };
    if (val >= 70) return { label: 'Proficient Engineer', class: 'tier-proficient' };
    return { label: 'Needs Optimization', class: 'tier-needs-work' };
  };

  const tier = getPerformanceTier(score);

  return (
    <div className="score-card-wrapper">
      <span className="score-subtitle">{level} {role} Simulation</span>
      
      <div className="radial-score-display">
        <div className="score-value-text">{score}</div>
        <span className="score-total-scale">/ 100</span>
      </div>

      <div className={`tier-badge-label ${tier.class}`}>
        {tier.label}
      </div>
    </div>
  );
}