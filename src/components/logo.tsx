import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative h-24 w-48", className)}>
            <svg viewBox="0 0 330 140" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <defs>
                    <clipPath id="swoosh-clip">
                        <rect x="10" y="20" width="130" height="60" />
                    </clipPath>
                    <linearGradient id="gradient-red" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#F87171', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#DC2626', stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                {/* Eagle Icon */}
                <g clipPath="url(#swoosh-clip)">
                    <path d="M 125,25 C 120,30 110,40 100,50 C 90,60 80,70 70,75 C 60,80 50,80 40,75 C 30,70 20,60 15,55"
                        fill="none" stroke="url(#gradient-red)" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 125,25 C 128,35 129,45 125,55 C 121,65 115,75 105,80"
                        fill="none" stroke="url(#gradient-red)" strokeWidth="8" strokeLinecap="round" />
                </g>

                {/* Diagonal Slash */}
                <line x1="148" y1="20" x2="168" y2="80" stroke="hsl(var(--primary))" strokeWidth="6" strokeLinecap="round" />

                {/* Text: UP */}
                <text x="175" y="65" fontFamily="--font-headline, sans-serif" fontSize="60" fontWeight="bold" fill="hsl(var(--primary))" textAnchor="start">
                    UP
                </text>

                {/* Text: SKILL */}
                <text x="285" y="65" fontFamily="--font-headline, sans-serif" fontSize="60" fontWeight="bold" fill="hsl(var(--foreground))" textAnchor="end">
                    SKILL
                </text>
                
                {/* Health Careers Customize For You */}
                 <text x="170" y="100" fontFamily="--font-body, sans-serif" fontSize="12" fontWeight="500" fill="hsl(var(--muted-foreground))" letterSpacing="0.5">
                    Health Careers Customize For You
                </text>
            </svg>
        </div>
    );
};
