import React, { useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ParticleData {
  id: number;
  variety: 'chilli' | 'turmeric' | 'peppercorn' | 'leaf';
  size: number;
  color: string;
  borderRadius: string;
  // Impact Physics Vectors
  impactX: number; // % of width (center-left impact: ~25%)
  impactY: number; // % of height (~40%)
  targetX: number; // resting % of width (0% to 100%)
  targetY: number; // resting % of height (10% to 90%)
  rotation: number;
  delay: number;
}

export default function MasalaSmashEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const particleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });

  // 180 Particles spanning 4 spice varieties across full viewport
  const particles: ParticleData[] = useMemo(() => {
    const items: ParticleData[] = [];
    const count = 180;

    const chilliColors = ['#D9683F', '#B0472B', '#7E2F1C'];
    const turmericColors = ['#F0C36B', '#D89A2E'];
    const pepperColors = ['#241A10', '#1B140F'];
    const leafColors = ['#93B26C', '#6E8A4E'];

    for (let i = 0; i < count; i++) {
      // Varieties: 45% Chilli, 30% Turmeric, 15% Peppercorn, 10% Leaf
      const rand = Math.random();
      let variety: ParticleData['variety'] = 'chilli';
      let color = chilliColors[0];
      let size = 6 + Math.random() * 8;
      let borderRadius = '2px 4px 1px 3px';

      if (rand < 0.45) {
        variety = 'chilli';
        color = chilliColors[Math.floor(Math.random() * chilliColors.length)];
        size = 6 + Math.random() * 8;
        borderRadius = '2px 4px 1px 3px';
      } else if (rand < 0.75) {
        variety = 'turmeric';
        color = turmericColors[Math.floor(Math.random() * turmericColors.length)];
        size = 3 + Math.random() * 4; // Smaller specks
        borderRadius = '50%';
      } else if (rand < 0.90) {
        variety = 'peppercorn';
        color = pepperColors[Math.floor(Math.random() * pepperColors.length)];
        size = 4 + Math.random() * 5;
        borderRadius = '40% 60% 50% 50%';
      } else {
        variety = 'leaf';
        color = leafColors[Math.floor(Math.random() * leafColors.length)];
        size = 5 + Math.random() * 7;
        borderRadius = '1px 6px 2px 5px';
      }

      // Target resting positions across the full viewport (sparse in upper 2/3, denser at bottom)
      const isUpper = Math.random() > 0.55;
      const targetY = isUpper ? 10 + Math.random() * 50 : 60 + Math.random() * 32;
      const targetX = 3 + Math.random() * 94;

      items.push({
        id: i,
        variety,
        size,
        color,
        borderRadius,
        impactX: 28, // Center-left impact point
        impactY: 38,
        targetX,
        targetY,
        rotation: -90 + Math.random() * 180,
        delay: 0.05 + Math.random() * 0.35
      });
    }
    return items;
  }, []);

  // GSAP Physics Explosion + Settle + Cursor Repulsion Loop
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const validRefs = particleRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validRefs.length === 0) return;

    const ctx = gsap.context(() => {
      // 1. Impact Flash (0.0s - 0.15s)
      if (flashRef.current) {
        gsap.fromTo(
          flashRef.current,
          { scale: 0.2, opacity: 0.95 },
          { scale: 2.4, opacity: 0, duration: 0.25, ease: 'power2.out' }
        );
      }

      // 2. Physics Explosion Burst & Arc Settle (0.1s - 1.2s)
      validRefs.forEach((el, idx) => {
        const p = particles[idx];
        if (!p) return;

        // Calculate initial launch offset relative to center-left impact point
        const deltaX = (p.targetX - p.impactX) * 8;
        const deltaY = (p.targetY - p.impactY) * 7;

        gsap.fromTo(
          el,
          {
            x: -deltaX * 0.4,
            y: -deltaY * 0.4 - 60, // Initial upward burst vector
            scale: 0.3,
            opacity: 0,
            rotation: p.rotation * 2
          },
          {
            x: 0,
            y: 0,
            scale: 1,
            opacity: 1,
            rotation: p.rotation,
            duration: 0.85 + Math.random() * 0.35,
            delay: p.delay,
            ease: 'back.out(1.1)' // Physical arc deceleration & landing bounce
          }
        );
      });

      // 3. Cursor Repulsion Field Loop via rAF
      let animationFrameId: number;
      const handleMouseMove = (e: MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        mousePos.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      };

      const updateCursorRepulsion = () => {
        const { x: mx, y: my } = mousePos.current;

        validRefs.forEach(el => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          if (!containerRef.current) return;
          const cRect = containerRef.current.getBoundingClientRect();
          
          const px = rect.left + rect.width / 2 - cRect.left;
          const py = rect.top + rect.height / 2 - cRect.top;

          const dx = px - mx;
          const dy = py - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const radius = 120; // 120px repulsion field

          if (dist < radius && dist > 0) {
            const force = (1 - dist / radius) * 16;
            const pushX = (dx / dist) * force;
            const pushY = (dy / dist) * force;

            gsap.to(el, {
              x: pushX,
              y: pushY,
              duration: 0.3,
              overwrite: 'auto'
            });
          } else {
            gsap.to(el, {
              x: 0,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
              overwrite: 'auto'
            });
          }
        });

        animationFrameId = requestAnimationFrame(updateCursorRepulsion);
      };

      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      animationFrameId = requestAnimationFrame(updateCursorRepulsion);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        cancelAnimationFrame(animationFrameId);
      };
    }, containerRef);

    return () => ctx.revert();
  }, [particles]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-10 overflow-hidden gpu-accelerate"
      style={{ contain: 'layout style paint' }}
    >
      {/* Central Impact Flash Burst Glow (Center-Left) */}
      <div
        ref={flashRef}
        className="absolute w-[220px] h-[220px] rounded-full pointer-events-none opacity-0 z-20"
        style={{
          left: '28%',
          top: '38%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(240, 195, 107, 0.85) 0%, rgba(217, 104, 63, 0.5) 45%, transparent 75%)'
        }}
      />

      {/* Slow Light Sweep Across Scene */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-20 bg-gradient-to-r from-transparent via-[#F0C36B]/20 to-transparent animate-pulse"
        style={{ animationDuration: '10s' }}
      />

      {/* 180 Full-Viewport Physics Particles */}
      {particles.map((p, idx) => (
        <div
          key={p.id}
          ref={el => { particleRefs.current[idx] = el; }}
          style={{
            position: 'absolute',
            left: `${p.targetX}%`,
            top: `${p.targetY}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            borderRadius: p.borderRadius,
            boxShadow: '0 2px 4px rgba(42, 31, 22, 0.22)',
            willChange: 'transform, opacity'
          }}
        />
      ))}
    </div>
  );
}
