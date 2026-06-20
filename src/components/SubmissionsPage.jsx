import React from 'react';
import Navbar from './Navbar';
import './PageLayout.css';

const SubmissionsPage = ({ navigate, currentPage }) => (
    <div className="page-layout">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <main className="page-main">
            <div className="page-hero">
                <div className="container">
                    <span className="page-badge">IC2ST-27</span>
                    <h1>Submissions</h1>
                    <p>Submission guidelines, review policy, and contact details for authors.</p>
                </div>
            </div>
            <div className="page-body container">

                {/* Submission Guidelines */}
                <div className="cfp-section">
                    <h2>Submission Guidelines</h2>
                    <div className="guidelines-grid">
                        <div className="guideline-card">
                            <div className="card-badge phase-1">Phase 1</div>
                            <h3>Initial Submission</h3>
                            <ul className="guidelines-list">
                                <li>
                                    <strong>✓ Prepare your Paper</strong>
                                    <p>Manuscripts must be in PDF or Docx format and follow the official IEEE conference template.</p>
                                    <div className="template-links">
                                        <a href="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/IEEEtran.zip" className="template-btn" target="_blank" rel="noopener noreferrer">Overleaf (LaTeX)</a>
                                        <a href="https://www.ieee.org/content/dam/ieee-org/ieee/web/org/conferences/conference-template-a4.docx" className="template-btn" target="_blank" rel="noopener noreferrer">MS Word Template</a>
                                    </div>
                                    <a href="https://www.ieee.org/conferences/publishing/templates.html" className="view-instructions-link" target="_blank" rel="noopener noreferrer">View IEEE Template Instructions →</a>
                                </li>
                                <li>
                                    <strong>✓ Submit via CMT</strong>
                                    <p>Create an account on the Microsoft CMT Portal. Navigate to <strong>IC2ST-27</strong>, enter all author details, and choose your relevant topic area.</p>
                                    <a href="https://cmt3.research.microsoft.com/" className="cmt-btn" target="_blank" rel="noopener noreferrer">Go to Microsoft CMT Portal →</a>
                                </li>
                            </ul>
                        </div>
                        <div className="guideline-card">
                            <div className="card-badge phase-2">Phase 2</div>
                            <h3>Camera-Ready Guidelines</h3>
                            <ul className="guidelines-list">
                                <li>
                                    <strong>✓ Final Revisions</strong>
                                    <p>Page limit: 4 to 6 pages (TPC approval required for more).</p>
                                    <p className="revision-highlight">Highlight all revisions in <span>Yellow</span> in your manuscript.</p>
                                </li>
                                <li>
                                    <strong>✓ Registration &amp; Upload</strong>
                                    <p>Registration is mandatory for inclusion. Upload final PDF, Word, payment proof, and IDs to CMT.</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="warning-box">
                        <span className="warning-icon">⚠</span>
                        <p>Papers not following the IEEE Template style guidelines may be rejected without review.</p>
                    </div>
                </div>

                {/* Review Policy */}
                <div className="cfp-section">
                    <h2>Review Policy</h2>
                    <div className="policy-container">
                        {[
                            "Submitted manuscripts will undergo mandatory plagiarism screening as per IEEE guidelines. Papers violating ethics will be desk-rejected and the parent organizations of all the authors informed.",
                            null, // double-blind block handled separately
                            "The author list and order at the time of submission is considered final – no co-authors can be added or removed or re-ordered after the submission deadline or upon acceptance (no exceptions).",
                            "Submitted manuscripts that DO NOT follow these guidelines (i.e., do not meet the size, formatting, as per the IEEE guidelines) will be rejected without review."
                        ].map((text, i) => (
                            i === 1 ? (
                                <div className="policy-block" key={i}>
                                    <span className="policy-icon">➢</span>
                                    <div className="policy-text">
                                        <p>All submitted manuscripts will be reviewed by the Program Committee under a <strong>double-blind review process</strong>:</p>
                                        <ul className="policy-sublist">
                                            <li>Submitted papers should <strong>NOT</strong> list any author names, affiliations or any other personally identifiable information.</li>
                                            <li>As an author, you should not identify yourself or your organization in the paper, either explicitly or by implication. References to your own work should be in the third-person.</li>
                                            <li>Submissions will be judged on correctness, originality, technical strength, significance, potential impact, quality of presentation, and relevance to the conference scope.</li>
                                        </ul>
                                    </div>
                                </div>
                            ) : (
                                <div className="policy-block" key={i}>
                                    <span className="policy-icon">➢</span>
                                    <div className="policy-text"><p>{text}</p></div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                {/* CFP / Submission Contact Details */}
                <div className="cfp-section submission-contact-section">
                    <h2>Submission &amp; CFP Queries</h2>
                    <p className="section-subtitle">For queries regarding paper submissions, template issues, or CMT registration, feel free to reach out to our Organizing Chairs:</p>
                    <div className="contact-grid">
                        <div className="contact-card">
                            <h3>Jeevitha B. K.</h3>
                            <p className="contact-role">Organizing Chair, IC2ST-27</p>
                            <p className="contact-email">✉ bkjeevitha87@ieee.org</p>
                            <p className="contact-email-alt">✉ bkjeevitha87@gmail.com</p>
                        </div>
                        <div className="contact-card">
                            <h3>Rajani Rai B.</h3>
                            <p className="contact-role">Organizing Chair, IC2ST-27</p>
                            <p className="contact-email">✉ rajani.rai@gmail.com</p>
                        </div>
                    </div>
                </div>

            </div>
        </main>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default SubmissionsPage;
