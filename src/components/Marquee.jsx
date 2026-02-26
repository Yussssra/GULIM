import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const slogans = [
        "YOUR STYLE IS OUR CONCERN",
        "BE A PART OF THE GULIM COMMUNITY",
    ];

    return (
        <div className="marquee-wrapper">
            <div className="marquee-content">
                {Array(6).fill(slogans).flat().map((slogan, index) => (
                    <span key={index} className="marquee-text">
                        {slogan}
                        <span className="dot">•</span>
                    </span>
                ))}
            </div>
            {/* Duplicate for seamless infinite scroll */}
            <div className="marquee-content">
                {Array(6).fill(slogans).flat().map((slogan, index) => (
                    <span key={index} className="marquee-text">
                        {slogan}
                        <span className="dot">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Marquee;
