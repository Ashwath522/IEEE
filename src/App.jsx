import React, { useState } from 'react';
import HomePage      from './components/HomePage';
import AboutPage     from './components/AboutPage';
import DatesPage     from './components/DatesPage';
import CFPPage       from './components/CFPPage';
import CommitteePage from './components/CommitteePage';
import SpeakersPage  from './components/SpeakersPage';
import SponsorsPage  from './components/SponsorsPage';
import RegistrationPage from './components/RegistrationPage';
import AdminPage     from './components/AdminPage';
import './index.css';

// pages: home | about | cfp | committee | dates | speakers | sponsors | registration | admin
function App() {
  const [page, setPage] = useState('home');

  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const props = { navigate, currentPage: page };

  switch (page) {
    case 'about':        return <AboutPage        {...props} />;
    case 'cfp':          return <CFPPage          {...props} />;
    case 'committee':    return <CommitteePage    {...props} />;
    case 'dates':        return <DatesPage        {...props} />;
    case 'speakers':     return <SpeakersPage     {...props} />;
    case 'sponsors':     return <SponsorsPage     {...props} />;
    case 'registration': return <RegistrationPage {...props} />;
    case 'admin':        return <AdminPage onBack={() => navigate('home')} />;
    default:             return <HomePage         {...props} />;
  }
}

export default App;
