import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { db } from '../firebase';
import './HomePage.css';

const Counter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const val = Number(target);
        if (isNaN(val) || val <= 0) {
            setCount(0);
            return;
        }

        let start = 0;
        const increment = val / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= val) {
                setCount(val);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);

    return <span>{count}+</span>;
};

const HomePage = ({ onOpenRegistration, onOpenAdmin, onOpenCommittee }) => {
    const tracks = [
        { 
            title: "Intelligence Computing & AI", 
            desc: "AI, Machine Learning, Deep Learning, NLP, Computer Vision, and Robotics.",
            keywords: ["Artificial Intelligence", "Neural Networks", "Evolutionary Algorithms", "Intelligent Control"]
        },
        { 
            title: "Communication Technologies", 
            desc: "5G/6G Networks, IoT, Wireless Sensor Networks, and Optical Communication.",
            keywords: ["Mobile Networks", "SDN", "Cryptography", "Industrial IoT"]
        },
        { 
            title: "Computing Technologies", 
            desc: "Cloud, Edge, Fog Computing, Big Data Analytics, and Blockchain.",
            keywords: ["High Performance Computing", "VLSI Design", "Cyber-Physical Systems", "Grid Computing"]
        },
        { 
            title: "Sustainable Technologies", 
            desc: "Green Computing, Smart Grids, Renewable Energy, and Smart Cities.",
            keywords: ["Energy-Efficient Systems", "Electric Vehicles", "Sustainability Analytics", "Green IT"]
        }
    ];

    const [committeeLoading, setCommitteeLoading] = useState(true);

    const importantDates = [
        { event: "Conference Round 1", date: "April 23, 2027 - April 25, 2027" },
        { event: "Conference Round 2", date: "May 14, 2027 - May 16, 2027" },
        { event: "Abstract Submission", date: "TBA" },
        { event: "Notification of Acceptance", date: "TBA" }
    ];

    return (
        <div className="home-page">
            {/* Navbar */}
            <Navbar onOpenRegistration={onOpenRegistration} onOpenAdmin={onOpenAdmin} onOpenCommittee={onOpenCommittee} />


            {/* Hero Section */}
            <section id="home" className="hero">
                <div className="hero-content">
                    <h1 className="hero-title">International Conference on Intelligence Computing, Communication and Sustainable Technologies - IC2ST-27</h1>
                    <p className="hero-subtitle">Innovating for a Smarter Future at Atria Institute of Technology</p>
                    <div className="hero-stats">
                        <div className="stat-item"><Counter target={250} /><p>Expected Attendance</p></div>
                        <div className="stat-item"><Counter target={10} /><p>Exhibits</p></div>
                    </div>
                    <button className="btn btn-primary" onClick={onOpenRegistration}>Register Now</button>

                </div>
            </section>


            {/* About Section */}
            <section id="about" className="about section">
                <div className="container">
                    <div className="about-content">
                        <h2>About the Conference</h2>
                        <p>
                            The IEEE International Conference on Intelligence Computing, Communication and Sustainable Technologies (IC2ST-27) aims to provide a premier interdisciplinary platform for researchers, academicians, industry professionals, and students to present and discuss innovations in intelligent systems, advanced communication technologies, computing paradigms, and sustainable engineering solutions.
                        </p>
                        <p>
                            The conference focuses on the integration of Artificial Intelligence, next-generation communication networks, computational intelligence, and green technologies to address real-world challenges aligned with sustainable development goals. IC2ST-27 seeks high-quality original research contributions that demonstrate theoretical advancements, practical implementations, and innovative applications contributing to technological sustainability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Tracks Section */}
            <section id="tracks" className="tracks section">
                <div className="container">
                    <h2>Conference Tracks</h2>
                    <div className="tracks-grid">
                        {tracks.map((track, index) => (
                            <div className="track-block" key={index}>
                                <h3>{track.title}</h3>
                                <div className="track-popup">
                                    <p>{track.desc}</p>
                                    <div className="keywords">
                                        {track.keywords.map((kw, i) => (
                                            <span key={i}>{kw}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* Dates Section */}
            <section id="dates" className="dates section">
                <div className="container">
                    <h2>Important Dates</h2>
                    <div className="dates-grid">
                        {importantDates.map((item, index) => (
                            <div className="date-card" key={index}>
                                <h3>{item.event}</h3>
                                <p className="date-text">{item.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sponsors Section */}
            <section id="sponsors" className="sponsors section">


                <div className="container">
                    <h2>Our Sponsors</h2>
                    <div className="sponsors-placeholder">
                        <div className="sponsor-box">Platinum Sponsor</div>
                        <div className="sponsor-box">Gold Sponsor</div>
                        <div className="sponsor-box">Silver Sponsor</div>
                        <div className="sponsor-box">Technical Partner</div>
                    </div>
                    <p className="sponsor-note">Committees and financial details are currently being finalized. Check back soon for the full list of sponsors and partners.</p>
                </div>
            </section>

            {/* Location Section */}
            <section id="location" className="location section">
                <div className="container">
                    <h2>Venue & Location</h2>
                    <div className="location-info">
                        <div className="address">
                            <h3>Atria Institute of Technology</h3>
                            <p>ASKB Campus, 1st Main Rd, Ags Colony</p>
                            <p>Anand Nagar, Bangalore 560024</p>
                        </div>
                    </div>
                    <div className="map-container" onClick={() => window.open("https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7", "_blank")}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.049536506973!2d77.592124!3d13.032517499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bd97727093%3A0x5135aab8250c1df5!2sAtria%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1775707610232!5m2!1sen!2sin"
                            width="100%"
                            height="450"
                            style={{ border: 0, borderRadius: '15px', pointerEvents: 'none' }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Atria Institute of Technology Location"
                        ></iframe>
                        <div className="map-overlay">
                            <span>Click to view on Google Maps</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <p>&copy; 2026 IEEE. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;
