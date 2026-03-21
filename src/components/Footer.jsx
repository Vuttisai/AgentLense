import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__glow" />
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__logo">
            <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="url(#lgf)" strokeWidth="2" />
              <circle cx="14" cy="14" r="5" fill="url(#lgf)" />
              <defs>
                <linearGradient id="lgf" x1="0" y1="0" x2="28" y2="28">
                  <stop stopColor="#00e5ff" /><stop offset="1" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <span>Agent<span className="glow-text">Lens</span></span>
          </div>
          <p className="footer__tagline">
            Find the perfect AI agent framework for your next project.
            <br />Open source. Community driven. Always free.
          </p>
        </div>

        <div className="footer__links">
          <div className="footer__col">
            <h4 className="footer__col-title">Product</h4>
            <a href="#analyzer" className="footer__link">Stack Analyzer</a>
            <a href="#frameworks" className="footer__link">Frameworks</a>
            <a href="#compare" className="footer__link">Compare</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Community</h4>
            <a href="https://github.com/Vuttisai/AgentLense/" className="footer__link" target="_blank" rel="noopener">GitHub</a>
            <a href="https://twitter.com" className="footer__link" target="_blank" rel="noopener">Twitter</a>
            <a href="https://www.linkedin.com/in/saikumarvutti/" className="footer__link" target="_blank" rel="noopener">LinkedIn</a>
          </div>
          <div className="footer__col">
            <h4 className="footer__col-title">Resources</h4>
            <a href="#" className="footer__link">Blog</a>
            <a href="#" className="footer__link">API Docs</a>
            <a href="#" className="footer__link">Changelog</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright mono">
            © 2026 AgentLens · Built with ❤️ for the Agentic AI community
          </p>
          <div className="footer__built-with">
            <span className="footer__tech-badge">React</span>
            <span className="footer__tech-badge">Three.js</span>
            <span className="footer__tech-badge">Vite</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
