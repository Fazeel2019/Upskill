
"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { addCourse, listenToCourses, updateCourse, deleteCourse } from "@/services/courses";
import type { Course } from "@/lib/data";
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose, DialogTrigger } from "@/components/ui/dialog";
import { Loader2, Edit, Trash2, PlusCircle, GripVertical } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const lectureSchema = z.object({
    id: z.string().default(() => crypto.randomUUID()),
    title: z.string().min(3, "Lecture title is required"),
    videoEmbedCode: z.string().min(10, "Embed code is required"),
    duration: z.coerce.number().min(1, "Duration must be at least 1 minute"),
});

const sectionSchema = z.object({
    id: z.string().default(() => crypto.randomUUID()),
    title: z.string().min(3, "Section title is required"),
    lectures: z.array(lectureSchema),
});

const resourceFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Career", "STEM", "Healthcare", "Public Health"]),
  thumbnailUrl: z.string().url("Must be a valid thumbnail URL"),
  imageHint: z.string().optional(),
  sections: z.array(sectionSchema).min(1, "Resource must have at least one section"),
});

type ResourceFormValues = z.infer<typeof resourceFormSchema>;


const FormBody = ({form, sectionFields, appendSection, removeSection, onSubmit, children}: {form: any, sectionFields: any, appendSection: any, removeSection: any, onSubmit: any, children: React.ReactNode}) => {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto pr-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div><Label>Title</Label><Input {...form.register("title")} />{form.formState.errors.title && <p className="text-destructive text-xs mt-1">{form.formState.errors.title.message}</p>}</div>
          <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (<Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Career">Career</SelectItem><SelectItem value="STEM">STEM</SelectItem><SelectItem value="Healthcare">Healthcare</SelectItem><SelectItem value="Public Health">Public Health</SelectItem></SelectContent></Select>)} /></div>
        </div>
        <div><Label>Description</Label><Textarea {...form.register("description")} />{form.formState.errors.description && <p className="text-destructive text-xs mt-1">{form.formState.errors.description.message}</p>}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Thumbnail URL</Label><Input {...form.register("thumbnailUrl")} />{form.formState.errors.thumbnailUrl && <p className="text-destructive text-xs mt-1">{form.formState.errors.thumbnailUrl.message}</p>}</div>
            <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} /></div>
        </div>
        
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Resource Content</h3>
            {sectionFields.map((section: any, sectionIndex: number) => (
                <SectionField key={section.id} form={form} sectionIndex={sectionIndex} removeSection={removeSection} />
            ))}
             {form.formState.errors.sections && <p className="text-destructive text-xs mt-1">{typeof form.formState.errors.sections.message === 'string' ? form.formState.errors.sections.message : 'Please add at least one section.'}</p>}
        </div>

        <Button type="button" variant="outline" size="sm" onClick={() => appendSection({ title: "", lectures: [] })}><PlusCircle className="mr-2 h-4 w-4" />Add Section</Button>

        <DialogFooter className="sticky bottom-0 bg-background pt-4 z-10">
            {children}
        </DialogFooter>
      </form>
    )
}

