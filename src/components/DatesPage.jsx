import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const dates = [
    { event: "Start of Paper Submissions",       date: "February 1st, 2027",  icon: "📝" },
    { event: "Deadline for Submission of Papers", date: "April 3rd, 2027",    icon: "⏰" },
    { event: "Notification of Acceptance",        date: "May 20th, 2027",     icon: "✅" },
    { event: "Submission of Camera-Ready Papers", date: "June 5th, 2027",     icon: "📄" },
    { event: "Conference Dates",                  date: "July 30th & 31st, 2027", icon: "🎓" },
];

const DatesPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Important Dates</h1>
                    <p>Key milestones for IC2ST-27 — mark your calendar.</p>
                </div>
            </div>
            <div className="page-body container">
                <div className="dates-timeline">
                    {dates.map((item, i) => (
                        <div className="timeline-item" key={i}>
                            <div className="timeline-icon">{item.icon}</div>
                            <div className="timeline-connector" />
                            <div className="timeline-card">
                                <h3>{item.event}</h3>
                                <p className="timeline-date">{item.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved. | Last Updated: July 07, 2026</p></footer>
    </div>
);

export default DatesPage;
