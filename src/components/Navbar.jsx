import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import logo from '../assets/atria-logo.png';

const Navbar = ({ currentPage, navigate }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [password, setPassword] = useState('');
  const [logoClicks, setLogoClicks] = useState(0);
  const menuRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    if (next === 3) { setLogoClicks(0); setShowAdminModal(true); }
    else {
      setLogoClicks(next);
      if (window._adminTimer) clearTimeout(window._adminTimer);
      window._adminTimer = setTimeout(() => setLogoClicks(0), 2000);
    }
  };

  const handleAdminAuth = (e) => {
    e.preventDefault();
    if (password === 'Virat18') { setShowAdminModal(false); setPassword(''); navigate('admin'); }
    else alert('Incorrect Password');
  };

  const go = (page) => { setMenuOpen(false); navigate(page); };

  const navItems = [
    { label: 'Home',         page: 'home'         },
    { label: 'About',        page: 'about'        },
    { label: 'CFP',          page: 'cfp'          },
    { label: 'Committee',    page: 'committee'    },
    { label: 'Dates',        page: 'dates'        },
    { label: 'Speakers',     page: 'speakers'     },
    { label: 'Sponsors',     page: 'sponsors'     },
    { label: 'Registration', page: 'registration' },
  ];

  return (
    <>
      <header className="site-header" ref={menuRef}>

        {/* ── TIER 1: White banner — Atria logo + conference name ── */}
        <div className="header-banner" onClick={handleLogoClick} title="Home">
          <div className="header-banner-inner">
            <img src={logo} alt="Atria Institute of Technology" className="banner-logo" />
            <div className="banner-text">
              <span className="banner-conf-code">IC2ST-27</span>
              <span className="banner-conf-name">
                International Conference on Intelligence Computing,<br />
                Communication and Sustainable Technologies
              </span>
              <span className="banner-venue">
                Atria Institute of Technology, Bangalore &nbsp;·&nbsp; July 30–31, 2027
              </span>
            </div>
            <div className="banner-ieee">
              <span className="banner-ieee-text">IEEE</span>
              <span className="banner-ieee-sub">Conference</span>
            </div>
          </div>
        </div>

        {/* ── TIER 2: Dark nav bar ── */}
        <nav className="header-navbar">
          <div className="header-navbar-inner">
            <button className={`hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
              <span /><span /><span />
            </button>
            <ul className={`header-nav-list${menuOpen ? ' open' : ''}`}>
              {navItems.map(item => (
                <li key={item.page}
                  className={`header-nav-item${currentPage === item.page ? ' active' : ''}`}>
                  <button className="header-nav-link" onClick={() => go(item.page)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* Admin modal */}
      {showAdminModal && (
        <div className="admin-modal-overlay" onClick={() => setShowAdminModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <h3>Admin Access</h3>
            <form onSubmit={handleAdminAuth}>
              <input type="password" placeholder="Enter Password" value={password}
                onChange={e => setPassword(e.target.value)} autoFocus />
              <div className="admin-modal-actions">
                <button type="submit" className="btn btn-primary">Unlock</button>
                <button type="button" className="btn btn-secondary"
                  onClick={() => setShowAdminModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
