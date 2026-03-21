import { useState } from 'react'
import { FRAMEWORKS } from '../data/frameworks'
import './Frameworks.css'

/* ─── CSS-only animated shape (replaces heavy 3D Canvas) ─── */
function AnimatedShape({ color, isHovered }) {
  return (
    <div className={`frameworks__shape ${isHovered ? 'frameworks__shape--hover' : ''}`}>
      <div className="frameworks__shape-inner" style={{
        background: `linear-gradient(135deg, ${color}44, ${color}11)`,
        borderColor: `${color}55`,
        boxShadow: isHovered ? `0 0 30px ${color}33, inset 0 0 20px ${color}11` : `0 0 15px ${color}11`,
      }}>
        <div className="frameworks__shape-glow" style={{ background: color }} />
      </div>
    </div>
  )
}

export default function Frameworks() {
  const [hoveredId, setHoveredId] = useState(null)
  const [filter, setFilter] = useState('all')

  const categories = ['all', 'framework', 'multi-agent', 'platform', 'orchestration']

  const filtered = filter === 'all'
    ? FRAMEWORKS
    : FRAMEWORKS.filter(f => f.category === filter)

  return (
    <section className="frameworks" id="frameworks">
      <div className="frameworks__container">
        <div className="frameworks__header">
          <span className="section-label">🔍 FRAMEWORK EXPLORER</span>
          <h2 className="section-title">
            Every major <span className="glow-text">agent framework</span>, compared.
          </h2>
          <p className="section-subtitle">
            Explore 8+ frameworks with real data on community size, scalability, and use cases.
          </p>
        </div>

        {/* Filter tabs */}
        <div className="frameworks__filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`frameworks__filter ${filter === cat ? 'frameworks__filter--active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat === 'all' ? '🌐 All' :
               cat === 'framework' ? '⚡ Frameworks' :
               cat === 'multi-agent' ? '🤝 Multi-Agent' :
               cat === 'platform' ? '🎨 Platforms' :
               '🔗 Orchestration'}
            </button>
          ))}
        </div>

        {/* Framework grid */}
        <div className="frameworks__grid">
          {filtered.map((fw, i) => (
            <div
              key={fw.id}
              className="frameworks__card glass-card"
              style={{ '--fw-color': fw.color, animationDelay: `${i * 0.08}s` }}
              onMouseEnter={() => setHoveredId(fw.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* CSS-only animated visual (no WebGL!) */}
              <div className="frameworks__card-3d">
                <AnimatedShape color={fw.color} isHovered={hoveredId === fw.id} />
              </div>

              <div className="frameworks__card-content">
                <div className="frameworks__card-head">
                  <span className="frameworks__card-logo">{fw.logo}</span>
                  <div>
                    <h3 className="frameworks__card-name">{fw.name}</h3>
                    <p className="frameworks__card-tagline">{fw.tagline}</p>
                  </div>
                </div>

                <div className="frameworks__card-stats">
                  <div className="frameworks__card-stat">
                    <span className="frameworks__card-stat-val" style={{ color: fw.color }}>⭐ {fw.github.stars.toLocaleString()}</span>
                  </div>
                  <div className="frameworks__card-stat">
                    <span className="frameworks__card-stat-val" style={{ color: fw.color }}>📥 {fw.downloads.pypi}</span>
                  </div>
                  <div className="frameworks__card-stat">
                    <span className="frameworks__card-stat-val" style={{ color: fw.color }}>⚡ {fw.benchmark.latency.value}ms</span>
                  </div>
                </div>

                <div className="frameworks__card-meta mono" style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                  {fw.github.license} · {fw.firstRelease} · {fw.maintainedBy}
                </div>

                <div className="frameworks__card-tags">
                  {fw.bestFor.slice(0, 3).map((tag, j) => (
                    <span key={j} className="tag tag-cyan">{tag}</span>
                  ))}
                </div>

                <div className="frameworks__card-langs">
                  {fw.languages.map((l, j) => (
                    <span key={j} className="tag tag-purple">{l}</span>
                  ))}
                </div>

                {/* Mini score bars */}
                <div className="frameworks__card-bars">
                  {[
                    ['Complexity', fw.complexity],
                    ['Scalability', fw.scalability],
                    ['Community', fw.community],
                    ['Docs', fw.documentation],
                  ].map(([label, val]) => (
                    <div key={label} className="frameworks__mini-bar">
                      <span>{label}</span>
                      <div className="frameworks__mini-track">
                        <div
                          className="frameworks__mini-fill"
                          style={{
                            width: `${(val / 5) * 100}%`,
                            background: fw.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
