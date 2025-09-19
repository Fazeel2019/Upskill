
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { deletePost, type Post as PostType, toggleLike } from "@/services/posts";
import { MessageSquare, Heart, MoreHorizontal, Users, Loader2, Search, Trash2, Send, Filter, Plus, MessageCircle as MessageCircleIcon, Users as UsersIcon, GitCommitHorizontal, Award, Box } from "lucide-react";
import CreatePost from "./create-post";
import { motion } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
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
import { listenToComments, addComment, type Comment } from "@/services/comments";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function CommentSection({ post }: { post: PostType }) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!post.id) return;
    const unsubscribe = listenToComments(post.id, setComments);
    return () => unsubscribe();
  }, [post.id]);

  const handleSubmitComment = async () => {
    if (!user || !post.id || !newComment.trim()) return;

    setIsSubmitting(true);
    try {
      await addComment(post.id, {
        author: {
          uid: user.uid,
          name: user.displayName || "Anonymous",
          avatarUrl: user.photoURL || `https://picsum.photos/seed/${user.uid}/40/40`,
        },
        content: newComment,
      });
      setNewComment("");
    } catch (error) {
      toast({ title: "Failed to post comment", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-4 mt-4 border-t">
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start gap-3">
            <div className="flex-1 bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{comment.author.name}</p>
                <p className="text-xs text-muted-foreground">
                  {comment.timestamp ? formatDistanceToNow(comment.timestamp.toDate(), { addSuffix: true }) : 'Just now'}
                </p>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      {user && (
        <div className="mt-4 flex gap-2">
          <form onSubmit={(e) => { e.preventDefault(); handleSubmitComment(); }} className="flex-1 flex gap-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" size="icon" disabled={isSubmitting || !newComment.trim()}>
              {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}


function Post({ post }: { post: PostType }) {
  const { toast } = useToast();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const { user, profile } = useAuth();
  
  const isLiked = useMemo(() => {
    if (!user || !post.likedBy) return false;
    return post.likedBy.includes(user.uid);
  }, [user, post.likedBy]);


  const categoryColors: {[key: string]: string} = {
    STEM: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800",
    Healthcare: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800",
    "Public Health": "bg-red-100 text-red-800 border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-800",
    "Leadership": "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:border-yellow-800"
  };

  const timestamp = post.timestamp?.toDate() 
    ? `${formatDistanceToNow(post.timestamp.toDate())} ago` 
    : "Just now";
    
  
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
  
  const handleLike = async () => {
      if (!user || !post.id) return;
      try {
          await toggleLike(post.id, user.uid);
      } catch (error) {
          toast({ title: "Failed to like post", variant: "destructive" });
      }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
               <Link href={profileLink}>
                  <p className="font-semibold hover:underline">{post.author.name}</p>
              </Link>
              <p className="text-sm text-muted-foreground">
                {`@${post.author.name.toLowerCase().replace(/ /g,'')}`} &middot; {timestamp}
              </p>
            </div>
          </div>
          {(user?.uid === post.author.uid || profile?.role === 'admin') && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
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
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-wrap">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-4 text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={handleLike}>
            <Heart className={`h-4 w-4 ${isLiked ? 'text-red-500 fill-current' : ''}`} /> {post.likeCount || 0}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setShowComments(!showComments)}>
            <MessageCircleIcon className="h-4 w-4" /> {post.commentCount || 0}
          </Button>
        </div>
        <div
          className={`px-2 py-1 text-xs font-medium rounded-md border ${categoryColors[post.category] || categoryColors['STEM']}`}
        >
          {post.category}
        </div>
      </CardFooter>
      {showComments && <CardContent><CommentSection post={post} /></CardContent>}
    </Card>
  );
}

const StatCard = ({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) => (
    <Card className={`p-4 ${color}`}>
        <div className="flex justify-between items-center">
            <div>
                <p className="text-sm text-muted-foreground">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
            {icon}
        </div>
    </Card>
)

const CategoriesWidget = ({ posts }: { posts: PostType[] }) => {
    const categories = useMemo(() => {
        const counts: {[key: string]: number} = {
            'STEM': 0,
            'Healthcare': 0,
            'Public Health': 0,
        };
        posts.forEach(post => {
            if (counts[post.category] !== undefined) {
                counts[post.category]++;
            }
        });
        
        return Object.entries(counts);
    }, [posts]);

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2 font-semibold">
                    <Box className="w-5 h-5"/> Categories
                </div>
            </CardHeader>
            <CardContent className="space-y-3">
                {categories.map(([name, count]) => (
                    <div key={name} className="flex justify-between items-center text-sm">
                        <p className="text-muted-foreground">{name}</p>
                        <Badge variant="secondary">{count}</Badge>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

const ActiveMembersWidget = () => (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-2 font-semibold">
                <Users className="w-5 h-5"/> Active Members
            </div>
        </CardHeader>
        <CardContent className="space-y-4">
             <p className="text-sm text-center text-muted-foreground p-4">No active members to show right now.</p>
        </CardContent>
    </Card>
);


export default function CommunityPage() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToPosts((newPosts) => {
      setPosts(newPosts);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  const handlePostCreated = () => {
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                  <h1 className="text-3xl font-bold tracking-tight font-headline mb-2">Community</h1>
                  <p className="text-muted-foreground">Connect, discuss, and learn with fellow professionals</p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="my-6 flex items-center gap-4">
                     <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                        <Input placeholder="Search discussions..." className="pl-9"/>
                    </div>
                    <Button variant="outline"><Filter className="mr-2 h-4 w-4"/>Filter</Button>
                    <CreatePost onPostCreated={handlePostCreated}>
                      <Button><Plus className="mr-2 h-4 w-4"/>New Post</Button>
                    </CreatePost>
                </motion.div>

                 <motion.div className="grid md:grid-cols-4 gap-4" variants={itemVariants}>
                    <StatCard title="Total Discussions" value={String(posts.length)} icon={<MessageCircleIcon className="text-blue-500"/>} color="bg-blue-50 dark:bg-blue-900/20"/>
                    <StatCard title="Active Members" value="0" icon={<UsersIcon className="text-green-500"/>} color="bg-green-50 dark:bg-green-900/20"/>
                    <StatCard title="Your Posts" value="0" icon={<GitCommitHorizontal className="text-purple-500"/>} color="bg-purple-50 dark:bg-purple-900/20"/>
                    <StatCard title="Reputation" value="0" icon={<Award className="text-orange-500"/>} color="bg-orange-50 dark:bg-orange-900/20"/>
                </motion.div>

            </motion.div>

            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
                {loading ? (
                    <div className="flex justify-center items-center py-16">
                        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                ) : posts.length > 0 ? (
                    posts.map((post) => (
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
                                    Be the first to share something!
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </motion.div>
        </div>

        {/* Right Sidebar */}
        <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-20">
            <CategoriesWidget posts={posts} />
            <ActiveMembersWidget />
        </div>
    </div>
  );
}

    