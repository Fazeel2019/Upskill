import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockEvents, mockPastEvents, Event as EventType } from "@/lib/data";
import { ArrowRight, Clock, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

function EventCard({ event }: { event: EventType }) {
    const categoryColors = {
        STEM: "border-blue-500",
        Healthcare: "border-green-500",
        "Public Health": "border-red-500",
    };

    return (
        <Card className={`flex flex-col overflow-hidden group border-l-4 ${categoryColors[event.category]}`}>
            <div className="relative h-48">
                <Image 
                    src={event.imageUrl} 
                    alt={event.title} 
                    layout="fill" 
                    objectFit="cover" 
                    className="transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={event.imageHint}
                />
            </div>
            <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Badge variant="outline">{event.type}</Badge>
                    <Badge variant="secondary">{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</Badge>
                </div>
                <CardTitle className="font-headline text-lg mt-2 leading-tight">
                    <Link href="#" className="hover:text-primary transition-colors">{event.title}</Link>
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
                <Button size="sm" asChild>
                    <Link href="#">RSVP Now <ArrowRight className="ml-2 w-4 h-4"/></Link>
                </Button>
            </CardFooter>
        </Card>
    )
}


export default function EventsPage() {
  const eventDates = mockEvents.map(e => new Date(e.date));

  return (
    <div className="space-y-8">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Events & Workshops</h1>
            <p className="text-muted-foreground">Connect, learn, and grow with live and virtual events from across the community.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
                 <Tabs defaultValue="upcoming">
                    <TabsList className="mb-4">
                        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                        <TabsTrigger value="past">Past Events</TabsTrigger>
                    </TabsList>
                    <TabsContent value="upcoming">
                        <div className="grid sm:grid-cols-2 gap-6">
                            {mockEvents.map(event => <EventCard key={event.id} event={event} />)}
                        </div>
                    </TabsContent>
                    <TabsContent value="past">
                         <div className="grid sm:grid-cols-2 gap-6">
                            {mockPastEvents.map(event => <EventCard key={event.id} event={event} />)}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
            <div className="row-start-1 lg:row-auto">
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
            </div>
        </div>
    </div>
  )
}
