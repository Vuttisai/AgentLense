import { useState, useRef, useEffect } from 'react'
import { QUESTIONS } from '../data/frameworks'
import './Analyzer.css'

export default function Analyzer({ onComplete, isActive }) {
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [transitioning, setTransitioning] = useState(false)
  const sectionRef = useRef(null)

  const question = QUESTIONS[currentQ]
  const progress = ((currentQ) / QUESTIONS.length) * 100

  const handleSelect = (value) => {
    setSelectedOption(value)
    setTransitioning(true)

    const newAnswers = { ...answers, [question.id]: value }
    setAnswers(newAnswers)

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ(currentQ + 1)
        setSelectedOption(null)
      } else {
        onComplete(newAnswers)
      }
      setTransitioning(false)
    }, 600)
  }

  const handleBack = () => {
    if (currentQ > 0) {
      setTransitioning(true)
      setTimeout(() => {
        setCurrentQ(currentQ - 1)
        setSelectedOption(answers[QUESTIONS[currentQ - 1].id] || null)
        setTransitioning(false)
      }, 300)
    }
  }

  if (!isActive) return null

  return (
    <section className="analyzer" id="analyzer" ref={sectionRef}>
      {/* Background effects */}
      <div className="analyzer__bg-orb analyzer__bg-orb--1" />
      <div className="analyzer__bg-orb analyzer__bg-orb--2" />

      <div className="analyzer__container">
        {/* Progress bar */}
        <div className="analyzer__progress-track">
          <div
            className="analyzer__progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div className="analyzer__progress-steps">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`analyzer__progress-step ${
                  i < currentQ ? 'analyzer__progress-step--done' :
                  i === currentQ ? 'analyzer__progress-step--active' : ''
                }`}
              >
                {i < currentQ ? '✓' : i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Question counter */}
        <div className="analyzer__counter mono">
          <span className="glow-text">{String(currentQ + 1).padStart(2, '0')}</span>
          <span className="analyzer__counter-sep">/</span>
          <span>{String(QUESTIONS.length).padStart(2, '0')}</span>
        </div>

        {/* Question card */}
        <div className={`analyzer__card ${transitioning ? 'analyzer__card--exit' : 'analyzer__card--enter'}`}>
          <div className="analyzer__question-icon">{question.icon}</div>
          <h2 className="analyzer__question">{question.question}</h2>

          <div className="analyzer__options">
            {question.options.map((opt, i) => (
              <button
                key={opt.value}
                className={`analyzer__option ${
                  selectedOption === opt.value ? 'analyzer__option--selected' : ''
                }`}
                onClick={() => handleSelect(opt.value)}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <span className="analyzer__option-icon">{opt.icon}</span>
                <span className="analyzer__option-label">{opt.label}</span>
                <span className="analyzer__option-check">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Back button */}
        {currentQ > 0 && (
          <button className="analyzer__back" onClick={handleBack}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Previous Question
          </button>
        )}
      </div>
    </section>
  )
}
