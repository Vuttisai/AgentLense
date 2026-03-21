import { useRef, useEffect } from 'react'

/* ─── CSS-only Hero Background ─── */
/* Replaces the heavy Three.js scene (8 neural nodes, 10 connection lines, 
   400 particles, 1500 stars, 3 orbit rings, distorted sphere)
   with pure CSS/SVG animations. ~99% GPU savings. */

export default function Scene3D({ style, className }) {
  return (
    <div className={`scene3d ${className || ''}`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      {/* Gradient orbs */}
      <div className="scene3d__orb scene3d__orb--cyan" />
      <div className="scene3d__orb scene3d__orb--purple" />
      <div className="scene3d__orb scene3d__orb--amber" />

      {/* Central brain glow */}
      <div className="scene3d__brain" />

      {/* Orbit rings */}
      <div className="scene3d__ring scene3d__ring--1" />
      <div className="scene3d__ring scene3d__ring--2" />
      <div className="scene3d__ring scene3d__ring--3" />

      {/* Particle field (CSS dots) */}
      <div className="scene3d__particles">
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={i}
            className="scene3d__particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${2 + Math.random() * 3}px`,
              height: `${2 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
              background: i % 3 === 0 ? '#00e5ff' : i % 3 === 1 ? '#a855f7' : '#f5a623',
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Grid lines */}
      <svg className="scene3d__grid" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`h-${i}`} x1="0" y1={i * 10} x2="100" y2={i * 10} stroke="#00e5ff" strokeWidth="0.1" opacity="0.06" />
        ))}
        {Array.from({ length: 10 }, (_, i) => (
          <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#a855f7" strokeWidth="0.1" opacity="0.06" />
        ))}
      </svg>
    </div>
  )
}
