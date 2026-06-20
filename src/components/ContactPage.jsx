import React, { useState } from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const ContactPage = ({ navigate, currentPage }) => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mock submission
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 3000);
    };

    return (
        <div className="page-layout">
            <Navbar currentPage={currentPage} navigate={navigate} />
            <main className="page-main">
                <div className="page-hero">
                    <div className="container">
                        <span className="page-badge">IC2ST-27</span>
                        <h1>Contact Us</h1>
                        <p>Get in touch with the organizing committee and find venue directions.</p>
                    </div>
                </div>
                <div className="page-body container">
                    <div className="contact-page-grid">
                        
                        {/* Left: Contact Info */}
                        <div className="contact-info-panel">
                            <div className="contact-section-block">
                                <h2>Organizing Chairs</h2>
                                <div className="contact-details-list">
                                    <div className="contact-detail-item">
                                        <strong>Jeevitha B. K.</strong>
                                        <p>Organizing Chair, IC2ST-27</p>
                                        <p>✉ bkjeevitha87@ieee.org</p>
                                        <p>✉ bkjeevitha87@gmail.com</p>
                                    </div>
                                    <div className="contact-detail-item">
                                        <strong>Rajani Rai B.</strong>
                                        <p>Organizing Chair, IC2ST-27</p>
                                        <p>✉ rajani.rai@gmail.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-section-block">
                                <h2>Venue Address</h2>
                                <p><strong>Atria Institute of Technology</strong></p>
                                <p>ASKB Campus, 1st Main Rd, Ags Colony</p>
                                <p>Anand Nagar, Bangalore, Karnataka 560024</p>
                            </div>

                            <div className="contact-section-block">
                                <h2>Useful Links</h2>
                                <ul className="contact-links-list">
                                    <li><a href="https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7" target="_blank" rel="noopener noreferrer">Get Directions (Google Maps) ↗</a></li>
                                    <li><a href="https://atria.edu" target="_blank" rel="noopener noreferrer">Atria Official Website ↗</a></li>
                                </ul>
                            </div>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="contact-form-panel">
                            <h2>Send us an Inquiry</h2>
                            {submitted ? (
                                <div className="submission-success-msg">
                                    <p>Thank you for contacting us! We will get back to you shortly.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="inquiry-form">
                                    <div className="form-group">
                                        <label htmlFor="name">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            required
                                            placeholder="Rahul Kumar"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                            placeholder="rahul@example.com"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">Subject</label>
                                        <input
                                            type="text"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                            required
                                            placeholder="Query regarding CMT Submission / Registration"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message">Message</label>
                                        <textarea
                                            id="message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            placeholder="Write your message here..."
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary btn-submit-inquiry">Send Message</button>
                                </form>
                            )}
                        </div>

                    </div>
                </div>
            </main>
            <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
        </div>
    );
};

export default ContactPage;
