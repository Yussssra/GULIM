import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const { login, signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Client-side validation
        if (!isLogin) {
            if (!formData.email.toLowerCase().endsWith('@gmail.com')) {
                setError('Only Gmail addresses are allowed');
                setShake(true);
                setTimeout(() => setShake(false), 600);
                return;
            }
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
                setShake(true);
                setTimeout(() => setShake(false), 600);
                return;
            }
        }

        let result;
        const processedEmail = formData.email.toLowerCase().trim();
        if (isLogin) {
            result = await login(processedEmail, formData.password);
        } else {
            result = await signup(formData.name, processedEmail, formData.password);
        }

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
            // CSS shake animation on error
            setShake(true);
            setTimeout(() => setShake(false), 600);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <div className="auth-modal">
            <div className="auth-overlay" onClick={onClose}></div>
            <div className={`auth-content ${shake ? 'shake' : ''} ${isOpen ? 'auth-content-visible' : ''}`}>
                <button className="close-auth" onClick={onClose}>&times;</button>
                <div className="auth-header">
                    <h2>{isLogin ? 'Welcome Back' : 'Join Gulim'}</h2>
                    <p>{isLogin ? 'Sign in to your account' : 'Create your basic sanctuary'}</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="input-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                required
                            />
                        </div>
                    )}
                    <div className="input-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="hello@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button type="submit" className="auth-submit-btn">
                        {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button onClick={toggleMode}>
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
