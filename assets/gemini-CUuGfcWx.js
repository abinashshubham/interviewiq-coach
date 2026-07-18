import{t as e}from"./vendor-core-CHHscB6N.js";var t=`https://router.huggingface.co/v1/chat/completions`,n=`meta-llama/Llama-3.3-70B-Instruct`;function r(){let e=localStorage.getItem(`USER_HF_API_KEY`);return e?e.trim():``}async function i(t,n,a=3,o=2500){let s=r();if(!s)throw Error(`API Token missing. Please add your Hugging Face API key in the setup panel.`);try{return await e.post(t,n,{headers:{Authorization:`Bearer ${s}`,"Content-Type":`application/json`}})}catch(e){if(e.response?.status===429&&a>0)return console.warn(`[HF API] Rate limit hit. Retrying in ${o}ms...`),await new Promise(e=>setTimeout(e,o)),i(t,n,a-1,o*2);throw e}}function a(e){try{let t=e.match(/```json([\s\S]*?)```/),n=t?t[1].trim():e.trim();return JSON.parse(n)}catch{throw console.error(`Failed to parse output as clean JSON items:`,e),Error(`The AI model returned an unexpected response format. Please try again.`)}}async function o(e,r,o){let s=`You are an expert technical interviewer hiring for a ${r} ${e}. Generate exactly ${o} questions. 
CRITICAL: Return ONLY a raw JSON array. Wrap the array in a markdown code block like: \`\`\`json [ ... ] \`\`\`. Do not include any conversational pleasantries or preamble.`;try{let e=(await i(t,{model:n,messages:[{role:`system`,content:s},{role:`user`,content:`Each object in the array must have exactly this schema:
[
  {
    "id": 1,
    "category": "Technical",
    "question": "The interview question text here",
    "expectedFocus": "Brief note on what a good answer should cover"
  }
]`}],temperature:.7,max_tokens:1500})).data.choices[0].message.content;return a(e)}catch(e){throw console.error(`Error generating questions from HF:`,e),e}}async function s(e,r,o,s){let c=`You are a Lead Software Architect evaluating a candidate for a ${r} ${e} position.
Question: "${o}"
Candidate's Answer: "${s}"

Evaluate rigorously. CRITICAL: Return ONLY a valid JSON object wrapped inside a \`\`\`json ... \`\`\` code block.`;try{let e=(await i(t,{model:n,messages:[{role:`system`,content:c},{role:`user`,content:`Match this exact schema layout structure:
{
  "score": 85,
  "strengths": ["Point 1", "Point 2"],
  "weaknesses": ["Point 1", "Point 2"],
  "suggestedAnswer": "An ideal response text details here.",
  "improvementTips": "Actionable advice string here."
}`}],temperature:.3,max_tokens:1500})).data.choices[0].message.content;return a(e)}catch(e){throw console.error(`Error evaluating answer via HF:`,e),e}}export{o as n,s as t};