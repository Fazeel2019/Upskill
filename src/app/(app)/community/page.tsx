
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Post as PostType } from "@/services/posts";
import { MessageCircle, Heart, Share2, MoreHorizontal, Users, Loader2 } from "lucide-react";
import CreatePost from "./create-post";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listenToPosts } from "@/services/posts";
import { formatDistanceToNow } from "date-fns";

function Post({ post }: { post: PostType }) {
  const categoryColors = {
    STEM: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
    Healthcare: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    "Public Health": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
  };

  const timestamp = post.timestamp?.toDate() 
    ? `${formatDistanceToNow(post.timestamp.toDate())} ago` 
    : "Just now";

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={post.author.avatarUrl} alt={post.author.name} data-ai-hint="people portrait" />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">
                {`@${post.author.name.toLowerCase().replace(/ /g,'')}`} &middot; {timestamp}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-5 w-5" />
          </Button>
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
    activeTab === 'all' || post.category.toLowerCase().replace(' ','-') === activeTab
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
          <CreatePost />
        </motion.div>

        <motion.div className="my-8" variants={itemVariants}>
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <TabsList>
                <TabsTrigger value="all">All Posts</TabsTrigger>
                <TabsTrigger value="stem">STEM</TabsTrigger>
                <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
                <TabsTrigger value="public-health">Public Health</TabsTrigger>
            </TabsList>
            </Tabs>
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
