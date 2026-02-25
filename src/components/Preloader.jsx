import React, { useEffect, useState } from 'react';
import './Preloader.css';

const Preloader = ({ onLoadingComplete }) => {
    const letters = ['G', 'U', 'L', 'I', 'M'];
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            if (onLoadingComplete) {
                setTimeout(onLoadingComplete, 800); // Wait for fade out animation
            }
        }, 2500); // Stay for 2.5s

        return () => clearTimeout(timer);
    }, [onLoadingComplete]);

    return (
        <div className={`preloader-overlay ${!isVisible ? 'preloader-hidden' : ''}`}>
            <div className="preloader-brand">
                {letters.map((letter, index) => (
                    <span
                        key={index}
                        className="char"
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        {letter}
                    </span>
                ))}
            </div>
            <div className="preloader-line"></div>
        </div>
    );
};

export default Preloader;
