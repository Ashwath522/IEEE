import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const AboutPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>About the Conference</h1>
                    <p>Learn about the mission and scope of IC2ST-27.</p>
                </div>
            </div>
            <div className="page-body container">

                <div className="about-block">
                    <h2>Conference Overview</h2>
                    <p>
                        The IEEE International Conference on Intelligence Computing, Communication
                        and Sustainable Technologies (IC2ST-27) aims to provide a premier
                        interdisciplinary platform for researchers, academicians, industry
                        professionals, and students to present and discuss innovations in
                        intelligent systems, advanced communication technologies, computing
                        paradigms, and sustainable engineering solutions.
                    </p>
                    <p>
                        The conference focuses on the integration of Artificial Intelligence,
                        next-generation communication networks, computational intelligence, and
                        green technologies to address real-world challenges aligned with
                        sustainable development goals. IC2ST-27 seeks high-quality original
                        research contributions that demonstrate theoretical advancements,
                        practical implementations, and innovative applications contributing to
                        technological sustainability.
                    </p>
                </div>

                <div className="about-block">
                    <h2>Conference Tracks</h2>
                    <div className="tracks-grid">
                        {[
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
                        ].map((track, i) => (
                            <div className="track-card" key={i}>
                                <h3>{track.title}</h3>
                                <p>{track.desc}</p>
                                <div className="track-keywords">
                                    {track.keywords.map((kw, j) => <span key={j}>{kw}</span>)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="about-block">
                    <h2>Venue</h2>
                    <div className="venue-box">
                        <div className="venue-info">
                            <h3>Atria Institute of Technology</h3>
                            <p>ASKB Campus, 1st Main Rd, Ags Colony</p>
                            <p>Anand Nagar, Bangalore 560024</p>
                            <p>July 30th &amp; 31st, 2027</p>
                        </div>
                        <div className="map-container" onClick={() => window.open("https://maps.app.goo.gl/Zdyto8ZNH8mLY3Hc7", "_blank")}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.049536506973!2d77.592124!3d13.032517499999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae17bd97727093%3A0x5135aab8250c1df5!2sAtria%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1775707610232!5m2!1sen!2sin"
                                width="100%" height="350"
                                style={{ border: 0, borderRadius: '12px', pointerEvents: 'none' }}
                                allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Atria Institute of Technology Location"
                            />
                            <div className="map-overlay"><span>Click to view on Google Maps</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default AboutPage;
