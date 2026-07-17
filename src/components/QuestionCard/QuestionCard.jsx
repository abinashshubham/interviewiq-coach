// src/components/QuestionCard/QuestionCard.jsx
import React from 'react';
import './QuestionCard.css';

export default function QuestionCard({ questionData, currentNumber, totalQuestions }) {
  const { question, category, expectedFocus } = questionData;

  return (
    <div className="question-card">
      <div className="question-card-header">
        <span className="question-index">Question {currentNumber} of {totalQuestions}</span>
        <span className="question-category-tag">{category}</span>
      </div>
      
      <h2 className="question-text">{question}</h2>
      
      <div className="focus-hint-box">
        <span className="focus-title">Evaluation Focus:</span>
        <p className="focus-desc">{expectedFocus}</p>
      </div>
    </div>
  );
}