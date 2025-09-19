
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar, Search, Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";

const blogPosts = [
  {
    title: "5 Strategies for Effective Cross-Disciplinary Collaboration",
    date: "September 15, 2024",
    author: "Jane Doe",
    category: "Career Development",
    excerpt: "Breaking down silos is tough. Here's how to build bridges between STEM, healthcare, and public health teams for greater impact...",
    image: "https://picsum.photos/seed/blog1/400/250",
    imageHint: "team meeting"
  },
  {
    title: "The Future of Telehealth: Trends to Watch in 2025",
    date: "September 10, 2024",
    author: "Dr. John Smith",
    category: "Healthcare",
    excerpt: "Telehealth isn't just a pandemic trend; it's a fundamental shift in healthcare delivery. We explore the technologies and policies shaping its future.",
    image: "https://picsum.photos/seed/blog2/400/250",
    imageHint: "doctor online"
  },
  {
    title: "A Scientist's Guide to Public Speaking",
    date: "September 5, 2024",
    author: "Dr. Emily Carter",
    category: "STEM",
    excerpt: "Communicating complex research to a general audience is a critical skill. Learn how to captivate and inform any room.",
    image: "https://picsum.photos/seed/blog3/400/250",
    imageHint: "public speaking"
  },
    {
    title: "Data-Driven Decisions in Public Health",
    date: "August 28, 2024",
    author: "David Chen, MPH",
    category: "Public Health",
    excerpt: "How to leverage data analytics to create more effective and equitable public health interventions. A case study analysis.",
    image: "https://picsum.photos/seed/blog4/400/250",
    imageHint: "data chart"
  },
  {
    title: "Navigating Your First Year as a Registered Nurse",
    date: "August 22, 2024",
    author: "Aisha Khan, RN",
    category: "Healthcare",
    excerpt: "The transition from student to practitioner can be challenging. We share tips for survival and success in your first year on the floor.",
    image: "https://picsum.photos/seed/blog5/400/250",
    imageHint: "nurse hospital"
  },
  {
    title: "From PhD to Industry: A Career Transition Guide",
    date: "August 15, 2024",
    author: "Michael Lee, PhD",
    category: "Career Development",
    excerpt: "Thinking of moving from academia to the private sector? This guide breaks down the steps to a successful career change.",
    image: "https://picsum.photos/seed/blog6/400/250",
    imageHint: "business person"
  },
];

const categories = ["All", "Career Development", "Healthcare", "STEM", "Public Health"];
const [featuredPost, ...otherPosts] = blogPosts;


export default function BlogPage() {
  const [activeFilter, setActiveFilter] = useState("All");

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
            {/* Featured Post */}
             <motion.div variants={cardVariants}>
                 <h2 className="font-headline text-3xl font-bold tracking-tight mb-8">Featured Article</h2>
                 <Card className="flex flex-col md:flex-row h-full group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                    <div className="md:w-1/2 relative overflow-hidden">
                        <Image
                            src={featuredPost.image}
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
                                <Link href="#" className="hover:text-primary transition-colors">{featuredPost.title}</Link>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{featuredPost.excerpt}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  <Calendar className="w-4 h-4" />
                                  <span>{featuredPost.date}</span>
                                </div>
                                <span>by {featuredPost.author}</span>
                            </div>
                            <Link href="#" className="flex items-center text-primary font-semibold">
                                Read More <ArrowRight className="ml-1 w-4 h-4" />
                            </Link>
                        </CardFooter>
                    </div>
                </Card>
             </motion.div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="flex flex-col h-full group overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-primary/10">
                    <div className="relative overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={400}
                        height={250}
                        className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={post.imageHint}
                      />
                    </div>
                    <CardHeader>
                      <Badge variant="secondary" className="w-fit mb-2">{post.category}</Badge>
                      <CardTitle className="font-headline text-xl leading-tight text-foreground">
                        <Link href="#" className="hover:text-primary transition-colors">{post.title}</Link>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground text-sm">{post.excerpt}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                         <Calendar className="w-4 h-4" />
                         <span>{post.date}</span>
                      </div>
                       <Link href="#" className="flex items-center text-primary font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                        Read More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
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
