const key = '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';
async function test() {
  const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}`, 'HTTP-Referer': 'https://agentlens.app', 'X-Title': 'AgentLens' },
    body: JSON.stringify({ model: 'nvidia/nemotron-3-super-120b-a12b:free', messages: [{ role: 'user', content: 'Say OK' }], max_tokens: 10 }),
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}
test();
