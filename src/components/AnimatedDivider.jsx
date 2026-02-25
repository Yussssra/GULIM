import React, { useEffect, useRef, useState } from 'react';
import './AnimatedDivider.css';

// Pure CSS + IntersectionObserver animated divider — no GSAP
const AnimatedDivider = ({ label }) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.4 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`animated-divider ${visible ? 'divider-visible' : ''}`}>
            <div className="divider-line divider-line-left"></div>
            <span className="divider-label">{label}</span>
            <div className="divider-line divider-line-right"></div>
        </div>
    );
};

export default AnimatedDivider;
