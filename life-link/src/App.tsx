import { useState } from 'react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'donor' | 'hospital'>('donor')
  const [bloodType, setBloodType] = useState('')
  const [location, setLocation] = useState('')

  return (
    <div className="app">
      
      <header className="header">
        <div className="header-container">
          <div className="logo">
            <h1>LIFE-LINK</h1>
            <span className="motto">Connecting Hearts, Saving Lives</span>
          </div>
          <nav className="nav">
            <a href="#home">Home</a>
            <a href="#donors">Find Donors</a>
            <a href="#hospitals">Hospitals</a>
            <a href="#about">About</a>
          </nav>
          <div className="auth-buttons">
            <button className="btn-secondary">Log In</button>
            <button className="btn-primary">Sign Up</button>
          </div>
        </div>
      </header>

      
      <section className="home" id="home">
        <div className="home-content">
          <h2 className="home-title">Every Drop Counts</h2>
          <p className="home-subtitle">
            Connecting donors with hospitals in need. Your donation can save a life today.
          </p>
          <div className="home-buttons">
            <button className="btn-home1">I Want to Donate</button>
            <button className="btn-home2">I Need Blood</button>
          </div>
        </div>
        <div className="home-stats">
          <div className="stat-card">
            <div className="stat-number">1,234</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">89</div>
            <div className="stat-label">Partner Hospitals</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5,678</div>
            <div className="stat-label">Lives Saved</div>
          </div>
        </div>
      </section>

      
      <main className="main-content">
        
        <div className="tab-container">
          <button
            className={`tab ${activeTab === 'donor' ? 'active' : ''}`}
            onClick={() => setActiveTab('donor')}
          >
            Donor Portal
          </button>
          <button
            className={`tab ${activeTab === 'hospital' ? 'active' : ''}`}
            onClick={() => setActiveTab('hospital')}
          >
            Hospital Portal
          </button>
        </div>

        
        {activeTab === 'donor' && (
          <section className="portal-section" id="donors">
            <div className="portal-header">
              <h2>Find Blood Donors</h2>
              <p>Search for available donors by blood type and location</p>
            </div>
            
            <div className="search-container">
              <div className="search-filters">
                <div className="filter-group">
                  <label>Blood Type</label>
                  <select 
                    className="filter-select"
                    value={bloodType}
                    onChange={(e) => setBloodType(e.target.value)}
                  >
                    <option value="">All Types</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Location</label>
                  <input
                    type="text"
                    className="filter-input"
                    placeholder="Enter city or area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <button className="btn-search">Search Donors</button>
              </div>
            </div>

            <div className="donor-cards">
              <div className="donor-card">
                <div className="donor-header">
                  <div className="blood-type-badge">O+</div>
                  <span className="status-badge available">Available</span>
                </div>
                <div className="donor-info">
                  <h3>Salim Isa</h3>
                  <p className="donor-location">🗺️ Jabi Road, Isa Kaita </p>
                  <p className="donor-details">Last donation: 2 months ago</p>
                  <p className="donor-details">Ready to donate: Yes</p>
                </div>
                <button className="btn-contact">Contact Donor</button>
              </div>

              <div className="donor-card">
                <div className="donor-header">
                  <div className="blood-type-badge">A+</div>
                  <span className="status-badge available">Available</span>
                </div>
                <div className="donor-info">
                  <h3>Sarah Smith</h3>
                  <p className="donor-location">🗺️ New Millini</p>
                  <p className="donor-details">Last donation: 3 months ago</p>
                  <p className="donor-details">Ready to donate: Yes</p>
                </div>
                <button className="btn-contact">Contact Donor</button>
              </div>

              <div className="donor-card">
                <div className="donor-header">
                  <div className="blood-type-badge">B+</div>
                  <span className="status-badge available">Available</span>
                </div>
                <div className="donor-info">
                  <h3>Mike Johnson</h3>
                  <p className="donor-location">📍 Chicago, IL</p>
                  <p className="donor-details">Last donation: 1 month ago</p>
                  <p className="donor-details">Ready to donate: Yes</p>
                </div>
                <button className="btn-contact">Contact Donor</button>
              </div>
            </div>

            <div className="cta-section">
              <h3>Want to become a donor?</h3>
              <p>Join our community and help save lives</p>
              <button className="btn-register">Register as Donor</button>
            </div>
          </section>
        )}

        
        {activeTab === 'hospital' && (
          <section className="portal-section" id="hospitals">
            <div className="portal-header">
              <h2>Hospital Portal</h2>
              <p>Manage blood requests and connect with donors</p>
            </div>

            <div className="hospital-dashboard">
              <div className="dashboard-stats">
                <div className="dashboard-stat">
                  <div className="stat-icon">🩸</div>
                  <div>
                    <div className="stat-value">12</div>
                    <div className="stat-desc">Pending Requests</div>
                  </div>
                </div>
                <div className="dashboard-stat">
                  <div className="stat-icon">✅</div>
                  <div>
                    <div className="stat-value">45</div>
                    <div className="stat-desc">Completed This Month</div>
                  </div>
                </div>
                <div className="dashboard-stat">
                  <div className="stat-icon">👥</div>
                  <div>
                    <div className="stat-value">28</div>
                    <div className="stat-desc">Matched Donors</div>
                  </div>
                </div>
              </div>

              <div className="request-section">
                <div className="section-header">
                  <h3>Create Blood Request</h3>
                  <button className="btn-new-request">+ New Request</button>
                </div>

                <div className="request-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Blood Type Required</label>
                      <select className="form-select">
                        <option value="">Select blood type</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Units Required</label>
                      <input type="number" className="form-input" placeholder="Enter units" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Urgency</label>
                      <select className="form-select">
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Required Date</label>
                      <input type="date" className="form-input" />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Notes</label>
                    <textarea className="form-textarea" placeholder="Any special requirements or notes..."></textarea>
                  </div>
                  <button className="btn-submit">Submit Request</button>
                </div>
              </div>

              <div className="requests-list">
                <h3>Recent Requests</h3>
                <div className="request-card">
                  <div className="request-header">
                    <span className="blood-type-badge-small">O+</span>
                    <span className="urgency-badge urgent">Urgent</span>
                  </div>
                  <div className="request-info">
                    <p><strong>Units:</strong> 3 bags</p>
                    <p><strong>Date:</strong> Dec 15, 2024</p>
                    <p><strong>Status:</strong> <span className="status-pending">Pending</span></p>
                  </div>
                  <div className="request-actions">
                    <button className="btn-action">View Matches</button>
                    <button className="btn-action-secondary">Cancel</button>
                  </div>
                </div>

                <div className="request-card">
                  <div className="request-header">
                    <span className="blood-type-badge-small">A-</span>
                    <span className="urgency-badge normal">Normal</span>
                  </div>
                  <div className="request-info">
                    <p><strong>Units:</strong> 2 bags</p>
                    <p><strong>Date:</strong> Dec 20, 2024</p>
                    <p><strong>Status:</strong> <span className="status-matched">Matched</span></p>
                  </div>
                  <div className="request-actions">
                    <button className="btn-action">View Matches</button>
                    <button className="btn-action-secondary">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>LIFE-LINK</h4>
            <p>Connecting donors with hospitals to save lives every day.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#home">Home</a>
            <a href="#donors">Find Donors</a>
            <a href="#hospitals">Hospitals</a>
            <a href="#about">About Us</a>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: info@lifelink.org</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 LIFE-LINK. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App