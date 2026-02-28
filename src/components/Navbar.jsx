import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onCategoryChange, onAuthClick, onCartClick, searchQuery, onSearchChange, onSearchSubmit }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const [searchOpen, setSearchOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const categories = ['ALL', 'JEANS', 'TROUSERS', 'CARGO', 'ACCESSORIES'];

    const handleSearchToggle = () => {
        if (searchOpen) {
            if (searchQuery.trim()) {
                onSearchSubmit?.();
            } else {
                setSearchOpen(false);
            }
        } else {
            setSearchOpen(true);
        }
    };

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <button
                    className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle Menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className="navbar-logo">
                    {/* Brand logo removed as requested */}
                </div>

                <div className={`navbar-menu-overlay ${isMenuOpen ? 'open' : ''}`} onClick={closeMenu}>
                    <ul className="navbar-links" onClick={(e) => e.stopPropagation()}>
                        <li className="mobile-only-logo">GULIM</li>
                        <li><a href="/" onClick={closeMenu}>HOME</a></li>
                        <li className="nav-item-dropdown">
                            <a href="#women" onClick={(e) => { e.preventDefault(); if (window.innerWidth <= 768) toggleMenu(); }}>WOMEN</a>
                            <div className="dropdown-box">
                                {categories.map(cat => (
                                    <div key={cat} className="dropdown-item" onClick={() => { onCategoryChange(cat); closeMenu(); }}>
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li className="nav-item-dropdown">
                            <a href="#men" onClick={(e) => { e.preventDefault(); if (window.innerWidth <= 768) toggleMenu(); }}>MEN</a>
                            <div className="dropdown-box">
                                {categories.map(cat => (
                                    <div key={cat} className="dropdown-item" onClick={() => { onCategoryChange(cat); closeMenu(); }}>
                                        {cat}
                                    </div>
                                ))}
                            </div>
                        </li>
                        <li><a href="#accessories" onClick={(e) => { e.preventDefault(); onCategoryChange('ACCESSORIES'); closeMenu(); }}>ACCESSORIES</a></li>
                        <li><a href="/sale" onClick={closeMenu}>SALE</a></li>
                    </ul>
                </div>

                <div className="navbar-icons">
                    <div className="search-area">
                        <input
                            type="text"
                            className={`search-input ${searchOpen ? 'search-input-open' : ''}`}
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => onSearchChange(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Escape') handleSearchToggle();
                                if (e.key === 'Enter') onSearchSubmit?.();
                            }}
                        />
                        <button className="icon-btn search-btn" onClick={handleSearchToggle}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                        </button>
                    </div>
                    <div className="navbar-account-section">
                        {!isAuthenticated ? (
                            <button className="icon-btn account-btn" onClick={onAuthClick}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </button>
                        ) : (
                            <div className="user-profile-group">
                                <div className="user-info-trigger" onClick={() => navigate('/profile')}>
                                    <span className="user-name-minimal">{user?.name?.split(' ')[0]}</span>
                                    <svg className="account-icon-mini" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div className="account-dropdown">
                                    <button className="dropdown-action-btn" onClick={() => navigate('/profile')}>PROFILE</button>
                                    <button className="dropdown-action-btn logout-action" onClick={() => { logout(); navigate('/'); }}>LOGOUT</button>
                                </div>
                            </div>
                        )}
                    </div>
                    <button className="icon-btn cart-btn" onClick={onCartClick}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
