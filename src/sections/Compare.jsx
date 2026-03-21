import { useState } from 'react'
import { FRAMEWORKS } from '../data/frameworks'
import './Compare.css'

export default function Compare() {
  const [selected, setSelected] = useState([FRAMEWORKS[0].id, FRAMEWORKS[1].id])

  const toggleSelect = (id) => {
    if (selected.includes(id)) {
      if (selected.length > 1) {
        setSelected(selected.filter(s => s !== id))
      }
    } else if (selected.length < 3) {
      setSelected([...selected, id])
    }
  }

  const compareFrameworks = selected.map(id => FRAMEWORKS.find(f => f.id === id))
  const attributes = [
    { key: 'complexity', label: 'Complexity' },
    { key: 'scalability', label: 'Scalability' },
    { key: 'community', label: 'Community' },
    { key: 'costEfficiency', label: 'Cost Efficiency' },
    { key: 'documentation', label: 'Documentation' },
    { key: 'debugging', label: 'Debugging' },
  ]

  return (
    <section className="compare" id="compare">
      <div className="compare__container">
        <div className="compare__header">
          <span className="section-label">⚖️ HEAD-TO-HEAD</span>
          <h2 className="section-title">
            Compare <span className="glow-text">frameworks</span> side-by-side
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Select up to 3 frameworks to compare their strengths and weaknesses.
          </p>
        </div>

        {/* Selector pills */}
        <div className="compare__selectors">
          {FRAMEWORKS.map(fw => (
            <button
              key={fw.id}
              className={`compare__selector ${selected.includes(fw.id) ? 'compare__selector--active' : ''}`}
              onClick={() => toggleSelect(fw.id)}
              style={selected.includes(fw.id) ? { borderColor: fw.color, color: fw.color, background: `${fw.color}11` } : {}}
            >
              <span>{fw.logo}</span>
              <span>{fw.name}</span>
            </button>
          ))}
        </div>

        {/* Comparison table */}
        <div className="compare__table-wrap">
          <table className="compare__table">
            <thead>
              <tr>
                <th className="compare__th-label">Attribute</th>
                {compareFrameworks.map(fw => (
                  <th key={fw.id} className="compare__th-fw">
                    <span className="compare__th-icon">{fw.logo}</span>
                    <span style={{ color: fw.color }}>{fw.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="compare__td-label">Tagline</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val">{fw.tagline}</td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">GitHub Stars</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val mono" style={{ color: fw.color }}>⭐ {fw.github.stars.toLocaleString()}</td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Downloads</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val mono">{fw.downloads.pypi}</td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Latency</td>
                {compareFrameworks.map(fw => {
                  const v = fw.benchmark.latency.value
                  const minV = Math.min(...compareFrameworks.map(f => f.benchmark.latency.value))
                  return <td key={fw.id} className="compare__td-val mono" style={{ color: v === minV ? fw.color : 'var(--text-muted)' }}>{v}ms {v === minV && '⚡'}</td>
                })}
              </tr>
              <tr>
                <td className="compare__td-label">Task Success</td>
                {compareFrameworks.map(fw => {
                  const v = fw.benchmark.taskSuccessRate
                  const maxV = Math.max(...compareFrameworks.map(f => f.benchmark.taskSuccessRate))
                  return <td key={fw.id} className="compare__td-val mono" style={{ color: v === maxV ? fw.color : 'var(--text-muted)' }}>{v}% {v === maxV && '🏆'}</td>
                })}
              </tr>
              <tr>
                <td className="compare__td-label">License</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val mono">{fw.github.license}</td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Pricing</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val" style={{ fontSize: '0.72rem' }}>{fw.pricing.cloud}</td>
                ))}
              </tr>
              {attributes.map(attr => (
                <tr key={attr.key}>
                  <td className="compare__td-label">{attr.label}</td>
                  {compareFrameworks.map(fw => {
                    const val = fw[attr.key]
                    const maxVal = Math.max(...compareFrameworks.map(f => f[attr.key]))
                    return (
                      <td key={fw.id} className="compare__td-bar">
                        <div className="compare__bar-row">
                          <div className="compare__bar-track">
                            <div
                              className="compare__bar-fill"
                              style={{
                                width: `${(val / 5) * 100}%`,
                                background: fw.color,
                                boxShadow: val === maxVal ? `0 0 10px ${fw.color}44` : 'none',
                              }}
                            />
                          </div>
                          <span className="mono" style={{ color: val === maxVal ? fw.color : 'var(--text-muted)' }}>
                            {val}/5 {val === maxVal && '👑'}
                          </span>
                        </div>
                      </td>
                    )
                  })}
                </tr>
              ))}
              <tr>
                <td className="compare__td-label">Languages</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val">
                    <div className="compare__tag-wrap">
                      {fw.languages.map((l, i) => (
                        <span key={i} className="tag tag-purple">{l}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Best For</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val">
                    <div className="compare__tag-wrap">
                      {fw.bestFor.map((b, i) => (
                        <span key={i} className="tag tag-cyan">{b}</span>
                      ))}
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Strengths</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val">
                    {fw.pros.map((p, i) => <div key={i} className="compare__pro">✅ {p}</div>)}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="compare__td-label">Watch Out</td>
                {compareFrameworks.map(fw => (
                  <td key={fw.id} className="compare__td-val">
                    {fw.cons.map((c, i) => <div key={i} className="compare__con">⚠️ {c}</div>)}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
