/* ═══════════════════════════════════════════════════════════════
   AI Workflow Generator — Multi-provider support:
   Includes client-side rate limiting & API key management.
   ═══════════════════════════════════════════════════════════════ */

import { LLM_PRICING } from './frameworks'

// ─── Provider configs ───
const PROVIDERS = {
  groq: {
    name: 'Groq (Fast & Free)',
    model: 'llama-3.3-70b-versatile',
    endpoint: 'https://api.groq.com/openai/v1/chat/completions',
    keyPlaceholder: 'Groq API key (from console.groq.com/keys)',
    keyUrl: 'https://console.groq.com/keys',
    type: 'openai'
  },
  openrouter: {
    name: 'OpenRouter (Multi-model)',
    model: 'nvidia/nemotron-3-super-120b-a12b:free',
    endpoint: 'https://openrouter.ai/api/v1/chat/completions',
    keyPlaceholder: 'OpenRouter API key (from openrouter.ai/keys)',
    keyUrl: 'https://openrouter.ai/keys',
    type: 'openai'
  },
  gemini: {
    name: 'Google Gemini',
    model: 'gemini-2.0-flash',
    endpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
    keyPlaceholder: 'Gemini API key (from aistudio.google.com)',
    keyUrl: 'https://aistudio.google.com/apikey',
    type: 'gemini'
  },
  openai: {
    name: 'OpenAI (Premium)',
    model: 'gpt-4o',
    endpoint: 'https://api.openai.com/v1/chat/completions',
    keyPlaceholder: 'OpenAI API key (from platform.openai.com/api-keys)',
    keyUrl: 'https://platform.openai.com/api-keys',
    type: 'openai'
  },
  anthropic: {
    name: 'Anthropic (Claude)',
    model: 'claude-3-5-sonnet-20241022',
    endpoint: 'https://api.anthropic.com/v1/messages',
    keyPlaceholder: 'Anthropic API key (from console.anthropic.com)',
    keyUrl: 'https://console.anthropic.com',
    type: 'anthropic'
  },
  deepseek: {
    name: 'DeepSeek (Coder/R1)',
    model: 'deepseek-chat',
    endpoint: 'https://api.deepseek.com/chat/completions',
    keyPlaceholder: 'DeepSeek API key (from platform.deepseek.com)',
    keyUrl: 'https://platform.deepseek.com',
    type: 'openai'
  },
  xai: {
    name: 'xAI (Grok)',
    model: 'grok-beta',
    endpoint: 'https://api.x.ai/v1/chat/completions',
    keyPlaceholder: 'xAI API key (from console.x.ai)',
    keyUrl: 'https://console.x.ai',
    type: 'openai'
  }
}

// ─── Rate Limiting (localStorage) ───
const DAILY_LIMIT = 5
const STORAGE_KEY = 'agentlens_usage'

function getUsageData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { date: '', count: 0 }
    return JSON.parse(raw)
  } catch { return { date: '', count: 0 } }
}

function getTodayStr() {
  return new Date().toISOString().slice(0, 10)
}

export function getRemainingQuota() {
  const usage = getUsageData()
  if (usage.date !== getTodayStr()) return DAILY_LIMIT
  return Math.max(0, DAILY_LIMIT - usage.count)
}

function incrementUsage() {
  const today = getTodayStr()
  const usage = getUsageData()
  if (usage.date !== today) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 1 }))
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: usage.count + 1 }))
  }
}

// ─── API Key Management ───
const USER_KEY_STORAGE = 'agentlens_user_key'
const PROVIDER_STORAGE = 'agentlens_provider'

export function getUserApiKey(providerId) {
  const p = providerId || getSelectedProvider()
  return localStorage.getItem(`${USER_KEY_STORAGE}_${p}`) || ''
}

export function setUserApiKey(providerId, key) {
  const p = providerId || getSelectedProvider()
  if (key) localStorage.setItem(`${USER_KEY_STORAGE}_${p}`, key)
  else localStorage.removeItem(`${USER_KEY_STORAGE}_${p}`)
}

