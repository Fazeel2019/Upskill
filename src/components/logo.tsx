
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/logo.png"
            alt="Upskill Logo"
            width={140}
            height={100}
            className={cn("h-30 w-25", className)}
        />
    );
};
