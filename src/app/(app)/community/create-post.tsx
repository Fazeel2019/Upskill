
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function CreatePost({ onPostCreated, children }: { onPostCreated?: () => void, children: React.ReactNode }) {
  const [postContent, setPostContent] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [category, setCategory] = useState<string>("STEM");
  const [open, setOpen] = useState(false);
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
        setOpen(false);

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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
          <DialogDescription>
            Share your thoughts, ask questions, and engage with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
            <Textarea
              placeholder="What's on your mind?"
              className="w-full min-h-[120px]"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              disabled={isPosting}
            />
            <Select value={category} onValueChange={(value) => setCategory(value)} disabled={isPosting}>
                <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select a category..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="STEM">STEM</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="secondary" disabled={isPosting}>
                    Cancel
                </Button>
            </DialogClose>
            <Button onClick={handlePost} disabled={!postContent || !category || isPosting}>
                {isPosting ? "Posting..." : "Post"}
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    