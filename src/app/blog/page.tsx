
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Search, Send, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { listenToBlogs, type Blog } from "@/services/blogs";
import { format } from "date-fns";
import { Timestamp } from "firebase/firestore";

const categories = ["All", "Career Development", "Healthcare", "STEM", "Public Health"];

export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [allPosts, setAllPosts] = useState<Blog[]>([]);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = listenToBlogs((posts) => {
      setAllPosts(posts);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const featuredPost = useMemo(() => allPosts.length > 0 ? allPosts[0] : null, [allPosts]);
  const otherPosts = useMemo(() => allPosts.length > 1 ? allPosts.slice(1) : [], [allPosts]);
  
  const formatDate = (date: Timestamp | Date | undefined) => {
    if (!date) return '';
    const dateObj = (date as Timestamp)?.toDate ? (date as Timestamp).toDate() : (date as Date);
    return format(dateObj, "MMMM d, yyyy");
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
  };
  
  const cardVariants = {
      hidden: { opacity: 0, scale: 0.95 },
      visible: {
          opacity: 1,
          scale: 1,
          transition: {
              duration: 0.5,
              ease: "easeOut",
          },
      },
  };

  const filteredPosts = activeFilter === "All" ? otherPosts : otherPosts.filter(post => post.category === activeFilter);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main className="flex-grow">
        <motion.section 
          className="relative pt-32 pb-20 md:pt-40 md:pb-28 text-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-red-500"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container relative mx-auto px-4">
            <motion.h1 
              className="font-headline text-5xl md:text-6xl font-bold tracking-tight text-white"
              variants={cardVariants}
            >
              The Upskill Blog
            </motion.h1>
            <motion.p 
              className="mt-4 text-lg md:text-xl text-white/80 max-w-3xl mx-auto"
              variants={cardVariants}
            >
              Thought leadership, career tips, and insights from the forefront of science and health.
            </motion.p>
             <motion.div 
              className="mt-8 max-w-lg mx-auto"
              variants={cardVariants}
            >
               <div className="relative">
                  <Input placeholder="Search articles..." className="h-12 text-lg pr-12 rounded-full"/>
                  <Button size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full">
                    <Search className="h-5 w-5" />
                  </Button>
               </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            {loading ? (
                <div className="flex justify-center py-16"><Loader2 className="w-8 h-8 animate-spin" /></div>
            ) : allPosts.length > 0 && featuredPost ? (
             <>
                {/* Featured Post */}
                <motion.div variants={cardVariants}>
                    <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Featured Article</h2>
                    <Card className="flex flex-col md:flex-row h-full group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                        <div className="md:w-1/2 relative overflow-hidden">
                            <Image
                                src={featuredPost.imageUrl}
                                alt={featuredPost.title}
                                width={800}
                                height={500}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                data-ai-hint={featuredPost.imageHint}
                            />
                        </div>
                        <div className="md:w-1/2 flex flex-col">
                            <CardHeader>
                                <Badge variant="secondary" className="w-fit mb-2">{featuredPost.category}</Badge>
                                <CardTitle className="font-headline text-2xl leading-tight text-foreground">
                                    <Link href={`/blog/${featuredPost.id}`} className="hover:text-primary transition-colors">{featuredPost.title}</Link>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                      <Calendar className="w-4 h-4" />
                                      <span>{formatDate(featuredPost.createdAt)}</span>
                                    </div>
                                    <span>by {featuredPost.author}</span>
                                </div>
                                <Link href={`/blog/${featuredPost.id}`} className="flex items-center text-primary font-semibold">
                                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                                </Link>
                            </CardFooter>
                        </div>
                    </Card>
                </motion.div>

                {otherPosts.length > 0 && (
                    <>
                        <h2 className="font-headline text-3xl font-bold tracking-tight mt-16 mb-8">All Articles</h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map(category => (
                            <Button 
                            key={category} 
                            variant={activeFilter === category ? "default" : "outline"}
                            onClick={() => setActiveFilter(category)}
                            className="rounded-full"
                            >
                            {category}
                            </Button>
                        ))}
                        </div>
                        {filteredPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map((post) => (
                            <motion.div key={post.id} variants={cardVariants}>
                                <Card className="flex flex-col h-full group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                                <div className="relative overflow-hidden h-48">
                                    <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={post.imageHint}
                                    />
                                </div>
                                <CardHeader>
                                    <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                                    <CardTitle className="font-headline text-xl leading-tight text-foreground">
                                    <Link href={`/blog/${post.id}`} className="hover:text-primary transition-colors">{post.title}</Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-muted-foreground text-sm line-clamp-3">{post.excerpt}</p>
                                </CardContent>
                                <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{formatDate(post.createdAt)}</span>
                                    </div>
                                    <Link href={`/blog/${post.id}`} className="flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Read More <ArrowRight className="ml-1 w-4 h-4" />
                                    </Link>
                                </CardFooter>
                                </Card>
                            </motion.div>
                            ))}
                        </div>
                        ) : <p className="text-center text-muted-foreground">No posts found in this category.</p>}
                    </>
                )}
             </>
            ) : (<div className="text-center py-16">
                    <Card className="max-w-md mx-auto">
                        <CardContent className="p-8 text-center">
                            <h3 className="font-semibold text-lg">No Blog Posts Yet</h3>
                            <p className="text-muted-foreground mt-2">
                                Check back soon for new articles and insights!
                            </p>
                        </CardContent>
                    </Card>
                </div>)}
          </div>
        </motion.section>

        <section className="bg-muted/50 py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
                <h2 className="font-headline text-3xl font-bold">Stay Ahead of the Curve</h2>
                <p className="text-muted-foreground mt-2 max-w-xl mx-auto">Subscribe to our newsletter for the latest insights, articles, and career opportunities delivered to your inbox.</p>
                <div className="mt-8 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                    <Input placeholder="Enter your email" className="h-11 flex-grow" />
                    <Button size="lg" className="sm:w-auto">
                        <Send className="mr-2 h-4 w-4" />
                        Subscribe
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

    