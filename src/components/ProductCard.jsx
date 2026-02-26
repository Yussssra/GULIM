import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ProductCard.css';

const ProductCard = ({ product, onProductClick }) => {
    const [ref, isVisible] = useScrollReveal();

    return (
        <div
            ref={ref}
            className={`product-card ${isVisible ? 'reveal-visible' : 'reveal-hidden'}`}
        >
            <div className="product-image-container">
                <img src={product.image} alt={product.name} className="product-image" onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }} />
            </div>
            <div className="product-actions">
                <button className="add-to-cart" onClick={() => onProductClick(product)}>BUY</button>
            </div>
            <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-category">{product.category}</p>
                <p className="product-price"><span className="rupee">₹</span>{product.price}</p>
            </div>
        </div>
    );
};

export default ProductCard;
