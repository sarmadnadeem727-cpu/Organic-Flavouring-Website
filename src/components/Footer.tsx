import { Link } from 'react-router-dom';
import { brandLogo, officialInfo } from '../data/products';
import { Phone, Mail, MessageCircle } from 'lucide-react';
import { HalalIcon, IsoIcon } from './Illustrations';

interface FooterProps {
  onOpenCertModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function Footer({ onOpenCertModal, onOpenContactModal }: FooterProps) {
  return (
    <footer className="bg-[#F7F5F2] text-[#222222] border-t border-[#E5E0D8] pt-12 pb-8 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Multi-Column Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 pb-10 border-b border-[#E5E0D8]">
          
          {/* Col 1: About / Company */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <img src={brandLogo} alt="Organic Flavouring" className="w-8 h-8 rounded-full border border-[#E5E0D8]" />
              <span className="font-bold text-base text-[#222222]">
                Organic <span className="text-[#D9542F]">Flavouring</span>
              </span>
            </Link>
            <p className="text-[#666666] leading-relaxed">
              Procuring 100% pure sun-dried Pakistani spices stone-ground and packed for natural flavor since 1994.
            </p>
          </div>

          {/* Col 2: Shop Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#222222] uppercase tracking-wider text-[11px] mb-3">Shop Spices</h4>
            <ul className="space-y-2 text-[#666666]">
              <li><Link to="/shop?category=Chilli" className="hover:text-[#D9542F]">Red Chilli & Flakes</Link></li>
              <li><Link to="/shop?category=Powders" className="hover:text-[#D9542F]">Everyday Powders</Link></li>
              <li><Link to="/shop?category=Whole+Spices" className="hover:text-[#D9542F]">Whole Spices</Link></li>
              <li><Link to="/shop?category=Flour" className="hover:text-[#D9542F]">Gram Flour (Besan)</Link></li>
            </ul>
          </div>

          {/* Col 3: Company & Discovery */}
          <div className="space-y-2">
            <h4 className="font-bold text-[#222222] uppercase tracking-wider text-[11px] mb-3">Discovery</h4>
            <ul className="space-y-2 text-[#666666]">
              <li><Link to="/about" className="hover:text-[#D9542F]">Our Story (Est. 1994)</Link></li>
              <li><Link to="/transparency" className="hover:text-[#D9542F]">Batch Transparency</Link></li>
              <li><Link to="/reviews" className="hover:text-[#D9542F]">Customer Reviews</Link></li>
              <li><Link to="/contact" className="hover:text-[#D9542F]">Contact & Wholesale</Link></li>
              <li className="pt-1"><span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#D9542F]" /> {officialInfo.phone}</span></li>
            </ul>
          </div>

          {/* Col 4: Certifications & WhatsApp Direct */}
          <div className="space-y-3">
            <h4 className="font-bold text-[#222222] uppercase tracking-wider text-[11px] mb-3">Accreditations</h4>
            <div className="flex items-center gap-3">
              <Link 
                to="/certifications"
                className="flex-1 p-2 bg-white rounded border border-[#E5E0D8] flex items-center gap-2 hover:border-[#D9542F] cursor-pointer"
              >
                <HalalIcon className="w-5 h-5 shrink-0 text-[#6FAE3E]" />
                <div className="text-left">
                  <p className="font-semibold text-[10px]">Halal PS:3733</p>
                </div>
              </Link>

              <Link 
                to="/certifications"
                className="flex-1 p-2 bg-white rounded border border-[#E5E0D8] flex items-center gap-2 hover:border-[#D9542F] cursor-pointer"
              >
                <IsoIcon className="w-5 h-5 shrink-0 text-[#D9542F]" />
                <div className="text-left">
                  <p className="font-semibold text-[10px]">ISO 9001:2015</p>
                </div>
              </Link>
            </div>

            <a
              href={`https://wa.me/${officialInfo.whatsapp}?text=Hi%20Organic%20Flavouring,%20I%20have%20an%20inquiry`}
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold rounded transition-colors flex items-center justify-center gap-1.5 cursor-pointer text-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>

        </div>

        {/* Bottom Copyright Line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[#666666] text-[11px] gap-2">
          <p>© 1994 – {new Date().getFullYear()} Organic Flavouring. All Rights Reserved. Lahore, Pakistan.</p>
          <div className="flex space-x-4">
            <Link to="/reviews" className="hover:text-[#D9542F]">Reviews</Link>
            <Link to="/certifications" className="hover:text-[#D9542F]">Certifications</Link>
            <Link to="/contact" className="hover:text-[#D9542F]">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
