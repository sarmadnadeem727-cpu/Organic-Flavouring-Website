import React from 'react';

// Brand Palette Tokens for SVG rendering
const BRAND = {
  orange: "#D9542F",
  green: "#6FAE3E",
  deepGreen: "#2F4F24",
  charcoal: "#211D18",
  gold: "#C79A46",
  offWhite: "#FBF8F2"
};

/* -------------------------------------------------------------------------- */
/* 1. TRUST BADGES & CREDIBILITY ICONS                                        */
/* -------------------------------------------------------------------------- */

export const HalalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 2L3 7V16C3 23.5 8.5 29 16 30C23.5 29 29 23.5 29 16V7L16 2Z" fill="#2F4F24" fillOpacity="0.1" stroke={BRAND.deepGreen} strokeWidth="2" strokeLinejoin="round" />
    <path d="M12 16.5L14.5 19L20 13.5" stroke={BRAND.green} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="16" cy="9" r="1.5" fill={BRAND.gold} />
  </svg>
);

export const IsoIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="13" stroke={BRAND.deepGreen} strokeWidth="2" fill="#2F4F24" fillOpacity="0.08" />
    <path d="M16 7V11M16 21V25M7 16H11M21 16H25" stroke={BRAND.gold} strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="16" cy="16" r="6" stroke={BRAND.orange} strokeWidth="2" />
    <path d="M14 16L15.5 17.5L18 15" stroke={BRAND.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FamilyOwnedIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke={BRAND.orange} strokeWidth="2" fill="#D9542F" fillOpacity="0.08" />
    <path d="M10 20C10 20 13 14 16 14C19 14 22 20 22 20" stroke={BRAND.charcoal} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 14V8" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 8C13 6 11 8 11 8" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 8C19 6 21 8 21 8" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const DeliveryTruckIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 7H19V22H2V7Z" stroke={BRAND.deepGreen} strokeWidth="2" strokeLinejoin="round" fill="#2F4F24" fillOpacity="0.08" />
    <path d="M19 12H24.5L28 16.5V22H19V12Z" stroke={BRAND.deepGreen} strokeWidth="2" strokeLinejoin="round" fill="#2F4F24" fillOpacity="0.08" />
    <circle cx="7" cy="24" r="3" stroke={BRAND.orange} strokeWidth="2" fill={BRAND.offWhite} />
    <circle cx="23" cy="24" r="3" stroke={BRAND.orange} strokeWidth="2" fill={BRAND.offWhite} />
    <path d="M10 24H20" stroke={BRAND.deepGreen} strokeWidth="2" />
  </svg>
);

export const PureBotanicalIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4C16 4 7 13 7 19C7 23.9706 11.0294 28 16 28C20.9706 28 25 23.9706 25 19C25 13 16 4 16 4Z" stroke={BRAND.green} strokeWidth="2" strokeLinejoin="round" fill="#6FAE3E" fillOpacity="0.1" />
    <path d="M16 28V16" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 20C12 18 11 16 11 16" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M16 17C19 15 20 13 20 13" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* 2. CATEGORY ICONS                                                         */
/* -------------------------------------------------------------------------- */

export const ChilliCategoryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 4C18 4 16 6 15 8" stroke={BRAND.green} strokeWidth="2" strokeLinecap="round" />
    <path d="M15 8C19 9 24 13 24 20C24 25.5228 19.5228 29 14 28C10 27 7 24 8 19C9 14 13 10 15 8Z" stroke={BRAND.orange} strokeWidth="2" fill="#D9542F" fillOpacity="0.15" strokeLinejoin="round" />
    <path d="M13 13C16 15 18 19 18 23" stroke={BRAND.orange} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
  </svg>
);

export const PowdersCategoryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 16C5 21.5228 9.92487 26 16 26C22.0751 26 27 21.5228 27 16H5Z" stroke={BRAND.deepGreen} strokeWidth="2" fill="#2F4F24" fillOpacity="0.1" strokeLinejoin="round" />
    <path d="M10 16C10 12 12 9 16 9C20 9 22 12 22 16" stroke={BRAND.gold} strokeWidth="2" strokeDasharray="2 2" />
    <path d="M22 6L17 12" stroke={BRAND.gold} strokeWidth="2" strokeLinecap="round" />
    <circle cx="23" cy="5" r="2" stroke={BRAND.gold} strokeWidth="1.5" />
  </svg>
);

export const WholeSpicesCategoryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="12" r="5" stroke={BRAND.charcoal} strokeWidth="2" fill="#211D18" fillOpacity="0.1" />
    <circle cx="22" cy="10" r="4" stroke={BRAND.charcoal} strokeWidth="2" fill="#211D18" fillOpacity="0.1" />
    <circle cx="16" cy="22" r="6" stroke={BRAND.orange} strokeWidth="2" fill="#D9542F" fillOpacity="0.1" />
    <path d="M10 10L10.01 10.01" stroke={BRAND.gold} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M22 8.5L22.01 8.51" stroke={BRAND.gold} strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 20L16.01 20.01" stroke={BRAND.gold} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export const FlourCategoryIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 12L9 26H23L25 12H7Z" stroke={BRAND.gold} strokeWidth="2" fill={BRAND.gold} fillOpacity="0.1" strokeLinejoin="round" />
    <path d="M6 12C6 12 11 10 16 10C21 10 26 12 26 12" stroke={BRAND.gold} strokeWidth="2" strokeLinecap="round" />
    <path d="M12 18H20" stroke={BRAND.deepGreen} strokeWidth="2" strokeLinecap="round" />
    <path d="M14 22H18" stroke={BRAND.deepGreen} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* 3. PROCESS TRACKER STEP ICONS (FOR CHECKOUT & ORDERS)                    */
