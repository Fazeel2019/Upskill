
import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const Logo = ({ className }: { className?: string }) => {
    return (
        <div className={cn("relative", className)}>
            <Image
                src="/logo.png"
                alt="Upskill Logo"
                width={192}
                height={96}
                style={{objectFit: "contain"}}
                priority
                className="w-auto h-10"
            />
        </div>
    );
};
