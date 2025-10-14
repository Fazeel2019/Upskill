
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

const courseFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.enum(["Career", "STEM", "Healthcare", "Public Health"]),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  thumbnailUrl: z.string().url("Must be a valid thumbnail URL"),
  imageHint: z.string().optional(),
  sections: z.array(sectionSchema).min(1, "Course must have at least one section"),
});

type CourseFormValues = z.infer<typeof courseFormSchema>;


const FormBody = ({form, sectionFields, appendSection, removeSection, onSubmit, children}: {form: any, sectionFields: any, appendSection: any, removeSection: any, onSubmit: any, children: React.ReactNode}) => {
    return (
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto pr-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><Label>Title</Label><Input {...form.register("title")} />{form.formState.errors.title && <p className="text-destructive text-xs mt-1">{form.formState.errors.title.message}</p>}</div>
          <div><Label>Price ($)</Label><Input type="number" step="0.01" {...form.register("price")} />{form.formState.errors.price && <p className="text-destructive text-xs mt-1">{form.formState.errors.price.message}</p>}</div>
        </div>
        <div><Label>Category</Label><Controller name="category" control={form.control} render={({ field }) => (<Select onValueChange={field.onChange} value={field.value}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Career">Career</SelectItem><SelectItem value="STEM">STEM</SelectItem><SelectItem value="Healthcare">Healthcare</SelectItem><SelectItem value="Public Health">Public Health</SelectItem></SelectContent></Select>)} /></div>
        <div><Label>Description</Label><Textarea {...form.register("description")} />{form.formState.errors.description && <p className="text-destructive text-xs mt-1">{form.formState.errors.description.message}</p>}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><Label>Thumbnail URL</Label><Input {...form.register("thumbnailUrl")} />{form.formState.errors.thumbnailUrl && <p className="text-destructive text-xs mt-1">{form.formState.errors.thumbnailUrl.message}</p>}</div>
            <div><Label>Image AI Hint</Label><Input {...form.register("imageHint")} /></div>
        </div>
        
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Course Content</h3>
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

function AddCourseDialog({ onCourseCreated }: { onCourseCreated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "Career",
            price: 29.99,
            thumbnailUrl: "https://picsum.photos/seed/course-thumb/400/225",
            imageHint: "abstract course",
            sections: [{ id: crypto.randomUUID(), title: "Introduction", lectures: [] }],
        },
    });

    const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    const onSubmit = async (data: CourseFormValues) => {
        try {
            await addCourse(data);
            toast({ title: "Course Created", description: "The new paid course has been added successfully." });
            form.reset();
            onCourseCreated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to create course.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><PlusCircle className="mr-2 h-4 w-4" /> Add New Course</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Add New Paid Course</DialogTitle>
                    <DialogDescription>Fill out the details to create a new paid course.</DialogDescription>
                </DialogHeader>
                <FormBody form={form} sectionFields={sectionFields} appendSection={appendSection} removeSection={removeSection} onSubmit={onSubmit}>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Creating..." : "Create Course"}</Button>
                </FormBody>
            </DialogContent>
        </Dialog>
    );
}

function EditCourseDialog({ course, onCourseUpdated }: { course: Course, onCourseUpdated: () => void }) {
    const { toast } = useToast();
    const [open, setOpen] = useState(false);

    const form = useForm<CourseFormValues>({
        resolver: zodResolver(courseFormSchema),
        defaultValues: {
          ...course,
          sections: course.sections || [],
        },
    });

    const { fields: sectionFields, append: appendSection, remove: removeSection } = useFieldArray({
        control: form.control,
        name: "sections",
    });

    const onSubmit = async (data: CourseFormValues) => {
        try {
            await updateCourse(course.id, data);
            toast({ title: "Course Updated", description: "The course has been updated successfully." });
            onCourseUpdated();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "Failed to update course.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm"><Edit className="h-4 w-4 mr-2" />Edit</Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Edit Course</DialogTitle>
                    <DialogDescription>Make changes to the course structure and details below.</DialogDescription>
                </DialogHeader>
                <FormBody form={form} sectionFields={sectionFields} appendSection={appendSection} removeSection={removeSection} onSubmit={onSubmit}>
                    <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                    <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Changes"}</Button>
                </FormBody>
            </DialogContent>
        </Dialog>
    );
}

function DeleteCourseAlert({ courseId }: { courseId: string }) {
    const { toast } = useToast();

    const handleDelete = async () => {
        try {
            await deleteCourse(courseId);
            toast({ title: "Course Deleted", description: "The course has been removed." });
        } catch (error) {
            toast({ title: "Error", description: "Failed to delete course.", variant: "destructive" });
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
                        This action cannot be undone. This will permanently delete this course.
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

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchCourses = () => {
    setLoading(true);
    const unsubscribe = listenToCourses((newCourses) => {
        setCourses(newCourses);
        setLoading(false);
    });
    return unsubscribe;
  }
  
  useEffect(() => {
    const unsubscribe = fetchCourses();
    return () => unsubscribe();
  }, []);


  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Manage Paid Courses</CardTitle>
        <AddCourseDialog onCourseCreated={fetchCourses} />
      </CardHeader>
      <CardContent>
        {loading ? <div className="flex justify-center"><Loader2 className="animate-spin" /></div> :
         courses.length > 0 ? (
            <ul className="space-y-4">
                {courses.map(course => (
                    <li key={course.id} className="flex justify-between items-center p-3 bg-muted rounded-md">
                        <div>
                            <p className="font-semibold">{course.title}</p>
                            {course.createdAt && (
                              <p className="text-sm text-muted-foreground">Added {formatDistanceToNow(course.createdAt.toDate())} ago</p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <span className="text-sm font-semibold mr-4">${course.price}</span>
                            <EditCourseDialog course={course} onCourseUpdated={fetchCourses} />
                            <DeleteCourseAlert courseId={course.id} />
                        </div>
                    </li>
                ))}
            </ul>
        ) : (
            <p className="text-muted-foreground text-center py-8">No paid courses found. Click "Add New Course" to get started.</p>
        )}
      </CardContent>
    </Card>
  );
}
