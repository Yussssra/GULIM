import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';
import { MorphSVGPlugin } from 'gsap-trial/MorphSVGPlugin';
import './MorphingBlob.css';

// Register MorphSVGPlugin
gsap.registerPlugin(MorphSVGPlugin);

const MorphingBlob = () => {
    const blob1Ref = useRef(null);
    const blob2Ref = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        console.log("MorphingBlob component mounted and GSAP initializing...");
        const paths1 = [
            "M450.5,334Q434,418,349,436.5Q264,455,183.5,431.5Q103,408,82.5,329Q62,250,103,184Q144,118,222.5,91.5Q301,65,384,107.5Q467,150,458.75,242Q450.5,334Z",
            "M444,321Q420,392,347,430.5Q274,469,190.5,442Q107,415,75,332.5Q43,250,83.5,180.5Q124,111,213.5,88Q303,65,385.5,103Q468,141,456,231Q444,321Z",
            "M451,317Q413,384,339,433.5Q265,483,180.5,445Q96,407,81,328.5Q66,250,91,173.5Q116,97,211,85.5Q306,74,383,109.5Q460,145,455.5,231Q451,317Z"
        ];

        const paths2 = [
            "M398,345.5Q346,441,248.5,439Q151,437,97,343.5Q43,250,102.5,160.5Q162,71,256,80Q350,89,400.5,169.5Q451,250,398,345.5Z",
            "M421,329.5Q376,409,298,435.5Q220,462,142,423Q64,384,52,292Q40,200,101.5,130Q163,60,256.5,75.5Q350,91,408,170.5Q466,250,421,329.5Z",
            "M418.5,330Q385,410,300,432Q215,454,136,419.5Q57,385,55,292.5Q53,200,105,126Q157,52,253.5,69Q350,86,416,168Q482,250,418.5,330Z"
        ];

        // Blob 1 Animation
        const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
        tl1.to(blob1Ref.current, { duration: 7, morphSVG: paths1[1], ease: "sine.inOut" })
            .to(blob1Ref.current, { duration: 7, morphSVG: paths1[2], ease: "sine.inOut" });

        // Blob 2 Animation
        const tl2 = gsap.timeline({ repeat: -1, yoyo: true });
        tl2.to(blob2Ref.current, { duration: 9, morphSVG: paths2[1], ease: "sine.inOut" })
            .to(blob2Ref.current, { duration: 9, morphSVG: paths2[2], ease: "sine.inOut" });

        // Mouse Parallax Effect
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const xPos = (clientX / window.innerWidth - 0.5) * 40;
            const yPos = (clientY / window.innerHeight - 0.5) * 40;

            gsap.to(containerRef.current, {
                x: xPos,
                y: yPos,
                duration: 1,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            tl1.kill();
            tl2.kill();
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="blob-container" ref={containerRef}>
            <svg viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="blob-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(74, 4, 4, 0.15)" />
                        <stop offset="100%" stopColor="rgba(74, 4, 4, 0.05)" />
                    </linearGradient>
                    <linearGradient id="blob-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="rgba(0, 0, 0, 0.08)" />
                        <stop offset="100%" stopColor="rgba(74, 4, 4, 0.05)" />
                    </linearGradient>
                </defs>
                <path
                    ref={blob1Ref}
                    d="M450.5,334Q434,418,349,436.5Q264,455,183.5,431.5Q103,408,82.5,329Q62,250,103,184Q144,118,222.5,91.5Q301,65,384,107.5Q467,150,458.75,242Q450.5,334Z"
                    fill="url(#blob-grad-1)"
                />
                <path
                    ref={blob2Ref}
                    d="M398,345.5Q346,441,248.5,439Q151,437,97,343.5Q43,250,102.5,160.5Q162,71,256,80Q350,89,400.5,169.5Q451,250,398,345.5Z"
                    fill="url(#blob-grad-2)"
                    style={{ transform: 'scale(0.8) translate(50px, 50px)', transformOrigin: 'center' }}
                />
            </svg>
        </div>
    );
};

export default MorphingBlob;
