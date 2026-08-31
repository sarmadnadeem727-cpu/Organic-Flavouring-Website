import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { brandLogo, officialInfo } from '../data/products';
import { PureBotanicalIcon, HalalIcon, IsoIcon } from '../components/Illustrations';

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
    <div className="bg-[#FBF8F2] min-h-screen text-[#211D18] bg-grain pb-24">
      
      {/* Header Banner */}
      <section className="relative bg-[#EFE7DA] border-b border-[#E5D7C5] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#2F4F24]/10 text-[#2F4F24] text-xs font-bold uppercase tracking-widest border border-[#2F4F24]/20">
            <Mail className="w-4 h-4 text-[#D9542F]" />
            <span>Customer Desk & Wholesale Supply</span>
          </div>

          <h1 className="font-serif-heading text-4xl sm:text-6xl font-bold text-[#211D18] tracking-tight">
            Get in Touch
          </h1>

          <p className="text-base sm:text-lg text-[#5A4F46] max-w-2xl mx-auto leading-relaxed">
            Have questions about our single-origin spices, retail delivery, or 20kg/40kg wholesale consignments? Reach out anytime.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Block: Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-2xl border-2 border-[#211D18] shadow-lg space-y-6">
              <div className="flex items-center gap-4 pb-6 border-b border-[#E5D7C5]">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#6FAE3E] p-0.5 bg-white shrink-0">
                  <img src={brandLogo} alt="Seal" className="w-full h-full object-cover rounded-full" />
                </div>
                <div>
                  <h3 className="font-serif-heading text-xl font-bold text-[#211D18]">{officialInfo.name}</h3>
                  <p className="text-[10px] text-[#D9542F] font-bold uppercase tracking-widest mt-0.5">Serving You the Natural Twist • Est. 1994</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-[#5A4F46]">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE7DA] flex items-center justify-center text-[#D9542F] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif-heading font-bold text-[#211D18]">Location</p>
                    <p>{officialInfo.city}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE7DA] flex items-center justify-center text-[#6FAE3E] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif-heading font-bold text-[#211D18]">Direct Phone / WhatsApp</p>
                    <p>{officialInfo.phone}</p>
                    <p className="text-[10px] text-[#5A4F46]">Monday – Saturday, 9:00 AM – 7:00 PM PKT</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#EFE7DA] flex items-center justify-center text-[#D9542F] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-serif-heading font-bold text-[#211D18]">Email</p>
                    <p>{officialInfo.email}</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20have%20an%20inquiry`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
            </div>

            {/* Wholesale Info Block */}
            <div className="p-6 bg-[#EFE7DA] rounded-2xl border border-[#E5D7C5] text-xs text-[#5A4F46] space-y-3">
              <div className="flex items-center gap-2 font-serif-heading font-bold text-[#211D18] uppercase tracking-wider">
                <PureBotanicalIcon className="w-4 h-4 text-[#2F4F24]" /> Wholesale & 20kg/40kg Bulk Supply
              </div>
              <p className="leading-relaxed">
                We supply whole and ground spices in 20kg & 40kg sacks to restaurants, caterers, spice retailers, and food manufacturers across Pakistan at direct mandi wholesale rates.
              </p>
            </div>
          </div>

          {/* Right Block: Minimal Form */}
          <div className="lg:col-span-7 bg-white p-8 md:p-12 rounded-2xl border-2 border-[#211D18] shadow-lg">
            {formSubmitted ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-[#2F4F24] text-white rounded-full flex items-center justify-center mx-auto">
                  <PureBotanicalIcon className="w-8 h-8 text-[#C79A46]" />
                </div>
                <h3 className="font-serif-heading text-3xl text-[#211D18]">Message Sent Successfully</h3>
                <p className="text-xs sm:text-sm text-[#5A4F46] max-w-md mx-auto">
                  Shukriya for contacting Organic Flavouring. Our team will review your message and reply via phone/WhatsApp within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    setFormData({ name: '', emailOrPhone: '', subject: '', message: '' });
                  }}
                  className="btn-primary-custom text-xs py-3 px-6 mt-4"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif-heading text-2xl font-bold text-[#211D18] mb-1">Send Us a Message</h3>
                  <p className="text-xs text-[#5A4F46]">Please fill out the form below and we will respond promptly.</p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#5A4F46] mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mahmood"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#211D18] py-2 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A4F46] mb-1">
                      Email or WhatsApp Number *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="0300 1234567 or email@domain.com"
                      value={formData.emailOrPhone}
                      onChange={(e) => setFormData({...formData, emailOrPhone: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-[#211D18] py-2 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#5A4F46] mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Retail Order / Bulk 20kg Supply / General"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full bg-transparent border-b-2 border-[#211D18] py-2 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#5A4F46] mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-transparent border-b-2 border-[#211D18] py-2 text-sm text-[#211D18] focus:outline-none focus:border-[#D9542F] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary-custom w-full text-xs py-4"
                >
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Mandatory Dark Deep-Green Contrast Section (#2F4F24) */}
      <section className="mt-20 py-16 bg-[#2F4F24] text-[#FBF8F2] bg-grain-dark border-t-2 border-[#C79A46]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C79A46]">Wholesale Sacks Desk</span>
            <h3 className="font-serif-heading text-2xl font-bold text-[#FBF8F2]">Direct Commercial Inquiries</h3>
            <p className="text-xs text-[#FBF8F2]/80 max-w-xl">Inquire about 20kg & 40kg master sacks with custom grinding specifications for hotels, restaurants, and retailers.</p>
          </div>
          <div className="flex gap-4">
            <HalalIcon className="w-10 h-10" />
            <IsoIcon className="w-10 h-10" />
          </div>
        </div>
      </section>

    </div>
  );
}
