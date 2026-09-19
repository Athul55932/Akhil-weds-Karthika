import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Eye, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScratchCard = ({ children, onReveal }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const isScratchingRef = useRef(false);
  const lastPosRef = useRef(null);
  const checkTimerRef = useRef(null);

  // Paint the golden foil surface
  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const width = rect.width;
    const height = rect.height;

    // Set canvas dimensions with device pixel ratio for super-crisp rendering
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';

    // 1. Rich metallic gold gradient
    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B8860B'); // Dark goldenrod
    grad.addColorStop(0.2, '#DAA520'); // Goldenrod
    grad.addColorStop(0.45, '#FEE180'); // Bright gold highlight
    grad.addColorStop(0.55, '#F5DEB3'); // Champagne shimmer
    grad.addColorStop(0.75, '#D4AF37'); // Classic gold
    grad.addColorStop(1, '#996515'); // Deep bronze gold

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. Fine diagonal golden shimmer texture
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
    ctx.lineWidth = 1.5;
    const step = 14;
    for (let x = -height; x < width + height; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + height, height);
      ctx.stroke();
    }
    ctx.restore();

    // 3. Stardust sparkles over foil
    ctx.save();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    const sparkleSeed = [
      { x: 0.15, y: 0.2, r: 2 },
      { x: 0.85, y: 0.15, r: 2.5 },
      { x: 0.12, y: 0.75, r: 2 },
      { x: 0.88, y: 0.8, r: 2.2 },
      { x: 0.25, y: 0.5, r: 1.5 },
      { x: 0.78, y: 0.45, r: 1.8 },
      { x: 0.5, y: 0.12, r: 2 },
      { x: 0.5, y: 0.9, r: 2 },
    ];
    sparkleSeed.forEach((s) => {
      ctx.beginPath();
      ctx.arc(width * s.x, height * s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();

    // 4. Double ornamental gold/maroon border frame
    ctx.save();
    // Outer border
    ctx.strokeStyle = 'rgba(122, 28, 40, 0.35)'; // maroon tint
    ctx.lineWidth = 2;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    // Inner dotted border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.lineWidth = 1.2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(16, 16, width - 32, height - 32);
    ctx.setLineDash([]);

    // Corner flourishes
    const corner = 18;
    ctx.strokeStyle = '#7A1C28';
    ctx.lineWidth = 3;

    // Top-left
    ctx.beginPath();
    ctx.moveTo(8, 8 + corner);
    ctx.lineTo(8, 8);
    ctx.lineTo(8 + corner, 8);
    ctx.stroke();

    // Top-right
    ctx.beginPath();
    ctx.moveTo(width - 8 - corner, 8);
    ctx.lineTo(width - 8, 8);
    ctx.lineTo(width - 8, 8 + corner);
    ctx.stroke();

    // Bottom-left
    ctx.beginPath();
    ctx.moveTo(8, height - 8 - corner);
    ctx.lineTo(8, height - 8);
    ctx.lineTo(8 + corner, height - 8);
    ctx.stroke();

    // Bottom-right
    ctx.beginPath();
    ctx.moveTo(width - 8 - corner, height - 8);
    ctx.lineTo(width - 8, height - 8);
    ctx.lineTo(width - 8, height - 8 - corner);
    ctx.stroke();
    ctx.restore();

    // 5. Central Badge & Invitation Typography
    const cx = width / 2;
    const cy = height / 2;
    const emblemRadius = Math.min(width, height) * 0.15;

    // Golden Coin Emblem
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy - 36, emblemRadius, 0, Math.PI * 2);
    const coinGrad = ctx.createRadialGradient(cx - 5, cy - 41, 2, cx, cy - 36, emblemRadius);
    coinGrad.addColorStop(0, '#FFF6D6');
    coinGrad.addColorStop(0.7, '#D4AF37');
    coinGrad.addColorStop(1, '#996515');
    ctx.fillStyle = coinGrad;
    ctx.fill();
    ctx.strokeStyle = '#7A1C28';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Sparkle Icon inside coin
    ctx.fillStyle = '#7A1C28';
    ctx.font = `${Math.max(22, Math.round(emblemRadius * 0.95))}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✨', cx, cy - 35);
    ctx.restore();

    // Text labels
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Stamped uppercase title
    ctx.fillStyle = '#54121A';
    ctx.font = 'bold 15px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', cx, cy + emblemRadius - 16);

    // Auspicious Muhurtham & Feast script subtitle
    ctx.font = '600 24px "Caveat", "Sacramento", cursive';
    ctx.fillStyle = '#7A1C28';
    ctx.fillText('Auspicious Muhurtham & Feast', cx, cy + emblemRadius + 14);

    // Call to action pill text
    ctx.font = '500 13px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = '#3E1218';
    ctx.fillText('Swipe or drag with finger / mouse', cx, cy + emblemRadius + 42);

    ctx.restore();
  }, []);

  // Initialize and observe resize
  useEffect(() => {
    if (!isRevealed) {
      initFoil();
    }

    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      if (!isRevealed) {
        initFoil();
      }
    });
    observer.observe(container);

    return () => observer.disconnect();
  }, [initFoil, isRevealed]);

  // Trigger celebration and reveal
  const triggerReveal = useCallback(() => {
    setIsRevealed(true);
    setScratchProgress(100);

    // Trigger celebratory gold and maroon confetti
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#7A1C28', '#F3E5AB', '#7D8B75', '#FAF7F2'],
      });
      // Second burst
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.65 },
          colors: ['#FEE180', '#D4AF37', '#8B2635'],
        });
      }, 250);
    } catch (e) {
      // ignore
    }

    if (onReveal) onReveal();
  }, [onReveal]);

  // Check how much of the foil has been removed
  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Fast sampling grid (every 20px)
    const step = 20;
    try {
      const imgData = ctx.getImageData(0, 0, width, height);
      const data = imgData.data;
      let transparentCount = 0;
      let totalCount = 0;

      for (let y = 0; y < height; y += step) {
        for (let x = 0; x < width; x += step) {
          const index = (y * width + x) * 4;
          if (data[index + 3] < 120) {
            transparentCount++;
          }
          totalCount++;
        }
      }

      const percent = Math.min(100, Math.round((transparentCount / totalCount) * 100));
      setScratchProgress(percent);

      // Once 42% is scratched, automatically reveal the full details!
      if (percent >= 42) {
        triggerReveal();
      }
    } catch (e) {
      // getImageData security fallback if canvas is tainted
    }
  }, [isRevealed, triggerReveal]);

  // Scratch action
  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;

    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';

    const radius = 32 * dpr; // generous scratch width

    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = radius * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    lastPosRef.current = { x, y };

    // Throttle progress check
    if (!checkTimerRef.current) {
      checkTimerRef.current = setTimeout(() => {
        checkProgress();
        checkTimerRef.current = null;
      }, 100);
    }
  };

  // Pointer Handlers
  const handlePointerDown = (e) => {
    if (isRevealed) return;
    isScratchingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {
      // fallback
    }
    scratch(e.clientX, e.clientY);
  };

  const handlePointerMove = (e) => {
    if (!isScratchingRef.current || isRevealed) return;
    scratch(e.clientX, e.clientY);
  };

  const handlePointerUp = (e) => {
    if (isRevealed) return;
    isScratchingRef.current = false;
    lastPosRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture && e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (err) {}
    checkProgress();
  };

  const handleReset = () => {
    setIsRevealed(false);
    setScratchProgress(0);
    lastPosRef.current = null;
    setTimeout(() => {
      initFoil();
    }, 50);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Interactive Status & Quick Action Bar */}
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-blush/50">
        <div className="flex items-center gap-2 flex-wrap">
          <Sparkles className="w-5 h-5 text-gold animate-pulse" />
          <span className="font-script text-2xl sm:text-3xl text-maroon font-medium">
            Muhurtham &amp; Feast
          </span>
          {isRevealed && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sage-soft text-sage-dark border border-sage/40">
              Revealed ✨
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-charcoal-light font-medium bg-ivory px-3 py-1 rounded-full border border-blush/60">
            Kerala, India
          </span>
          {!isRevealed ? (
            <button
              onClick={triggerReveal}
              type="button"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/15 hover:bg-gold/25 text-maroon text-xs font-semibold tracking-wider uppercase border border-gold/50 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
              title="Reveal details instantly"
            >
              <Eye className="w-3.5 h-3.5 text-gold-accent" />
              <span>Reveal All</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory hover:bg-blush/30 text-maroon text-xs font-medium uppercase tracking-wider border border-blush/80 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
              title="Scratch again"
            >
              <RotateCcw className="w-3 h-3 text-maroon" />
              <span>Scratch Again</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Relative Scratch Area */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden select-none touch-none shadow-xs border border-blush/60 bg-ivory-light"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Underlying Revealed Content */}
        <div className="w-full p-4 sm:p-6 transition-all duration-500">
          {isRevealed && (
            <motion.div
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mb-5 p-2.5 sm:p-3 rounded-xl bg-gradient-to-r from-gold/10 via-gold/25 to-gold/10 border border-gold/40 text-center flex items-center justify-center gap-2 shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-gold-accent" />
              <span className="font-serif text-xs sm:text-sm text-maroon font-medium tracking-wide">
                Auspicious Muhurtham Unveiled · You are Cordially Invited!
              </span>
              <Sparkles className="w-4 h-4 text-gold-accent" />
            </motion.div>
          )}
          {children}
        </div>

        {/* Golden Foil Scratch Canvas Overlay */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
            >
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full block rounded-2xl"
                role="img"
                aria-label="Scratch card overlay: swipe or drag across the card to reveal wedding date and timings"
              />

              {/* Floating Quick Scratch Hint Pill */}
              <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-ivory-light/90 border border-maroon/25 text-maroon text-[11px] font-medium tracking-wide shadow-sm backdrop-blur-xs animate-bounce">
                  <Wand2 className="w-3 h-3 text-gold" />
                  <span>
                    {scratchProgress > 0
                      ? `${scratchProgress}% scratched · keep rubbing!`
                      : 'Rub with finger or mouse'}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
