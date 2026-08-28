import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle, FileCheck } from 'lucide-react';
import { brandLogo, officialInfo } from '../data/products';
import { motion } from 'motion/react';

export default function Contact() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="bg-[#FBF3E7] min-h-screen text-[#2A211B] pb-24">
      
      {/* Header */}
      <section className="relative bg-[#F5E8D3] border-b border-[#EBDAC4] py-20 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#EFE0CB] text-[#6B4F3B] text-xs font-semibold uppercase tracking-widest"
          >
            <Mail className="w-3.5 h-3.5 text-[#B33A2E]" />
            <span>Customer Desk & Wholesale Supply</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-4xl sm:text-6xl font-normal text-[#2A211B] tracking-tight"
          >
            Get in Touch
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base sm:text-lg text-[#5E4D40] font-light leading-relaxed max-w-2xl mx-auto"
          >
            Have questions about our spices, retail deliveries, or 20kg/40kg bulk wholesale orders? We'd love to hear from you.
          </motion.p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-[#EBDAC4] shadow-xs space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-[#F4EAD9]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#DFCBB2] p-0.5 bg-white shrink-0">
                  <img src={brandLogo} alt="Seal" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#2A211B]">{officialInfo.name}</h3>
                  <p className="text-xs text-[#1F4B33] font-semibold uppercase tracking-wider">Serving You the Natural Twist! • Est. 1994</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#5E4D40]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5E8D3] flex items-center justify-center text-[#B33A2E] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2A211B]">General Location</p>
                    <p>{officialInfo.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5E8D3] flex items-center justify-center text-[#B33A2E] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2A211B]">Direct Phone / WhatsApp</p>
                    <p>{officialInfo.phone}</p>
                    <p className="text-[#826E5F]">Monday – Saturday, 9:00 AM – 7:00 PM PKT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F5E8D3] flex items-center justify-center text-[#B33A2E] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-bold text-[#2A211B]">Official Email</p>
                    <p>{officialInfo.email}</p>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Button */}
              <div className="pt-2">
                <a
                  href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20have%20an%20inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Wholesale Callout */}
            <div className="p-6 bg-[#F5E8D3] rounded-2xl border border-[#EBDAC4] text-xs text-[#5E4D40] space-y-3">
              <div className="flex items-center gap-2 font-bold text-[#2A211B] uppercase tracking-wider">
                <FileCheck className="w-4 h-4 text-[#1F4B33]" /> Wholesale & 20kg/40kg Bulk Supply
              </div>
              <p>
                We supply whole and ground spices in 20kg & 40kg sacks to restaurants, caterers, spice retailers, and food manufacturers across Pakistan at direct wholesale rates.
              </p>
            </div>
          </div>

          {/* Right Contact Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border border-[#EBDAC4] shadow-xs">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#EAF2ED] text-[#1F4B33] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl text-[#2A211B]">Message Sent Successfully!</h3>
                <p className="text-sm text-[#5E4D40] max-w-md mx-auto">
                  Shukriya for contacting Organic Flavouring. Our team will review your message and reply via phone/WhatsApp within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', emailOrPhone: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#2A211B] hover:bg-[#B33A2E] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2A211B] mb-1">Send a Message</h3>
                  <p className="text-xs text-[#826E5F]">Please fill out the form below and we will get back to you promptly.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A4E] mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mahmood"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A4E] mb-1.5">
                      Email or WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 0300 1234567 or email@domain.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
                      className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A4E] mb-1.5">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Retail Order / Bulk 20kg Supply / General"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6B5A4E] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-[#FBF3E7] border border-[#DFCBB2] rounded-xs px-3.5 py-2.5 text-xs text-[#2A211B] focus:outline-none focus:border-[#B33A2E] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#B33A2E] hover:bg-[#972E24] text-white text-xs uppercase tracking-widest font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

    </div>
  );
}
