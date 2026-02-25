import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const slogans = [
        "GULIM - THE BASIC STORE",
        "PREMIUM DENIM FOR EVERYONE",
        "ELEVATE YOUR EVERYDAY STYLE",
        "QUALITY MEETS COMFORT",
        "GULIM - CRAFTED WITH CARE"
    ];

    return (
        <div className="marquee-wrapper">
            <div className="marquee-content">
                {[...slogans, ...slogans].map((slogan, index) => (
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
