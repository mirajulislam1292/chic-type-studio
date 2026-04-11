import { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { TechOrb } from './TechOrb';
import { ParticleField } from './ParticleField';
import { ShaderBackground } from './ShaderBackground';

interface Hero3DProps {
  isLowEnd?: boolean;
}

function Hero3D({ isLowEnd = false }: Hero3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Fallback for low-end devices
  if (isLowEnd) {
    return (
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
    );
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Limit pixel ratio for performance
        performance={{ min: 0.5 }} // Allow quality reduction if needed
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} color="#00d4ff" />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#0088ff" />

          {/* Background shader effect */}
          <ShaderBackground />

          {/* Particle field */}
          <ParticleField />

          {/* Main tech orb */}
          <TechOrb mouseX={mousePosition.x} mouseY={mousePosition.y} />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default Hero3D;
