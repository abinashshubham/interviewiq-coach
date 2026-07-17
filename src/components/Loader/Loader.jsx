// src/components/Loader/Loader.jsx
import React from 'react';
import { GiBrain } from 'react-icons/gi';
import './Loader.css';

export default function Loader({ message = 'Synthesizing AI Intelligence...' }) {
  return (
    <div className="loader-container">
      <div className="loader-pulse-wrapper">
        <div className="loader-ring"></div>
        <GiBrain className="loader-icon" />
      </div>
      <p className="loader-text">{message}</p>
      <span className="loader-subtext">Connecting to Gemini Neural Network</span>
    </div>
  );
}