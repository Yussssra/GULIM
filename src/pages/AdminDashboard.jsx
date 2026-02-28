import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { token, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchAllOrders = async () => {
        try {
            const response = await fetch('/api/orders/all', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            } else {
                console.error('Failed to fetch orders');
            }
        } catch (error) {
            console.error('Error fetching admin orders:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchAllOrders();
    }, [isAdmin, token, navigate]);

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`/api/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (response.ok) {
                // Refresh order list immediately
                fetchAllOrders();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Network error modifying order status', error);
        }
    };

    return (
        <div className="admin-page">
            <div className="admin-header">
                <div className="admin-container">
                    <h1>Admin Control Panel</h1>
                    <p>Manage store orders and inventory</p>
                </div>
            </div>

            <div className="admin-content">
                <div className="admin-container">
                    <div className="admin-table-wrapper">
                        <div className="table-header-row">
                            <h3>All Orders ({orders.length})</h3>
                            <button className="refresh-btn" onClick={fetchAllOrders}>↻ Refresh</button>
                        </div>

                        {loading ? (
                            <div className="loader">Loading all orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="empty-orders">No orders have been placed yet.</div>
                        ) : (
                            <table className="admin-orders-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Items</th>
                                        <th>Total</th>
                                        <th>Payment</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order._id}>
                                            <td className="admin-date-cell">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="admin-id-cell">#{order._id.slice(-6).toUpperCase()}</td>
                                            <td className="admin-customer-cell">
                                                <strong>{order.shippingAddress?.fullName || 'N/A'}</strong><br />
                                                <small>{order.user?.email || 'N/A'}</small>
                                            </td>
                                            <td className="admin-items-cell">
                                                {order.items.length} item(s)
                                            </td>
                                            <td className="admin-price-cell">₹{order.totalAmount}</td>
                                            <td className="admin-payment-cell">
                                                <span className="badge">{order.paymentMethod}</span>
                                            </td>
                                            <td className="admin-status-cell">
                                                <span className={`status-badge status-${order.status.toLowerCase()}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="admin-action-cell">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                                    className="status-dropdown"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Processing">Processing</option>
                                                    <option value="Completed">Completed</option>
                                                    <option value="Cancelled">Cancelled</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
