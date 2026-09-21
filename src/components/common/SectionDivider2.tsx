import React from "react";
import ParticleCanvas from "@/components/common/ParticleCanvas";

const PARTICLE_COLORS = ["rgba(168, 85, 247, 0.6)"];
const PARTICLE_SIZE: [number, number] = [1, 3];

const ParticleWaveDivider = () => (
  <div className="relative h-28 overflow-hidden" aria-hidden="true">
    <ParticleCanvas
      variant="fall"
      count={40}
      size={PARTICLE_SIZE}
      colors={PARTICLE_COLORS}
      speed={0.5}
      className="absolute inset-0 w-full h-full"
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/10 to-transparent" />
  </div>
);

export default ParticleWaveDivider;
