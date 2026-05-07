import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [step, setStep] = useState(0);
    const [isSmiling, setIsSmiling] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        usn: '',
        branch: '',
        sem: '',
        phone: '',
        email: ''
    });
    const [isComplete, setIsComplete] = useState(false);

    const steps = [
        { label: "Your Full Name", field: "name", type: "text", placeholder: "e.g. Rahul Sharma" },
        { label: "USN", field: "usn", type: "text", placeholder: "e.g. 1AT23CS001" },
        { label: "Branch", field: "branch", type: "text", placeholder: "e.g. Computer Science" },
        { label: "Semester", field: "sem", type: "number", placeholder: "e.g. 4" },
        { label: "Phone Number", field: "phone", type: "tel", placeholder: "e.g. 9876543210" },
        { label: "Email ID", field: "email", type: "email", placeholder: "e.g. rahul@example.com" }
    ];

    const currentStepData = steps[step];

    const handleNext = async () => {
        if (formData[currentStepData.field] === '') return;

        // Smile and Present Next
        setIsSmiling(true);
        setTimeout(() => setIsSmiling(false), 800);

        if (step < steps.length - 1) {
            setStep(prev => prev + 1);
        } else {
            // Final Submission Logic
            try {
                // 1. Save to Firebase Realtime Database
                await push(ref(db, 'registrations'), {
                    ...formData,
                    timestamp: new Date().toISOString()
                });

                // 2. Trigger Email Notification (Vercel Serverless Function)
                // We will create an API route for this to handle the email logic securely
                await fetch('/api/send-confirmation', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                setIsComplete(true);
                setIsSmiling(true);
            } catch (error) {
                console.error("Registration failed:", error);
                alert("Something went wrong. Please try again.");
            }
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [currentStepData.field]: e.target.value });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleNext();
    };

    return (
        <section id="registration" className="registration-section section">
            <div className="container">
                <h2 className="section-title">Join the Future</h2>
                <div className="reg-container">
                    {/* Innovative Mascot Animation */}
                    <div className="mascot-container">
                        <svg viewBox="0 0 200 200" className="mascot-svg">
                            {/* Simple Student Mascot Body */}
                            <path d="M40,160 Q100,200 160,160 L160,140 Q100,100 40,140 Z" className="mascot-body" />
                            {/* Head */}
                            <circle cx="100" cy="80" r="50" className="mascot-head" />
                            {/* Graduation/Academic Hat */}
                            <path d="M50,70 L100,40 L150,70 L100,100 Z" className="mascot-hat" />
                            <path d="M150,70 L150,90" stroke="#333" strokeWidth="2" fill="none" />
                            {/* Eyes */}
                            <circle cx="80" cy="80" r="5" fill="#333" />
                            <circle cx="120" cy="80" r="5" fill="#333" />
                            {/* Dynamic Mouth (Smile vs Neutral) */}
                            <path 
                                d={isSmiling ? "M80,105 Q100,125 120,105" : "M80,110 Q100,115 120,110"} 
                                className="mascot-smile" 
                                fill="none" 
                            />
                            {/* Presenting Hand */}
                            <path 
                                d="M150,140 Q175,120 185,130 Q195,140 170,155 Z" 
                                className={`mascot-hand ${!isComplete ? 'presenting' : ''}`} 
                            />
                        </svg>
                        <div className="mascot-bubble">
                            {isComplete ? "Registration Complete! See you there!" : "Ready for the next field?"}
                        </div>
                    </div>

                    {/* Multi-Step Form Card */}
                    <div className="form-card">
                        {!isComplete ? (
                            <>
                                <div className="progress-bar">
                                    {steps.map((_, i) => (
                                        <div key={i} className={`progress-dot ${i <= step ? 'active' : ''}`} />
                                    ))}
                                </div>
                                <div className="form-step" key={step}>
                                    <label>{currentStepData.label}</label>
                                    <input 
                                        type={currentStepData.type} 
                                        placeholder={currentStepData.placeholder}
                                        value={formData[currentStepData.field]}
                                        onChange={handleChange}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                    />
                                    <button className="reg-btn" onClick={handleNext}>
                                        {step === steps.length - 1 ? "Submit Registration" : "Next Step →"}
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="success-message">
                                <h1 style={{fontSize: '4rem'}}>✓</h1>
                                <h2>Awesome, {formData.name.split(' ')[0]}!</h2>
                                <p>You're officially registered for IC2ST-27.</p>
                                <p>Watch your email for confirmation.</p>
                                <button className="reg-btn" onClick={() => window.location.reload()}>Start Over</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
