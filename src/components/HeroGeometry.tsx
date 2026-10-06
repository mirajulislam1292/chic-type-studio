import { useEffect, useRef } from "react";

export function HeroGeometry() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let frame = 0;
    let cleanup = () => undefined;

    void import("three").then((THREE) => {
      if (disposed) return;
      const canvas = document.createElement("canvas");
      canvas.setAttribute("aria-hidden", "true");
      canvas.className = "h-full w-full";
      container.appendChild(canvas);

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
      } catch {
        canvas.remove();
        return;
      }

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.z = 7.4;
      const group = new THREE.Group();
      scene.add(group);

      const geometry = new THREE.IcosahedronGeometry(1.62, 2);
      const lineMaterial = new THREE.MeshBasicMaterial({ color: 0xa1a1aa, transparent: true, opacity: 0.16, wireframe: true, depthWrite: false });
      const shape = new THREE.Mesh(geometry, lineMaterial);
      group.add(shape);

      const pointMaterial = new THREE.PointsMaterial({ color: 0xd4d4d8, size: 0.035, transparent: true, opacity: 0.4, sizeAttenuation: true });
      group.add(new THREE.Points(geometry, pointMaterial));

      const signalGeometry = new THREE.TorusGeometry(2.04, 0.009, 5, 140);
      const signalMaterial = new THREE.MeshBasicMaterial({ color: 0xa1a1aa, transparent: true, opacity: 0.14 });
      const signals = [0, 1, 2].map((index) => {
        const ring = new THREE.Mesh(signalGeometry, signalMaterial);
        ring.rotation.set(0.7 + index * 0.38, 0.35 + index * 0.45, index * 0.28);
        ring.scale.setScalar(0.94 + index * 0.14);
        group.add(ring);
        return ring;
      });

      const current = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let scrollTarget = 0;
      let visible = true;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
        camera.aspect = Math.max(width, 1) / Math.max(height, 1);
        camera.updateProjectionMatrix();
        group.position.set(width >= 768 ? 1.7 : 0.65, width >= 768 ? 0 : -0.45, 0);
        group.scale.setScalar(width >= 768 ? 1 : 0.68);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        if (event.clientY < rect.top || event.clientY > rect.bottom) return;
        target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.8;
        target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.55;
      };
      const onScroll = () => { scrollTarget = Math.min(window.scrollY / Math.max(window.innerHeight, 1), 1); };

      const render = (time = 0) => {
        if (!visible || document.hidden) return;
        current.x += (target.x - current.x) * 0.045;
        current.y += (target.y - current.y) * 0.045;
        group.rotation.y = time * 0.000055 + current.x;
        group.rotation.x = -0.16 + current.y + scrollTarget * 0.18;
        signals.forEach((ring, index) => {
          ring.rotation.z = (index % 2 ? -1 : 1) * time * (0.000035 + index * 0.00001);
        });
        renderer.render(scene, camera);
        if (!reducedMotion) frame = requestAnimationFrame(render);
      };

      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !reducedMotion) {
          cancelAnimationFrame(frame);
          frame = requestAnimationFrame(render);
        }
      }, { threshold: 0.05 });
      const resizeObserver = new ResizeObserver(resize);
      observer.observe(container);
      resizeObserver.observe(container);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      resize();
      onScroll();
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("scroll", onScroll);
        geometry.dispose();
        signalGeometry.dispose();
        lineMaterial.dispose();
        pointMaterial.dispose();
        signalMaterial.dispose();
        renderer.dispose();
        canvas.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_46%,rgba(161,161,170,0.055),transparent_30%)]" />
      <div ref={containerRef} className="absolute inset-0 opacity-75 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />
    </div>
  );
}
