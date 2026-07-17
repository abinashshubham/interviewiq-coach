// src/services/gemini.js
import axios from 'axios';

// Retrieve the API key from Vite's environment variables
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Using the standard, reliable Gemini Flash model endpoint for fast JSON generation
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

/**
 * Generates technical interview questions based on user configuration.
 */
export async function generateQuestions(role, level, count) {
  if (!API_KEY) {
    throw new Error('API Key is missing. Please check your .env file.');
  }

  const prompt = `
    You are an expert technical interviewer hiring for a ${level} ${role}.
    Generate exactly ${count} technical and behavioral interview questions.
    
    CRITICAL: You must respond ONLY with a valid JSON array of objects. Do not include markdown formatting, code blocks, or extra text.
    Each object in the array must have exactly this schema:
    {
      "id": 1,
      "category": "Technical | Behavioral | Situational",
      "question": "The interview question text here",
      "expectedFocus": "Brief note on what a good answer should cover"
    }
  `;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json" // Enforces clean JSON output from Gemini
      }
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    const questions = JSON.parse(rawText);
    return questions;
  } catch (error) {
    console.error('Error generating questions from Gemini:', error);
    throw new Error('Failed to generate interview questions. Please try again.');
  }
}

/**
 * Evaluates a user's interview answer and provides structured feedback.
 */
export async function evaluateAnswer(role, level, question, userResponse) {
  if (!API_KEY) {
    throw new Error('API Key is missing. Please check your .env file.');
  }

  const prompt = `
    You are a Lead Software Architect interviewing a candidate for a ${level} ${role} position.
    
    Question Asked: "${question}"
    Candidate's Answer: "${userResponse}"
    
    Evaluate the candidate's response rigorously. 
    CRITICAL: Respond ONLY with a valid JSON object matching this exact schema:
    {
      "score": 85,
      "strengths": ["Point 1", "Point 2"],
      "weaknesses": ["Point 1", "Point 2"],
      "suggestedAnswer": "An ideal, professional response to this question.",
      "improvementTips": "Actionable advice to improve next time."
    }
    The score must be a number between 0 and 100.
  `;

  try {
    const response = await axios.post(GEMINI_URL, {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.5,
        responseMimeType: "application/json"
      }
    });

    const rawText = response.data.candidates[0].content.parts[0].text;
    const feedback = JSON.parse(rawText);
    return feedback;
  } catch (error) {
    console.error('Error evaluating answer:', error);
    throw new Error('Failed to evaluate your answer. Please try again.');
  }
}