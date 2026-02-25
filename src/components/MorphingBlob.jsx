import React from 'react';
import './MorphingBlob.css';

const MorphingBlob = () => {
    return (
        <div className="morphing-blob-container">
            {/* Zone: top-right — dominant anchor */}
            <div className="bubble b-1"></div>
            {/* Zone: top-left — soft counter-balance */}
            <div className="bubble b-2"></div>
            {/* Zone: bottom-left — grounding weight */}
            <div className="bubble b-3"></div>
            {/* Zone: mid-right center — depth layer */}
            <div className="bubble b-4"></div>
            {/* Zone: bottom-center — floating accent */}
            <div className="bubble b-5"></div>
            {/* Zone: top-center — sky touch */}
            <div className="bubble b-6"></div>
        </div>
    );
};

export default MorphingBlob;
