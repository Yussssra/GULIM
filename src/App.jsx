import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ProductGrid from './components/ProductGrid';
import Preloader from './components/Preloader';
import Marquee from './components/Marquee';
import JeansShowcase from './components/JeansShowcase';
import './App.css';

function App() {
  const [category, setCategory] = useState('ALL');
  const [isLoading, setIsLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

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
      <Navbar onCategoryChange={setCategory} />
      <main>
        <div className="hero-banner">
          <div className="hero-container">
            <div className="hero-text">
              <h1>Gulim</h1>
              <p>The basic store</p>
              <button className="buy-now-btn">BUY NOW</button>
            </div>
            <div className="hero-image-carousel">
              {heroImages.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Gulim Hero ${index + 1}`}
                  className={`carousel-image ${index === currentImageIndex ? 'active' : ''}`}
                />
              ))}
            </div>
          </div>
        </div>

        <Marquee />

        <JeansShowcase images={heroImages} />

        <div className="section-divider">
          <span>THE COLLECTION</span>
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
    </div>
  );
}

export default App;
