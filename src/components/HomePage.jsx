import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './HomePage.css';

const Counter = ({ target, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        const val = Number(target);
        if (isNaN(val) || val <= 0) { setCount(0); return; }
        let start = 0;
        const increment = val / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= val) { setCount(val); clearInterval(timer); }
            else setCount(Math.floor(start));
        }, 16);
        return () => clearInterval(timer);
    }, [target, duration]);
    return <span>{count}+</span>;
};

const HomePage = ({ navigate, currentPage }) => (
    <div className="home-page">
        <Navbar currentPage={currentPage} navigate={navigate} />
        <section className="hero">
            <div className="hero-content">
                <h1 className="hero-title">
                    International Conference on Intelligence Computing,
                    Communication and Sustainable Technologies — IC2ST-27
                </h1>
                <p className="hero-subtitle">Innovating for a Smarter Future at Atria Institute of Technology</p>
                <div className="hero-stats">
                    <div className="stat-item"><Counter target={250} /><p>Expected Attendance</p></div>
                    <div className="stat-item"><Counter target={10} /><p>Exhibits</p></div>
                </div>
                <div className="hero-btns">
                    <button className="btn btn-primary" onClick={() => navigate('registration')}>Register Now</button>
                    <button className="btn btn-outline" onClick={() => navigate('about')}>Learn More</button>
                </div>
            </div>
        </section>
        <footer className="footer"><p>&copy; 2027 IC2ST. All rights reserved.</p></footer>
    </div>
);

export default HomePage;
