
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, CheckCircle, Award as CertificateIcon, Clock, Filter, Search, Star, Play, BookOpen, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import React, { useEffect, useState } from "react"
import { listenToResources } from "@/services/resources"
import type { Resource } from "@/lib/data"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useAuth } from "@/hooks/use-auth"
import { updateUserProgress } from "@/services/progress"

const stats = [
    { title: "Courses Enrolled", value: "0", icon: Book, color: "bg-blue-100 dark:bg-blue-900/50", iconColor: "text-blue-500" },
    { title: "Completed", value: "0", icon: CheckCircle, color: "bg-green-100 dark:bg-green-900/50", iconColor: "text-green-500" },
    { title: "Certificates", value: "0", icon: CertificateIcon, color: "bg-purple-100 dark:bg-purple-900/50", iconColor: "text-purple-500" },
    { title: "Study Hours", value: "0", icon: Clock, color: "bg-orange-100 dark:bg-orange-900/50", iconColor: "text-orange-500" }
];

const courses: any[] = [];

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

function getYouTubeThumbnail(url: string) {
    if (!url) return 'https://picsum.photos/seed/placeholder-thumb/400/225';
    const videoIdMatch = url.match(/(?:v=|\/embed\/|\/)([\w-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
    return 'https://picsum.photos/seed/placeholder-thumb/400/225'; // Fallback
}

export function getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoIdMatch = url.match(/(?:v=|\/embed\/|\/)([\w-]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return '';
}


function ResourceCard({ resource, onPlay }: { resource: Resource, onPlay: (resource: Resource) => void }) {
    const categoryColors: Record<string, string> = {
        Career: "border-purple-500",
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };
    
    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[resource.category] || 'border-gray-500'}`}>
            <div className="relative h-48 cursor-pointer" onClick={() => onPlay(resource)}>
                <Image 
                    src={getYouTubeThumbnail(resource.youtubeUrl)}
                    alt={resource.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{objectFit: "cover"}}
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="youtube thumbnail"
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <h3 className="text-white font-bold text-lg leading-tight">{resource.title}</h3>
                </div>
                 <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Play className="w-16 h-16 text-white/80" />
                </div>
            </div>
            <CardContent className="pt-4 flex-grow">
                <p className="text-sm text-muted-foreground line-clamp-3">{resource.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                 <Badge variant="outline">{resource.category}</Badge>
                <Button size="sm" onClick={() => onPlay(resource)}>
                    Start Learning
                </Button>
            </CardFooter>
        </Card>
    )
}

function CourseCatalogTab() {
    const { user } = useAuth();
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState("All");
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    useEffect(() => {
        setLoading(true);
        const unsubscribe = listenToResources((newResources) => {
            setResources(newResources);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handlePlay = (resource: Resource) => {
        setSelectedResource(resource);
        if (user) {
            // This is a simplified progress tracking.
            // For real progress, we'd need to use the YouTube IFrame API.
            updateUserProgress(user.uid, {
                resourceId: resource.id,
                resourceTitle: resource.title,
                resourceYoutubeUrl: resource.youtubeUrl,
                progress: 5, // Mark as started
            });
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
                    <h3 className="font-semibold text-lg">Resource Library is Empty</h3>
                    <p className="text-muted-foreground mt-2">
                        No learning materials have been added yet. Check back shortly!
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );

    const filters = ["All", "Career", "STEM", "Healthcare", "Public Health"];
    const filteredResources = resources.filter(r => activeFilter === "All" || r.category === activeFilter);

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
                    {filteredResources.length > 0 ? filteredResources.map((resource) => (
                    <motion.div key={resource.id} variants={itemVariants}>
                        <ResourceCard resource={resource} onPlay={handlePlay} />
                    </motion.div>
                    )) : (
                        <EmptyState />
                    )}
                </motion.div>
            )}

            <Dialog open={!!selectedResource} onOpenChange={(open) => !open && setSelectedResource(null)}>
                <DialogContent className="max-w-3xl p-0">
                {selectedResource && (
                    <>
                    <DialogHeader>
                        <DialogTitle className="sr-only">{selectedResource.title}</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video">
                        {getYouTubeEmbedUrl(selectedResource.youtubeUrl) && (
                            <iframe
                                width="100%"
                                height="100%"
                                src={getYouTubeEmbedUrl(selectedResource.youtubeUrl)}
                                title={selectedResource.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="rounded-t-lg"
                            ></iframe>
                        )}
                        </div>
                    </>
                )}
                </DialogContent>
            </Dialog>
        </div>
    );
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
                <Tabs defaultValue="course-catalog">
                    <TabsList>
                        <TabsTrigger value="my-learning">My Learning</TabsTrigger>
                        <TabsTrigger value="course-catalog">Course Catalog</TabsTrigger>
                        <TabsTrigger value="achievements">Achievements</TabsTrigger>
                    </TabsList>
                    <TabsContent value="my-learning">
                         {courses.length > 0 ? (
                            <motion.div 
                                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"
                                variants={pageVariants}
                            >
                                {/* Content for My Learning */}
                            </motion.div>
                         ) : (
                             <Card className="mt-6">
                                <CardContent className="p-8 text-center text-muted-foreground">
                                    You are not enrolled in any courses yet.
                                </CardContent>
                            </Card>
                         )}
                    </TabsContent>
                    <TabsContent value="course-catalog">
                        <CourseCatalogTab />
                    </TabsContent>
                    <TabsContent value="achievements">
                        <Card>
                            <CardContent className="p-8 text-center text-muted-foreground">
                                Achievements coming soon!
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </motion.div>
    )
}
