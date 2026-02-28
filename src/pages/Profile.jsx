import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
            return;
        }

        const fetchOrders = async () => {
            try {
                const response = await fetch(`/api/orders/user/${user.id}`);
                if (response.ok) {
                    const data = await response.json();
                    setOrders(data);
                } else {
                    console.error('Failed to fetch orders');
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        if (user?.id) {
            fetchOrders();
        }
    }, [isAuthenticated, navigate, user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!isAuthenticated) return null;

    return (
        <div className="profile-page">
            <div className="profile-header">
                <div className="profile-container">
                    <h1>My Account</h1>
                    <div className="profile-info-card">
                        <div className="profile-avatar">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="profile-details">
                            <h2>{user?.name}</h2>
                            <p>{user?.email}</p>
                        </div>
                        <button className="logout-btn" onClick={handleLogout}>LOGOUT</button>
                    </div>
                </div>
            </div>

            <div className="profile-content">
                <div className="profile-container">
                    <h3 className="section-title">Order History</h3>

                    {loading ? (
                        <div className="loader">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="empty-orders">
                            <p>You haven't placed any orders yet.</p>
                            <button className="shop-now-btn" onClick={() => navigate('/')}>START SHOPPING</button>
                        </div>
                    ) : (
                        <div className="orders-list">
                            {orders.map((order) => (
                                <div key={order._id} className="order-card">
                                    <div className="order-header">
                                        <div className="order-meta">
                                            <span className="order-id">Order #{order._id.slice(-6).toUpperCase()}</span>
                                            <span className="order-date">{new Date(order.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                        </div>
                                        <div className={`order-status status-${order.status.toLowerCase()}`}>
                                            {order.status}
                                        </div>
                                    </div>

                                    <div className="order-items-preview">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="order-item-row">
                                                <img src={item.image} alt={item.name} className="order-item-thumbnail" />
                                                <div className="order-item-info">
                                                    <p className="order-item-name">{item.name}</p>
                                                    <p className="order-item-variations">Size: {item.selectedSize} | Qty: {item.quantity}</p>
                                                </div>
                                                <p className="order-item-price">₹{item.price}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="order-footer">
                                        <div className="order-payment-info">
                                            <span className="payment-label">Payment:</span> {order.paymentMethod}
                                            {order.upiTransactionId && <span className="tx-id"> (Tx: {order.upiTransactionId})</span>}
                                        </div>
                                        <div className="order-total">
                                            Total: <span>₹{order.totalAmount}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
