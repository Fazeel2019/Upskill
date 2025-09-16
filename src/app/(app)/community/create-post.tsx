"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { categorizePost } from "@/ai/flows/categorize-community-posts";
import { Badge } from "@/components/ui/badge";
import { Wand2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreatePost() {
  const [postContent, setPostContent] = useState("");
  const [isCategorizing, setIsCategorizing] = useState(false);
  const [category, setCategory] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCategorize = async () => {
    if (postContent.trim().length < 10) {
      toast({
        title: "Content too short",
        description: "Please write a bit more before categorizing.",
        variant: "destructive",
      });
      return;
    }
    setIsCategorizing(true);
    setCategory(null);
    try {
      const result = await categorizePost({ postContent });
      setCategory(result.category);
    } catch (error) {
      toast({
        title: "Categorization Failed",
        description: "Could not automatically categorize this post. Please select one manually.",
        variant: "destructive",
      });
    } finally {
      setIsCategorizing(false);
    }
  };

  const handlePost = () => {
    if (postContent.trim().length === 0) {
        toast({ title: "Post cannot be empty", variant: "destructive" });
        return;
    }
    if (!category) {
        toast({ title: "Please select a category", description: "You can use the AI suggestion or choose one manually.", variant: "destructive" });
        return;
    }
    
    // Logic to submit the post would go here
    toast({
      title: "Post Submitted!",
      description: "Your post is now live in the community feed.",
    });

    setPostContent("");
    setCategory(null);
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar>
            <AvatarImage
              src="https://picsum.photos/seed/user-avatar/40/40"
              alt="@shadcn"
              data-ai-hint="woman portrait"
            />
            <AvatarFallback>AL</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <Textarea
              placeholder="What's on your mind, Dr. Lovelace?"
              className="w-full border-none focus-visible:ring-0 shadow-none p-0"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 border-t">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCategorize}
            disabled={isCategorizing}
          >
            <Wand2 className="h-4 w-4 mr-2" />
            {isCategorizing ? "Thinking..." : "AI Suggest Category"}
          </Button>

          <Select value={category || ""} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px] h-9">
              <SelectValue placeholder="Select category..." />
            </SelectTrigger>
            <SelectContent>
              {category && <SelectItem value={category}>{category} (Suggested)</SelectItem>}
              <SelectItem value="STEM">STEM</SelectItem>
              <SelectItem value="Healthcare">Healthcare</SelectItem>
              <SelectItem value="Public Health">Public Health</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handlePost} disabled={!postContent || !category}>Post</Button>
      </CardFooter>
    </Card>
  );
}
