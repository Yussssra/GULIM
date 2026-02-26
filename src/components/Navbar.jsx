import React, { useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = ({ onCategoryChange, onAuthClick, onCartClick, searchQuery, onSearchChange, onSearchSubmit }) => {
    const { user, isAuthenticated, logout } = useAuth();
    const { cartCount } = useCart();
    const [searchOpen, setSearchOpen] = useState(false);
    const categories = ['ALL', 'JEANS', 'TROUSERS', 'CARGO', 'ACCESSORIES'];

    const handleSearchToggle = () => {
        if (searchOpen) {
            if (searchQuery.trim()) {
                // If there's text, perform search (scroll to results)
                onSearchSubmit?.();
            } else {
                // If empty, close it
                setSearchOpen(false);
            }
        } else {
            // If closed, open it
            setSearchOpen(true);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    {/* Brand logo removed as requested */}
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
                    <li><a href="#accessories" onClick={(e) => { e.preventDefault(); onCategoryChange('ACCESSORIES'); }}>ACCESSORIES</a></li>
                    <li><a href="/sale">SALE</a></li>
                </ul>
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
                                <div className="user-info-trigger">
                                    <span className="user-name-minimal">{user?.name?.split(' ')[0]}</span>
                                    <svg className="account-icon-mini" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                </div>
                                <div className="account-dropdown">
                                    <button className="dropdown-action-btn logout-action" onClick={logout}>LOGOUT</button>
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
