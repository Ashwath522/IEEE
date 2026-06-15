import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const SponsorsPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Sponsors &amp; Partners</h1>
                    <p>Supporting organisations and technical partners of IC2ST-27.</p>
                </div>
            </div>
            <div className="page-body container">
                <div className="sponsors-grid">
                    <div className="sponsor-box">Platinum Sponsor</div>
                    <div className="sponsor-box">Gold Sponsor</div>
                    <div className="sponsor-box">Silver Sponsor</div>
                    <div className="sponsor-box">Technical Partner</div>
                </div>
                <p className="sponsor-note">
                    Sponsorship details are currently being finalised. If your organisation is
                    interested in sponsoring IC2ST-27, please contact the organising committee.
                </p>
            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default SponsorsPage;
