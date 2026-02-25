import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';
import { ScrollTrigger } from 'gsap-trial/ScrollTrigger';
import { DrawSVGPlugin } from 'gsap-trial/DrawSVGPlugin';
import './AnimatedDivider.css';

// Register plugins
gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const AnimatedDivider = ({ label }) => {
    const containerRef = useRef(null);
    const leftLineRef = useRef(null);
    const rightLineRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%", // Starts when the top of the divider hits 85% of viewport
                end: "bottom 20%",
                toggleActions: "play none none none", // Only play once
            }
        });

        // Reset lines to 0 (hidden)
        gsap.set([leftLineRef.current, rightLineRef.current], { drawSVG: "0%" });
        gsap.set(textRef.current, { opacity: 0, y: 10 });

        tl.to(leftLineRef.current, {
            drawSVG: "100%",
            duration: 1.2,
            ease: "power2.inOut"
        })
            .to(textRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.6") // Start slightly before the first line finishes
            .to(rightLineRef.current, {
                drawSVG: "100%",
                duration: 1.2,
                ease: "power2.inOut"
            }, "-=0.2"); // Overlap with text animation

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div className="animated-divider" ref={containerRef}>
            <div className="divider-svg-container">
                <svg width="100%" height="40" viewBox="0 0 1200 40" preserveAspectRatio="xMidYMid meet">
                    {/* Left Line */}
                    <path
                        ref={leftLineRef}
                        d="M 100 20 L 500 20"
                        stroke="var(--primary)"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.3"
                    />
                    {/* Right Line */}
                    <path
                        ref={rightLineRef}
                        d="M 700 20 L 1100 20"
                        stroke="var(--primary)"
                        strokeWidth="1"
                        fill="none"
                        opacity="0.3"
                    />
                </svg>
                <span ref={textRef} className="divider-label">{label}</span>
            </div>
        </div>
    );
};

export default AnimatedDivider;
