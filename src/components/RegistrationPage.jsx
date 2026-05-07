import React, { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../firebase';
import './RegistrationPage.css';

const RegistrationPage = ({ onBack }) => {
    const [step, setStep] = useState(0);
    const [isSwapping, setIsSwapping] = useState(false);
    const [isSmiling, setIsSmiling] = useState(false);
    const [formData, setFormData] = useState({
        name: '', usn: '', branch: '', sem: '', phone: '', email: ''
    });
    const [isComplete, setIsComplete] = useState(false);

    const branches = [
        "Computer Science",
        "Electronics and Communications",
        "Civil",
        "Mechanical",
        "Information Technology",
        "Artificial Intelligence and Machine Learning",
        "Computer Science and Design",
        "Computer Science and Data Analysis"
    ];

    const steps = [
        { label: "Your Full Name", field: "name", type: "text", placeholder: "e.g. Rahul Sharma" },
        { label: "USN", field: "usn", type: "text", placeholder: "e.g. 1AT23CS001" },
        { label: "Branch", field: "branch", type: "select", options: branches },
        { label: "Semester", field: "sem", type: "number", placeholder: "e.g. 4" },
        { label: "Phone Number", field: "phone", type: "text", placeholder: "10-digit mobile number" },
        { label: "Email ID", field: "email", type: "text", placeholder: "Official Email ID" }
    ];

    const validateField = () => {
        const val = formData[steps[step].field];
        if (val === '') return false;

        if (steps[step].field === 'phone') {
            return /^\d{10}$/.test(val);
        }
        if (steps[step].field === 'email') {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        }
        return true;
    };

    const handleNext = async () => {
        if (!validateField()) {
            alert("Please provide a valid response.");
            return;
        }

        if (step < steps.length - 1) {
            setIsSwapping(true);
            setIsSmiling(true);
            setTimeout(() => {
                setStep(prev => prev + 1);
                setIsSwapping(false);
                setIsSmiling(false);
            }, 800);
        } else {
            // Final Step - Submit to Firebase
            setIsSwapping(true);
            setIsSmiling(true);

            try {
                await push(ref(db, 'registrations'), {
                    ...formData,
                    created_at: new Date().toISOString()
                });

                // Trigger Email Notification
                await fetch('/api/send-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                setIsComplete(true);
                setIsSwapping(false);
                
                // Clear any existing redirection timeout
                if (window.regSuccessTimeout) clearTimeout(window.regSuccessTimeout);
                
                // Final redirection after animation
                window.regSuccessTimeout = setTimeout(() => {
                    onBack();
                }, 3500);

            } catch (err) {
                console.error("Firebase registration error:", err);
                alert(`Error: ${err.message}`);
                setIsSwapping(false);
                setIsSmiling(false);
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [steps[step].field]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleNext();
    };

    return (
        <div className="registration-page">
            {/* The Ultimate Conference Background: Multi-layered Nebula & Geometry */}
            <div className="ultimate-bg">
                <div className="nebula nebula-1" />
                <div className="nebula nebula-2" />
                <div className="nebula nebula-3" />
                <div className="geometry-overlay">
                    {[...Array(24)].map((_, i) => (
                        <div key={i} className="bg-node" style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.4}s`,
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            opacity: Math.random() * 0.5 + 0.1
                        }} />
                    ))}
                </div>
            </div>

            <nav className="reg-nav">
                <h2 style={{color: 'white', fontWeight: '900', position: 'relative', zIndex: 10, letterSpacing: '3px'}}>IC2ST-27 REGISTRATION</h2>
                <div className="back-btn" style={{position: 'relative', zIndex: 10}} onClick={onBack}>← Return Home</div>
            </nav>

            <div className="reg-content-wrapper">
                {/* Form Portal Container (Centered for Formal Aesthetic) */}
                <div className="form-portal-container centered-portal">
                    {!isComplete ? (
                        <div className={`calendar-sheet ${isSwapping ? 'exit' : 'enter'}`}>
                            <div className="sheet-header">
                                <label>{steps[step].label}</label>
                                <span className="step-count">Step {step + 1} of 6</span>
                            </div>
                            
                            {steps[step].type === 'select' ? (
                                <select className="reg-input" value={formData[steps[step].field]} onChange={handleChange} autoFocus>
                                    <option value="">-- Select Branch --</option>
                                    {steps[step].options.map((opt, i) => (
                                        <option key={i} value={opt}>{opt}</option>
                                    ))}
                                </select>
                            ) : (
                                <input className="reg-input" type={steps[step].type} placeholder={steps[step].placeholder} value={formData[steps[step].field]} onChange={handleChange} onKeyDown={handleKeyDown} autoFocus />
                            )}
                            <button className="next-sheet-btn" onClick={handleNext}>{step === steps.length - 1 ? "Complete Registration" : "Next Page →"}</button>
                            <div className="progress-indicator">
                                {steps.map((_, i) => (
                                    <div key={i} className={`indicator-dot ${i === step ? 'active' : ''}`} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Innovative Door Opening Success Animation */
                        <div className="conference-entrance">
                            <div className="door-wrapper">
                                <div className="door left-door"></div>
                                <div className="door right-door"></div>
                                <div className="entry-tag">
                                    <div className="tag-header">IC2ST-27</div>
                                    <h1 style={{fontSize: '4rem', color: '#27ae60', margin: '20px 0'}}>✓</h1>
                                    <h2 style={{color: '#222', fontSize: '1.4rem'}}>{formData.name}</h2>
                                    <p style={{fontSize: '0.85rem', color: '#666', marginTop: '5px'}}>{formData.branch}</p>
                                    <div className="tag-footer">ENTRY PERMITTED</div>
                                </div>
                            </div>
                            <h3 className="redirecting-note">Welcome aboard... Accessing Conference Hub</h3>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;

