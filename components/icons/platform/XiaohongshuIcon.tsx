import React from "react";

interface XiaohongshuLogoProps {
  size?: number;
  className?: string;
}

const XiaohongshuLogo: React.FC<XiaohongshuLogoProps> = ({
                                                           className = "",
                                                         }) => {
  return (
    <svg
      width="2em"
      height="2em"
      viewBox="0 0 256 256"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Xiaohongshu Logo"
    >
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="3.5rem"
        fontWeight="bold"
        fill="white"
        fontFamily="'Arial Black', 'Arial Bold', sans-serif"
      >
        小红书
      </text>
    </svg>
  );
};

export default XiaohongshuLogo;