const SectionField = ({ form, sectionIndex, removeSection }: any) => {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: `sections.${sectionIndex}.lectures`,
    });

    return (
        <Card className="bg-muted/50 p-4">
            <div className="flex justify-between items-center mb-2">
                <Input placeholder="Section Title" {...form.register(`sections.${sectionIndex}.title`)} className="font-semibold text-md" />
                <Button variant="ghost" size="sm" onClick={() => removeSection(sectionIndex)}><Trash2 className="text-destructive h-4 w-4" /></Button>
            </div>
            {form.formState.errors.sections?.[sectionIndex]?.title && <p className="text-destructive text-xs mt-1">{form.formState.errors.sections?.[sectionIndex]?.title?.message}</p>}
            
            <div className="space-y-2 pl-4 mt-2">
                {fields.map((lecture, lectureIndex) => (
                    <div key={lecture.id} className="flex items-start gap-2 bg-background p-2 rounded-md">
                        <GripVertical className="h-4 w-4 text-muted-foreground mt-2.5" />
                        <div className="flex-grow grid grid-cols-1 gap-2">
                           <Input placeholder="Lecture Title" {...form.register(`sections.${sectionIndex}.lectures.${lectureIndex}.title`)} />
                           <Textarea placeholder="Video Embed Code (e.g. <iframe>...)" {...form.register(`sections.${sectionIndex}.lectures.${lectureIndex}.videoEmbedCode`)} />
                           <Input type="number" placeholder="Duration (min)" {...form.register(`sections.${sectionIndex}.lectures.${lectureIndex}.duration`)} />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => remove(lectureIndex)}><Trash2 className="text-destructive h-4 w-4" /></Button>
                    </div>
                ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-2" onClick={() => append({ title: "", videoEmbedCode: "", duration: 0 })}><PlusCircle className="mr-2 h-4 w-4" />Add Lecture</Button>
        </Card>
    );
};

function AddResourceDialog({ onResourceCreated }: { onResourceCreated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "Career",
            thumbnailUrl: "https://picsum.photos/seed/course-thumb/400/225",
            imageHint: "abstract resource",
            sections: [{ id: crypto.randomUUID(), title: "Introduction", lectures: [] }],
        },
    });

    const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    const onSubmit = async (data: ResourceFormValues) => {
        try {
            await addCourse(data as any);
            toast({ title: "Resource Created", description: "The new learning resource has been added successfully." });
            form.reset();
            onResourceCreated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to create resource.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Resource</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Add New Learning Resource</DialogTitle>
                    <DialogDescription>Fill out the details to create a new resource for the Learning page.</DialogDescription>
                </DialogHeader>
                <FormBody form={form} sectionFields={sectionFields} appendSection={appendSection} removeSection={removeSection} onSubmit={onSubmit}>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Creating..." : "Create Resource"}</Button>
                </FormBody>
            </DialogContent>
        </Dialog>
    );
}

function EditResourceDialog({ resource, onResourceUpdated }: { resource: Course, onResourceUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<ResourceFormValues>({
        resolver: zodResolver(resourceFormSchema),
        defaultValues: {
          ...resource,
          sections: resource.sections || [],
        },
    });

    const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    const onSubmit = async (data: ResourceFormValues) => {
        try {
            await updateCourse(resource.id, data as any);
            toast({ title: "Resource Updated", description: "The resource has been updated successfully." });
            onResourceUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update resource.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit Learning Resource</DialogTitle>
                    <DialogDescription>Make changes to the resource structure and details below.</DialogDescription>
                </DialogHeader>
                <FormBody form={form} sectionFields={sectionFields} appendSection={appendSection} removeSection={removeSection} onSubmit={onSubmit}>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                </FormBody>
            </DialogContent>
        </Dialog>
    );
}

function DeleteResourceAlert({ resourceId }: { resourceId: string }) {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteCourse(resourceId);
            toast({ title: "Resource Deleted", description: "The resource has been removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete resource.", variant: "destructive" });
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
                        This action cannot be undone. This will permanently delete this learning resource.
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

export default function ManageLearning() {
  const [resources, setResources] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchResources = () => {
    setLoading(true);
    const unsubscribe = listenToCourses((newCourses) => {
        setResources(newCourses);
        setLoading(false);
    });
    return unsubscribe;
  }
  
  useEffect(() => {
    const unsubscribe = fetchResources();
    return () => unsubscribe();
  }, []);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Existing Learning Resources</CardTitle>
        <AddResourceDialog onResourceCreated={fetchResources} />
      </CardHeader>
      <CardContent>
        {loading ? <div className="flex justify-center"><Loader2 className="animate-spin" /></div> :
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
            <p className="text-muted-foreground text-center py-8">No learning resources found. Click "Add New Resource" to get started.</p>
        )}
      </CardContent>
    </Card>
  );
}
