import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartSidebar.css';

const CartSidebar = ({ onAuthClick }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isCartOpen, setIsCartOpen } = useCart();
    const { user, isAuthenticated } = useAuth();

    const [orderSuccess, setOrderSuccess] = React.useState(false);
    const onClose = () => {
        setIsCartOpen(false);
        setOrderSuccess(false);
    };

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            alert('Please sign in to checkout');
            onAuthClick();
            onClose();
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user.id,
                    items: cartItems,
                    totalAmount: cartTotal
                }),
            });

            const data = await response.json();
            if (data.success) {
                setOrderSuccess(true);
                clearCart();
            } else {
                alert('Order failed: ' + data.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong during checkout.');
        }
    };

    return (
        <>
            <div className={`cart-sidebar-overlay ${isCartOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>YOUR CART</h2>
                    <button className="close-sidebar-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-items-container">
                    {orderSuccess ? (
                        <div className="order-success-message">
                            <h3>THANK YOU!</h3>
                            <p>Your order has been recorded in our system.</p>
                            <button className="continue-shopping-btn" onClick={onClose}>Continue Buying</button>
                        </div>
                    ) : cartItems.length === 0 ? (
                        <div className="empty-cart-message">
                            <p>Your cart is empty.</p>
                            <button className="continue-shopping-btn" onClick={onClose}>Continue Buying</button>
                        </div>
                    ) : (
                        cartItems.map(item => (
                            <div key={`${item.id}-${item.selectedSize}`} className="cart-item">
                                <img src={item.image} alt={item.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <h4>{item.name}</h4>
                                    <p className="cart-item-meta">Size: {item.selectedSize}</p>
                                    <p className="cart-item-price">₹{item.price}</p>
                                    <div className="cart-item-actions">
                                        <div className="qty-controls">
                                            <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                                            <span>{item.quantity}</span>
                                            <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                                        </div>
                                        <button className="remove-item-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {!orderSuccess && cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>TOTAL</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckout}>CHECKOUT</button>
                        <button className="continue-buying-btn" onClick={onClose}>CONTINUE BUYING</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
