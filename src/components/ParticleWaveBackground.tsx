import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  isOrange: boolean;
}

export function ParticleWaveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    const mouse = { x: -1000, y: -1000, active: false };

    const initParticles = () => {
      const width = (canvas.width = window.innerWidth);
      const height = (canvas.height = window.innerHeight);

      // Density calculation
      const particleCount = Math.floor((width * height) / 16000);
      particles = [];

      for (let i = 0; i < particleCount; i++) {
        const isOrange = Math.random() < 0.12; // 12% orange nodes
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: isOrange ? 1.8 + Math.random() * 0.8 : 1.2 + Math.random() * 0.8,
          baseAlpha: isOrange ? 0.45 : 0.25,
          isOrange,
        });
      }
    };

    const handleResize = () => {
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    initParticles();

    const maxConnectDistance = 120;
    const mouseRadius = 160;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const width = canvas.width;
      const height = canvas.height;

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Distance to mouse
        let mouseDist = 9999;
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          mouseDist = Math.sqrt(dx * dx + dy * dy);

          // Gentle attraction / repulsion
          if (mouseDist < mouseRadius) {
            const force = (1 - mouseDist / mouseRadius) * 0.03;
            p.x -= (dx / mouseDist) * force * 12;
            p.y -= (dy / mouseDist) * force * 12;
          }
        }

        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);

            if (p.isOrange || p2.isOrange) {
              ctx.strokeStyle = `rgba(249, 115, 22, ${alpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            }
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }

        // Connect to mouse if close
        if (mouseDist < mouseRadius) {
          const mAlpha = (1 - mouseDist / mouseRadius) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(249, 115, 22, ${mAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.isOrange) {
          ctx.fillStyle = `rgba(249, 115, 22, ${p.baseAlpha})`;
          ctx.shadowColor = "rgba(249, 115, 22, 0.4)";
          ctx.shadowBlur = 6;
        } else {
          ctx.fillStyle = `rgba(240, 240, 245, ${p.baseAlpha})`;
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ zIndex: 0 }}
    />
  );
}

