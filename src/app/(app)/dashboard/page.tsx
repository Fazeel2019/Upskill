
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bell, Calendar, Edit, MessageSquare, Plus, Users } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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

  return (
    <motion.div 
      className="space-y-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your community activity.</p>
      </motion.div>
      
      <motion.div className="grid gap-6 md:grid-cols-3" variants={containerVariants}>
        <motion.div variants={itemVariants}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Posts Today</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0</div>
              <p className="text-xs text-muted-foreground">No new posts yet</p>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No upcoming events</p>
          </CardContent>
        </Card>
        </motion.div>
        <motion.div variants={itemVariants}>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No unread messages</p>
          </CardContent>
        </Card>
        </motion.div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div className="lg:col-span-2 space-y-8" variants={containerVariants}>
            <motion.div variants={itemVariants}>
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/community/create-post"><Plus className="mr-2 h-4 w-4"/>Create a Post</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/events"><Calendar className="mr-2 h-4 w-4"/>Find an Event</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/profile"><Edit className="mr-2 h-4 w-4"/>Update Profile</Link>
                    </Button>
                </CardContent>
             </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Community Engagement</CardTitle>
                    <CardDescription>Your engagement activity will appear here.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <div className="h-[300px] flex items-center justify-center text-muted-foreground bg-muted/50 rounded-md">
                        No data to display
                    </div>
                </CardContent>
            </Card>
            </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card>
              <CardHeader>
                  <CardTitle className="font-headline">Notifications</CardTitle>
                  <CardDescription>Recent updates and reminders will show up here.</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="space-y-4 text-center text-muted-foreground py-8">
                     <Bell className="h-8 w-8 mx-auto" />
                     <p>You're all caught up!</p>
                  </div>
              </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
