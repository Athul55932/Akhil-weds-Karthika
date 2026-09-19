import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RotateCcw, Eye, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ScratchCard = ({ children, onReveal }) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchProgress, setScratchProgress] = useState(0);
  const isScratchingRef = useRef(false);
  const lastPosRef = useRef(null);
  const checkTimerRef = useRef(null);
  const initDoneRef = useRef(false);

  const initFoil = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = rect.width;
    const h = rect.height;

    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext('2d');
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, w, h);

    // ── 1. Deep maroon-to-gold diagonal gradient ──
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#5C0F1A');
    grad.addColorStop(0.18, '#7A1C28');
    grad.addColorStop(0.38, '#C59B27');
    grad.addColorStop(0.52, '#FEE180');
    grad.addColorStop(0.68, '#D4AF37');
    grad.addColorStop(0.85, '#7A1C28');
    grad.addColorStop(1, '#54121A');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // ── 2. Diagonal shimmer lines ──
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,0.12)';
    ctx.lineWidth = 1;
    for (let x = -h; x < w + h; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x + h, h);
      ctx.stroke();
    }
    ctx.restore();

    // ── 3. Vignette overlay for depth ──
    const vignette = ctx.createRadialGradient(w / 2, h / 2, h * 0.2, w / 2, h / 2, h * 0.85);
    vignette.addColorStop(0, 'rgba(0,0,0,0)');
    vignette.addColorStop(1, 'rgba(0,0,0,0.35)');
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // ── 4. Double ornamental border ──
    ctx.save();
    ctx.strokeStyle = 'rgba(255,220,100,0.55)';
    ctx.lineWidth = 2;
    const m = 10;
    roundRect(ctx, m, m, w - 2 * m, h - 2 * m, 8);
    ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    roundRect(ctx, m + 6, m + 6, w - 2 * (m + 6), h - 2 * (m + 6), 6);
    ctx.stroke();
    ctx.setLineDash([]);

    // Corner brackets
    ctx.strokeStyle = 'rgba(255,220,100,0.7)';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([]);
    const cb = 16;
    [[m + 1, m + 1, 1, 1], [w - m - 1, m + 1, -1, 1], [m + 1, h - m - 1, 1, -1], [w - m - 1, h - m - 1, -1, -1]].forEach(([cx2, cy2, sx, sy]) => {
      ctx.beginPath();
      ctx.moveTo(cx2 + sx * cb, cy2);
      ctx.lineTo(cx2, cy2);
      ctx.lineTo(cx2, cy2 + sy * cb);
      ctx.stroke();
    });
    ctx.restore();

    // ── 5. Centre badge ──
    const cx = w / 2;
    const cy = h / 2;
    const badgeR = Math.min(w, h) * 0.14;

    // Badge glow
    const glow = ctx.createRadialGradient(cx, cy - badgeR * 0.3, 0, cx, cy, badgeR * 2.2);
    glow.addColorStop(0, 'rgba(255,220,60,0.18)');
    glow.addColorStop(1, 'rgba(255,220,60,0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(cx, cy, badgeR * 2.2, 0, Math.PI * 2);
    ctx.fill();

    // Badge circle
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy - 22, badgeR, 0, Math.PI * 2);
    const coinGrad = ctx.createRadialGradient(cx - 5, cy - 30, 2, cx, cy - 22, badgeR);
    coinGrad.addColorStop(0, '#FFF8D6');
    coinGrad.addColorStop(0.5, '#D4AF37');
    coinGrad.addColorStop(1, '#7A5200');
    ctx.fillStyle = coinGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.4)';
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.restore();

    // Badge border
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy - 22, badgeR, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();

    // Sparkle text in badge
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `${Math.round(badgeR * 0.9)}px serif`;
    ctx.fillStyle = '#7A1C28';
    ctx.shadowColor = 'rgba(0,0,0,0.3)';
    ctx.shadowBlur = 4;
    ctx.fillText('✨', cx, cy - 22);
    ctx.restore();

    // ── 6. Typography ──
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // "SCRATCH TO REVEAL"
    const textY1 = cy + badgeR - 4;
    ctx.font = 'bold 13px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,240,150,0.95)';
    ctx.shadowColor = 'rgba(0,0,0,0.6)';
    ctx.shadowBlur = 6;
    ctx.fillText('✦  SCRATCH TO REVEAL  ✦', cx, textY1);

    // Script title
    const textY2 = textY1 + 28;
    ctx.font = '600 22px "Caveat", cursive';
    ctx.fillStyle = '#FFFDE8';
    ctx.shadowBlur = 8;
    ctx.fillText('Muhurtham & Feast', cx, textY2);

    // Hint
    const textY3 = textY2 + 26;
    ctx.font = '400 12px "Plus Jakarta Sans", system-ui, sans-serif';
    ctx.fillStyle = 'rgba(255,240,200,0.7)';
    ctx.shadowBlur = 3;
    ctx.fillText('Swipe to reveal the auspicious details', cx, textY3);

    ctx.restore();

    initDoneRef.current = true;
  }, []);

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  useEffect(() => {
    if (isRevealed) return;

    // Delay init slightly to ensure container has layout
    const timer = setTimeout(() => {
      initFoil();
    }, 80);

    const container = containerRef.current;
    if (!container) return () => clearTimeout(timer);

    const observer = new ResizeObserver(() => {
      if (!isRevealed) {
        setTimeout(() => initFoil(), 50);
      }
    });
    observer.observe(container);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [initFoil, isRevealed]);

  const triggerReveal = useCallback(() => {
    if (isRevealed) return;
    setIsRevealed(true);
    setScratchProgress(100);
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.55 },
        colors: ['#D4AF37', '#7A1C28', '#FEE180', '#E8D3D3', '#7D8B75'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 40,
          spread: 100,
          origin: { y: 0.6 },
          colors: ['#FEE180', '#D4AF37', '#8B2635'],
        });
      }, 280);
    } catch (_) {}
    if (onReveal) onReveal();
  }, [isRevealed, onReveal]);

  const checkProgress = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    const cw = canvas.width;
    const ch = canvas.height;
    const step = 16;
    try {
      const data = ctx.getImageData(0, 0, cw, ch).data;
      let transparent = 0;
      let total = 0;
      for (let y = 0; y < ch; y += step) {
        for (let x = 0; x < cw; x += step) {
          if (data[(y * cw + x) * 4 + 3] < 128) transparent++;
          total++;
        }
      }
      const pct = Math.min(100, Math.round((transparent / total) * 100));
      setScratchProgress(pct);
      if (pct >= 40) triggerReveal();
    } catch (_) {}
  }, [isRevealed, triggerReveal]);

  const scratch = useCallback((clientX, clientY) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const x = (clientX - rect.left) * dpr;
    const y = (clientY - rect.top) * dpr;
    const ctx = canvas.getContext('2d');
    ctx.globalCompositeOperation = 'destination-out';
    const r = 28 * dpr;

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(x, y);
      ctx.lineWidth = r * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();

    lastPosRef.current = { x, y };

    if (!checkTimerRef.current) {
      checkTimerRef.current = setTimeout(() => {
        checkProgress();
        checkTimerRef.current = null;
      }, 80);
    }
  }, [isRevealed, checkProgress]);

  const handlePointerDown = useCallback((e) => {
    if (isRevealed) return;
    e.preventDefault();
    isScratchingRef.current = true;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    scratch(e.clientX, e.clientY);
  }, [isRevealed, scratch]);

  const handlePointerMove = useCallback((e) => {
    if (!isScratchingRef.current || isRevealed) return;
    e.preventDefault();
    scratch(e.clientX, e.clientY);
  }, [isRevealed, scratch]);

  const handlePointerUp = useCallback((e) => {
    if (!isScratchingRef.current) return;
    isScratchingRef.current = false;
    lastPosRef.current = null;
    try {
      if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch (_) {}
    checkProgress();
  }, [checkProgress]);

  const handleReset = () => {
    setIsRevealed(false);
    setScratchProgress(0);
    lastPosRef.current = null;
    initDoneRef.current = false;
    setTimeout(() => initFoil(), 60);
  };

  return (
    <div className="flex flex-col w-full gap-0">
      {/* ── Header row ── */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-blush/50">
        <div className="flex items-center gap-2.5 flex-wrap">
          <Sparkles className="w-5 h-5 text-gold animate-pulse flex-shrink-0" />
          <span className="font-script text-2xl sm:text-3xl text-maroon font-medium leading-none">
            Muhurtham &amp; Feast
          </span>
          <AnimatePresence>
            {isRevealed && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-sage-soft text-sage-dark border border-sage/40"
              >
                Revealed ✨
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="hidden sm:inline-block text-[11px] uppercase tracking-widest text-charcoal-light font-medium bg-ivory px-3 py-1 rounded-full border border-blush/60">
            Kerala, India
          </span>
          {!isRevealed ? (
            <button
              onClick={triggerReveal}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold/10 hover:bg-gold/20 text-maroon text-[11px] font-semibold tracking-wide uppercase border border-gold/40 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Reveal all details instantly"
            >
              <Eye className="w-3.5 h-3.5 text-gold-accent" />
              <span>Reveal All</span>
            </button>
          ) : (
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ivory hover:bg-blush/30 text-maroon text-[11px] font-medium uppercase tracking-wide border border-blush/70 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
              title="Scratch again"
            >
              <RotateCcw className="w-3 h-3 text-maroon" />
              <span>Scratch Again</span>
            </button>
          )}
        </div>
      </div>

      {/* ── Main Scratch Area ── */}
      <div
        ref={containerRef}
        className="relative w-full rounded-2xl overflow-hidden select-none bg-ivory-light border border-blush/50"
        style={{ minHeight: 280 }}
      >
        {/* Revealed content underneath */}
        <div className="w-full p-5 sm:p-7">
          <AnimatePresence>
            {isRevealed && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="mb-5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-gold/8 via-gold/20 to-gold/8 border border-gold/35 text-center flex items-center justify-center gap-2 shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5 text-gold-accent flex-shrink-0" />
                <span className="font-serif text-xs sm:text-sm text-maroon font-medium tracking-wide">
                  Auspicious Muhurtham Unveiled · You are Cordially Invited!
                </span>
                <Sparkles className="w-3.5 h-3.5 text-gold-accent flex-shrink-0" />
              </motion.div>
            )}
          </AnimatePresence>
          {children}
        </div>

        {/* ── Gold Foil Canvas ── */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.01 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="absolute inset-0 z-20 rounded-2xl overflow-hidden"
              style={{ touchAction: 'none' }}
            >
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="block w-full h-full rounded-2xl cursor-crosshair"
                style={{ display: 'block', touchAction: 'none' }}
                aria-label="Scratch card — rub to reveal wedding details"
              />

              {/* Hint pill */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-maroon/80 text-ivory text-[11px] font-medium tracking-wide shadow-maroon backdrop-blur-sm"
                >
                  <Wand2 className="w-3 h-3 text-gold-light" />
                  <span>
                    {scratchProgress > 5
                      ? `${scratchProgress}% revealed — keep going!`
                      : 'Scratch here to reveal'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
