
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, Calendar, CheckCircle, Clock, FileText, MessageSquare, Star, TrendingUp, Users, Zap, BrainCircuit, Users as UsersIcon, MessageSquare as MessageSquareIcon, Calendar as CalendarIcon, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import React, { useEffect, useState, useMemo } from "react"
import { listenToUserProgress, UserProgress } from "@/services/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getYouTubeEmbedUrl } from "@/app/(app)/learning/course/[courseId]/page"
import { listenToEvents, type Event } from "@/services/events"
import { listenToCourses, type Course } from "@/services/courses"
import { recommendContent, type Recommendation } from "@/ai/flows/recommend-content"
import { listenToFriends } from "@/services/profile"

const StatCard = ({ title, value, subValue, icon: Icon, progress, colorClass, link }: { title: string, value: string, subValue: string, icon: React.ElementType, progress?: number, colorClass: string, link: string }) => {
    return (
        <Link href={link}>
            <Card className={cn("text-white rounded-xl hover:shadow-lg transition-shadow", colorClass)}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                        <span>{title}</span>
                        {progress === undefined && <Icon className="w-5 h-5 opacity-70" />}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2">
                        <p className="text-4xl font-bold">{value}</p>
                        {progress !== undefined && <TrendingUp className="w-8 h-8 mb-1" />}
                    </div>
                    {progress !== undefined && <Progress value={progress} className="h-2 bg-white/30 mt-2" indicatorClassName="bg-white" />}
                    <p className="text-sm opacity-80 mt-2">{subValue}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

function ContinueLearningCard() {
    const { user } = useAuth();
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [isPlayerOpen, setIsPlayerOpen] = useState(false);

    useEffect(() => {
        if (user) {
            const unsubscribe = listenToUserProgress(user.uid, setUserProgress);
            return () => unsubscribe();
        }
    }, [user]);

    const lastProgress = useMemo(() => {
        if (!userProgress || !userProgress.lastCourseId || !userProgress.courses) return null;
        return userProgress.courses[userProgress.lastCourseId];
    }, [userProgress]);

    const progressValue = lastProgress?.progress || 0;
    const title = lastProgress?.course.title || "Start a Course";
    const description = lastProgress ? "Resume your last course" : "Explore our catalog";
    const buttonText = lastProgress ? "Continue" : "Browse Courses";
    const href = lastProgress ? `/learning/course/${lastProgress.course.id}` : "/learning";
    
    const QuickActionCard = (
      <Card className="group rounded-xl hover:shadow-md transition-shadow">
          <CardContent className="p-4">
              <div className="flex justify-between items-start">
                  <div className="p-2 bg-muted rounded-lg">
                      <BookOpen className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
              </div>
              <h3 className="font-semibold mt-4">{title}</h3>
              <p className="text-sm text-muted-foreground mt-1">{description}</p>
              
              <div className="mt-4">
                  <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{progressValue}%</span>
                  </div>
                  <Progress value={progressValue} className="h-2" />
              </div>
            
              <Button asChild variant="outline" className="w-full mt-4">
                  <Link href={href}>{buttonText}</Link>
              </Button>
          </CardContent>
      </Card>
    );

    return (
        <>
            {QuickActionCard}
        </>
    )
}

export default function DashboardPage() {
    const { user, profile } = useAuth();
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
    const [lastEvent, setLastEvent] = useState<Event | null>(null);
    const [activityItems, setActivityItems] = useState<any[]>([]);
    const [recommendationItems, setRecommendationItems] = useState<Recommendation[]>([]);
    const [courses, setCourses] = useState<Course[]>([]);
    const [connectionCount, setConnectionCount] = useState(0);

    useEffect(() => {
        if (user) {
            const unsubProgress = listenToUserProgress(user.uid, setUserProgress);
            const unsubEvents = listenToEvents(events => {
                if (events.length > 0) setLastEvent(events[0]);
            });
             const unsubCourses = listenToCourses(setCourses);
             const unsubFriends = listenToFriends(user.uid, (friends) => {
                setConnectionCount(friends.length);
             });

            return () => {
                unsubProgress();
                unsubEvents();
                unsubCourses();
                unsubFriends();
            };
        }
    }, [user]);
    
    const { overallProgress, completedCourses } = useMemo(() => {
        if (!userProgress || !userProgress.courses) return { overallProgress: 0, completedCourses: 0 };
        
        const courses = Object.values(userProgress.courses);
        if (courses.length === 0) return { overallProgress: 0, completedCourses: 0 };
        
        const totalProgress = courses.reduce((acc, course) => acc + (course.progress || 0), 0);
        const completed = courses.filter(course => course.progress === 100).length;
        
        return {
            overallProgress: Math.round(totalProgress / courses.length),
            completedCourses: completed
        };
    }, [userProgress]);

    useEffect(() => {
        const newActivityItems = [];
        if (userProgress?.lastCourseId && userProgress.courses?.[userProgress.lastCourseId]) {
            const lastCourse = userProgress.courses[userProgress.lastCourseId];
             newActivityItems.push({
                icon: BookOpen,
                color: "text-blue-500",
                text: `You started the course "${lastCourse.course.title}".`,
                time: "Recently"
            })
        }
        if (lastEvent) {
             newActivityItems.push({
                icon: CalendarIcon,
                color: "text-purple-500",
                text: `New event added: "${lastEvent.title}"`,
                time: "Recently"
            })
        }
        setActivityItems(newActivityItems);
    }, [userProgress, lastEvent])

    useEffect(() => {
        const getRecommendations = async () => {
            if (profile && courses.length > 0 && recommendationItems.length === 0) {
                try {
                    const recs = await recommendContent({ 
                        userTitle: profile.title || "Professional", 
                        availableResources: courses.map(c => ({ id: c.id, title: c.title, category: c.category, description: c.description }))
                    });
                    if (recs && recs.recommendations) {
                        setRecommendationItems(recs.recommendations);
                    }
                } catch (error) {
                    console.error("Failed to get recommendations:", error);
                }
            }
        };
        getRecommendations();
    }, [profile, courses, recommendationItems.length])

    return (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋</h1>
                    <p className="text-muted-foreground">You're making great progress on your career journey. Here's what's happening today.</p>
                </div>
                <div className="p-4 bg-blue-500 rounded-lg hidden sm:block">
                    <BrainCircuit className="w-8 h-8 text-white" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Career Progress" value={`${overallProgress}%`} subValue="Last updated: today" icon={TrendingUp} progress={overallProgress} colorClass="bg-blue-500" link="/profile"/>
                <StatCard title="Courses Completed" value={String(completedCourses)} subValue="+0 this month" icon={BookOpen} colorClass="bg-green-500" link="/learning" />
                <StatCard title="Network Connections" value={String(connectionCount)} subValue="+0 this week" icon={UsersIcon} colorClass="bg-purple-500" link="/networking" />
                <StatCard title="Mentorship Hours" value="0" subValue="No sessions upcoming" icon={Clock} colorClass="bg-orange-500" link="/mentors" />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <ContinueLearningCard />
                    <Card className="group rounded-xl hover:shadow-md transition-shadow"><CardContent className="p-4"><div className="flex justify-between items-start"><div className="p-2 bg-muted rounded-lg"><MessageSquareIcon className="w-5 h-5 text-muted-foreground" /></div><ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" /></div><h3 className="font-semibold mt-4">Message Mentor</h3><p className="text-sm text-muted-foreground mt-1">Connect with mentors</p><Button asChild variant="outline" className="w-full mt-4"><Link href="/messaging">Message</Link></Button></CardContent></Card>
                    <Card className="group rounded-xl hover:shadow-md transition-shadow"><CardContent className="p-4"><div className="flex justify-between items-start"><div className="p-2 bg-muted rounded-lg"><UsersIcon className="w-5 h-5 text-muted-foreground" /></div><ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" /></div><h3 className="font-semibold mt-4">Join Discussion</h3><p className="text-sm text-muted-foreground mt-1">Hot topics await you</p><Button asChild variant="outline" className="w-full mt-4"><Link href="/community">View</Link></Button></CardContent></Card>
                    <Card className="group rounded-xl hover:shadow-md transition-shadow"><CardContent className="p-4"><div className="flex justify-between items-start"><div className="p-2 bg-muted rounded-lg"><CalendarIcon className="w-5 h-5 text-muted-foreground" /></div><ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" /></div><h3 className="font-semibold mt-4">Upcoming Event</h3><p className="text-sm text-muted-foreground mt-1">See upcoming events</p><Button asChild variant="outline" className="w-full mt-4"><Link href="/events">RSVP</Link></Button></CardContent></Card>
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" />Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {activityItems.length > 0 ? (
                        <div className="space-y-6">
                            {activityItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-full">
                                        <item.icon className={cn("w-5 h-5", item.color)} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.text}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                            ))}
                        </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No recent activity to show.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary"/>AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendationItems.length > 0 ? recommendationItems.map((item, index) => (
                            <Link href={item.link || '#'} key={index} className="flex items-center gap-4 group p-2 rounded-lg hover:bg-muted">
                                <div className="flex-grow">
                                    <p className="text-xs text-muted-foreground">{item.type}</p>
                                    <p className="font-semibold leading-tight">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.reason}</p>
                                </div>
                            </Link>
                        )) : (
                             <div className="text-center py-8 text-muted-foreground">
                                <p>No recommendations at this time.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
