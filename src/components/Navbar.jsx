import { useState, useEffect } from 'react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__brand" onClick={() => scrollTo('hero')}>
          <div className="navbar__logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="url(#lg)" strokeWidth="2" />
              <circle cx="14" cy="14" r="5" fill="url(#lg)" />
              <line x1="14" y1="2" x2="14" y2="8" stroke="#00e5ff" strokeWidth="1.5" />
              <line x1="14" y1="20" x2="14" y2="26" stroke="#a855f7" strokeWidth="1.5" />
              <line x1="2" y1="14" x2="8" y2="14" stroke="#00e5ff" strokeWidth="1.5" />
              <line x1="20" y1="14" x2="26" y2="14" stroke="#a855f7" strokeWidth="1.5" />
              <defs>
                <linearGradient id="lg" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#00e5ff" />
                  <stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__name">
            Agent<span className="glow-text">Lens</span>
          </span>
        </div>

        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
          <button onClick={() => scrollTo('analyzer')} className="navbar__link">
            <span className="navbar__link-dot" />
            Analyzer
          </button>
          <button onClick={() => scrollTo('benchmarks')} className="navbar__link">
            <span className="navbar__link-dot" />
            Benchmarks
          </button>
          <button onClick={() => scrollTo('cost-calculator')} className="navbar__link">
            <span className="navbar__link-dot" />
            Pricing
          </button>
          <button onClick={() => scrollTo('frameworks')} className="navbar__link">
            <span className="navbar__link-dot" />
            Frameworks
          </button>
          <button onClick={() => scrollTo('compare')} className="navbar__link">
            <span className="navbar__link-dot" />
            Compare
          </button>
          <a
            href="https://github.com/Vuttisai/AgentLense"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__github"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Star
          </a>
        </div>

        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav >
  )
}
