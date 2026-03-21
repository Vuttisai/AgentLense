import { useState } from 'react'
import { FRAMEWORKS } from '../data/frameworks'
import './CodePlayground.css'

export default function CodePlayground() {
  const [activeFramework, setActiveFramework] = useState('langgraph')
  const fw = FRAMEWORKS.find(f => f.id === activeFramework)

  const copyCode = () => {
    navigator.clipboard?.writeText(fw.starterCode)
    const btn = document.querySelector('.playground__copy-btn')
    if (btn) { btn.textContent = '✅ Copied!'; setTimeout(() => btn.textContent = '📋 Copy', 2000) }
  }

  return (
    <section className="playground" id="playground">
      <div className="playground__container">
        <div className="playground__header">
          <span className="section-label">🧪 CODE PLAYGROUND</span>
          <h2 className="section-title">
            Production-ready <span className="glow-text">starter templates</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Copy real, working starter code for each framework —  not pseudo-code, not hello worlds.
          </p>
        </div>

        {/* Framework selector */}
        <div className="playground__selector">
          {FRAMEWORKS.map(f => (
            <button
              key={f.id}
              className={`playground__fw-btn ${activeFramework === f.id ? 'playground__fw-btn--active' : ''}`}
              onClick={() => setActiveFramework(f.id)}
              style={activeFramework === f.id ? { borderColor: f.color, color: f.color } : {}}
            >
              <span>{f.logo}</span>
              <span>{f.name}</span>
            </button>
          ))}
        </div>

        {/* Code window */}
        <div className="playground__window">
          <div className="playground__titlebar">
            <div className="playground__dots">
              <span className="playground__dot playground__dot--red" />
              <span className="playground__dot playground__dot--yellow" />
              <span className="playground__dot playground__dot--green" />
            </div>
            <span className="playground__filename mono">
              {fw.languages[0] === 'TypeScript' ? 'agent.ts' :
               fw.languages[0] === 'Visual (No-code)' ? 'workflow.js' : 'agent.py'}
            </span>
            <button className="playground__copy-btn mono" onClick={copyCode}>📋 Copy</button>
          </div>

          <div className="playground__code-area">
            <pre className="playground__pre">
              <code className="playground__code">{fw.starterCode}</code>
            </pre>
          </div>

          {/* Framework meta */}
          <div className="playground__meta">
            <div className="playground__meta-item">
              <span className="playground__meta-label">Framework</span>
              <span className="playground__meta-value" style={{ color: fw.color }}>{fw.name}</span>
            </div>
            <div className="playground__meta-item">
              <span className="playground__meta-label">License</span>
              <span className="playground__meta-value">{fw.pricing.framework}</span>
            </div>
            <div className="playground__meta-item">
              <span className="playground__meta-label">Stars</span>
              <span className="playground__meta-value">⭐ {fw.github.stars.toLocaleString()}</span>
            </div>
            <div className="playground__meta-item">
              <span className="playground__meta-label">Repo</span>
              <a
                href={`https://github.com/${fw.github.repo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="playground__meta-link"
              >
                {fw.github.repo}
              </a>
            </div>
          </div>
        </div>

        {/* Deployment options */}
        <div className="playground__deploy">
          <h3 className="playground__deploy-title">Deploy Options for {fw.name}</h3>
          <div className="playground__deploy-grid">
            {fw.deploymentOptions.map((opt, i) => (
              <div key={i} className="playground__deploy-card">
                <span className="playground__deploy-icon">
                  {opt.includes('Cloud') ? '☁️' : opt.includes('Docker') ? '🐳' : opt.includes('Kubernetes') || opt.includes('GKE') ? '⎈' : opt.includes('Vercel') ? '▲' : '🖥️'}
                </span>
                <span>{opt}</span>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="playground__pricing">
            <h4 className="playground__pricing-title">Pricing</h4>
            <div className="playground__pricing-rows">
              <div className="playground__pricing-row">
                <span className="playground__pricing-label">Framework</span>
                <span className="playground__pricing-value">{fw.pricing.framework}</span>
              </div>
              <div className="playground__pricing-row">
                <span className="playground__pricing-label">Hosted / Cloud</span>
                <span className="playground__pricing-value">{fw.pricing.cloud}</span>
              </div>
              <div className="playground__pricing-row">
                <span className="playground__pricing-label">Protocols</span>
                <span className="playground__pricing-value">{fw.protocols.join(', ')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
