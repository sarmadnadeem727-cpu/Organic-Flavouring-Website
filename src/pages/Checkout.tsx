import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { officialInfo } from '../data/products';
import { Trash2, Plus, Minus, Check, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Checkout() {
  const { items, updateQuantity, removeFromCart, subtotal, clearCart } = useCart();
  const [orderComplete, setOrderComplete] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'IBFT'>('COD');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('');

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
      clearCart();
    }, 1000);
  };

  const generateWhatsAppOrderText = () => {
    const itemsList = items.map(i => `• ${i.product.name} (${i.selectedSize || 'Standard'}) x${i.quantity} = Rs. ${(i.product.price * i.quantity).toLocaleString()}`).join('%0A');
    const msg = `*Order Confirmation - Organic Flavouring*%0A%0A*Items:*%0A${itemsList}%0A%0A*Subtotal:* Rs. ${subtotal.toLocaleString()}%0A*Delivery:* ${isFreeShipping ? 'FREE' : 'Rs. ' + standardShipping}%0A*Total:* Rs. ${finalTotal.toLocaleString()}%0A%0A*Customer Details:*%0AName: ${customerName || 'Customer'}%0APhone: ${customerPhone}%0ACity: ${customerCity}%0AAddress: ${customerAddress}%0APayment: ${paymentMethod === 'COD' ? 'Cash on Delivery' : 'Bank Transfer'}`;
    return `https://wa.me/${officialInfo.whatsapp}?text=${msg}`;
  };

  return (
    <div className="bg-[#FFFFFF] min-h-screen text-[#222222] pb-16 pt-6">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="mb-6 pb-3 border-b border-[#E5E0D8]">
          <h1 className="text-2xl font-bold text-[#222222]">
            {orderComplete ? "Order Confirmation" : "Checkout"}
          </h1>
        </div>

        {orderComplete ? (
          <div className="bg-white rounded-lg border border-[#E5E0D8] p-8 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-12 h-12 bg-[#6FAE3E]/20 text-[#6FAE3E] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-[#222222]">Order Placed Successfully</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Thank you for shopping with Organic Flavouring. Your fresh spice order has been recorded and will be shipped shortly.
            </p>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={generateWhatsAppOrderText()}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-xs py-2.5"
              >
                <MessageCircle className="w-4 h-4" /> Confirm Order via WhatsApp
              </a>
              <Link to="/shop" className="text-xs font-semibold text-[#D9542F] hover:underline pt-2">
                Continue Shopping →
              </Link>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-lg border border-[#E5E0D8] p-10 text-center max-w-md mx-auto space-y-3">
            <h2 className="text-lg font-bold text-[#222222]">Your Cart is Empty</h2>
            <p className="text-xs text-[#666666]">
              Browse our single-origin sun-dried Pakistani spices.
            </p>
            <div className="pt-3">
              <Link to="/shop" className="btn-primary text-xs">
                Shop Spices
              </Link>
            </div>
          </div>
        ) : (
          /* Standard Checkout Two-Column Flow */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Delivery Details Form Left */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleOrderSubmit} className="bg-white p-6 rounded-lg border border-[#E5E0D8] shadow-xs space-y-4">
                <h2 className="text-base font-bold text-[#222222] pb-2 border-b border-[#E5E0D8]">
                  1. Delivery Details
                </h2>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-[#222222] font-semibold mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariq Mahmood"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#222222] font-semibold mb-1">Mobile / WhatsApp *</label>
                      <input
                        type="tel"
                        required
                        placeholder="0300 1234567"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#222222] font-semibold mb-1">City *</label>
                      <input
                        type="text"
                        required
                        placeholder="Lahore, Karachi, Islamabad..."
                        value={customerCity}
                        onChange={(e) => setCustomerCity(e.target.value)}
                        className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[#222222] font-semibold mb-1">Shipping Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="House / Street / Area"
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      className="w-full bg-[#F7F5F2] border border-[#E5E0D8] rounded-md px-3 py-2 text-xs text-[#222222] focus:outline-none focus:border-[#D9542F]"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="pt-3 border-t border-[#E5E0D8]">
                  <h2 className="text-base font-bold text-[#222222] mb-3">
                    2. Payment Method
                  </h2>

                  <div className="space-y-2 text-xs">
                    <label className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                      paymentMethod === 'COD' ? 'border-[#D9542F] bg-[#F7F5F2]' : 'border-[#E5E0D8]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'COD'}
                          onChange={() => setPaymentMethod('COD')}
                        />
                        <span className="font-semibold text-[#222222]">Cash on Delivery (COD)</span>
                      </div>
                      <span className="text-[11px] text-[#666666]">Pay courier on arrival</span>
                    </label>

                    <label className={`flex items-center justify-between p-3 rounded-md border cursor-pointer ${
                      paymentMethod === 'IBFT' ? 'border-[#D9542F] bg-[#F7F5F2]' : 'border-[#E5E0D8]'
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          checked={paymentMethod === 'IBFT'}
                          onChange={() => setPaymentMethod('IBFT')}
                        />
                        <span className="font-semibold text-[#222222]">Bank Transfer / Raast</span>
                      </div>
                      <span className="text-[11px] text-[#666666]">Online bank transfer</span>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-xs py-3 mt-4"
                >
                  {isSubmitting ? "Processing..." : `Place Order (Rs. ${finalTotal.toLocaleString()})`}
                </button>
              </form>
            </div>

            {/* Order Summary Sidebar Right */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white p-6 rounded-lg border border-[#E5E0D8] shadow-xs space-y-4">
                <h2 className="text-base font-bold text-[#222222] pb-2 border-b border-[#E5E0D8]">
                  Order Summary
                </h2>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {items.map(item => (
                    <div
                      key={`${item.product.id}-${item.selectedSize}`}
                      className="flex gap-3 pb-3 border-b border-[#E5E0D8] items-center justify-between"
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 object-contain bg-[#F7F5F2] p-1 rounded border border-[#E5E0D8]"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-xs text-[#222222] truncate">{item.product.name}</h4>
                        <p className="text-[11px] text-[#666666]">{item.selectedSize}</p>
                        <p className="text-xs font-bold text-[#D9542F]">Rs. {(item.product.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center border border-[#E5E0D8] rounded bg-[#F7F5F2]">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="p-1 text-[#222222]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="p-1 text-[#222222]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-[#666666] hover:text-[#D9542F]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtotal Totals */}
                <div className="pt-2 space-y-2 text-xs text-[#666666]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#222222]">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Nationwide Delivery</span>
                    <span>{isFreeShipping ? <strong className="text-[#6FAE3E]">FREE</strong> : `Rs. ${standardShipping}`}</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-[#222222] pt-3 border-t border-[#E5E0D8]">
                    <span>Total Amount</span>
                    <span className="text-[#D9542F]">Rs. {finalTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
