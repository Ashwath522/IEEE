import React, { useState, useEffect } from 'react';
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
const PAGES = ['home', 'cfp', 'submissions', 'committee', 'dates', 'speakers', 'sponsors', 'registration', 'contact', 'admin'];
const TITLES = {
  home: 'IC2ST-27 | International Conference on Intelligence Computing, Communication and Sustainable Technologies',
  cfp: 'Call for Papers', submissions: 'Submissions', committee: 'Committee', dates: 'Important Dates',
  speakers: 'Speakers & Schedule', sponsors: 'Sponsors', registration: 'Registration', contact: 'Contact', admin: 'Admin',
};

// Read the page from the URL hash (e.g. #/cfp) so links are shareable and the browser Back button works
const pageFromHash = () => {
  const p = window.location.hash.replace(/^#\/?/, '');
  return PAGES.includes(p) ? p : 'home';
};

function App() {
  const [page, setPage] = useState(pageFromHash);

  useEffect(() => {
    const onHash = () => { setPage(pageFromHash()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    document.title = page === 'home' ? TITLES.home : `${TITLES[page]} | IC2ST-27`;
  }, [page]);

  const navigate = (targetPage) => {
    if (targetPage === page) { window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
    window.location.hash = targetPage === 'home' ? '/' : `/${targetPage}`;
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
