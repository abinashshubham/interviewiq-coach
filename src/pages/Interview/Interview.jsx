// src/pages/Interview/Interview.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuestions } from '../../services/gemini';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import AnswerBox from '../../components/AnswerBox/AnswerBox';
import Loader from '../../components/Loader/Loader';
import VoiceInput from '../../components/VoiceInput/VoiceInput';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import './Interview.css';

export default function Interview() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes per question

  // Keep ref of latest currentAnswer to prevent stale closure bugs in timer
  const currentAnswerRef = useRef(currentAnswer);
  useEffect(() => {
    currentAnswerRef.current = currentAnswer;
  }, [currentAnswer]);

  // Pull local configurations and request questions from Gemini
  useEffect(() => {
    const configStr = localStorage.getItem('interview_setup');
    if (!configStr) {
      setTimeout(() => navigate('/setup'), 0);
      return;
    }
    
    let config;
    try {
      config = JSON.parse(configStr);
    } catch {
      setTimeout(() => navigate('/setup'), 0);
      return;
    }

    const { role, level, count } = config;
    
    async function initSession() {
      try {
        const fetchedQuestions = await generateQuestions(role, level, count);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (err) {
        alert(err.message || 'Error configuring engine variables.');
        setTimeout(() => navigate('/setup'), 0);
      }
    }
    
    initSession();
  }, [navigate]);

  // Auto-save typed answer into state & localStorage as the user types
  useEffect(() => {
    if (loading) return;

    setUserAnswers((prevAnswers) => {
      const updated = { ...prevAnswers, [currentIndex]: currentAnswer };
      localStorage.setItem('active_session_answers', JSON.stringify(updated));
      return updated;
    });
  }, [currentAnswer, currentIndex, loading]);

  const handleNext = () => {
    const activeAnswer = currentAnswerRef.current;
    const updatedAnswers = { ...userAnswers, [currentIndex]: activeAnswer };
    setUserAnswers(updatedAnswers);
    localStorage.setItem('active_session_answers', JSON.stringify(updatedAnswers));
    
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setCurrentAnswer(userAnswers[nextIndex] || '');
      setTimeLeft(180);
    } else {
      localStorage.setItem('active_session_questions', JSON.stringify(questions));
      navigate('/result');
    }
  };

  // Clean Timer Effect
  useEffect(() => {
    if (loading || questions.length === 0) return;

    if (timeLeft <= 0) {
      handleNext();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, questions.length]);

  const handleVoiceTranscript = (transcriptText) => {
    setCurrentAnswer((prev) => (prev ? `${prev} ${transcriptText}` : transcriptText));
  };

  if (loading) return <Loader message="Generating Tailored Technical Scenario Sets..." />;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="interview-page-wrapper">
      <div className="interview-top-bar">
        <div className="progress-track-bg">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        
        <div className="timer-badge">
          <FiClock />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>

      <QuestionCard 
        questionData={questions[currentIndex]} 
        currentNumber={currentIndex + 1} 
        totalQuestions={questions.length} 
      />

      <div className="answer-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <h4 style={{ margin: 0, color: '#aaa' }}>Your Response</h4>
        <VoiceInput onTranscriptChange={handleVoiceTranscript} />
      </div>

      <AnswerBox 
        value={currentAnswer} 
        onChange={setCurrentAnswer} 
      />

      <div className="action-row">
        <button 
          onClick={handleNext} 
          className="next-question-btn"
          disabled={currentAnswer.trim() === ''}
        >
          <span>{currentIndex === questions.length - 1 ? 'Finish Simulation' : 'Next Question'}</span>
          <FiArrowRight />
        </button>
      </div>
    </div>
  );
}