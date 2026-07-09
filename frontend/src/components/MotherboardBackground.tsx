import { useEffect, useRef } from "react";
import * as THREE from "three";

export function MotherboardBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 15);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // Subtle blue/gray fill light for depth
    const fillLight = new THREE.DirectionalLight(0x8899af, 0.3);
    fillLight.position.set(-5, -5, 2);
    scene.add(fillLight);

    // 1. Central Processor Chip (Strictly clean: no text, no logo, no initials)
    const chipGroup = new THREE.Group();

    // Chip substrate (base board)
    const baseGeo = new THREE.BoxGeometry(3.2, 3.2, 0.15);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1a1a1a,
      roughness: 0.8,
      metalness: 0.2,
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    chipGroup.add(baseMesh);

    // Chip heat spreader (metallic center plate)
    const dieGeo = new THREE.BoxGeometry(2.0, 2.0, 0.12);
    const dieMat = new THREE.MeshStandardMaterial({
      color: 0xdcdcdc,
      roughness: 0.3,
      metalness: 0.9,
    });
    const dieMesh = new THREE.Mesh(dieGeo, dieMat);
    dieMesh.position.z = 0.12;
    chipGroup.add(dieMesh);

    // Pins extending from sides
    const pinMat = new THREE.MeshStandardMaterial({
      color: 0xe0e0e0,
      metalness: 0.9,
      roughness: 0.1,
    });

    const addPins = (x: number, y: number, isHorizontal: boolean) => {
      const pinCount = 8;
      const spacing = 0.3;
      for (let i = 0; i < pinCount; i++) {
        const offset = (i - (pinCount - 1) / 2) * spacing;
        const pinGeo = isHorizontal
          ? new THREE.BoxGeometry(0.4, 0.08, 0.04)
          : new THREE.BoxGeometry(0.08, 0.4, 0.04);
        const pin = new THREE.Mesh(pinGeo, pinMat);
        if (isHorizontal) {
          pin.position.set(x, offset, 0.06);
        } else {
          pin.position.set(offset, y, 0.06);
        }
        chipGroup.add(pin);
      }
    };

    // Add pins along all four edges of base plate
    addPins(-1.7, 0, true);  // Left
    addPins(1.7, 0, true);   // Right
    addPins(0, -1.7, false); // Bottom
    addPins(0, 1.7, false);  // Top

    scene.add(chipGroup);

    // Rotate slightly for a premium anti-gravity perspective layout
    chipGroup.rotation.set(0.3, -0.4, 0.1);

    // 2. Motherboard Circuit Lines (Neural Network Web Style)
    // Generate paths that start near the chip and branch out
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.15,
    });

    interface CircuitPath {
      points: THREE.Vector3[];
      line: THREE.Line;
    }

    const circuitPaths: CircuitPath[] = [];
    const pathCount = 35;

    // Generate random motherboard traces
    for (let i = 0; i < pathCount; i++) {
      const angle = (i / pathCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const startDist = 1.8;
      
      const p1 = new THREE.Vector3(
        Math.cos(angle) * startDist,
        Math.sin(angle) * startDist,
        0.05
      );
      
      // First segment going straight out
      const midDist = startDist + 1.5 + Math.random() * 1.5;
      const p2 = new THREE.Vector3(
        Math.cos(angle) * midDist,
        Math.sin(angle) * midDist,
        0.05
      );

      // Second segment turning 45 or 90 degrees
      const turnAngle = angle + (Math.random() > 0.5 ? Math.PI / 4 : -Math.PI / 4);
      const endDist = midDist + 2.0 + Math.random() * 3.0;
      const p3 = new THREE.Vector3(
        Math.cos(turnAngle) * endDist,
        Math.sin(turnAngle) * endDist,
        0.05
      );

      // Transform points to match the chipGroup's rotation/perspective
      p1.applyEuler(chipGroup.rotation);
      p2.applyEuler(chipGroup.rotation);
      p3.applyEuler(chipGroup.rotation);

      const pathPoints = [p1, p2, p3];

      // Draw the line trace
      const lineGeo = new THREE.BufferGeometry().setFromPoints(pathPoints);
      const lineMesh = new THREE.Line(lineGeo, lineMaterial);
      scene.add(lineMesh);

      circuitPaths.push({
        points: pathPoints,
        line: lineMesh,
      });

      // Add a small node point at the end of each trace
      const nodeGeo = new THREE.SphereGeometry(0.04, 8, 8);
      const nodeMat = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(p3);
      scene.add(nodeMesh);
    }

    // 3. Signal flow indicators
    // We instantiate particles that run along the traces
    interface Signal {
      pathIdx: number;
      progress: number;
      speed: number;
      mesh: THREE.Mesh;
    }

    const signalCount = 12;
    const signals: Signal[] = [];

    const signalGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const signalMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.8,
    });

    for (let i = 0; i < signalCount; i++) {
      const pathIdx = Math.floor(Math.random() * pathCount);
      const mesh = new THREE.Mesh(signalGeo, signalMat);
      scene.add(mesh);

      signals.push({
        pathIdx,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        mesh,
      });
    }

    // Interactive mouse parallax variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let lastTime = 0;
    const animate = (time: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // Parallax camera shift (very soft and premium)
      targetX += (mouseX * 1.5 - targetX) * 0.05;
      targetY += (mouseY * 1.5 - targetY) * 0.05;

      camera.position.x = targetX;
      camera.position.y = -targetY;
      camera.lookAt(0, 0, 0);

      // Slow self-rotation of the chip system
      chipGroup.rotation.y = -0.4 + Math.sin(time * 0.0001) * 0.05;
      chipGroup.rotation.x = 0.3 + Math.cos(time * 0.0001) * 0.03;

      // Update signal positions along paths
      signals.forEach((signal) => {
        signal.progress += signal.speed;
        if (signal.progress >= 1.0) {
          // Restart path or pick a new one
          signal.progress = 0;
          signal.pathIdx = Math.floor(Math.random() * pathCount);
          signal.speed = 0.003 + Math.random() * 0.005;
        }

        const path = circuitPaths[signal.pathIdx].points;
        
        // Linear interpolation across segments
        const segmentCount = path.length - 1;
        const totalProgress = signal.progress * segmentCount;
        const currentSegment = Math.floor(totalProgress);
        const segmentProgress = totalProgress - currentSegment;

        const pA = path[currentSegment];
        const pB = path[currentSegment + 1];

        if (pA && pB) {
          signal.mesh.position.lerpVectors(pA, pB, segmentProgress);
        }
      });

      renderer.render(scene, camera);
    };

    let animationFrameId = requestAnimationFrame(animate);

    // Clean up
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ overflow: "hidden" }}
    />
  );
}
