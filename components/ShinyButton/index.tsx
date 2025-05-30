'use client'

import React from "react";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export const ShinyButton: React.FC<ShinyTextProps> = ({
                                                 text,
                                                 disabled = false,
                                                 speed = 5,
                                                 className = "",
                                               }) => {
  const animationDuration = `${speed}s`;
  
  return (
    <button
      disabled={disabled}
      className={`    
      hover:scale-110
        cursor-pointer
        bg-white dark:bg-[#111]
        border border-gray-300 dark:border-[#353535]
        rounded-lg
        p-2.5
        transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed
        inline-flex items-center justify-center
      `}
    >
      <span
        className={`
          text-[#333] bg-clip-text dark:text-[#aaa]
          ${disabled ? "" : "animate-shine"}
          ${className}
        `}
        style={{
          lineHeight: 'normal',
          backgroundImage:
            "linear-gradient(120deg, #fff0 40%, #fffc, #fff0 60%)",
          backgroundSize: "200% 100%",
          WebkitBackgroundClip: "text",
          animationDuration,
        }}
      >
        {text}
      </span>
    </button>
  );
};

