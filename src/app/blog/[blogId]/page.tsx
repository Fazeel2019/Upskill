
"use client";

import { useEffect, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Blog } from "@/lib/data";
import { getBlog } from "@/services/blogs";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { format } from "date-fns";
import PublicHeader from "@/components/public-header";
import Footer from "@/components/footer";

function BlogDetailSkeleton() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex items-center gap-4 mb-8">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-32" />
            </div>
            <Skeleton className="h-96 w-full rounded-lg mb-8" />
            <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
            </div>
        </div>
    )
}

export default function BlogDetailPage({ params }: { params: { blogId: string } }) {
    const { blogId } = params;
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogId) {
            const fetchBlog = async () => {
                setLoading(true);
                const blogData = await getBlog(blogId);
                if (blogData) {
                    setBlog(blogData);
                } else {
                    notFound();
                }
                setLoading(false);
            };
            fetchBlog();
        }
    }, [blogId]);

    if (loading) {
        return (
            <div className="flex flex-col min-h-screen">
                <PublicHeader />
                <main className="flex-grow pt-20">
                    <BlogDetailSkeleton />
                </main>
                <Footer />
            </div>
        );
    }

    if (!blog) {
        return notFound();
    }

    const blogDate = blog.createdAt?.toDate ? blog.createdAt.toDate() : new Date();

    return (
        <div className="flex flex-col min-h-screen">
            <PublicHeader />
            <main className="flex-grow pt-20">
                <motion.div 
                    className="container mx-auto px-4 py-12 max-w-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
                        <Button variant="ghost" asChild className="mb-8">
                            <Link href="/blog">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Blog
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Badge variant="secondary" className="mb-4">{blog.category}</Badge>
                        <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-6 text-muted-foreground text-sm mb-8">
                             <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{format(blogDate, "MMMM d, yyyy")}</span>
                            </div>
                        </div>

                         <div 
                            className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-lg mb-8"
                        >
                            <Image
                                src={blog.imageUrl}
                                alt={blog.title}
                                fill
                                style={{objectFit: "cover"}}
                                sizes="100vw"
                                data-ai-hint={blog.imageHint}
                                priority
                            />
                        </div>

                        <article className="prose dark:prose-invert max-w-none text-foreground/90 text-lg leading-relaxed">
                            <p className="text-xl font-semibold italic">{blog.excerpt}</p>
                            <div className="mt-8 whitespace-pre-wrap">
                                {blog.content}
                            </div>
                        </article>

                    </motion.div>
                </motion.div>
            </main>
            <Footer />
        </div>
    )
}
