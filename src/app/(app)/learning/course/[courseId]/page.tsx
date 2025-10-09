
"use client";

import { useEffect, useState, useMemo } from "react";
import { notFound, useRouter } from "next/navigation";
import { getCourse } from "@/services/courses";
import type { Course, Section, Lecture } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { listenToUserProgress, updateUserProgress, enrollInCourse, addAchievement } from "@/services/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, Lock, PlayCircle, BookOpen, Clock, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { addNotification } from "@/services/notifications";


export function getYouTubeEmbedUrl(url: string) {
    let videoId = '';
    try {
        const urlObj = new URL(url);
        if (urlObj.hostname === 'youtu.be') {
            videoId = urlObj.pathname.slice(1);
        } else if (urlObj.hostname.includes('youtube.com')) {
            videoId = urlObj.searchParams.get('v') || '';
        }
    } catch(e) {
        // invalid url, maybe just an ID
        if (url.length === 11) videoId = url;
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}

function CourseSkeleton() {
    return (
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Skeleton className="h-64 w-full rounded-lg" />
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
}


export default function CoursePage({ params }: { params: { courseId: string } }) {
    const { courseId } = params;
    const { user, reloadProfile } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);
    const [userProgress, setUserProgress] = useState<any>(null);
    const [activeLecture, setActiveLecture] = useState<Lecture | null>(null);
    const [loading, setLoading] = useState(true);

    const isEnrolled = useMemo(() => {
        return !!userProgress?.courses?.[courseId];
    }, [userProgress, courseId]);

    const courseProgressData = useMemo(() => {
        return isEnrolled ? userProgress.courses[courseId] : null;
    }, [isEnrolled, userProgress, courseId]);
    
    const progressPercentage = courseProgressData?.progress || 0;
    
    const completedLectures = useMemo(() => new Set(courseProgressData?.completedLectures || []), [courseProgressData]);
    
    const totalLectures = useMemo(() => {
        if (!course) return 0;
        return course.sections.reduce((acc, section) => acc + section.lectures.length, 0);
    }, [course]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const courseData = await getCourse(courseId);
            if (!courseData) {
                notFound();
                return;
            }
            setCourse(courseData);
            setLoading(false);
        };
        fetchData();
    }, [courseId]);

    useEffect(() => {
        if (user) {
            const unsub = listenToUserProgress(user.uid, setUserProgress);
            return () => unsub();
        }
    }, [user]);

    const handleEnroll = async () => {
        if (!user || !course) return;
        await enrollInCourse(user.uid, course);
    };

    const handleLectureSelect = (lecture: Lecture) => {
        if (!isEnrolled) {
            toast({
                title: "Enroll to Watch",
                description: "You must enroll in the course to watch the lectures.",
                variant: "destructive"
            });
            return;
        }
        setActiveLecture(lecture);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const handleMarkComplete = async () => {
        if (!user || !course || !activeLecture) return;
        
        const newCompleted = new Set(completedLectures);
        newCompleted.add(activeLecture.id);
        
        const newProgress = Math.round((newCompleted.size / totalLectures) * 100);

        await updateUserProgress(user.uid, course.id, newProgress, Array.from(newCompleted), activeLecture.id);
        
        if (newProgress === 100) {
            toast({
                title: "Course Completed!",
                description: `Congratulations! You've completed "${course.title}". Your achievement has been added to your profile.`,
            });
            const achievement = {
                id: `cert-${course.id}`,
                title: `Certificate: ${course.title}`,
                issuer: 'Upskill Community',
                date: new Date().toISOString().split('T')[0],
                description: `Completed the course "${course.title}" on Upskill.`
            };
            await addAchievement(user.uid, achievement);
            await addNotification(user.uid, {
                type: "course_progress",
                message: `You've completed the course "${course.title}"!`,
                link: `/profile`
            });
            reloadProfile();
        }
    }
    
    if (loading || !course) return <CourseSkeleton />;

    const embedUrl = activeLecture ? getYouTubeEmbedUrl(activeLecture.videoUrl) : getYouTubeEmbedUrl(course.sections[0].lectures[0].videoUrl);

    return (
        <div className="space-y-8">
            <Button variant="ghost" asChild>
                <Link href="/learning"><ArrowLeft className="mr-2 h-4 w-4" />Back to Courses</Link>
            </Button>
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6">
                    <Card className="overflow-hidden">
                        <div className="aspect-video">
                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                title={activeLecture?.title || "Course Video"}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                             <div className="w-full h-full bg-muted flex items-center justify-center">
                               <p className="text-muted-foreground">Invalid video URL</p>
                            </div>
                        )}
                        </div>
                    </Card>

                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <h1 className="text-3xl font-bold font-headline">{course.title}</h1>
                        {isEnrolled && activeLecture && (
                             <Button onClick={handleMarkComplete} disabled={completedLectures.has(activeLecture.id)}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                {completedLectures.has(activeLecture.id) ? "Completed" : "Mark as Complete"}
                            </Button>
                        )}
                    </div>
                    <p className="text-muted-foreground">{course.description}</p>
                </div>
                <div className="md:col-span-1 space-y-6 md:sticky md:top-24">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Content</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {isEnrolled && (
                                <div className="space-y-2 mb-4">
                                    <div className="flex justify-between text-sm text-muted-foreground">
                                        <span>Progress</span>
                                        <span>{progressPercentage}%</span>
                                    </div>
                                    <Progress value={progressPercentage} />
                                </div>
                            )}
                            <Accordion type="single" collapsible defaultValue={course.sections[0].id}>
                                {course.sections.map((section, index) => (
                                    <AccordionItem value={section.id} key={section.id}>
                                        <AccordionTrigger className="font-semibold">Section {index + 1}: {section.title}</AccordionTrigger>
                                        <AccordionContent>
                                            <ul className="space-y-2">
                                                {section.lectures.map(lecture => (
                                                    <li key={lecture.id}>
                                                        <Button
                                                            variant="ghost"
                                                            className="w-full justify-start h-auto py-2 px-3 text-left"
                                                            onClick={() => handleLectureSelect(lecture)}
                                                            disabled={!isEnrolled}
                                                        >
                                                            {completedLectures.has(lecture.id) ? (
                                                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                                            ) : isEnrolled ? (
                                                                <PlayCircle className="w-4 h-4 mr-2" />
                                                            ) : (
                                                                <Lock className="w-4 h-4 mr-2" />
                                                            )}
                                                            <div className="flex-1">
                                                                <p className="font-medium leading-tight">{lecture.title}</p>
                                                                <p className="text-xs text-muted-foreground">{lecture.duration} mins</p>
                                                            </div>
                                                        </Button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            {!isEnrolled && (
                                <Button className="w-full mt-4" onClick={handleEnroll}>
                                    <BookOpen className="mr-2 h-4 w-4"/>
                                    Enroll to Start Learning
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

