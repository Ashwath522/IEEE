import React, { useState } from 'react';
import HomePage      from './components/HomePage';
import DatesPage     from './components/DatesPage';
import CFPPage       from './components/CFPPage';
import SubmissionsPage from './components/SubmissionsPage';
import CommitteePage from './components/CommitteePage';
import SpeakersPage  from './components/SpeakersPage';
import SponsorsPage  from './components/SponsorsPage';
import RegistrationPage from './components/RegistrationPage';
import ContactPage   from './components/ContactPage';
import AdminPage     from './components/AdminPage';
import './index.css';

// pages: home | cfp | submissions | committee | dates | speakers | sponsors | registration | contact | admin
function App() {
  const [page, setPage] = useState('home');

  const navigate = (targetPage) => {
    setPage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const props = { navigate, currentPage: page };

  switch (page) {
    case 'cfp':          return <CFPPage          {...props} />;
    case 'submissions':  return <SubmissionsPage  {...props} />;
    case 'committee':    return <CommitteePage    {...props} />;
    case 'dates':        return <DatesPage        {...props} />;
    case 'speakers':     return <SpeakersPage     {...props} />;
    case 'sponsors':     return <SponsorsPage     {...props} />;
    case 'registration': return <RegistrationPage {...props} />;
    case 'contact':      return <ContactPage      {...props} />;
    case 'admin':        return <AdminPage onBack={() => navigate('home')} />;
    default:             return <HomePage         {...props} />;
  }
}

export default App;
