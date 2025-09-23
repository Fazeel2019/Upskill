
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
    <svg 
      viewBox="0 0 160 80" 
      className={cn("w-auto h-10", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M68.53,13.79c-2.37-1.39-5.1-2.09-8.19-2.09c-3.2,0-6.03,0.73-8.49,2.18c-2.46,1.45-4.3,3.53-5.52,6.24 c-0.6,1.34-0.9,2.8-0.9,4.38c0,1.51,0.3,2.96,0.9,4.35c1.22,2.71,3.06,4.79,5.52,6.24c2.46,1.45,5.29,2.18,8.49,2.18 c3.09,0,5.82-0.7,8.19-2.09c2.37-1.39,4.24-3.36,5.62-5.92L62.19,28.5c-0.49,0.89-1.22,1.6-2.18,2.12 c-0.96,0.52-2.01,0.78-3.15,0.78c-1.42,0-2.73-0.34-3.93-1.03s-2.1-1.63-2.7-2.82c-0.3-0.6-0.45-1.24-0.45-1.92 c0-0.68,0.15-1.32,0.45-1.92c0.6-1.19,1.49-2.13,2.7-2.82c1.2-0.69,2.51-1.03,3.93-1.03c1.14,0,2.19,0.26,3.15,0.78 c0.96,0.52,1.69,1.23,2.18,2.12L74.15,19.7C72.77,17.15,70.9,15.18,68.53,13.79z" fill="#E53E3E"/>
        <text x="5" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#E53E3E">UP</text>
        <text x="60" y="55" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="none" stroke="white" strokeWidth="0.5">SKILL</text>
        <path d="M12.92,58.33l62.5-17.5" stroke="white" strokeWidth="1"/>
        <text x="25" y="70" fontFamily="Arial, sans-serif" fontSize="8" fill="white">Health Careers Customize For You</text>
      </g>
    </svg>
);
