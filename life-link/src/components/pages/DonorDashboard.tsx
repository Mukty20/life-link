import { useState } from 'react'

interface DonorDashboardProps {
  onBack: () => void
  onOpenDonationForm: () => void
}

function DonorDashboard({ onBack, onOpenDonationForm }: DonorDashboardProps) {
  const [activeView, setActiveView] = useState<'overview' | 'history' | 'opportunities'>('overview')

  const donorStats = {
    totalDonations: 12,
    lastDonation: '3 months ago',
    nextEligible: 'Available Now',
    bloodType: 'O+',
    location: 'Jabi Road, Isa Kaita'
  }

  const donationHistory = [
    { id: 1, date: '2026-09-15', location: 'National Hospital', units: 1, status: 'Completed' },
    { id: 2, date: '2026-06-20', location: 'City Medical Center', units: 1, status: 'Completed' },
    { id: 3, date: '2026-03-10', location: 'SafeWay Blood Bank', units: 2, status: 'Completed' }
  ]

  const opportunities = [
    { id: 1, hospital: 'National Hospital', bloodType: 'O+', urgency: 'Urgent', date: '2026-12-20', distance: '2.5 km' },
    { id: 2, hospital: 'City Medical Center', bloodType: 'O+', urgency: 'Normal', date: '2026-12-22', distance: '5.1 km' },
    { id: 3, hospital: 'Regional Blood Bank', bloodType: 'O+', urgency: 'Critical', date: '2026-12-18', distance: '8.3 km' }
  ]

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <button className="btn-back" onClick={onBack}>← Back to Home</button>
          <h1>Donor Dashboard</h1>
          <p>Welcome back! Manage your donations and help save lives.</p>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`dashboard-nav-btn ${activeView === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveView('overview')}
        >
          Overview
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'history' ? 'active' : ''}`}
          onClick={() => setActiveView('history')}
        >
          Donation History
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'opportunities' ? 'active' : ''}`}
          onClick={() => setActiveView('opportunities')}
        >
          Opportunities
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'overview' && (
          <div className="dashboard-overview">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">🩸</div>
                <div className="stat-content">
                  <div className="stat-value-large">{donorStats.totalDonations}</div>
                  <div className="stat-label-large">Total Donations</div>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">📅</div>
                <div className="stat-content">
                  <div className="stat-value-large">{donorStats.lastDonation}</div>
                  <div className="stat-label-large">Last Donation</div>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">✅</div>
                <div className="stat-content">
                  <div className="stat-value-large">{donorStats.nextEligible}</div>
                  <div className="stat-label-large">Next Eligible</div>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">🏥</div>
                <div className="stat-content">
                  <div className="stat-value-large">{opportunities.length}</div>
                  <div className="stat-label-large">Available Requests</div>
                </div>
              </div>
            </div>

            <div className="dashboard-profile-section">
              <div className="profile-card">
                <h2>Your Profile</h2>
                <div className="profile-info">
                  <div className="profile-item">
                    <span className="profile-label">Blood Type:</span>
                    <span className="blood-type-badge">{donorStats.bloodType}</span>
                  </div>
                  <div className="profile-item">
                    <span className="profile-label">Location:</span>
                    <span className="profile-value">🗺️ {donorStats.location}</span>
                  </div>
                  <div className="profile-item">
                    <span className="profile-label">Status:</span>
                    <span className="status-badge available">Available</span>
                  </div>
                </div>
                <button className="btn-edit-profile">Edit Profile</button>
              </div>

              <div className="quick-actions-card">
                <h2>Quick Actions</h2>
                <div className="quick-actions">
                  <button className="btn-quick-action" onClick={onOpenDonationForm}>
                    📝 Schedule Donation
                  </button>
                  <button className="btn-quick-action">
                    📋 View Certificate
                  </button>
                  <button className="btn-quick-action">
                    📊 View Statistics
                  </button>
                  </div>
              </div>
            </div>

            <div className="recent-activity-card">
              <h2>Recent Activity</h2>
              <div className="activity-list">
                {donationHistory.slice(0, 3).map((donation) => (
                  <div key={donation.id} className="activity-item">
                    <div className="activity-icon">🩸</div>
                    <div className="activity-content">
                      <div className="activity-title">Donated at {donation.location}</div>
                      <div className="activity-date">{donation.date}</div>
                    </div>
                    <div className="activity-status completed">Completed</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'history' && (
          <div className="dashboard-history">
            <h2>Donation History</h2>
            <div className="history-table">
              <div className="history-header">
                <div>Date</div>
                <div>Location</div>
                <div>Units</div>
                <div>Status</div>
              </div>
              {donationHistory.map((donation) => (
                <div key={donation.id} className="history-row">
                  <div>{donation.date}</div>
                  <div>{donation.location}</div>
                  <div>{donation.units} unit</div>
                  <div><span className="status-badge available">{donation.status}</span></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'opportunities' && (
          <div className="dashboard-opportunities">
            <h2>Available Donation Opportunities</h2>
            <div className="opportunities-list">
              {opportunities.map((opp) => (
                <div key={opp.id} className="opportunity-card">
                  <div className="opportunity-header">
                    <div className="opportunity-hospital">{opp.hospital}</div>
                    <span className={`urgency-badge ${opp.urgency.toLowerCase()}`}>
                      {opp.urgency}
                    </span>
                  </div>
                  <div className="opportunity-details">
                    <div className="opportunity-detail">
                      <span className="detail-label">Blood Type:</span>
                      <span className="blood-type-badge-small">{opp.bloodType}</span>
                    </div>
                    <div className="opportunity-detail">
                      <span className="detail-label">Date Needed:</span>
                      <span>{opp.date}</span>
                    </div>
                    <div className="opportunity-detail">
                      <span className="detail-label">Distance:</span>
                      <span>{opp.distance}</span>
                    </div>
                  </div>
                  <button className="btn-respond">Respond to Request</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DonorDashboard

