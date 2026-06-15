import React from 'react';
import Navbar from './Navbar';
import './CommitteePage.css';

const CommitteePage = ({ navigate }) => {

    // ── TOP-LEVEL SPECIAL MEMBERS (shown prominently at top) ──────────────
    const featuredMembers = [
        {
            group: "Steering Committee",
            name: "Dr. Abhishek Appaji M",
            title: "Professor, BMSIT",
            affiliation: "BMSCE | Maastricht University | OSU",
            roles: ["IEEE EdSoc", "SPS", "CS"],
            extra: "Treasurer, IEEE Education Society (EdSoc)",
            location: "Bengaluru, Karnataka, India",
            linkedin: "https://www.linkedin.com/in/abhishek-appaji/",
            initials: "AA"
        },
        {
            group: "Technical Program Committee",
            name: "Saneesh Cleatus Thundiyil, PhD",
            title: "Chair, IEEE Signal Processing Society, Bangalore Chapter",
            affiliation: "Computational Neuroscience and Engineering Research Lab",
            roles: ["IEEE SPS"],
            extra: "ECE, BMS Institute of Technology & Management, Bangalore - India",
            location: "Bengaluru, Karnataka, India",
            linkedin: "https://www.linkedin.com/in/saneesh-cleatus/",
            initials: "SC"
        }
    ];

    // ── EXISTING COMMITTEE DATA ────────────────────────────────────────────
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
        try {
            return new URL(`../assets/committee/${imageName}`, import.meta.url).href;
        } catch (e) {
            return null;
        }
    };

    return (
        <div className="committee-page">
            <Navbar currentPage="committee" navigate={navigate} />

            {/* ── Page Hero ── */}
            <div className="committee-hero">
                <div className="container">
                    <div className="hero-badge">IC2ST-27</div>
                    <h1>Conference Committee</h1>
                    <p>The distinguished experts driving technical excellence and innovation.</p>
                    <div className="hero-actions">
                        <button onClick={() => navigate('home')} className="btn btn-primary-outline">
                            <span className="icon">←</span> Back to Home
                        </button>
                    </div>
                </div>
                <div className="hero-bg-accent"></div>
            </div>

            <div className="committee-content container">

                {/* ── FEATURED / TOP-LEVEL MEMBERS ── */}
                <div className="featured-section">
                    <h2 className="featured-section-title">Distinguished Members</h2>
                    <div className="featured-grid">
                        {featuredMembers.map((member, idx) => (
                            <div key={idx} className="featured-card">
                                <div className="featured-avatar">
                                    <span>{member.initials}</span>
                                </div>
                                <div className="featured-info">
                                    <span className="featured-group-badge">{member.group}</span>
                                    <h3 className="featured-name">{member.name}</h3>
                                    <p className="featured-title">{member.title}</p>
                                    <p className="featured-affiliation">{member.affiliation}</p>
                                    <p className="featured-extra">{member.extra}</p>
                                    <p className="featured-location">📍 {member.location}</p>
                                    <div className="featured-tags">
                                        {member.roles.map((r, i) => (
                                            <span key={i} className="featured-tag">{r}</span>
                                        ))}
                                    </div>
                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="linkedin-btn"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                        LinkedIn Profile
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── EXISTING COMMITTEE HIERARCHY ── */}
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
                                            <p className="member-role">{role}</p>
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
