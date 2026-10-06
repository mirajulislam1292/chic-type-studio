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

      renderer.setClearColor(0x000000, 0);
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
      camera.position.set(0, 0, 8.4);

      scene.add(new THREE.AmbientLight(0xffffff, 1.35));
      const orangeLight = new THREE.PointLight(0xf97316, 8, 12);
      orangeLight.position.set(2.5, 2.8, 4);
      scene.add(orangeLight);
      const rimLight = new THREE.PointLight(0x7dd3fc, 4, 10);
      rimLight.position.set(-3, -2, 2);
      scene.add(rimLight);

      const system = new THREE.Group();
      scene.add(system);

      // A protected parcel at the center of an encrypted planetary network.
      const parcel = new THREE.Group();
      parcel.rotation.set(-0.28, 0.48, 0.08);
      system.add(parcel);

      const boxGeometry = new THREE.BoxGeometry(2.05, 1.65, 1.55, 3, 3, 3);
      const boxMaterial = new THREE.MeshPhysicalMaterial({ color: 0x17171d, metalness: 0.72, roughness: 0.22, transparent: true, opacity: 0.94, clearcoat: 0.9, clearcoatRoughness: 0.16 });
      parcel.add(new THREE.Mesh(boxGeometry, boxMaterial));

      const edgeGeometry = new THREE.EdgesGeometry(boxGeometry);
      const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.82 });
      parcel.add(new THREE.LineSegments(edgeGeometry, edgeMaterial));

      const bandGeometry = new THREE.BoxGeometry(0.34, 1.69, 1.59);
      const bandMaterial = new THREE.MeshPhysicalMaterial({ color: 0xf97316, emissive: 0x7c2d12, emissiveIntensity: 0.8, metalness: 0.5, roughness: 0.3 });
      parcel.add(new THREE.Mesh(bandGeometry, bandMaterial));

      const chipGeometry = new THREE.BoxGeometry(0.64, 0.44, 0.05);
      const chipMaterial = new THREE.MeshPhysicalMaterial({ color: 0x09090b, emissive: 0xf97316, emissiveIntensity: 0.18, metalness: 0.85, roughness: 0.18 });
      const chip = new THREE.Mesh(chipGeometry, chipMaterial);
      chip.position.set(0.49, 0.05, 0.8);
      parcel.add(chip);
      const chipEdgeGeometry = new THREE.EdgesGeometry(chipGeometry);
      const chipEdgeMaterial = new THREE.LineBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.9 });
      const chipEdges = new THREE.LineSegments(chipEdgeGeometry, chipEdgeMaterial);
      chipEdges.position.copy(chip.position);
      parcel.add(chipEdges);

      const lockBodyGeometry = new THREE.BoxGeometry(0.34, 0.29, 0.09);
      const lockMaterial = new THREE.MeshBasicMaterial({ color: 0xfafafa });
      const lockBody = new THREE.Mesh(lockBodyGeometry, lockMaterial);
      lockBody.position.set(0.49, 0.04, 0.87);
      parcel.add(lockBody);
      const shackleGeometry = new THREE.TorusGeometry(0.12, 0.025, 8, 24, Math.PI);
      const shackle = new THREE.Mesh(shackleGeometry, lockMaterial);
      shackle.position.set(0.49, 0.2, 0.87);
      parcel.add(shackle);

      const shieldGeometry = new THREE.IcosahedronGeometry(2.18, 2);
      const shieldMaterial = new THREE.MeshBasicMaterial({ color: 0x94a3b8, wireframe: true, transparent: true, opacity: 0.12, depthWrite: false });
      const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
      system.add(shield);

      const haloGeometry = new THREE.SphereGeometry(2.03, 32, 18);
      const haloMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316, wireframe: true, transparent: true, opacity: 0.045, depthWrite: false });
      system.add(new THREE.Mesh(haloGeometry, haloMaterial));

      const orbitMaterial = new THREE.MeshBasicMaterial({ color: 0xcbd5e1, transparent: true, opacity: 0.28 });
      const orbitGeometry = new THREE.TorusGeometry(2.55, 0.012, 6, 160);
      const orbitOne = new THREE.Mesh(orbitGeometry, orbitMaterial);
      orbitOne.rotation.set(1.08, 0.22, 0.22);
      system.add(orbitOne);
      const orbitTwo = orbitOne.clone();
      orbitTwo.rotation.set(0.34, 1.02, -0.55);
      system.add(orbitTwo);
      const orbitThree = orbitOne.clone();
      orbitThree.rotation.set(-0.65, 0.42, 0.84);
      system.add(orbitThree);

      const nodeGeometry = new THREE.SphereGeometry(0.075, 12, 12);
      const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316 });
      const nodes = [0, 1, 2, 3].map((index) => {
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        system.add(node);
        return { node, offset: index * Math.PI * 0.5, radius: 2.55 - (index % 2) * 0.22 };
      });

      const pulseGeometry = new THREE.RingGeometry(0.42, 0.45, 64);
      const pulseMaterial = new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.34, side: THREE.DoubleSide, depthWrite: false });
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
      pulse.position.z = 1.15;
      parcel.add(pulse);

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const current = { x: 0, y: 0 };
      const target = { x: 0, y: 0 };
      let visible = true;

      const resize = () => {
        const { width, height } = container.getBoundingClientRect();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(Math.max(width, 1), Math.max(height, 1), false);
        camera.aspect = Math.max(width, 1) / Math.max(height, 1);
        camera.updateProjectionMatrix();
        system.position.set(width >= 768 ? 1.82 : 0, width >= 768 ? 0 : -0.65, 0);
        system.scale.setScalar(width >= 1024 ? 1 : width >= 768 ? 0.82 : 0.6);
      };

      const onPointerMove = (event: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        if (event.clientY < rect.top || event.clientY > rect.bottom) return;
        target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 0.9;
        target.y = ((event.clientY - rect.top) / rect.height - 0.5) * 0.65;
      };

      const render = (time = 0) => {
        if (!visible || document.hidden) return;
        current.x += (target.x - current.x) * 0.04;
        current.y += (target.y - current.y) * 0.04;
        system.rotation.y = time * 0.000045 + current.x * 0.48;
        system.rotation.x = current.y * 0.34;
        parcel.rotation.y = 0.48 + Math.sin(time * 0.00045) * 0.12 + current.x * 0.22;
        shield.rotation.y = -time * 0.00008;
        shield.rotation.z = time * 0.000035;
        orbitOne.rotation.z = time * 0.00008;
        orbitTwo.rotation.z = -time * 0.00006;
        orbitThree.rotation.z = time * 0.000045;
        const pulseScale = 1 + Math.sin(time * 0.002) * 0.18;
        pulse.scale.setScalar(pulseScale);
        pulseMaterial.opacity = 0.22 + Math.sin(time * 0.002) * 0.12;
        nodes.forEach(({ node, offset, radius }, index) => {
          const angle = time * (0.00022 + index * 0.000025) + offset;
          node.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.58, Math.sin(angle * 1.3) * 1.25);
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
      resize();
      render();

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        [boxGeometry, edgeGeometry, bandGeometry, chipGeometry, chipEdgeGeometry, lockBodyGeometry, shackleGeometry, shieldGeometry, haloGeometry, orbitGeometry, nodeGeometry, pulseGeometry].forEach((geometry) => geometry.dispose());
        [boxMaterial, edgeMaterial, bandMaterial, chipMaterial, chipEdgeMaterial, lockMaterial, shieldMaterial, haloMaterial, orbitMaterial, nodeMaterial, pulseMaterial].forEach((material) => material.dispose());
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_76%_45%,rgba(249,115,22,0.12),transparent_32%),radial-gradient(circle_at_72%_50%,rgba(56,189,248,0.045),transparent_44%)]" />
      <div className="absolute inset-y-[12%] right-[5%] hidden w-px bg-gradient-to-b from-transparent via-orange-500/20 to-transparent md:block" />
      <div ref={containerRef} className="absolute inset-0 opacity-95 [mask-image:linear-gradient(to_bottom,transparent,black_8%,black_91%,transparent)]" />
      <div className="absolute right-[7%] top-[27%] hidden rounded-full border border-orange-400/25 bg-black/45 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-orange-200/70 backdrop-blur md:block">ENCRYPTED CORE</div>
      <div className="absolute bottom-[22%] right-[30%] hidden rounded-full border border-sky-300/15 bg-black/45 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-sky-100/60 backdrop-blur lg:block">NFC AUTHENTICATED</div>
    </div>
  );
}
