import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

function RotatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2.5, 0.5, 16, 100]} />
        <meshStandardMaterial 
          color="#00d4ff" 
          emissive="#00aaff"
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#0066cc"
          emissive="#0088ff"
          emissiveIntensity={0.6}
          wireframe
        />
      </mesh>
    </group>
  );
}

interface Simple3DBackgroundProps {
  isLowEnd?: boolean;
}

function Simple3DBackground({ isLowEnd = false }: Simple3DBackgroundProps) {
  if (isLowEnd) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
          <RotatingShape />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Simple3DBackground;
