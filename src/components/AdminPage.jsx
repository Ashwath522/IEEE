import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import AdminCommittee from './AdminCommittee';
import AdminImages from './AdminImages';
import './AdminPage.css';

const AdminPage = ({ onBack }) => {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    papersSubmitted: 0,
    reviewersAssigned: 0
  });
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('registrations');

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    const registrationsRef = ref(db, 'registrations');
    
    const unsubscribe = onValue(registrationsRef, (snapshot) => {
      const data = snapshot.val();
      const docs = [];
      
      if (data) {
        Object.keys(data).forEach((key) => {
          docs.push({ id: key, ...data[key] });
        });
        // Sort by timestamp descending
        docs.sort((a, b) => new Date(b.timestamp || b.created_at) - new Date(a.timestamp || a.created_at));
      }
      
      setRegistrations(docs);
      setStats({
        totalRegistrations: docs.length,
        papersSubmitted: Math.floor(docs.length * 0.4),
        reviewersAssigned: Math.floor(docs.length * 0.1)
      });
      setLoading(false);
    }, (err) => {
      console.error("Firebase error:", err);
      setError("Connection Error: Failed to sync with Firebase. Check your configuration.");
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="admin-page">
      <nav className="admin-nav">
        <div className="admin-nav-content">
          <h2>Admin Dashboard</h2>
          <button onClick={onBack} className="btn btn-secondary">Back to Site</button>
        </div>
      </nav>
      
      <div className="admin-content container">
        <div className="admin-tabs" style={{display: 'flex', gap: '20px', marginBottom: '30px', borderBottom: '1px solid #ddd'}}>
          <button 
            className={`tab-btn ${activeTab === 'registrations' ? 'active' : ''}`} 
            onClick={() => setActiveTab('registrations')}
            style={{padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'registrations' ? '3px solid #007bff' : 'none', fontWeight: activeTab === 'registrations' ? 'bold' : 'normal', cursor: 'pointer', color: activeTab === 'registrations' ? '#007bff' : '#666'}}
          >
            Registrations
          </button>
          <button 
            className={`tab-btn ${activeTab === 'committee' ? 'active' : ''}`} 
            onClick={() => setActiveTab('committee')}
            style={{padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'committee' ? '3px solid #007bff' : 'none', fontWeight: activeTab === 'committee' ? 'bold' : 'normal', cursor: 'pointer', color: activeTab === 'committee' ? '#007bff' : '#666'}}
          >
            Committee
          </button>
          <button 
            className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`} 
            onClick={() => setActiveTab('images')}
            style={{padding: '10px 20px', background: 'none', border: 'none', borderBottom: activeTab === 'images' ? '3px solid #007bff' : 'none', fontWeight: activeTab === 'images' ? 'bold' : 'normal', cursor: 'pointer', color: activeTab === 'images' ? '#007bff' : '#666'}}
          >
            Images
          </button>
        </div>

        {loading ? (
          <div className="admin-loading">Loading Dashboard Data...</div>
        ) : error ? (
          <div className="admin-error" style={{background: '#ffe6e6', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '2px solid #ff0000', margin: '50px 0'}}>
            <h3 style={{color: '#ff0000', marginBottom: '10px'}}>{error}</h3>
            <p>1. Open a NEW terminal.</p>
            <p>2. Type: <code>cd server && npm start</code></p>
            <p>3. Keep that terminal open!</p>
            <button onClick={() => window.location.reload()} className="btn btn-primary" style={{marginTop: '20px'}}>Retry Connection</button>
          </div>
        ) : (
          <>
            {activeTab === 'registrations' && (
              <>
                <div className="admin-stats-grid">
                  <div className="stat-card">
                    <h3>Total Registrations</h3>
                    <p className="stat-number">{stats.totalRegistrations.toLocaleString()}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Papers Submitted</h3>
                    <p className="stat-number">{stats.papersSubmitted.toLocaleString()}</p>
                  </div>
                  <div className="stat-card">
                    <h3>Reviewers Assigned</h3>
                    <p className="stat-number">{stats.reviewersAssigned.toLocaleString()}</p>
                  </div>
                </div>

                <div className="admin-management">
                  <div className="mgmt-card full-width">
                    <h3>All Registrations (Live Feed)</h3>
                    <div className="table-container">
                      <table className="reg-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>USN</th>
                            <th>Branch</th>
                            <th>Phone</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {registrations.map((reg) => (
                            <tr key={reg.id}>
                              <td>{reg.name}</td>
                              <td>{reg.usn}</td>
                              <td>{reg.branch}</td>
                              <td>{reg.phone}</td>
                              <td>{reg.email}</td>
                            </tr>
                          ))}
                          {registrations.length === 0 && (
                            <tr>
                              <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>No registrations found yet.</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="mgmt-card">
                    <h3>Data Management</h3>
                    <div className="mgmt-actions" style={{display: 'flex', gap: '10px'}}>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => {
                          const headers = 'Name,USN,Branch,Semester,Phone,Email,RegistrationDate\n';
                          const csv = registrations.map(row => {
                            const rawDate = row.timestamp || row.created_at;
                            const date = rawDate?.toDate ? rawDate.toDate().toISOString() : new Date(rawDate).toISOString();
                            return `"${row.name}","${row.usn}","${row.branch}",${row.sem},"${row.phone}","${row.email}","${date}"`;
                          }).join('\n');
                          const blob = new Blob([headers + csv], { type: 'text/csv' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'registrations.csv';
                          a.click();
                        }}
                      >
                        Download Excel (CSV)
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        style={{color: '#c41e3a', borderColor: '#c41e3a'}}
                        onClick={() => {
                          let sql = '-- IEEE Conference Registrations Export\n';
                          sql += '-- Generated at: ' + new Date().toISOString() + '\n\n';
                          registrations.forEach(row => {
                            const rawDate = row.timestamp || row.created_at;
                            const dateStr = rawDate?.toDate ? rawDate.toDate().toISOString().slice(0, 19).replace('T', ' ') : new Date(rawDate).toISOString().slice(0, 19).replace('T', ' ');
                            sql += `INSERT INTO registrations (name, usn, branch, sem, phone, email, created_at) VALUES ('${row.name}', '${row.usn}', '${row.branch}', ${row.sem}, '${row.phone}', '${row.email}', '${dateStr}');\n`;
                          });
                          const blob = new Blob([sql], { type: 'text/sql' });
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'registrations_backup.sql';
                          a.click();
                        }}
                      >
                        Download SQL
                      </button>
                    </div>
                    <p className="mgmt-note">Excel (CSV) is best for spreadsheet viewing. SQL is for database backups.</p>
                  </div>
                </div>
              </>
            )}
            {activeTab === 'committee' && <AdminCommittee />}
            {activeTab === 'images' && <AdminImages />}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
