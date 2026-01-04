import React from 'react'

const Footer = () => {
  return (
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
  )
}

export default Footer
