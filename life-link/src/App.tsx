import { useState } from 'react'
import './App.css'
import SignIn from './components/pages/SignIn'
import Login from './components/pages/Login'
import DonationForm from './components/pages/DonationForm'
import DonorDashboard from './components/pages/DonorDashboard'
import HospitalDashboard from './components/pages/HospitalDashboard'



function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showDonationForm, setShowDonationForm] = useState(false)
  const [showDonorDashboard, setShowDonorDashboard] = useState(false)
  const [showHospitalDashboard, setShowHospitalDashboard] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Show dashboards if active
  if (showDonorDashboard) {
    return (
      <div className="app">
        <DonorDashboard 
          onBack={() => setShowDonorDashboard(false)}
          onOpenDonationForm={() => setShowDonationForm(true)}
        />
        {showDonationForm && (
          <DonationForm onClose={() => setShowDonationForm(false)} />
        )}
      </div>
    )
  }

  if (showHospitalDashboard) {
    return (
      <div className="app">
        <HospitalDashboard onBack={() => setShowHospitalDashboard(false)} />
      </div>
    )
  }

  return (
    <div className="app">
      
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1> LIFE-LINK</h1>
          </div>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
            <span className={mobileMenuOpen ? 'hamburger open' : 'hamburger'}></span>
          </button>
          <nav className={`nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#home" onClick={(e) => { e.preventDefault(); setShowDonorDashboard(false); setShowHospitalDashboard(false); setMobileMenuOpen(false) }}>Home</a>
            <button className="nav-link-btn" onClick={() => { setShowDonorDashboard(true); setMobileMenuOpen(false) }}>Donor Dashboard</button>
            <button className="nav-link-btn" onClick={() => { setShowHospitalDashboard(true); setMobileMenuOpen(false) }}>Hospital Dashboard</button>
            <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
            <div className="nav-auth-buttons">
              <button className="btn-primary" onClick={() => { setShowSignIn(true); setMobileMenuOpen(false) }}>Sign Up</button>
              <button className="btn-secondary" onClick={() => { setShowLogin(true); setMobileMenuOpen(false) }}>Log In</button>
            </div>
          </nav>
          <div className="auth-buttons desktop-auth">
            <button className="btn-primary" onClick={() => setShowSignIn(true)}>Sign Up</button>
            <button className="btn-secondary" onClick={() => setShowLogin(true)}>Log In</button>
          </div>
        </div>
      </header>

      
      <section className="home" id="home">
        <div className="home-content">
          <h2 className="home-title">SAVE A LIFE, DONATE BLOOD TODAY!</h2>
          <p className="home-subtitle">
             Register as a donor and make a difference.
Book a quick, safe donation appointment near you.
          </p>
          <div className="home-buttons">
            <button className="btn-home1" onClick={() => setShowDonationForm(true)}>Register To Donate</button>
          </div>
        </div>
        <div className="home-stats">
          <div className="stat-card">
            <div className="stat-number">2,476</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">69</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4,565</div>
            <div className="stat-label">Lives Saved</div>
          </div>
        </div>
      </section>  
      <h1>Donation Process</h1>

      <section className='home-stats' id='process'>
        <div className='stat-card'>
          <div className='stat-number'>Registration</div>
          <div className='stat-label'>Register by entering your name, contact information,
            and blood type so we can notify you when donors are needed.</div>
        </div>
        <div className='stat-card'>
          <div className='stat-number'>Donation</div>
          <div className='stat-label'>Visit the nearest center to donate and save lives.</div>
        </div>

        </section>  
        <h1>Ready To Save A Life Today?</h1>
        <button className='btn-home1' onClick={() => { setShowSignIn(true); setMobileMenuOpen(false) }}>Sign Up To Donate</button>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LIFE-LINK</h4>
            <p>The connection that keeps life going.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href='#'>Contact Us</a>
            <a href="#about">About Us</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <a href='imuktar437@gmailcom'>imuktar437@gmailcom</a>
            <p>Follow Us </p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LIFE-LINK. All rights reserved.</p>
        </div>
      </footer>

      {/* Modals */}
      {showLogin && (
        <Login 
          onSwitchToSignIn={() => {
            setShowLogin(false)
            setShowSignIn(true)
          }}
          onClose={() => setShowLogin(false)}
        />
      )}
      
      {showSignIn && (
        <SignIn 
          onSwitchToLogin={() => {
            setShowSignIn(false)
            setShowLogin(true)
          }}
          onClose={() => setShowSignIn(false)}
        />
      )}

      {showDonationForm && (
        <DonationForm 
          onClose={() => setShowDonationForm(false)}
        />
      )}
    </div>
  )
}

export default App