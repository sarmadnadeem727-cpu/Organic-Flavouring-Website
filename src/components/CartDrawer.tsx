import React from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo } from '../data/products';
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING, formatPKR } from '../config/store';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EmptyCartIllustration, PureBotanicalIcon, HalalIcon, IsoIcon } from './Illustrations';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal } = useCart();

  if (!isCartOpen) return null;

  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCharge = items.length === 0 ? 0 : isFreeShipping ? 0 : STANDARD_SHIPPING;
  const finalTotal = subtotal + shippingCharge;
  const progressPercent = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const generateWhatsAppOrderText = () => {
    const itemsList = items
      .map(i => `• ${i.product.name} (${i.packSize}) x${i.quantity} = ${formatPKR(i.lineTotal)}`)
      .join('%0A');
    const msg = `*New Order - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* ${formatPKR(subtotal)}%0A*Delivery:* ${isFreeShipping ? 'FREE' : formatPKR(STANDARD_SHIPPING)}%0A*Total Amount:* ${formatPKR(finalTotal)}%0A%0A*Payment:* Cash on Delivery (COD)`;
    return `https://wa.me/${officialInfo.whatsapp}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 w-full sm:max-w-md flex">
        <div className="w-full h-[100dvh] bg-[#FBF8F2] text-[#211D18] shadow-2xl flex flex-col border-l-2 border-[#211D18] pb-[env(safe-area-inset-bottom)]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5D7C5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <h2 className="font-serif-heading text-xl font-bold tracking-tight text-[#211D18]">
                Your Spice Reserve
              </h2>
              <span className="text-xs uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#2F4F24] text-[#FBF8F2]">
                {items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#5A4F46] hover:text-[#D9542F] transition-colors cursor-pointer"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Progress Bar */}
          <div className="bg-[#EFE7DA] px-6 py-3 border-b border-[#E5D7C5] text-xs">
            {isFreeShipping ? (
              <p className="text-[#2F4F24] font-bold flex items-center gap-1.5 uppercase text-xs tracking-wider">
                <PureBotanicalIcon className="w-4 h-4" /> Free Delivery Unlocked Across Pakistan
              </p>
            ) : (
              <div>
                <p className="text-[#5A4F46] text-xs mb-1.5">
                  Add <strong className="text-[#D9542F]">{formatPKR(FREE_SHIPPING_THRESHOLD - subtotal)}</strong> more for Free Delivery
                </p>
                <div className="w-full bg-[#E5D7C5] h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6FAE3E] h-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-10 sm:py-16 space-y-4">
                <EmptyCartIllustration className="mx-auto" />
                <p className="font-serif-heading text-xl font-bold text-[#211D18]">Your Cart is Empty</p>
                <p className="text-xs text-[#5A4F46] max-w-xs mx-auto">
                  Explore our pure Pakistani spices, stone-ground & sun dried.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="btn-primary-custom text-xs py-2.5 px-6 mt-4"
                >
                  Shop Pure Spices
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={`${item.product.id}-${item.packSize}`}
                  className="flex gap-4 bg-white p-3.5 rounded-xl border border-[#E5D7C5] shadow-xs items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-[#FBF8F2] p-1 rounded-lg border border-[#E5D7C5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-heading text-xs font-bold text-[#211D18] truncate">{item.product.name}</h4>
                    <p className="text-xs text-[#5A4F46]">{item.packSize}</p>
                    <p className="text-xs font-bold text-[#D9542F] mt-0.5">{formatPKR(item.lineTotal)}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#211D18] rounded-lg bg-[#FBF8F2]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#211D18] hover:text-[#D9542F] cursor-pointer"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-2 text-xs font-bold min-w-[20px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.packSize, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center text-[#211D18] hover:text-[#D9542F] cursor-pointer"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.packSize)}
                      className="w-8 h-8 flex items-center justify-center text-[#5A4F46] hover:text-[#D9542F] cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5D7C5] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#5A4F46]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#211D18]">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Delivery</span>
                  <span>{isFreeShipping ? <strong className="text-[#2F4F24]">FREE</strong> : formatPKR(STANDARD_SHIPPING)}</span>
                </div>
                <div className="flex justify-between text-base font-serif-heading font-bold text-[#211D18] pt-2 border-t border-[#E5D7C5]">
                  <span>Total Amount</span>
                  <span className="text-[#D9542F]">{formatPKR(finalTotal)}</span>
                </div>
              </div>

              <div className="space-y-2.5">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-[#D9683F] via-[#B0472B] to-[#7E2F1C] hover:from-[#B0472B] hover:to-[#4A1C10] text-white text-xs sm:text-sm font-black uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#E8663D]/40"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href={generateWhatsAppOrderText()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 px-4 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp Quick Order
                </a>
              </div>

              <div className="flex items-center justify-center gap-2 text-xs text-[#5A4F46] pt-1">
                <HalalIcon className="w-4 h-4" />
                <IsoIcon className="w-4 h-4" />
                <span>Halal & ISO 9001:2015 Certified • Cash on Delivery</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
