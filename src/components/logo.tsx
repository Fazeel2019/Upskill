
import React from 'react';
import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => {
    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src="/logo.png"
            alt="Upskill Logo"
            width={256} // 16rem
            height={128}  // 8rem
            className={cn("h-32 w-64", className)}
        />
    );
};
