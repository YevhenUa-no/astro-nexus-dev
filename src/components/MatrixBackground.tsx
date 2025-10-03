import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Box, Torus, MeshDistortMaterial } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const FloatingShape = ({ position, geometry, color }: { position: [number, number, number], geometry: 'sphere' | 'box' | 'torus', color: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      {geometry === 'sphere' && <sphereGeometry args={[1, 32, 32]} />}
      {geometry === 'box' && <boxGeometry args={[1.5, 1.5, 1.5]} />}
      {geometry === 'torus' && <torusGeometry args={[1, 0.4, 16, 100]} />}
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.4}
        metalness={0.8}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

const MatrixBackground = () => {
  return (
    <div className="fixed inset-0 z-[-2]">
      {/* 3D Canvas Background */}
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        className="absolute inset-0"
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ff88" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0088ff" />
        
        {/* Floating 3D Objects */}
        <FloatingShape position={[-4, 2, -2]} geometry="sphere" color="#00ff88" />
        <FloatingShape position={[4, -2, -3]} geometry="box" color="#0088ff" />
        <FloatingShape position={[0, 3, -4]} geometry="torus" color="#00ffff" />
        <FloatingShape position={[-3, -3, -2]} geometry="sphere" color="#88ff00" />
        <FloatingShape position={[5, 1, -5]} geometry="box" color="#ff0088" />
        <FloatingShape position={[2, -1, -3]} geometry="torus" color="#00ff88" />
        
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {/* Gradient Overlay */}
      <div className="matrix-bg" />
      <div className="matrix-rain" />
      
      {/* Additional floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-glow rounded-full opacity-20 float-animation" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-glow rounded-full opacity-15 float-animation" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-40 left-40 w-16 h-16 bg-gradient-glow rounded-full opacity-25 float-animation" style={{animationDelay: '4s'}} />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-glow rounded-full opacity-10 float-animation" style={{animationDelay: '1s'}} />
    </div>
  );
};

export default MatrixBackground;