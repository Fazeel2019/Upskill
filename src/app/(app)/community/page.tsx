

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deletePost, type Post as PostType } from "@/services/posts";
import { MessageCircle, Heart, Share2, MoreHorizontal, Users, Loader2, Search, Trash2 } from "lucide-react";
import CreatePost from "./create-post";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listenToPosts } from "@/services/posts";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useToast } from "@/hooks/use-toast";


function Post({ post }: { post: PostType }) {
  const { toast } = useToast();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  const categoryColors = {
    STEM: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
    Healthcare: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    "Public Health": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
  };

  const timestamp = post.timestamp?.toDate() 
    ? `${formatDistanceToNow(post.timestamp.toDate())} ago` 
    : "Just now";
    
  const { user, profile } = useAuth();
  
  const profileLink = user?.uid === post.author.uid ? "/profile" : `/profile/${post.author.uid}`;

  const handleDeletePost = async () => {
    if (!post.id) return;
    try {
      await deletePost(post.id);
      toast({ title: "Post deleted successfully" });
    } catch (error) {
      toast({ title: "Failed to delete post", variant: "destructive" });
    }
    setShowDeleteAlert(false);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href={profileLink}>
              <Avatar>
                <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="people portrait" />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div>
               <Link href={profileLink}>
                  <p className="font-semibold hover:underline">{post.author.name}</p>
              </Link>
              <p className="text-sm text-muted-foreground">
                {`@${post.author.name.toLowerCase().replace(/ /g,'')}`} &middot; {timestamp}
              </p>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {profile?.role === 'admin' && (
                <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
                  <AlertDialogTrigger asChild>
                     <DropdownMenuItem onSelect={(e) => e.preventDefault()} className="text-destructive">
                       <Trash2 className="mr-2 h-4 w-4" />
                        Delete Post
                     </DropdownMenuItem>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the post.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeletePost} className="bg-destructive hover:bg-destructive/90">
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Heart className="h-4 w-4" /> {post.likes || 0}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> {post.comments || 0}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" /> Share
          </Button>
        </div>
        <div
          className={`px-2 py-1 text-xs font-medium rounded-md border ${categoryColors[post.category]}`}
        >
          {post.category}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToPosts((newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const handlePostCreated = () => {
    // Optionally re-fetch or scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
  };

  const filteredPosts = posts.filter(post => 
    activeTab === 'all' || (post.category && post.category.toLowerCase().replace(' ','-') === activeTab)
  );

  return (
    <motion.div 
      className="max-w-3xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-bold tracking-tight font-headline mb-2">Community Feed</h1>
          <p className="text-muted-foreground mb-8">Share insights, ask questions, and engage with a global network of professionals.</p>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <CreatePost onPostCreated={handlePostCreated}/>
        </motion.div>

        <motion.div className="my-8 flex justify-between items-center" variants={itemVariants}>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="stem">STEM</TabsTrigger>
                  <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                  <TabsTrigger value="public-health">Public Health</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button asChild variant="outline">
              <Link href="/community/find">
                <Search className="mr-2 h-4 w-4" /> Find Members
              </Link>
            </Button>
        </motion.div>

        <motion.div 
          className="space-y-6"
          variants={containerVariants}
        >
            {loading ? (
                <div className="flex justify-center items-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                    <Post post={post} />
                </motion.div>
                ))
            ) : (
                <motion.div variants={itemVariants} className="text-center py-16">
                    <Card className="max-w-md mx-auto">
                        <CardContent className="p-8 text-center">
                            <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                            <h3 className="font-semibold text-lg">No Posts Yet</h3>
                            <p className="text-muted-foreground mt-2">
                                The feed for '{activeTab}' is quiet. Be the first to share something!
                            </p>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
        </motion.div>
    </motion.div>
  );
}
