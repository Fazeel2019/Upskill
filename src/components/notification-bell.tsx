
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
import { Bell, Check, X, UserPlus, BookOpen } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { UserProfile, listenToFriendRequests, acceptFriendRequest, declineFriendRequest } from "@/services/profile";
import { Notification, listenToNotifications, markNotificationAsRead } from "@/services/notifications";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const NOTIFICATION_ICONS: { [key: string]: React.ElementType } = {
  friend_request: UserPlus,
  course_progress: BookOpen,
};

const NotificationItem = ({ notification }: { notification: Notification }) => {
    const Icon = NOTIFICATION_ICONS[notification.type] || Bell;
    
    const handleMarkAsRead = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await markNotificationAsRead(notification.id);
        } catch (error) {
            console.error("Failed to mark notification as read", error);
        }
    };
    
    return (
      <DropdownMenuItem asChild>
        <Link href={notification.link || "#"} className="flex items-start gap-3">
          <Icon className="h-4 w-4 mt-1 text-muted-foreground" />
          <div className="flex-1">
            <p className="text-sm">{notification.message}</p>
            <p className="text-xs text-muted-foreground">
              {notification.timestamp ? formatDistanceToNow(notification.timestamp.toDate(), { addSuffix: true }) : ''}
            </p>
          </div>
          {!notification.read && (
            <button onClick={handleMarkAsRead} title="Mark as read" className="h-full">
              <div className="w-2 h-2 rounded-full bg-primary mt-1" />
            </button>
          )}
        </Link>
      </DropdownMenuItem>
    )
}

export function NotificationBell() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [friendRequests, setFriendRequests] = useState<UserProfile[]>([]);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (user) {
            const unsubscribeRequests = listenToFriendRequests(user.uid, setFriendRequests);
            const unsubscribeNotifications = listenToNotifications(user.uid, setNotifications);
            return () => {
                unsubscribeRequests();
                unsubscribeNotifications();
            };
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
    
    const unreadCount = notifications.filter(n => !n.read).length + friendRequests.length;
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{unreadCount}</Badge>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96" align="end">
                 <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                 <DropdownMenuSeparator />
                 {unreadCount > 0 ? (
                    <DropdownMenuGroup className="max-h-96 overflow-y-auto">
                        {friendRequests.length > 0 && (
                           <>
                            <DropdownMenuLabel className="text-xs font-normal text-muted-foreground px-2">Friend Requests</DropdownMenuLabel>
                            {friendRequests.map(req => (
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
                            <DropdownMenuSeparator />
                           </>
                        )}
                        
                        {notifications.length > 0 && (
                            <>
                                {notifications.map(notification => (
                                    <NotificationItem key={notification.id} notification={notification} />
                                ))}
                            </>
                        )}
                    </DropdownMenuGroup>
                 ) : (
                    <p className="p-4 text-sm text-muted-foreground text-center">No new notifications</p>
                 )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
