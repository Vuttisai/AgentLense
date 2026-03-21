const key = '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';
async function test() {
  const models = ['nvidia/llama-3.1-nemotron-70b-instruct:free', 'meta-llama/llama-3.3-70b-instruct:free', 'google/gemma-3-12b-it:free'];
  for (const model of models) {
    try {
      const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}`, 'HTTP-Referer': 'https://agentlens.app', 'X-Title': 'AgentLens' },
        body: JSON.stringify({ model: model, messages: [{ role: 'user', content: 'Reply with just: OK' }], max_tokens: 10 }),
      });
      const data = await res.json();
      console.log(`\nModel: ${model}`);
      console.log(`Status: ${res.status}`);
      console.log(`Response: ${JSON.stringify(data)}`);
    } catch (e) {
      console.log(`Error testing ${model}: ${e.message}`);
    }
  }
}
test();
