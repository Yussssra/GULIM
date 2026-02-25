import React from 'react';
import './FilterBar.css';

const FilterBar = ({ activeCategory, onCategoryChange }) => {
    const categories = ['ALL', 'JEANS', 'TROUSERS', 'CARGO'];

    return (
        <div className="filter-bar">
            <div className="filter-container">
                <ul className="filter-list">
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={activeCategory === category ? 'active' : ''}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default FilterBar;
