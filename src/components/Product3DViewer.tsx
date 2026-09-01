import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Maximize2, X, MoveHorizontal } from 'lucide-react';
import { Product } from '../data/products';

interface Product3DViewerProps {
  product: Product;
  activeMedia?: string;
  isFlatImage?: boolean;
}

export default function Product3DViewer({ product, activeMedia, isFlatImage = false }: Product3DViewerProps) {
  const [rotationY, setRotationY] = useState(0);
  const [tiltX, setTiltX] = useState(-5);
  const [isDragging, setIsDragging] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxScale, setLightboxScale] = useState(1.15);

  // Interaction tracking
  const hasInteracted = useRef(false);
  const pointerStart = useRef({ x: 0, y: 0 });
  const rotStart = useRef({ y: 0, x: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0, time: 0 });
  const animFrameId = useRef<number | null>(null);

  // Face counts: 20 for standard view, 32 for higher fidelity lightbox
  const standardFaceCount = 20;
  const lightboxFaceCount = 32;

  // Determine spice color palette for cylinder shading & label accent
  const getSpiceTheme = (category: string) => {
    switch (category) {
      case 'Chilli':
        return {
          powderBase: '#8A2010',
          powderMid: '#B83218',
          powderHigh: '#D64E28',
          labelBg: '#1C130D',
          sealColor: '#B0472B',
          accent: '#D9683F',
          lidColor: '#241A10'
        };
      case 'Powders':
        return {
          powderBase: '#A86A12',
          powderMid: '#D89A2E',
          powderHigh: '#F5BE52',
          labelBg: '#1C130D',
          sealColor: '#D89A2E',
          accent: '#F0C36B',
          lidColor: '#241A10'
        };
      case 'Whole Spices':
        return {
          powderBase: '#2C3E18',
          powderMid: '#4E6B2A',
          powderHigh: '#759942',
          labelBg: '#1C130D',
          sealColor: '#6E8A4E',
          accent: '#93B26C',
          lidColor: '#241A10'
        };
      default:
        return {
          powderBase: '#8A2010',
          powderMid: '#B83218',
          powderHigh: '#D64E28',
          labelBg: '#1C130D',
          sealColor: '#B0472B',
          accent: '#D9683F',
          lidColor: '#241A10'
        };
    }
  };

  const theme = getSpiceTheme(product.category);

  // Continuous animation loop: idle auto-spin OR inertia deceleration
  useEffect(() => {
    let lastTimestamp = performance.now();

    const loop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.1);
      lastTimestamp = timestamp;

      if (!hasInteracted.current && !isDragging) {
        // Idle auto-rotate: very slow constant Y rotation (~16 deg/sec)
        setRotationY((prev) => (prev + 16 * dt) % 360);
      } else if (!isDragging) {
        // Inertia decay
        if (Math.abs(velocity.current.x) > 0.05 || Math.abs(velocity.current.y) > 0.05) {
          setRotationY((prev) => (prev + velocity.current.x) % 360);
          setTiltX((prev) => Math.max(-25, Math.min(25, prev + velocity.current.y * 0.5)));
          velocity.current.x *= 0.92;
          velocity.current.y *= 0.92;
        }
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    animFrameId.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isDragging]);

  // Pointer Drag Handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    hasInteracted.current = true;
    setIsDragging(true);
    pointerStart.current = { x: e.clientX, y: e.clientY };
    rotStart.current = { y: rotationY, x: tiltX };
    velocity.current = { x: 0, y: 0 };
    lastPos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - pointerStart.current.x;
    const deltaY = e.clientY - pointerStart.current.y;

    const newRotY = (rotStart.current.y + deltaX * 0.65) % 360;
    const newTiltX = Math.max(-25, Math.min(25, rotStart.current.x - deltaY * 0.35));

    setRotationY(newRotY);
    setTiltX(newTiltX);

    // Calculate instantaneous release velocity
    const now = performance.now();
    const dt = Math.max(now - lastPos.current.time, 8);
    velocity.current = {
      x: ((e.clientX - lastPos.current.x) / dt) * 8.5,
      y: -((e.clientY - lastPos.current.y) / dt) * 4.5
    };
    lastPos.current = { x: e.clientX, y: e.clientY, time: now };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignore
    }
    setIsDragging(false);
  };

  // Lightbox wheel zoom handler
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setLightboxScale((prev) => Math.max(0.6, Math.min(1.8, prev - e.deltaY * 0.0015)));
  }, []);

  // Cylinder Face Generator
  const renderCylinderFaces = (faceCount: number, radius: number, faceWidth: number, height: number) => {
    const step = 360 / faceCount;

    return Array.from({ length: faceCount }).map((_, i) => {
      const angle = i * step;
      // Calculate light incidence based on face angle and current rotation
      const effectiveAngle = (angle + rotationY) % 360;
      const rad = (effectiveAngle * Math.PI) / 180;
      // Cosine factor for facing camera + lighting from top-left (offset 35 deg)
      const lightFactor = Math.cos(rad - 0.6);
      const brightness = Math.max(0.55, Math.min(1.22, 0.88 + lightFactor * 0.32));

      // Check if this face is on the front label area (roughly 300deg to 60deg)
      const isFrontLabel = angle <= 45 || angle >= 315;

      return (
        <div
          key={i}
          className="absolute top-0 left-1/2 backface-visible pointer-events-none"
          style={{
            width: `${faceWidth}px`,
            height: `${height}px`,
            marginLeft: `-${faceWidth / 2}px`,
            transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
            filter: `brightness(${brightness.toFixed(3)})`,
            background: isFrontLabel
              ? `linear-gradient(180deg, 
                  rgba(255,255,255,0.4) 0%, 
                  ${theme.labelBg} 12%, 
                  ${theme.labelBg} 68%, 
                  ${theme.powderMid} 72%, 
                  ${theme.powderBase} 100%)`
              : `linear-gradient(180deg, 
                  rgba(255,255,255,0.3) 0%, 
                  ${theme.powderHigh} 18%, 
                  ${theme.powderMid} 55%, 
                  ${theme.powderBase} 100%)`,
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            borderRight: '1px solid rgba(0,0,0,0.18)',
            boxShadow: 'inset 0 0 4px rgba(0,0,0,0.15)'
          }}
        >
          {/* Subtle Label Details on key front faces */}
          {angle === 0 && (
            <div className="w-full h-full flex flex-col items-center justify-start pt-10 text-center select-none overflow-hidden">
              <span className="text-[6px] tracking-widest text-[#E8A33D] font-bold uppercase">EST. 1994</span>
              <span className="text-[7px] text-[#EDE1CC] font-serif font-bold uppercase truncate px-0.5 mt-0.5">
                {product.name.split(' ')[0]}
              </span>
              <div className="w-2.5 h-2.5 rounded-full mt-1 border border-[#D89A2E]/60 bg-[#B0472B]/40" />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="w-full space-y-4">
      {/* ------------------------------------------------------------------------ */}
      {/* 3D JAR STAGE CONTAINER                                                   */}
      {/* ------------------------------------------------------------------------ */}
      <div
        className={`relative aspect-square bg-gradient-to-b from-[#1C130D] via-[#120D08] to-[#0A0704] rounded-2xl overflow-hidden border-2 border-[#241A10] p-6 flex items-center justify-center shadow-2xl select-none touch-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{ perspective: '1100px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {/* Subtle Ambient Radial Glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-45"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${theme.accent}33 0%, transparent 68%)`
          }}
        />

        {/* Flat Image Alternative if selected thumbnail is flat photo */}
        {isFlatImage && activeMedia ? (
          <img
            src={activeMedia}
            alt={product.name}
            className="w-full h-full object-contain relative z-10 select-none pointer-events-none"
            draggable={false}
          />
        ) : (
          /* 3D Cylinder Interactive Assembly */
          <div
            className="relative preserve-3d transition-transform duration-75"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${rotationY}deg)`,
              width: '180px',
              height: '240px'
            }}
          >
            {/* Top Lid Cap */}
            <div
              className="absolute left-1/2 -top-4 rounded-full preserve-3d"
              style={{
                width: '138px',
                height: '138px',
                marginLeft: '-69px',
                transform: 'rotateX(90deg) translateZ(0px)',
                background: 'radial-gradient(circle, #3A2A1E 0%, #241A10 70%, #150F0A 100%)',
                border: '2px solid rgba(232, 163, 61, 0.4)',
                boxShadow: '0 0 10px rgba(0,0,0,0.8), inset 0 0 8px rgba(232, 163, 61, 0.2)'
              }}
            >
              <div className="absolute inset-2 rounded-full border border-[rgba(232,163,61,0.25)] flex items-center justify-center text-[7px] text-[#E8A33D] font-bold tracking-widest uppercase">
                O·F
              </div>
            </div>

            {/* Cylinder Glass Faces */}
            {renderCylinderFaces(standardFaceCount, 68, 22.5, 230)}

            {/* Bottom Base Cap */}
            <div
              className="absolute left-1/2 bottom-0 rounded-full"
              style={{
                width: '136px',
                height: '136px',
                marginLeft: '-68px',
                transform: 'rotateX(90deg) translateZ(-230px)',
                background: 'radial-gradient(circle, #1B140F 0%, #0C0805 100%)',
                boxShadow: '0 0 16px rgba(0,0,0,0.9)'
              }}
            />
          </div>
        )}

        {/* Soft Blurred Ellipse Shadow Beneath Jar */}
        {!isFlatImage && (
          <div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 w-48 h-10 rounded-[50%] bg-black/65 blur-md pointer-events-none transition-transform"
            style={{
              transform: `translateX(-50%) scale(${1 + Math.abs(tiltX) * 0.008})`
            }}
          />
        )}

        {/* Expand-to-Fullscreen Lightbox Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsLightboxOpen(true);
          }}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-[#1C130D]/85 border border-[#EDE1CC]/25 text-[#EDE1CC] hover:text-[#E8A33D] hover:border-[#E8A33D] hover:scale-105 transition-all flex items-center justify-center cursor-pointer shadow-lg backdrop-blur-xs focus:outline-none"
          title="Expand 3D Viewer"
          aria-label="Expand 3D product viewer"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* 3D Interactive Badge */}
        <div className="absolute top-4 left-4 z-20 px-2.5 py-1 bg-[#1C130D]/85 border border-[#E8A33D]/40 rounded-full text-[10px] font-bold uppercase tracking-widest text-[#E8A33D] flex items-center gap-1.5 shadow-sm backdrop-blur-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E8A33D] animate-ping" />
          <span>3D Interactive</span>
        </div>
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* HINT LABEL WITH ANIMATED DOUBLE ARROW ICON                               */}
      {/* ------------------------------------------------------------------------ */}
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#2A1F16]/65 tracking-wider uppercase">
        <MoveHorizontal className="w-4 h-4 text-[#B0472B] animate-arrow-hint" />
        <span>Drag to rotate · Click expand icon for zoom</span>
      </div>

      {/* ------------------------------------------------------------------------ */}
      {/* EXPAND-TO-FULLSCREEN LIGHTBOX MODAL                                       */}
      {/* ------------------------------------------------------------------------ */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          style={{ backgroundColor: 'rgba(18, 13, 8, 0.94)' }}
          onWheel={handleWheel}
        >
          {/* Lightbox Controls */}
          <div className="absolute top-6 right-6 z-50 flex items-center gap-3">
            <span className="text-xs uppercase tracking-widest text-[#EDE1CC]/60 hidden sm:inline">
              Scroll wheel to zoom ({Math.round(lightboxScale * 100)}%)
            </span>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="px-4 py-2 bg-[#241A10] hover:bg-[#342416] border border-[#E8A33D]/40 text-[#FFF6E8] rounded-lg text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer shadow-xl"
            >
              <X className="w-4 h-4 text-[#E8A33D]" />
              <span>Close</span>
            </button>
          </div>

          <div className="absolute top-6 left-6 z-50 text-left">
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#E8A33D]">
              3D High-Fidelity Inspection
            </span>
            <h3 className="font-display text-lg sm:text-xl text-[#EDE1CC] font-bold">
              {product.name}
            </h3>
          </div>

          {/* Lightbox 3D Stage (Higher Fidelity 32 faces, larger radius) */}
          <div
            className={`relative w-full max-w-2xl aspect-square flex items-center justify-center select-none touch-none ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ perspective: '1300px' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            {/* Ambient Lighting in Lightbox */}
            <div 
              className="absolute inset-0 pointer-events-none opacity-60"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${theme.accent}40 0%, transparent 65%)`
              }}
            />

            <div
              className="relative preserve-3d transition-transform duration-75"
              style={{
                transform: `scale(${lightboxScale}) rotateX(${tiltX}deg) rotateY(${rotationY}deg)`,
                width: '240px',
                height: '320px'
              }}
            >
              {/* High-Fi Top Lid */}
              <div
                className="absolute left-1/2 -top-5 rounded-full preserve-3d"
                style={{
                  width: '184px',
                  height: '184px',
                  marginLeft: '-92px',
                  transform: 'rotateX(90deg) translateZ(0px)',
                  background: 'radial-gradient(circle, #3A2A1E 0%, #241A10 70%, #150F0A 100%)',
                  border: '2px solid rgba(232, 163, 61, 0.45)',
                  boxShadow: '0 0 18px rgba(0,0,0,0.9), inset 0 0 10px rgba(232, 163, 61, 0.25)'
                }}
              >
                <div className="absolute inset-3 rounded-full border border-[rgba(232,163,61,0.3)] flex items-center justify-center text-[9px] text-[#E8A33D] font-bold tracking-[0.2em] uppercase">
                  ORGANIC FLAVOURING
                </div>
              </div>

              {/* High-Fi Cylinder 32 Faces */}
              {renderCylinderFaces(lightboxFaceCount, 91, 18.5, 310)}

              {/* High-Fi Bottom Base */}
              <div
                className="absolute left-1/2 bottom-0 rounded-full"
                style={{
                  width: '182px',
                  height: '182px',
                  marginLeft: '-91px',
                  transform: 'rotateX(90deg) translateZ(-310px)',
                  background: 'radial-gradient(circle, #1B140F 0%, #0C0805 100%)',
                  boxShadow: '0 0 20px rgba(0,0,0,0.95)'
                }}
              />
            </div>

            {/* High-Fi Shadow */}
            <div
              className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 h-12 rounded-[50%] bg-black/75 blur-xl pointer-events-none"
              style={{
                transform: `translateX(-50%) scale(${lightboxScale * (1 + Math.abs(tiltX) * 0.008)})`
              }}
            />
          </div>

          <div className="absolute bottom-6 inset-x-0 text-center pointer-events-none">
            <span className="text-xs uppercase tracking-widest text-[#EDE1CC]/70 bg-[#1C130D]/80 px-4 py-2 rounded-full border border-[#EDE1CC]/20">
              Drag to turn · Scroll to zoom
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