export function getSelectedProvider() {
  return localStorage.getItem(PROVIDER_STORAGE) || 'openrouter'
}

export function setSelectedProvider(provider) {
  localStorage.setItem(PROVIDER_STORAGE, provider)
}

export { PROVIDERS, DAILY_LIMIT }

export function getActiveApiKey() {
  const provider = getSelectedProvider()
  const userKey = getUserApiKey(provider)
  if (userKey) return { key: userKey, source: 'user', provider }
  
  // Check env keys based on selected provider
  if (provider === 'openrouter' && import.meta.env.VITE_OPENROUTER_API_KEY) return { key: import.meta.env.VITE_OPENROUTER_API_KEY, source: 'env', provider }
  if (provider === 'gemini' && import.meta.env.VITE_GEMINI_API_KEY) return { key: import.meta.env.VITE_GEMINI_API_KEY, source: 'env', provider }
  if (provider === 'groq' && import.meta.env.VITE_GROQ_API_KEY) return { key: import.meta.env.VITE_GROQ_API_KEY, source: 'env', provider }
  
  // Fallback: If current provider has no key, see if any ENV key exists
  if (import.meta.env.VITE_OPENROUTER_API_KEY) return { key: import.meta.env.VITE_OPENROUTER_API_KEY, source: 'env', provider: 'openrouter' }
  if (import.meta.env.VITE_GROQ_API_KEY) return { key: import.meta.env.VITE_GROQ_API_KEY, source: 'env', provider: 'groq' }
  if (import.meta.env.VITE_GEMINI_API_KEY) return { key: import.meta.env.VITE_GEMINI_API_KEY, source: 'env', provider: 'gemini' }
  
  return { key: null, source: null, provider }
}

// ─── Prompt ───
function buildPrompt(userRequirements, frameworkName, llmName) {
  return `You are an expert AI systems architect with deep knowledge of production multi-agent systems, real-world frameworks, and enterprise infrastructure.

A user wants to build an AI agent system. Based on their description, generate a COMPLETE, DETAILED, PRODUCTION-GRADE workflow architecture.

USER REQUIREMENTS:
"${userRequirements}"

SELECTED FRAMEWORK: ${frameworkName}
SELECTED LLM: ${llmName}

Generate a JSON object with this EXACT structure (no markdown, no code fences, ONLY valid JSON):
{
  "title": "A specific descriptive title for this architecture",
  "complexity": "simple|medium|complex|advanced",
  "nodes": [
    {
      "id": "unique-kebab-case-id",
      "icon": "relevant emoji",
      "label": "Short Node Name (max 3 words)",
      "x": 50,
      "y": 30,
      "info": "Detailed 2-3 sentence description. Include SPECIFIC real tools, libraries, APIs. Include estimated cost or token usage.",
      "tools": ["RealTool1", "RealTool2"]
    }
  ],
  "edges": [[0, 1], [1, 2]],
  "loopNote": "Description of the flow pattern",
  "devSteps": [
    {
      "phase": "Phase Name",
      "duration": "1-2 weeks",
      "tasks": ["Specific actionable task with real tool names"]
    }
  ],
  "estimatedTokensPerRun": 8000,
  "estimatedLLMCalls": 8
}

CRITICAL RULES:
1. Generate 7-15 nodes. NEVER fewer than 7.
2. Use REAL tools/libraries/APIs.
3. Node positions: single column x=50, two parallel x=25/75, three parallel x=15/50/85. y starts at 30, increments by ~90.
4. Edges use 0-based array indices.
5. Include 3-6 dev phases with 3-5 tasks each.
6. Be SPECIFIC to the user's industry.
7. Return ONLY valid JSON.`
}

