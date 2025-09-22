
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

const activityItems: any[] = [];

const recommendationItems: any[] = [];

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
                <StatCard title="Career Progress" value="0%" subValue="Last updated: today" icon={TrendingUp} progress={0} colorClass="bg-blue-500" link="/profile"/>
                <StatCard title="Courses Completed" value="0" subValue="+0 this month" icon={BookOpen} colorClass="bg-green-500" link="/learning" />
                <StatCard title="Network Connections" value="0" subValue="+0 this week" icon={UsersIcon} colorClass="bg-purple-500" link="/networking" />
                <StatCard title="Mentorship Hours" value="0" subValue="No sessions upcoming" icon={Clock} colorClass="bg-orange-500" link="/mentors" />
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    <QuickActionCard title="Continue Learning" description='Resume your last course' buttonText="Continue" icon={BookOpen} href="/learning" progress progressValue={0} />
                    <QuickActionCard title="Message Mentor" description="Connect with mentors" buttonText="Message" icon={MessageSquareIcon} href="/messaging" />
                    <QuickActionCard title="Join Discussion" description='Hot topics await you' buttonText="View" icon={UsersIcon} href="/community" />
                    <QuickActionCard title="Upcoming Event" description="See upcoming events" buttonText="RSVP" icon={CalendarIcon} href="/events" />
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                <Card className="lg:col-span-2 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Zap className="w-5 h-5 text-primary" />Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                       {activityItems.length > 0 ? (
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
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>No recent activity to show.</p>
                            </div>
                        )}
                        <Button variant="outline" className="w-full mt-6">View All Activity</Button>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-1 rounded-xl">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BrainCircuit className="w-5 h-5 text-primary"/>AI Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {recommendationItems.length > 0 ? recommendationItems.map((item, index) => (
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
                        )) : (
                             <div className="text-center py-8 text-muted-foreground">
                                <p>No recommendations at this time.</p>
                            </div>
                        )}
                         <Button variant="outline" className="w-full mt-2">View All Recommendations</Button>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
