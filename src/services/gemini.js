// src/services/gemini.js
import axios from 'axios';

// Universal Hugging Face Router for serverless models
const BASE_URL = 'https://router.huggingface.co/v1/chat/completions';
const MODEL_NAME = 'meta-llama/Llama-3.3-70B-Instruct';

/**
 * Dynamically retrieves the token strictly from the user's browser localStorage.
 * This guarantees no hardcoded secrets get compiled into the production bundle.
 */
function getApiKey() {
  const userSavedKey = localStorage.getItem('USER_HF_API_KEY');
  return userSavedKey ? userSavedKey.trim() : '';
}

/**
 * Helper utility that handles 429 rate limit exceptions safely with exponential backoff.
 */
async function postWithRetry(url, data, retries = 3, delay = 2500) {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    throw new Error('API Token missing. Please add your Hugging Face API key in the setup panel.');
  }

  try {
    return await axios.post(url, data, {
      headers: { 
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json' 
      }
    });
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(`[HF API] Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return postWithRetry(url, data, retries - 1, delay * 2);
    }
    throw error;
  }
}

/**
 * Extracts clean JSON string blocks out of open-source raw conversational texts.
 */
function cleanAndParseJSON(text) {
  try {
    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    const targetString = jsonMatch ? jsonMatch[1].trim() : text.trim();
    return JSON.parse(targetString);
  } catch (e) {
    console.error("Failed to parse output as clean JSON items:", text);
    throw new Error("The AI model returned an unexpected response format. Please try again.");
  }
}

/**
 * Generates technical interview questions based on user configuration.
 */
export async function generateQuestions(role, level, count) {
  const systemMessage = `You are an expert technical interviewer hiring for a ${level} ${role}. Generate exactly ${count} questions. 
CRITICAL: Return ONLY a raw JSON array. Wrap the array in a markdown code block like: \`\`\`json [ ... ] \`\`\`. Do not include any conversational pleasantries or preamble.`;

  const userPrompt = `Each object in the array must have exactly this schema:
[
  {
    "id": 1,
    "category": "Technical",
    "question": "The interview question text here",
    "expectedFocus": "Brief note on what a good answer should cover"
  }
]`;

  try {
    const response = await postWithRetry(BASE_URL, {
      model: MODEL_NAME,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 1500
    });

    const rawText = response.data.choices[0].message.content;
    return cleanAndParseJSON(rawText);
  } catch (error) {
    console.error('Error generating questions from HF:', error);
    throw error;
  }
}

/**
 * Evaluates a user's interview answer and provides structured feedback.
 */
export async function evaluateAnswer(role, level, question, userResponse) {
  const systemMessage = `You are a Lead Software Architect evaluating a candidate for a ${level} ${role} position.
Question: "${question}"
Candidate's Answer: "${userResponse}"

Evaluate rigorously. CRITICAL: Return ONLY a valid JSON object wrapped inside a \`\`\`json ... \`\`\` code block.`;

  const userPrompt = `Match this exact schema layout structure:
{
  "score": 85,
  "strengths": ["Point 1", "Point 2"],
  "weaknesses": ["Point 1", "Point 2"],
  "suggestedAnswer": "An ideal response text details here.",
  "improvementTips": "Actionable advice string here."
}`;

  try {
    const response = await postWithRetry(BASE_URL, {
      model: MODEL_NAME,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: userPrompt }
      ],
      temperature: 0.3,
      max_tokens: 1500
    });

    const rawText = response.data.choices[0].message.content;
    return cleanAndParseJSON(rawText);
  } catch (error) {
    console.error('Error evaluating answer via HF:', error);
    throw error;
  }
}