import { useNavigate } from 'react-router-dom'

const features = [
  {
    icon: '🤖',
    title: 'AI Learning Hub',
    desc: 'Explore artificial intelligence concepts through immersive 3D classrooms. Learn machine learning, prompt engineering and ethical AI in an interactive virtual world.',
    gradient: 'linear-gradient(135deg, #6C63FF, #00D4FF)',
  },
  {
    icon: '🌱',
    title: 'Sustainability World',
    desc: 'Walk through virtual ecosystems that teach climate awareness, renewable energy and environmental stewardship in ways no textbook ever could.',
    gradient: 'linear-gradient(135deg, #6BCB77, #00D4FF)',
  },
  {
    icon: '🎮',
    title: 'Play & Learn',
    desc: 'Gamified quests, puzzles and missions keep learning engaging. Earn achievements and unlock new zones of the metaverse as your knowledge grows.',
    gradient: 'linear-gradient(135deg, #FF6B6B, #FFD93D)',
  },
  {
    icon: '🏫',
    title: 'Virtual School',
    desc: 'Our first building — a UAE private school focused on AI education. Explore classrooms, labs, and hallways just like you would in real life.',
    gradient: 'linear-gradient(135deg, #6C63FF, #FF6B6B)',
  },
  {
    icon: '👥',
    title: 'Social Metaverse',
    desc: 'Meet other learners from around the world. Collaborate on projects, share ideas, and build friendships across the digital frontier.',
    gradient: 'linear-gradient(135deg, #FFD93D, #6BCB77)',
  },
  {
    icon: '🏆',
    title: 'Achievements & Badges',
    desc: 'Track your progress with a rich achievement system. From your first steps inside the metaverse to mastering advanced AI topics.',
    gradient: 'linear-gradient(135deg, #00D4FF, #6C63FF)',
  },
]

const steps = [
  { n: '01', title: 'Enter the World', desc: 'Click "Enter Metaverse" and step into a fully 3D interactive learning environment.' },
  { n: '02', title: 'Explore & Discover', desc: 'Walk through the Emirates AI School, discover classrooms, labs, and hidden zones.' },
  { n: '03', title: 'Learn by Doing', desc: 'Interact with AI-powered learning objects and complete missions to earn rewards.' },
  { n: '04', title: 'Grow & Create', desc: 'Unlock new buildings, create your own avatar style, and shape the digital world.' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar">
        <span className="navbar-logo">🌐 WisdomVerse</span>
        <ul className="navbar-links">
          <li><a href="#features">Features</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#metaverse">Metaverse</a></li>
          <li>
            <a href="#metaverse" className="navbar-cta" onClick={e => { e.preventDefault(); navigate('/play') }}>
              Enter World
            </a>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now Live · UAE Metaverse Platform
          </div>

          <h1 className="hero-title">
            Play. Learn.<br />
            <span className="gradient-text">Transform.</span>
          </h1>

          <p className="hero-subtitle">
            The world's first AI-powered educational metaverse. Explore the Emirates
            virtual world, attend 3D schools, and master the skills that will define tomorrow.
          </p>

          <div className="hero-buttons">
            <button id="btn-enter-metaverse" className="btn-primary" onClick={() => navigate('/play')}>
              🚀 Enter the Metaverse
            </button>
            <a href="#features" className="btn-secondary">
              ✨ Explore Features
            </a>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-number">10K+</div>
              <div className="hero-stat-label">Active Learners</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">50+</div>
              <div className="hero-stat-label">AI Missions</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">3D</div>
              <div className="hero-stat-label">Immersive World</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-number">UAE</div>
              <div className="hero-stat-label">Based & Global</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section">
        <div className="section-eyebrow">✦ Features</div>
        <h2 className="section-title">A Universe Built<br />for Curious Minds</h2>
        <p className="section-subtitle">
          Every corner of WisdomVerse is designed to spark curiosity, fuel creativity, and build real-world skills.
        </p>
        <div className="features-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={{ '--card-gradient': f.gradient } as React.CSSProperties}
            >
              <div className="feature-icon" style={{ background: f.gradient + '22' }}>
                {f.icon}
              </div>
              <div className="feature-title">{f.title}</div>
              <div className="feature-desc">{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* METAVERSE BANNER */}
      <section id="metaverse">
        <div className="metaverse-banner">
          <div className="metaverse-banner-glow" />
          <div className="floating-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>
          <div className="metaverse-banner-content">
            <p style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🏙️</p>
            <h2 className="metaverse-banner-title">
              Emirates AI School<br />is Open
            </h2>
            <p className="metaverse-banner-sub">
              Walk through the halls of the UAE's first virtual AI private school.
              Explore classrooms, labs, and meet other learners — all in full 3D.
            </p>
            <button id="btn-enter-metaverse-2" className="btn-primary" onClick={() => navigate('/play')}>
              🌐 Enter Now — It's Free
            </button>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section">
        <div className="section-eyebrow">✦ How It Works</div>
        <h2 className="section-title">From Zero to<br />Wisdom in 4 Steps</h2>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <div className="step-card" key={i}>
              <div className="step-number">{s.n}</div>
              <div className="step-title">{s.title}</div>
              <div className="step-desc">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <span className="footer-logo">🌐 WisdomVerse</span>
        <span className="footer-copy">
          © 2026 WisdomVerse · AI-Powered Educational Metaverse · UAE
        </span>
        <button className="btn-primary" onClick={() => navigate('/play')} style={{ fontSize: '0.85rem', padding: '0.6rem 1.5rem' }}>
          🚀 Enter Metaverse
        </button>
      </footer>
    </div>
  )
}
