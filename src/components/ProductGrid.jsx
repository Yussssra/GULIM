import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:5000/api/products')
            .then(res => res.json())
            .then(data => {
                if (category === 'ALL') {
                    setProducts(data);
                } else {
                    setProducts(data.filter(p => p.category.toUpperCase() === category));
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [category]);

    if (loading) {
        return <div className="loading">Loading products...</div>;
    }

    return (
        <div className="product-grid-container">
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductGrid;
