import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 350 100"
    className={cn("text-foreground", className)}
    aria-label="Upskill Logo"
  >
    <defs>
      <style>
        {`
          .upskill-red { fill: hsl(var(--primary)); }
          .upskill-white { fill: hsl(var(--primary-foreground)); }
          .upskill-black { fill: hsl(var(--foreground)); }
          @media (prefers-color-scheme: light) {
            .upskill-white { fill: hsl(var(--foreground)); }
            .upskill-black { fill: hsl(var(--primary-foreground)); }
          }
        `}
      </style>
    </defs>
    
    <g transform="translate(0, 5)">
      {/* Bird */}
      <path 
        className="upskill-red"
        d="M198.7,2.2c-2.4,1-4.5,2.4-6.3,4.2c-1.3,1.3-2.4,2.9-3.3,4.6c-0.6,1.2-1,2.5-1.3,3.8c-0.4,1.9-0.5,3.8-0.2,5.7 c0.3,1.6,0.9,3.1,1.8,4.5c0.8,1.3,1.8,2.4,3,3.4c1.6,1.3,3.5,2.3,5.5,2.8c-1.2,0.1-2.4,0.3-3.6,0.6c-2.5,0.7-4.8,1.9-6.9,3.5 c-2,1.5-3.8,3.4-5.2,5.5c-1,1.5-1.9,3.2-2.5,5c-0.7,1.9-1.1,4-1.2,6c-0.1,2.8,0.2,5.6,1,8.2c0.5,1.6,1.2,3.1,2,4.5 c1.5,2.6,3.6,4.8,6.1,6.5c-3.1-0.2-6.1-0.8-9-1.8c-2.4-0.9-4.7-2-6.8-3.5c-1.1-0.8-2.2-1.7-3.2-2.6c-0.5-0.5-1-0.9-1.5-1.4 c-0.9-0.8-1.8-1.6-2.6-2.4c-0.5-0.5-1-1-1.5-1.5c-1-1-1.9-2.1-2.8-3.2c-0.7-0.9-1.4-1.8-2-2.7c-0.5-0.7-1-1.4-1.4-2.1 c-1-1.6-1.8-3.3-2.4-5c-0.6-1.7-1.1-3.5-1.3-5.3c-0.1-1-0.2-2-0.2-3c-0.1-2.5,0.2-5,0.8-7.4c0.5-1.9,1.2-3.8,2.2-5.5 c1-1.8,2.2-3.4,3.7-4.9c1.2-1.2,2.5-2.2,4-3.1c1.3-0.8,2.7-1.4,4.1-2c0.8-0.3,1.6-0.6,2.4-0.8c1.3-0.4,2.6-0.7,4-0.9 c1-0.1,2-0.2,3-0.2c0.6,0,1.2,0,1.8,0.1c0.5,0,1,0.1,1.5,0.2c2,0.3,3.9,0.9,5.8,1.8c1.3,0.6,2.5,1.3,3.7,2.1 c0.5,0.3,1,0.7,1.5,1c0.7,0.5,1.3,1,1.9,1.6c0.4,0.4,0.7,0.7,1.1,1.1c1.1,1.2,2,2.5,2.7,4c0.1,0.2,0.2,0.4,0.3,0.6 c-0.6-0.8-1.3-1.6-2-2.3c-1.2-1.2-2.5-2.2-4-3.1C205.1,3.4,202,2.7,198.7,2.2z"
      />

      {/* Text */}
      <text y="70" fontFamily="Arial, sans-serif" fontWeight="bold" letterSpacing="-2">
        <tspan className="upskill-red" fontSize="60">UP</tspan>
        <tspan className="upskill-white" fontSize="58" stroke="hsl(var(--background))" strokeWidth="1.2">SKILL</tspan>
      </text>

      {/* Swoosh */}
      <line x1="45" y1="58" x2="200" y2="40" stroke="hsl(var(--background))" strokeWidth="8" />
      <path d="M 45 58 L 200 40" className="upskill-red" stroke="hsl(var(--primary))" strokeWidth="4" />
      
      {/* Tagline */}
      <text x="5" y="95" className="upskill-white" fontSize="16" fontFamily="Arial, sans-serif" fontWeight="normal" letterSpacing="0">Health Careers Customize For You</text>
    </g>
  </svg>
);
