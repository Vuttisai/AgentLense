import { useState, useEffect, useRef } from 'react'
import AnimatedWorkflow from './AnimatedWorkflow'
import './Results.css'

/* ─── CSS Trophy (replaces WebGL Canvas) ─── */
function TrophyVisual({ color }) {
  return (
    <div className="results__trophy" style={{ '--trophy-color': color }}>
      <div className="results__trophy-shape" style={{
        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
        borderColor: `${color}55`,
        boxShadow: `0 0 40px ${color}22, inset 0 0 30px ${color}11`,
      }}>
        <span className="results__trophy-icon">🏆</span>
      </div>
    </div>
  )
}

/* ─── Animated score bar ─── */
function ScoreBar({ label, value, max = 5, color, delay = 0 }) {
  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth((value / max) * 100)
    }, delay)
    return () => clearTimeout(timer)
  }, [value, max, delay])

  return (
    <div className="results__score-row">
      <span className="results__score-label mono">{label}</span>
      <div className="results__score-track">
        <div
          className="results__score-bar"
          style={{
            width: `${animatedWidth}%`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            boxShadow: `0 0 12px ${color}33`,
            transitionDelay: `${delay}ms`,
          }}
        />
      </div>
      <span className="results__score-value mono" style={{ color }}>
        {value}/{max}
      </span>
    </div>
  )
}



