import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import CertificationsModal from './components/CertificationsModal';
import ContactModal from './components/ContactModal';
import { CartProvider } from './context/CartContext';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Initialize Lenis Smooth Scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <CartProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#FBF3E7] text-[#2A1F16] selection:bg-[#D89A2E]/30 selection:text-[#2A1F16]">
          <Navbar 
            onOpenCertModal={() => setIsCertModalOpen(true)}
            onOpenContactModal={() => setIsContactModalOpen(true)}
          />
          
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={
                <Home 
                  onOpenCertModal={() => setIsCertModalOpen(true)}
                  onOpenContactModal={() => setIsContactModalOpen(true)}
                />
              } />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Checkout />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>

          <CartDrawer />

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
