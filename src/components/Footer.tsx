import { Link } from 'react-router-dom';
import { brandLogo, officialInfo } from '../data/products';
import { MapPin, Phone, Mail, MessageCircle, ShieldCheck, Award, Truck, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#F8F2E8] text-[#5A4F46] border-t border-[#EDE2D4] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E5D7C5]">
          
          {/* Col 1: Brand Lockup & Store Info */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#6FAE3E] p-0.5 bg-white shadow-xs group-hover:border-[#D9542F] transition-colors">
                <img
                  src={brandLogo}
                  alt="Organic Flavouring"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="flex items-center gap-1 font-heading text-xl font-bold tracking-tight">
                  <span className="text-[#6FAE3E]">Organic</span>
                  <span className="text-[#D9542F]">Flavouring</span>
                </div>
                <span className="text-[10px] tracking-wider uppercase text-[#8C7E72] font-bold">
                  Serving You the Natural Twist!
                </span>
              </div>
            </Link>

            <p className="text-xs text-[#6B5A4E] leading-relaxed max-w-md">
              Pakistan's online spice store built on a family legacy established in 1994. Freshly procured from celebrated spice belts, stone-ground, and packed for peak aroma.
            </p>

            <div className="pt-2 text-xs text-[#5A4F46] space-y-1.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D9542F] shrink-0 mt-0.5" />
                <span>{officialInfo.city}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#6FAE3E] shrink-0" />
                <span>{officialInfo.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#6FAE3E] shrink-0" />
                <span>{officialInfo.email}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading text-xs uppercase tracking-wider font-extrabold text-[#2A2420]">
              Shop Spices
            </h4>
            <ul className="space-y-2 text-xs text-[#6B5A4E]">
              <li><Link to="/shop" className="hover:text-[#D9542F] transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="hover:text-[#D9542F] transition-colors">Red Chilli & Flakes</Link></li>
              <li><Link to="/shop" className="hover:text-[#D9542F] transition-colors">Turmeric (Haldi)</Link></li>
              <li><Link to="/shop" className="hover:text-[#D9542F] transition-colors">Garam Masala Blend</Link></li>
              <li><Link to="/origin" className="hover:text-[#D9542F] transition-colors">Origin & Terroirs</Link></li>
              <li><Link to="/contact" className="hover:text-[#D9542F] transition-colors">Wholesale Sacks (20kg/40kg)</Link></li>
            </ul>
          </div>

          {/* Col 3: Certified Trust & WhatsApp */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="font-heading text-xs uppercase tracking-wider font-extrabold text-[#2A2420]">
              Certified Standards & Support
            </h4>
            <div className="flex gap-2">
              <div className="p-3 bg-white rounded-xl border border-[#E5D7C5] text-xs space-y-1 flex-1 shadow-xs">
                <p className="font-bold text-[#3D6B2C]">Halal Certified</p>
                <p className="text-[10px] text-[#8C7E72]">PS:3733-2022</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-[#E5D7C5] text-xs space-y-1 flex-1 shadow-xs">
                <p className="font-bold text-[#3D6B2C]">ISO 9001:2015</p>
                <p className="text-[10px] text-[#8C7E72]">Quality System</p>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20have%20an%20order%20inquiry`}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <MessageCircle className="w-4 h-4" /> Message on WhatsApp
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7E72] gap-4">
          <p>© 1994 – {new Date().getFullYear()} Organic Flavouring. All rights reserved. Registered Online Spice Store, Lahore, Pakistan.</p>
          <div className="flex space-x-6 text-[11px]">
            <Link to="/certifications" className="hover:text-[#D9542F]">Halal & ISO Verification</Link>
            <Link to="/contact" className="hover:text-[#D9542F]">Wholesale Consignments</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
