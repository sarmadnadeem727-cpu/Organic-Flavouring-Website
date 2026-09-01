import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User } from 'lucide-react';
import { brandLogo } from '../data/products';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onOpenCertModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Navbar({ onOpenCertModal, onOpenContactModal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems, setIsCartOpen } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Top Notification Bar */}
      <div className="bg-[#F7F5F2] text-[#222222] text-xs py-2 px-4 text-center border-b border-[#E5E0D8] font-medium flex items-center justify-center gap-4">
        <span>Free Nationwide Delivery on Orders over Rs. 2,500</span>
        <span className="hidden sm:inline text-[#666666]">|</span>
        <Link to="/certifications" className="hidden sm:inline text-[#D9542F] hover:underline font-semibold cursor-pointer">
          Halal & ISO Certified
        </Link>
      </div>

      {/* Sticky White Header */}
      <nav
        className={`sticky top-0 z-40 bg-white border-b border-[#E5E0D8] transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between gap-6">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 shrink-0">
              <img
                src={brandLogo}
                alt="Organic Flavouring"
                className="w-9 h-9 object-cover rounded-full border border-[#E5E0D8]"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg text-[#222222] leading-none">
                  Organic <span className="text-[#D9542F]">Flavouring</span>
                </span>
                <span className="text-[10px] text-[#666666] font-medium mt-0.5">Established 1994</span>
              </div>
            </Link>

            {/* Horizontal Nav Links */}
            <div className="hidden lg:flex items-center space-x-6 text-sm font-medium text-[#222222]">
              <Link
                to="/"
                className={`transition-colors ${location.pathname === '/' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Home
              </Link>
              <Link
                to="/shop"
                className={`transition-colors ${location.pathname === '/shop' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${location.pathname === '/about' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Our Story
              </Link>
              <Link
                to="/origin"
                className={`transition-colors ${location.pathname === '/origin' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Origin
              </Link>
              <Link
                to="/recipes"
                className={`transition-colors ${location.pathname === '/recipes' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Recipes
              </Link>
              <Link
                to="/certifications"
                className={`transition-colors ${location.pathname === '/certifications' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Certifications
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${location.pathname === '/contact' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Contact
              </Link>
              <Link
                to="/reviews"
                className={`transition-colors ${location.pathname === '/reviews' ? 'text-[#D9542F] font-semibold' : 'hover:text-[#D9542F]'}`}
              >
                Reviews
              </Link>
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center flex-1 max-w-xs relative">
              <input
                type="text"
                placeholder="Search spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md pl-9 pr-3 py-1.5 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
              />
              <button type="submit" aria-label="Search button" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#D9542F]">
                <Search className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Right Actions (Account & Cart) */}
            <div className="flex items-center space-x-3">
              <Link to="/contact" className="p-2 text-[#222222] hover:text-[#D9542F] transition-colors hidden sm:block" title="Contact & Wholesale Desk">
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-[#222222] hover:text-[#D9542F] transition-colors flex items-center gap-1.5 cursor-pointer"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                <span className="hidden sm:inline text-xs font-semibold">Cart</span>
                {totalItems > 0 && (
                  <span className="bg-[#D9542F] text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-[#222222] lg:hidden cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-[#E5E0D8] px-4 pt-2 pb-4 space-y-2 text-sm">
            <form onSubmit={handleSearchSubmit} className="relative mb-3 pt-1">
              <input
                type="text"
                placeholder="Search spices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md pl-9 pr-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
              />
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
            </form>

            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Shop All Spices
            </Link>
            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Our Heritage & Story
            </Link>
            <Link
              to="/origin"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Origin & Terroir
            </Link>
            <Link
              to="/recipes"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Recipes & Pairings
            </Link>
            <Link
              to="/transparency"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Trace Provenance
            </Link>
            <Link
              to="/certifications"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Certifications (Halal & ISO)
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Contact & Wholesale Desk
            </Link>
            <Link
              to="/reviews"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#222222] hover:text-[#D9542F] font-medium"
            >
              Customer Reviews
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
