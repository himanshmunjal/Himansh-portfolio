import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox, Sphere, Cylinder, Torus } from '@react-three/drei';
import * as THREE from 'three';

interface Hero3DObjectProps {
  scrollProgress?: number;
}

const Hero3DObject: React.FC<Hero3DObjectProps> = ({ scrollProgress = 0 }) => {
  const groupRef = useRef<THREE.Group>(null);
  const headGroupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current || !headGroupRef.current) return;

    const t = state.clock.getElapsedTime();
    const targetX = state.pointer.x;
    const targetY = state.pointer.y;

    // Smooth torso rotation based on mouse natively via state.pointer
    groupRef.current.rotation.y += (targetX * 0.3 - groupRef.current.rotation.y) * 0.05;
    groupRef.current.rotation.x += (-targetY * 0.1 - groupRef.current.rotation.x) * 0.05;

    // Head follows mouse more actively
    headGroupRef.current.rotation.y = THREE.MathUtils.lerp(headGroupRef.current.rotation.y, targetX * 0.5, 0.1);
    headGroupRef.current.rotation.x = THREE.MathUtils.lerp(headGroupRef.current.rotation.x, -targetY * 0.3, 0.1);

    // Subtle floating breath effect
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      -1.5 + Math.sin(t * 1.5) * 0.05 - (scrollProgress * 8),
      0.1
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, -scrollProgress * 15, 0.1);
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      {/* 
        ================================================== 
        IMPRESSIVE CHARACTER DESIGN v2 
        ================================================== 
      */}
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
        
        {/* --- TORSO & CLOTHING --- */}
        <group position={[0, -1.2, 0]}>
          {/* Main Jacket/Hoodie */}
          <RoundedBox args={[2.8, 2.6, 1.8]} radius={0.8} smoothness={16} position={[0, 0, 0]}>
            <meshPhysicalMaterial 
              color="#0f172a" 
              roughness={0.7} 
              metalness={0.1}
              clearcoat={0.1}
            />
          </RoundedBox>
          
          {/* Neon Cyper-punk Accent Lines on Jacket */}
          <RoundedBox args={[0.05, 2.7, 1.9]} radius={0.02} smoothness={8} position={[-0.8, 0, 0]}>
            <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
          </RoundedBox>
          <RoundedBox args={[0.05, 2.7, 1.9]} radius={0.02} smoothness={8} position={[0.8, 0, 0]}>
            <meshStandardMaterial color="#c084fc" emissive="#c084fc" emissiveIntensity={1} />
          </RoundedBox>

          {/* Glowing Chest Core */}
          <group position={[0, 0.2, 0.9]}>
            <Torus args={[0.2, 0.04, 16, 32]}>
              <meshStandardMaterial color="#60a5fa" emissive="#60a5fa" emissiveIntensity={2} />
            </Torus>
            <Sphere args={[0.1, 16, 16]} position={[0, 0, 0]}>
              <meshPhysicalMaterial 
                color="#ffffff" 
                transmission={0.9} 
                roughness={0} 
                emissive="#e879f9" 
                emissiveIntensity={1} 
              />
            </Sphere>
          </group>

          {/* Neck / Collar */}
          <Cylinder args={[0.6, 0.7, 0.6, 32]} position={[0, 1.4, 0]}>
            <meshPhysicalMaterial color="#1e293b" roughness={0.8} />
          </Cylinder>
        </group>

        {/* --- HEAD & FACE --- */}
        <group ref={headGroupRef} position={[0, 1.0, 0]}>
          
          {/* Beautiful Soft Skin Head - Very round and appealing */}
          <RoundedBox args={[1.8, 2.0, 1.9]} radius={0.85} smoothness={32} position={[0, 0, 0]}>
            <meshPhysicalMaterial 
              color="#ffdbac" 
              roughness={0.3} 
              metalness={0.05}
              clearcoat={0.1}
              clearcoatRoughness={0.4}
            />
          </RoundedBox>

          {/* Chic Volumetric Hair */}
          <group position={[0, 0.8, -0.1]}>
            {/* Top Base */}
            <RoundedBox args={[2.0, 0.9, 2.1]} radius={0.4} smoothness={16}>
              <meshStandardMaterial color="#111111" roughness={0.6} />
            </RoundedBox>
            {/* Modern Swooping Bangs */}
            <RoundedBox args={[1.2, 0.6, 1.2]} radius={0.25} smoothness={16} position={[-0.4, 0.2, 0.8]} rotation={[0.2, 0.2, 0.2]}>
              <meshStandardMaterial color="#111111" roughness={0.6} />
            </RoundedBox>
            <RoundedBox args={[0.9, 0.5, 1.0]} radius={0.2} smoothness={16} position={[0.5, 0.1, 0.8]} rotation={[-0.1, -0.2, -0.2]}>
              <meshStandardMaterial color="#111111" roughness={0.6} />
            </RoundedBox>
            {/* Colored Hair Strand/Highlight */}
            <mesh position={[-0.6, 0.4, 1.0]} rotation={[1.2, 0.2, 0.5]}>
              <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
              <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
            </mesh>
          </group>

          {/* Premium Thick Modern Tech Glasses */}
          <group position={[0, 0.1, 0.9]}>
            {/* Main Frames */}
            <RoundedBox args={[1.6, 0.6, 0.1]} radius={0.1} smoothness={16} position={[0, 0, 0]}>
              <meshPhysicalMaterial 
                color="#000000" 
                roughness={0.1} 
                metalness={0.8}
                clearcoat={1.0}
              />
            </RoundedBox>
            {/* Glass Lenses with high transmission (glass effect) */}
            <RoundedBox args={[0.65, 0.45, 0.12]} radius={0.08} smoothness={16} position={[-0.4, 0, 0]}>
              <meshPhysicalMaterial 
                color="#e0f2fe" 
                transmission={0.9} 
                opacity={1} 
                transparent 
                roughness={0.05} 
                ior={1.5}
                thickness={0.5}
              />
            </RoundedBox>
            <RoundedBox args={[0.65, 0.45, 0.12]} radius={0.08} smoothness={16} position={[0.4, 0, 0]}>
              <meshPhysicalMaterial 
                color="#e0f2fe" 
                transmission={0.9} 
                opacity={1} 
                transparent 
                roughness={0.05} 
                ior={1.5}
                thickness={0.5}
              />
            </RoundedBox>
            
          </group>

          {/* Expressive Eyes (Visible through glass) */}
          <group position={[0, 0.1, 0.85]}>
            {/* Left Eye */}
            <Sphere args={[0.15, 32, 32]} position={[-0.4, 0, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[0.06, 16, 16]} position={[-0.4, 0, 0.12]}>
              <meshStandardMaterial color="#000000" />
            </Sphere>
            {/* Right Eye */}
            <Sphere args={[0.15, 32, 32]} position={[0.4, 0, 0]}>
              <meshStandardMaterial color="#ffffff" />
            </Sphere>
            <Sphere args={[0.06, 16, 16]} position={[0.4, 0, 0.12]}>
              <meshStandardMaterial color="#000000" />
            </Sphere>
          </group>

          {/* Cute Sculpted Nose */}
          <Sphere args={[0.1, 32, 32]} position={[0, -0.25, 0.98]}>
            <meshStandardMaterial color="#fca5a5" roughness={0.4} /> {/* Slight pinkish tint */}
          </Sphere>

          {/* Extremely Cute Hand-Crafted Half-Smile / Smirk */}
          <group position={[0, -0.45, 0.9]}>
            {/* Right side turned sharply up for a smirk */}
            <mesh position={[0.12, 0.08, 0]} rotation={[0, 0, -0.5]}>
              <cylinderGeometry args={[0.015, 0.015, 0.18, 16]} />
              <meshStandardMaterial color="#991b1b" />
            </mesh>
            {/* Left side somewhat flat */}
            <mesh position={[-0.05, 0, 0]} rotation={[0, 0, 1.4]}>
              <cylinderGeometry args={[0.015, 0.015, 0.2, 16]} />
              <meshStandardMaterial color="#991b1b" />
            </mesh>
            {/* Dimple on the smiling right cheek */}
            <Sphere args={[0.03, 16, 16]} position={[0.22, 0.12, -0.02]}>
              <meshStandardMaterial color="#fca5a5" roughness={0.5} />
            </Sphere>
          </group>

          {/* Cute Rosy Cheeks */}
          <Sphere args={[0.15, 32, 32]} position={[-0.45, -0.25, 0.85]} scale={[1, 0.6, 0.5]}>
            <meshStandardMaterial color="#fecdd3" transparent opacity={0.6} />
          </Sphere>
          <Sphere args={[0.15, 32, 32]} position={[0.45, -0.25, 0.85]} scale={[1, 0.6, 0.5]}>
            <meshStandardMaterial color="#fecdd3" transparent opacity={0.6} />
          </Sphere>

          {/* Ears */}
          <Sphere args={[0.2, 32, 32]} position={[-0.95, 0, 0]} scale={[0.5, 1.2, 0.8]}>
            <meshStandardMaterial color="#ffdbac" />
          </Sphere>
          <Sphere args={[0.2, 32, 32]} position={[0.95, 0, 0]} scale={[0.5, 1.2, 0.8]}>
            <meshStandardMaterial color="#ffdbac" />
          </Sphere>
          
          {/* Cool Earring */}
          <Torus args={[0.06, 0.02, 16, 32]} position={[-1.0, -0.15, 0]} rotation={[1.5, 0, 0]}>
            <meshStandardMaterial color="#fbbf24" metalness={1} roughness={0.1} />
          </Torus>

        </group>
      </Float>

      {/* 
        ================================================== 
        IMPRESSIVE FLOATING ENVIRONMENT ELEMENTS
        ================================================== 
      */}

      {/* Abstract React/Atomic Design Element */}
      <group position={[3, 1, -1]}>
        <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
          <Torus args={[0.8, 0.15, 32, 64]} rotation={[1, 0, 0]}>
            <meshPhysicalMaterial 
              color="#c084fc" 
              transmission={0.9} 
              opacity={1} 
              transparent 
              roughness={0.1}
              thickness={0.5}
            />
          </Torus>
          <Torus args={[0.8, 0.15, 32, 64]} rotation={[0, 1, 0]}>
            <meshPhysicalMaterial 
              color="#3b82f6" 
              transmission={0.9} 
              opacity={1} 
              transparent 
              roughness={0.1}
              thickness={0.5}
            />
          </Torus>
          <Sphere args={[0.2, 32, 32]}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </Sphere>
        </Float>
      </group>

      {/* Smooth Premium Code Cube */}
      <group position={[-3, -0.5, 0.5]}>
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
          <RoundedBox args={[1.2, 1.2, 1.2]} radius={0.15} smoothness={16}>
            <meshPhysicalMaterial 
              color="#10b981" 
              transmission={0.8} 
              transparent 
              roughness={0.2} 
              clearcoat={1}
            />
          </RoundedBox>
          <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} smoothness={16}>
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
          </RoundedBox>
        </Float>
      </group>

      {/* Cinematic Glowing Particles */}
      {[...Array(6)].map((_, i) => (
        <group key={i} position={[
          (Math.random() - 0.5) * 10, 
          (Math.random() - 0.5) * 8, 
          (Math.random() - 0.5) * 4 - 2
        ]}>
          <Float speed={2 + Math.random() * 2} floatIntensity={2}>
            <Sphere args={[0.04 + Math.random() * 0.05, 16, 16]}>
              <meshStandardMaterial 
                color={i % 2 === 0 ? "#60a5fa" : "#c084fc"} 
                emissive={i % 2 === 0 ? "#60a5fa" : "#c084fc"} 
                emissiveIntensity={2} 
              />
            </Sphere>
          </Float>
        </group>
      ))}

      {/* 
        ================================================== 
        PRO STUDIO LIGHTING - PREMIUM & BEAUTIFUL
        ================================================== 
      */}
      <ambientLight intensity={0.2} color="#ffffff" />
      
      {/* Key Light (Bright white/blueish) */}
      <directionalLight 
        position={[5, 8, 8]} 
        intensity={2.5} 
        color="#e0f2fe" 
        castShadow 
      />
      
      {/* Fill Light (Soft purple) */}
      <directionalLight 
        position={[-6, 4, 6]} 
        intensity={1.5} 
        color="#c084fc" 
      />
      
      {/* Rim Light (Sharp blue electric backlight to make silhouette pop) */}
      <spotLight 
        position={[0, 5, -8]} 
        angle={0.6}
        penumbra={0.5}
        intensity={60} 
        color="#3b82f6" 
        distance={20}
        decay={2}
      />

      {/* Warm Underglow */}
      <pointLight position={[0, -5, 2]} intensity={20} color="#ec4899" decay={2} distance={15} />
    </group>
  );
};

export default Hero3DObject;