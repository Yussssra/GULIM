import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import MorphingBlob from './components/MorphingBlob';
import AnimatedDivider from './components/AnimatedDivider';
import AuthModal from './components/AuthModal';
import './App.css';

function App() {
  const [category, setCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const collectionRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Native smooth scroll — no GSAP needed
  const scrollToCollection = () => {
    if (collectionRef.current) {
      collectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      <div
        className="cursor-spotlight"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`
        }}
      />
      {isLoading && <Preloader onLoadingComplete={() => setIsLoading(false)} />}
      <Marquee />
      <Navbar onCategoryChange={setCategory} onAuthClick={() => setIsAuthOpen(true)} />
      <main>
        <div className="hero-banner">
          <MorphingBlob />
          <div className="hero-container">
            <div className="hero-text">
              <h1>Gulim</h1>
              <p>THE BASIC STORE</p>
              <div className="hero-actions">
                <button className="buy-now-btn" onClick={scrollToCollection}>BUY NOW</button>
              </div>
            </div>
          </div>
        </div>

        <div ref={collectionRef}>
          <AnimatedDivider label="THE COLLECTION" />
        </div>

        <ProductGrid category={category} />
      </main>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 GULIM Store. All rights reserved.</p>
          <div className="footer-contact">
            <p>Gmail: <a href="mailto:gulimindia@gmail.com">gulimindia@gmail.com</a></p>
            <p>Instagram: <a href="https://instagram.com/gulim.india" target="_blank" rel="noopener noreferrer">@gulim.india</a></p>
          </div>
        </div>
      </footer>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}

export default App;
