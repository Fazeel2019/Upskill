
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, FlaskConical, Stethoscope, BookOpen, Youtube, Loader2, PlayCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { listenToResources } from "@/services/resources";
import type { Resource } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

function getYouTubeThumbnail(url: string) {
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
        return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
    return 'https://picsum.photos/seed/placeholder-thumb/400/225'; // Fallback
}

function getYouTubeEmbedUrl(url: string): string {
    if (!url) return '';
    const videoId = url.split('v=')[1]?.split('&')[0];
    if (videoId) {
        return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
    return '';
}


function ResourceCard({ resource, onPlay }: { resource: Resource, onPlay: (resource: Resource) => void }) {
    const categoryColors = {
        Career: "border-purple-500",
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };
    
    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[resource.category]}`}>
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
                    <PlayCircle className="w-16 h-16 text-white/80" />
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


export default function ResourcesPage() {
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
                    <h3 className="font-semibold text-lg">Resource Library Coming Soon</h3>
                    <p className="text-muted-foreground mt-2">
                        We're busy curating the best guides, templates, and materials. Check back shortly!
                    </p>
                </CardContent>
            </Card>
        </motion.div>
    );

    const filters = ["All", "Career", "STEM", "Healthcare", "Public Health"];
    const filteredResources = resources.filter(r => activeFilter === "All" || r.category === activeFilter);
    

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Resource Library</h1>
        <p className="text-muted-foreground">A curated collection of guides, courses, and learning materials to help you excel.</p>
      </motion.div>

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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
        >
            {filteredResources.length > 0 ? filteredResources.map((resource) => (
            <motion.div key={resource.id} variants={itemVariants}>
                <ResourceCard resource={resource} onPlay={setSelectedResource} />
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
    </motion.div>
  );
}
