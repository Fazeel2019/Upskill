
"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { listenToCourses } from "@/services/courses";
import { type Course } from "@/lib/data";
import { Loader2, ArrowRight } from "lucide-react";

function CourseCard({ course }: { course: Course }) {
    const categoryColors: Record<string, string> = {
        Career: "border-purple-500",
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };

    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[course.category] || 'border-gray-500'}`}>
            <Link href={`/learning/course/${course.id}`} className="relative h-56 cursor-pointer">
                <Image 
                    src={course.thumbnailUrl}
                    alt={course.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={course.imageHint || "course thumbnail"}
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                 <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm text-foreground font-bold py-1 px-3 rounded-full text-lg">
                    ${course.price}
                 </div>
            </Link>
            <CardHeader>
                <Badge variant="outline" className="w-fit">{course.category}</Badge>
                <h3 className="font-headline text-xl font-semibold leading-tight pt-2">
                    <Link href={`/learning/course/${course.id}`} className="hover:text-primary transition-colors">
                        {course.title}
                    </Link>
                </h3>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{course.description}</p>
            </CardContent>
            <CardFooter>
                 <Button asChild className="w-full">
                    <Link href={`/learning/course/${course.id}`}>
                        View Course <ArrowRight className="ml-2 w-4 h-4"/>
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}


export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = listenToCourses((newCourses) => {
            setCourses(newCourses);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const pageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0 },
    };


  return (
    <motion.div
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Courses</h1>
        <p className="text-muted-foreground mt-2">
          Browse our catalog of expert-led courses to supercharge your career.
        </p>
      </motion.div>
      
       {loading ? (
            <div className="flex justify-center py-16">
                <Loader2 className="w-8 h-8 animate-spin" />
            </div>
        ) : courses.length > 0 ? (
            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={pageVariants}
            >
                {courses.map((course) => (
                    <motion.div key={course.id} variants={itemVariants}>
                        <CourseCard course={course} />
                    </motion.div>
                ))}
            </motion.div>
        ) : (
             <Card className="mt-6">
                <CardContent className="p-8 text-center text-muted-foreground">
                    <p>No paid courses are available yet. Check back soon!</p>
                </CardContent>
            </Card>
        )}
    </motion.div>
  );
}

