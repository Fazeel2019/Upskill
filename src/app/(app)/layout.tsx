
"use client";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/user-nav";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Home,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  User,
  PanelLeft,
  Shield,
  GraduationCap,
  MicVocal,
  Network,
  Rocket,
  Search,
  HelpCircle,
  Bell,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { NotificationBell } from "@/components/notification-bell";
import { Logo } from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { listenToFriendRequests } from "@/services/profile";
import { listenToNotifications } from "@/services/notifications";


export default function AppLayout({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  const pathname = usePathname();
  const { user, profile, loading } = useAuth();
  const [friendRequestCount, setFriendRequestCount] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    if (user) {
      const unsubscribeRequests = listenToFriendRequests(user.uid, (requests) => {
        setFriendRequestCount(requests.length);
      });
      const unsubscribeNotifications = listenToNotifications(user.uid, (notifications) => {
        setNotificationCount(notifications.filter(n => !n.read).length);
      });

      return () => {
        unsubscribeRequests();
        unsubscribeNotifications();
      };
    }
  }, [user]);

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: Home },
    { href: "/learning", label: "Learning", icon: GraduationCap },
    { href: "/podcast", label: "Podcasts", icon: MicVocal },
    { href: "/community", label: "Community", icon: Users, badge: friendRequestCount },
    { href: "/events", label: "Events", icon: Calendar },
    { href: "/networking", label: "Networking", icon: Network },
    { href: "/messaging", label: "Messages", icon: MessageSquare, badge: notificationCount },
    { href: "/profile", label: "Profile", icon: User },
  ];

  if (loading) {
    return (
       <div className="flex h-screen w-full">
        <div className="hidden md:flex flex-col gap-4 p-4 border-r w-64">
            <Skeleton className="h-10 w-48" />
            <div className="space-y-2 mt-4">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-full" />
            </div>
        </div>
        <div className="flex-1">
            <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
                 <Skeleton className="h-8 w-8" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-8 w-8 rounded-full" />
                </div>
            </header>
            <main className="p-8">
                <Skeleton className="h-96 w-full" />
            </main>
        </div>
      </div>
    );
  }

  if (!user) return null; // Or a redirect component

  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center justify-between p-2">
            <Logo className="w-auto h-10 text-primary" />
            <SidebarTrigger className="group-data-[collapsible=icon]:hidden">
                <ChevronLeft />
            </SidebarTrigger>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span className="flex-grow">{item.label}</span>
                    {item.badge && item.badge > 0 ? <Badge variant="secondary" className="group-data-[active=true]:bg-white/20 group-data-[active=true]:text-white">{item.badge}</Badge> : null}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {profile?.role === 'admin' && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith('/admin')}
                  tooltip="Admin Panel"
                >
                  <Link href="/admin">
                    <Shield />
                    <span className="flex-grow">Admin Panel</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Card className="m-2 bg-green-500/10 border-green-500/20 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:border-none">
            <CardContent className="p-3 group-data-[collapsible=icon]:p-2 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                <div className="flex items-center gap-2">
                    <div className="p-1 bg-green-500 rounded-md">
                        <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div className="group-data-[collapsible=icon]:hidden">
                        <p className="text-sm font-semibold">Premium Member</p>
                        <p className="text-xs text-muted-foreground">All features unlocked</p>
                    </div>
                </div>
                <div className="mt-2 group-data-[collapsible=icon]:hidden">
                    <p className="text-xs text-muted-foreground mb-1">Career Progress: 75%</p>
                    <Progress value={75} className="h-1" />
                </div>
            </CardContent>
          </Card>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-sm sm:px-8">
          <SidebarTrigger className="md:hidden">
            <PanelLeft />
          </SidebarTrigger>
          <div className="relative w-full max-w-sm hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
            <Input placeholder="Search courses, mentors, discussions..." className="pl-9 bg-muted/50"/>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="hidden md:flex"><HelpCircle className="mr-2"/>Help</Button>
            <Button variant="ghost" size="sm" asChild className="hidden md:flex"><Link href="/events"><Calendar className="mr-2"/>Events</Link></Button>
            <NotificationBell />
            <UserNav />
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
