import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import Pagination from './Pagination';
import ALL_PRODUCTS from '../data/products';
import './ProductGrid.css';

const PRODUCTS_PER_PAGE = 8;

const ProductGrid = ({ category, searchQuery }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    // Reset to page 1 when search or category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [category, searchQuery]);

    const gridRef = useRef(null);

    // Filter by category and search query client-side
    const filtered = useMemo(() => {
        let items = ALL_PRODUCTS;

        // Category filter
        if (category && category !== 'ALL') {
            items = items.filter(p => p.category === category.toUpperCase());
        }

        // Search query filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            items = items.filter(p =>
                p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query) ||
                (p.description && p.description.toLowerCase().includes(query))
            );
        }

        return items;
    }, [category, searchQuery]);

    // Paginate
    const totalPages = Math.max(1, Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const products = filtered.slice(start, start + PRODUCTS_PER_PAGE);

    // Reset to page 1 when category changes
    const handleCategoryPage = (page) => {
        setCurrentPage(page);
        if (gridRef.current) {
            gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="product-grid-container" ref={gridRef} style={{ scrollMarginTop: '100px' }}>
            <div className="product-grid">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} onProductClick={handleProductClick} />
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
