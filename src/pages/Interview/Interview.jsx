// src/pages/Interview/Interview.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuestions } from '../../services/gemini';
import QuestionCard from '../../components/QuestionCard/QuestionCard';
import AnswerBox from '../../components/AnswerBox/AnswerBox';
import Loader from '../../components/Loader/Loader';
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

  // Pull local configurations and request questions from Gemini
  useEffect(() => {
    const configStr = localStorage.getItem('interview_setup');
    if (!configStr) {
      navigate('/setup');
      return;
    }
    
    const { role, level, count } = JSON.parse(configStr);
    
    async function initSession() {
      try {
        const fetchedQuestions = await generateQuestions(role, level, count);
        setQuestions(fetchedQuestions);
        setLoading(false);
      } catch (err) {
        alert(err.message || 'Error configuring engine variables.');
        navigate('/setup');
      }
    }
    
    initSession();
  }, [navigate]);

  // Countdown timer effect loop
  useEffect(() => {
    if (loading || questions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleNext(); // Move forward if timer expires
          return 180;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, loading, questions]);

  const handleNext = () => {
    // Save current index answer frame mapping
    const updatedAnswers = { ...userAnswers, [currentIndex]: currentAnswer };
    setUserAnswers(updatedAnswers);
    
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setCurrentAnswer(userAnswers[currentIndex + 1] || '');
      setTimeLeft(180);
    } else {
      // Complete interview pipeline, store values internally, pass execution contextual bounds to the next step
      localStorage.setItem('active_session_questions', JSON.stringify(questions));
      localStorage.setItem('active_session_answers', JSON.stringify(updatedAnswers));
      navigate('/result');
    }
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
        {/* Dynamic visual progress tracker line */}
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