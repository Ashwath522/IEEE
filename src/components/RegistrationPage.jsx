import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import './PageLayout.css';
import './RegistrationPage.css';

const steps = [
    { title: 'Get Accepted', text: 'Receive your Notification of Acceptance (May 31st, 2027) via CMT.' },
    { title: 'Pay the Fee', text: 'Pay the registration fee for your category from the tables below.' },
    { title: 'Upload to CMT', text: 'Upload final PDF, Word, payment proof, and IDs to CMT by June 20th, 2027.' },
];

const RegistrationPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Registration</h1>
                    <p>Registration fees for authors of IC2ST-27. Registration is mandatory for inclusion.</p>
                </div>
            </div>

            <div className="page-body container">
                {/* How to register */}
                <section className="reg-steps">
                    {steps.map((s, i) => (
                        <div className="reg-step" key={s.title}>
                            <span className="reg-step-num">{i + 1}</span>
                            <div>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </div>
                        </div>
                    ))}
                </section>

                <div className="registration-fees-container">
                    <div className="fees-section">
                        <h3>Indian Authors (INR)</h3>
                        <div className="table-wrapper">
                            <table className="fees-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>IEEE Member</th>
                                        <th>Non-IEEE Member</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Student Member</td>
                                        <td>₹5,600</td>
                                        <td>₹7,000</td>
                                    </tr>
                                    <tr>
                                        <td>Faculty / Research Scholar</td>
                                        <td>₹6,400</td>
                                        <td>₹8,000</td>
                                    </tr>
                                    <tr>
                                        <td>Industry Professional</td>
                                        <td>₹9,600</td>
                                        <td>₹12,000</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="extra-page-note"><strong>Extra Pages (After 6 Pages):</strong> ₹500 per page</p>
                    </div>

                    <div className="fees-section">
                        <h3>Foreign Authors (USD)</h3>
                        <div className="table-wrapper">
                            <table className="fees-table">
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>IEEE Member</th>
                                        <th>Non-IEEE Member</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Author</td>
                                        <td>$150</td>
                                        <td>$250</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="extra-page-note"><strong>Extra Pages (After 6 Pages):</strong> $10 per page</p>
                    </div>
                </div>

                <div className="reg-actions">
                    <a href="https://cmt3.research.microsoft.com/" className="btn btn-primary" target="_blank" rel="noopener noreferrer">Go to Microsoft CMT Portal →</a>
                    <button className="btn btn-outline" onClick={() => navigate('dates')}>View Important Dates</button>
                    <button className="btn btn-outline" onClick={() => navigate('contact')}>Registration Queries</button>
                </div>

                <div className="cmt-acknowledgement">
                    <p><strong>Acknowledgement:</strong> The Microsoft CMT service was used for managing the peer-reviewing process for this conference. This service was provided for free by Microsoft and they bore all expenses, including costs for Azure cloud services as well as for software development and support.</p>
                </div>
            </div>
        </main>
        <Footer navigate={navigate} hideCta />
    </div>
);

export default RegistrationPage;
