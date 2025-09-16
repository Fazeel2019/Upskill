
"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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

export default function BlogPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 } },
  };
  
  const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: {
          opacity: 1,
          y: 0,
          transition: {
              duration: 0.5,
              ease: "easeOut",
          },
      },
  };
  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className="flex-grow">
        <motion.section 
          className="bg-card pt-24 pb-16 md:pt-32 md:pb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="container mx-auto px-4">
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter">
              Upskill Blog
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Thought leadership, career tips, and insights from the forefront of science and health.
            </p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card className="flex flex-col h-full overflow-hidden group">
                    <div className="relative">
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
                      <CardTitle className="font-headline text-xl leading-tight">
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
      </main>
      <Footer />
    </div>
  );
}
