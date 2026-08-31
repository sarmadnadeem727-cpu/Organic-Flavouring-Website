import React, { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Particle {
  id: number;
  leftPercent: number;
  bottomPercent: number;
  width: number;
  height: number;
  borderRadius: string;
  gradientBackground: string;
}

export default function ChilliPile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pileWrapperRef = useRef<HTMLDivElement>(null);
  const flakeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 🚀 Optimized: 45 high-impact particle flakes (down from 135) to eliminate layout/paint thrashing
  const particles: Particle[] = useMemo(() => {
    const clayGradients = [
      'radial-gradient(circle at 30% 30%, #D9683F 0%, #B0472B 70%, #7E2F1C 100%)',
      'radial-gradient(circle at 35% 25%, #C25032 0%, #7E2F1C 80%, #4A1C10 100%)',
      'radial-gradient(circle at 25% 35%, #E2744B 0%, #B0472B 65%, #7E2F1C 100%)'
    ];

    const items: Particle[] = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      const rawY = Math.pow(Math.random(), 1.5);
      const bottomPercent = Math.min(32, rawY * 33);
      const leftPercent = 3 + Math.random() * 94;

      const isRectangle = Math.random() > 0.35;
      const width = isRectangle ? 7 + Math.random() * 10 : 5 + Math.random() * 8;
      const height = isRectangle ? 5 + Math.random() * 12 : width;
      const borderRadius = isRectangle ? '2px 4px 1px 3px' : '50%';
      const gradientBackground = clayGradients[i % clayGradients.length];

      items.push({
        id: i,
        leftPercent,
        bottomPercent,
        width,
        height,
        borderRadius,
        gradientBackground
      });
    }
    return items;
  }, []);

  // GSAP Pour & Settle Sequence + rAF Throttled Mouse Parallax
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const validFlakes = flakeRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validFlakes.length === 0) return;

    const ctx = gsap.context(() => {
      // Pouring GSAP Timeline
      gsap.fromTo(
        validFlakes,
        {
          y: -100,
          rotation: () => gsap.utils.random(-60, 60),
          opacity: 0
        },
        {
          y: 0,
          rotation: () => gsap.utils.random(-15, 15),
          opacity: 1,
          duration: 0.65,
          ease: 'back.out(1.2)',
          stagger: {
            each: 0.015,
            from: 'random'
          }
        }
      );

      // 🚀 Throttled mouse parallax using GSAP quickTo and rAF
      if (pileWrapperRef.current) {
        const xTo = gsap.quickTo(pileWrapperRef.current, 'x', { duration: 0.4, ease: 'power2.out' });
        const yTo = gsap.quickTo(pileWrapperRef.current, 'y', { duration: 0.4, ease: 'power2.out' });

        let ticking = false;
        const handleMouseMove = (e: MouseEvent) => {
          if (!ticking) {
            requestAnimationFrame(() => {
              const mouseX = (e.clientX / window.innerWidth - 0.5) * -16;
              const mouseY = (e.clientY / window.innerHeight - 0.5) * -6;
              xTo(mouseX);
              yTo(mouseY);
              ticking = false;
            });
            ticking = true;
          }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-x-0 bottom-0 h-[34vh] pointer-events-none z-10 overflow-hidden gpu-accelerate"
      style={{ contain: 'layout style paint' }}
    >
      {/* Soft Warm Clay Shadow Beneath Pile */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] rounded-full pile-ground-shadow pointer-events-none" />

      {/* 🚀 Hardware-Accelerated Parallax Container for 45 Particle Flakes */}
      <div 
        ref={pileWrapperRef} 
        className="w-full h-full relative gpu-accelerate"
      >
        {particles.map((p, idx) => (
          <div
            key={p.id}
            ref={el => { flakeRefs.current[idx] = el; }}
            style={{
              position: 'absolute',
              left: `${p.leftPercent}%`,
              bottom: `${p.bottomPercent}%`,
              width: `${p.width}px`,
              height: `${p.height}px`,
              background: p.gradientBackground,
              borderRadius: p.borderRadius,
              /* Single Lightweight GPU Shadow */
              boxShadow: '0 2px 4px rgba(42, 31, 22, 0.22)'
            }}
          />
        ))}
      </div>
    </div>
  );
}
