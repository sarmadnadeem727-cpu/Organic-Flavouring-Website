import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag, MessageCircle, Sparkles } from 'lucide-react';
import { brandLogo, officialInfo } from '../data/products';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Origin', path: '/origin' },
    { name: 'About', path: '/about' },
    { name: 'Certifications', path: '/certifications' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="bg-[#3D6B2C] text-white text-[11px] py-1.5 px-4 text-center tracking-wider font-semibold flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-[#E8A63C]" />
        <span>🌿 Free Nationwide Delivery on Orders over Rs. 2,500 • Cash on Delivery Available</span>
      </div>

      {/* Main Sticky Navigation Bar */}
      <nav
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFBF5]/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#F0E6D8]'
            : 'bg-[#FFFBF5] py-3.5 border-b border-[#F0E6D8]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            
            {/* Brand Logo & Lockup (Matching actual logo text & leaf colors) */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-[#6FAE3E] p-0.5 bg-white shadow-xs group-hover:border-[#D9542F] transition-colors flex items-center justify-center shrink-0">
                <img
                  src={brandLogo}
                  alt="Organic Flavouring"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1 font-heading text-lg sm:text-2xl font-bold tracking-tight leading-tight">
                  <span className="text-[#6FAE3E]">Organic</span>
                  <span className="text-[#D9542F]">Flavouring</span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-wider uppercase text-[#8C7E72] font-bold">
                  Online Spice Store • Est. 1994
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7">
              {navLinks.map(link => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-xs uppercase tracking-wider font-bold transition-all relative py-1 ${
                      isActive ? 'text-[#D9542F]' : 'text-[#5A4F46] hover:text-[#D9542F]'
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D9542F] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <Link
                to="/shop"
                className="px-5 py-2.5 bg-[#D9542F] hover:bg-[#c24623] text-white text-xs uppercase tracking-wider font-bold rounded-lg transition-colors shadow-sm"
              >
                Shop Now
              </Link>

              {/* Cart Trigger Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 bg-white border border-[#E5D7C5] rounded-full text-[#2A2420] hover:text-[#D9542F] hover:border-[#D9542F] transition-colors shadow-xs group cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9542F] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 bg-white border border-[#E5D7C5] rounded-full text-[#2A2420]"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-4 h-4" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#D9542F] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#2A2420] bg-white border border-[#E5D7C5] rounded-md"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-[#FFFBF5] border-b border-[#F0E6D8] px-4 pt-3 pb-6 mt-3 space-y-2 shadow-lg">
            {navLinks.map(link => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-md text-xs uppercase tracking-wider font-bold ${
                    isActive ? 'bg-[#F8F2E8] text-[#D9542F]' : 'text-[#5A4F46] hover:bg-[#F8F2E8]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center bg-[#D9542F] text-white text-xs uppercase font-bold tracking-wider rounded-lg"
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
