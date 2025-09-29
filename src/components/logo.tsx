
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/logo.png"
            alt="Upskill Logo"
            className={cn("h-12 w-auto", className)}
        />
    );
};
