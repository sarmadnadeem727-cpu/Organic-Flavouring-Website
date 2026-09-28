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
import { lazy, Suspense } from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';

// Route-level code-splitting for secondary pages
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Transparency = lazy(() => import('./pages/Transparency'));
const Contact = lazy(() => import('./pages/Contact'));
const Reviews = lazy(() => import('./pages/Reviews'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Shipping = lazy(() => import('./pages/Shipping'));
const Returns = lazy(() => import('./pages/Returns'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Lightweight page skeleton loader fallback
function PageFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-8 bg-[#FBF3E7]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-3 border-[#D9542F] border-t-transparent rounded-full animate-spin" />
        <span className="text-xs uppercase font-bold tracking-widest text-[#241A10]/70">Loading...</span>
      </div>
    </div>
  );
}

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
            <Suspense fallback={<PageFallback />}>
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
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/shipping" element={<Shipping />} />
                <Route path="/returns" element={<Returns />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
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
