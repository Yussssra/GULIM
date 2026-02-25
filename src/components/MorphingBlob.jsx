import React from 'react';
import './MorphingBlob.css';

const MorphingBlob = () => {
    return (
        <div className="morphing-blob-container">
            <div className="bubble bubble-main"></div>
            <div className="bubble bubble-left"></div>
            <div className="bubble bubble-accent"></div>
        </div>
    );
};

export default MorphingBlob;
