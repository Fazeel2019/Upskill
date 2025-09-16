
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/use-auth";
import { searchUsers, UserProfile, sendFriendRequest } from "@/services/profile";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, UserPlus, Check, Clock, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { motion } from "framer-motion";

function UserCard({ user, currentUserProfile, onFriendRequestSent }: { user: UserProfile, currentUserProfile: UserProfile | null, onFriendRequestSent: () => void }) {
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
      onFriendRequestSent();
    } catch (error) {
      toast({
        title: "Error",
        description: "Could not send friend request. Please try again.",
        variant: "destructive",
      });
    }
  };

  let FriendButton;
  if (connectionStatus === 'connected') {
    FriendButton = <Button disabled variant="secondary"><Check className="mr-2 h-4 w-4" />Friends</Button>;
  } else if (connectionStatus === 'pending_sent') {
    FriendButton = <Button disabled variant="secondary"><Clock className="mr-2 h-4 w-4" />Request Sent</Button>;
  } else if (connectionStatus === 'pending_received') {
     FriendButton = <Button disabled>Respond to Request</Button>;
  } else {
    FriendButton = <Button onClick={handleAddFriend}><UserPlus className="mr-2 h-4 w-4" />Add Friend</Button>;
  }

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href={`/profile/${user.uid}`}>
            <Avatar>
              <AvatarImage src={user.photoURL} alt={user.displayName} data-ai-hint="person portrait"/>
              <AvatarFallback>{user.displayName?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/profile/${user.uid}`}>
                <p className="font-semibold hover:underline">{user.displayName}</p>
            </Link>
            <p className="text-sm text-muted-foreground">{user.email || 'Community Member'}</p>
          </div>
        </div>
        {FriendButton}
      </CardContent>
    </Card>
  );
}

export default function FindMembersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searched, setSearched] = useState(true);
  const { user, profile, reloadProfile } = useAuth();

  useEffect(() => {
    const performSearch = async () => {
        if (!user) return;
        setLoading(true);
        setSearched(true);
        const users = await searchUsers(searchQuery, user.uid);
        setResults(users);
        setLoading(false);
    }
    
    // Initial fetch
    performSearch();
    
    const handler = setTimeout(() => {
        performSearch();
    }, 500); // Debounce search

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, user]);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div initial="hidden" animate="visible" variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Find Members</h1>
        <p className="text-muted-foreground mb-6">Search for other professionals in the community by name or email.</p>
        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="text-lg p-6"
        />
      </motion.div>

      <div className="mt-8">
        {loading && (
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        )}

        {!loading && searched && results.length === 0 && (
          <motion.div initial="hidden" animate="visible" variants={itemVariants} className="text-center py-16">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-8 text-center">
                <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No Members Found</h3>
                <p className="text-muted-foreground mt-2">
                  {searchQuery ? `No users matched your search for "${searchQuery}".` : "There are no other users in the community yet."}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {!loading && results.length > 0 && (
          <motion.div className="space-y-4" initial="hidden" animate="visible" variants={containerVariants}>
            {results.map((u) => (
              <motion.div key={u.uid} variants={itemVariants}>
                <UserCard user={u} currentUserProfile={profile} onFriendRequestSent={reloadProfile}/>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
