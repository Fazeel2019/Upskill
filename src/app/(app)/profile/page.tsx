

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Edit, Settings, Linkedin, Mail, MapPin, GraduationCap, Link2, Plus, Users, MessageSquare, Eye, Activity, Download } from "lucide-react";
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
import React, { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { addAchievement, addEducation, updateUserProfile, type Experience, type Education, type Achievement, addExperience } from "@/services/profile";
import { listenToPosts, Post } from "@/services/posts";


const profileFormSchema = z.object({
  displayName: z.string().min(2, { message: "Name must be at least 2 characters." }).max(50, { message: "Name must be less than 50 characters." }),
  title: z.string().max(100, { message: "Title must be less than 100 characters."}).optional(),
  company: z.string().max(100, { message: "Company must be less than 100 characters."}).optional(),
  location: z.string().max(100, { message: "Location must be less than 100 characters."}).optional(),
  linkedin: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
  website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal('')),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;


function EditProfileDialog({ children, onOpenChange, open }: { children: React.ReactNode, open: boolean, onOpenChange: (open: boolean) => void }) {
  const { user, profile, reloadProfile } = useAuth();
  const { toast } = useToast();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      displayName: user?.displayName || "",
      title: profile?.title || "",
      company: profile?.company || "",
      location: profile?.location || "",
      linkedin: profile?.linkedin || "",
      website: profile?.website || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    if (!user) return;

    try {
      if (data.displayName !== user.displayName) {
        await updateFirebaseProfile(user, {
          displayName: data.displayName,
        });
      }
      
      await updateUserProfile(user.uid, { 
        displayName: data.displayName,
        title: data.title,
        company: data.company,
        location: data.location,
        linkedin: data.linkedin,
        website: data.website
      });
      reloadProfile();
      toast({
        title: "Profile Updated",
        description: "Your profile has been successfully updated.",
      });
      onOpenChange(false);
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  React.useEffect(() => {
    if (user && profile && open) {
      form.reset({ 
        displayName: user.displayName || "",
        title: profile.title || "",
        company: profile.company || "",
        location: profile.location || "",
        linkedin: profile.linkedin || "",
        website: profile.website || ""
      });
    }
  }, [user, profile, open, form]);


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Clinical Research Coordinator"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. Genentech"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. San Francisco Bay Area"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn Profile</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://linkedin.com/in/your-profile"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personal Website</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="https://your-website.com"/>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
        <Button variant="outline" size="sm"><Edit className="mr-2 h-4 w-4" /> Edit Bio</Button>
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
              <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
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
                <Button variant="outline"><Plus className="mr-2 h-4 w-4" />Add Position</Button>
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

const educationFormSchema = z.object({
    school: z.string().min(1, "School is required"),
    degree: z.string().min(1, "Degree is required"),
    fieldOfStudy: z.string().optional(),
    startDate: z.string().min(1, "Start date is required"),
    endDate: z.string().optional(),
    description: z.string().max(500, "Description must be less than 500 characters.").optional(),
});

type EducationFormValues = z.infer<typeof educationFormSchema>;

function AddEducationDialog() {
    const { user, reloadProfile } = useAuth();
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const form = useForm<EducationFormValues>({
        resolver: zodResolver(educationFormSchema),
        defaultValues: { school: "", degree: "", fieldOfStudy: "", startDate: "", endDate: "", description: "" },
    });

    const onSubmit = async (data: EducationFormValues) => {
        if (!user) return;
        try {
            await addEducation(user.uid, { id: new Date().toISOString(), ...data });
            reloadProfile();
            toast({ title: "Education Added", description: "Your education has been saved." });
            setOpen(false);
            form.reset();
        } catch (error: any) {
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus className="mr-2 h-4 w-4" />Add School</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader><DialogTitle>Add Education</DialogTitle><DialogDescription>Fill in your educational background.</DialogDescription></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="school" render={({ field }) => (<FormItem><FormLabel>School</FormLabel><FormControl><Input {...field} placeholder="e.g. Stanford University" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="degree" render={({ field }) => (<FormItem><FormLabel>Degree</FormLabel><FormControl><Input {...field} placeholder="e.g. Bachelor's" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="fieldOfStudy" render={({ field }) => (<FormItem><FormLabel>Field of Study</FormLabel><FormControl><Input {...field} placeholder="e.g. Computer Science" /></FormControl><FormMessage /></FormItem>)} />
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={form.control} name="startDate" render={({ field }) => (<FormItem><FormLabel>Start Date</FormLabel><FormControl><Input {...field} type="month" /></FormControl><FormMessage /></FormItem>)} />
                            <FormField control={form.control} name="endDate" render={({ field }) => (<FormItem><FormLabel>End Date</FormLabel><FormControl><Input {...field} type="month" /></FormControl><FormMessage /></FormItem>)} />
                        </div>
                        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Activities, awards, etc." /></FormControl><FormMessage /></FormItem>)} />
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Education"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function EducationItem({ education }: { education: Education }) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "Present";
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }

    return (
        <div className="flex gap-4 relative pb-8 last:pb-0">
            <div className="absolute left-[18px] top-5 h-full w-px bg-border"></div>
            <div className="flex-shrink-0">
                <div className="bg-muted rounded-full p-2 ring-8 ring-card z-10 relative"><GraduationCap className="w-5 h-5 text-muted-foreground" /></div>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold">{education.school}</h4>
                <p className="text-muted-foreground text-sm">{education.degree}{education.fieldOfStudy && `, ${education.fieldOfStudy}`}</p>
                <p className="text-muted-foreground text-xs mt-1">{formatDate(education.startDate)} - {formatDate(education.endDate || '')}</p>
                {education.description && <p className="text-sm mt-2 whitespace-pre-wrap">{education.description}</p>}
            </div>
        </div>
    )
}

const achievementFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    issuer: z.string().optional(),
    date: z.string().min(1, "Date is required"),
    description: z.string().max(500, "Description must be less than 500 characters.").optional(),
});

type AchievementFormValues = z.infer<typeof achievementFormSchema>;

function AddAchievementDialog() {
    const { user, reloadProfile } = useAuth();
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const form = useForm<AchievementFormValues>({
        resolver: zodResolver(achievementFormSchema),
        defaultValues: { title: "", issuer: "", date: "", description: "" },
    });

    const onSubmit = async (data: AchievementFormValues) => {
        if (!user) return;
        try {
            await addAchievement(user.uid, { id: new Date().toISOString(), ...data });
            reloadProfile();
            toast({ title: "Achievement Added", description: "Your achievement has been saved." });
            setOpen(false);
            form.reset();
        } catch (error: any) {
            toast({ title: "Update Failed", description: error.message, variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline"><Plus className="mr-2 h-4 w-4" />Add Achievement</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader><DialogTitle>Add Achievement</DialogTitle><DialogDescription>Showcase your awards, certifications, and publications.</DialogDescription></DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (<FormItem><FormLabel>Title</FormLabel><FormControl><Input {...field} placeholder="e.g. Certified Cloud Practitioner" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="issuer" render={({ field }) => (<FormItem><FormLabel>Issuing Organization</FormLabel><FormControl><Input {...field} placeholder="e.g. Amazon Web Services" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="date" render={({ field }) => (<FormItem><FormLabel>Date Issued</FormLabel><FormControl><Input {...field} type="month" /></FormControl><FormMessage /></FormItem>)} />
                        <FormField control={form.control} name="description" render={({ field }) => (<FormItem><FormLabel>Description</FormLabel><FormControl><Textarea {...field} placeholder="Add any relevant details..." /></FormControl><FormMessage /></FormItem>)} />
                        <DialogFooter>
                            <DialogClose asChild><Button type="button" variant="secondary">Cancel</Button></DialogClose>
                            <Button type="submit" disabled={form.formState.isSubmitting}>{form.formState.isSubmitting ? "Saving..." : "Save Achievement"}</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

function AchievementItem({ achievement }: { achievement: Achievement }) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    const isCertificate = achievement.id.startsWith('cert-');

    return (
        <div className="flex gap-4 relative pb-8 last:pb-0">
             <div className="absolute left-[18px] top-5 h-full w-px bg-border"></div>
            <div className="flex-shrink-0">
                 <div className="bg-muted rounded-full p-2 ring-8 ring-card z-10 relative">
                    <Award className="w-5 h-5 text-muted-foreground" />
                </div>
            </div>
            <div className="flex-grow">
                <div className="flex justify-between items-start">
                    <div>
                        <h4 className="font-semibold">{achievement.title}</h4>
                        {achievement.issuer && <p className="text-muted-foreground text-sm">{achievement.issuer}</p>}
                        <p className="text-muted-foreground text-xs mt-1">{formatDate(achievement.date)}</p>
                    </div>
                    {isCertificate && (
                        <Button variant="outline" size="sm" disabled>
                            <Download className="mr-2 h-4 w-4" />
                            Download Certificate
                        </Button>
                    )}
                </div>
                {achievement.description && <p className="text-sm mt-2 whitespace-pre-wrap">{achievement.description}</p>}
            </div>
        </div>
    )
}

function StatCard({ title, value, icon, color }: { title: string, value: string, icon: React.ReactNode, color: string }) {
    return (
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
}


export default function ProfilePage() {
  const { user, profile } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToPosts(allPosts => {
        setPosts(allPosts.filter(p => p.author.uid === user.uid));
    });
    return () => unsubscribe();
  }, [user]);

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

  const connectionCount = Object.values(profile.connections || {}).filter(c => c === 'connected').length;

  return (
    <motion.div 
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="overflow-hidden">
             <div className="h-40 md:h-48 w-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No Cover Image</p>
             </div>
            <div className="p-6 bg-card relative">
                 <div className="flex flex-col sm:flex-row items-start gap-6">
                    <div className="relative -mt-20">
                        <Avatar className="h-32 w-32 rounded-full border-4 border-card">
                            <AvatarImage src={user.photoURL || `https://picsum.photos/seed/${user.uid}/150/150`} alt={user.displayName || 'User'} data-ai-hint="person portrait"/>
                            <AvatarFallback className="text-4xl">{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-grow pt-4">
                        <h1 className="text-2xl sm:text-3xl font-bold font-headline">{profile.displayName || "Your Name"}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location || 'Location not set'}</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {connectionCount} connections</span>
                        </div>
                    </div>
                    <div className="absolute top-6 right-6 flex gap-2">
                        <EditProfileDialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
                            <Button onClick={() => setIsEditProfileOpen(true)}><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
                        </EditProfileDialog>
                    </div>
                 </div>
            </div>
        </Card>
      </motion.div>

       <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4" variants={itemVariants}>
            <StatCard title="Connections" value={String(connectionCount)} icon={<Users className="text-blue-500"/>} color="bg-blue-50 dark:bg-blue-900/20"/>
            <StatCard title="Posts" value={String(posts.length)} icon={<MessageSquare className="text-green-500"/>} color="bg-green-50 dark:bg-green-900/20"/>
            <StatCard title="Reputation" value="0" icon={<Award className="text-purple-500"/>} color="bg-purple-50 dark:bg-purple-900/20"/>
            <StatCard title="Profile Views" value="0" icon={<Eye className="text-orange-500"/>} color="bg-orange-50 dark:bg-orange-900/20"/>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <motion.div className="md:col-span-2" variants={itemVariants}>
           <Tabs defaultValue="about">
                <TabsList className="mb-4">
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="experience">Experience</TabsTrigger>
                    <TabsTrigger value="education">Education</TabsTrigger>
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>About</CardTitle>
                                <EditBioDialog />
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{profile.bio || "No bio provided yet."}</p>
                            </CardContent>
                        </Card>
                         <Card>
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle>Skills & Expertise</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No skills added yet.</p>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="experience">
                    <Card>
                         <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline">Work Experience</CardTitle>
                             <AddExperienceDialog />
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
                                </div>
                             )}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="education">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline">Education</CardTitle>
                            <AddEducationDialog />
                        </CardHeader>
                        <CardContent>
                            {profile.education && profile.education.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.education.sort((a,b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()).map(edu => (
                                        <EducationItem key={edu.id} education={edu} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <GraduationCap className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="font-semibold">No Education Listed</h3>
                                    <p className="mt-2">Add your educational background to complete your profile.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="achievements">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="font-headline">Achievements</CardTitle>
                            <AddAchievementDialog />
                        </CardHeader>
                        <CardContent>
                            {profile.achievements && profile.achievements.length > 0 ? (
                                <div className="space-y-4">
                                    {profile.achievements.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(ach => (
                                        <AchievementItem key={ach.id} achievement={ach} />
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground py-12">
                                    <Award className="w-12 h-12 mx-auto mb-4" />
                                    <h3 className="font-semibold">No Achievements Listed</h3>
                                    <p className="mt-2">Add your awards, certifications, and other accomplishments.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="activity">
                    <Card>
                        <CardHeader><CardTitle>Activity</CardTitle></CardHeader>
                        <CardContent>
                            <div className="text-center text-muted-foreground py-12">
                                <Activity className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="font-semibold">No recent activity.</h3>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="settings">
                    <Card>
                        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">Manage your account and notification settings here.</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </motion.div>
        <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>{user.email}</div>
                      <div className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-muted-foreground"/><span>{profile.company || 'N/A'}</span></div>
                      <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-muted-foreground"/><span>{profile.location || 'N/A'}</span></div>
                  </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Social Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-muted-foreground"/>
                        {profile.linkedin ? (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{profile.linkedin}</a>
                        ) : (
                            <span className="text-muted-foreground">N/A</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2"><Link2 className="w-4 h-4 text-muted-foreground"/>
                        {profile.website ? (
                             <a href={profile.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{profile.website}</a>
                        ) : (
                             <span className="text-muted-foreground">N/A</span>
                        )}
                      </div>
                </CardContent>
            </Card>
           </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
