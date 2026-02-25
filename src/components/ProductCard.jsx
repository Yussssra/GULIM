import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`product-card ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-actions">
                    <button className="add-to-cart">BUY</button>
                </div>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price">₹{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
