import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './JeansShowcase.css';

const JeansShowcase = ({ images }) => {
    return (
        <section className="jeans-showcase">
            <div className="showcase-header">
                <h2>The Denim Collective</h2>
                <p>Nine unique cuts. One uncompromising standard.</p>
            </div>
            <div className="collage-container">
                {images.map((img, index) => (
                    <ShowcaseItem key={index} img={img} index={index} />
                ))}
            </div>
        </section>
    );
};

const ShowcaseItem = ({ img, index }) => {
    const [ref, isVisible] = useScrollReveal({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`collage-item item-${index + 1} ${isVisible ? 'revealed' : ''}`}
        >
            <div className="collage-image-box">
                <img src={img} alt={`Jeans ${index + 1}`} />
            </div>
        </div>
    );
};

export default JeansShowcase;
