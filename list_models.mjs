async function getOpenRouterModels() {
  const res = await fetch('https://openrouter.ai/api/v1/models');
  if (!res.ok) return;
  const data = await res.json();
  const freeModels = data.data.filter(m => m.id.includes('free'));
  console.log(JSON.stringify(freeModels.map(m => m.id), null, 2));
}
getOpenRouterModels();
