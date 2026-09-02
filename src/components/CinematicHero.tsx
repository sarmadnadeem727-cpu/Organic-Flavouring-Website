import React, { useEffect, useRef, useState, useCallback } from 'react';
import { brandLogo } from '../data/products';
import { RotateCcw } from 'lucide-react';

interface CinematicHeroProps {
  onOpenCertModal?: () => void;
  onOpenContactModal?: () => void;
}

export default function CinematicHero({ onOpenCertModal }: CinematicHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [impactHappened, setImpactHappened] = useState(false);
  const [keyReset, setKeyReset] = useState(0);

  const reduceMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const handleReplay = useCallback(() => {
    setImpactHappened(false);
    setKeyReset((k) => k + 1);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setImpactHappened(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let W = 0;
    let H = 0;
    let DPR = 1;

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = W * DPR;
      canvas.height = H * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // ---- Pod (Whole Chilli Pod) ----
    class Pod {
      x: number;
      y: number;
      vy: number;
      rot: number;
      scale: number;
      landed: boolean;

      constructor() {
        this.x = W * 0.5;
        this.y = -140;
        this.vy = 0;
        this.rot = -18;
        this.scale = 1.1;
        this.landed = false;
      }

      update() {
        if (!this.landed) {
          this.vy += 0.95;
          this.y += this.vy;
          this.rot += 6.5;
          // Trigger impact at ~38% of viewport height (just above title/center)
          if (this.y >= H * 0.38) {
            this.landed = true;
            this.y = H * 0.38;
            return true;
          }
        }
        return false;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rot * Math.PI) / 180);
        ctx.scale(this.scale, this.scale);

        // Chilli pod gradient
        const grad = ctx.createLinearGradient(-14, -60, 14, 60);
        grad.addColorStop(0, '#E8663D');
        grad.addColorStop(0.5, '#B0472B');
        grad.addColorStop(1, '#7E2F1C');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(0, -62);
        ctx.bezierCurveTo(16, -40, 14, 30, 4, 58);
        ctx.bezierCurveTo(0, 66, -4, 60, -6, 50);
        ctx.bezierCurveTo(-16, 20, -14, -42, 0, -62);
        ctx.closePath();
        ctx.fill();

        // Stem
        ctx.fillStyle = '#5C7A3E';
        ctx.fillRect(-6, -72, 12, 16);
        ctx.restore();
      }
    }

    // ---- Particle (Flakes, Dust, Embers) ----
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      type: 'dust' | 'flake' | 'ember';
      size: number;
      life: number;
      maxLife: number;
      rot: number;
      vrot: number;
      color: string;
      gravity: number;
      drag: number;

      constructor(x: number, y: number, type: 'dust' | 'flake' | 'ember') {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = type === 'dust' ? 2.5 + Math.random() * 8 : 4.5 + Math.random() * 14;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed - (type === 'ember' ? 2.2 : 0);
        this.type = type;
        this.size = type === 'dust' ? 1.5 + Math.random() * 3.5 : type === 'flake' ? 3.5 + Math.random() * 7.5 : 1.2 + Math.random() * 2.5;
        this.life = 0;
        this.maxLife = type === 'dust' ? 95 + Math.random() * 65 : 60 + Math.random() * 45;
        this.rot = Math.random() * 360;
        this.vrot = (Math.random() - 0.5) * 16;
        this.color =
          type === 'ember'
            ? Math.random() > 0.5
              ? '#F0C36B'
              : '#E8663D'
            : type === 'flake'
            ? Math.random() > 0.5
              ? '#B0472B'
              : '#7E2F1C'
            : '#D89A2E';
        this.gravity = type === 'ember' ? 0.04 : 0.12;
        this.drag = 0.985;
      }

      update() {
        this.vx *= this.drag;
        this.vy *= this.drag;
        this.vy += this.gravity;
        this.x += this.vx;
        this.y += this.vy;
        this.rot += this.vrot;
        this.life++;
        return this.life < this.maxLife;
      }

      draw() {
        if (!ctx) return;
        const p = 1 - this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p);
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rot * Math.PI) / 180);

        if (this.type === 'ember') {
          const g = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size * 3);
          g.addColorStop(0, this.color);
          g.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (this.type === 'flake') {
          ctx.fillStyle = this.color;
          ctx.fillRect(-this.size / 2, -this.size * 0.35, this.size, this.size * 0.7);
        } else {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // ---- DustCloud ----
    class DustCloud {
      x: number;
      y: number;
      r: number;
      maxR: number;
      life: number;
      maxLife: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.r = 4;
        this.maxR = 280 + Math.random() * 90;
        this.life = 0;
        this.maxLife = 115;
      }

      update() {
        this.life++;
        this.r = 4 + (this.maxR - 4) * (1 - Math.pow(1 - this.life / this.maxLife, 3));
        return this.life < this.maxLife;
      }

      draw() {
        if (!ctx) return;
        const p = 1 - this.life / this.maxLife;
        ctx.save();
        ctx.globalAlpha = p * 0.38;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        g.addColorStop(0, 'rgba(232,102,61,0.55)');
        g.addColorStop(0.5, 'rgba(176,71,43,0.28)');
        g.addColorStop(1, 'rgba(176,71,43,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    let pod = new Pod();
    let particles: Particle[] = [];
    let clouds: DustCloud[] = [];
    let screenShake = 0;
    let impactTriggered = false;
    let frame = 0;

    const triggerImpact = () => {
      const cx = pod.x;
      const cy = pod.y;
      for (let i = 0; i < 80; i++) particles.push(new Particle(cx, cy, 'flake'));
      for (let i = 0; i < 110; i++) particles.push(new Particle(cx, cy, 'dust'));
      for (let i = 0; i < 35; i++) particles.push(new Particle(cx, cy, 'ember'));
      clouds.push(new DustCloud(cx, cy));
      clouds.push(new DustCloud(cx - 35, cy + 12));
      clouds.push(new DustCloud(cx + 35, cy - 8));
      screenShake = 22;
      setImpactHappened(true);
    };

    const loop = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      if (screenShake > 0) {
        const sx = (Math.random() - 0.5) * screenShake;
        const sy = (Math.random() - 0.5) * screenShake;
        ctx.translate(sx, sy);
        screenShake *= 0.88;
        if (screenShake < 0.3) screenShake = 0;
      }

      // Ambient background embers after impact (very sparse, continuous)
      if (impactTriggered && frame % 8 === 0 && particles.length < 50) {
        particles.push(
          new Particle(
            W * 0.5 + (Math.random() - 0.5) * 350,
            H * 0.38 + (Math.random() - 0.5) * 80,
            Math.random() > 0.5 ? 'dust' : 'ember'
          )
        );
      }

      clouds = clouds.filter((c) => {
        const alive = c.update();
        if (alive) c.draw();
        return alive;
      });

      particles = particles.filter((p) => {
        const alive = p.update();
        if (alive) p.draw();
        return alive;
      });

      if (!impactTriggered) {
        const hit = pod.update();
        pod.draw();
        if (hit) {
          impactTriggered = true;
          triggerImpact();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [keyReset, reduceMotion]);

  return (
    <section 
      key={keyReset}
      className="relative w-full h-[60vh] min-h-[500px] max-h-[800px] bg-[#0E0904] flex items-center justify-center overflow-hidden select-none"
      style={{ contain: 'paint layout' }}
    >
      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 0: Background Video                                                   */}
      {/* -------------------------------------------------------------------------- */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-[#0E0904] pointer-events-none">
        <video
          src="/IMG_0199.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover relative z-10 opacity-40 mix-blend-screen"
          style={{ fetchPriority: 'high' } as any}
        />
        {/* Dark gradient overlay to blend perfectly and not wash out the text */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0E0904]/70 via-transparent to-[#0E0904]/90 z-20 pointer-events-none" />
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 1: Ken Burns Glow + Dark Layered Backdrop                            */}
      {/* -------------------------------------------------------------------------- */}
      <div 
        className="absolute -inset-12 pointer-events-none animate-ken-burns z-0"
        style={{
          background: `
            radial-gradient(ellipse 55% 55% at 78% 22%, rgba(232, 163, 61, 0.22) 0%, rgba(232, 163, 61, 0.05) 50%, transparent 75%),
            radial-gradient(ellipse 60% 60% at 20% 82%, rgba(176, 71, 43, 0.28) 0%, rgba(176, 71, 43, 0.08) 50%, transparent 75%)
          `
        }}
      />

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 2: Physics Canvas (Falling Pod Crack + Particle Shockwave)          */}
      {/* -------------------------------------------------------------------------- */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full block pointer-events-none z-1" 
      />

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 3: Vignette Overlay                                                 */}
      {/* -------------------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 pointer-events-none z-2"
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 52%, transparent 40%, rgba(8,5,2,0.68) 100%)'
        }}
      />

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 4: Film Grain Noise Texture (SVG Turbulence)                         */}
      {/* -------------------------------------------------------------------------- */}
      <div 
        className="absolute inset-0 pointer-events-none z-3 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 5: Letterbox Bars (Pinned Top & Bottom, 9vh each)                    */}
      {/* -------------------------------------------------------------------------- */}
      <div 
        className="absolute top-0 inset-x-0 h-[9vh] min-h-[48px] bg-black z-40 -translate-y-full animate-letterbox-top pointer-events-none shadow-md"
      />
      <div 
        className="absolute bottom-0 inset-x-0 h-[9vh] min-h-[48px] bg-black z-40 translate-y-full animate-letterbox-bottom pointer-events-none shadow-md flex items-center justify-center"
      >
        {/* Scroll cue inside letterbox */}
        <span 
          className="text-[10px] tracking-[0.35em] uppercase text-[#E8A33D]/65 font-bold opacity-0 animate-hero-scroll"
        >
          SCROLL
        </span>
      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* LAYER 6: Centered Hero Copy + Actual Logo Reveal (In Front after Impact)    */}
      {/* -------------------------------------------------------------------------- */}
      <div className="relative z-20 max-w-4xl mx-auto px-6 sm:px-8 text-center flex flex-col items-center justify-center my-auto pointer-events-auto">
        
        {/* ACTUAL LOGO REVEAL: Positioned in front at impact point */}
        <div className={`mb-4 transition-all duration-300 ${impactHappened ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`${impactHappened ? 'animate-logo-reveal' : ''} inline-flex flex-col items-center`}>
            <div className="relative p-1 rounded-full bg-gradient-to-tr from-[#E8663D] via-[#F0C36B] to-[#B0472B] shadow-2xl">
              <img
                src={brandLogo}
                alt="Organic Flavouring Logo"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#181008] shadow-inner"
              />
              <div className="absolute -inset-2 rounded-full border border-[#E8663D]/40 pointer-events-none animate-ping opacity-30" />
            </div>
          </div>
        </div>

        {/* Kicker Line */}
        <div className={`transition-all duration-500 ${impactHappened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`} style={{ transitionDelay: '0.08s' }}>
          <span 
            className="text-[11px] sm:text-xs font-semibold tracking-[0.32em] uppercase text-[#F0C36B] block"
          >
            ORGANIC FLAVOURING · EST. 1994
          </span>
        </div>

        {/* Explosive Fraunces Headline Reveal with Camera Impact */}
        <div className={`mt-2 mb-4 transition-all duration-300 ${impactHappened ? 'opacity-100' : 'opacity-0'}`}>
          <h1 
            className={`font-display text-[clamp(2.6rem,7.2vw,6.4rem)] leading-[0.98] tracking-[-0.015em] text-[#FBF3E7] text-center ${impactHappened ? 'animate-title-impact' : ''}`}
            style={{ fontWeight: 600 }}
          >
            Unleash <em className="italic text-[#E8663D] font-normal font-serif">the heat</em><br />
            of real chilli.
          </h1>
        </div>

        {/* Subtitle description */}
        <p 
          className={`text-sm sm:text-base text-[#FBF3E7]/75 max-w-lg mx-auto leading-relaxed mb-6 sm:mb-8 transition-all duration-500 ${
            impactHappened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: '0.45s' }}
        >
          Whole pods, hand-cracked and milled fresh — not sitting in a warehouse for months. 100% pure botanical flavor with zero additives.
        </p>

        {/* CTA Actions */}
        <div 
          className={`flex flex-col sm:flex-row items-center gap-4 transition-all duration-500 ${
            impactHappened ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{ transitionDelay: '0.65s' }}
        >
          <a
            href="#crate-section"
            className="px-8 py-3.5 bg-gradient-to-r from-[#E8663D] via-[#B0472B] to-[#7E2F1C] hover:from-[#B0472B] hover:to-[#4A1C10] text-white text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] rounded-md transition-all shadow-xl hover:-translate-y-0.5 cursor-pointer"
            style={{ boxShadow: '0 16px 34px -14px rgba(176, 71, 43, 0.65)' }}
          >
            Shop the Harvest
          </a>

          {onOpenCertModal && (
            <button 
              onClick={onOpenCertModal}
              className="text-[12px] uppercase tracking-[0.18em] text-[#FBF3E7]/75 hover:text-[#F0C36B] transition-colors py-2 px-3 cursor-pointer border-b border-[#FBF3E7]/30 hover:border-[#F0C36B]"
            >
              Watch it happen ↻
            </button>
          )}
        </div>

      </div>

      {/* -------------------------------------------------------------------------- */}
      {/* REPLAY BUTTON                                                              */}
      {/* -------------------------------------------------------------------------- */}
      <button
        onClick={handleReplay}
        className="absolute bottom-6 right-6 sm:bottom-8 sm:right-10 z-50 text-[11px] tracking-[0.14em] uppercase text-[#FBF3E7]/40 hover:text-[#FBF3E7]/90 flex items-center gap-2 transition-colors cursor-pointer focus:outline-none"
        title="Replay chilli impact animation"
      >
        <RotateCcw className="w-3.5 h-3.5 text-[#E8663D]" />
        <span>Replay</span>
      </button>

    </section>
  );
}
