import React from 'react';
import './Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (!totalPages || totalPages <= 1) return null;

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination-wrapper">
            <button
                className="pagination-btn arrow"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                &lsaquo;
            </button>

            <div className="page-numbers">
                {pages.map(page => (
                    <button
                        key={page}
                        className={`pagination-btn number ${currentPage === page ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page.toString().padStart(2, '0')}
                    </button>
                ))}
            </div>

            <button
                className="pagination-btn arrow"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                &rsaquo;
            </button>
        </div>
    );
};

export default Pagination;
