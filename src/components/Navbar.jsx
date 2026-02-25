import React from 'react';
import './Navbar.css';

const Navbar = ({ onCategoryChange }) => {
    const categories = ['ALL', 'JEANS', 'TROUSERS', 'CARGO'];

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <h1 className="brand-logo" onClick={() => onCategoryChange('ALL')}>Gulim</h1>
                </div>
                <ul className="navbar-links">
                    <li><a href="/">HOME</a></li>
                    <li className="nav-item-dropdown">
                        <a href="#women" onClick={(e) => e.preventDefault()}>WOMEN</a>
                        <div className="dropdown-box">
                            {categories.map(cat => (
                                <div key={cat} className="dropdown-item" onClick={() => onCategoryChange(cat)}>
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </li>
                    <li className="nav-item-dropdown">
                        <a href="#men" onClick={(e) => e.preventDefault()}>MEN</a>
                        <div className="dropdown-box">
                            {categories.map(cat => (
                                <div key={cat} className="dropdown-item" onClick={() => onCategoryChange(cat)}>
                                    {cat}
                                </div>
                            ))}
                        </div>
                    </li>
                    <li><a href="/accessories">ACCESSORIES</a></li>
                    <li><a href="/sale">SALE</a></li>
                </ul>
                <div className="navbar-icons">
                    <button className="icon-btn search-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                    </button>
                    <button className="icon-btn account-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                    </button>
                    <button className="icon-btn cart-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
