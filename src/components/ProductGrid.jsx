import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ALL_PRODUCTS from '../data/products';
import './ProductGrid.css';

const PRODUCTS_PER_PAGE = 8;

const ProductGrid = ({ category }) => {
    const [currentPage, setCurrentPage] = useState(1);

    // Filter by category client-side — no backend needed
    const filtered = useMemo(() => {
        if (!category || category === 'ALL') return ALL_PRODUCTS;
        return ALL_PRODUCTS.filter(p => p.category === category.toUpperCase());
    }, [category]);

    // Paginate
    const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const products = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    // Reset to page 1 when category changes
    const handleCategoryPage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="product-grid-container">
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
                {products.length === 0 && (
                    <p style={{ color: 'var(--primary)', opacity: 0.5, letterSpacing: '0.2em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                        No products found.
                    </p>
                )}
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handleCategoryPage}
            />
        </div>
    );
};

export default ProductGrid;
