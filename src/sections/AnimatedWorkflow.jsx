import { useState, useEffect, useRef } from 'react'
import { FRAMEWORK_ARCHITECTURES, LLM_PRICING, FRAMEWORKS } from '../data/frameworks'
import { parseRequirements, generateDynamicWorkflow } from '../data/workflowEngine'
import {
  generateWorkflowWithAI, getRemainingQuota, getUserApiKey, setUserApiKey,
  getSelectedProvider, setSelectedProvider, PROVIDERS, DAILY_LIMIT, getActiveApiKey
} from '../data/geminiWorkflow'
import './AnimatedWorkflow.css'

/* ─── SVG Circuit Edge with animated particle ─── */
function CircuitEdge({ x1, y1, x2, y2, color, delay, id }) {
  const dx = x2 - x1
  const dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)

  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="wf__edge-line" stroke={`${color}22`} />
      <line x1={x1} y1={y1} x2={x2} y2={y2} className="wf__edge-glow" stroke={color}
        strokeDasharray={`${len * 0.2} ${len * 0.8}`}
        style={{ animationDelay: `${delay}s`, animationDuration: `${1.5 + len / 400}s` }}
      />
      <circle r="3" fill={color} className="wf__edge-particle"
        style={{ animationDelay: `${delay}s`, animationDuration: `${2 + len / 300}s` }}>
        <animateMotion dur={`${2 + len / 300}s`} begin={`${delay}s`} repeatCount="indefinite" fill="freeze">
          <mpath href={`#path-${id}`} />
        </animateMotion>
      </circle>
      <path id={`path-${id}`} d={`M${x1},${y1} L${x2},${y2}`} fill="none" stroke="none" />
    </g>
  )
}

/* ─── Node component ─── */
function WorkflowNode({ node, color, isActive, onClick, scale }) {
  return (
    <g
      className={`wf__node ${isActive ? 'wf__node--active' : ''}`}
      transform={`translate(${node.x * scale / 100}, ${node.y})`}
      onClick={() => onClick(node)}
      style={{ cursor: 'pointer' }}
    >
      <circle r="28" fill="rgba(0,0,0,0.6)" stroke={isActive ? color : `${color}44`}
        strokeWidth={isActive ? 2 : 1}
        style={{ filter: isActive ? `drop-shadow(0 0 8px ${color}66)` : 'none' }}
      />
      <text textAnchor="middle" y="5" fontSize="18" className="wf__node-icon">{node.icon}</text>
      <text textAnchor="middle" y="48" fontSize="10" fill="rgba(255,255,255,0.7)"
        fontFamily="var(--font-mono)" className="wf__node-label">{node.label}</text>
    </g>
  )
}

/* ─── Info panel ─── */
function NodeInfoPanel({ node, color, onClose }) {
  if (!node) return null
  return (
    <div className="wf__info-panel" style={{ borderColor: `${color}44` }}>
      <div className="wf__info-header">
        <span className="wf__info-icon">{node.icon}</span>
        <h4 className="wf__info-title" style={{ color }}>{node.label}</h4>
        <button className="wf__info-close" onClick={onClose}>✕</button>
      </div>
      <p className="wf__info-text">{node.info}</p>
    </div>
  )
}

/* ─── SVG Workflow Renderer ─── */
function WorkflowDiagram({ arch, color, frameworkId }) {
  const [activeNode, setActiveNode] = useState(null)
  const VW = 600
  const maxY = arch ? Math.max(...arch.nodes.map(n => n.y)) + 80 : 500
  const VH = Math.max(400, maxY)

  if (!arch) return null

  return (
    <>
      <div className="wf__canvas-wrap">
        <svg viewBox={`0 0 ${VW} ${VH}`} className="wf__svg" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', maxHeight: '600px' }}>
          {arch.edges.map(([fromIdx, toIdx], i) => {
            const from = arch.nodes[fromIdx]
            const to = arch.nodes[toIdx]
            if (!from || !to) return null
            return (
              <CircuitEdge
                key={`e-${i}`} id={`${frameworkId}-${i}`}
                x1={from.x * VW / 100} y1={from.y}
                x2={to.x * VW / 100} y2={to.y}
                color={color} delay={i * 0.25}
              />
            )
          })}
          {arch.nodes.map(node => (
            <WorkflowNode
              key={node.id} node={node} color={color}
              isActive={activeNode?.id === node.id}
              onClick={setActiveNode} scale={VW}
            />
          ))}
        </svg>
        <div className="wf__loop-note mono" style={{ color: `${color}88` }}>
          ↻ {arch.loopNote}
        </div>
      </div>
      <NodeInfoPanel node={activeNode} color={color} onClose={() => setActiveNode(null)} />
    </>
  )
}

