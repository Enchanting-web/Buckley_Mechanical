import { useState } from 'react'
import ContactForm from './components/ContactForm'
import './App.css'

const SERVICES = [
  {
    icon: '🔧',
    title: 'HVAC Installation',
    description:
      'Expert installation of heating, ventilation, and air conditioning systems for residential and commercial properties.',
  },
  {
    icon: '❄️',
    title: 'Cooling Systems',
    description:
      'Sales, installation, and maintenance of central air, mini-splits, and commercial cooling solutions.',
  },
  {
    icon: '🔥',
    title: 'Heating & Furnaces',
    description:
      'Furnace installation, boiler service, heat-pump upgrades, and emergency heating repairs.',
  },
  {
    icon: '🛠️',
    title: 'Preventative Maintenance',
    description:
      'Scheduled tune-ups and inspections to keep your systems running efficiently year-round.',
  },
  {
    icon: '📋',
    title: 'Indoor Air Quality',
    description:
      'Duct cleaning, air purifiers, humidifiers, and filtration upgrades for healthier indoor environments.',
  },
  {
    icon: '⚡',
    title: 'Emergency Service',
    description:
      '24/7 emergency repairs — because breakdowns never happen at a convenient time.',
  },
]

function App() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <div className="app">
      {/* Nav */}
      <header className="navbar">
        <div className="navbar-inner">
          <span className="brand">
            <span className="brand-icon">⚙️</span>
            <span className="brand-name">Buckley Mechanical</span>
          </span>
          <nav className="nav-links">
            <a href="#services">Services</a>
            <a href="#about">About</a>
            <button className="btn-primary" onClick={() => setContactOpen(true)}>
              Get a Quote
            </button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <h1>Professional Mechanical Services</h1>
        <p className="hero-sub">
          Heating · Cooling · Ventilation · Trusted since day one.
        </p>
        <div className="hero-actions">
          <button className="btn-primary large" onClick={() => setContactOpen(true)}>
            Request a Quote
          </button>
          <a href="#services" className="btn-secondary large">
            Our Services
          </a>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="services-section">
        <h2>What We Do</h2>
        <p className="section-sub">
          From installation to emergency repair, Buckley Mechanical has you covered.
        </p>
        <div className="services-grid">
          {SERVICES.map((s) => (
            <div key={s.title} className="service-card">
              <span className="service-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="about-text">
            <h2>About Buckley Mechanical</h2>
            <p>
              Buckley Mechanical is a family-owned mechanical contracting company
              dedicated to delivering reliable HVAC and mechanical solutions. Our
              certified technicians bring years of hands-on experience to every job,
              big or small.
            </p>
            <p>
              We believe in transparent pricing, quality workmanship, and standing
              behind everything we install or repair.
            </p>
          </div>
          <div className="about-stats">
            <div className="stat">
              <span className="stat-number">500+</span>
              <span className="stat-label">Projects Completed</span>
            </div>
            <div className="stat">
              <span className="stat-number">24/7</span>
              <span className="stat-label">Emergency Support</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Satisfaction Goal</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Buckley Mechanical. All rights reserved.</p>
      </footer>

      {/* Contact Modal */}
      {contactOpen && (
        <ContactForm onClose={() => setContactOpen(false)} />
      )}
    </div>
  )
}

export default App
