

"use client"
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ArrowRight, Briefcase, HeartPulse, Mic, Users } from "lucide-react";
import Image from "next/image";
import PublicHeader from "@/components/public-header";
import Footer from "@/components/footer";
import { cn } from '@/lib/utils';
import { motion } from "framer-motion";

const communityPosts = [
  {
    author: "Dr. Emily Carter",
    avatar: "https://picsum.photos/seed/101/40/40",
    handle: "@emilycarter",
    content: "Just published a new paper on CRISPR advancements. The potential for gene editing is evolving so rapidly! What are your thoughts on the ethical implications?",
    category: "STEM",
  },
  {
    author: "David Chen, MPH",
    avatar: "https://picsum.photos/seed/102/40/40",
    handle: "@davidchen",
    content: "Our latest community health initiative just reduced local smoking rates by 15%! A small win, but it feels huge. It's all about consistent, targeted education.",
    category: "Public Health",
  },
  {
    author: "Aisha Khan, RN",
    avatar: "https://picsum.photos/seed/103/40/40",
    handle: "@aishakhan",
    content: "What are the best strategies you've found for managing nurse burnout? Looking for practical tips to share with my team. We need to support each other.",
    category: "Healthcare",
  },
];

const upcomingEvents = [
  {
    title: "AI in Diagnostics Webinar",
    date: "Oct 28, 2024",
    description: "Explore how artificial intelligence is reshaping medical diagnostics.",
  },
  {
    title: "Networking for STEM Grads",
    date: "Nov 12, 2024",
    description: "Connect with industry leaders and get career advice.",
  },
  {
    title: "Public Health Policy Summit",
    date: "Dec 05, 2024",
    description: "Discussing the future of global health policies.",
  },
];

const podcastEpisodes = [
  {
    title: "The Mind of a Surgeon",
    episode: 42,
    description: "An interview with Dr. Marcus Webb on high-stakes surgery.",
  },
  {
    title: "From Lab to Market",
    episode: 41,
    description: "The journey of a biotech startup with founder Chloe Bennett.",
  },
];

const heroImages = [
    { src: "https://picsum.photos/seed/hero1/1920/1080", hint: "scientist in lab" },
    { src: "https://picsum.photos/seed/hero2/1920/1080", hint: "doctor with patient" },
    { src: "https://picsum.photos/seed/hero3/1920/1080", hint: "community health event" },
];

export default function Home() {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prevImage) => (prevImage + 1) % heroImages.length);
        }, 7000);
        return () => clearInterval(timer);
    }, []);

    const sectionVariants = {
      hidden: { opacity: 0, y: 50 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };
    
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.15,
                duration: 0.5,
                ease: "easeOut",
            },
        }),
    };


  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <section className="relative bg-card pt-20 pb-20 md:pt-32 md:pb-24 overflow-hidden">
          {heroImages.map((image, index) => (
            <Image
                key={index}
                src={image.src}
                alt="Hero background"
                layout="fill"
                objectFit="cover"
                data-ai-hint={image.hint}
                className={cn(
                    "transition-opacity duration-1000 ease-in-out absolute inset-0",
                    currentImage === index ? "opacity-40" : "opacity-0",
                    currentImage === index ? "animate-ken-burns" : "",
                )}
            />
          ))}
          <div className="absolute inset-0 bg-primary/10 [mask-image:radial-gradient(100%_50%_at_50%_0%,rgba(255,255,255,0.4)_0%,rgba(255,255,255,0)_100%)]"></div>
           <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
          <div className="container relative mx-auto px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <Badge variant="secondary" className="mb-4">
                Connect. Learn. Grow.
                </Badge>
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter mb-4 text-foreground">
                The Global Hub for Professional Growth
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Upskill Community is where healthcare, STEM, and public health
                professionals connect, share knowledge, and advance their careers.
                </p>
                <div className="flex justify-center gap-4">
                <Button asChild size="lg">
                    <Link href="/signup">Join Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/about">Learn More</Link>
                </Button>
                </div>
            </motion.div>
          </div>
        </section>

        <motion.section 
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                Who We Are For
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                A dedicated space for the brilliant minds shaping our future.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <motion.div custom={0} variants={cardVariants}>
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      <Briefcase className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline mt-4">STEM Professionals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Connect with fellow scientists, engineers, and tech innovators.
                      Share research, discuss trends, and collaborate on projects.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div custom={1} variants={cardVariants}>
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      <HeartPulse className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline mt-4">Healthcare Experts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Join doctors, nurses, and allied health professionals in a
                      supportive network for clinical insights and career development.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div custom={2} variants={cardVariants}>
                <Card>
                  <CardHeader>
                    <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit">
                      <Users className="w-8 h-8 text-primary" />
                    </div>
                    <CardTitle className="font-headline mt-4">Public Health Advocates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Engage with practitioners and policymakers to tackle global
                      health challenges and drive impactful community programs.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </motion.section>
        
        <motion.section 
          className="bg-card py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                  Latest Community Buzz
                </h2>
                <p className="text-lg text-muted-foreground mt-2">
                  See what your peers are talking about right now.
                </p>
              </div>
              <Button asChild variant="ghost" className="mt-4 md:mt-0">
                <Link href="/community">
                  View Full Feed <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {communityPosts.map((post, index) => (
                <motion.div key={index} custom={index} variants={cardVariants}>
                    <Card className="flex flex-col h-full">
                    <CardHeader>
                        <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={post.avatar} alt={post.author} data-ai-hint="people portrait"/>
                            <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{post.author}</p>
                            <p className="text-sm text-muted-foreground">{post.handle}</p>
                        </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm">{post.content}</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                        <Badge>{post.category}</Badge>
                    </div>
                    </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section needs a
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                      Upcoming Events
                    </h2>
                    <p className="text-lg text-muted-foreground mt-2">
                      Sharpen your skills and expand your network.
                    </p>
                  </div>
                  <Button asChild variant="ghost">
                    <Link href="/events">
                      All Events <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <motion.div key={index} custom={index} variants={cardVariants}>
                        <Card>
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            </div>
                            <div className="text-right ml-4 shrink-0">
                            <Badge variant="outline">{event.date}</Badge>
                            </div>
                        </CardContent>
                        </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div>
                 <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                      Featured Podcast
                    </h2>
                     <p className="text-lg text-muted-foreground mt-2">
                      Skills Without Borders: Insights on the go.
                    </p>
                  </div>
                  <Button asChild variant="ghost">
                    <Link href="/podcast">
                      All Episodes <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="space-y-4">
                  {podcastEpisodes.map((episode, index) => (
                    <motion.div key={index} custom={index} variants={cardVariants}>
                        <Card className="overflow-hidden">
                        <div className="flex">
                            <Image src={`https://picsum.photos/seed/podcast${index}/120/120`} alt={episode.title} width={120} height={120} className="object-cover" data-ai-hint="abstract podcast"/>
                            <div className="p-4">
                            <p className="font-semibold">{`Ep ${episode.episode}: ${episode.title}`}</p>
                            <p className="text-sm text-muted-foreground mt-1">{episode.description}</p>
                            <Button variant="link" className="p-0 mt-2 h-auto">
                                <Mic className="mr-2 h-4 w-4" />
                                Play Now
                            </Button>
                            </div>
                        </div>
                        </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
}
