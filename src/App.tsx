import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CertificationsModal from './components/CertificationsModal';
import ContactModal from './components/ContactModal';
import MobileMiniCartBar from './components/MobileMiniCartBar';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Certifications from './pages/Certifications';
import Transparency from './pages/Transparency';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';

import { initAnalytics, trackPageView } from './lib/analytics';

function RouteTracker() {
  const { pathname } = useLocation();

  useEffect(() => {
    trackPageView(pathname);
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling only on desktop non-touch devices
  useEffect(() => {
    // Disable on touch devices, small viewports, or when user prefers reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const isSmallScreen = window.innerWidth < 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isSmallScreen || prefersReducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    let animationFrameId: number;
    function raf(time: number) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Initialize analytics off the critical path
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <CartProvider>
      <Router>
        <RouteTracker />
        <div className="flex flex-col min-h-screen bg-[#FBF3E7] text-[#2A1F16] selection:bg-[#D89A2E]/30 selection:text-[#2A1F16]">
          <Navbar 
            onOpenCertModal={() => setIsCertModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
          
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={
                <Home 
                  onOpenCertModal={() => setIsCertModalOpen(true)}
                  onOpenContactModal={() => setIsContactModalOpen(true)}
                />
              } />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/corriander-powder" element={<Navigate to="/product/coriander-powder" replace />} />
              <Route path="/product/corriander-whole" element={<Navigate to="/product/coriander-whole" replace />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Checkout />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/certifications" element={<Certifications />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/reviews" element={<Reviews />} />
            </Routes>
          </main>

          <CartDrawer />
          <MobileMiniCartBar />

          <Footer 
            onOpenCertModal={() => setIsCertModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />

          <CertificationsModal 
            isOpen={isCertModalOpen} 
            onClose={() => setIsCertModalOpen(false)} 
          />

          <ContactModal 
            isOpen={isContactModalOpen} 
            onClose={() => setIsContactModalOpen(false)} 
          />
        </div>
      </Router>
    </CartProvider>
  );
}
