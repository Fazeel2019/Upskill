
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Edit, FileText, Linkedin, Mail, MapPin, Building, GraduationCap, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

export default function ProfilePage() {
  const { user } = useAuth();

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

  if (!user) return null;

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
              <Button variant="secondary" size="sm">
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
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">{user.displayName || "Your Name"}</h1>
                <p className="text-muted-foreground">Your professional title will appear here.</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/>Your Location</div>
                  <div className="flex items-center gap-1"><Briefcase className="w-4 h-4"/>Your Company</div>
                </div>
              </div>
              <div className="shrink-0 flex gap-2">
                  <Button><Edit className="mr-2 h-4 w-4" />Edit Profile</Button>
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
                            <p>Share a bit about your professional background, interests, and expertise. This is a great place to introduce yourself to the community.</p>
                             <Button variant="link" className="p-0 h-auto">Edit Bio</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="experience">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Work Experience</CardTitle>
                        </CardHeader>
                         <CardContent className="text-center text-muted-foreground py-12">
                             <Briefcase className="w-12 h-12 mx-auto mb-4" />
                             <h3 className="font-semibold">Add Your Experience</h3>
                             <p className="mt-2">Showcase your professional history.</p>
                             <Button variant="outline" className="mt-4">Add Position</Button>
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
                             <Button variant="outline" className="mt-4">Add School</Button>
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
                     <Button variant="outline" className="mt-4">Add Achievement</Button>
                </CardContent>
            </Card>
           </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
