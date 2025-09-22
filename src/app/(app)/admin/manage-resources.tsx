

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
import { addResource, listenToResources, updateResource, deleteResource } from "@/services/resources";
import type { Resource } from "@/lib/data";
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

const resourceFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Career", "STEM", "Healthcare", "Public Health"]),
  youtubeUrl: z.string().url("Must be a valid YouTube URL"),
});

type ResourceFormValues = z.infer<typeof resourceFormSchema>;

function EditResourceDialog({ resource, onResourceUpdated }: { resource: Resource, onResourceUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceFormSchema),
        defaultValues: resource
    });

    const onSubmit = async (data: ResourceFormValues) => {
        try {
            await updateResource(resource.id, data as any);
            toast({ title: "Resource Updated", description: "The resource has been updated successfully." });
            onResourceUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update resource.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Resource</DialogTitle>
                    <DialogDescription>Make changes to the resource details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div><Label>Title</Label><Input {...form.register("title")} /></div>
                    <div><Label>Description</Label><Textarea {...form.register("description")} /></div>
                    <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (
                        <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                            <SelectItem value="Career">Career</SelectItem>
                            <SelectItem value="STEM">STEM</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Public Health">Public Health</SelectItem>
                        </SelectContent></Select>
                        )} />
                    </div>
                    <div><Label htmlFor="youtubeUrl">YouTube URL</Label><Input id="youtubeUrl" {...form.register("youtubeUrl")} /></div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

function DeleteResourceAlert({ resourceId }: { resourceId: string }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteResource(resourceId);
            toast({ title: "Resource Deleted", description: "The resource has been removed." });
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete resource.", variant: "destructive" });
        }
    };

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the resource.
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

export default function ManageResources() {
  const { toast } = useToast();
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<ResourceFormValues>({
    resolver: zodResolver(resourceFormSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Career",
      youtubeUrl: "",
    },
  });

  const fetchResources = () => {
    setLoading(true);
    const unsubscribe = listenToResources((newResources) => {
        setResources(newResources);
        setLoading(false);
    });
    return unsubscribe;
  }
  
  useEffect(() => {
    const unsubscribe = fetchResources();
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: ResourceFormValues) => {
    try {
      await addResource(data as any);
      toast({ title: "Resource Created", description: "The new resource has been added successfully." });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create resource.", variant: "destructive" });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Resource</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...form.register("title")} />
                {form.formState.errors.title && <p className="text-red-500 text-xs mt-1">{form.formState.errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" {...form.register("description")} />
                {form.formState.errors.description && <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>}
              </div>
              <div>
                  <Label>Category</Label>
                  <Controller name="category" control={form.control} render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Career">Career</SelectItem>
                            <SelectItem value="STEM">STEM</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Public Health">Public Health</SelectItem>
                        </SelectContent>
                    </Select>
                  )} />
                </div>
               <div>
                <Label htmlFor="youtubeUrl">YouTube URL</Label>
                <Input id="youtubeUrl" {...form.register("youtubeUrl")} placeholder="https://www.youtube.com/watch?v=..."/>
                {form.formState.errors.youtubeUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.youtubeUrl.message}</p>}
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding Resource..." : "Add Resource"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Resources</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Loader2 className="animate-spin" /> :
             resources.length > 0 ? (
                <ul className="space-y-4">
                    {resources.map(resource => (
                        <li key={resource.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                                <p className="font-semibold">{resource.title}</p>
                                {resource.createdAt && (
                                  <p className="text-sm text-muted-foreground">Added {formatDistanceToNow(resource.createdAt.toDate())} ago</p>
                                )}
                            </div>
                            <div className="flex items-center">
                                <EditResourceDialog resource={resource} onResourceUpdated={fetchResources} />
                                <DeleteResourceAlert resourceId={resource.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-center">No resources found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
