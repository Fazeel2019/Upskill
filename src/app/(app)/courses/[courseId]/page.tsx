
"use client";

import { useEffect, useState, useMemo } from "react";
import { notFound, useRouter, useParams } from "next/navigation";
import { getCourse } from "@/services/courses";
import type { Course, Section, Lecture } from "@/lib/data";
import { useAuth } from "@/hooks/use-auth";
import { listenToUserProgress, enrollInCourse } from "@/services/progress";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, CheckCircle, Lock, PlayCircle, BookOpen, Clock, Award, Loader2, ShoppingCart } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Image from "next/image";


function CoursePageSkeleton() {
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-48" />
        <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2 space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-64 w-full" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-64 w-full" />
            </div>
        </div>
      </div>
    );
}


export default function PaidCoursePage() {
    const params = useParams();
    const courseId = params.courseId as string;
    const { user, profile, loading: authLoading } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [course, setCourse] = useState<Course | null>(null);
    const [userProgress, setUserProgress] = useState<any>(null);
    const [loading, setLoading] = useState(true);

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
    
    // This will be used later to show course content if enrolled
    const isEnrolled = false; 

    const handlePurchase = () => {
        toast({
            title: "Redirecting to checkout...",
            description: "You will be redirected to complete your purchase."
        });
        // We will integrate Stripe checkout here in the next step.
    }
    
    if (authLoading || loading) return <CoursePageSkeleton />;

    if (!course) {
        notFound();
        return null;
    }

    return (
        <div className="space-y-8">
            <Button variant="ghost" asChild>
                <Link href="/courses"><ArrowLeft className="mr-2 h-4 w-4" />Back to All Courses</Link>
            </Button>
            <div className="grid md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <p className="text-sm font-semibold text-primary">{course.category.toUpperCase()}</p>
                        <h1 className="text-4xl font-bold font-headline tracking-tight">{course.title}</h1>
                        <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
                    </div>
                    
                    <Card>
                        <CardHeader><CardTitle>What You'll Learn</CardTitle></CardHeader>
                        <CardContent>
                             <ul className="grid grid-cols-2 gap-4 text-muted-foreground">
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Master key concepts</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Apply practical skills</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Advance your career</li>
                                <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" /> Get certified</li>
                            </ul>
                        </CardContent>
                    </Card>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Course Curriculum</h2>
                        <Accordion type="single" collapsible defaultValue={course.sections[0]?.id}>
                            {course.sections.map((section, index) => (
                                <AccordionItem value={section.id} key={section.id}>
                                    <AccordionTrigger className="font-semibold text-lg">Section {index + 1}: {section.title}</AccordionTrigger>
                                    <AccordionContent>
                                        <ul className="space-y-3 pl-4">
                                            {section.lectures.map(lecture => (
                                                <li key={lecture.id} className="flex items-center gap-3 text-muted-foreground">
                                                    <PlayCircle className="w-5 h-5 text-primary/50" />
                                                    <div className="flex-1">
                                                        <p className="font-medium text-foreground/90">{lecture.title}</p>
                                                        <p className="text-xs">{lecture.duration} mins</p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </div>
                </div>
                <div className="md:col-span-1 md:sticky md:top-24">
                     <Card className="overflow-hidden">
                        <div className="relative h-56 w-full">
                           <Image 
                                src={course.thumbnailUrl}
                                alt={course.title} 
                                fill
                                style={{objectFit: "cover"}}
                                data-ai-hint={course.imageHint || "course thumbnail"}
                            />
                        </div>
                        <CardContent className="p-6 space-y-4">
                             <div className="text-center">
                                <p className="text-4xl font-bold">${course.price}</p>
                                <p className="text-sm text-muted-foreground">One-time purchase</p>
                            </div>
                            <Button size="lg" className="w-full" onClick={handlePurchase}>
                                <ShoppingCart className="mr-2 h-5 w-5" />
                                Buy Now
                            </Button>
                            <ul className="text-xs text-muted-foreground space-y-2">
                                <li className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> Full lifetime access</li>
                                <li className="flex items-center gap-2"><Award className="w-4 h-4" /> Certificate of completion</li>
                            </ul>
                        </CardContent>
                     </Card>
                </div>
            </div>
        </div>
    );
}
