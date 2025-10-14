
"use client";

import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageEvents from "./manage-events";
import ManageLearning from "./manage-learning";
import ManageUsers from "./manage-users";
import ManagePodcasts from "./manage-podcasts";
import ManageBlogs from "./manage-blogs";
import ManageCourses from "./manage-courses";

function AdminAccessDenied() {
    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
            <Shield className="w-16 h-16 text-destructive mb-4" />
            <h1 className="text-2xl font-bold">Access Denied</h1>
            <p className="text-muted-foreground">
                You do not have permission to view this page.
            </p>
        </div>
    )
}

export default function AdminPage() {
    const { profile, loading } = useAuth();
    const router = useRouter();

    if (loading) {
        return <div className="flex items-center justify-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    if (profile?.role !== 'admin') {
        return <AdminAccessDenied />;
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Super Admin Panel</h1>
            <Tabs defaultValue="events">
                <TabsList>
                    <TabsTrigger value="events">Manage Events</TabsTrigger>
                    <TabsTrigger value="learning">Manage Learning</TabsTrigger>
                    <TabsTrigger value="courses">Manage Courses</TabsTrigger>
                    <TabsTrigger value="users">Manage Users</TabsTrigger>
                    <TabsTrigger value="podcasts">Manage Podcasts</TabsTrigger>
                    <TabsTrigger value="blogs">Manage Blogs</TabsTrigger>
                </TabsList>
                <TabsContent value="events">
                    <ManageEvents />
                </TabsContent>
                <TabsContent value="learning">
                    <ManageLearning />
                </TabsContent>
                <TabsContent value="courses">
                    <ManageCourses />
                </TabsContent>
                <TabsContent value="users">
                    <ManageUsers />
                </TabsContent>
                 <TabsContent value="podcasts">
                    <ManagePodcasts />
                </TabsContent>
                 <TabsContent value="blogs">
                    <ManageBlogs />
                </TabsContent>
            </Tabs>
        </div>
    )
}
