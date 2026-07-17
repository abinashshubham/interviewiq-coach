import React from 'react';
import { Link } from 'react-router-dom';
import { FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import './InterviewCard.css';

export default function InterviewCard({ interview }) {
  const { role, level, score, date, id } = interview;

  return (
    <div className="interview-card">
      <div className="card-header">
        <div>
          <h3>{role}</h3>
          <span className="card-badge">{level}</span>
        </div>
        <div className="score-badge-wrapper">
          <span className="score-value">{score}%</span>
          <span className="score-lbl">Score</span>
        </div>
      </div>
      
      <div className="card-footer">
        <span className="card-date">{date}</span>
        <Link to={`/result?id=${id}`} className="card-action-link">
          <span>Review Analysis</span>
          <FiArrowRight />
        </Link>
      </div>
    </div>
  );
}