/* -------------------------------------------------------------------------- */

export const OrderConfirmedIcon = ({ className = "w-6 h-6", active = false }: { className?: string; active?: boolean }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="5" width="18" height="22" rx="3" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" fill={active ? "#D9542F15" : "none"} />
    <path d="M11 11H21" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" strokeLinecap="round" />
    <path d="M11 15H17" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" strokeLinecap="round" />
    <circle cx="20" cy="20" r="4" fill={active ? BRAND.green : "#A0958B"} />
    <path d="M18.5 20L19.5 21L21.5 19" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const FreshlyPackedIcon = ({ className = "w-6 h-6", active = false }: { className?: string; active?: boolean }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="10" width="14" height="17" rx="2" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" fill={active ? "#D9542F15" : "none"} />
    <path d="M12 10V6C12 4.89543 12.8954 4 14 4H18C19.1046 4 20 4.89543 20 6V10" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" />
    <circle cx="16" cy="18.5" r="3.5" fill={active ? BRAND.gold : "#A0958B"} />
  </svg>
);

export const EnRouteIcon = ({ className = "w-6 h-6", active = false }: { className?: string; active?: boolean }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 10H18V22H3V10Z" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" fill={active ? "#D9542F15" : "none"} />
    <path d="M18 14H24L28 18V22H18V14Z" stroke={active ? BRAND.orange : BRAND.charcoal} strokeWidth="2" />
    <circle cx="8" cy="24" r="2.5" fill={active ? BRAND.green : "#A0958B"} />
    <circle cx="22" cy="24" r="2.5" fill={active ? BRAND.green : "#A0958B"} />
  </svg>
);

export const DeliveredIcon = ({ className = "w-6 h-6", active = false }: { className?: string; active?: boolean }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3L27 9V23L16 29L5 23V9L16 3Z" stroke={active ? BRAND.green : BRAND.charcoal} strokeWidth="2" fill={active ? "#6FAE3E15" : "none"} />
    <path d="M16 3V15M27 9L16 15M5 9L16 15" stroke={active ? BRAND.green : BRAND.charcoal} strokeWidth="1.5" />
    <circle cx="16" cy="21" r="3" fill={active ? BRAND.gold : "#A0958B"} />
  </svg>
);

/* -------------------------------------------------------------------------- */
/* 4. EMPTY STATES & EDITORIAL ILLUSTRATIONS                                  */
/* -------------------------------------------------------------------------- */

export const EmptyCartIllustration = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="52" fill={BRAND.offWhite} stroke="#E5D7C5" strokeWidth="2" />
    {/* Spice Jar outline */}
    <rect x="42" y="38" width="36" height="48" rx="6" stroke={BRAND.charcoal} strokeWidth="2.5" fill="#FFFFFF" />
    <rect x="46" y="32" width="28" height="6" rx="2" fill={BRAND.deepGreen} />
    <path d="M50 54H70" stroke="#E5D7C5" strokeWidth="2" strokeLinecap="round" />
    <path d="M50 62H64" stroke="#E5D7C5" strokeWidth="2" strokeLinecap="round" />
    {/* Floating leaf */}
    <path d="M78 28C78 28 84 34 84 40C84 46 78 48 78 48C78 48 72 42 72 36C72 30 78 28 78 28Z" fill={BRAND.green} fillOpacity="0.2" stroke={BRAND.green} strokeWidth="1.5" />
    <circle cx="34" cy="74" r="3" fill={BRAND.orange} opacity="0.4" />
  </svg>
);

export const NoResultsIllustration = ({ className = "w-32 h-32" }: { className?: string }) => (
  <svg viewBox="0 0 120 120" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="52" fill={BRAND.offWhite} stroke="#E5D7C5" strokeWidth="2" />
    <circle cx="54" cy="54" r="22" stroke={BRAND.deepGreen} strokeWidth="3" fill="#FFFFFF" />
    <path d="M70 70L86 86" stroke={BRAND.deepGreen} strokeWidth="4" strokeLinecap="round" />
    <path d="M46 54H62" stroke={BRAND.orange} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HandDrawnCircleAccent = ({ className = "w-16 h-16" }: { className?: string }) => (
  <svg viewBox="0 0 80 80" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 8C20 8 8 22 8 42C8 60 22 72 42 72C60 72 72 58 72 38C72 20 56 10 36 12" stroke={BRAND.gold} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="120 10" />
  </svg>
);
