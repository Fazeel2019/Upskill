

"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Event as EventType } from "@/lib/data";
import { ArrowRight, Clock, Calendar as CalendarIcon, Loader2, CheckCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { listenToEvents } from "@/services/events";
import { useAuth } from "@/hooks/use-auth";

function EventCard({ event, userId }: { event: EventType, userId?: string }) {
    const categoryColors = {
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };
    
    const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date.toDate();
    const eventUrl = `/events/${event.id}`;

    const isRegistered = useMemo(() => {
        if (!userId || !event.registeredUids) return false;
        return event.registeredUids.includes(userId);
    }, [userId, event.registeredUids]);

    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[event.category]}`}>
            <div className="relative h-48">
                 <Link href={eventUrl}>
                    <Image 
                        src={event.imageUrl} 
                        alt={event.title} 
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{objectFit: "cover"}}
                        className="transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={event.imageHint}
                    />
                </Link>
            </div>
            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{event.type}</Badge>
                    <Badge variant="secondary">{eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Badge>
                </div>
                <CardTitle className="font-headline text-lg mt-2 leading-tight">
                    <Link href={eventUrl} className="hover:text-primary transition-colors">{event.title}</Link>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{event.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4"/>
                    <span>{event.time}</span>
                </div>
                {isRegistered ? (
                    <Badge variant="secondary" className="border-green-500 text-green-700">
                        <CheckCircle className="w-4 h-4 mr-1"/>
                        Registered
                    </Badge>
                ) : (
                    <Button size="sm" asChild>
                        <Link href={eventUrl}>RSVP Now <ArrowRight className="ml-2 w-4 h-4"/></Link>
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}


export default function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToEvents((allEvents) => {
        const publicEvents = allEvents.filter(e => !e.isExclusive);
        setEvents(publicEvents);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const upcomingEvents = events.filter(e => new Date(e.date as string) >= new Date());
  const pastEvents = events.filter(e => new Date(e.date as string) < new Date());
  const eventDates = upcomingEvents.map(e => new Date(e.date as string));

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 }
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };
  
  const EmptyState = ({title, description}: {title: string, description: string}) => (
    <div className="text-center py-16">
        <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-muted-foreground mt-2">
                    {description}
                </p>
            </CardContent>
        </Card>
    </div>
  )

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={sectionVariants}
    >
        <motion.div variants={sectionVariants}>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Events & Workshops</h1>
            <p className="text-muted-foreground">Connect, learn, and grow with live and virtual events from across the community.</p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={sectionVariants}
        >
            <div className="lg:col-span-2">
                 <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        {loading ? <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" /></div> : upcomingEvents.length > 0 ? (
                             <motion.div 
                                className="grid sm:grid-cols-2 gap-6"
                                variants={sectionVariants}
                            >
                                {upcomingEvents.map((event, i) => (
                                    <motion.div key={event.id} variants={cardVariants}>
                                        <EventCard event={event} userId={user?.uid} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div variants={cardVariants}>
                                <EmptyState title="No Upcoming Events" description="Check back soon for new webinars, workshops, and summits." />
                            </motion.div>
                        )}
                    </TabsContent>
                    <TabsContent value="past">
                        {loading ? <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" /></div> : pastEvents.length > 0 ? (
                            <motion.div 
                                className="grid sm:grid-cols-2 gap-6"
                                variants={sectionVariants}
                            >
                                {pastEvents.map(event => (
                                    <motion.div key={event.id} variants={cardVariants}>
                                        <EventCard event={event} userId={user?.uid} />
                                    </motion.div>
                                ))}
                            </motion.div>
                         ) : (
                            <motion.div variants={cardVariants}>
                                <EmptyState title="No Past Events" description="Previous event recordings and materials will be shown here." />
                            </motion.div>
                         )}
                    </TabsContent>
                </Tabs>
            </div>
            <motion.div className="row-start-1 lg:row-auto" variants={cardVariants}>
                <Card>
                    <CardHeader>
                        <CardTitle className="font-headline">Event Calendar</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="multiple"
                            selected={eventDates}
                            className="p-0"
                            classNames={{
                                day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary/90",
                            }}
                        />
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    </motion.div>
  )
}
