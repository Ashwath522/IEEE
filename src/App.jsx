import React, { useState, useEffect, useRef } from 'react';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import RegistrationPage from './components/RegistrationPage';
import CommitteePage from './components/CommitteePage';
import './index.css';

// pages: 'home' | 'committee' | 'registration' | 'admin'
function App() {
  const [page, setPage] = useState('home');
  const [scrollTarget, setScrollTarget] = useState(null);
  const prevPage = useRef('home');

  // When navigating to home with a scroll target, wait for render then scroll
  useEffect(() => {
    if (page === 'home' && scrollTarget) {
      const attempt = () => {
        const el = document.querySelector(scrollTarget);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setScrollTarget(null);
        }
      };
      const t = setTimeout(attempt, 120);
      return () => clearTimeout(t);
    }
  }, [page, scrollTarget]);

  const navigate = (targetPage, scrollTo = null) => {
    prevPage.current = page;
    if (scrollTo && targetPage === 'home') {
      setScrollTarget(scrollTo);
    }
    setPage(targetPage);
  };

  if (page === 'admin') {
    return <AdminPage onBack={() => navigate('home')} />;
  }

  if (page === 'registration') {
    return <RegistrationPage navigate={navigate} />;
  }

  if (page === 'committee') {
    return <CommitteePage navigate={navigate} />;
  }

  return <HomePage navigate={navigate} />;
}

export default App;
