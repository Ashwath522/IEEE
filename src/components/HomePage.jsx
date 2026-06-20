import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './HomePage.css';
import techSupportImg from '../assets/index.png';

const Counter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const val = Number(target);
        if (isNaN(val) || val <= 0) { setCount(0); return; }
        let start = 0;
        const increment = val / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= val) { setCount(val); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return <span>{count}+</span>;
};

const HomePage = ({ navigate, currentPage }) => (
    <div className="home-page">
        <Navbar currentPage={currentPage} navigate={navigate} />
        
        {/* Hero Section */}
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    International Conference on Intelligence Computing,<br />
                    Communication and Sustainable Technologies — IC2ST-27
                </h1>
                <p className="hero-subtitle">Innovating for a Smarter Future at Atria Institute of Technology</p>
                <div className="hero-stats">
                    <div className="stat-item"><Counter target={250} /><p>Expected Attendance</p></div>
                    <div className="stat-item"><Counter target={10} /><p>Exhibits</p></div>
                </div>
                <div className="hero-btns">
                    <button className="btn btn-primary" onClick={() => navigate('registration')}>Register Now</button>
                    <button className="btn btn-outline" onClick={() => navigate('about')}>Learn More</button>
                </div>
            </div>
        </section>

        {/* Technically Supported By Section */}
        <section className="home-tech-support">
            <div className="container">
                <h2 className="section-title">Technically Supported By</h2>
                <div className="tech-support-wrapper">
                    <div className="tech-support-card">
                        <img src={techSupportImg} alt="Technically Supported By Logo" className="tech-support-img" />
                    </div>
                </div>
            </div>
        </section>

        {/* Location Section */}
        <section className="home-location">
            <div className="container">
                <h2 className="section-title">Location &amp; Venue</h2>
                <div className="location-grid">
                    <div className="location-info">
                        <h3>Conference Venue</h3>
                        <p className="venue-name">Atria Institute of Technology</p>
                        <p>ASKB Campus, 1st Main Rd, Ags Colony</p>
                        <p>Anand Nagar, Bangalore, Karnataka 560024</p>
                        <p className="conf-dates">📅 Dates: July 30th &amp; 31st, 2027</p>
                        <a href="https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-directions">Get Directions ↗</a>
                    </div>
                    <div className="location-map" onClick={() => window.open("https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7", "_blank")}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.049536506973!2d77.592124!3d13.032517499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bd97727093%3A0x5135aab8250c1df5!2sAtria%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1775707610232!5m2!1sen!2sin"
                            width="100%" height="300"
                            style={{ border: 0, borderRadius: '12px', pointerEvents: 'none' }}
                            allowFullScreen="" loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Atria Institute of Technology Location"
                        />
                        <div className="map-overlay"><span>Click to view on Google Maps</span></div>
                    </div>
                </div>
            </div>
        </section>

        {/* Contacts Section */}
        <section className="home-contacts">
            <div className="container">
                <h2 className="section-title">Contact Organizing Committee</h2>
                <div className="contacts-grid">
                    <div className="contact-card">
                        <h3>Jeevitha B. K.</h3>
                        <p className="contact-role">Organizing Chair, IC2ST-27</p>
                        <p>✉ bkjeevitha87@ieee.org</p>
                        <p>✉ bkjeevitha87@gmail.com</p>
                    </div>
                    <div className="contact-card">
                        <h3>Rajani Rai B.</h3>
                        <p className="contact-role">Organizing Chair, IC2ST-27</p>
                        <p>✉ rajani.rai@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>

        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default HomePage;
