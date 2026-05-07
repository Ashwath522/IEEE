import React, { useEffect } from 'react';
import '../styles/IntroAnimation.css';

const IntroAnimation = ({ onComplete }) => {
  useEffect(() => {
    // Total duration: 3.5 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="intro-container">
      <div className="ieee-text">IEEE</div>
      <div className="wire-container">
        <div className="wire wire-left"></div>
        <div className="wire wire-right"></div>
      </div>
      <div className="fusion-flash"></div>
    </div>
  );
};

export default IntroAnimation;
