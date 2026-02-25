import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap-trial';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, signup } = useAuth();
    const modalRef = useRef(null);
    const contentRef = useRef(null);

    useEffect(() => {
        if (!modalRef.current) return;

        if (isOpen) {
            // Show first, then animate
            modalRef.current.style.display = 'flex';
            gsap.fromTo(modalRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );
            gsap.fromTo(contentRef.current,
                { y: 50, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)", delay: 0.1 }
            );
        } else {
            // Animate out, then hide
            gsap.to(modalRef.current, {
                opacity: 0, duration: 0.3, ease: "power2.in", onComplete: () => {
                    if (modalRef.current) modalRef.current.style.display = 'none';
                }
            });
        }
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        let result;
        if (isLogin) {
            result = await login(formData.email, formData.password);
        } else {
            result = await signup(formData.name, formData.email, formData.password);
        }

        if (result.success) {
            onClose();
        } else {
            setError(result.message);
            // Shake animation on error
            gsap.to(contentRef.current, { x: 10, duration: 0.1, repeat: 5, yoyo: true });
        }
    };

    const toggleMode = () => {
        gsap.to(contentRef.current, {
            opacity: 0, scale: 0.95, duration: 0.2, onComplete: () => {
                setIsLogin(!isLogin);
                setError('');
                gsap.to(contentRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" });
            }
        });
    };

    return (
        <div className="auth-modal" ref={modalRef} style={{ display: 'none' }}>
            <div className="auth-overlay" onClick={onClose}></div>
            <div className="auth-content" ref={contentRef}>
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
