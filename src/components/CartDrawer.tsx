import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo } from '../data/products';
import { X, Trash2, Plus, Minus, ArrowRight, MessageCircle } from 'lucide-react';
import { EmptyCartIllustration, PureBotanicalIcon, HalalIcon, IsoIcon } from './Illustrations';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'IBFT'>('COD');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('');

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
    }, 1800);
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = items.map(i => `• ${i.product.name} (${i.selectedSize || 'Standard'}) x${i.quantity} = Rs. ${(i.product.price * i.quantity).toLocaleString()}`).join('%0A');
    const msg = `*New Order - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Delivery:* ${isFreeShipping ? 'FREE' : 'Rs. ' + standardShipping}%0A*Total Amount:* Rs. ${finalTotal.toLocaleString()}%0A%0A*Customer Details:*%0AName: ${customerName || 'Customer'}%0APhone: ${customerPhone}%0ACity: ${customerCity}%0AAddress: ${customerAddress}%0APayment: ${paymentMethod === 'COD' ? 'Cash on Delivery (COD)' : 'Bank Transfer'}`;
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
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FBF8F2] text-[#211D18] shadow-2xl flex flex-col border-l-2 border-[#211D18]">
          {/* Header */}
          <div className="p-6 border-b border-[#E5D7C5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <h2 className="font-serif-heading text-xl font-bold tracking-tight text-[#211D18]">
                {orderComplete ? "Order Received" : isCheckingOut ? "Checkout Details" : "Your Spice Reserve"}
              </h2>
              {!isCheckingOut && !orderComplete && (
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded bg-[#2F4F24] text-[#FBF8F2]">
                  {items.reduce((s, i) => s + i.quantity, 0)} items
                </span>
              )}
            </div>
            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckingOut(false);
                setOrderComplete(false);
              }}
              className="p-2 text-[#5A4F46] hover:text-[#D9542F] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery Progress Bar */}
          {!orderComplete && (
            <div className="bg-[#EFE7DA] px-6 py-3 border-b border-[#E5D7C5] text-xs">
              {isFreeShipping ? (
                <p className="text-[#2F4F24] font-bold flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                  <PureBotanicalIcon className="w-4 h-4" /> Free Delivery Unlocked Across Pakistan
                </p>
              ) : (
                <div>
                  <p className="text-[#5A4F46] text-[11px] mb-1.5">
                    Add <strong className="text-[#D9542F]">Rs. {(freeShippingThreshold - subtotal).toLocaleString()}</strong> more for Free Delivery
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
          )}

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderComplete ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#2F4F24] text-white rounded-full flex items-center justify-center mx-auto">
                  <PureBotanicalIcon className="w-8 h-8 text-[#C79A46]" />
                </div>
                <h3 className="font-serif-heading text-2xl font-bold text-[#211D18]">Shukriya!</h3>
                <p className="text-xs text-[#5A4F46] max-w-xs mx-auto leading-relaxed">
                  Your order has been recorded. Freshly packed spices will be shipped directly from our Lahore center.
                </p>
                <div className="pt-4 flex flex-col gap-3">
                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-primary-custom text-xs py-3"
                  >
                    <MessageCircle className="w-4 h-4" /> Confirm Order via WhatsApp
                  </a>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckingOut(false);
                      setOrderComplete(false);
                    }}
                    className="btn-link-custom text-xs justify-center py-2"
                  >
                    Continue Shopping →
                  </button>
                </div>
              </div>
            ) : isCheckingOut ? (
              <form id="drawer-checkout-form" onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Asad Mahmood"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-white border-b-2 border-[#211D18] py-2 text-xs text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                  />
                </div>
                <div>
                  <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300 1234567"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-white border-b-2 border-[#211D18] py-2 text-xs text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                  />
                </div>
                <div>
                  <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">City *</label>
                  <input
                    type="text"
                    required
                    value={customerCity}
                    onChange={(e) => setCustomerCity(e.target.value)}
                    className="w-full bg-white border-b-2 border-[#211D18] py-2 text-xs text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                  />
                </div>
                <div>
                  <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">Complete Address *</label>
                  <input
                    type="text"
                    required
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full bg-white border-b-2 border-[#211D18] py-2 text-xs text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                  />
                </div>

                <div className="pt-2">
                  <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1.5">Payment Method</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('COD')}
                      className={`p-3 rounded border text-left transition-all cursor-pointer ${
                        paymentMethod === 'COD' ? 'border-[#D9542F] bg-[#D9542F]/10 text-[#211D18]' : 'border-[#E5D7C5] bg-white text-[#5A4F46]'
                      }`}
                    >
                      <p className="font-serif-heading font-bold text-xs">Cash on Delivery</p>
                      <p className="text-[10px] text-[#5A4F46]">Pay courier on delivery</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('IBFT')}
                      className={`p-3 rounded border text-left transition-all cursor-pointer ${
                        paymentMethod === 'IBFT' ? 'border-[#D9542F] bg-[#D9542F]/10 text-[#211D18]' : 'border-[#E5D7C5] bg-white text-[#5A4F46]'
                      }`}
                    >
                      <p className="font-serif-heading font-bold text-xs">Bank Transfer</p>
                      <p className="text-[10px] text-[#5A4F46]">Direct bank payment</p>
                    </button>
                  </div>
                </div>
              </form>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
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
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-4 bg-white p-3.5 rounded-xl border border-[#E5D7C5] shadow-xs items-center"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-14 h-14 object-contain bg-[#FBF8F2] p-1 rounded-lg border border-[#E5D7C5]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif-heading text-xs font-bold text-[#211D18] truncate">{item.product.name}</h4>
                    <p className="text-[10px] text-[#5A4F46]">{item.selectedSize}</p>
                    <p className="text-xs font-bold text-[#D9542F] mt-0.5">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center border border-[#211D18] rounded bg-[#FBF8F2]">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 text-[#211D18]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 text-[#211D18]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-1 text-[#5A4F46] hover:text-[#D9542F]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {items.length > 0 && !orderComplete && (
            <div className="p-6 border-t border-[#E5D7C5] bg-white space-y-4">
              <div className="space-y-1.5 text-xs text-[#5A4F46]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#211D18]">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Nationwide Delivery</span>
                  <span>{isFreeShipping ? <strong className="text-[#2F4F24]">FREE</strong> : `Rs. ${standardShipping}`}</span>
                </div>
                <div className="flex justify-between text-base font-serif-heading font-bold text-[#211D18] pt-2 border-t border-[#E5D7C5]">
                  <span>Total Amount</span>
                  <span className="text-[#D9542F]">Rs. {finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {isCheckingOut ? (
                <div className="space-y-2">
                  <button
                    type="submit"
                    form="drawer-checkout-form"
                    className="btn-primary-custom w-full text-xs py-3"
                  >
                    Place Order (Rs. {finalTotal.toLocaleString()})
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="btn-link-custom w-full text-center text-xs justify-center py-1"
                  >
                    Back to Items
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => setIsCheckingOut(true)}
                    className="btn-primary-custom w-full text-xs py-3.5"
                  >
                    Proceed to Checkout <ArrowRight className="w-4 h-4" />
                  </button>
                  <a
                    href={generateWhatsAppOrderText()}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366]/10 text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" /> WhatsApp Quick Order
                  </a>
                </div>
              )}

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#5A4F46] pt-1">
                <HalalIcon className="w-4 h-4" />
                <IsoIcon className="w-4 h-4" />
                <span>Halal & ISO 9001:2015 Certified</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
