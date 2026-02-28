import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './CartSidebar.css';

const CartSidebar = ({ onAuthClick }) => {
    const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart, isCartOpen, setIsCartOpen } = useCart();
    const { user, isAuthenticated } = useAuth();

    const [orderSuccess, setOrderSuccess] = React.useState(false);
    const [checkoutMode, setCheckoutMode] = React.useState(false);
    const [shippingAddress, setShippingAddress] = React.useState({
        fullName: '', street: '', city: '', state: '', zipCode: '', phone: ''
    });
    const [paymentMethod, setPaymentMethod] = React.useState('COD');

    const onClose = () => {
        setIsCartOpen(false);
        setOrderSuccess(false);
        setCheckoutMode(false);
    };

    const handleCheckoutInit = () => {
        if (!isAuthenticated) {
            alert('Please sign in to checkout');
            onAuthClick();
            onClose();
            return;
        }
        setCheckoutMode(true);
    };

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.zipCode || !shippingAddress.phone) {
            alert('Please fill in all required address fields.');
            return;
        }

        try {
            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: user.id,
                    items: cartItems,
                    totalAmount: cartTotal,
                    shippingAddress,
                    paymentMethod
                }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                setOrderSuccess(true);
                setCheckoutMode(false);
                clearCart();
            } else {
                alert('Order failed: ' + data.message);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Something went wrong. Is the server running?');
        }
    };

    const handleAddressChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className={`cart-sidebar-overlay ${isCartOpen ? 'open' : ''}`} onClick={onClose} />
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-header">
                    <h2>{checkoutMode ? 'CHECKOUT' : 'YOUR CART'}</h2>
                    <button className="close-sidebar-btn" onClick={onClose}>&times;</button>
                </div>

                <div className="cart-items-container">
                    {orderSuccess ? (
                        <div className="order-success-message">
                            <h3>THANK YOU!</h3>
                            <p>Your order has been recorded in our system.</p>
                            <p>You will receive a confirmation email shortly.</p>
                            <button className="continue-shopping-btn" onClick={onClose}>Continue Buying</button>
                        </div>
                    ) : checkoutMode ? (
                        <form className="checkout-form" onSubmit={handlePlaceOrder}>
                            <h3 className="checkout-section-title">Shipping Address</h3>
                            <div className="checkout-input-group">
                                <input type="text" name="fullName" placeholder="Full Name *" value={shippingAddress.fullName} onChange={handleAddressChange} required />
                            </div>
                            <div className="checkout-input-group">
                                <input type="text" name="street" placeholder="Street Address *" value={shippingAddress.street} onChange={handleAddressChange} required />
                            </div>
                            <div className="checkout-row">
                                <div className="checkout-input-group">
                                    <input type="text" name="city" placeholder="City *" value={shippingAddress.city} onChange={handleAddressChange} required />
                                </div>
                                <div className="checkout-input-group">
                                    <input type="text" name="state" placeholder="State" value={shippingAddress.state} onChange={handleAddressChange} />
                                </div>
                            </div>
                            <div className="checkout-row">
                                <div className="checkout-input-group">
                                    <input type="text" name="zipCode" placeholder="ZIP Code *" value={shippingAddress.zipCode} onChange={handleAddressChange} required />
                                </div>
                                <div className="checkout-input-group">
                                    <input type="tel" name="phone" placeholder="Phone Number *" value={shippingAddress.phone} onChange={handleAddressChange} required />
                                </div>
                            </div>

                            <h3 className="checkout-section-title payment-title">Payment Method</h3>
                            <div className="payment-methods">
                                <label className={`payment-option ${paymentMethod === 'COD' ? 'selected' : ''}`}>
                                    <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <span className="payment-label">Cash on Delivery (COD)</span>
                                </label>
                                <label className={`payment-option ${paymentMethod === 'UPI' ? 'selected' : ''}`}>
                                    <input type="radio" name="payment" value="UPI" checked={paymentMethod === 'UPI'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <span className="payment-label">UPI (GPay, PhonePe, Paytm)</span>
                                </label>
                                <label className={`payment-option ${paymentMethod === 'CARD' ? 'selected' : ''}`}>
                                    <input type="radio" name="payment" value="CARD" checked={paymentMethod === 'CARD'} onChange={(e) => setPaymentMethod(e.target.value)} />
                                    <span className="payment-label">Credit / Debit Card</span>
                                </label>
                            </div>

                            {/* Summary Footer for Checkout */}
                            <div className="checkout-summary">
                                <div className="checkout-total-row">
                                    <span>Total Amount:</span>
                                    <span className="checkout-price">₹{cartTotal}</span>
                                </div>
                                <button type="submit" className="place-order-btn">PLACE ORDER</button>
                                <button type="button" className="back-to-cart-btn" onClick={() => setCheckoutMode(false)}>BACK TO CART</button>
                            </div>
                        </form>
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

                {!orderSuccess && !checkoutMode && cartItems.length > 0 && (
                    <div className="cart-footer">
                        <div className="cart-total">
                            <span>TOTAL</span>
                            <span>₹{cartTotal}</span>
                        </div>
                        <button className="checkout-btn" onClick={handleCheckoutInit}>PROCEED TO CHECKOUT</button>
                        <button className="continue-buying-btn" onClick={onClose}>CONTINUE BUYING</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default CartSidebar;
