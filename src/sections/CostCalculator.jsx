import { useState, useMemo } from 'react'
import { LLM_PRICING, calculateMonthlyCost } from '../data/frameworks'
import './CostCalculator.css'

export default function CostCalculator() {
  const [selectedLLM, setSelectedLLM] = useState('gpt-4o')
  const [requestsPerDay, setRequestsPerDay] = useState(1000)
  const [avgInputTokens, setAvgInputTokens] = useState(500)
  const [avgOutputTokens, setAvgOutputTokens] = useState(300)

  const result = useMemo(() =>
    calculateMonthlyCost({ llmId: selectedLLM, requestsPerDay, avgInputTokens, avgOutputTokens }),
    [selectedLLM, requestsPerDay, avgInputTokens, avgOutputTokens]
  )

  // Calculate all LLMs for comparison
  const allCosts = useMemo(() =>
    LLM_PRICING.map(llm => {
      const c = calculateMonthlyCost({ llmId: llm.id, requestsPerDay, avgInputTokens, avgOutputTokens })
      return { ...llm, ...c }
    }).sort((a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost)),
    [requestsPerDay, avgInputTokens, avgOutputTokens]
  )

  const maxCost = allCosts.length > 0 ? parseFloat(allCosts[allCosts.length - 1].totalCost) : 1

  return (
    <section className="cost-calc" id="cost-calculator">
      <div className="cost-calc__container">
        <div className="cost-calc__header">
          <span className="section-label">💰 COST CALCULATOR</span>
          <h2 className="section-title">
            Real <span className="glow-text">LLM pricing</span> for your agent stack
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Estimate your monthly spend across 9 LLM providers with real March 2026 pricing.
          </p>
        </div>

        <div className="cost-calc__body">
          {/* Controls */}
          <div className="cost-calc__controls glass-card">
            <h3 className="cost-calc__controls-title">Configure Your Usage</h3>

            <div className="cost-calc__field">
              <label className="cost-calc__label">
                <span>Requests per day</span>
                <span className="cost-calc__value mono">{requestsPerDay.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="10"
                max="100000"
                step="10"
                value={requestsPerDay}
                onChange={(e) => setRequestsPerDay(Number(e.target.value))}
                className="cost-calc__slider"
              />
              <div className="cost-calc__range-labels mono">
                <span>10</span><span>1K</span><span>10K</span><span>100K</span>
              </div>
            </div>

            <div className="cost-calc__field">
              <label className="cost-calc__label">
                <span>Avg input tokens / request</span>
                <span className="cost-calc__value mono">{avgInputTokens.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50"
                max="8000"
                step="50"
                value={avgInputTokens}
                onChange={(e) => setAvgInputTokens(Number(e.target.value))}
                className="cost-calc__slider"
              />
            </div>

            <div className="cost-calc__field">
              <label className="cost-calc__label">
                <span>Avg output tokens / request</span>
                <span className="cost-calc__value mono">{avgOutputTokens.toLocaleString()}</span>
              </label>
              <input
                type="range"
                min="50"
                max="4000"
                step="50"
                value={avgOutputTokens}
                onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
                className="cost-calc__slider"
              />
            </div>

            {/* Monthly summary */}
            <div className="cost-calc__summary">
              <div className="cost-calc__summary-row">
                <span>Monthly requests</span>
                <span className="mono">{(requestsPerDay * 30).toLocaleString()}</span>
              </div>
              <div className="cost-calc__summary-row">
                <span>Monthly input tokens</span>
                <span className="mono">{((requestsPerDay * 30 * avgInputTokens) / 1_000_000).toFixed(1)}M</span>
              </div>
              <div className="cost-calc__summary-row">
                <span>Monthly output tokens</span>
                <span className="mono">{((requestsPerDay * 30 * avgOutputTokens) / 1_000_000).toFixed(1)}M</span>
              </div>
            </div>
          </div>

          {/* Cost comparison bars */}
          <div className="cost-calc__results">
            <h3 className="cost-calc__results-title">Cost Comparison <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>(USD / month)</span></h3>
            <div className="cost-calc__bars">
              {allCosts.map((llm, i) => {
                const costNum = parseFloat(llm.totalCost)
                const widthPct = maxCost > 0 ? (costNum / maxCost) * 100 : 0
                const isSelected = llm.id === selectedLLM

                return (
                  <div
                    key={llm.id}
                    className={`cost-calc__bar-row ${isSelected ? 'cost-calc__bar-row--active' : ''}`}
                    onClick={() => setSelectedLLM(llm.id)}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="cost-calc__bar-info">
                      <div className="cost-calc__bar-name">
                        <span className="cost-calc__bar-provider" style={{ color: llm.color }}>{llm.provider}</span>
                        <span>{llm.name}</span>
                      </div>
                      <div className="cost-calc__bar-prices mono">
                        <span className="cost-calc__bar-unit">${llm.inputCost}/{llm.outputCost}</span>
                        <span className="cost-calc__bar-total" style={{ color: isSelected ? llm.color : 'var(--text-primary)' }}>
                          ${costNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                      </div>
                    </div>
                    <div className="cost-calc__bar-track">
                      <div
                        className="cost-calc__bar-fill"
                        style={{
                          width: `${Math.max(widthPct, 1)}%`,
                          background: `linear-gradient(90deg, ${llm.color}, ${llm.color}88)`,
                          boxShadow: isSelected ? `0 0 12px ${llm.color}44` : 'none',
                        }}
                      />
                    </div>
                    {costNum === 0 && <span className="cost-calc__free-badge">FREE</span>}
                    {i === 0 && costNum > 0 && <span className="cost-calc__cheapest-badge">CHEAPEST</span>}
                  </div>
                )
              })}
            </div>

            {/* Detail card for selected */}
            {result && (
              <div className="cost-calc__detail glass-card" style={{ borderColor: `${result.llm.color}33` }}>
                <div className="cost-calc__detail-header">
                  <h4 style={{ color: result.llm.color }}>{result.llm.name}</h4>
                  <span className="tag tag-cyan">{result.llm.provider}</span>
                  <span className="tag tag-purple">{result.llm.speed}</span>
                  <span className="tag tag-green">{result.llm.contextWindow.toLocaleString()} ctx</span>
                </div>
                <div className="cost-calc__detail-grid">
                  <div className="cost-calc__detail-item">
                    <span className="cost-calc__detail-label">Input cost</span>
                    <span className="cost-calc__detail-value">${result.inputCost}</span>
                  </div>
                  <div className="cost-calc__detail-item">
                    <span className="cost-calc__detail-label">Output cost</span>
                    <span className="cost-calc__detail-value">${result.outputCost}</span>
                  </div>
                  <div className="cost-calc__detail-item">
                    <span className="cost-calc__detail-label">Cost per request</span>
                    <span className="cost-calc__detail-value">${result.costPerRequest}</span>
                  </div>
                  <div className="cost-calc__detail-item cost-calc__detail-item--total">
                    <span className="cost-calc__detail-label">MONTHLY TOTAL</span>
                    <span className="cost-calc__detail-value cost-calc__detail-big" style={{ color: result.llm.color }}>
                      ${parseFloat(result.totalCost).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
