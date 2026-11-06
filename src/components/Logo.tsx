import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
  showWordmark?: boolean;
  wordmarkClassName?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 28,
  className = '',
  showWordmark = false,
  wordmarkClassName = '',
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200"
      >
        {/* Sage Brand Background Tile */}
        <rect width="32" height="32" rx="9" fill="#667267" />
        
        {/* Continuous Flow S-Curve Stroke */}
        <path
          d="M19.5 8.5H12C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5H20C21.933 15.5 23.5 17.067 23.5 19C23.5 20.933 21.933 22.5 20 22.5H12.5"
          stroke="#FAF9F5"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Dual Ledger Balance Nodes in Warm Gold */}
        <circle cx="21" cy="10.5" r="1.75" fill="#B18B58" />
        <circle cx="11" cy="20.5" r="1.75" fill="#B18B58" />
      </svg>

      {showWordmark && (
        <span
          className={`font-bold tracking-tight text-[#252922] ${
            wordmarkClassName || 'text-xl'
          }`}
        >
          STROKA
        </span>
      )}
    </div>
  );
};
