import React from "react";

const GradientBeamDivider = ({ color = "purple" }) => {
  const colors = {
    purple: "from-purple-500 via-pink-500 to-blue-500",
    cyan: "from-cyan-500 via-blue-500 to-purple-500",
    pink: "from-pink-500 via-purple-500 to-indigo-500",
  };

  return (
    <div className="relative h-24 flex items-center justify-center overflow-hidden">
      <div
        className={`absolute w-full h-[3px] bg-gradient-to-r ${colors[color]} animate-gradient`}
      />

      <div
        className={`absolute w-full h-[40px] blur-2xl opacity-40 bg-gradient-to-r ${colors[color]}`}
      />

      <style>
        {`
        @keyframes gradientMove {
          0% { background-position: 0% }
          100% { background-position: 200% }
        }

        .animate-gradient {
          background-size: 200%;
          animation: gradientMove 4s linear infinite;
        }
        `}
      </style>
    </div>
  );
};

export default GradientBeamDivider;