/* ─── Example Trace Table ─── */
function ExampleTrace({ trace, color }) {
  if (!trace) return null
  return (
    <div className="wf__trace">
      <h4 className="wf__trace-title">
        ⚡ Example Execution Trace <span className="mono" style={{ color, fontWeight: 400, fontSize: '0.78rem' }}>— single request</span>
      </h4>
      <div className="wf__trace-table">
        <div className="wf__trace-header">
          <span>#</span><span>Action</span><span>Detail</span><span>Time</span><span>Tokens</span><span>Cost</span>
        </div>
        {trace.steps.map((step, i) => (
          <div key={i} className="wf__trace-row" style={{ animationDelay: `${i * 0.05}s` }}>
            <span className="wf__trace-step">{step.step}</span>
            <span className="wf__trace-action" style={{ color: step.tokens > 500 ? color : 'var(--text-primary)' }}>{step.action}</span>
            <span className="wf__trace-detail">{step.detail}</span>
            <span className="mono">{step.duration}</span>
            <span className="mono">{step.tokens > 0 ? step.tokens.toLocaleString() : '-'}</span>
            <span className="mono" style={{ color: step.cost !== '$0.0000' ? color : 'var(--text-muted)' }}>{step.cost}</span>
          </div>
        ))}
        <div className="wf__trace-footer">
          <span></span><span style={{ color }}>TOTAL</span><span></span>
          <span className="mono" style={{ color }}>{trace.totalDuration}</span>
          <span className="mono" style={{ color }}>{trace.totalTokens.toLocaleString()}</span>
          <span className="mono" style={{ color }}>{trace.totalCost}</span>
        </div>
      </div>
    </div>
  )
}

