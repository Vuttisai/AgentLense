import { useState } from 'react'
import { FRAMEWORKS } from '../data/frameworks'
import './Benchmarks.css'

const METRICS = [
  { key: 'latency', label: 'Latency', unit: 'ms', description: 'Average response time per request (lower is better)', bestIsLow: true },
  { key: 'taskSuccessRate', label: 'Task Success Rate', unit: '%', description: 'Successful task completions in standard benchmarks', bestIsLow: false },
  { key: 'tokenEfficiency', label: 'Token Efficiency', unit: '/5', description: 'How efficiently the framework uses LLM tokens', bestIsLow: false },
  { key: 'documentation', label: 'Documentation', unit: '/5', description: 'Quality and completeness of docs', bestIsLow: false },
  { key: 'debugging', label: 'Debugging & Observability', unit: '/5', description: 'Built-in debugging & tracing tools', bestIsLow: false },
]

export default function Benchmarks() {
  const [activeMetric, setActiveMetric] = useState('latency')
  const metric = METRICS.find(m => m.key === activeMetric)

  const getSortedFrameworks = () => {
    return [...FRAMEWORKS].sort((a, b) => {
      let aVal, bVal
      if (activeMetric === 'latency') {
        aVal = a.benchmark?.latency?.value || 9999
        bVal = b.benchmark?.latency?.value || 9999
      } else if (activeMetric === 'taskSuccessRate') {
        aVal = a.benchmark?.taskSuccessRate || 0
        bVal = b.benchmark?.taskSuccessRate || 0
      } else if (activeMetric === 'tokenEfficiency') {
        aVal = a.benchmark?.tokenEfficiency || 0
        bVal = b.benchmark?.tokenEfficiency || 0
      } else {
        aVal = a[activeMetric] || 0
        bVal = b[activeMetric] || 0
      }
      return metric.bestIsLow ? aVal - bVal : bVal - aVal
    })
  }

  const getValue = (fw) => {
    if (activeMetric === 'latency') return fw.benchmark?.latency?.value || 0
    if (activeMetric === 'taskSuccessRate') return fw.benchmark?.taskSuccessRate || 0
    if (activeMetric === 'tokenEfficiency') return fw.benchmark?.tokenEfficiency || 0
    return fw[activeMetric] || 0
  }

  const getMaxVal = () => {
    const vals = FRAMEWORKS.map(fw => getValue(fw))
    return Math.max(...vals)
  }

  const sorted = getSortedFrameworks()
  const maxVal = getMaxVal()

  return (
    <section className="benchmarks" id="benchmarks">
      <div className="benchmarks__container">
        <div className="benchmarks__header">
          <span className="section-label">📊 LIVE BENCHMARKS</span>
          <h2 className="section-title">
            Performance <span className="glow-text">data you can trust</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Real benchmark results from standardized test suites — latency, accuracy, and token efficiency compared.
          </p>
        </div>

        {/* Metric tabs */}
        <div className="benchmarks__tabs">
          {METRICS.map(m => (
            <button
              key={m.key}
              className={`benchmarks__tab ${activeMetric === m.key ? 'benchmarks__tab--active' : ''}`}
              onClick={() => setActiveMetric(m.key)}
            >
              <span className="benchmarks__tab-label">{m.label}</span>
              <span className="benchmarks__tab-unit mono">{m.unit}</span>
            </button>
          ))}
        </div>

        <p className="benchmarks__description mono">{metric.description}</p>

        {/* Bar chart */}
        <div className="benchmarks__chart">
          {sorted.map((fw, i) => {
            const val = getValue(fw)
            const widthPct = maxVal > 0 ? (val / maxVal) * 100 : 0
            const isWinner = i === 0
            const note = activeMetric === 'latency' ? fw.benchmark?.latency?.note : null

            return (
              <div
                key={fw.id}
                className={`benchmarks__row ${isWinner ? 'benchmarks__row--winner' : ''}`}
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                <div className="benchmarks__row-left">
                  <span className="benchmarks__rank mono">#{i + 1}</span>
                  <span className="benchmarks__logo">{fw.logo}</span>
                  <div className="benchmarks__name-col">
                    <span className="benchmarks__fw-name">{fw.name}</span>
                    {note && <span className="benchmarks__note mono">{note}</span>}
                  </div>
                </div>
                <div className="benchmarks__row-right">
                  <div className="benchmarks__bar-track">
                    <div
                      className="benchmarks__bar-fill"
                      style={{
                        width: `${Math.max(widthPct, 3)}%`,
                        background: `linear-gradient(90deg, ${fw.color}, ${fw.color}88)`,
                        boxShadow: isWinner ? `0 0 16px ${fw.color}44` : 'none',
                      }}
                    />
                  </div>
                  <span className="benchmarks__val mono" style={{ color: isWinner ? fw.color : 'var(--text-primary)' }}>
                    {val}{metric.unit === 'ms' ? 'ms' : metric.unit === '%' ? '%' : ''}
                    {isWinner && ' 👑'}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

        {/* Source note */}
        <div className="benchmarks__source mono">
          Sources: Benchmark data from community testing on standard agentic tasks (customer support, research, code review) using GPT-4o. 
          Latency measured as p50 response time including framework overhead. Last updated March 2026.
        </div>
      </div>
    </section>
  )
}
