
"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/use-auth";
import { addPost } from "@/services/posts";


export default function CreatePost({ onPostCreated }: { onPostCreated?: () => void }) {
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [category, setCategory] = useState<string | null>("STEM");
  const { toast } = useToast();
  const { user } = useAuth();

  const handlePost = async () => {
    if (!user) {
        toast({ title: "Please log in to post", variant: "destructive" });
        return;
    }
    if (postContent.trim().length === 0) {
        toast({ title: "Post cannot be empty", variant: "destructive" });
        return;
    }
    if (!category) {
        toast({ title: "Please select a category", variant: "destructive" });
        return;
    }
    
    setIsPosting(true);

    try {
        await addPost({
            author: {
                uid: user.uid,
                name: user.displayName || "Anonymous",
                avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
            },
            content: postContent,
            category: category as any,
        });

        toast({
            title: "Post Submitted!",
            description: "Your post is now live in the community feed.",
        });

        setPostContent("");
        setCategory("STEM");
        if (onPostCreated) onPostCreated();

    } catch (error) {
         toast({
            title: "Posting Failed",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
        });
    } finally {
        setIsPosting(false);
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src={user?.photoURL || "https://picsum.photos/seed/user-avatar/40/40"}
              alt={user?.displayName || "User"}
              data-ai-hint="person portrait"
            />
            <AvatarFallback>{user?.displayName?.split(" ").map(n => n[0]).join("") || user?.email?.[0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea
              placeholder="What's on your mind?"
              className="w-full border-none focus-visible:ring-0 shadow-none p-0"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center gap-2">
          <Select value={category || ""} onValueChange={(value) => setCategory(value)} disabled={isPosting}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="STEM">STEM</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Public Health">Public Health</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handlePost} disabled={!postContent || !category || isPosting}>
            {isPosting ? "Posting..." : "Post"}
        </Button>
      </CardFooter>
    </Card>
  );
}