export default function Results({ recommendations, onReset }) {
  const [revealed, setRevealed] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    setTimeout(() => setRevealed(true), 100)
  }, [])

  if (!recommendations || recommendations.length === 0) return null

  const top = recommendations[0]
  const runners = recommendations.slice(1, 4)

  return (
    <section className={`results ${revealed ? 'results--revealed' : ''}`} id="results">
      <div className="results__bg-glow" style={{ background: `radial-gradient(circle at 50% 30%, ${top.color}11, transparent 60%)` }} />

      <div className="results__container">
        {/* Header */}
        <div className="results__header">
          <span className="section-label">🎯 YOUR PERFECT MATCH</span>
          <h2 className="section-title">
            We recommend <span className="glow-text">{top.name}</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Based on your {Object.keys(recommendations[0]).includes('budget') ? '7' : '6'} answers, here's the best agentic AI stack for you.
          </p>
        </div>

        {/* Top pick card */}
        <div className="results__top-card">
          <div className="results__top-3d">
            <TrophyVisual color={top.color} />
          </div>

          <div className="results__top-info">
            <div className="results__top-header">
              <span className="results__top-logo">{top.logo}</span>
              <div>
                <h3 className="results__top-name">{top.name}</h3>
                <p className="results__top-tagline">{top.tagline}</p>
              </div>
              <div className="results__match-badge" style={{ background: `${top.color}15`, borderColor: `${top.color}40`, color: top.color }}>
                {top.matchPercent}% match
              </div>
            </div>

            {/* Tabs */}
            <div className="results__tabs">
              {['overview', 'github', 'pricing', 'deployment'].map(tab => (
                <button key={tab} className={`results__tab ${activeTab === tab ? 'results__tab--active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab === 'overview' ? '📊 Overview' : tab === 'github' ? '🐙 GitHub' : tab === 'pricing' ? '💰 Pricing' : '🚀 Deploy'}
                </button>
              ))}
            </div>

            {activeTab === 'overview' && (
              <>
                <div className="results__scores">
                  <ScoreBar label="Complexity" value={top.complexity} color={top.color} delay={200} />
                  <ScoreBar label="Scalability" value={top.scalability} color={top.color} delay={400} />
                  <ScoreBar label="Community" value={top.community} color={top.color} delay={600} />
                  <ScoreBar label="Cost Efficiency" value={top.costEfficiency} color={top.color} delay={800} />
                  <ScoreBar label="Documentation" value={top.documentation} color={top.color} delay={1000} />
                  <ScoreBar label="Debugging" value={top.debugging} color={top.color} delay={1200} />
                </div>

                <div className="results__tags">
                  {top.bestFor.map((tag, i) => (
                    <span key={i} className="tag tag-cyan">{tag}</span>
                  ))}
                  {top.languages.map((lang, i) => (
                    <span key={`l-${i}`} className="tag tag-purple">{lang}</span>
                  ))}
                </div>

                <div className="results__benchmark-row">
                  <div className="results__benchmark-item">
                    <span className="results__benchmark-label">Latency</span>
                    <span className="results__benchmark-value mono">{top.benchmark?.latency?.value}ms</span>
                    <span className="results__benchmark-note mono">{top.benchmark?.latency?.note}</span>
                  </div>
                  <div className="results__benchmark-item">
                    <span className="results__benchmark-label">Success Rate</span>
                    <span className="results__benchmark-value mono">{top.benchmark?.taskSuccessRate}%</span>
                  </div>
                  <div className="results__benchmark-item">
                    <span className="results__benchmark-label">Token Efficiency</span>
                    <span className="results__benchmark-value mono">{top.benchmark?.tokenEfficiency}/5</span>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'github' && (
              <div className="results__github-grid">
                <div className="results__github-stat">
                  <span className="results__github-icon">⭐</span>
                  <span className="results__github-num mono">{top.github?.stars?.toLocaleString()}</span>
                  <span className="results__github-label">Stars</span>
                </div>
                <div className="results__github-stat">
                  <span className="results__github-icon">🍴</span>
                  <span className="results__github-num mono">{top.github?.forks?.toLocaleString()}</span>
                  <span className="results__github-label">Forks</span>
                </div>
                <div className="results__github-stat">
                  <span className="results__github-icon">🐛</span>
                  <span className="results__github-num mono">{top.github?.openIssues?.toLocaleString()}</span>
                  <span className="results__github-label">Open Issues</span>
                </div>
                <div className="results__github-stat">
                  <span className="results__github-icon">⏰</span>
                  <span className="results__github-num mono">{top.github?.lastCommit}</span>
                  <span className="results__github-label">Last Commit</span>
                </div>
                <div className="results__github-meta">
                  <p><strong>Repo:</strong> <a href={`https://github.com/${top.github?.repo}`} target="_blank" rel="noopener" style={{ color: 'var(--cyan)' }}>{top.github?.repo}</a></p>
                  <p><strong>License:</strong> {top.github?.license}</p>
                  <p><strong>Downloads:</strong> {top.downloads?.pypi} (PyPI){top.downloads?.npm !== 'N/A (Python only)' && ` · ${top.downloads?.npm} (npm)`}</p>
                  <p><strong>First Release:</strong> {top.firstRelease}</p>
                  <p><strong>Maintained by:</strong> {top.maintainedBy}</p>
                </div>
              </div>
            )}

            {activeTab === 'pricing' && (
              <div className="results__pricing-detail">
                <div className="results__pricing-row-detail">
                  <span className="results__pricing-icon">📦</span>
                  <div>
                    <span className="results__pricing-title">Framework</span>
                    <span className="results__pricing-val">{top.pricing?.framework}</span>
                  </div>
                </div>
                <div className="results__pricing-row-detail">
                  <span className="results__pricing-icon">☁️</span>
                  <div>
                    <span className="results__pricing-title">Cloud / Hosted</span>
                    <span className="results__pricing-val">{top.pricing?.cloud}</span>
                  </div>
                </div>
                <div className="results__pricing-row-detail">
                  <span className="results__pricing-icon">🔗</span>
                  <div>
                    <span className="results__pricing-title">Supported Protocols</span>
                    <span className="results__pricing-val">{top.protocols?.join(', ')}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'deployment' && (
              <div className="results__deploy-detail">
                <div className="results__deploy-options">
                  {top.deploymentOptions?.map((opt, i) => (
                    <div key={i} className="results__deploy-option">
                      <span>{opt.includes('Cloud') || opt.includes('Engine') ? '☁️' : opt.includes('Docker') ? '🐳' : opt.includes('Kubernetes') || opt.includes('GKE') ? '⎈' : '🖥️'}</span>
                      <span>{opt}</span>
                    </div>
                  ))}
                </div>
                <div className="results__integrations">
                  <h4 style={{ fontSize: '0.85rem', marginBottom: '8px' }}>Integrations</h4>
                  <div className="results__tags">
                    {top.integrations?.map((integ, i) => (
                      <span key={i} className="tag tag-cyan">{integ}</span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="results__pros-cons">
              <div className="results__pros">
                <h4 className="results__list-title">✅ Strengths</h4>
                {top.pros.map((p, i) => (
                  <div key={i} className="results__list-item results__list-item--pro">{p}</div>
                ))}
              </div>
              <div className="results__cons">
                <h4 className="results__list-title">⚠️ Considerations</h4>
                {top.cons.map((c, i) => (
                  <div key={i} className="results__list-item results__list-item--con">{c}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Animated Architecture Workflow */}
        <AnimatedWorkflow framework={top} />

        {/* Runner ups */}
        <div className="results__runners">
          <h3 className="results__runners-title">Also Consider</h3>
          <div className="results__runners-grid">
            {runners.map((fw, i) => (
              <div
                key={fw.id}
                className="results__runner-card glass-card"
                style={{ animationDelay: `${(i + 1) * 0.15}s`, '--fw-color': fw.color }}
              >
                <div className="results__runner-rank">#{i + 2}</div>
                <div className="results__runner-logo">{fw.logo}</div>
                <h4 className="results__runner-name">{fw.name}</h4>
                <p className="results__runner-tagline">{fw.tagline}</p>
                <div className="results__runner-match" style={{ color: fw.color }}>
                  {fw.matchPercent}% match
                </div>
                <div className="results__runner-stats mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  ⭐ {fw.github?.stars?.toLocaleString()} · {fw.benchmark?.latency?.value}ms · {fw.benchmark?.taskSuccessRate}% success
                </div>
                <div className="results__runner-tags">
                  {fw.bestFor.slice(0, 2).map((tag, j) => (
                    <span key={j} className="tag tag-cyan" style={{ fontSize: '0.6rem' }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="results__actions">
          <button className="btn-primary" onClick={onReset}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Analyze Again
          </button>
          <button className="btn-secondary" onClick={() => {
            const text = `🔍 I just used AgentLens to find my perfect AI agent stack!\n\n🏆 Top recommendation: ${top.name} (${top.matchPercent}% match)\n📊 ${top.tagline}\n\n⭐ ${top.github?.stars?.toLocaleString()} GitHub stars · ${top.benchmark?.taskSuccessRate}% task success rate\n💰 ${top.pricing?.framework}\n\nTry it yourself → agentlens.dev\n\n#AgenticAI #AIAgents #LangGraph #CrewAI #AutoGen`
            navigator.clipboard?.writeText(text)
            alert('Copied to clipboard! Share it on LinkedIn 🚀')
          }}>
            📋 Share on LinkedIn
          </button>
        </div>
      </div>
    </section>
  )
}
