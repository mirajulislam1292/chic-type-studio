import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Create flowing gradient waves
    float wave1 = sin(uv.x * 3.0 + uTime * 0.3) * 0.5 + 0.5;
    float wave2 = sin(uv.y * 2.0 - uTime * 0.2) * 0.5 + 0.5;
    
    // Combine waves
    float pattern = wave1 * wave2;
    
    // Color gradient
    vec3 color1 = vec3(0.0, 0.1, 0.2); // Dark blue
    vec3 color2 = vec3(0.0, 0.5, 0.8); // Bright cyan
    vec3 finalColor = mix(color1, color2, pattern);
    
    gl_FragColor = vec4(finalColor, 0.15);
  }
`;

export function ShaderBackground() {
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useRef({
    uTime: { value: 0 },
  });

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]} scale={[20, 15, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        uniforms={uniforms.current}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
