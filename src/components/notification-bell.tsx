
"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bell, Check, X } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserProfile, listenToFriendRequests, acceptFriendRequest, declineFriendRequest } from "@/services/profile";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

export function NotificationBell() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [requests, setRequests] = useState<UserProfile[]>([]);

    useEffect(() => {
        if (user) {
            const unsubscribe = listenToFriendRequests(user.uid, setRequests);
            return () => unsubscribe();
        }
    }, [user]);

    const handleAccept = async (requesterId: string) => {
      if (!user) return;
      try {
        await acceptFriendRequest(user.uid, requesterId);
        toast({ title: "Friend request accepted!" });
      } catch {
        toast({ title: "Failed to accept request", variant: "destructive" });
      }
    };

    const handleDecline = async (requesterId: string) => {
       if (!user) return;
       try {
        await declineFriendRequest(user.uid, requesterId);
        toast({ title: "Friend request declined." });
      } catch {
        toast({ title: "Failed to decline request", variant: "destructive" });
      }
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {requests.length > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{requests.length}</Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                 <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 {requests.length > 0 ? (
                    <DropdownMenuGroup>
                        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">Friend Requests</DropdownMenuLabel>
                        {requests.map(req => (
                            <DropdownMenuItem key={req.uid} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={req.photoURL} alt={req.displayName} />
                                    <AvatarFallback>{req.displayName?.[0]}</AvatarFallback>
                                </Avatar>
                                <span>{req.displayName}</span>
                            </div>
                            <div className="flex gap-1">
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); handleAccept(req.uid)}}><Check className="h-4 w-4 text-green-500" /></Button>
                                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={(e) => {e.stopPropagation(); handleDecline(req.uid)}}><X className="h-4 w-4 text-red-500" /></Button>
                            </div>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuGroup>
                 ) : (
                    <p className="p-4 text-sm text-muted-foreground text-center">No new notifications</p>
                 )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
