
import React from 'react';
import { cn } from '@/lib/utils';
import { Briefcase } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center bg-blue-600 rounded-lg p-2", className)}>
        <Briefcase className="w-5 h-5 text-white"/>
    </div>
);
