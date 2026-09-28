import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPKR } from '../config/store';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export default function MobileMiniCartBar() {
  const { pathname } = useLocation();
  const { totalItems, subtotal } = useCart();

  // Hide on checkout, cart, or when cart has no items
  if (totalItems === 0 || pathname === '/checkout' || pathname === '/cart') {
    return null;
  }

  // Only show on mobile screens
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#181008]/95 backdrop-blur-md border-t border-[#241A10] px-4 py-3 shadow-[0_-8px_20px_rgba(0,0,0,0.4)] pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative w-9 h-9 rounded-lg bg-[#241A10] flex items-center justify-center text-[#F0C36B]">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 bg-[#D9542F] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          </div>
          <div>
            <span className="text-[11px] text-[#FBF3E7]/60 uppercase tracking-wider block">Total</span>
            <span className="text-sm font-bold text-[#FBF3E7]">{formatPKR(subtotal)}</span>
          </div>
        </div>

        <Link
          to="/checkout"
          className="min-h-[44px] px-5 py-2.5 bg-gradient-to-r from-[#D9683F] to-[#B0472B] hover:from-[#B0472B] hover:to-[#7E2F1C] text-white text-xs font-bold uppercase tracking-wider rounded-lg flex items-center gap-2 shadow-md cursor-pointer transition-all active:scale-95"
        >
          <span>Checkout</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#F0C36B]" />
        </Link>
      </div>
    </div>
  );
}
