import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative h-16 w-64", className)}>
            <Image
                src="/logo.png"
                alt="Upskill Logo"
                fill
                sizes="256px"
                style={{ objectFit: 'contain' }}
            />
        </div>
    );
};
