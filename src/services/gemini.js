// src/services/gemini.js
import axios from 'axios';
const BASE_URL = "https://hf-api-proxy.abinashpandey16.workers.dev";
const MODEL_NAME = "Qwen/Qwen2.5-7B-Instruct";

/**
 * Clean post request utility targeting your secure serverless engine proxy.
 */
async function postWithRetry(url, data, retries = 3, delay = 2500) {
  try {
    return await axios.post(url, data, {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    if (error.response?.status === 429 && retries > 0) {
      console.warn(`[Proxy Engine] Rate limit hit. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return postWithRetry(url, data, retries - 1, delay * 2);
    }
    throw error;
  }
}

// src/services/gemini.js

export function cleanAndParseJSON(rawText) {
  try {
    if (!rawText) throw new Error("Empty response from AI engine.");

    // 1. Strip markdown backticks
    let cleaned = rawText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 2. Extract strictly the JSON object or array payload
    const firstBrace = cleaned.indexOf("{");
    const lastBrace = cleaned.lastIndexOf("}");
    const firstBracket = cleaned.indexOf("[");
    const lastBracket = cleaned.lastIndexOf("]");

    if (firstBrace !== -1 && lastBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      cleaned = cleaned.substring(firstBrace, lastBrace + 1);
    } else if (firstBracket !== -1 && lastBracket !== -1) {
      cleaned = cleaned.substring(firstBracket, lastBracket + 1);
    }

    // 3. Try parsing directly first (works for properly formatted/pretty JSON)
    try {
      return JSON.parse(cleaned);
    } catch {
      // 4. Fallback: Escape raw unescaped newlines/tabs inside string values ONLY
      const sanitized = cleaned
        .replace(/(?<=:\s*"[^"]*)\n(?=[^"]*")/g, "\\n")
        .replace(/[\r\t]/g, " ");

      return JSON.parse(sanitized);
    }
  } catch (err) {
    console.error("Failed to parse clean JSON items:", rawText);
    throw new Error("The AI model returned an unexpected response format. Please try again.");
  }
}

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
    console.error('Error generating questions from Proxy:', error);
    throw error;
  }
}

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
    console.error('Error evaluating answer via Proxy:', error);
    throw error;
  }
}