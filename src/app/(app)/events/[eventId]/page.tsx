
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Event as EventType } from "@/lib/data";
import { getEvent } from "@/services/events";
import { ArrowLeft, Calendar, Clock, Ticket } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";


function EventDetailSkeleton() {
    return (
        <div className="space-y-8">
            <Skeleton className="h-10 w-48" />
            <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Skeleton className="h-full w-full" />
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-5/6" />
                </div>
                <div>
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    )
}

export default function EventDetailPage({ params }: { params: { eventId: string } }) {
    const [event, setEvent] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    useEffect(() => {
        const fetchEvent = async () => {
            setLoading(true);
            try {
                const eventData = await getEvent(params.eventId);
                if (eventData) {
                    setEvent(eventData);
                } else {
                    notFound();
                }
            } catch (error) {
                console.error("Failed to fetch event:", error);
                notFound();
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [params.eventId]);
    
    const handleRegister = () => {
        toast({
            title: "Registration Successful!",
            description: `You are now registered for ${event?.title}.`,
        });
    }

    if (loading) {
        return <EventDetailSkeleton />;
    }

    if (!event) {
        return notFound();
    }
    
    const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date.toDate();

    return (
        <motion.div 
            className="space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                <Button variant="ghost" asChild>
                    <Link href="/events">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Events
                    </Link>
                </Button>
            </motion.div>

            <motion.div 
                className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    style={{objectFit: "cover"}}
                    sizes="100vw"
                    data-ai-hint={event.imageHint}
                    priority
                />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                 <div className="absolute bottom-0 left-0 p-8">
                     <Badge variant="secondary" className="mb-2">{event.type}</Badge>
                    <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">
                        {event.title}
                    </h1>
                 </div>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8">
                <motion.div 
                    className="md:col-span-2 space-y-6"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <h2 className="font-headline text-2xl font-semibold">About this event</h2>
                    <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                        {event.description}
                    </p>
                </motion.div>
                <motion.div 
                    className="md:col-span-1 space-y-6"
                     initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <Card className="bg-muted/50">
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-start gap-4">
                                <Calendar className="h-5 w-5 mt-1 text-primary"/>
                                <div>
                                    <p className="font-semibold">Date</p>
                                    <p className="text-muted-foreground">{eventDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <Clock className="h-5 w-5 mt-1 text-primary"/>
                                <div>
                                    <p className="font-semibold">Time</p>
                                    <p className="text-muted-foreground">{event.time}</p>
                                </div>
                            </div>
                            <Button size="lg" className="w-full" onClick={handleRegister}>
                                <Ticket className="mr-2 h-5 w-5" />
                                Register for this Event
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    )
}
