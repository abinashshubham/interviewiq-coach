// src/components/AnswerBox/AnswerBox.jsx
import React from 'react';
import './AnswerBox.css';

export default function AnswerBox({ value, onChange, placeholder = "Formulate your technical solution here..." }) {
  return (
    <div className="answer-box-container">
      <textarea
        className="premium-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      <div className="textarea-footer">
        <span className="word-counter">{value.trim() === '' ? 0 : value.trim().split(/\s+/).length} words</span>
      </div>
    </div>
  );
}