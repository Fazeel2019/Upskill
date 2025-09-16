
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
import { addResource, listenToResources } from "@/services/resources";
import type { Resource } from "@/lib/data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const resourceFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Career", "STEM", "Healthcare", "Public Health"]),
  youtubeUrl: z.string().url("Must be a valid YouTube URL"),
});

type ResourceFormValues = z.infer<typeof resourceFormSchema>;

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

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToResources((newResources) => {
        setResources(newResources);
        setLoading(false);
    });
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
                            <Button variant="ghost" size="sm">Edit</Button>
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
