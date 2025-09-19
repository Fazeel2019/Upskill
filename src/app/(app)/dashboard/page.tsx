
"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/hooks/use-auth"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen, Calendar, CheckCircle, Clock, FileText, MessageSquare, Star, TrendingUp, Users, Zap, BrainCircuit, Users as UsersIcon, MessageSquare as MessageSquareIcon, Calendar as CalendarIcon, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const StatCard = ({ title, value, subValue, icon: Icon, progress, colorClass, link }: { title: string, value: string, subValue: string, icon: React.ElementType, progress?: number, colorClass: string, link: string }) => {
    return (
        <Link href={link}>
            <Card className={cn("text-white rounded-xl hover:shadow-lg transition-shadow", colorClass)}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex justify-between items-center">
                        <span>{title}</span>
                        {progress === undefined && <Icon className="w-5 h-5 opacity-70" />}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2">
                        <p className="text-4xl font-bold">{value}</p>
                        {progress !== undefined && <TrendingUp className="w-8 h-8 mb-1" />}
                    </div>
                    {progress !== undefined && <Progress value={progress} className="h-2 bg-white/30 mt-2" indicatorClassName="bg-white" />}
                    <p className="text-sm opacity-80 mt-2">{subValue}</p>
                </CardContent>
            </Card>
        </Link>
    )
}

const QuickActionCard = ({ title, description, buttonText, icon: Icon, href, progress, progressValue }: { title: string, description: string, buttonText: string, icon: React.ElementType, href: string, progress?: boolean, progressValue?: number }) => (
    <Card className="group rounded-xl hover:shadow-md transition-shadow">
        <CardContent className="p-4">
            <div className="flex justify-between items-start">
                <div className="p-2 bg-muted rounded-lg">
                    <Icon className="w-5 h-5 text-muted-foreground" />
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
            </div>
            <h3 className="font-semibold mt-4">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
            {progress && (
                <div className="mt-4">
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-1">
                        <span>Progress</span>
                        <span>{progressValue}%</span>
                    </div>
                    <Progress value={progressValue} className="h-2" />
                </div>
            )}
            <Button variant="outline" className="w-full mt-4">
                {buttonText}
            </Button>
        </CardContent>
    </Card>
)

const activityItems = [
  { icon: CheckCircle, text: 'Completed "Data Science Fundamentals" module', time: "2 hours ago", color: "text-green-500" },
  { icon: CalendarIcon, text: "Scheduled mentorship session with Dr. Lisa Park", time: "5 hours ago", color: "text-blue-500" },
  { icon: MessageSquareIcon, text: 'Posted in "AI Ethics in Healthcare" discussion', time: "1 day ago", color: "text-purple-500" },
  { icon: Star, text: 'Earned "Leadership Foundations" certificate', time: "2 days ago", color: "text-yellow-500" },
];

const recommendationItems = [
    { type: 'Course', title: 'Advanced Machine Learning for Healthcare', match: 95, duration: '6 weeks', image: 'https://picsum.photos/seed/rec1/50/50', imageHint: 'abstract tech' },
    { type: 'Mentor', title: 'Dr. Jennifer Walsh - Biotech Executive', match: 92, duration: '15+ years', image: 'https://picsum.photos/seed/rec2/50/50', imageHint: 'woman portrait' },
    { type: 'Event', title: 'Digital Health Innovation Summit', match: 88, duration: 'March 15, 2025', image: 'https://picsum.photos/seed/rec3/50/50', imageHint: 'people conference' }
];

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <div className="flex justify-between items-center bg-blue-50 dark:bg-blue-900/20 p-6 rounded-xl">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}! 👋</h1>
                    <p className="text-muted-foreground">You're making great progress on your career journey. Here's what's happening today.</p>
                </div>
                <div className="p-4 bg-blue-500 rounded-lg hidden sm:block">
                    <BrainCircuit className="w-8 h-8 text-white" />
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Career Progress" value="75%" subValue="Last updated: today" icon={TrendingUp} progress={75} colorClass="bg-blue-500" link="/profile"/>
                <StatCard title="Courses Completed" value="12" subValue="+3 this month" icon={BookOpen} colorClass="bg-green-500" link="/learning" />
                <StatCard title="Network Connections" value="248" subValue="+15 this week" icon={UsersIcon} colorClass="bg-purple-500" link="/community/find" />
                <StatCard title="Mentorship Hours" value="24" subValue="Next session: Tomorrow" icon={Clock} colorClass="bg-orange-500" link="/mentors" />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <QuickActionCard title="Continue Learning" description='Resume "AI in Healthcare Leadership"' buttonText="Continue" icon={BookOpen} href="/learning/ai-leadership" progress progressValue={65} />
                    <QuickActionCard title="Message Mentor" description="Dr. Michael Torres is available" buttonText="Message" icon={MessageSquareIcon} href="/messaging/michael-torres" />
                    <QuickActionCard title="Join Discussion" description='12 new posts in "Biotech Innovation"' buttonText="View" icon={UsersIcon} href="/community/biotech-innovation" />
                    <QuickActionCard title="Upcoming Event" description="Leadership Summit in 3 days" buttonText="RSVP" icon={CalendarIcon} href="/events/leadership-summit" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" />Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {activityItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-4">
                                    <div className="p-2 bg-muted rounded-full">
                                        <item.icon className={cn("w-5 h-5", item.color)} />
                                    </div>
                                    <div className="flex-grow">
                                        <p className="font-medium">{item.text}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{item.time}</p>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" className="w-full mt-6">View All Activity</Button>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary"/>AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendationItems.map((item, index) => (
                            <Link href="#" key={index} className="flex items-center gap-4 group p-2 rounded-lg hover:bg-muted">
                                <Image src={item.image} alt={item.title} width={50} height={50} className="rounded-lg" data-ai-hint={item.imageHint}/>
                                <div className="flex-grow">
                                    <p className="text-xs text-muted-foreground">{item.type}</p>
                                    <p className="font-semibold leading-tight">{item.title}</p>
                                    <p className="text-xs text-muted-foreground">{item.duration}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-green-500">{item.match}%</p>
                                    <p className="text-xs text-muted-foreground">match</p>
                                </div>
                            </Link>
                        ))}
                         <Button variant="outline" className="w-full mt-2">View All Recommendations</Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
