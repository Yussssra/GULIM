import React from 'react';
import './Marquee.css';

const Marquee = () => {
    const slogans = [
        "YOUR STYLE IS OUR CONCERN",
        "SIGN IN TO BE PART OF THE GULIM COMMUNITY",
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
