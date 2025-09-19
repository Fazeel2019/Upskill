"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, CheckCircle, Award as CertificateIcon, Clock, Filter, Search, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const stats = [
    { title: "Courses Enrolled", value: "8", icon: Book, color: "bg-blue-100 dark:bg-blue-900/50", iconColor: "text-blue-500" },
    { title: "Completed", value: "3", icon: CheckCircle, color: "bg-green-100 dark:bg-green-900/50", iconColor: "text-green-500" },
    { title: "Certificates", value: "5", icon: CertificateIcon, color: "bg-purple-100 dark:bg-purple-900/50", iconColor: "text-purple-500" },
    { title: "Study Hours", value: "127", icon: Clock, color: "bg-orange-100 dark:bg-orange-900/50", iconColor: "text-orange-500" }
];

const courses = [
    {
        title: "AI in Healthcare Leadership",
        category: "AI & Technology",
        instructor: "Dr. Sarah Mitchell",
        duration: "8 weeks",
        rating: 4.9,
        progress: 65,
        status: "In Progress",
        image: "https://picsum.photos/seed/course1/400/225",
        imageHint: "abstract ai",
        description: "Master the integration of artificial intelligence in healthcare management an...",
    },
    {
        title: "Data Science for Healthcare",
        category: "Data Science",
        instructor: "Dr. Lisa Park",
        duration: "10 weeks",
        rating: 4.9,
        progress: 100,
        status: "Completed",
        image: "https://picsum.photos/seed/course2/400/225",
        imageHint: "team working",
        description: "Apply advanced data science techniques to solve complex healthcare challenges.",
    },
]

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

function CourseCard({ course }: { course: typeof courses[0] }) {
    return (
        <Card className="overflow-hidden group transition-shadow hover:shadow-lg">
            <div className="relative">
                <Image 
                    src={course.image}
                    alt={course.title}
                    width={400}
                    height={225}
                    className="w-full h-auto object-cover"
                    data-ai-hint={course.imageHint}
                />
                <Badge className={cn(
                    "absolute top-3 right-3", 
                    course.status === 'Completed' ? 'bg-green-500/80 border-green-400' : 'bg-blue-500/80 border-blue-400',
                    'text-white'
                )}>
                    {course.status}
                </Badge>
                {course.status === 'In Progress' && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                        <div className="flex items-center justify-between text-white text-xs font-semibold mb-1">
                            <span>Progress</span>
                            <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                    </div>
                )}
            </div>
            <CardContent className="p-4">
                 <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-semibold text-primary">{course.category}</p>
                    <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold">{course.rating}</span>
                    </div>
                </div>
                <h3 className="font-bold text-lg font-headline">{course.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mt-4 pt-4 border-t">
                    <span>Dr. {course.instructor.split(" ").slice(-1)}</span>
                    <span>{course.duration}</span>
                </div>
            </CardContent>
            <div className="p-4 pt-0">
                <Button className="w-full" variant={course.status === 'Completed' ? 'outline' : 'default'}>
                    {course.status === 'Completed' ? <CheckCircle className="mr-2" /> : <Play className="mr-2" />}
                    {course.status === 'Completed' ? 'Completed' : 'Continue'}
                </Button>
            </div>
        </Card>
    )
}

export default function LearningPage() {
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
            className="space-y-6"
            initial="hidden"
            animate="visible"
            variants={pageVariants}
        >
            <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Learning & Resources</h1>
                        <p className="text-muted-foreground">Advance your career with expert-curated courses and resources</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"/>
                            <Input placeholder="Search courses and resources..." className="pl-9"/>
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
                {stats.map((stat, index) => (
                    <motion.div key={index} variants={itemVariants}>
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div variants={itemVariants}>
                <Tabs defaultValue="my-learning">
                    <TabsList>
                        <TabsTrigger value="my-learning">My Learning</TabsTrigger>
                        <TabsTrigger value="course-catalog">Course Catalog</TabsTrigger>
                        <TabsTrigger value="resources">Resources</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-learning">
                        <motion.div 
                            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                            variants={pageVariants}
                        >
                            {courses.map((course, index) => (
                                 <motion.div key={index} variants={itemVariants}>
                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </motion.div>
                    </TabsContent>
                    <TabsContent value="course-catalog">
                        <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                                Course Catalog coming soon!
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    )
}
