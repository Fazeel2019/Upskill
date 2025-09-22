
"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { searchUsers, UserProfile, sendFriendRequest, listenToFriends, listenToFriendRequests, acceptFriendRequest, declineFriendRequest, removeFriend } from "@/services/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, UserPlus, Check, Clock, Users, Search, Mail, Send, Eye, Briefcase, GraduationCap, Link2, ListFilter, UserX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const UserCard = ({ user, currentUserProfile, onAction }: { user: UserProfile, currentUserProfile: UserProfile | null, onAction: () => void }) => {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  
  const connectionStatus = currentUserProfile?.connections?.[user.uid];

  const handleAddFriend = async () => {
    if (!currentUser) return;
    try {
      await sendFriendRequest(currentUser.uid, user.uid);
      toast({
        title: "Friend Request Sent",
        description: `Your friend request to ${user.displayName} has been sent.`,
      });
      onAction();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send friend request. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleRemoveFriend = async () => {
    if (!currentUser) return;
    try {
        await removeFriend(currentUser.uid, user.uid);
        toast({ title: "Connection Removed" });
        onAction();
    } catch (error) {
        toast({ title: "Error removing connection", variant: "destructive" });
    }
  }

  let ActionButton;
  if (connectionStatus === 'connected') {
    ActionButton = <Button onClick={handleRemoveFriend} variant="secondary" size="sm"><UserX className="mr-2 h-4 w-4" />Remove</Button>;
  } else if (connectionStatus === 'pending_sent') {
    ActionButton = <Button disabled variant="secondary" size="sm"><Clock className="mr-2 h-4 w-4" />Request Sent</Button>;
  } else if (connectionStatus === 'pending_received') {
     ActionButton = <Button size="sm">Respond to Request</Button>; // Should be handled in requests tab
  } else {
    ActionButton = <Button onClick={handleAddFriend} size="sm"><UserPlus className="mr-2 h-4 w-4" />Connect</Button>;
  }

  return (
    <Card className="text-center group transition-shadow hover:shadow-lg rounded-xl">
        <CardContent className="p-6">
            <div className="flex justify-end mb-2">
                 {ActionButton}
            </div>
            <Avatar className="h-20 w-20 mx-auto border-4 border-background ring-2 ring-primary">
              <AvatarImage src={user.photoURL} alt={user.displayName} data-ai-hint="person portrait"/>
              <AvatarFallback>{user.displayName?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
            <h3 className="font-bold text-lg mt-4">{user.displayName}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 h-10">{user.title || 'Community Member'}</p>
            
             <div className="mt-4 pt-4 border-t">
                <p className="font-semibold text-sm mb-2 text-left">Skills & Expertise</p>
                <div className="space-y-2 text-left text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-primary"/>
                        <span>{user.company || 'N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-primary"/>
                        <span>{user.education?.[0]?.degree || 'N/A'}</span>
                    </div>
                     <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-primary"/>
                        <span>{Object.keys(user.connections || {}).length} connections</span>
                    </div>
                </div>
            </div>

            <Button asChild className="w-full mt-4">
                <Link href={`/profile/${user.uid}`}>View Profile</Link>
            </Button>
        </CardContent>
    </Card>
  );
}

const RequestCard = ({ user, onAction }: { user: UserProfile, onAction: () => void }) => {
    const { toast } = useToast();
    const { user: currentUser } = useAuth();

    const handleAccept = async () => {
        if (!currentUser) return;
        try {
            await acceptFriendRequest(user.uid, currentUser.uid);
            toast({ title: "Friend request accepted!" });
            onAction();
        } catch {
            toast({ title: "Failed to accept request", variant: "destructive" });
        }
    }

    const handleDecline = async () => {
        if (!currentUser) return;
        try {
            await declineFriendRequest(user.uid, currentUser.uid);
            toast({ title: "Friend request declined." });
            onAction();
        } catch {
            toast({ title: "Failed to decline request", variant: "destructive" });
        }
    }

    return (
        <Card>
            <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar>
                        <AvatarImage src={user.photoURL} alt={user.displayName} data-ai-hint="person portrait"/>
                        <AvatarFallback>{user.displayName?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                        <Link href={`/profile/${user.uid}`} className="font-semibold hover:underline">{user.displayName}</Link>
                        <p className="text-sm text-muted-foreground">{user.title || "Community Member"}</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" onClick={handleAccept}><Check className="mr-2 h-4 w-4"/>Accept</Button>
                    <Button size="sm" variant="outline" onClick={handleDecline}>Decline</Button>
                </div>
            </CardContent>
        </Card>
    );
}

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
    <Card className={cn("p-4", color)}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            {icon}
        </div>
    </Card>
)

export default function NetworkingPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [requests, setRequests] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, profile, reloadProfile } = useAuth();
  
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSearch = async (query: string) => {
    if (!user) return;
    setLoading(true);
    const users = await searchUsers(query, user.uid);
    setResults(users);
    setLoading(false);
  }

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, user]);

  useEffect(() => {
    if (user) {
      const unsubscribeFriends = listenToFriends(user.uid, setFriends);
      const unsubscribeRequests = listenToFriendRequests(user.uid, setRequests);
      return () => {
        unsubscribeFriends();
        unsubscribeRequests();
      }
    }
  }, [user]);

  const connectionCount = friends.length;
  const sentCount = profile?.connections ? Object.values(profile.connections).filter(c => c === 'pending_sent').length : 0;
  const receivedCount = requests.length;

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
        <motion.div variants={itemVariants}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Networking</h1>
                    <p className="text-muted-foreground">Expand your professional circle and manage connections</p>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input 
                            placeholder="Search members..." 
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button variant="outline">
                        <ListFilter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>
                </div>
            </div>
        </motion.div>
        
        <motion.div 
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            variants={pageVariants}
        >
            <motion.div variants={itemVariants}><StatCard title="My Connections" value={String(connectionCount)} icon={<Users className="text-blue-500"/>} color="bg-blue-50 dark:bg-blue-900/20"/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Sent Requests" value={String(sentCount)} icon={<Send className="text-green-500"/>} color="bg-green-50 dark:bg-green-900/20"/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Received Requests" value={String(receivedCount)} icon={<Mail className="text-purple-500"/>} color="bg-purple-50 dark:bg-purple-900/20"/></motion.div>
            <motion.div variants={itemVariants}><StatCard title="Profile Views" value="0" icon={<Eye className="text-orange-500"/>} color="bg-orange-50 dark:bg-orange-900/20"/></motion.div>
        </motion.div>
        
        <motion.div variants={itemVariants}>
            <Tabs defaultValue="discover">
                <TabsList>
                    <TabsTrigger value="discover">Discover</TabsTrigger>
                    <TabsTrigger value="my-network">My Network ({connectionCount})</TabsTrigger>
                    <TabsTrigger value="requests">Requests ({receivedCount})</TabsTrigger>
                </TabsList>
                <TabsContent value="discover">
                    <motion.div 
                        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                        variants={pageVariants}
                    >
                        {loading ? (
                             <div className="flex justify-center items-center py-16 col-span-3">
                                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                            </div>
                        ) : results.length > 0 ? results.map((u, index) => (
                             <motion.div key={u.uid} variants={itemVariants}>
                                <UserCard user={u} currentUserProfile={profile} onAction={reloadProfile}/>
                            </motion.div>
                        )) : (
                            <div className="col-span-3">
                                <Card>
                                    <CardContent className="p-8 text-center text-muted-foreground">
                                        No members found matching your search.
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </motion.div>
                </TabsContent>
                 <TabsContent value="my-network">
                      {friends.length > 0 ? (
                        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" variants={pageVariants}>
                            {friends.map((friend) => (
                                <motion.div key={friend.uid} variants={itemVariants}>
                                    <UserCard user={friend} currentUserProfile={profile} onAction={reloadProfile} />
                                </motion.div>
                            ))}
                        </motion.div>
                      ) : (
                        <Card className="mt-6">
                            <CardContent className="p-8 text-center text-muted-foreground">
                                Your network will appear here. Start by connecting with people in the Discover tab.
                            </CardContent>
                        </Card>
                      )}
                    </TabsContent>
                    <TabsContent value="requests">
                        {requests.length > 0 ? (
                            <div className="space-y-4 mt-6">
                                {requests.map(req => (
                                    <RequestCard key={req.uid} user={req} onAction={reloadProfile} />
                                ))}
                            </div>
                        ) : (
                             <Card className="mt-6">
                                <CardContent className="p-8 text-center text-muted-foreground">
                                    Connection requests will appear here.
                                </CardContent>
                            </Card>
                        )}
                    </TabsContent>
            </Tabs>
        </motion.div>
    </motion.div>
  );
}
