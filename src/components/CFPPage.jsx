import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const CFPPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Call for Papers</h1>
                    <p>Explore the official conference tracks and themes for IC2ST-27.</p>
                </div>
            </div>
            <div className="page-body container">

                {/* Call for Papers Intro */}
                <div className="cfp-section">
                    <h2>Scope and Tracks</h2>
                    <p className="cfp-intro-text">
                        IC2ST-27 solicits original, high-quality submissions across several core and interdisciplinary tracks. 
                        Topics of interest include, but are not limited to, the fields described in the tracks below.
                    </p>
                    
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

                <div className="warning-box">
                    <span className="warning-icon">ℹ</span>
                    <p>To view detailed guidelines on preparing your paper, formatting templates, and submitting via Microsoft CMT, please navigate to the <button className="inline-link-btn" onClick={() => navigate('submissions')}>Submissions page</button>.</p>
                </div>

            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved. | Last Updated: July 07, 2026</p></footer>
    </div>
);

export default CFPPage;
