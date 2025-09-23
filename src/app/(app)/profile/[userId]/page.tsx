

"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, Briefcase, Linkedin, Mail, MapPin, GraduationCap, Link2, Plus, UserPlus, Check, Clock, Users, MessageSquare, Eye, Settings, Activity } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { getUserProfile, sendFriendRequest, type UserProfile, type Experience, type Education, type Achievement } from "@/services/profile";
import { Skeleton } from "@/components/ui/skeleton";
import { listenToPosts, Post } from "@/services/posts";

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
                <div className="h-40 md:h-48 w-full bg-muted flex items-center justify-center">
                   <p className="text-muted-foreground">No Cover Image</p>
                </div>
                <div className="p-6 bg-card relative">
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                         <div className="relative -mt-20">
                            <Skeleton className="h-32 w-32 rounded-full border-4 border-card" />
                         </div>
                        <div className="flex-grow space-y-2 pt-4">
                           <Skeleton className="h-8 w-48" />
                           <Skeleton className="h-5 w-32" />
                        </div>
                        <div className="absolute top-6 right-6 flex gap-2">
                             <Skeleton className="h-10 w-32" />
                             <Skeleton className="h-10 w-10" />
                        </div>
                    </div>
                </div>
            </Card>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-10 w-full rounded-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
                <div className="space-y-8">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        </div>
    )
}


export default function UserProfilePage({ params }: { params: { userId: string } }) {
  const { user, profile: currentUserProfile, reloadProfile } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
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
  
  useEffect(() => {
    const unsubscribe = listenToPosts(allPosts => {
        setPosts(allPosts.filter(p => p.author.uid === params.userId));
    });
    return () => unsubscribe();
  }, [params.userId]);

  const handleAddFriend = async () => {
    if (!user || !profile) return;
    try {
        await sendFriendRequest(user.uid, profile.uid);
        toast({
            title: "Friend Request Sent",
            description: `Your friend request to ${profile.displayName} has been sent.`,
        });
        reloadProfile(); 
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
  if (user?.uid !== params.userId) {
    if (connectionStatus === 'connected') {
        FriendButton = <Button disabled><Check className="mr-2 h-4 w-4"/>Friends</Button>;
    } else if (connectionStatus === 'pending_sent') {
        FriendButton = <Button disabled><Clock className="mr-2 h-4 w-4"/>Request Sent</Button>;
    } else {
        FriendButton = <Button onClick={handleAddFriend}><UserPlus className="mr-2 h-4 w-4" />Connect</Button>;
    }
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
                            <AvatarImage src={profile.photoURL || `https://picsum.photos/seed/${profile.uid}/150/150`} alt={profile.displayName || 'User'} data-ai-hint="person portrait"/>
                            <AvatarFallback className="text-4xl">{profile.displayName?.charAt(0) || 'U'}</AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-grow pt-4">
                        <h1 className="text-2xl sm:text-3xl font-bold font-headline">{profile.displayName || "User Name"}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground text-sm mt-1">
                            <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location || 'Location not set'}</span>
                            <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {connectionCount} connections</span>
                        </div>
                    </div>
                    <div className="absolute top-6 right-6 flex gap-2">
                        {FriendButton}
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
                    <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                <TabsContent value="about">
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>About</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{profile.bio || "No bio provided yet."}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Skills & Expertise</CardTitle></CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">No skills added yet.</p>
                            </CardContent>
                        </Card>
                    </div>
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
                 <TabsContent value="achievements">
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
            </Tabs>
        </motion.div>
        <motion.div className="space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4 text-muted-foreground"/>{profile.email}</div>
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
