"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Calendar, User, Play, ListFilter } from "lucide-react";
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

const podcastEpisodes = [
  {
    category: "AI & Technology",
    title: "The Future of AI in Healthcare",
    description: "An in-depth discussion on how artificial intelligence is revolutionizing healthcare,...",
    author: "Dr. Evelyn Reed",
    date: "20/07/2024",
    duration: "45:30",
    image: "https://picsum.photos/seed/podcast-ai/400/225",
    imageHint: "abstract ai"
  },
  {
    category: "Biotechnology",
    title: "Navigating Biotech Startups: From Lab to Market",
    description: "Insights into the challenges and successes of launching and scaling biotech startups...",
    author: "Marcus Thorne",
    date: "15/07/2024",
    duration: "38:15",
    image: "https://picsum.photos/seed/podcast-biotech/400/225",
    imageHint: "science lab"
  },
  {
    category: "Leadership",
    title: "Leadership in STEM: Building High-Performing Teams",
    description: "Strategies for effective leadership in science, technology, engineering, and...",
    author: "Prof. David Kim",
    date: "10/07/2024",
    duration: "52:00",
    image: "https://picsum.photos/seed/podcast-leadership/400/225",
    imageHint: "team meeting"
  }
];

function PodcastCard({ episode }: { episode: typeof podcastEpisodes[0] }) {
  return (
    <Card className="overflow-hidden group transition-shadow hover:shadow-lg rounded-xl">
      <div className="relative">
        <Image
          src={episode.image}
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
            <span>{episode.date}</span>
          </div>
        </div>
        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-opacity">
          <Play className="mr-2" />
          Listen Now
        </Button>
      </CardContent>
    </Card>
  );
}

export default function PodcastsPage() {
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
            <h1 className="text-3xl font-bold tracking-tight font-headline">Upskill Podcasts</h1>
            <p className="text-muted-foreground">Listen to insights from leading STEM & Healthcare professionals</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search podcasts..." className="pl-9" />
            </div>
             <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[180px]">
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

      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={pageVariants}
      >
        {podcastEpisodes.map((episode, index) => (
          <motion.div key={index} variants={itemVariants}>
            <PodcastCard episode={episode} />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
