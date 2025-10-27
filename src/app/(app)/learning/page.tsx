
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, CheckCircle, Award as CertificateIcon, Clock, Filter, Search, Star, Play, BookOpen, Loader2, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React, { useEffect, useState, useMemo } from "react"
import { listenToCourses } from "@/services/courses"
import type { Course } from "@/lib/data"
import Link from "next/link"
import { useAuth } from "@/hooks/use-auth"
import { updateUserProgress, listenToUserProgress, enrollInCourse, UserProgress } from "@/services/progress"
import { addAchievement } from "@/services/profile"
import { useRouter } from "next/navigation"

const stats = [
    { title: "Courses Enrolled", value: "0", icon: Book, color: "bg-blue-100 dark:bg-blue-900/50", iconColor: "text-blue-500" },
    { title: "Completed", value: "0", icon: CheckCircle, color: "bg-green-100 dark:bg-green-900/50", iconColor: "text-green-500" },
    { title: "Certificates", value: "0", icon: CertificateIcon, color: "bg-purple-100 dark:bg-purple-900/50", iconColor: "text-purple-500" },
    { title: "Study Hours", value: "0", icon: Clock, color: "bg-orange-100 dark:bg-orange-900/50", iconColor: "text-orange-500" }
];

function StatCard({ title, value, icon: Icon, color, iconColor }: { title: string, value: string, icon: React.ElementType, color: string, iconColor: string }) {
    return (
        <Card className={cn("border-l-4", color)}>
            <CardContent className="p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold">{value}</p>
                    </div>
                    <div className={cn("p-2 rounded-lg", color)}>
                        <Icon className={cn("w-6 h-6", iconColor)} />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

function CourseCard({ 
    course, 
    onEnroll, 
    isEnrolled,
    showEnrollButton = false 
} : { 
    course: Course, 
    onEnroll?: (course: Course) => void, 
    isEnrolled: boolean,
    showEnrollButton?: boolean
}) {
    const categoryColors: Record<string, string> = {
        Career: "border-purple-500",
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };
    
    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[course.category] || 'border-gray-500'}`}>
            <Link href={`/learning/course/${course.id}`} className="relative h-48 cursor-pointer">
                <Image 
                    src={course.thumbnailUrl}
                    alt={course.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={course.imageHint || "course thumbnail"}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{course.title}</h3>
                </div>
                {isEnrolled && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-16 h-16 text-white/80" />
                  </div>
                )}
            </Link>
            <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <Badge variant="outline">{course.category}</Badge>
                 {showEnrollButton && onEnroll && (
                    <Button size="sm" onClick={() => onEnroll(course)} disabled={isEnrolled}>
                        {isEnrolled ? 'Enrolled' : 'Enroll'}
                    </Button>
                 )}
                 {isEnrolled && (
                     <Button size="sm" asChild>
                        <Link href={`/learning/course/${course.id}`}>
                           Start Learning
                        </Link>
                    </Button>
                 )}
            </CardFooter>
        </Card>
    )
}

function CourseCatalogTab({ userProgress }: { userProgress: UserProgress | null }) {
    const { user } = useAuth();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");

    useEffect(() => {
        setLoading(true);
        const unsubscribe = listenToCourses((newCourses) => {
            setCourses(newCourses);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleEnroll = async (course: Course) => {
        if (user) {
            await enrollInCourse(user.uid, course);
        }
    }
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: { 
        opacity: 1,
        transition: { staggerChildren: 0.1 }
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
    
    const EmptyState = () => (
        <motion.div variants={itemVariants} className="text-center py-16 md:col-span-3">
            <Card className="max-w-md mx-auto">
                <CardContent className="p-8 text-center">
                    <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-semibold text-lg">Course Library is Empty</h3>
                    <p className="text-muted-foreground mt-2">
                        No learning materials have been added yet. Check back shortly!
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );

    const filters = ["All", "Career", "STEM", "Healthcare", "Public Health"];
    const filteredCourses = courses.filter(r => activeFilter === "All" || r.category === activeFilter);
    const enrolledCourseIds = userProgress?.courses ? Object.keys(userProgress.courses) : [];

    return (
        <div className="space-y-6 mt-6">
            <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                {filters.map(filter => (
                    <Button key={filter} variant={activeFilter === filter ? "secondary" : "outline"} onClick={() => setActiveFilter(filter)}>
                        {filter}
                    </Button>
                ))}
            </motion.div>
            
            {loading ? (
                <div className="flex justify-center py-16">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            ) : (
                <motion.div 
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                >
                    {filteredCourses.length > 0 ? filteredCourses.map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                        <CourseCard 
                            course={course} 
                            onEnroll={handleEnroll}
                            isEnrolled={enrolledCourseIds.includes(course.id)}
                            showEnrollButton={true}
                        />
                    </motion.div>
                    )) : (
                        <EmptyState />
                    )}
                </motion.div>
            )}
        </div>
    );
}

function MyLearningTab({ userProgress }: { userProgress: UserProgress | null}) {
    if (!userProgress || !userProgress.courses || Object.keys(userProgress.courses).length === 0) {
        return (
            <Card className="mt-6">
                <CardContent className="p-8 text-center text-muted-foreground">
                    You are not enrolled in any courses yet. Enroll from the Course Catalog.
                </CardContent>
            </Card>
        );
    }
    
    const enrolledCourses = Object.values(userProgress.courses).filter(c => c && c.course);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6" variants={containerVariants}>
            {enrolledCourses.map(courseData => (
                courseData.course && courseData.course.id ?
                <motion.div key={courseData.course.id} variants={itemVariants}>
                    <CourseCard 
                        course={courseData.course} 
                        isEnrolled={true}
                    />
                </motion.div>
                : null
            ))}
        </motion.div>
    );
}


export default function LearningPage() {
    const { user, loading } = useAuth();
    const [userProgress, setUserProgress] = useState<UserProgress | null>(null);

    useEffect(() => {
        if (user) {
            const unsubscribe = listenToUserProgress(user.uid, setUserProgress);
            return () => unsubscribe();
        }
    }, [user]);

    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };
    
    const enrolledCount = userProgress?.courses ? Object.keys(userProgress.courses).length : 0;
    const completedCount = useMemo(() => {
        if (!userProgress?.courses) return 0;
        return Object.values(userProgress.courses).filter(c => c?.progress === 100).length;
    }, [userProgress]);

    const statsWithValues = useMemo(() => [
        { ...stats[0], value: String(enrolledCount) },
        { ...stats[1], value: String(completedCount) },
        { ...stats[2], value: String(completedCount) }, // Certificates count is same as completed courses
        ...stats.slice(3)
    ], [enrolledCount, completedCount]);
    
    if (loading) {
        return <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin w-8 h-8" /></div>
    }

    return (
        <motion.div 
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
        >
            <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Learning & Courses</h1>
                        <p className="text-muted-foreground">Advance your career with expert-curated courses and resources</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search courses..." className="pl-9"/>
                        </div>
                        <Button variant="outline">
                            <Filter className="mr-2 h-4 w-4" />
                            Filter
                        </Button>
                    </div>
                </div>
            </motion.div>

            <motion.div 
                className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
                variants={pageVariants}
            >
                {statsWithValues.map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Tabs defaultValue="course-catalog">
                    <TabsList>
                        <TabsTrigger value="my-learning">My Learning</TabsTrigger>
                        <TabsTrigger value="course-catalog">Course Catalog</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-learning">
                        <MyLearningTab userProgress={userProgress} />
                    </TabsContent>
                    <TabsContent value="course-catalog">
                        <CourseCatalogTab userProgress={userProgress} />
                    </TabsContent>
                    <TabsContent value="achievements">
                        <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                                Your certificates will appear here once you complete a course.
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    )
}
