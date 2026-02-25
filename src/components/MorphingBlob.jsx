import React, { useRef } from 'react';
import './MorphingBlob.css';

// Pure CSS morphing blob — no GSAP dependency
const MorphingBlob = () => {
    return (
        <div className="morphing-blob-container">
            <svg className="blob blob-1" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path className="blob-path-1" />
            </svg>
            <svg className="blob blob-2" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
                <path className="blob-path-2" />
            </svg>
        </div>
    );
};

export default MorphingBlob;
