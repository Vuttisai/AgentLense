import { useEffect, useState } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState('Initializing neural network')

  useEffect(() => {
    const phases = [
      'Initializing neural network',
      'Loading agent frameworks',
      'Calibrating recommendation engine',
      'Preparing 3D environment',
      'Ready',
    ]

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + Math.random() * 15 + 5
        if (next >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 600)
          return 100
        }
        const phaseIndex = Math.min(Math.floor(next / 25), phases.length - 1)
        setPhase(phases[phaseIndex])
        return next
      })
    }, 200)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className={`loading ${progress >= 100 ? 'loading--done' : ''}`}>
      <div className="loading__content">
        <div className="loading__icon">
          <div className="loading__ring" />
          <div className="loading__ring loading__ring--2" />
          <div className="loading__center-dot" />
        </div>

        <div className="loading__text">
          <span className="loading__brand">
            Agent<span className="glow-text">Lens</span>
          </span>
        </div>

        <div className="loading__bar-wrap">
          <div className="loading__bar-track">
            <div className="loading__bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loading__meta">
            <span className="loading__phase mono">{phase}</span>
            <span className="loading__percent mono glow-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
