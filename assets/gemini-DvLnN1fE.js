import{t as e}from"./vendor-core-DukBPG9F.js";var t=`https://hf-api-proxy.abinashpandey16.workers.dev`,n=`meta-llama/Llama-3.3-70B-Instruct`;async function r(t,n,i=3,a=2500){try{return await e.post(t,n,{headers:{"Content-Type":`application/json`}})}catch(e){if(e.response?.status===429&&i>0)return console.warn(`[Proxy Engine] Rate limit hit. Retrying in ${a}ms...`),await new Promise(e=>setTimeout(e,a)),r(t,n,i-1,a*2);throw e}}function i(e){try{let t=e.match(/```json([\s\S]*?)```/),n=t?t[1].trim():e.trim();return JSON.parse(n)}catch{throw console.error(`Failed to parse output as clean JSON items:`,e),Error(`The AI model returned an unexpected response format. Please try again.`)}}async function a(e,a,o){let s=`You are an expert technical interviewer hiring for a ${a} ${e}. Generate exactly ${o} questions. 
CRITICAL: Return ONLY a raw JSON array. Wrap the array in a markdown code block like: \`\`\`json [ ... ] \`\`\`. Do not include any conversational pleasantries or preamble.`;try{let e=(await r(t,{model:n,messages:[{role:`system`,content:s},{role:`user`,content:`Each object in the array must have exactly this schema:
[
  {
    "id": 1,
    "category": "Technical",
    "question": "The interview question text here",
    "expectedFocus": "Brief note on what a good answer should cover"
  }
]`}],temperature:.7,max_tokens:1500})).data.choices[0].message.content;return i(e)}catch(e){throw console.error(`Error generating questions from Proxy:`,e),e}}async function o(e,a,o,s){let c=`You are a Lead Software Architect evaluating a candidate for a ${a} ${e} position.
Question: "${o}"
Candidate's Answer: "${s}"

Evaluate rigorously. CRITICAL: Return ONLY a valid JSON object wrapped inside a \`\`\`json ... \`\`\` code block.`;try{let e=(await r(t,{model:n,messages:[{role:`system`,content:c},{role:`user`,content:`Match this exact schema layout structure:
{
  "score": 85,
  "strengths": ["Point 1", "Point 2"],
  "weaknesses": ["Point 1", "Point 2"],
  "suggestedAnswer": "An ideal response text details here.",
  "improvementTips": "Actionable advice string here."
}`}],temperature:.3,max_tokens:1500})).data.choices[0].message.content;return i(e)}catch(e){throw console.error(`Error evaluating answer via Proxy:`,e),e}}export{a as n,o as t};