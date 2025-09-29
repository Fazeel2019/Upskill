
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative h-10", className)}>
            <Image
                src="/logo.png"
                alt="Upskill Logo"
                width={192}
                height={192}
                style={{objectFit: "contain", height: '100%', width: 'auto'}}
                priority
            />
        </div>
    );
};
