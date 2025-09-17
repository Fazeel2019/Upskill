
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
import { addEvent, listenToEvents, updateEvent, deleteEvent } from "@/services/events";
import type { Event as EventType } from "@/lib/data";
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
import { format } from "date-fns";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  type: z.enum(["Webinar", "Workshop", "Summit", "Meetup"]),
  category: z.enum(["STEM", "Healthcare", "Public Health"]),
  imageUrl: z.string().url("Must be a valid URL"),
  imageHint: z.string().min(2, "Image hint is required"),
});

type EventFormValues = z.infer<typeof eventFormSchema>;

function DeleteEventAlert({ eventId }: { eventId: string }) {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteEvent(eventId);
            toast({ title: "Event Deleted", description: "The event has been removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete event.", variant: "destructive" });
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
                        This action cannot be undone. This will permanently delete the event.
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

function EditEventDialog({ event, onEventUpdated }: { event: EventType, onEventUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    
    const form = useForm<EventFormValues>({
        resolver: zodResolver(eventFormSchema),
        defaultValues: {
            ...event,
            date: format(new Date(event.date as string), 'yyyy-MM-dd')
        }
    });

    const onSubmit = async (data: EventFormValues) => {
        try {
            await updateEvent(event.id, data as any);
            toast({ title: "Event Updated", description: "The event has been updated successfully." });
            onEventUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update event.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Button variant="ghost" size="sm" onClick={() => setOpen(true)}><Edit className="h-4 w-4 mr-2" />Edit</Button>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Edit Event</DialogTitle>
                    <DialogDescription>Make changes to the event details below.</DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div><Label>Title</Label><Input {...form.register("title")} /></div>
                    <div><Label>Description</Label><Textarea {...form.register("description")} /></div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label>Date</Label><Input type="date" {...form.register("date")} /></div>
                        <div><Label>Time</Label><Input type="time" {...form.register("time")} /></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div><Label>Type</Label><Controller name="type" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                                <SelectItem value="Webinar">Webinar</SelectItem><SelectItem value="Workshop">Workshop</SelectItem>
                                <SelectItem value="Summit">Summit</SelectItem><SelectItem value="Meetup">Meetup</SelectItem>
                            </SelectContent></Select>)} />
                        </div>
                        <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (
                            <Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue/></SelectTrigger><SelectContent>
                                <SelectItem value="STEM">STEM</SelectItem><SelectItem value="Healthcare">Healthcare</SelectItem>
                                <SelectItem value="Public Health">Public Health</SelectItem>
                            </SelectContent></Select>)} />
                        </div>
                    </div>
                    <div><Label>Image URL</Label><Input {...form.register("imageUrl")} /></div>
                    <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} /></div>
                    <DialogFooter>
                        <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                        <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function ManageEvents() {
  const { toast } = useToast();
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      type: "Webinar",
      category: "STEM",
      imageUrl: "https://picsum.photos/seed/event-placeholder/400/250",
      imageHint: "abstract event",
    },
  });

  const fetchEvents = () => {
    setLoading(true);
    const unsubscribe = listenToEvents((newEvents) => {
        setEvents(newEvents);
        setLoading(false);
    });
    return unsubscribe;
  }

  useEffect(() => {
    const unsubscribe = fetchEvents();
    return () => unsubscribe();
  }, []);

  const onSubmit = async (data: EventFormValues) => {
    try {
      await addEvent(data as any);
      toast({ title: "Event Created", description: "The new event has been added successfully." });
      form.reset();
    } catch (error) {
      toast({ title: "Error", description: "Failed to create event.", variant: "destructive" });
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" {...form.register("date")} />
                    {form.formState.errors.date && <p className="text-red-500 text-xs mt-1">{form.formState.errors.date.message}</p>}
                </div>
                 <div>
                    <Label htmlFor="time">Time</Label>
                    <Input id="time" type="time" {...form.register("time")} />
                    {form.formState.errors.time && <p className="text-red-500 text-xs mt-1">{form.formState.errors.time.message}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Type</Label>
                  <Controller name="type" control={form.control} render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Webinar">Webinar</SelectItem>
                            <SelectItem value="Workshop">Workshop</SelectItem>
                            <SelectItem value="Summit">Summit</SelectItem>
                            <SelectItem value="Meetup">Meetup</SelectItem>
                        </SelectContent>
                    </Select>
                  )} />
                </div>
                <div>
                   <Label>Category</Label>
                   <Controller name="category" control={form.control} render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="STEM">STEM</SelectItem>
                            <SelectItem value="Healthcare">Healthcare</SelectItem>
                            <SelectItem value="Public Health">Public Health</SelectItem>
                        </SelectContent>
                    </Select>
                  )} />
                </div>
              </div>
               <div>
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" {...form.register("imageUrl")} />
                {form.formState.errors.imageUrl && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageUrl.message}</p>}
              </div>
              <div>
                <Label htmlFor="imageHint">Image AI Hint</Label>
                <Input id="imageHint" {...form.register("imageHint")} />
                {form.formState.errors.imageHint && <p className="text-red-500 text-xs mt-1">{form.formState.errors.imageHint.message}</p>}
              </div>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Adding Event..." : "Add Event"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Existing Events</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? <Loader2 className="animate-spin" /> :
             events.length > 0 ? (
                <ul className="space-y-4">
                    {events.map(event => (
                        <li key={event.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                            <div>
                                <p className="font-semibold">{event.title}</p>
                                <p className="text-sm text-muted-foreground">{format(new Date(event.date as string), 'PPP')} at {event.time}</p>
                            </div>
                            <div className="flex items-center">
                                <EditEventDialog event={event} onEventUpdated={fetchEvents} />
                                <DeleteEventAlert eventId={event.id} />
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted-foreground text-center">No events found.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
