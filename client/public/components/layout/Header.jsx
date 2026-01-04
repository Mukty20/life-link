import React from 'react';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// interface HeaderProps {
//   onShowLogin: () => void;
//   onShowSignIn: () => void;
//   onShowDonorDashboard: () => void;
//   onShowHospitalDashboard: () => void;
//   setMobileMenuOpen: (isOpen: boolean) => void;
//   mobileMenuOpen: boolean;
// }

const Header = ({
  onShowLogin,
  onShowSignIn,
  onShowDonorDashboard,
  onShowHospitalDashboard,
  setMobileMenuOpen,
  mobileMenuOpen,
}) => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>LIFE-LINK</h1>
          <span className="motto">Where Every Drop Becomes Hope</span>
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
          <a href="#home" onClick={(e) => { e.preventDefault(); onShowDonorDashboard(); onShowHospitalDashboard(); setMobileMenuOpen(false); }}>Home</a>

          <button className="nav-link-btn" onClick={() => { onShowDonorDashboard(); setMobileMenuOpen(false); }}>Donor Dashboard</button>

          <button className="nav-link-btn" onClick={() => { onShowHospitalDashboard(); setMobileMenuOpen(false); }}>Hospital Dashboard</button>

          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>

          <div className="nav-auth-buttons">
            <button className="btn-secondary" onClick={() => { onShowLogin(); setMobileMenuOpen(false); }}>Log In</button>
            <button className="btn-primary" onClick={() => { onShowSignIn(); setMobileMenuOpen(false); }}>Sign Up</button>
          </div>
          
        </nav>
        <div className="auth-buttons desktop-auth">
          <button className="btn-secondary" onClick={onShowLogin}>Log In</button>
          <button className="btn-primary" onClick={onShowSignIn}>Sign Up</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
