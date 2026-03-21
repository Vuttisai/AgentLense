import { useEffect, useRef, useState } from 'react'
import Scene3D from '../components/Scene3D'
import './Hero.css'

const TYPING_TEXTS = [
  'the right AI agent framework',
  'your perfect multi-agent stack',
  'the best workflow engine',
  'your ideal orchestration tool',
]

export default function Hero({ onStart }) {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    setStatsVisible(true)
  }, [])

  useEffect(() => {
    const currentText = TYPING_TEXTS[textIndex]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentText.slice(0, charIndex + 1))
        setCharIndex(charIndex + 1)
        if (charIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        setTypedText(currentText.slice(0, charIndex - 1))
        setCharIndex(charIndex - 1)
        if (charIndex === 0) {
          setIsDeleting(false)
          setTextIndex((textIndex + 1) % TYPING_TEXTS.length)
        }
      }
    }, isDeleting ? 30 : 65)

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <section className="hero" id="hero">
      <Scene3D />

      <div className="hero__content">
        <div className="hero__badge animate-in">
          <span className="hero__badge-dot" />
          <span className="mono">OPEN SOURCE AGENT ADVISOR</span>
        </div>

        <h1 className="hero__title animate-in animate-in-delay-1">
          Find{' '}
          <span className="hero__typed-wrapper">
            <span className="hero__typed glow-text">{typedText}</span>
            <span className="hero__cursor" />
          </span>
        </h1>

        <p className="hero__subtitle animate-in animate-in-delay-2">
          Stop guessing. Answer 6 questions and get a personalized AI agent stack 
          recommendation — with real benchmarks, pricing data, architecture diagrams, and production starter code.
        </p>

        <div className="hero__actions animate-in animate-in-delay-3">
          <button className="btn-primary hero__cta" onClick={onStart}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            Start Analysis
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('frameworks')?.scrollIntoView({ behavior: 'smooth' })}>
            Browse Frameworks
          </button>
        </div>

        <div className={`hero__stats ${statsVisible ? 'hero__stats--visible' : ''}`}>
          <div className="hero__stat">
            <span className="hero__stat-value glow-text">8</span>
            <span className="hero__stat-label">Frameworks</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value glow-text">9</span>
            <span className="hero__stat-label">LLM Models Priced</span>
          </div>
          <div className="hero__stat-divider" />
          <div className="hero__stat">
            <span className="hero__stat-value glow-text">100%</span>
            <span className="hero__stat-label">Free & Open Source</span>
          </div>
        </div>
      </div>

      <div className="hero__scroll-indicator animate-in animate-in-delay-5">
        <div className="hero__scroll-line" />
        <span className="mono">SCROLL</span>
      </div>
    </section>
  )
}