// ─── Call AI API (multi-provider) ───
export async function generateWorkflowWithAI(userRequirements, frameworkName, llmName, frameworkId) {
  const { key, source, provider: activeProvider } = getActiveApiKey()

  if (!key) {
    return { error: 'no_key', message: 'No API key configured for this provider. Please add your credentials.' }
  }

  if (source === 'env') {
    const remaining = getRemainingQuota()
    if (remaining <= 0) {
      return { error: 'rate_limited', message: 'Present Built-in Free limit exceeded! 🚀\nAdd any provider API key of your choice to proceed seamlessly.' }
    }
  }

  try {
    const prompt = buildPrompt(userRequirements, frameworkName, llmName)
    let textContent = ''
    const provInfo = PROVIDERS[activeProvider]

    if (provInfo.type === 'openai') {
      textContent = await callOpenAICompatible(prompt, key, provInfo, source)
    } else if (provInfo.type === 'gemini') {
      textContent = await callGemini(prompt, key, source)
    } else if (provInfo.type === 'anthropic') {
      textContent = await callAnthropic(prompt, key, provInfo, source)
    }

    if (!textContent) {
      return { error: 'empty_response', message: 'AI returned empty response. Try rephrasing your requirements.' }
    }

    // Parse JSON
    let workflow
    try {
      const cleaned = textContent.replace(/```json\s*|```\s*/g, '').trim()
      workflow = JSON.parse(cleaned)
    } catch (parseErr) {
      console.error('JSON parse error:', parseErr, textContent.substring(0, 500))
      return { error: 'parse_error', message: 'Failed to parse AI response. Please try again.' }
    }

    if (!workflow.nodes || !Array.isArray(workflow.nodes) || workflow.nodes.length < 3) {
      return { error: 'invalid_workflow', message: 'AI generated an incomplete workflow. Try with more detailed requirements.' }
    }

    if (source === 'env') incrementUsage()

    return {
      success: true,
      data: formatAIWorkflow(workflow, frameworkId, llmName, LLM_PRICING),
      remaining: source === 'env' ? getRemainingQuota() : null,
      source: 'ai',
      usedProvider: activeProvider
    }
  } catch (err) {
    console.error('AI API call failed:', err)
    return { error: err.errorType || 'network_error', message: err.message }
  }
}

// ─── Unified Request Error Formatter ───
function getErrorObj(status, source, provName) {
  if (status === 429 || status === 402) {
    if (source === 'env') return { errorType: 'rate_limited', message: 'Present Built-in limit exceeded! 🚀 You can use your own API key for a seamless experience. Our system supports every major provider.' }
    return { errorType: 'rate_limited', message: `Your ${provName} API key hit a rate limit or insufficient funds. Try another API key or provider.` }
  }
  if (status === 401 || status === 403) {
    if (source === 'env') return { errorType: 'rate_limited', message: 'Present Built-in limit exceeded! 🚀 You can use your own API key for a seamless experience. Our system supports every major provider.' }
    return { errorType: 'invalid_key', message: `Your ${provName} API key is invalid or unauthorized.` }
  }
  return { errorType: 'network_error', message: `${provName} API error (HTTP ${status})` }
}

// ─── OpenAI Compatible API call ───
async function callOpenAICompatible(prompt, apiKey, provInfo, source) {
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
  }
  if (provInfo.name.includes('OpenRouter')) {
    headers['HTTP-Referer'] = window.location.origin
    headers['X-Title'] = 'AgentLens'
  }

  const response = await fetch(provInfo.endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: provInfo.model,
      messages: [
        { role: 'system', content: 'You are an expert AI systems architect. Always respond with valid JSON only, no markdown fences.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 4096,
      response_format: provInfo.name.includes('Anthropic') || provInfo.name.includes('xAI') || provInfo.name.includes('DeepSeek') ? undefined : { type: 'json_object' }
    }),
  })

  if (!response.ok) throw getErrorObj(response.status, source, provInfo.name)
  const data = await response.json()
  return data?.choices?.[0]?.message?.content || null
}

