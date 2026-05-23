import React, { useState } from 'react';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage';
import RegistrationPage from './components/RegistrationPage';
import CommitteePage from './components/CommitteePage';
import './index.css';


function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isCommitteeOpen, setIsCommitteeOpen] = useState(false);

  if (isAdminOpen) {
    return <AdminPage onBack={() => setIsAdminOpen(false)} />;
  }

  if (isRegistrationOpen) {
    return <RegistrationPage onBack={() => setIsRegistrationOpen(false)} />;
  }
  
  if (isCommitteeOpen) {
    return (
      <CommitteePage 
        onBack={() => setIsCommitteeOpen(false)} 
        onOpenRegistration={() => setIsRegistrationOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />
    );
  }

  return (
    <HomePage 
      onOpenRegistration={() => setIsRegistrationOpen(true)} 
      onOpenAdmin={() => setIsAdminOpen(true)}
      onOpenCommittee={() => setIsCommitteeOpen(true)}
    />
  );
}

export default App;
