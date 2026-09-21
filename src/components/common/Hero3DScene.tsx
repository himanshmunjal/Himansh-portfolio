import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Hero3DObject from './Hero3DObject';

interface Hero3DSceneProps {
  isMobile: boolean;
  /** Stop rendering entirely (e.g. hero scrolled out of view). */
  paused: boolean;
  scrollProgress: number;
}

// Kept in its own module so three.js + drei are only fetched after first paint.
const Hero3DScene: React.FC<Hero3DSceneProps> = ({ isMobile, paused, scrollProgress }) => (
  <Canvas
    camera={{ position: [0, 0, 8], fov: 45 }}
    dpr={isMobile ? [1, 1.5] : [1, 2]}
    performance={{ min: 0.5 }}
    frameloop={paused ? 'never' : isMobile ? 'demand' : 'always'}
  >
    <Environment preset="city" />
    <Hero3DObject scrollProgress={scrollProgress} />
  </Canvas>
);

export default Hero3DScene;
