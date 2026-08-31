import React, { useState } from 'react';
import { X, Send, MessageCircle, Mail, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { officialInfo } from '../data/products';
import { PureBotanicalIcon } from './Illustrations';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', contact: '', message: '' });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', contact: '', message: '' });
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative bg-[#FBF3E7] bg-powder-dust text-[#241D17] rounded-2xl max-w-lg w-full p-8 shadow-2xl border-2 border-[#241D17] z-10 space-y-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-[#5A4F46] hover:text-[#241D17] rounded-full cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="text-center space-y-2 border-b border-[#E5D7C5] pb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9542F]">
              Direct Contact & Wholesale
            </span>
            <h3 className="font-serif-heading text-2xl font-bold text-[#241D17]">
              Get in Touch
            </h3>
          </div>

          {/* Direct WhatsApp Action */}
          <div className="bg-white p-4 rounded-xl border border-[#E5D7C5] space-y-3">
            <p className="text-xs text-[#5A4F46]">Need an instant response or 20kg/40kg wholesale pricing?</p>
            <a
              href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20have%20an%20inquiry`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-widest rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" /> Message Direct on WhatsApp
            </a>
          </div>

          {submitted ? (
            <div className="text-center py-6 space-y-2">
              <div className="w-12 h-12 bg-[#2F4F24] text-white rounded-full flex items-center justify-center mx-auto">
                <PureBotanicalIcon className="w-6 h-6 text-[#E0A020]" />
              </div>
              <h4 className="font-serif-heading text-lg font-bold">Message Sent!</h4>
              <p className="text-xs text-[#5A4F46]">Shukriya! Our team will reply shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mahmood"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white border-b-2 border-[#241D17] py-2 text-xs text-[#241D17] focus:outline-none focus:border-[#D9542F]"
                />
              </div>

              <div>
                <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">WhatsApp or Email *</label>
                <input
                  type="text"
                  required
                  placeholder="0300 1234567 or email@domain.com"
                  value={formData.contact}
                  onChange={(e) => setFormData({...formData, contact: e.target.value})}
                  className="w-full bg-white border-b-2 border-[#241D17] py-2 text-xs text-[#241D17] focus:outline-none focus:border-[#D9542F]"
                />
              </div>

              <div>
                <label className="block text-[#5A4F46] uppercase font-bold tracking-widest mb-1">Message *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Retail order or wholesale inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white border-b-2 border-[#241D17] py-2 text-xs text-[#241D17] focus:outline-none focus:border-[#D9542F] resize-none"
                />
              </div>

              <button type="submit" className="btn-primary-custom w-full text-xs py-3">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}

          <div className="flex items-center justify-between text-[11px] text-[#5A4F46] pt-2 border-t border-[#E5D7C5]">
            <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-[#6FAE3E]" /> {officialInfo.phone}</span>
            <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#D9542F]" /> {officialInfo.email}</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
