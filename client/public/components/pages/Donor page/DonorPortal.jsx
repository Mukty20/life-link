import React, { useState } from 'react';



const DonorPortal = ({ onShowSignIn }) => {
  const [bloodType, setBloodType] = useState('');
  const [location, setLocation] = useState('');

  return (
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
            <p className="donor-details">Last donation: 5 months ago</p>
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
            <h3>Mukthar Ibrahim</h3>
            <p className="donor-location">🗺️ New Millennium City</p>
            <p className="donor-details">Last donation: 3 months ago</p>
            <p className="donor-details">Ready to donate: Yes</p>
          </div>
          <button className="btn-contact">Contact Donor</button>
        </div>

        <div className="donor-card">
          <div className="donor-header">
            <div className="blood-type-badge">AB</div>
            <span className="status-badge unavailable">Unavailable</span>
          </div>
          <div className="donor-info">
            <h3>Mike Johnson</h3>
            <p className="donor-location">🗺️ Unguwan Rimi</p>
            <p className="donor-details">Last donation: 1 month ago</p>
            <p className="donor-details">Ready to donate: No</p>
          </div>
          <button className="btn-contact" disabled>Contact Donor</button>
        </div>
      </div>
    
      <div className="cta-section">
        <h3>Want to become a donor?</h3>
        <p>Join our community and help save lives</p>
        <button className="btn-register" onClick={onShowSignIn}>Register as Donor</button>
      </div>
    </section>
  );
};

export default DonorPortal;
