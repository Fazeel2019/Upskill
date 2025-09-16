
"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { searchUsers, updateUserProfile, type UserProfile } from "@/services/profile";
import { Loader2, User, Shield, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";

function UserCard({ user, onRoleChange }: { user: UserProfile, onRoleChange: (uid: string, isAdmin: boolean) => void }) {
  const { user: currentUser } = useAuth();
  const [isAdmin, setIsAdmin] = useState(user.role === "admin");
  
  const handleRoleChange = async (checked: boolean) => {
    setIsAdmin(checked);
    onRoleChange(user.uid, checked);
  };

  return (
    <Card>
      <CardContent className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage src={user.photoURL} alt={user.displayName} data-ai-hint="person portrait" />
            <AvatarFallback>{user.displayName?.split(" ").map(n => n[0]).join("")}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{user.displayName}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor={`admin-switch-${user.uid}`} className="text-muted-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span>Admin</span>
          </Label>
          <Switch
            id={`admin-switch-${user.uid}`}
            checked={isAdmin}
            onCheckedChange={handleRoleChange}
            disabled={user.uid === currentUser?.uid}
            aria-label="Admin toggle"
          />
        </div>
      </CardContent>
    </Card>
  );
}


export default function ManageUsers() {
  const { toast } = useToast();
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchUsers = async (query: string) => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const results = await searchUsers(query, currentUser.uid);
      setUsers(results);
    } catch (error) {
      toast({ title: "Error", description: "Failed to fetch users.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(searchQuery);
  }, [searchQuery, currentUser]);

  const handleRoleChange = async (uid: string, isAdmin: boolean) => {
    try {
      await updateUserProfile(uid, { role: isAdmin ? "admin" : undefined });
      toast({ title: "Success", description: "User role updated successfully." });
       // Optimistically update local state
       setUsers(prevUsers => prevUsers.map(u => u.uid === uid ? {...u, role: isAdmin ? 'admin' : undefined} : u));
    } catch (error) {
      toast({ title: "Error", description: "Failed to update user role.", variant: "destructive" });
      // Revert optimistic update on failure
      fetchUsers(searchQuery);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage User Roles</CardTitle>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search users by name or email..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? <div className="flex justify-center p-8"><Loader2 className="animate-spin" /></div> :
         users.length > 0 ? (
            <div className="space-y-4">
              {users.map(user => (
                <UserCard key={user.uid} user={user} onRoleChange={handleRoleChange} />
              ))}
            </div>
         ) : (
            <p className="text-muted-foreground text-center p-8">No users found.</p>
         )}
      </CardContent>
    </Card>
  );
}