// ─── Anthropic API call ───
async function callAnthropic(prompt, apiKey, provInfo, source) {
  const response = await fetch(provInfo.endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: provInfo.model,
      system: 'You are an expert AI systems architect. Always respond with valid JSON only, no markdown fences.',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 4096,
    }),
  })

  if (!response.ok) throw getErrorObj(response.status, source, provInfo.name)
  const data = await response.json()
  return data?.content?.[0]?.text || null
}

// ─── Gemini API call ───
async function callGemini(prompt, apiKey, source) {
  const response = await fetch(
    `${PROVIDERS.gemini.endpoint}?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 4096, responseMimeType: 'application/json' },
      }),
    }
  )

  if (!response.ok) throw getErrorObj(response.status, source, 'Google Gemini')
  const data = await response.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || null
}

// ─── Format AI response ───
function formatAIWorkflow(raw, frameworkId, llmName, llmPricing) {
  const llm = llmPricing?.find(l => l.id === llmName) || llmPricing?.[0]
  const tokensPerRun = raw.estimatedTokensPerRun || 8000

  const reqPerDay = 100
  const monthlyReqs = reqPerDay * 30
  const costPerRun = llm
    ? (tokensPerRun / 1_000_000) * (llm.inputCost * 0.6 + llm.outputCost * 0.4)
    : 0.005
  const monthlyLLM = costPerRun * monthlyReqs
  const infra = raw.complexity === 'advanced' ? 80 : raw.complexity === 'complex' ? 50 : 25
  const devWeeks = raw.devSteps
    ? raw.devSteps.reduce((sum, s) => { const m = s.duration.match(/(\d+)/); return sum + (m ? parseInt(m[1]) : 1) }, 0)
    : 6

  const costs = {
    devTimeWeeks: devWeeks,
    requestsPerDay: reqPerDay,
    monthlyRequests: monthlyReqs,
    tokensPerRequest: tokensPerRun,
    monthlyLLMCost: monthlyLLM.toFixed(2),
    monthlyInfraCost: infra,
    infraBreakdown: {
      hosting: Math.round(infra * 0.4),
      monitoring: Math.round(infra * 0.2),
      vectorDb: raw.nodes.some(n => n.info?.toLowerCase().includes('vector') || n.info?.toLowerCase().includes('pinecone')) ? Math.round(infra * 0.3) : 0,
      other: Math.round(infra * 0.1),
    },
    monthlyTotal: (monthlyLLM + infra).toFixed(2),
    costPerRequest: monthlyReqs > 0 ? ((monthlyLLM + infra) / monthlyReqs).toFixed(4) : '0',
    yearlyTotal: ((monthlyLLM + infra) * 12).toFixed(2),
    llmModel: llm?.name || llmName,
    framework: frameworkId,
  }

  const trace = {
    steps: raw.nodes.map((node, i) => {
      const nodeTokens = Math.round(tokensPerRun / raw.nodes.length)
      const dur = i === 0 ? 15 : Math.round(200 + Math.random() * 300)
      const nodeCost = llm ? (nodeTokens / 1_000_000) * (llm.inputCost * 0.6 + llm.outputCost * 0.4) : 0
      return {
        step: i + 1, action: node.label,
        detail: node.tools?.slice(0, 2).join(', ') || 'Processing',
        duration: `${dur}ms`, tokens: nodeTokens, cost: `$${nodeCost.toFixed(4)}`,
      }
    }),
    totalDuration: `${(raw.nodes.length * 0.3).toFixed(2)}s`,
    totalTokens: tokensPerRun,
    totalCost: `$${costPerRun.toFixed(4)}`,
  }

  return {
    title: raw.title || 'AI-Generated Architecture',
    nodes: raw.nodes, edges: raw.edges || [],
    loopNote: raw.loopNote || 'Linear pipeline',
    costs, exampleTrace: trace,
    complexity: raw.complexity || 'complex',
    frequency: 'on-demand', frameworkId,
    devSteps: raw.devSteps || null, useCaseId: null, aiGenerated: true,
  }
}
