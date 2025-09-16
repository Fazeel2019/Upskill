
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, PlayCircle, Rss } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const podcastEpisodes = [
  {
    episode: 42,
    title: "The Mind of a Surgeon: Precision Under Pressure",
    date: "October 1, 2024",
    description: "An in-depth conversation with Dr. Marcus Webb on the psychological fortitude required for high-stakes surgery and the future of surgical robotics.",
    image: "https://picsum.photos/seed/podcast1/400/400",
    imageHint: "abstract brain",
    length: "48 min",
  },
  {
    episode: 41,
    title: "From Lab Bench to Market: The Biotech Startup Journey",
    date: "September 24, 2024",
    description: "Biotech founder Chloe Bennett shares her story of translating a scientific discovery into a viable company, discussing funding, trials, and tribulations.",
    image: "https://picsum.photos/seed/podcast2/400/400",
    imageHint: "science lab",
    length: "55 min",
  },
  {
    episode: 40,
    title: "Mapping the Next Pandemic: Public Health Surveillance",
    date: "September 17, 2024",
    description: "How are public health experts using data and technology to predict and prevent future outbreaks? A look at the front lines of global health security.",
    image: "https://picsum.photos/seed/podcast3/400/400",
    imageHint: "world map",
    length: "52 min",
  },
  {
    episode: 39,
    title: "Ethical AI in Healthcare: Promise and Pitfalls",
    date: "September 10, 2024",
    description: "We discuss the ethical frameworks needed to deploy AI in diagnostics and patient care responsibly, with ethicist Dr. Alisha Vance.",
    image: "https://picsum.photos/seed/podcast4/400/400",
    imageHint: "artificial intelligence",
    length: "61 min",
  },
];

export default function PodcastPage() {
    const sectionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: "easeOut",
            },
        },
    };
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <motion.section 
            className="bg-card pt-24 pb-16 md:pt-32 md:pb-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
                className="inline-block bg-primary/10 p-4 rounded-full mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
            >
                <Mic className="w-10 h-10 text-primary" />
            </motion.div>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
              Skills Without Borders
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Conversations with the leaders, innovators, and pioneers shaping the future of health and science.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Button size="lg" variant="outline">
                <Rss className="mr-2 h-4 w-4" /> Follow on Spotify
              </Button>
              <Button size="lg" variant="outline">
                <Rss className="mr-2 h-4 w-4" /> Subscribe on Apple
              </Button>
            </div>
          </div>
        </motion.section>

        <motion.section 
            className="py-16 md:py-24"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">All Episodes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {podcastEpisodes.map((episode) => (
                <motion.div key={episode.episode} variants={cardVariants}>
                    <Card className="group overflow-hidden">
                    <div className="flex flex-col sm:flex-row">
                        <div className="sm:w-1/3 relative">
                        <Image
                            src={episode.image}
                            alt={episode.title}
                            width={400}
                            height={400}
                            className="w-full h-48 sm:h-full object-cover"
                            data-ai-hint={episode.imageHint}
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <PlayCircle className="w-16 h-16 text-white/80"/>
                        </div>
                        </div>
                        <div className="sm:w-2/3">
                        <CardHeader>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <p>Episode {episode.episode}</p>
                            <p>{episode.date}</p>
                            </div>
                            <CardTitle className="font-headline text-xl">
                            <Link href="#" className="hover:text-primary transition-colors">{episode.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground line-clamp-3">{episode.description}</p>
                        </CardContent>
                        <div className="p-6 pt-0">
                            <Badge variant="secondary">{episode.length}</Badge>
                        </div>
                        </div>
                    </div>
                    </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
