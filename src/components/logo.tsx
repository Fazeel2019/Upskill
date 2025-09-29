
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/logo.png"
            alt="Upskill Logo"
            width={320}
            height={160}
            className={cn("h-40 w-80", className)}
        />
    );
};