/* ─── Cost Breakdown ─── */
function CostBreakdown({ costs, color }) {
  if (!costs) return null
  return (
    <div className="wf__estimate" style={{ borderColor: `${color}33` }}>
      <h4 className="wf__estimate-title">
        📊 Production Cost Estimate — <span style={{ color }}>{costs.framework} + {costs.llmModel}</span>
      </h4>
      <div className="wf__estimate-grid">
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Dev Time</span>
          <span className="wf__estimate-value">{costs.devTimeWeeks} weeks</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Requests / day</span>
          <span className="wf__estimate-value">{costs.requestsPerDay.toLocaleString()}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Tokens / req</span>
          <span className="wf__estimate-value">{costs.tokensPerRequest.toLocaleString()}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">LLM Cost / mo</span>
          <span className="wf__estimate-value" style={{ color }}>${costs.monthlyLLMCost}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Infra Cost / mo</span>
          <span className="wf__estimate-value">${costs.monthlyInfraCost}</span>
        </div>
        <div className="wf__estimate-card wf__estimate-card--total">
          <span className="wf__estimate-label">TOTAL / mo</span>
          <span className="wf__estimate-value" style={{ color, fontSize: '1.4rem' }}>${costs.monthlyTotal}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Cost / request</span>
          <span className="wf__estimate-value">${costs.costPerRequest}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Yearly Total</span>
          <span className="wf__estimate-value">${costs.yearlyTotal}</span>
        </div>
        <div className="wf__estimate-card">
          <span className="wf__estimate-label">Monthly Reqs</span>
          <span className="wf__estimate-value">{costs.monthlyRequests.toLocaleString()}</span>
        </div>
      </div>

      {/* Infra breakdown */}
      {costs.infraBreakdown && (
        <div className="wf__infra-breakdown">
          <h5 className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '8px' }}>INFRASTRUCTURE BREAKDOWN</h5>
          <div className="wf__infra-items">
            {Object.entries(costs.infraBreakdown).filter(([, v]) => v > 0).map(([key, val]) => (
              <div key={key} className="wf__infra-item">
                <span>{key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}</span>
                <span className="mono" style={{ color }}>${val}/mo</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="wf__estimate-cta">
        <p className="wf__estimate-note mono">
          Need help building this? Get a production-grade implementation roadmap.
        </p>
        <a href="https://www.linkedin.com/in/saikumarvutti/" target="_blank" rel="noopener noreferrer" className="btn-secondary wf__linkedin-btn">
          💼 Contact on LinkedIn
        </a>
      </div>
    </div>
  )
}

/* ─── Custom Requirement Builder (AI-Powered) ─── */
function RequirementBuilder({ framework, color }) {
  const [requirements, setRequirements] = useState('')
  const [llmId, setLlmId] = useState('gpt-4o')
  const [dynamicResult, setDynamicResult] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState(null)
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [currentProvider, setCurrentProvider] = useState(getSelectedProvider())
  const [apiKeyInput, setApiKeyInput] = useState(getUserApiKey(getSelectedProvider()))
  const [remainingQuota, setRemainingQuota] = useState(getRemainingQuota())
  const [generationSource, setGenerationSource] = useState(null)
  const [progress, setProgress] = useState('')

  const fw = FRAMEWORKS.find(f => f.id === framework.id)
  const llm = LLM_PRICING.find(l => l.id === llmId)
  const [hasUserKey, setHasUserKey] = useState(!!getUserApiKey(getSelectedProvider()))

  // Update form state when provider is clicked
  const handleSelectProvider = (provId) => {
    setSelectedProvider(provId)
    setCurrentProvider(provId)
    const storedKey = getUserApiKey(provId)
    setApiKeyInput(storedKey)
    setHasUserKey(!!storedKey)
  }

  const handleSaveApiKey = () => {
    setUserApiKey(currentProvider, apiKeyInput.trim())
    setHasUserKey(true)
    setShowApiKeyInput(false)
    setError(null)
  }

  const handleClearApiKey = () => {
    setUserApiKey(currentProvider, '')
    setApiKeyInput('')
    setHasUserKey(false)
  }

  const handleGenerate = async () => {
    if (!requirements.trim()) return
    setIsGenerating(true)
    setError(null)
    setProgress('🔍 Analyzing requirements...')

    // If no API key available at all across any provider, fall back to local engine
    const activeKeyContext = getActiveApiKey()
    if (!activeKeyContext.key) {
      setProgress('⚙️ Using local analysis engine...')
      setTimeout(() => {
        const parsed = parseRequirements(requirements)
        const result = generateDynamicWorkflow(parsed, framework.id, llmId)
        setDynamicResult(result)
        setGenerationSource('local')
        setIsGenerating(false)
        setProgress('')
      }, 600)
      return
    }

    try {
      setProgress('🧠 AI is analyzing your requirements...')
      await new Promise(r => setTimeout(r, 500))

      // Retry logic for 429 rate limits (up to 2 retries with backoff)
      let result = null
      let retries = 0
      const maxRetries = 2

      while (retries <= maxRetries) {
        setProgress(retries > 0
          ? `🔄 Retrying... (attempt ${retries + 1}/${maxRetries + 1})`
          : '🔧 Generating workflow architecture...')

        result = await generateWorkflowWithAI(
          requirements,
          fw?.name || framework.id,
          llm?.name || llmId,
          framework.id
        )

        // If 429 and we have retries left, wait and retry
        if (result.error === 'rate_limited' && retries < maxRetries) {
          const waitSec = 2 * (retries + 1)
          setProgress(`⏳ Rate limited, waiting ${waitSec}s before retry...`)
          await new Promise(r => setTimeout(r, waitSec * 1000))
          retries++
          continue
        }
        break
      }

      if (result.error) {
        setError(result.message)
        if (result.error === 'rate_limited' || result.error === 'no_key' || result.error === 'invalid_key') {
          setShowApiKeyInput(true)
        }
        // Fall back to local engine
        setProgress('⚙️ Falling back to local engine...')
        await new Promise(r => setTimeout(r, 300))
        const parsed = parseRequirements(requirements)
        const localResult = generateDynamicWorkflow(parsed, framework.id, llmId)
        setDynamicResult(localResult)
        setGenerationSource('local-fallback')
      } else {
        setDynamicResult(result.data)
        setGenerationSource('ai')
        if (result.remaining !== null) {
          setRemainingQuota(result.remaining)
        }
      }
    } catch (e) {
      setError(`Unexpected error: ${e.message}`)
      const parsed = parseRequirements(requirements)
      const localResult = generateDynamicWorkflow(parsed, framework.id, llmId)
      setDynamicResult(localResult)
      setGenerationSource('local-fallback')
    }

    setIsGenerating(false)
    setProgress('')
  }

  return (
    <div className="wf__builder">
      <div className="wf__builder-header">
        <span className="section-label" style={{ marginBottom: 0 }}>🔧 AI-POWERED WORKFLOW GENERATOR</span>
        <p className="wf__builder-subtitle">Describe your actual requirements — our AI will analyze and generate a unique, production-grade workflow architecture with real tools, costs & development roadmap.</p>
      </div>

      {/* API Key Status Bar */}
      <div className="wf__status-bar">
        <div className="wf__status-left">
          {hasUserKey ? (
            <span className="wf__status-badge wf__status-badge--active">🔑 Your API Key — Unlimited</span>
          ) : (currentProvider === 'gemini' && import.meta.env.VITE_GEMINI_API_KEY) || 
              (currentProvider === 'openrouter' && import.meta.env.VITE_OPENROUTER_API_KEY) || 
              (currentProvider === 'groq' && import.meta.env.VITE_GROQ_API_KEY) ? (
            <span className="wf__status-badge wf__status-badge--free">✨ Free Tier: {remainingQuota}/{DAILY_LIMIT} remaining today</span>
          ) : (
            <span className="wf__status-badge wf__status-badge--offline">⚡ Local Analysis — Add API key for AI generation</span>
          )}
        </div>
        <div className="wf__status-right">
          {hasUserKey ? (
            <button className="wf__key-btn wf__key-btn--remove" onClick={handleClearApiKey}>Remove Key</button>
          ) : (
            <button className="wf__key-btn" onClick={() => setShowApiKeyInput(!showApiKeyInput)}>
              {showApiKeyInput ? 'Cancel' : '🔑 Add API Key'}
            </button>
          )}
        </div>
      </div>

      {/* API Key Input Panel */}
      {showApiKeyInput && (() => {
        const providerInfo = PROVIDERS[currentProvider]
        return (
          <div className="wf__apikey-panel" style={{ borderColor: `${color}33` }}>
            <div className="wf__apikey-provider-row">
              <label className="wf__builder-label" style={{ marginBottom: 0 }}>AI Provider</label>
              <div className="wf__provider-btns">
                {Object.entries(PROVIDERS).map(([id, prov]) => (
                  <button key={id}
                    className={`wf__provider-btn ${currentProvider === id ? 'wf__provider-btn--active' : ''}`}
                    style={currentProvider === id ? { borderColor: color, color } : {}}
                    onClick={() => handleSelectProvider(id)}>
                    {prov.name}
                  </button>
                ))}
              </div>
            </div>
            <p className="wf__apikey-info">
              Get a <strong>free</strong> API key at{' '}
              <a href={providerInfo.keyUrl} target="_blank" rel="noopener noreferrer" style={{ color }}>{providerInfo.keyUrl.replace('https://', '')}</a>
              {' '}— {currentProvider === 'openrouter' ? 'free models with generous rate limits' : 'unlimited AI workflow generation'}.
            </p>
            <div className="wf__apikey-form">
              <input
                type="password"
                className="wf__apikey-input"
                placeholder={providerInfo.keyPlaceholder}
                value={apiKeyInput}
                onChange={e => setApiKeyInput(e.target.value)}
              />
              <button className="btn-primary wf__apikey-save" onClick={handleSaveApiKey} disabled={!apiKeyInput.trim()}>
                Save Key
              </button>
            </div>
          </div>
        )
      })()}

      <div className="wf__builder-form">
        <textarea
          className="wf__builder-textarea"
          placeholder={`Describe your project in detail...\n\nExamples:\n• "I need a multi-agent framework for a construction company to handle project bidding, resource scheduling, compliance checking, and safety monitoring"\n• "Build an AI system that monitors social media for brand mentions, analyzes sentiment, and auto-generates response drafts"\n• "Create a customer onboarding automation that verifies documents, runs KYC checks, and sets up accounts"`}
          value={requirements}
          onChange={e => setRequirements(e.target.value)}
          rows={5}
        />

        <div className="wf__builder-controls">
          <div className="wf__builder-field">
            <label className="wf__builder-label">LLM Model</label>
            <select className="wf__builder-select" value={llmId} onChange={e => setLlmId(e.target.value)}>
              {LLM_PRICING.map(llm => (
                <option key={llm.id} value={llm.id}>
                  {llm.name} — ${llm.inputCost}/${llm.outputCost} per 1M tokens ({llm.speed})
                </option>
              ))}
            </select>
          </div>
          <button className="btn-primary wf__builder-btn" onClick={handleGenerate}
            disabled={!requirements.trim() || isGenerating}>
            {isGenerating ? '⏳ AI Analyzing...' : '⚡ Generate Custom Workflow'}
          </button>
        </div>
      </div>

      {/* Loading Progress */}
      {isGenerating && (
        <div className="wf__progress">
          <div className="wf__progress-bar">
            <div className="wf__progress-fill" style={{ background: color }} />
          </div>
          <span className="wf__progress-text mono">{progress}</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="wf__error" style={error.includes('Present Built-in limit') ? { padding: 'var(--space-lg)', border: `1px solid ${color}66`, background: 'rgba(0,0,0,0.4)', borderRadius: 'var(--radius-lg)' } : {}}>
          {error.includes('Present Built-in limit') ? (
            <div style={{ display: 'flex', gap: 'var(--space-md)', alignItems: 'flex-start' }}>
              <span className="wf__error-icon" style={{ fontSize: '1.8rem', color: color }}>✨</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <strong style={{ fontSize: '1rem', color: 'var(--text-primary)', letterSpacing: '0.5px' }}>
                  Present API limit may exceed.
                </strong>
                <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  You can use your API for seamless experience. Include every provider API key to add <br/>
                  <span style={{ color: color, opacity: 0.9 }}>(user can add any API key based on his requirement)</span>.
                </p>
                <div style={{ marginTop: 'var(--space-sm)' }}>
                  <button className="btn-primary" onClick={() => setShowApiKeyInput(true)} style={{ padding: '6px 12px', fontSize: '0.75rem', background: `${color}22`, border: `1px solid ${color}88`, color }}>
                    🔑 Connect Your Provider
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <span className="wf__error-icon">⚠️</span>
              <span>{error}</span>
            </>
          )}
        </div>
      )}

      {/* Generation Source Badge */}
      {dynamicResult && (
        <div className="wf__detected">
          <div className="wf__detected-row">
            <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>GENERATED BY:</span>
            {generationSource === 'ai' ? (
              <span className="tag tag-green">🧠 Gemini AI Analysis</span>
            ) : generationSource === 'local-fallback' ? (
              <span className="tag tag-yellow">⚡ Local Engine (AI unavailable)</span>
            ) : (
              <span className="tag tag-cyan">⚡ Local Template Engine</span>
            )}
            {dynamicResult.useCaseId && <span className="tag tag-cyan">{dynamicResult.useCaseId.replace(/_/g, ' ')}</span>}
            <span className="tag tag-purple">{dynamicResult.complexity} complexity</span>
            {dynamicResult.aiGenerated && <span className="tag tag-green">AI-Generated</span>}
          </div>
        </div>
      )}

      {/* Dynamic generated workflow */}
      {dynamicResult && (
        <div className="wf__dynamic-result" style={{ marginTop: 'var(--space-xl)' }}>
          <div className="wf__header">
            <span className="section-label" style={{ marginBottom: 0 }}>
              🧬 YOUR CUSTOM ARCHITECTURE — {dynamicResult.title.toUpperCase()}
            </span>
            <p className="wf__hint mono">
              {generationSource === 'ai'
                ? 'This architecture was generated by AI analysis of your requirements. Click any node for details.'
                : 'This workflow was generated from local analysis. Add a Gemini API key for AI-powered generation.'}
            </p>
          </div>
          <WorkflowDiagram arch={dynamicResult} color={color} frameworkId={`custom-${framework.id}`} />
          <ExampleTrace trace={dynamicResult.exampleTrace} color={color} />

          {/* Development Roadmap */}
          {dynamicResult.devSteps && (
            <div className="wf__roadmap">
              <h4 className="wf__roadmap-title">🗺️ Development Roadmap</h4>
              <div className="wf__roadmap-phases">
                {dynamicResult.devSteps.map((phase, i) => (
                  <div key={i} className="wf__roadmap-phase" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="wf__roadmap-phase-header">
                      <span className="wf__roadmap-num" style={{ background: `${color}22`, borderColor: `${color}44`, color }}>{i + 1}</span>
                      <div>
                        <h5 className="wf__roadmap-phase-name" style={{ color }}>{phase.phase}</h5>
                        <span className="mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{phase.duration}</span>
                      </div>
                    </div>
                    <ul className="wf__roadmap-tasks">
                      {phase.tasks.map((task, j) => (
                        <li key={j} className="wf__roadmap-task">{task}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          <CostBreakdown costs={dynamicResult.costs} color={color} />
        </div>
      )}
    </div>
  )
}

/* ─── Main Animated Workflow ─── */
export default function AnimatedWorkflow({ framework }) {
  const containerRef = useRef(null)
  const arch = FRAMEWORK_ARCHITECTURES[framework.id]

  useEffect(() => { }, [framework.id])

  if (!arch) return null

  return (
    <div className="wf" ref={containerRef}>
      {/* Default framework architecture */}
      <div className="wf__header">
        <span className="section-label" style={{ marginBottom: 0 }}>
          ⚡ ANIMATED ARCHITECTURE — {arch.title.toUpperCase()}
        </span>
        <p className="wf__hint mono">Click any node to learn how it works</p>
      </div>

      <WorkflowDiagram arch={arch} color={framework.color} frameworkId={framework.id} />

      {/* Custom requirement builder */}
      <RequirementBuilder framework={framework} color={framework.color} />
    </div>
  )
}
