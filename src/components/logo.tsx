
import React from 'react';
import { cn } from '@/lib/utils';
import { Grid } from 'lucide-react';

export const Logo = ({ className }: { className?: string }) => (
    <div className={cn("flex items-center justify-center bg-primary rounded-lg p-2", className)}>
        <Grid className="w-5 h-5 text-primary-foreground"/>
    </div>
);
