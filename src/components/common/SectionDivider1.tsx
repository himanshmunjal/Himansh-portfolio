import React from "react";

const NeonPulseDivider = ({ color = "purple" }) => {
  const colorMap = {
    cyan: "from-cyan-500/20 via-cyan-400/40 to-cyan-500/20",
    purple: "from-purple-500/20 via-purple-400/40 to-purple-500/20",
    pink: "from-pink-500/20 via-pink-400/40 to-pink-500/20",
    blue: "from-blue-500/20 via-blue-400/40 to-blue-500/20",
  };

  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <div
        className={`absolute w-full h-[2px] bg-gradient-to-r ${colorMap[color]} animate-pulse`}
      />

      <div
        className={`absolute w-32 h-32 rounded-full blur-3xl bg-gradient-to-r ${colorMap[color]} opacity-30`}
      />
    </div>
  );
};

export default NeonPulseDivider;