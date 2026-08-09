import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Menu,
  Moon,
  Play,
  Sparkles,
  Sun,
  X,
} from "lucide-react";
import { HeroScene } from "../components/3d/HeroScene.jsx";

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; }, [dark]);

  return (
    <main className="landing-shell">
      <div className="noise" aria-hidden="true" />
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Workloom home"><img className="brand-logo" src="/workloom-logo.png" alt="" /><span>Workloom</span></a>
        <nav className={menuOpen ? "main-nav open" : "main-nav"}>
          <a href="#product" onClick={() => setMenuOpen(false)}>Product</a>
          <a href="#solutions" onClick={() => setMenuOpen(false)}>Solutions</a>
          <a href="#resources" onClick={() => setMenuOpen(false)}>Resources</a>
          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
        </nav>
        <div className="header-actions">
          <a className="login-link" href="/login">Log in</a>
          <button className="theme-button" aria-label="Toggle theme" onClick={() => setDark((value) => !value)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
          <a className="button button-small" href="/signup">Get started <ArrowRight size={15} /></a>
          <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <section className="hero" id="top">
        <HeroScene />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <div className="eyebrow"><Sparkles size={14} /> Plan, collaborate, ship.</div>
          <h1>Where projects<br /><span>come together.</span></h1>
          <p>Workloom is the modern workspace for planning, collaboration, and delivering work that matters.</p>
          <div className="hero-actions">
            <a className="button" href="/signup">Get started for free <ArrowRight size={17} /></a>
            <button className="button button-ghost" onClick={() => setShowVideo(true)}><Play size={15} fill="currentColor" /> See how it works</button>
          </div>
          <div className="hero-proof"><span>Trusted by fast-moving teams</span><span>◈ northstar</span><span>◈ pixelpeak</span><span>◈ sequence</span></div>
        </div>
        <div className="scroll-cue"><span /> Scroll to explore</div>
      </section>

      <section className="feature-strip" id="product">
        <div><span className="feature-icon violet"><Check size={17} /></span><h2>Plan with clarity</h2><p>Break down complex work, set priorities, and align on what matters.</p></div>
        <div><span className="feature-icon cyan"><Check size={17} /></span><h2>Collaborate seamlessly</h2><p>Share updates, keep context close, and move together without the noise.</p></div>
        <div><span className="feature-icon green"><Check size={17} /></span><h2>Track in real time</h2><p>See progress as it happens with focused project views and activity.</p></div>
        <div><span className="feature-icon orange"><Check size={17} /></span><h2>Ship with confidence</h2><p>Turn good intentions into finished work, every time.</p></div>
      </section>

      <section className="closing-section" id="solutions">
        <div><div className="eyebrow"><Sparkles size={14} /> Built for momentum</div><h2>Your team’s best work has a place to land.</h2><p>One calm, connected space for projects, tasks, people, and the decisions that keep everything moving.</p></div>
        <a className="button" href="/signup">Build your workspace <ArrowRight size={17} /></a>
      </section>

      <footer className="site-footer" id="resources"><span>© 2026 Workloom</span><span>Organize the work. Own the momentum.</span></footer>

      {showVideo && <div className="video-modal" role="dialog" aria-modal="true" aria-label="Workloom preview" onClick={() => setShowVideo(false)}><div className="video-card" onClick={(event) => event.stopPropagation()}><button className="close-modal" onClick={() => setShowVideo(false)}><X /></button><div className="video-placeholder"><Play size={34} fill="currentColor" /><span>Workloom in motion</span></div></div></div>}
    </main>
  );
}



