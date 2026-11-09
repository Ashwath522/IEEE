import React from 'react';
import './Footer.css';

const links = [
    { label: 'Call for Papers', page: 'cfp' },
    { label: 'Submissions', page: 'submissions' },
    { label: 'Important Dates', page: 'dates' },
    { label: 'Registration', page: 'registration' },
    { label: 'Committee', page: 'committee' },
    { label: 'Contact', page: 'contact' },
];

// Shared footer: a "next step" call-to-action band + site links, venue and contact.
const Footer = ({ navigate, hideCta = false }) => (
    <footer className="site-footer">
        {!hideCta && (
            <div className="footer-cta">
                <div className="container footer-cta-inner">
                    <div>
                        <h3>Ready to be part of IC2ST-27?</h3>
                        <p>Submit your paper via Microsoft CMT, then complete your registration.</p>
                    </div>
                    <div className="footer-cta-btns">
                        <button className="btn btn-primary" onClick={() => navigate('submissions')}>Submission Guidelines</button>
                        <button className="btn btn-outline-light" onClick={() => navigate('registration')}>Registration</button>
                    </div>
                </div>
            </div>
        )}

        <div className="container footer-grid">
            <div className="footer-col">
                <h4>IC2ST-27</h4>
                <p>International Conference on Intelligence Computing, Communication and Sustainable Technologies</p>
                <p className="footer-date">July 30–31, 2027</p>
            </div>
            <div className="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    {links.map(l => (
                        <li key={l.page}><button onClick={() => navigate(l.page)}>{l.label}</button></li>
                    ))}
                </ul>
            </div>
            <div className="footer-col">
                <h4>Venue</h4>
                <p>Atria Institute of Technology<br />ASKB Campus, 1st Main Rd, Ags Colony<br />Anand Nagar, Bangalore 560024</p>
                <a href="https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7" target="_blank" rel="noopener noreferrer">Get Directions ↗</a>
            </div>
            <div className="footer-col">
                <h4>Contact</h4>
                <p>Prasuna VP<br />Organizing Contact, IC2ST-27</p>
                <a href="tel:+919880598093">📞 +91 98805 98093</a>
            </div>
        </div>

        <div className="footer-bottom">
            <p>&copy; 2027 IC2ST. All rights reserved. | Last Updated: July 07, 2026</p>
        </div>
    </footer>
);

export default Footer;
