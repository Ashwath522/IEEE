import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const SpeakersPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Speakers &amp; Schedule</h1>
                    <p>Keynote speakers and detailed conference schedule for IC2ST-27.</p>
                </div>
            </div>
            <div className="page-body container">
                <div className="coming-soon-grid">
                    <div className="coming-soon-card">
                        <div className="cs-icon">🎙️</div>
                        <h3>Keynote Speakers</h3>
                        <p>Keynote speakers will be announced soon. Stay tuned for updates.</p>
                    </div>
                    <div className="coming-soon-card">
                        <div className="cs-icon">📅</div>
                        <h3>Detailed Schedule</h3>
                        <p>The full conference programme will be published closer to the event.</p>
                    </div>
                    <div className="coming-soon-card">
                        <div className="cs-icon">🏆</div>
                        <h3>Best Paper Awards</h3>
                        <p>Awards will be presented at the closing ceremony on July 31st, 2027.</p>
                    </div>
                </div>
            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default SpeakersPage;
