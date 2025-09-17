

"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Calendar, CheckCircle, Edit, MessageSquare, Plus, Users, Newspaper, Sparkles, Trophy } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const StatCard = ({ title, value, description, icon: Icon }: { title: string, value: string, description: string, icon: React.ElementType }) => (
    <motion.div variants={itemVariants}>
        <Card className="rounded-2xl hover:bg-card/95 transition-colors duration-300 h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
              <Icon className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{value}</div>
              <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
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
                    <Link href={href}>Go</Link>
                </Button>
            </div>
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
            value="0" 
            description="No new posts yet" 
            icon={Newspaper}
        />
        <StatCard 
            title="Upcoming Events" 
            value="0" 
            description="No upcoming events" 
            icon={Calendar}
        />
        <StatCard 
            title="Unread Messages" 
            value="0" 
            description="No unread messages" 
            icon={MessageSquare}
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
