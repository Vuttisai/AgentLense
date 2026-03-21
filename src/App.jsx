import { useState, useCallback, useEffect } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen'

import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Analyzer from './sections/Analyzer'
import Results from './sections/Results'
import Benchmarks from './sections/Benchmarks'
import CostCalculator from './sections/CostCalculator'
import Frameworks from './sections/Frameworks'
import CodePlayground from './sections/CodePlayground'
import Compare from './sections/Compare'
import Footer from './components/Footer'
import { getRecommendations } from './data/frameworks'

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setWidth(total > 0 ? (scrolled / total) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} />
}

function App() {
  const [loaded, setLoaded] = useState(false)
  const [analyzerActive, setAnalyzerActive] = useState(false)
  const [recommendations, setRecommendations] = useState(null)

  const handleLoadComplete = useCallback(() => {
    setLoaded(true)
  }, [])

  const handleStartAnalysis = () => {
    setAnalyzerActive(true)
    setRecommendations(null)
    setTimeout(() => {
      document.getElementById('analyzer')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)
  }

  const handleAnalysisComplete = (answers) => {
    const results = getRecommendations(answers)
    setRecommendations(results)
    setAnalyzerActive(false)
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 300)
  }

  const handleReset = () => {
    setRecommendations(null)
    setAnalyzerActive(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}


      <ScrollProgress />
      <Navbar />

      <main>
        <Hero onStart={handleStartAnalysis} />

        <Analyzer
          isActive={analyzerActive}
          onComplete={handleAnalysisComplete}
        />

        {recommendations && (
          <Results
            recommendations={recommendations}
            onReset={handleReset}
          />
        )}

        <div className="section-divider" />
        <Benchmarks />

        <div className="section-divider" />
        <CostCalculator />

        <div className="section-divider" />
        <Frameworks />

        <div className="section-divider" />
        <CodePlayground />

        <div className="section-divider" />
        <Compare />
      </main>

      <Footer />
    </>
  )
}

export default App
