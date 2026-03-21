import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    let ringX = 0, ringY = 0
    let dotX = 0, dotY = 0
    let animId

    const moveCursor = (e) => {
      dotX = e.clientX
      dotY = e.clientY
    }

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.left = `${dotX}px`
        dotRef.current.style.top = `${dotY}px`
      }
      // Ring lags behind smoothly
      ringX += (dotX - ringX) * 0.12
      ringY += (dotY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = `${ringX}px`
        ringRef.current.style.top = `${ringY}px`
      }
      animId = requestAnimationFrame(animate)
    }

    const onEnter = (e) => {
      const target = e.target
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.classList.contains('glass-card') ||
        target.classList.contains('analyzer__option') ||
        target.classList.contains('frameworks__filter') ||
        target.classList.contains('compare__selector')
      ) {
        setHovered(true)
      }
    }

    const onLeave = () => setHovered(false)

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor__dot"
        style={{ position: 'fixed', pointerEvents: 'none' }}
      />
      <div
        ref={ringRef}
        className={`cursor__ring ${hovered ? 'cursor__ring--hover' : ''}`}
        style={{ position: 'fixed', pointerEvents: 'none' }}
      />
    </>
  )
}
