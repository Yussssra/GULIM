import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import './ProductGrid.css';

const ProductGrid = ({ category }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const productsPerPage = 8; // Showing 8 products per page as requested

    useEffect(() => {
        // Reset to page 1 when category changes
        setCurrentPage(1);
    }, [category]);

    useEffect(() => {
        setLoading(true);
        const url = `http://localhost:5000/api/products?page=${currentPage}&limit=${productsPerPage}&category=${category}`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data && data.products) {
                    setProducts(data.products);
                    setTotalPages(data.totalPages || 1);
                } else if (Array.isArray(data)) {
                    // Fallback for old API structure
                    setProducts(data);
                    setTotalPages(1);
                } else {
                    console.error('Unexpected API response structure:', data);
                    setProducts([]);
                }
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching products:', err);
                setLoading(false);
            });
    }, [category, currentPage]);

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

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default ProductGrid;
