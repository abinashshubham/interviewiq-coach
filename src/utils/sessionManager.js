// src/utils/sessionManager.js

const KEYS = {
  SETUP: 'interview_setup',
  ACTIVE_QUESTIONS: 'active_session_questions',
  ACTIVE_ANSWERS: 'active_session_answers',
  ACTIVE_EVALUATIONS: 'active_session_evaluations',
  ACTIVE_SESSION_ID: 'active_session_id', // 👈 Track current test ID
  HISTORY: 'interview_history',
};

export const SessionManager = {
  saveSetup: (config) => localStorage.setItem(KEYS.SETUP, JSON.stringify(config)),
  getSetup: () => JSON.parse(localStorage.getItem(KEYS.SETUP) || 'null'),

  // 🎯 Generate a SINGLE session ID when starting an interview
  startNewSession: (questions) => {
    const sessionId = Date.now().toString();
    localStorage.setItem(KEYS.ACTIVE_SESSION_ID, sessionId);
    localStorage.setItem(KEYS.ACTIVE_QUESTIONS, JSON.stringify(questions));
    localStorage.removeItem(KEYS.ACTIVE_ANSWERS);
    localStorage.removeItem(KEYS.ACTIVE_EVALUATIONS);
  },

  getActiveSessionId: () => localStorage.getItem(KEYS.ACTIVE_SESSION_ID),

  saveAnswers: (answers) => localStorage.setItem(KEYS.ACTIVE_ANSWERS, JSON.stringify(answers)),
  getAnswers: () => JSON.parse(localStorage.getItem(KEYS.ACTIVE_ANSWERS) || '{}'),
  getQuestions: () => JSON.parse(localStorage.getItem(KEYS.ACTIVE_QUESTIONS) || 'null'),

  saveActiveEvaluations: (evaluations) => 
    localStorage.setItem(KEYS.ACTIVE_EVALUATIONS, JSON.stringify(evaluations)),
  getActiveEvaluations: () => 
    JSON.parse(localStorage.getItem(KEYS.ACTIVE_EVALUATIONS) || 'null'),

  getHistory: () => JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]'),
  
  getHistoryById: (id) => {
    const history = JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]');
    return history.find((item) => String(item.id) === String(id)) || null;
  },

  // 🎯 Strictly check for duplicate IDs before saving
  saveSessionToHistory: (sessionRecord) => {
    const history = JSON.parse(localStorage.getItem(KEYS.HISTORY) || '[]');
    const exists = history.some((item) => String(item.id) === String(sessionRecord.id));
    
    if (!exists) {
      const updatedHistory = [sessionRecord, ...history];
      localStorage.setItem(KEYS.HISTORY, JSON.stringify(updatedHistory));
    }
  },

  clearActiveSession: () => {
    localStorage.removeItem(KEYS.ACTIVE_QUESTIONS);
    localStorage.removeItem(KEYS.ACTIVE_ANSWERS);
    localStorage.removeItem(KEYS.ACTIVE_EVALUATIONS);
    localStorage.removeItem(KEYS.ACTIVE_SESSION_ID);
  }
};