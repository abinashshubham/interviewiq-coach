// src/components/FeedbackCard/FeedbackCard.jsx
import React from 'react';
import { FiCheck, FiX, FiInfo, FiAward } from 'react-icons/fi';
import './FeedbackCard.css';

export default function FeedbackCard({ question, answer, evaluation, index }) {
  const { score, strengths, weaknesses, suggestedAnswer, improvementTips } = evaluation;

  return (
    <div className="feedback-card">
      <div className="feedback-card-header">
        <h4>Q{index + 1}: {question}</h4>
        <span className="individual-score-badge">{score} pts</span>
      </div>

      <div className="user-provided-response-box">
        <h5>Your Submitted Answer:</h5>
        <p>"{answer}"</p>
      </div>

      <div className="critique-grid">
        <div className="critique-column positive">
          <div className="critique-title"><FiCheck /> Strengths</div>
          <ul>
            {strengths.map((str, idx) => <li key={idx}>{str}</li>)}
          </ul>
        </div>

        <div className="critique-column negative">
          <div className="critique-title"><FiX /> Gaps / Weaknesses</div>
          <ul>
            {weaknesses.map((weak, idx) => <li key={idx}>{weak}</li>)}
          </ul>
        </div>
      </div>

      <div className="architect-recommendation-box">
        <div className="recommendation-title"><FiAward /> Suggested Reference Solution</div>
        <p>{suggestedAnswer}</p>
      </div>

      <div className="improvement-tip-banner">
        <FiInfo className="tip-icon" />
        <p><strong>Actionable Tip:</strong> {improvementTips}</p>
      </div>
    </div>
  );
}