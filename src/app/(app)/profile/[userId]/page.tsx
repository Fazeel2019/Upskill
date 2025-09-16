

"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Edit, Linkedin, Mail, MapPin, GraduationCap, Link2, Plus, UserPlus, Check, Clock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, sendFriendRequest, type UserProfile, type Experience, type Education, type Achievement } from "@/services/profile";
import { Skeleton } from "@/components/ui/skeleton";

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

function AchievementItem({ achievement }: { achievement: Achievement }) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const [year, month] = dateString.split('-');
        return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
    
    return (
        <div className="flex gap-4 relative pb-8 last:pb-0">
             <div className="absolute left-[18px] top-5 h-full w-px bg-border"></div>
            <div className="flex-shrink-0">
                 <div className="bg-muted rounded-full p-2 ring-8 ring-card z-10 relative">
                    <Award className="w-5 h-5 text-muted-foreground" />
                </div>
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold">{achievement.title}</h4>
                {achievement.issuer && <p className="text-muted-foreground text-sm">{achievement.issuer}</p>}
                <p className="text-muted-foreground text-xs mt-1">{formatDate(achievement.date)}</p>
                {achievement.description && <p className="text-sm mt-2 whitespace-pre-wrap">{achievement.description}</p>}
            </div>
        </div>
    )
}

function ProfileSkeleton() {
    return (
        <div className="space-y-8">
            <Card className="overflow-hidden">
                <Skeleton className="h-48 md:h-64 w-full" />
                <div className="p-6 bg-card">
                    <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 sm:-mt-20">
                        <Skeleton className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-card ring-2 ring-border shrink-0" />
                        <div className="flex-grow space-y-2">
                           <Skeleton className="h-8 w-48" />
                           <Skeleton className="h-5 w-64" />
                           <Skeleton className="h-5 w-80" />
                        </div>
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </Card>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    )
}


export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const { user, profile: currentUserProfile, reloadProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      const userProfile = await getUserProfile(params.userId);
      if (userProfile) {
        setProfile(userProfile);
      } else {
        notFound();
      }
      setLoading(false);
    };
    fetchProfile();
  }, [params.userId]);
  
  const handleAddFriend = async () => {
    if (!user || !profile) return;
    try {
        await sendFriendRequest(user.uid, profile.uid);
        toast({
            title: "Friend Request Sent",
            description: `Your friend request to ${profile.displayName} has been sent.`,
        });
        reloadProfile(); // This will update the connection status on the current user's profile object
    } catch (error) {
        toast({
            title: "Error",
            description: "Could not send friend request. Please try again.",
            variant: "destructive"
        });
    }
  }
  
  const connectionStatus = currentUserProfile?.connections?.[params.userId];
  
  let FriendButton;
  if (connectionStatus === 'connected') {
    FriendButton = <Button disabled><Check className="mr-2 h-4 w-4"/>Friends</Button>;
  } else if (connectionStatus === 'pending_sent') {
    FriendButton = <Button disabled><Clock className="mr-2 h-4 w-4"/>Request Sent</Button>;
  } else {
    FriendButton = <Button onClick={handleAddFriend}><UserPlus className="mr-2 h-4 w-4" />Add Friend</Button>;
  }


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

  if (loading || !profile) return <ProfileSkeleton />;

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
          </div>
          <div className="p-6 bg-card">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6 -mt-24 sm:-mt-20">
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 rounded-full border-4 border-card ring-2 ring-border shrink-0">
                 <Avatar className="h-full w-full">
                      <AvatarImage src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/150/150`} alt={profile.displayName || 'User'} data-ai-hint="person portrait"/>
                      <AvatarFallback>{profile.displayName?.split(" ").map(n => n[0]).join("") || profile.email?.[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl sm:text-3xl font-bold font-headline">{profile.displayName || "User Name"}</h1>
                <p className="text-muted-foreground">{profile.title || "Professional title"}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-2">
                  <div className="flex items-center gap-1"><MapPin className="w-4 h-4"/>{profile.location || "Location"}</div>
                  <div className="flex items-center gap-1"><Briefcase className="w-4 h-4"/>{profile.company || "Company"}</div>
                </div>
              </div>
              <div className="shrink-0 flex gap-2">
                  {FriendButton}
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
                            <p className="whitespace-pre-wrap">{profile.bio || "This user hasn't written a bio yet."}</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="experience">
                    <Card>
                         <CardHeader>
                            <CardTitle className="font-headline">Work Experience</CardTitle>
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
                                     <h3 className="font-semibold">No Experience Listed</h3>
                                     <p className="mt-2">This user hasn't added any work experience yet.</p>
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
                                     <p className="mt-2">This user hasn't added any education yet.</p>
                                </div>
                            )}
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
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>{profile.email}</div>
                      <div className="flex items-center gap-2"><Linkedin className="w-4 h-4 text-muted-foreground"/>
                        {profile.linkedin ? (
                            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{profile.linkedin}</a>
                        ) : (
                            <span className="text-muted-foreground">Not available</span>
                        )}
                      </div>
                      <div className="flex items-center gap-2"><Link2 className="w-4 h-4 text-muted-foreground"/>
                        {profile.website ? (
                             <a href={profile.website} target="_blank" rel="noreferrer" className="text-primary hover:underline truncate">{profile.website}</a>
                        ) : (
                             <span className="text-muted-foreground">Not available</span>
                        )}
                      </div>
                  </CardContent>
              </Card>
            </motion.div>
            <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Achievements</CardTitle>
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
                              <p className="mt-2">This user hasn't added any achievements yet.</p>
                        </div>
                     )}
                </CardContent>
            </Card>
           </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
