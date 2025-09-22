
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { addPodcast, listenToPodcasts, updatePodcast, deletePodcast } from "@/services/podcasts";
import type { Podcast } from "@/lib/data";
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

const podcastFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  author: z.string().min(2, "Author is required"),
  date: z.string().min(1, "Date is required"),
  imageUrl: z.string().url("Must be a valid URL"),
  imageHint: z.string().min(2, "Image hint is required"),
  episodeUrl: z.string().url("Must be a valid URL"),
  duration: z.string().min(3, "Duration is required (e.g., 30:15)"),
});

type PodcastFormValues = z.infer<typeof podcastFormSchema>;

function EditPodcastDialog({ podcast, onPodcastUpdated }: { podcast: Podcast, onPodcastUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<PodcastFormValues>({
        resolver: zodResolver(podcastFormSchema),
        defaultValues: {
            ...podcast,
            date: podcast.date.split('T')[0] // Assuming date is ISO string from Firestore
        }
    });

    const onSubmit = async (data: PodcastFormValues) => {
        try {
            await updatePodcast(podcast.id, data);
            toast({ title: "Podcast Updated", description: "The podcast has been updated successfully." });
            onPodcastUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update podcast.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Podcast</DialogTitle>
                    <DialogDescription>Make changes to the podcast details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <Input {...form.register("title")} placeholder="Title" />
                    <Textarea {...form.register("description")} placeholder="Description" />
                    <Input {...form.register("category")} placeholder="Category" />
                    <Input {...form.register("author")} placeholder="Author" />
                    <Input type="date" {...form.register("date")} />
                    <Input {...form.register("imageUrl")} placeholder="Image URL" />
                    <Input {...form.register("imageHint")} placeholder="Image AI Hint" />
                    <Input {...form.register("episodeUrl")} placeholder="Episode URL" />
                    <Input {...form.register("duration")} placeholder="Duration (e.g., 30:15)" />
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DeletePodcastAlert({ podcastId }: { podcastId: string }) {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deletePodcast(podcastId);
            toast({ title: "Podcast Deleted", description: "The podcast has been removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete podcast.", variant: "destructive" });
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
                        This action cannot be undone. This will permanently delete the podcast episode.
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

export default function ManagePodcasts() {
  const { toast } = useToast();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<PodcastFormValues>({
    resolver: zodResolver(podcastFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      author: "",
      date: new Date().toISOString().split('T')[0],
      imageUrl: "https://picsum.photos/seed/podcast-placeholder/400/250",
      imageHint: "abstract podcast",
      episodeUrl: "",
      duration: "",
    },
  });

  const fetchPodcasts = () => {
    setLoading(true);
    const unsubscribe = listenToPodcasts((newPodcasts) => {
        setPodcasts(newPodcasts);
        setLoading(false);
    });
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = fetchPodcasts();
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: PodcastFormValues) => {
    try {
      await addPodcast(data);
      toast({ title: "Podcast Created", description: "The new podcast episode has been added." });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create podcast.", variant: "destructive" });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Podcast</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div><Label>Title</Label><Input {...form.register("title")} />{form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}</div>
              <div><Label>Description</Label><Textarea {...form.register("description")} />{form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}</div>
              <div><Label>Category</Label><Input {...form.register("category")} />{form.formState.errors.category && <p className="text-red-500 text-xs mt-1">{form.formState.errors.category.message}</p>}</div>
              <div><Label>Author</Label><Input {...form.register("author")} />{form.formState.errors.author && <p className="text-red-500 text-xs mt-1">{form.formState.errors.author.message}</p>}</div>
              <div><Label>Date</Label><Input type="date" {...form.register("date")} />{form.formState.errors.date && <p className="text-red-500 text-xs mt-1">{form.formState.errors.date.message}</p>}</div>
              <div><Label>Image URL</Label><Input {...form.register("imageUrl")} />{form.formState.errors.imageUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageUrl.message}</p>}</div>
              <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} />{form.formState.errors.imageHint && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageHint.message}</p>}</div>
              <div><Label>Episode URL</Label><Input {...form.register("episodeUrl")} />{form.formState.errors.episodeUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.episodeUrl.message}</p>}</div>
              <div><Label>Duration</Label><Input {...form.register("duration")} placeholder="e.g. 30:15" />{form.formState.errors.duration && <p className="text-red-500 text-xs mt-1">{form.formState.errors.duration.message}</p>}</div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding..." : "Add Podcast"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Podcasts</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Loader2 className="animate-spin" /> :
             podcasts.length > 0 ? (
                <ul className="space-y-4">
                    {podcasts.map(podcast => (
                        <li key={podcast.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                                <p className="font-semibold">{podcast.title}</p>
                                {podcast.createdAt && (
                                  <p className="text-sm text-muted-foreground">Added {formatDistanceToNow(podcast.createdAt.toDate())} ago</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <EditPodcastDialog podcast={podcast} onPodcastUpdated={fetchPodcasts} />
                                <DeletePodcastAlert podcastId={podcast.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-center">No podcasts found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
