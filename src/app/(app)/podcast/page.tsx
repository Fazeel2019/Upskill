
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Play, ListFilter, MicVocal, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState, useEffect } from "react";
import { listenToPodcasts } from "@/services/podcasts";
import { Podcast } from "@/lib/data";
import { format } from "date-fns";

function PodcastCard({ episode }: { episode: Podcast }) {
  return (
    <Card className="overflow-hidden group transition-shadow hover:shadow-lg rounded-xl">
      <div className="relative">
        <Image
          src={episode.imageUrl}
          alt={episode.title}
          width={400}
          height={225}
          className="w-full h-auto object-cover"
          data-ai-hint={episode.imageHint}
        />
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
          {episode.duration}
        </div>
      </div>
      <CardContent className="p-4">
        <Badge variant="outline" className="mb-2">{episode.category}</Badge>
        <h3 className="font-bold text-lg font-headline hover:text-primary transition-colors cursor-pointer">{episode.title}</h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{episode.description}</p>
        <div className="flex justify-between items-center text-xs text-muted-foreground mt-4 pt-4 border-t">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5" />
            <span>{episode.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>{format(new Date(episode.date), "MMM d, yyyy")}</span>
          </div>
        </div>
        <Button asChild className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity">
            <a href={episode.episodeUrl} target="_blank" rel="noopener noreferrer">
                <Play className="mr-2" />
                Listen Now
            </a>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PodcastsPage() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToPodcasts((newPodcasts) => {
        setPodcasts(newPodcasts);
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

  const EmptyState = () => (
    <motion.div variants={itemVariants} className="text-center py-16 md:col-span-3">
        <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
                <MicVocal className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">No Podcasts Yet</h3>
                <p className="text-muted-foreground mt-2">
                    Check back soon for new episodes and insights from industry leaders.
                </p>
            </CardContent>
        </Card>
    </motion.div>
  );

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.section
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-center overflow-hidden"
        variants={itemVariants}
      >
        <Image
          src="/upskilp.jpg"
          alt="Upskill Podcasts Banner"
          fill
          className="object-cover"
          data-ai-hint="abstract background"
        />
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="container relative mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-white">
            Upskill Podcasts
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Listen to insights from leading STEM & Healthcare professionals
          </p>
        </div>
      </motion.section>

      <motion.div variants={itemVariants}>
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="flex items-center gap-2 flex-grow">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search podcasts..." className="pl-9" />
            </div>
             <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="ai-tech">AI & Technology</SelectItem>
                    <SelectItem value="biotech">Biotechnology</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
      </motion.div>

      {loading ? (
        <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin" />
        </div>
        ) : (
        <motion.div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={pageVariants}
        >
            {podcasts.length > 0 ? podcasts.map((episode) => (
            <motion.div key={episode.id} variants={itemVariants}>
                <PodcastCard episode={episode} />
            </motion.div>
            )) : (
                <EmptyState />
            )}
        </motion.div>
      )}
    </motion.div>
  );
}
