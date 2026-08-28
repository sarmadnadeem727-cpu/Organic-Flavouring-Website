import React from 'react';

// 1. Illustrated Farmer / Sorter Character (Hands sorting vibrant red pods & sacks)
export const SorterIllustration = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#FDF6E8" stroke="#EBDAC4" strokeWidth="2.5" />
    {/* Sorter Hat / Head */}
    <ellipse cx="60" cy="38" rx="22" ry="7" fill="#D8A72E" />
    <path d="M48 38C48 30 53 24 60 24C67 24 72 30 72 38" fill="#C8763E" />
    <circle cx="60" cy="45" r="9" fill="#F3D1AE" />
    {/* Torso / Kurta */}
    <path d="M46 54C46 54 54 52 60 52C66 52 74 54 74 54L78 80H42L46 54Z" fill="#1F4B33" />
    {/* Sorting Hands & Jute Sack */}
    <path d="M35 72C35 66 42 62 60 62C78 62 85 66 85 72L88 98C88 101 84 104 60 104C36 104 32 101 32 98L35 72Z" fill="#C49B71" stroke="#8C673E" strokeWidth="2" />
    {/* Chillies in basket */}
    <path d="M50 68C46 64 45 58 48 57C51 56 55 60 53 66" stroke="#B33A2E" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 66C63 60 69 61 68 65C67 69 62 70 60 66" stroke="#B33A2E" strokeWidth="4" strokeLinecap="round" />
    <path d="M68 70C73 66 77 70 74 74C71 78 66 75 68 70" stroke="#D8A72E" strokeWidth="3.5" strokeLinecap="round" />
    {/* Steam / Aroma Lines */}
    <path d="M40 26C38 22 42 18 40 14" stroke="#D8A72E" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
    <path d="M80 26C82 22 78 18 80 14" stroke="#D8A72E" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
);

// 2. Packing Scene (Pouch/Jar being sealed with rising aroma lines)
export const PackingIllustration = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#FDF6E8" stroke="#EBDAC4" strokeWidth="2.5" />
    {/* Jar / Pouch Body */}
    <path d="M44 48H76L80 94C80 97 76 100 60 100C44 100 40 97 40 94L44 48Z" fill="#FBF3E7" stroke="#2A211B" strokeWidth="2.5" />
    {/* Spice Powder Fill */}
    <path d="M42 66C48 64 56 68 64 65C72 62 76 66 78 67L80 94C80 97 76 100 60 100C44 100 40 97 40 94L42 66Z" fill="#B33A2E" />
    {/* Gold Brand Label on Jar */}
    <rect x="48" y="70" width="24" height="18" rx="3" fill="#D8A72E" stroke="#2A211B" strokeWidth="1.5" />
    <circle cx="60" cy="79" r="4" fill="#FBF3E7" />
    {/* Jar Lid / Seal Mechanism */}
    <rect x="42" y="42" width="36" height="8" rx="2" fill="#1F4B33" stroke="#2A211B" strokeWidth="2" />
    {/* Hands sealing from sides */}
    <path d="M26 44C32 44 38 46 44 47" stroke="#F3D1AE" strokeWidth="6" strokeLinecap="round" />
    <path d="M94 44C88 44 82 46 76 47" stroke="#F3D1AE" strokeWidth="6" strokeLinecap="round" />
    {/* Aroma Swirls */}
    <path d="M52 34C50 28 55 24 53 18" stroke="#D8A72E" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M60 32C62 26 58 22 61 16" stroke="#B33A2E" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M68 34C70 28 65 24 67 18" stroke="#D8A72E" strokeWidth="2.5" strokeLinecap="round" />
    {/* Sparkles */}
    <path d="M84 32L86 36L90 38L86 40L84 44L82 40L78 38L82 36L84 32Z" fill="#D8A72E" />
  </svg>
);

