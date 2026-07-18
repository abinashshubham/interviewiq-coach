import{t as e}from"./vendor-core-DukBPG9F.js";var t=`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`,n=`https://router.huggingface.co/v1/chat/completions`,r=`meta-llama/Llama-3.3-70B-Instruct`;async function i(n,r,a=3,o=2500){try{return await e.post(n,r,{headers:{Authorization:`Bearer ${t}`,"Content-Type":`application/json`}})}catch(e){if(e.response?.status===429&&a>0)return console.warn(`[HF API] Rate limit hit. Retrying in ${o}ms...`),await new Promise(e=>setTimeout(e,o)),i(n,r,a-1,o*2);throw e}}function a(e){try{let t=e.match(/```json([\s\S]*?)```/),n=t?t[1].trim():e.trim();return JSON.parse(n)}catch{throw console.error(`Failed to parse output as clean JSON grid items:`,e),Error(`Model returned invalid structure.`)}}async function o(e,t,o){let s=`You are an expert technical interviewer hiring for a ${t} ${e}. Generate exactly ${o} questions. 
CRITICAL: Return ONLY a raw JSON array. Wrap the array in a markdown code block like: \`\`\`json [ ... ] \`\`\`. Do not include any conversational pleasantries or preamble.`;try{let e=(await i(n,{model:r,messages:[{role:`system`,content:s},{role:`user`,content:`Each object in the array must have exactly this schema:
[
  {
    "id": 1,
    "category": "Technical",
    "question": "The interview question text here",
    "expectedFocus": "Brief note on what a good answer should cover"
  }
]`}],temperature:.7,max_tokens:1500})).data.choices[0].message.content;return a(e)}catch(e){throw console.error(`Error generating questions from HF:`,e),Error(`Failed to generate interview questions. Please retry.`)}}async function s(e,t,o,s){let c=`You are a Lead Software Architect evaluating a candidate for a ${t} ${e} position.
Question: "${o}"
Candidate's Answer: "${s}"

Evaluate rigorously. CRITICAL: Return ONLY a valid JSON object wrapped inside a \`\`\`json ... \`\`\` code block.`;try{let e=(await i(n,{model:r,messages:[{role:`system`,content:c},{role:`user`,content:`Match this exact schema layout structure:
{
  "score": 85,
  "strengths": ["Point 1", "Point 2"],
  "weaknesses": ["Point 1", "Point 2"],
  "suggestedAnswer": "An ideal response text details here.",
  "improvementTips": "Actionable advice string here."
}`}],temperature:.3,max_tokens:1500})).data.choices[0].message.content;return a(e)}catch(e){throw console.error(`Error evaluating answer via HF:`,e),Error(`Failed to evaluate your answer. Please retry.`)}}export{o as n,s as t};