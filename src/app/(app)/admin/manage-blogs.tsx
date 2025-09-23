
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { addBlog, listenToBlogs, updateBlog, deleteBlog } from "@/services/blogs";
import type { Blog } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Loader2, Edit, Trash2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const blogFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  author: z.string().min(2, "Author is required"),
  category: z.enum(["Career Development", "Healthcare", "STEM", "Public Health"]),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters").max(200, "Excerpt must be less than 200 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  imageHint: z.string().min(2, "Image hint is required"),
});

type BlogFormValues = z.infer<typeof blogFormSchema>;

function EditBlogDialog({ blog, onBlogUpdated }: { blog: Blog, onBlogUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<BlogFormValues>({
        resolver: zodResolver(blogFormSchema),
        defaultValues: blog
    });

    const onSubmit = async (data: BlogFormValues) => {
        try {
            await updateBlog(blog.id, data);
            toast({ title: "Blog Post Updated", description: "The blog post has been updated successfully." });
            onBlogUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update blog post.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Edit Blog Post</DialogTitle>
                    <DialogDescription>Make changes to the blog post details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto pr-6">
                    <div><Label>Title</Label><Input {...form.register("title")} /></div>
                    <div><Label>Author</Label><Input {...form.register("author")} /></div>
                    <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                            <SelectItem value="Career Development">Career Development</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="STEM">STEM</SelectItem>
                            <SelectItem value="Public Health">Public Health</SelectItem>
                        </SelectContent></Select>
                        )} />
                    </div>
                    <div><Label>Excerpt</Label><Textarea {...form.register("excerpt")} /></div>
                    <div><Label>Content</Label><Textarea {...form.register("content")} className="min-h-[200px]" /></div>
                    <div><Label>Image URL</Label><Input {...form.register("imageUrl")} /></div>
                    <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} /></div>
                    <DialogFooter className="sticky bottom-0 bg-background pt-4">
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DeleteBlogAlert({ blogId }: { blogId: string }) {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteBlog(blogId);
            toast({ title: "Blog Post Deleted", description: "The blog post has been removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete blog post.", variant: "destructive" });
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the blog post.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default function ManageBlogs() {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: "",
      author: "",
      category: "STEM",
      excerpt: "",
      content: "",
      imageUrl: "https://picsum.photos/seed/blog-placeholder/400/250",
      imageHint: "abstract tech",
    },
  });

  const fetchBlogs = () => {
    setLoading(true);
    const unsubscribe = listenToBlogs((newBlogs) => {
        setBlogs(newBlogs);
        setLoading(false);
    });
    return unsubscribe;
  }
  
  useEffect(() => {
    const unsubscribe = fetchBlogs();
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: BlogFormValues) => {
    try {
      await addBlog(data);
      toast({ title: "Blog Post Created", description: "The new post has been added successfully." });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create blog post.", variant: "destructive" });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Blog Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div><Label>Title</Label><Input {...form.register("title")} />{form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}</div>
              <div><Label>Author</Label><Input {...form.register("author")} />{form.formState.errors.author && <p className="text-red-500 text-xs mt-1">{form.formState.errors.author.message}</p>}</div>
              <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (
                 <Select onValueChange={field.onChange} defaultValue={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                    <SelectItem value="Career Development">Career Development</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="STEM">STEM</SelectItem>
                    <SelectItem value="Public Health">Public Health</SelectItem>
                 </SelectContent></Select>
               )} />
              </div>
              <div><Label>Excerpt</Label><Textarea {...form.register("excerpt")} />{form.formState.errors.excerpt && <p className="text-red-500 text-xs mt-1">{form.formState.errors.excerpt.message}</p>}</div>
              <div><Label>Content</Label><Textarea {...form.register("content")} className="min-h-[150px]" />{form.formState.errors.content && <p className="text-red-500 text-xs mt-1">{form.formState.errors.content.message}</p>}</div>
              <div><Label>Image URL</Label><Input {...form.register("imageUrl")} />{form.formState.errors.imageUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageUrl.message}</p>}</div>
              <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} />{form.formState.errors.imageHint && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageHint.message}</p>}</div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding Post..." : "Add Post"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Blog Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Loader2 className="animate-spin" /> :
             blogs.length > 0 ? (
                <ul className="space-y-4">
                    {blogs.map(blog => (
                        <li key={blog.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                                <p className="font-semibold">{blog.title}</p>
                                {blog.createdAt && (
                                  <p className="text-sm text-muted-foreground">Added {formatDistanceToNow(blog.createdAt.toDate())} ago</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <EditBlogDialog blog={blog} onBlogUpdated={fetchBlogs} />
                                <DeleteBlogAlert blogId={blog.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-center">No blog posts found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
