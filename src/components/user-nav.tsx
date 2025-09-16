
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
import { CreditCard, LogOut, Settings, User, UserPlus, Check, X } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { UserProfile, listenToFriendRequests, acceptFriendRequest, declineFriendRequest } from "@/services/profile";
import { useToast } from "@/hooks/use-toast";

function FriendRequests() {
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

    if (requests.length === 0) return null;

    return (
        <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Friend Requests</DropdownMenuLabel>
            <DropdownMenuGroup>
                {requests.map(req => (
                    <DropdownMenuItem key={req.uid} className="flex justify-between items-center">
                       <div className="flex items-center gap-2">
                         <Avatar className="h-6 w-6">
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
        </>
    )
}

export function UserNav() {
  const { user } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.photoURL || "https://picsum.photos/seed/user-avatar/40/40"}
              alt={user.displayName || "User"}
              data-ai-hint="woman portrait"
            />
            <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || 'User'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <FriendRequests />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
