import{t as e}from"./vendor-core-DukBPG9F.js";var t=`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AQ.Ab8RN6JuPZ48ZnD0Nzl4XvdpeGleBkdbjXWntCThoyHtVNuYQQ`;async function n(n,r,i){let a=`
    You are an expert technical interviewer hiring for a ${r} ${n}.
    Generate exactly ${i} technical and behavioral interview questions.
    
    CRITICAL: You must respond ONLY with a valid JSON array of objects. Do not include markdown formatting, code blocks, or extra text.
    Each object in the array must have exactly this schema:
    {
      "id": 1,
      "category": "Technical | Behavioral | Situational",
      "question": "The interview question text here",
      "expectedFocus": "Brief note on what a good answer should cover"
    }
  `;try{let n=(await e.post(t,{contents:[{parts:[{text:a}]}],generationConfig:{temperature:.7,responseMimeType:`application/json`}})).data.candidates[0].content.parts[0].text;return JSON.parse(n)}catch(e){throw console.error(`Error generating questions from Gemini:`,e),Error(`Failed to generate interview questions. Please try again.`)}}async function r(n,r,i,a){let o=`
    You are a Lead Software Architect interviewing a candidate for a ${r} ${n} position.
    
    Question Asked: "${i}"
    Candidate's Answer: "${a}"
    
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
  `;try{let n=(await e.post(t,{contents:[{parts:[{text:o}]}],generationConfig:{temperature:.5,responseMimeType:`application/json`}})).data.candidates[0].content.parts[0].text;return JSON.parse(n)}catch(e){throw console.error(`Error evaluating answer:`,e),Error(`Failed to evaluate your answer. Please try again.`)}}export{n,r as t};