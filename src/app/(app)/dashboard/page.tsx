
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle, Edit, MessageSquare, Plus, Users, Newspaper, Sparkles, Trophy, ArrowRight, BookOpen, Briefcase } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { listenToPosts, type Post } from "@/services/posts"
import { listenToEvents, type Event } from "@/services/events"
import { isToday } from "date-fns"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { addNotification } from "@/services/notifications"
import { useToast } from "@/hooks/use-toast"

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


const QuickActionCard = ({ href, icon: Icon, title, description, children, bgClass, iconClass }: { href: string, icon: React.ElementType, title: string, description: string, children?: React.ReactNode, bgClass: string, iconClass: string }) => (
     <motion.div variants={itemVariants}>
        <Card className="group relative overflow-hidden rounded-2xl h-full hover:shadow-lg transition-shadow duration-300">
             <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                <div>
                    <div className={cn("mb-4 rounded-lg p-3 w-fit", bgClass)}>
                        <Icon className={cn("h-6 w-6", iconClass)} />
                    </div>
                    <h3 className="font-semibold mb-1 text-card-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
                {children}
                <Button asChild size="sm" className="mt-4 bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 text-white">
                    <Link href={href}>Go <ArrowRight className="ml-2 h-4 w-4"/></Link>
                </Button>
            </CardContent>
        </Card>
     </motion.div>
);

function LearningCard() {
    const [progress, setProgress] = useState(60);
    const { user } = useAuth();
    const { toast } = useToast();

    const handleStudy = async () => {
        const newProgress = Math.min(progress + 15, 100);
        setProgress(newProgress);

        if (user) {
            await addNotification(user.uid, {
                type: 'course_progress',
                message: `You've completed another 15% of your course! Keep going!`,
                link: '/resources',
            });
            toast({
                title: "Progress Saved!",
                description: "Your learning progress has been updated.",
            });
        }
    };
    
    return (
         <motion.div variants={itemVariants}>
            <Card className="group relative overflow-hidden rounded-2xl h-full hover:shadow-lg transition-shadow duration-300">
                 <CardContent className="p-6 flex flex-col items-start justify-between h-full">
                    <div>
                        <div className={cn("mb-4 rounded-lg p-3 w-fit", "bg-green-100")}>
                            <BookOpen className={cn("h-6 w-6", "text-green-600")} />
                        </div>
                        <h3 className="font-semibold mb-1 text-card-foreground">Continue Learning</h3>
                        <p className="text-sm text-muted-foreground">Finish your course on modern healthcare.</p>
                    </div>
                     <div className="w-full mt-2">
                        <Progress value={progress} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-1">{progress}% complete</p>
                    </div>
                    <Button size="sm" className="mt-4" onClick={handleStudy}>
                        Study for 15 mins
                    </Button>
                </CardContent>
            </Card>
         </motion.div>
    );
}

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
      const todayPosts = posts.filter(post => {
          if (!post.timestamp) return false;
          const postDate = post.timestamp.toDate();
          return isToday(postDate);
      });
      setPostsTodayCount(todayPosts.length);
    });

    const unsubscribeEvents = listenToEvents((events: Event[]) => {
      const futureEvents = events.filter(event => {
        if (!event.date) return false;
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
        <Card className="rounded-2xl bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-lg border shadow-lg text-foreground">
            <CardContent className="p-6">
                <h1 className="text-3xl font-bold tracking-tight">Welcome back!</h1>
                <p className="opacity-90">Here's a snapshot of your community activity.</p>
            </CardContent>
        </Card>
      </motion.div>
      
      <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4" variants={containerVariants}>
        <StatCard 
            title="Career Progress" 
            value="75%" 
            description="Profile Completion"
            icon={Briefcase}
            href="/profile"
            className="bg-purple-600 text-white hover:bg-purple-700 [&_p]:text-purple-100 [&_svg]:text-white"
        />
        <StatCard 
            title="Upcoming Events" 
            value={String(upcomingEventsCount)} 
            description={`${upcomingEventsCount} events scheduled`}
            icon={Calendar}
            href="/events"
            className="bg-red-600 text-white hover:bg-red-700 [&_p]:text-red-100 [&_svg]:text-white"
        />
        <StatCard 
            title="Courses Completed" 
            value="0" 
            description="Keep up the great work!" 
            icon={Trophy}
            href="#"
             className="bg-blue-600 text-white hover:bg-blue-700 [&_p]:text-blue-100 [&_svg]:text-white"
        />
         <StatCard 
            title="Go to Messages" 
            value=">" 
            description="View your conversations" 
            icon={MessageSquare}
            href="/messaging"
             className="bg-green-600 text-white hover:bg-green-700 [&_p]:text-green-100 [&_svg]:text-white"
        />
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
             <Card className="rounded-2xl">
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                    <QuickActionCard href="/community" icon={Plus} title="Create a Post" description="Share your thoughts." bgClass="bg-purple-100" iconClass="text-purple-600"/>
                    <QuickActionCard href="/events" icon={Calendar} title="Find an Event" description="Join a workshop." bgClass="bg-orange-100" iconClass="text-orange-600"/>
                    <QuickActionCard href="/messaging" icon={MessageSquare} title="Message a Mentor" description="Get guidance." bgClass="bg-blue-100" iconClass="text-blue-600" />
                    <LearningCard />
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
