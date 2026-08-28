import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'IBFT'>('COD');
  const [customerName, setCustomerName] = useState('Ahmed Khan');
  const [customerPhone, setCustomerPhone] = useState('0300 1234567');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('House 12, Street 4, Gulberg III');

  if (!isCartOpen) return null;

  const freeShippingThreshold = 2500;
  const standardShipping = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCharge = items.length === 0 ? 0 : isFreeShipping ? 0 : standardShipping;
  const finalTotal = subtotal + shippingCharge;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = items.map(i => `• ${i.product.name} (${i.selectedSize || i.product.weight}) x${i.quantity} = Rs. ${(i.product.price * i.quantity).toLocaleString()}`).join('%0A');
    const msg = `*New Order - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Delivery Charge:* ${isFreeShipping ? 'FREE' : 'Rs. ' + standardShipping}%0A*Total Amount:* Rs. ${finalTotal.toLocaleString()}%0A%0A*Customer Details:*%0AName: ${customerName}%0APhone: ${customerPhone}%0ACity: ${customerCity}%0AAddress: ${customerAddress}%0APayment: ${paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Bank Transfer / Raast'}`;
    return `https://wa.me/${officialInfo.whatsapp}?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => {
          setIsCartOpen(false);
          setIsCheckingOut(false);
          setOrderComplete(false);
        }}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] text-[#2C2A29] shadow-2xl flex flex-col border-l border-[#E5E0D8]">
          {/* Header */}
          <div className="p-6 border-b border-[#EAE6DF] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#1A1A18]">
                {orderComplete ? "Order Confirmed!" : isCheckingOut ? "Checkout & Details" : "Your Spice Reserve"}
              </h2>
              {!isCheckingOut && !orderComplete && (
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#EAE6DF] text-[#635E59] font-medium">
                  {items.reduce((s, i) => s + i.quantity, 0)} packs
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderComplete(false);
              }}
              className="p-2 text-[#7C766F] hover:text-[#1A1A18] hover:bg-[#F3EFEA] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping bar for Pakistan */}
          {!orderComplete && (
            <div className="bg-[#F3F0E9] px-6 py-3 border-b border-[#E7E2D8] text-xs">
              {isFreeShipping ? (
                <p className="text-[#3A7520] font-medium flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" /> You've unlocked Complimentary Nationwide Delivery!
                </p>
              ) : (
                <div>
                  <p className="text-[#635E59] mb-1.5">
                    Add <span className="font-semibold text-[#1A1A18]">Rs. {(freeShippingThreshold - subtotal).toLocaleString()}</span> more for Free Delivery across Pakistan
                  </p>
                  <div className="w-full bg-[#DDD7CB] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#78A425] h-full transition-all duration-300"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#EEF5E6] text-[#4E7A22] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#1A1A18]">Shukriya!</h3>
                <p className="text-sm text-[#635E59] max-w-xs mx-auto">
                  Your order for fresh, pure spices has been placed. Our Lahore dispatch team is preparing your package with ISO 9001 quality seal.
                </p>
                <div className="pt-4 flex flex-col gap-2">
                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Confirm on WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckingOut(false);
                      setOrderComplete(false);
                    }}
                    className="px-6 py-2.5 bg-[#2B2927] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors rounded-xs"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              <form id="checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#635E59] uppercase tracking-wider mb-1 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border border-[#DDD7CB] rounded-xs px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#78A425]"
                  />
                </div>
                <div>
                  <label className="block text-[#635E59] uppercase tracking-wider mb-1 font-medium">WhatsApp / Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border border-[#DDD7CB] rounded-xs px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#78A425]"
                  />
                </div>
                <div>
                  <label className="block text-[#635E59] uppercase tracking-wider mb-1 font-medium">Delivery City in Pakistan *</label>
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    placeholder="e.g. Lahore, Karachi, Islamabad, Faisalabad"
                    className="w-full bg-white border border-[#DDD7CB] rounded-xs px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#78A425]"
                  />
                </div>
                <div>
                  <label className="block text-[#635E59] uppercase tracking-wider mb-1 font-medium">Complete Street Address *</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-white border border-[#DDD7CB] rounded-xs px-3 py-2 text-[#1A1A18] focus:outline-none focus:border-[#78A425]"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[#635E59] uppercase tracking-wider mb-1.5 font-medium">Payment Option</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-3 rounded-xs border text-left transition-all ${
                        paymentMethod === 'COD' ? 'border-[#78A425] bg-[#EEF5E6] text-[#1A1A18]' : 'border-[#DDD7CB] bg-white text-[#635E59]'
                      }`}
                    >
                      <p className="font-bold text-xs">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-[#7A746C]">Pay cash to courier</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('IBFT')}
                      className={`p-3 rounded-xs border text-left transition-all ${
                        paymentMethod === 'IBFT' ? 'border-[#78A425] bg-[#EEF5E6] text-[#1A1A18]' : 'border-[#DDD7CB] bg-white text-[#635E59]'
                      }`}
                    >
                      <p className="font-bold text-xs">Bank Transfer / Raast</p>
                      <p className="text-[10px] text-[#7A746C]">Direct account payment</p>
                    </button>
                  </div>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <p className="font-serif text-2xl text-[#6B655E]">Your cart is empty</p>
                <p className="text-xs text-[#8A847C] max-w-xs mx-auto">
                  Explore our pure Dandi Cut, Moro Sindh, and Tota Pari spice varieties.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-block mt-4 px-6 py-2.5 bg-[#2B2927] text-white text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors rounded-xs"
                >
                  Discover Fresh Spices
                </button>
              </div>
            ) : (
              items.map(item => (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 bg-white p-3.5 rounded-xs border border-[#EBE7DF] shadow-xs items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-[#FAF8F5] p-1.5 rounded-xs border border-[#F0EBE3]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-semibold text-[#1A1A18] truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-[#7C766F]">{item.selectedSize || item.product.weight}</p>
                    <p className="text-xs font-bold text-[#8B342A] mt-1">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#DDD7CB] rounded-xs bg-[#FAF8F5]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#666059] hover:text-black hover:bg-[#EAE5DC]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#1A1A18]">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#666059] hover:text-black hover:bg-[#EAE5DC]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1.5 text-[#A09A91] hover:text-[#B23023] transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-[#EAE6DF] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#635E59]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1A1A18]">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>ISO 9001 Certified Packaging & Seal</span>
                  <span className="text-[#3A7520] font-medium">Complimentary</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge (Pakistan)</span>
                  <span>{isFreeShipping ? <span className="text-[#3A7520] font-medium">FREE</span> : `Rs. ${standardShipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1A1A18] pt-2 border-t border-[#EAE6DF]">
                  <span>Total Amount</span>
                  <span>Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {isCheckingOut ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="w-1/3 py-3 border border-[#DDD7CB] text-xs font-semibold uppercase tracking-wider text-[#635E59] hover:bg-[#FAF8F5] transition-colors rounded-xs"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      form="checkout-form"
                      className="w-2/3 py-3 bg-[#78A425] hover:bg-[#68901F] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 rounded-xs shadow-xs"
                    >
                      Place Order (COD)
                    </button>
                  </div>
                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Order Directly on WhatsApp
                  </a>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="w-full py-3.5 bg-[#242220] hover:bg-black text-white text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center justify-center gap-2 rounded-xs shadow-md"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 border border-[#25D366] text-[#1E7E34] hover:bg-[#EEF9F1] text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-[#25D366]" /> Fast WhatsApp Order
                  </a>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C867E]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#78A425]" /> ISO 9001:2015 & Halal Certified Pure Spices
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
