import { useEffect, useRef } from "react";

export function ParticleWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle grid
    const COLS = 90;
    const ROWS = 40;

    const drawFrame = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cellW = canvas.width / COLS;
      const cellH = canvas.height / ROWS;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = col * cellW + cellW / 2;
          const baseY = row * cellH + cellH / 2;

          // Two overlapping waves to create the flowing S-curve pattern
          const wave1 = Math.sin(col * 0.12 - time * 1.4 + row * 0.18) * 55;
          const wave2 = Math.sin(col * 0.08 + time * 1.0 - row * 0.12) * 35;
          const wave3 = Math.cos(col * 0.15 - time * 0.7 + row * 0.05) * 20;

          const y = baseY + wave1 + wave2 + wave3;

          // Amplitude determines brightness — particles near wave crest are brighter
          const amplitude = Math.abs(Math.sin(col * 0.12 - time * 1.4 + row * 0.18));
          const alpha = 0.08 + amplitude * 0.55;

          // Vary dot size slightly with amplitude
          const radius = 0.7 + amplitude * 1.3;

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.fill();
        }
      }

      time += 0.012;
      animationId = requestAnimationFrame(drawFrame);
    };

    drawFrame();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
