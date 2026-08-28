import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo } from '../data/products';
import { Trash2, Plus, Minus, CheckCircle2, MessageCircle, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import IllustratedStepTracker from '../components/IllustratedStepTracker';

export default function Checkout() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [activeStep, setActiveStep] = useState<number>(1); // 1: Order Confirmation, 2: Freshly Packed, 3: En Route, 4: Delivered
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'IBFT'>('COD');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const freeShippingThreshold = 2500;
  const standardShipping = 250;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCharge = items.length === 0 ? 0 : isFreeShipping ? 0 : standardShipping;
  const finalTotal = subtotal + shippingCharge;

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setOrderComplete(true);
      setActiveStep(4); // Trigger fully delivered celebration state
      clearCart();
    }, 1400);
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = items.map(i => `• ${i.product.name} (${i.selectedSize || i.product.weight}) x${i.quantity} = Rs. ${(i.product.price * i.quantity).toLocaleString()}`).join('%0A');
    const msg = `*Order Confirmation - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Delivery:* ${isFreeShipping ? 'FREE' : 'Rs. ' + standardShipping}%0A*Total:* Rs. ${finalTotal.toLocaleString()}%0A%0A*Customer Info:*%0AName: ${customerName || 'Customer'}%0APhone: ${customerPhone}%0ACity: ${customerCity}%0AAddress: ${customerAddress}%0APayment: ${paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}${deliveryNotes ? '%0ANotes: ' + deliveryNotes : ''}`;
    return `https://wa.me/${officialInfo.whatsapp}?text=${msg}`;
  };

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center mb-4 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#B33A2E]">
            Direct Farm-to-Kitchen Supply
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#2A211B]">
            {orderComplete ? "Order Placed Successfully!" : "Checkout & Spice Journey"}
          </h1>
        </div>

        {/* 🌟 ILLUSTRATED STEP TRACKER (Interactive & Guided) */}
        <IllustratedStepTracker 
          currentStep={activeStep} 
          onStepClick={(step) => !orderComplete && setActiveStep(step)}
        />

        {orderComplete ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl border border-[#EBDAC4] p-10 md:p-16 text-center max-w-2xl mx-auto space-y-6 shadow-sm mt-8"
          >
            <div className="w-20 h-20 bg-[#EAF2ED] text-[#1F4B33] rounded-full flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#2A211B]">Shukriya for Your Order!</h2>
            <p className="text-sm text-[#5E4D40] leading-relaxed">
              Your order has been received. Our certified Lahore facility will prepare your fresh spice package and dispatch it with sealed freshness guarantee.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={generateWhatsAppOrderText()}
                target="_blank"
                rel="noreferrer"
                className="px-8 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> Send Confirmation on WhatsApp
              </a>
              <Link
                to="/shop"
                className="px-8 py-3.5 bg-[#2A211B] hover:bg-[#B33A2E] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          </motion.div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#EBDAC4] p-12 text-center max-w-lg mx-auto space-y-4 mt-8">
            <ShoppingBag className="w-16 h-16 text-[#DFCBB2] mx-auto" />
            <h2 className="font-serif text-2xl font-bold text-[#2A211B]">Your cart is currently empty</h2>
            <p className="text-xs text-[#826E5F]">
              Explore our 7 certified spice varieties and discover pure Pakistani flavor.
            </p>
            <div className="pt-4">
              <Link
                to="/shop"
                className="inline-block px-8 py-3 bg-[#B33A2E] text-white text-xs uppercase tracking-widest font-bold rounded-xs hover:bg-[#972E24] transition-colors shadow-md"
              >
                Discover Spices
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
            
            {/* Step 1: Cart Summary */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBDAC4] shadow-xs space-y-6">
                <h2 className="font-serif text-xl font-bold text-[#2A211B] pb-4 border-b border-[#F4EAD9]">
                  1. Order Summary ({items.reduce((s, i) => s + i.quantity, 0)} items)
                </h2>

                <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                  {items.map(item => (
                    <motion.div
                      layout
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-4 p-3 bg-[#FBF3E7] rounded-xl border border-[#EBDAC4] items-center"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-contain bg-white p-1 rounded-lg border border-[#DFCBB2]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-[#2A211B] truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-[#826E5F]">{item.selectedSize || item.product.weight}</p>
                        <p className="text-xs font-bold text-[#B33A2E] mt-0.5">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#DFCBB2] rounded-xs bg-white">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-[#5E4D40]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-[#5E4D40]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#826E5F] hover:text-[#B33A2E]"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Subtotal Calculation */}
                <div className="pt-4 border-t border-[#F4EAD9] space-y-2 text-xs text-[#5E4D40]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-[#2A211B]">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nationwide Delivery</span>
                    <span>{isFreeShipping ? <strong className="text-[#1F4B33]">FREE</strong> : `Rs. ${standardShipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-bold text-[#2A211B] pt-2 border-t border-[#F4EAD9]">
                    <span>Total Amount</span>
                    <span className="text-[#B33A2E]">Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 & 3: Delivery Form & Payment with Floating Labels */}
            <div className="lg:col-span-6 space-y-6">
              <form onSubmit={handleOrderSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-[#EBDAC4] shadow-xs space-y-6">
                <h2 className="font-serif text-xl font-bold text-[#2A211B] pb-4 border-b border-[#F4EAD9]">
                  2. Delivery Details (Pakistan)
                </h2>

                <div className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#6B5A4E] uppercase tracking-wider mb-1 font-bold">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asad Mahmood"
                      value={customerName}
                      onFocus={() => setActiveStep(2)}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] focus:bg-white transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#6B5A4E] uppercase tracking-wider mb-1 font-bold">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={customerPhone}
                        onFocus={() => setActiveStep(2)}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[#6B5A4E] uppercase tracking-wider mb-1 font-bold">City / Area *</label>
                      <input
                        type="text"
                        required
                        placeholder="Lahore, Karachi, Islamabad..."
                        value={customerCity}
                        onFocus={() => setActiveStep(2)}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#6B5A4E] uppercase tracking-wider mb-1 font-bold">Delivery Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="House/Building, Street, Area"
                      value={customerAddress}
                      onFocus={() => setActiveStep(2)}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] focus:bg-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#6B5A4E] uppercase tracking-wider mb-1 font-bold">Delivery Notes (Optional)</label>
                    <input
                      type="text"
                      placeholder="Any specific delivery instructions"
                      value={deliveryNotes}
                      onChange={(e) => setDeliveryNotes(e.target.value)}
                      className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] focus:bg-white transition-colors"
                    />
                  </div>
                </div>

                {/* Step 3: Payment Method */}
                <div className="pt-4 border-t border-[#F4EAD9]">
                  <label className="block text-xs uppercase tracking-wider font-bold text-[#6B5A4E] mb-3">
                    3. Select Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('COD');
                        setActiveStep(3);
                      }}
                      className={`p-3 rounded-xs border text-left transition-all ${
                        paymentMethod === 'COD' ? 'border-[#B33A2E] bg-[#F5E8D3] text-[#2A211B] shadow-xs' : 'border-[#DFCBB2] bg-[#FBF3E7] text-[#5E4D40]'
                      }`}
                    >
                      <p className="font-bold text-xs">Cash on Delivery (COD)</p>
                      <p className="text-[10px] text-[#826E5F]">Pay cash upon delivery</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPaymentMethod('IBFT');
                        setActiveStep(3);
                      }}
                      className={`p-3 rounded-xs border text-left transition-all ${
                        paymentMethod === 'IBFT' ? 'border-[#B33A2E] bg-[#F5E8D3] text-[#2A211B] shadow-xs' : 'border-[#DFCBB2] bg-[#FBF3E7] text-[#5E4D40]'
                      }`}
                    >
                      <p className="font-bold text-xs">Bank Transfer / Raast</p>
                      <p className="text-[10px] text-[#826E5F]">Direct account payment</p>
                    </button>
                  </div>
                </div>

                {/* Step 4: Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#B33A2E] hover:bg-[#972E24] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md disabled:opacity-75"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Processing Order...
                    </>
                  ) : (
                    <>
                      Place Order Now (Rs. {finalTotal.toLocaleString()}) <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
