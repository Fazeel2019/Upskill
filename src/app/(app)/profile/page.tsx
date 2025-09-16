
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Edit, FileText, Linkedin, Mail, MapPin, GraduationCap, Link2, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { updateProfile as updateFirebaseProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { addExperience, updateUserProfile, type Experience } from "@/services/profile";


const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


function EditProfileDialog({ children }: { children: React.ReactNode }) {
  const { user, reloadProfile } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      await updateFirebaseProfile(user, {
        displayName: data.displayName,
      });
       await updateUserProfile(user.uid, { displayName: data.displayName });
      reloadProfile();
      toast({
        title: "Profile Updated",
        description: "Your name has been successfully updated.",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (user && open) {
      form.reset({ displayName: user.displayName || "" });
    }
  }, [user, open, form]);


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your name here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right">Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="col-span-3" />
                    </FormControl>
                    <FormMessage className="col-span-4" />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
               <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const bioFormSchema = z.object({
  bio: z.string().max(280, { message: "Bio must be less than 280 characters." }).optional(),
});

type BioFormValues = z.infer<typeof bioFormSchema>;

function EditBioDialog() {
  const { user, profile, reloadProfile } = useAuth();
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);

  const form = useForm<BioFormValues>({
    resolver: zodResolver(bioFormSchema),
    defaultValues: {
      bio: profile?.bio || "",
    },
  });

  const onSubmit = async (data: BioFormValues) => {
    if (!user) return;

    try {
      await updateUserProfile(user.uid, { bio: data.bio });
      reloadProfile();
      toast({
        title: "Bio Updated",
        description: "Your bio has been successfully updated.",
      });
      setOpen(false);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (profile && open) {
      form.reset({ bio: profile.bio || "" });
    }
  }, [profile, open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="link" className="p-0 h-auto">Edit Bio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Bio</DialogTitle>
          <DialogDescription>
            Tell the community a little bit about yourself.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Your professional background, interests, and expertise..."
                      className="min-h-[120px]"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary">Cancel</Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Saving..." : "Save Bio"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

const experienceFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    company: z.string().min(1, "Company is required"),
    location: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().max(500, "Description must be less than 500 characters.").optional(),
})

type ExperienceFormValues = z.infer<typeof experienceFormSchema>;

function AddExperienceDialog() {
    const { user, reloadProfile } = useAuth();
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const form = useForm<ExperienceFormValues>({
        resolver: zodResolver(experienceFormSchema),
        defaultValues: {
            title: "",
            company: "",
            location: "",
            startDate: "",
            endDate: "",
            description: "",
        },
    });

    const onSubmit = async (data: ExperienceFormValues) => {
        if (!user) return;
        
        try {
            const newExperience: Experience = {
                id: new Date().toISOString(), // simple unique id
                ...data,
            };
            await addExperience(user.uid, newExperience);
            reloadProfile();
            toast({
                title: "Experience Added",
                description: "Your new work experience has been saved.",
            });
            setOpen(false);
            form.reset();
        } catch (error: any) {
            toast({
                title: "Update Failed",
                description: error.message,
                variant: "destructive",
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="mt-4"><Plus className="mr-2 h-4 w-4" />Add Position</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Add Work Experience</DialogTitle>
                    <DialogDescription>
                        Fill in the details of your past or current role.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                         <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} placeholder="e.g. Senior Product Manager" /></FormControl><FormMessage /></FormItem>
                         )} />
                         <FormField control={form.control} name="company" render={({ field }) => (
                            <FormItem><FormLabel>Company</FormLabel><FormControl><Input {...field} placeholder="e.g. Google" /></FormControl><FormMessage /></FormItem>
                         )} />
                         <FormField control={form.control} name="location" render={({ field }) => (
                            <FormItem><FormLabel>Location</FormLabel><FormControl><Input {...field} placeholder="e.g. San Francisco, CA" /></FormControl><FormMessage /></FormItem>
                         )} />
                         <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="startDate" render={({ field }) => (
                                <FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} type="month" /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="endDate" render={({ field }) => (
                                <FormItem><FormLabel>End Date (or blank)</FormLabel><FormControl><Input {...field} type="month" /></FormControl><FormMessage /></FormItem>
                            )} />
                         </div>
                         <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Describe your responsibilities and achievements..." /></FormControl><FormMessage /></FormItem>
                         )} />
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting ? "Saving..." : "Save Experience"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

function ExperienceItem({ experience }: { experience: Experience }) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "Present";
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    return (
        <div className="flex gap-4 relative pb-8 last:pb-0">
             <div className="absolute left-[18px] top-5 h-full w-px bg-border"></div>
            <div className="flex-shrink-0">
                 <div className="bg-muted rounded-full p-2 ring-8 ring-card z-10 relative">
                    <Briefcase className="w-5 h-5 text-muted-foreground" />
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold">{experience.title}</h4>
                <p className="text-muted-foreground text-sm">{experience.company} {experience.location && `· ${experience.location}`}</p>
                <p className="text-muted-foreground text-xs mt-1">{formatDate(experience.startDate)} - {formatDate(experience.endDate || '')}</p>
                {experience.description && <p className="text-sm mt-2 whitespace-pre-wrap">{experience.description}</p>}
            </div>
        </div>
    )
}


export default function ProfilePage() {
  const { user, profile } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
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

  if (!user || !profile) return null;

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
          <div className="relative h-48 md:h-64">
            <Image
              src="https://picsum.photos/seed/cover/1200/400"
              alt="Cover image"
              fill
              style={{objectFit: "cover"}}
              sizes="(max-width: 768px) 100vw, 1200px"
              data-ai-hint="abstract background"
              priority
            />
            <div className="absolute top-4 right-4">
              <Button variant="secondary" size="sm" disabled>
                <Edit className="mr-2 h-4 w-4" /> Edit Cover
              </Button>
            </div>
          </div>
          <div className="p-6 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 sm:-mt-20">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-card ring-2 ring-border shrink-0">
                 <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/150/150`} alt={user.displayName || 'User'} data-ai-hint="person portrait"/>
                      <AvatarFallback>{user.displayName?.split(" ").map(n => n[0]).join("") || user.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">{profile.displayName || "Your Name"}</h1>
                <p className="text-muted-foreground">{profile.title || "Your professional title will appear here."}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/>{profile.location || "Your Location"}</div>
                  <div className="flex items-center gap-1"><Briefcase className="w-4 h-4"/>{profile.company || "Your Company"}</div>
                </div>
              </div>
              <div className="shrink-0 flex gap-2">
                  <EditProfileDialog>
                    <Button><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
                  </EditProfileDialog>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div className="md:col-span-2" variants={itemVariants}>
           <Tabs defaultValue="about">
                <TabsList className="mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">Bio</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                            <p className="whitespace-pre-wrap">{profile.bio || "Share a bit about your professional background, interests, and expertise. This is a great place to introduce yourself to the community."}</p>
                             <EditBioDialog />
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="experience">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline">Work Experience</CardTitle>
                             {profile.experience && profile.experience.length > 0 && <AddExperienceDialog />}
                        </CardHeader>
                         <CardContent>
                             {profile.experience && profile.experience.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.experience.sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map(exp => (
                                        <ExperienceItem key={exp.id} experience={exp} />
                                    ))}
                                </div>
                             ) : (
                                 <div className="text-center text-muted-foreground py-12">
                                     <Briefcase className="w-12 h-12 mx-auto mb-4" />
                                     <h3 className="font-semibold">Add Your Experience</h3>
                                     <p className="mt-2">Showcase your professional history.</p>
                                     <AddExperienceDialog />
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="education">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Education</CardTitle>
                        </CardHeader>
                         <CardContent className="text-center text-muted-foreground py-12">
                             <GraduationCap className="w-12 h-12 mx-auto mb-4" />
                             <h3 className="font-semibold">Add Your Education</h3>
                             <p className="mt-2">List your degrees and qualifications.</p>
                             <Button variant="outline" className="mt-4" disabled>Add School</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </motion.div>
        <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline">Contact & Links</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>{user.email}</div>
                      <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-muted-foreground"/><Link href="#" className="text-primary hover:underline">Add LinkedIn profile</Link></div>
                      <div className="flex items-center gap-2"><Link2 className="w-4 h-4 text-muted-foreground"/><Link href="#" className="text-primary hover:underline">Add personal website</Link></div>
                  </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Achievements</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-12">
                     <Award className="w-12 h-12 mx-auto mb-4" />
                     <h3 className="font-semibold">Add Achievements</h3>
                     <p className="mt-2">Highlight your awards and recognitions.</p>
                     <Button variant="outline" className="mt-4" disabled>Add Achievement</Button>
                </CardContent>
            </Card>
           </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

    