// 3. Pakistani Motorcycle Delivery Rider with Spice Box
export const RiderIllustration = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#FDF6E8" stroke="#EBDAC4" strokeWidth="2.5" />
    {/* Motorcycle Wheels */}
    <circle cx="34" cy="86" r="14" fill="#2A211B" stroke="#DFCBB2" strokeWidth="3" />
    <circle cx="34" cy="86" r="6" fill="#FBF3E7" />
    <circle cx="86" cy="86" r="14" fill="#2A211B" stroke="#DFCBB2" strokeWidth="3" />
    <circle cx="86" cy="86" r="6" fill="#FBF3E7" />
    {/* Bike Chassis */}
    <path d="M34 86L54 74L72 74L86 86" stroke="#B33A2E" strokeWidth="4" strokeLinecap="round" />
    <path d="M54 74L60 58L76 58" stroke="#2A211B" strokeWidth="3" strokeLinecap="round" />
    {/* Spice Delivery Box with Gold Logo */}
    <rect x="22" y="52" width="24" height="24" rx="3" fill="#1F4B33" stroke="#2A211B" strokeWidth="2" />
    <circle cx="34" cy="64" r="5" fill="#D8A72E" />
    {/* Rider Torso & Helmet */}
    <circle cx="64" cy="38" r="9" fill="#D8A72E" stroke="#2A211B" strokeWidth="2" />
    <path d="M58 48C58 48 64 46 70 48L74 68H56L58 48Z" fill="#B33A2E" />
    <path d="M68 52L78 58" stroke="#F3D1AE" strokeWidth="4" strokeLinecap="round" />
    {/* Motion wind lines */}
    <path d="M12 48H20" stroke="#D8A72E" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M8 60H16" stroke="#D8A72E" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 72H20" stroke="#D8A72E" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// 4. Customer Smiling & Receiving Spice Box at Doorstep
export const CustomerIllustration = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="54" fill="#FDF6E8" stroke="#EBDAC4" strokeWidth="2.5" />
    {/* Door Frame Arch */}
    <path d="M38 100V36C38 26 48 20 60 20C72 20 82 26 82 36V100" stroke="#C8763E" strokeWidth="3" fill="#FAF0E1" />
    {/* Happy Customer Head & Smile */}
    <circle cx="60" cy="42" r="10" fill="#F3D1AE" />
    <path d="M54 36C56 30 64 30 66 36" stroke="#2A211B" strokeWidth="3" strokeLinecap="round" />
    <path d="M57 44C58 47 62 47 63 44" stroke="#B33A2E" strokeWidth="2" strokeLinecap="round" />
    {/* Kurta / Body */}
    <path d="M48 54C48 54 54 52 60 52C66 52 72 54 72 54L76 86H44L48 54Z" fill="#1F4B33" />
    {/* Holding Organic Flavouring Spice Package */}
    <rect x="50" y="62" width="20" height="22" rx="3" fill="#B33A2E" stroke="#2A211B" strokeWidth="2" />
    <rect x="55" y="68" width="10" height="10" rx="2" fill="#D8A72E" />
    {/* Hands Wrapping Package */}
    <path d="M44 68C48 68 50 72 53 72" stroke="#F3D1AE" strokeWidth="4" strokeLinecap="round" />
    <path d="M76 68C72 68 70 72 67 72" stroke="#F3D1AE" strokeWidth="4" strokeLinecap="round" />
    {/* Celebration Hearts / Stars */}
    <path d="M32 38L34 41L37 42L34 43L32 46L31 43L28 42L31 41L32 38Z" fill="#D8A72E" />
    <path d="M88 34L90 37L93 38L90 39L88 42L87 39L84 38L87 37L88 34Z" fill="#B33A2E" />
  </svg>
);

// 5. Signature Brand Mascot — Illustrated Chilli Pod with playful loop
export const ChilliMascot = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Green Stem */}
    <path d="M40 18C40 12 36 8 32 6C34 10 37 14 36 18" stroke="#1F4B33" strokeWidth="4" strokeLinecap="round" />
    <path d="M34 18H46C46 18 44 24 40 24C36 24 34 18 34 18Z" fill="#1F4B33" />
    {/* Chilli Pod Curve */}
    <path d="M36 22C46 26 56 40 50 56C46 66 38 72 32 74C34 68 36 60 34 52C32 44 28 32 36 22Z" fill="#B33A2E" stroke="#8C271E" strokeWidth="2" />
    {/* Highlight shine */}
    <path d="M38 28C44 34 46 44 42 54" stroke="#F4A299" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    {/* Golden Sparkle */}
    <circle cx="56" cy="30" r="2.5" fill="#D8A72E" />
  </svg>
);

// 6. Signature Brand Mascot — Illustrated Spice Jar
export const JarMascot = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="28" y="16" width="24" height="6" rx="2" fill="#1F4B33" stroke="#2A211B" strokeWidth="1.5" />
    <path d="M26 22H54L58 64C58 66 55 68 40 68C25 68 22 66 22 64L26 22Z" fill="#FDF6E8" stroke="#2A211B" strokeWidth="2" />
    <path d="M25 40C30 38 36 42 42 39C48 36 52 40 55 41L58 64C58 66 55 68 40 68C25 68 22 66 22 64L25 40Z" fill="#D8A72E" />
    <circle cx="40" cy="52" r="5" fill="#B33A2E" />
  </svg>
);
