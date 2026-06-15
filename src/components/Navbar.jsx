import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/atria-logo.png';

const Navbar = ({ onOpenRegistration, onOpenAdmin, onOpenCommittee, onBack }) => {
  const [logoClicks, setLogoClicks] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

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
    setMenuOpen(false);
    if (onBack) {
      onBack();
      setTimeout(() => {
        const el = document.querySelector(section);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(section);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Close menu on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <header className="site-header">
      {/* ── TOP BANNER BAR ── */}
      <div className="header-banner" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <div className="header-banner-inner">
          <img src={logo} alt="Atria Institute of Technology Logo" className="banner-logo" />
          <div className="banner-text">
            <span className="banner-conf-name">IC2ST-27</span>
            <span className="banner-conf-full">
              International Conference on Intelligence Computing,<br />
              Communication and Sustainable Technologies
            </span>
            <span className="banner-venue">Atria Institute of Technology, Bangalore &nbsp;·&nbsp; July 30–31, 2027</span>
          </div>
          <div className="banner-ieee-badge">
            <span className="ieee-badge-text">IEEE</span>
            <span className="ieee-badge-sub">Conference</span>
          </div>
        </div>
      </div>

      {/* ── NAVIGATION BAR ── */}
      <nav className="navbar" ref={menuRef}>
        <div className="navbar-container">
          {/* Hamburger for mobile */}
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>

          <ul className={`nav-menu ${menuOpen ? 'nav-open' : ''}`}>
            <li className="nav-item">
              <a href="#home" onClick={() => handleNavClick('#home')}>Home</a>
            </li>
            <li className="nav-item">
              <a href="#about" onClick={() => handleNavClick('#about')}>About</a>
            </li>
            <li className="nav-item">
              <a href="#dates" onClick={() => handleNavClick('#dates')}>Dates</a>
            </li>
            <li className="nav-item">
              <a href="#guidelines" onClick={() => handleNavClick('#guidelines')}>Guidelines</a>
            </li>
            <li className="nav-item">
              <a href="#policy" onClick={() => handleNavClick('#policy')}>Policy</a>
            </li>
            <li className="nav-item" onClick={() => { setMenuOpen(false); onOpenCommittee(); }}>
              <a href="#committee" onClick={(e) => e.preventDefault()}>Committee</a>
            </li>
            <li className="nav-item">
              <a href="#sponsors" onClick={() => handleNavClick('#sponsors')}>Sponsors</a>
            </li>
            <li className="nav-item" onClick={() => { setMenuOpen(false); onOpenRegistration(); }}>
              <a href="#registration" onClick={(e) => e.preventDefault()} className="nav-register-btn">
                Register
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── ADMIN MODAL ── */}
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
    </header>
  );
};

export default Navbar;
