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
      camera.position.z = 7.2;

      const group = new THREE.Group();
      scene.add(group);

      const coreGeometry = new THREE.IcosahedronGeometry(1.55, 2);
      const wireMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.28, wireframe: true });
      const wireframe = new THREE.Mesh(coreGeometry, wireMaterial);
      group.add(wireframe);

      const pointMaterial = new THREE.PointsMaterial({ color: 0xf8fafc, size: 0.045, transparent: true, opacity: 0.72, sizeAttenuation: true });
      const points = new THREE.Points(coreGeometry, pointMaterial);
      group.add(points);

      const ringGeometry = new THREE.TorusGeometry(2.05, 0.012, 6, 120);
      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.2 });
      const ringOne = new THREE.Mesh(ringGeometry, ringMaterial);
      ringOne.rotation.set(0.8, 0.35, 0.2);
      group.add(ringOne);
      const ringTwo = ringOne.clone();
      ringTwo.rotation.set(-0.35, 0.9, -0.55);
      group.add(ringTwo);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const pointer = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      let visible = true;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
        camera.aspect = Math.max(width, 1) / Math.max(height, 1);
        camera.updateProjectionMatrix();
        group.position.x = width >= 768 ? 1.65 : 0.75;
        group.scale.setScalar(width >= 768 ? 1 : 0.72);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        if (event.clientY < rect.top || event.clientY > rect.bottom) return;
        target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.75;
        target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.5;
      };

      const render = (time = 0) => {
        if (!visible || document.hidden) return;
        pointer.x += (target.x - pointer.x) * 0.045;
        pointer.y += (target.y - pointer.y) * 0.045;
        group.rotation.y = time * 0.00011 + pointer.x;
        group.rotation.x = -0.18 + pointer.y;
        ringOne.rotation.z = time * 0.00008;
        ringTwo.rotation.z = -time * 0.00006;
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
      resize();
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        coreGeometry.dispose();
        ringGeometry.dispose();
        wireMaterial.dispose();
        pointMaterial.dispose();
        ringMaterial.dispose();
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_45%,rgba(249,115,22,0.09),transparent_34%)]" />
      <div ref={containerRef} className="absolute inset-0 opacity-80 [mask-image:linear-gradient(to_bottom,transparent,black_12%,black_88%,transparent)]" />
    </div>
  );
}
