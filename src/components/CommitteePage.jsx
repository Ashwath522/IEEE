import React from 'react';
import Navbar from './Navbar';
import './CommitteePage.css';

const CommitteePage = ({ onBack, onOpenRegistration, onOpenAdmin }) => {
    // Hardcoded hierarchy and names as requested
    const committeeData = {
        "Organising - General Chairs": [
            { name: "Dr. Rajesha S", image: "rajesha_s.jpg" }
        ],
        "General Co Chair": [
            { name: "Dr. Nalinakshi N", image: "nalinakshi_n.jpg" },
            { name: "Dr. Ravichandra R", image: "ravichandra_r.jpg" },
            { name: "Dr. Surendra H J", image: "surendra_h_j.jpg" }
        ],
        "TPC Chairs": [
            { name: "Dr. Keshava Murthy", image: "keshava_murthy.jpg" },
            { name: "Dr. Devi Kannan", image: "devi_kannan.jpg" },
            { name: "Dr. Deepak N R", image: "deepak_n_r.jpg" }
        ],
        "TPC Co Chairs": [
            { name: "Dr. Vasanthi S", image: "vasanthi_s.jpg" },
            { name: "Dr. Prasuna VNP", image: "prasuna_vnp.jpg" },
            { name: "Dr. Farahana", image: "farahana.jpg" }
        ],
        "Publication Chairs": [
            { name: "Dr. Jyothi Metan", image: "jyothi_metan.jpg" },
            { name: "Dr. Pradeep", image: "pradeep.jpg" }
        ],
        "Publication Co-Chairs": [
            { name: "Prof. Jayanthi", image: "jayanthi.jpg" },
            { name: "Dr. Ramesh N", image: "ramesh_n.jpg" },
            { name: "Dr. Rakhi S", image: "rakhi_s.jpg" },
            { name: "Dr. Kavitha S Patil", image: "kavitha_s_patil.jpg" }
        ],
        "Finance Chairs": [
            { name: "Dr. Anand", image: "anand.jpg" },
            { name: "Dr. Ravikumar J", image: "ravikumar_j.jpg" }
        ],
        "Finance Co-Chairs": [
            { name: "Prof. Somesh", image: "somesh.jpg" },
            { name: "Prof TejasS", image: "tejass.jpg" }
        ]
    };

    const roles = Object.keys(committeeData);

    const getImageUrl = (imageName) => {
        // This will look for images in src/assets/committee
        // If the image is not found, it will use the placeholder logic
        try {
            return new URL(`../assets/committee/${imageName}`, import.meta.url).href;
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="committee-page">
            <Navbar onOpenRegistration={onOpenRegistration} onOpenAdmin={onOpenAdmin} onBack={onBack} />
            
            <div className="committee-hero">
                <div className="container">
                    <div className="hero-badge">IC2ST-27</div>
                    <h1>Organizing Committee</h1>
                    <p>The distinguished experts driving technical excellence and innovation.</p>
                    <div className="hero-actions">
                        <button onClick={onBack} className="btn btn-primary-outline">
                            <span className="icon">←</span> Back to Home
                        </button>
                    </div>
                </div>
                <div className="hero-bg-accent"></div>
            </div>

            <div className="committee-content container">
                <div className="committee-hierarchy">
                    {roles.map((role, roleIdx) => (
                        <div key={role} className={`committee-group group-${roleIdx}`}>
                            <div className="group-header">
                                <h3>{role}</h3>
                                <div className="header-line"></div>
                            </div>
                            <div className="members-grid">
                                {committeeData[role].map((member, memIdx) => (
                                    <div key={memIdx} className="member-card">
                                        <div className="card-header">
                                            <p className="member-role">{role}</p>
                                        </div>
                                        <div className="member-image-wrapper">
                                            <div className="member-image">
                                                <img 
                                                    src={getImageUrl(member.image)} 
                                                    alt={member.name} 
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'flex';
                                                    }}
                                                />
                                                <div className="member-image-placeholder">
                                                    {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="member-info">
                                            <p className="member-name">{member.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <footer className="footer">
                <div className="container">
                    <p>&copy; 2026 IEEE Conference. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default CommitteePage;
// Trigger rebuild
