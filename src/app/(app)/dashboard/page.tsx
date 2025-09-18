
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle, Edit, MessageSquare, Plus, Users, Newspaper, Sparkles, Trophy, ArrowRight } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { listenToPosts, type Post } from "@/services/posts"
import { listenToEvents, type Event } from "@/services/events"
import { isToday } from "date-fns"
import { cn } from "@/lib/utils"

const StatCard = ({ title, value, description, icon: Icon, href, className }: { title: string, value: string, description: string, icon: React.ElementType, href?: string, className?: string }) => (
    <motion.div variants={itemVariants}>
        <Card className={cn("rounded-2xl hover:bg-card/95 transition-colors duration-300 h-full", className)}>
             <Link href={href || "#"} className={!href ? "pointer-events-none" : ""}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{title}</CardTitle>
                  <Icon className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{value}</div>
                  <p className="text-xs">{description}</p>
                </CardContent>
            </Link>
        </Card>
    </motion.div>
);


const QuickActionCard = ({ href, icon: Icon, title, description }: { href: string, icon: React.ElementType, title: string, description: string }) => (
     <motion.div variants={itemVariants}>
        <Card className="group relative overflow-hidden rounded-2xl h-full hover:shadow-lg transition-shadow duration-300">
             <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                <div>
                    <div className="mb-4 rounded-lg p-3 bg-primary/10 w-fit">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold mb-1 text-card-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                <Button asChild size="sm" className="mt-4">
                    <Link href={href}>Go <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </CardContent>
        </Card>
     </motion.div>
);

const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
};

export default function DashboardPage() {
  const [postsTodayCount, setPostsTodayCount] = useState(0);
  const [upcomingEventsCount, setUpcomingEventsCount] = useState(0);

  useEffect(() => {
    const unsubscribePosts = listenToPosts((posts: Post[]) => {
      const todayPosts = posts.filter(post => post.timestamp && isToday(post.timestamp.toDate()));
      setPostsTodayCount(todayPosts.length);
    });

    const unsubscribeEvents = listenToEvents((events: Event[]) => {
      const futureEvents = events.filter(event => {
        const eventDate = typeof event.date === 'string' ? new Date(event.date) : event.date.toDate();
        const today = new Date();
        today.setHours(0,0,0,0); // Set to start of today
        return eventDate >= today;
      });
      setUpcomingEventsCount(futureEvents.length);
    });

    return () => {
      unsubscribePosts();
      unsubscribeEvents();
    };
  }, []);

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <Card className="rounded-2xl bg-destructive text-primary-foreground shadow-lg">
            <CardContent className="p-6">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                <p className="opacity-90">Here's a snapshot of your community activity.</p>
            </CardContent>
        </Card>
      </motion.div>
      
      <motion.div className="grid gap-6 md:grid-cols-3" variants={containerVariants}>
        <StatCard 
            title="New Posts Today" 
            value={String(postsTodayCount)} 
            description={`${postsTodayCount} new discussions`}
            icon={Newspaper}
            href="/community"
            className="bg-green-600 text-white hover:bg-green-700 [&_p]:text-green-100 [&_svg]:text-white"
        />
        <StatCard 
            title="Upcoming Events" 
            value={String(upcomingEventsCount)} 
            description={`${upcomingEventsCount} events scheduled`}
            icon={Calendar}
            href="/events"
            className="text-muted-foreground"
        />
        <StatCard 
            title="Go to Messages" 
            value=">" 
            description="View your conversations" 
            icon={MessageSquare}
            href="/messaging"
             className="text-muted-foreground"
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
             <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <QuickActionCard href="/community" icon={Plus} title="Create a Post" description="Share your thoughts."/>
                    <QuickActionCard href="/events" icon={Calendar} title="Find an Event" description="Join a workshop." />
                </CardContent>
             </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
            <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Community Engagement</CardTitle>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground p-8">
                     <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50 text-primary"/>
                    <h3 className="font-semibold text-lg text-card-foreground">Your engagement activity will appear here.</h3>
                    <p className="mt-1">No data to display</p>
                </CardContent>
            </Card>
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="lg:col-span-1">
          <Card className="rounded-2xl">
              <CardHeader>
                  <CardTitle className="font-headline">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 text-center text-muted-foreground py-10">
                     <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                     <p className="font-semibold text-lg text-card-foreground">You're all caught up!</p>
                     <p>Recent updates and reminders will show up here.</p>
                  </div>
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
