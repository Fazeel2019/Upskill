
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 200 50"
    className={cn("text-foreground", className)}
    aria-label="Upskill Logo"
  >
    <style>
        {`
          .logo-fill { fill: currentColor; }
        `}
    </style>
    <text 
      x="0" 
      y="40" 
      fontFamily="'Space Grotesk', sans-serif" 
      fontSize="45" 
      fontWeight="bold" 
      letterSpacing="-2"
      className="logo-fill"
    >
      <tspan fill="hsl(var(--primary))">Up</tspan>
      <tspan>skill</tspan>
    </text>
  </svg>
);
