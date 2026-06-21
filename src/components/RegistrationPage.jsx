import React from 'react';
import './RegistrationPage.css';

const RegistrationPage = ({ navigate }) => {
    return (
        <div className="registration-page">
            {/* The Ultimate Conference Background: Multi-layered Nebula & Geometry */}
            <div className="ultimate-bg">
                <div className="nebula nebula-1" />
                <div className="nebula nebula-2" />
                <div className="nebula nebula-3" />
                <div className="geometry-overlay" />
            </div>

            <nav className="reg-nav">
                <h2 style={{color: 'white', fontWeight: '900', position: 'relative', zIndex: 10, letterSpacing: '3px'}}>IC2ST-27 REGISTRATION</h2>
                <div className="back-btn" style={{position: 'relative', zIndex: 10}} onClick={() => navigate('home')}>← Return Home</div>
            </nav>

            <div className="reg-content-wrapper">
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
            </div>
        </div>
    );
};

export default RegistrationPage;
