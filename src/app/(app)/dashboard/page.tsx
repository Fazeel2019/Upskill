"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Bell, Calendar, Edit, Plus, User } from "lucide-react"
import Link from "next/link"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const chartData = [
  { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
]

const notifications = [
    { user: "David Chen, MPH", action: "commented on your post" },
    { user: "Event Reminder", action: "'AI in Diagnostics' starts in 1 hour" },
    { user: "Aisha Khan, RN", action: "sent you a new message" },
]


export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Welcome back, Dr. Lovelace!</h1>
        <p className="text-muted-foreground">Here's a snapshot of your community activity.</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Posts Today</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">45</div>
            <p className="text-xs text-muted-foreground">+12 since yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 new webinar this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">2 from new connections</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/community"><Plus className="mr-2 h-4 w-4"/>Create a Post</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/events"><Calendar className="mr-2 h-4 w-4"/>Find an Event</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg">
                        <Link href="/profile"><Edit className="mr-2 h-4 w-4"/>Update Profile</Link>
                    </Button>
                </CardContent>
             </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Community Engagement</CardTitle>
                    <CardDescription>A look at posts and comments over the last year.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <XAxis
                        dataKey="name"
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        />
                        <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `${value}`}
                        />
                        <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Notifications</CardTitle>
                <CardDescription>Recent updates and reminders.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                {notifications.map((notification, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <div className="bg-primary/10 p-2 rounded-full">
                            <Bell className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <p className="text-sm">
                                <span className="font-semibold">{notification.user}</span> {notification.action}.
                            </p>
                            <p className="text-xs text-muted-foreground">{index + 1}h ago</p>
                        </div>
                    </div>
                ))}
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}
