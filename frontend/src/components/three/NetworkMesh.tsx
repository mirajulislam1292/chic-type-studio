import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const NODE_COUNT = 90;
const BOUNDS = 9; // half-size of the cube the nodes drift within
const LINK_DISTANCE = 2.9; // max distance for a connecting line
const MAX_SEGMENTS = 1600;
const ACCENT_RATIO = 0.12; // fraction of nodes rendered in the accent orange

const INK = new THREE.Color("#171717");
const ORANGE = new THREE.Color("#f5610f");

function Mesh() {
  const group = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const { size } = useThree();

  // Smoothed pointer target for the parallax tilt.
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const { positions, velocities, colors } = useMemo(() => {
    const positions = new Float32Array(NODE_COUNT * 3);
    const velocities = new Float32Array(NODE_COUNT * 3);
    const colors = new Float32Array(NODE_COUNT * 3);

    for (let i = 0; i < NODE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * BOUNDS * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * BOUNDS * 2;

      velocities[i * 3] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.012;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.012;

      const c = Math.random() < ACCENT_RATIO ? ORANGE : INK;
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, velocities, colors };
  }, []);

  const lineData = useMemo(() => {
    return {
      positions: new Float32Array(MAX_SEGMENTS * 2 * 3),
      colors: new Float32Array(MAX_SEGMENTS * 2 * 3),
    };
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05) * 60;

    // Drift the nodes and bounce them off the invisible cube walls.
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      for (let a = 0; a < 3; a++) {
        positions[ix + a] += velocities[ix + a] * dt;
        if (positions[ix + a] > BOUNDS || positions[ix + a] < -BOUNDS) {
          velocities[ix + a] *= -1;
          positions[ix + a] = THREE.MathUtils.clamp(
            positions[ix + a],
            -BOUNDS,
            BOUNDS
          );
        }
      }
    }

    if (pointsRef.current) {
      const attr = pointsRef.current.geometry.getAttribute(
        "position"
      ) as THREE.BufferAttribute;
      attr.needsUpdate = true;
    }

    // Rebuild the connecting lines based on proximity.
    let seg = 0;
    const lp = lineData.positions;
    const lc = lineData.colors;
    for (let i = 0; i < NODE_COUNT; i++) {
      const ix = i * 3;
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (seg >= MAX_SEGMENTS) break;
        const jx = j * 3;
        const dx = positions[ix] - positions[jx];
        const dy = positions[ix + 1] - positions[jx + 1];
        const dz = positions[ix + 2] - positions[jx + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < LINK_DISTANCE) {
          const o = seg * 6;
          lp[o] = positions[ix];
          lp[o + 1] = positions[ix + 1];
          lp[o + 2] = positions[ix + 2];
          lp[o + 3] = positions[jx];
          lp[o + 4] = positions[jx + 1];
          lp[o + 5] = positions[jx + 2];

          // Fade line brightness with distance.
          const t = 1 - dist / LINK_DISTANCE;
          const shade = 0.09 + t * 0.16;
          for (let k = 0; k < 2; k++) {
            lc[o + k * 3] = 1 - shade;
            lc[o + k * 3 + 1] = 1 - shade;
            lc[o + k * 3 + 2] = 1 - shade;
          }
          seg++;
        }
      }
    }

    if (linesRef.current) {
      const geo = linesRef.current.geometry;
      (geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
      geo.setDrawRange(0, seg * 2);
    }

    // Pointer parallax + gentle constant rotation.
    const p = pointer.current;
    p.x += (p.tx - p.x) * 0.05;
    p.y += (p.ty - p.y) * 0.05;
    if (group.current) {
      group.current.rotation.y =
        state.clock.elapsedTime * 0.05 + p.x * 0.4;
      group.current.rotation.x = p.y * 0.3;
    }
  });

  useEffect(() => {
    const handlePointer = (e: PointerEvent) => {
      pointer.current.tx = (e.clientX / size.width) * 2 - 1;
      pointer.current.ty = -((e.clientY / size.height) * 2 - 1);
    };
    window.addEventListener("pointermove", handlePointer);
    return () => window.removeEventListener("pointermove", handlePointer);
  }, [size.width, size.height]);

  return (
    <group ref={group}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.14}
          vertexColors
          sizeAttenuation
          transparent
          opacity={0.95}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[lineData.positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineData.colors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.55} />
      </lineSegments>
    </group>
  );
}

export default function NetworkMesh() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 55 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Mesh />
    </Canvas>
  );
}
