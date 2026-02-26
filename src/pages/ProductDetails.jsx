import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import ALL_PRODUCTS from '../data/products';
import { useAuth } from '../context/AuthContext';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart, setIsCartOpen } = useCart();
    const { user, isAuthenticated } = useAuth();

    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [activeTab, setActiveTab] = useState('details'); // details, sizeChart, reviews
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const sizes = ['S', 'M', 'L', 'XL'];

    useEffect(() => {
        const foundProduct = ALL_PRODUCTS.find(p => p.id.toString() === id);
        if (foundProduct) {
            setProduct(foundProduct);
            fetchReviews();
        }
        window.scrollTo(0, 0);
    }, [id]);

    const fetchReviews = async () => {
        try {
            const res = await fetch(`http://localhost:5000/api/reviews/${id}`);
            const data = await res.json();
            setReviews(data);
        } catch (err) {
            console.error('Error fetching reviews:', err);
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        console.log('Frontend: Review submit triggered');
        if (!isAuthenticated) return alert('Please log in to leave a review');

        setIsSubmitting(true);
        console.log('Frontend: Submitting review payload:', {
            product: id,
            user: user?.name,
            rating: newReview.rating,
            comment: newReview.comment
        });

        try {
            const res = await fetch('/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    product: id,
                    user: user.name,
                    rating: newReview.rating,
                    comment: newReview.comment
                })
            });

            console.log('Frontend: Server response status:', res.status);

            if (res.ok) {
                console.log('Frontend: Review submitted successfully');
                setNewReview({ rating: 5, comment: '' });
                fetchReviews();
            } else {
                const errorData = await res.json();
                console.error('Frontend: Review submission failed:', errorData.message);
            }
        } catch (err) {
            console.error('Frontend: Network error submitting review:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!product) {
        return (
            <div className="product-not-found">
                <h2>Product not found</h2>
                <button onClick={() => navigate('/')}>Back to Home</button>
            </div>
        );
    }

    const handleAddToCart = () => {
        if (!selectedSize) {
            alert('Please select a size first!');
            return;
        }
        addToCart({ ...product, selectedSize });
        setIsCartOpen(true); // Automatically open cart to show it worked
    };

    const handleBuyNow = () => {
        if (!selectedSize) {
            alert('Please select a size first!');
            return;
        }
        addToCart({ ...product, selectedSize });
        setIsCartOpen(true);
        // We could also trigger checkout automatically here if we passed the checkout function,
        // but opening the cart with the item is a standard "Buy Now" behavior for guest/variable flows.
    };

    return (
        <div className="product-details-page">
            <button className="back-btn" onClick={() => navigate('/')}>
                <span className="back-arrow">←</span> BACK TO COLLECTION
            </button>

            <div className="product-details-container">
                {/* Left Side: Product Image (Sticky) */}
                <div className="product-visual-section">
                    <div className="image-wrapper">
                        <div className="badge-featured">LIMITED EDITION</div>
                        <img src={product.image} alt={product.name} className="main-product-image" />
                    </div>
                </div>

                {/* Right Side: Product Info (Scrollable) */}
                <div className="product-content-section">
                    <div className="product-info-sticky">
                        <div className="brand-badge pulsate">GULIM EXCLUSIVE</div>

                        <div className="product-header">
                            <h1 className="product-title-lux">{product.name}</h1>
                            <div className="category-tag">{product.category}</div>

                            <div className="price-container">
                                <p className="product-price-lux">
                                    <span className="rupee">₹</span>{product.price}
                                </p>
                                <span className="free-shipping-tag">FREE SHIPPING</span>
                            </div>
                        </div>

                        <div className="product-description-minimal">
                            <p>Experience the pinnacle of essential wear. Meticulously crafted for those who value both form and function. Our signature {product.category.toLowerCase()} represents the GULIM standard of premium basics.</p>
                        </div>

                        <div className="product-sizes-lux">
                            <div className="sizes-header">
                                <span className="sizes-label">SELECT SIZE</span>
                                <span className="size-guide-trigger" onClick={() => setActiveTab('sizeChart')}>Size Guide</span>
                            </div>
                            <div className="size-selector">
                                {sizes.map(size => (
                                    <button
                                        key={size}
                                        className={`size-option ${selectedSize === size ? 'active' : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="product-actions-fixed">
                            <div className="action-button-group">
                                <button className="btn-add-to-cart" onClick={handleAddToCart}>
                                    <span className="btn-label">ADD TO BAG</span>
                                </button>
                                <button className="btn-order-now" onClick={handleBuyNow}>
                                    <span className="btn-label">ORDER NOW</span>
                                </button>
                            </div>

                            <div className="trust-badges">
                                <span>🔒 Secure Payment</span>
                                <span>🔄 7-Day Returns</span>
                            </div>
                        </div>

                        <div className="product-extra-tabs">
                            <div className="lux-tab-nav">
                                {['details', 'sizeChart', 'reviews'].map(tab => (
                                    <button
                                        key={tab}
                                        className={`lux-tab-btn ${activeTab === tab ? 'active' : ''}`}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            <div className="lux-tab-panel">
                                {activeTab === 'details' && (
                                    <div className="fade-in">
                                        <ul className="details-list-lux">
                                            <li>100% Premium Sustainable Fabric</li>
                                            <li>Reinforced stitching for longevity</li>
                                            <li>Breathable, all-day comfort</li>
                                            <li>Signature GULIM tailored fit</li>
                                        </ul>
                                    </div>
                                )}

                                {activeTab === 'sizeChart' && (
                                    <div className="fade-in">
                                        <table className="lux-size-table">
                                            <thead>
                                                <tr>
                                                    <th>SIZE</th>
                                                    <th>WAIST (IN)</th>
                                                    <th>LENGTH (IN)</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>S</td><td>28-30</td><td>38</td></tr>
                                                <tr><td>M</td><td>30-32</td><td>39</td></tr>
                                                <tr><td>L</td><td>32-34</td><td>40</td></tr>
                                                <tr><td>XL</td><td>34-36</td><td>41</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {activeTab === 'reviews' && (
                                    <div className="fade-in reviews-lux">
                                        <div className="reviews-summary-lux">
                                            <div className="rating-huge">
                                                {reviews.length > 0
                                                    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
                                                    : '5.0'}
                                            </div>
                                            <div className="rating-details">
                                                <div className="lux-stars">
                                                    {'★'.repeat(5)}
                                                </div>
                                                <span className="review-count">Verified Reviews ({reviews.length})</span>
                                            </div>
                                        </div>

                                        <div className="lux-review-list">
                                            {reviews.map((r, index) => (
                                                <div key={index} className="lux-review-card">
                                                    <div className="card-header">
                                                        <span className="reviewer-lux">{r.user}</span>
                                                        <span className="review-date-lux">{new Date(r.createdAt).toLocaleDateString()}</span>
                                                    </div>
                                                    <div className="lux-stars-small">{'★'.repeat(r.rating).padEnd(5, '☆')}</div>
                                                    <p className="comment-lux">{r.comment}</p>
                                                </div>
                                            ))}
                                            {reviews.length === 0 && <p className="empty-reviews-lux">Be the first to share your GULIM experience.</p>}
                                        </div>

                                        {isAuthenticated && (
                                            <form className="lux-review-form" onSubmit={handleReviewSubmit}>
                                                <h4>Share Your Experience</h4>
                                                <div className="lux-rating-input">
                                                    {[1, 2, 3, 4, 5].map(num => (
                                                        <span
                                                            key={num}
                                                            className={`lux-star-input ${newReview.rating >= num ? 'active' : ''}`}
                                                            onClick={() => setNewReview({ ...newReview, rating: num })}
                                                        >
                                                            ★
                                                        </span>
                                                    ))}
                                                </div>
                                                <textarea
                                                    placeholder="Your feedback matters..."
                                                    value={newReview.comment}
                                                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                                                    required
                                                />
                                                <button type="submit" className="btn-lux-submit" disabled={isSubmitting}>
                                                    {isSubmitting ? 'SECURIING...' : 'POST REVIEW'}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
