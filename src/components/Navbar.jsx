import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/atria-logo.png';

const Navbar = ({ onOpenRegistration, onOpenAdmin, onOpenCommittee, onBack }) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogoClick = () => {
    const nextCount = logoClicks + 1;
    if (nextCount === 3) {
      setLogoClicks(0);
      setShowModal(true);
    } else {
      setLogoClicks(nextCount);
      if (window.logoClickTimeout) clearTimeout(window.logoClickTimeout);
      window.logoClickTimeout = setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (password === "Virat18") {
      setShowModal(false);
      setPassword('');
      onOpenAdmin();
    } else {
      alert("Incorrect Password");
    }
  };

  const handleNavClick = (section) => {
    if (onBack) {
      onBack();
      // Wait for state change to Home then scroll
      setTimeout(() => {
        const el = document.querySelector(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo" onClick={handleLogoClick}>
          <img src={logo} alt="Atria Logo" className="atria-logo-official" />
          <div className="logo-text">
            <span>ATRIA INSTITUTE OF TECHNOLOGY</span>
            <span className="year">2027</span>
          </div>
        </div>

        <ul className="nav-menu">
          <li className="nav-item"><a href="#home" onClick={() => handleNavClick('#home')}>Home</a></li>
          <li className="nav-item"><a href="#about" onClick={() => handleNavClick('#about')}>About</a></li>
          <li className="nav-item"><a href="#guidelines" onClick={() => handleNavClick('#guidelines')}>Guidelines</a></li>
          <li className="nav-item"><a href="#policy" onClick={() => handleNavClick('#policy')}>Policy</a></li>
          <li className="nav-item" onClick={onOpenCommittee}><a href="#committee" onClick={(e) => e.preventDefault()}>Committee</a></li>
          <li className="nav-item" onClick={onOpenRegistration}><a href="#registration" onClick={(e) => e.preventDefault()}>Registration</a></li>
        </ul>
      </div>

      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Admin Access</h3>
            <form onSubmit={handleAuth}>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Unlock</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
