import { useState } from 'react'

interface HospitalDashboardProps {
  onBack: () => void
}

function HospitalDashboard({ onBack }: HospitalDashboardProps) {
  const [activeView, setActiveView] = useState<'overview' | 'requests' | 'donors'>('overview')
  const [showRequestForm, setShowRequestForm] = useState(false)

  const hospitalStats = {
    pendingRequests: 10,
    completedThisMonth: 45,
    matchedDonors: 30,
    criticalRequests: 5
  }

  const bloodRequests = [
    { id: 1, bloodType: 'O+', units: 3, urgency: 'Urgent', date: '2026-12-15', status: 'Pending', matchedDonors: 2 },
    { id: 2, bloodType: 'A-', units: 2, urgency: 'Normal', date: '2026-12-20', status: 'Matched', matchedDonors: 3 },
    { id: 3, bloodType: 'B+', units: 5, urgency: 'Critical', date: '2026-12-18', status: 'Pending', matchedDonors: 1 },
    { id: 4, bloodType: 'AB-', units: 1, urgency: 'Urgent', date: '2026-12-22', status: 'Matched', matchedDonors: 2 }
  ]

  const matchedDonors = [
    { id: 1, name: 'Salim Isa', bloodType: 'O+', location: 'Jabi Road', phone: '+234 801 234 5678', status: 'Available' },
    { id: 2, name: 'Mukthar Ibrahim', bloodType: 'A-', location: 'New Millennium City', phone: '+234 802 345 6789', status: 'Available' },
    { id: 3, name: 'Ahmed Musa', bloodType: 'B+', location: 'Unguwan Rimi', phone: '+234 803 456 7890', status: 'Available' }
  ]

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Blood request submitted successfully!')
    setShowRequestForm(false)
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-header-content">
          <button className="btn-back" onClick={onBack}>← Back to Home</button>
          <h1>Hospital Dashboard</h1>
          <p>Manage blood requests and connect with donors.</p>
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
          className={`dashboard-nav-btn ${activeView === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveView('requests')}
        >
          Blood Requests
        </button>
        <button 
          className={`dashboard-nav-btn ${activeView === 'donors' ? 'active' : ''}`}
          onClick={() => setActiveView('donors')}
        >
          Matched Donors
        </button>
      </div>

      <div className="dashboard-content">
        {activeView === 'overview' && (
          <div className="dashboard-overview">
            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">🩸</div>
                <div className="stat-content">
                  <div className="stat-value-large">{hospitalStats.pendingRequests}</div>
                  <div className="stat-label-large">Pending Requests</div>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">✅</div>
                <div className="stat-content">
                  <div className="stat-value-large">{hospitalStats.completedThisMonth}</div>
                  <div className="stat-label-large">Completed This Month</div>
                </div>
              </div>
              <div className="dashboard-stat-card">
                <div className="stat-icon-large">🫂</div>
                <div className="stat-content">
                  <div className="stat-value-large">{hospitalStats.matchedDonors}</div>
                  <div className="stat-label-large">Matched Donors</div>
                </div>
              </div>
              <div className="dashboard-stat-card critical">
                <div className="stat-icon-large">🔴</div>
                <div className="stat-content">
                  <div className="stat-value-large">{hospitalStats.criticalRequests}</div>
                  <div className="stat-label-large">Critical Requests</div>
                </div>
              </div>
            </div>

            <div className="quick-actions-card">
              <h2>Quick Actions</h2>
              <div className="quick-actions">
                <button className="btn-quick-action" onClick={() => setShowRequestForm(true)}>
                  ➕ Create Blood Request
                </button>
                <button className="btn-quick-action">
                  🔍 Search Donors
                </button>
                <button className="btn-quick-action">
                  📊 View Reports
                </button>
              </div>
            </div>

            <div className="recent-requests-card">
              <div className="card-header">
                <h2>Recent Blood Requests</h2>
                <button className="btn-view-all">View All</button>
              </div>
              <div className="requests-list-compact">
                {bloodRequests.slice(0, 3).map((request) => (
                  <div key={request.id} className="request-item-compact">
                    <div className="request-item-header">
                      <span className="blood-type-badge-small">{request.bloodType}</span>
                      <span className={`urgency-badge ${request.urgency.toLowerCase()}`}>
                        {request.urgency}
                      </span>
                    </div>
                    <div className="request-item-details">
                      <span>{request.units} units</span>
                      <span>•</span>
                      <span>{request.date}</span>
                      <span>•</span>
                      <span className={request.status === 'Matched' ? 'status-matched' : 'status-pending'}>
                        {request.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeView === 'requests' && (
          <div className="dashboard-requests">
            <div className="section-header">
              <h2>Blood Requests</h2>
              <button className="btn-new-request" onClick={() => setShowRequestForm(true)}>
                + New Request
              </button>
            </div>

            {showRequestForm && (
              <div className="request-form-card">
                <h3>Create New Blood Request</h3>
                <form onSubmit={handleSubmitRequest} className="request-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Blood Type Required</label>
                      <select className="form-select" required>
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
                      <input type="number" className="form-input" placeholder="Enter units" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Urgency</label>
                      <select className="form-select" required>
                        <option value="normal">Normal</option>
                        <option value="urgent">Urgent</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Required Date</label>
                      <input type="date" className="form-input" required />
                    </div>
                  </div>
                  <div className="form-group full-width">
                    <label>Additional Notes</label>
                    <textarea className="form-textarea" placeholder="Any special requirements or notes..."></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="btn-submit">Submit Request</button>
                    <button type="button" className="btn-cancel" onClick={() => setShowRequestForm(false)}>Cancel</button>
                  </div>
                </form>
              </div>
            )}

            <div className="requests-table">
              <div className="requests-header">
                <div>Blood Type</div>
                <div>Units</div>
                <div>Urgency</div>
                <div>Date</div>
                <div>Status</div>
                <div>Matches</div>
                <div>Actions</div>
              </div>
              {bloodRequests.map((request) => (
                <div key={request.id} className="requests-row">
                  <div><span className="blood-type-badge-small">{request.bloodType}</span></div>
                  <div>{request.units}</div>
                  <div><span className={`urgency-badge ${request.urgency.toLowerCase()}`}>{request.urgency}</span></div>
                  <div>{request.date}</div>
                  <div>
                    <span className={request.status === 'Matched' ? 'status-matched' : 'status-pending'}>
                      {request.status}
                    </span>
                  </div>
                  <div>{request.matchedDonors} donors</div>
                  <div>
                    <button className="btn-action-small">View</button>
                    <button className="btn-action-small secondary">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeView === 'donors' && (
          <div className="dashboard-donors">
            <h2>Matched Donors</h2>
            <div className="donors-grid">
              {matchedDonors.map((donor) => (
                <div key={donor.id} className="donor-card-dashboard">
                  <div className="donor-card-header">
                    <div className="blood-type-badge">{donor.bloodType}</div>
                    <span className="status-badge available">{donor.status}</span>
                  </div>
                  <div className="donor-card-body">
                    <h3>{donor.name}</h3>
                    <p className="donor-location">🗺️ {donor.location}</p>
                    <p className="donor-phone">📞 {donor.phone}</p>
                  </div>
                  <div className="donor-card-actions">
                    <button className="btn-contact">Contact</button>
                    <button className="btn-view-profile">View Profile</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HospitalDashboard

