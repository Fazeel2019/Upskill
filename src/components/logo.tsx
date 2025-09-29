import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <Image
            src="/logo.png"
            alt="Upskill Logo"
            width={150}
            height={75}
            className={cn("w-36 h-auto", className)}
        />
    );
};
