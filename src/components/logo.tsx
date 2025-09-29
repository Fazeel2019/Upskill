
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative w-48 h-24", className)}>
            <Image
                src="/logo.png"
                alt="Upskill Logo"
                fill
                style={{objectFit: "contain"}}
                priority
            />
        </div>
    );
};
