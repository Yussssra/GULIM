import React from 'react';
import './MorphingBlob.css';

const MorphingBlob = () => {
    return (
        <div className="morphing-blob-container">
            {/* Main large blob — right side */}
            <div className="bubble bubble-main"></div>

            {/* Mid-size roaming blobs */}
            <div className="bubble bubble-mid-left"></div>
            <div className="bubble bubble-mid-bottom"></div>

            {/* Small accent bubbles */}
            <div className="bubble bubble-sm-1"></div>
            <div className="bubble bubble-sm-2"></div>
            <div className="bubble bubble-sm-3"></div>
            <div className="bubble bubble-sm-4"></div>
        </div>
    );
};

export default MorphingBlob;
