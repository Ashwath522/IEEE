import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import bannerImg from '../assets/ic2st-banner.png';

/**
 * Navbar – exact two-tier layout matching ieee-discover.org
 *   Tier 1: white banner area with conference banner image (clickable → Home)
 *   Tier 2: dark nav bar with flat horizontal links
 *
 * Props:
 *   currentPage  – 'home' | 'committee' | 'registration' | 'admin'
 *   navigate(page, scrollTo?) – central router function
 */
const Navbar = ({ currentPage, navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [logoClicks, setLogoClicks] = useState(0);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Triple-click banner → admin modal
  const handleBannerClick = () => {
    const next = logoClicks + 1;
    if (next === 3) {
      setLogoClicks(0);
      setShowAdminModal(true);
    } else {
      setLogoClicks(next);
      if (window._adminClickTimer) clearTimeout(window._adminClickTimer);
      window._adminClickTimer = setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (password === 'Virat18') {
      setShowAdminModal(false);
      setPassword('');
      navigate('admin');
    } else {
      alert('Incorrect Password');
    }
  };

  // Navigate to a section: if already on home, just scroll; else go home + scroll
  const goToSection = (sectionId) => {
    setMenuOpen(false);
    if (currentPage === 'home') {
      const el = document.querySelector(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('home', sectionId);
    }
  };

  const goToPage = (page) => {
    setMenuOpen(false);
    navigate(page);
  };

  // Nav items – matching the structure of ieee-discover.org exactly
  const navItems = [
    { label: 'Home',         action: () => goToPage('home'),            page: 'home'        },
    { label: 'About',        action: () => goToSection('#about'),        section: '#about'   },
    { label: 'CFP',          action: () => goToSection('#guidelines'),   section: '#guidelines' },
    { label: 'Committee',    action: () => goToPage('committee'),        page: 'committee'   },
    { label: 'Dates',        action: () => goToSection('#dates'),        section: '#dates'   },
    { label: 'Speakers',     action: () => goToSection('#program'),      section: '#program' },
    { label: 'Sponsors',     action: () => goToSection('#sponsors'),     section: '#sponsors'},
    { label: 'Registration', action: () => goToPage('registration'),     page: 'registration'},
  ];

  const isActive = (item) => {
    if (item.page) return currentPage === item.page;
    return false;
  };

  return (
    <>
      <header className="site-header" ref={menuRef}>

        {/* ──────────── TIER 1: White banner with conference image ──────────── */}
        <div
          className="header-banner"
          onClick={handleBannerClick}
          title="Click 3× for admin"
        >
          <img
            src={bannerImg}
            alt="IC2ST-27 – International Conference on Intelligence Computing, Communication and Sustainable Technologies"
            className="header-banner-img"
          />
        </div>

        {/* ──────────── TIER 2: Dark nav bar ──────────── */}
        <nav className="header-navbar">
          <div className="header-navbar-inner">

            {/* Hamburger for mobile */}
            <button
              className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation"
            >
              <span /><span /><span />
            </button>

            {/* Main nav links */}
            <ul className={`header-nav-list${menuOpen ? ' open' : ''}`}>
              {navItems.map((item) => (
                <li
                  key={item.label}
                  className={`header-nav-item${isActive(item) ? ' active' : ''}`}
                >
                  <button
                    className="header-nav-link"
                    onClick={item.action}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

      </header>

      {/* ──────────── Admin Modal ──────────── */}
      {showAdminModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Admin Access</h3>
            <form onSubmit={handleAdminAuth}>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              <div className="admin-modal-actions">
                <button type="submit" className="btn btn-primary">Unlock</button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowAdminModal(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
