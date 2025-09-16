
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Users, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const timelineEvents = [
  { year: "2020", title: "Idea & Inception", description: "Upskill was born from a desire to break down professional silos." },
  { year: "2021", title: "Community Launch", description: "Our platform went live, welcoming the first 1,000 members." },
  { year: "2022", title: "First Global Summit", description: "Hosted our first virtual conference with over 5,000 attendees." },
  { year: "2024", title: "Expanding Horizons", description: "Launched new resources and mentorship programs." },
];

export default function AboutPage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };
  
  const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: (i: number) => ({
          opacity: 1,
          y: 0,
          transition: {
              delay: i * 0.15,
              duration: 0.5,
              ease: "easeOut",
          },
      }),
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
              Our Mission
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              To build a global, cross-disciplinary community where professionals
              in healthcare, STEM, and public health can connect, learn, and
              collectively drive progress.
            </p>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">The Story of Upskill</h2>
                <p className="mt-4 text-muted-foreground">
                  Upskill Community began with a simple observation: the world's most significant challenges require collaboration across multiple fields. Yet, professionals in STEM, healthcare, and public health often work in isolation. We saw an opportunity to change that.
                </p>
                <p className="mt-4 text-muted-foreground">
                  We envisioned a single, vibrant platform where a researcher could share a breakthrough with a clinician, a public health expert could advise a tech innovator, and a nurse could find mentorship from a seasoned specialist. We built Upskill not just as a network, but as an ecosystem for shared growth and collective impact.
                </p>
                <Button asChild className="mt-6">
                  <Link href="/signup">Become Part of the Story</Link>
                </Button>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <Image src="https://picsum.photos/seed/story/600/400" alt="Team collaborating" fill style={{objectFit:"cover"}} sizes="(max-width: 768px) 100vw, 50vw" data-ai-hint="team collaboration"/>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="bg-card py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                Our Vision & Goals
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                We are guided by a core set of principles aimed at fostering a thriving professional ecosystem.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div className="text-center" custom={0} variants={cardVariants}>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Foster Connection</h3>
                <p className="text-muted-foreground text-sm mt-1">Create meaningful professional relationships that transcend geographical and disciplinary boundaries.</p>
              </motion.div>
              <motion.div className="text-center" custom={1} variants={cardVariants}>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Accelerate Growth</h3>
                <p className="text-muted-foreground text-sm mt-1">Provide tools, resources, and opportunities for continuous learning and career advancement.</p>
              </motion.div>
              <motion.div className="text-center" custom={2} variants={cardVariants}>
                <div className="mx-auto bg-primary/10 rounded-full p-3 w-fit mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">Drive Impact</h3>
                <p className="text-muted-foreground text-sm mt-1">Empower our members to collaborate on solutions that address real-world challenges in health and science.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="py-16 md:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="container mx-auto px-4">
             <div className="text-center mb-12">
              <h2 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">
                Our Journey
              </h2>
              <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
                A brief history of our milestones and growth.
              </p>
            </div>
            <div className="relative">
              <div className="absolute left-1/2 h-full w-0.5 bg-border -translate-x-1/2 hidden md:block"></div>
              {timelineEvents.map((event, index) => (
                <motion.div 
                  key={index} 
                  className={`flex md:items-center mb-8 md:mb-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                  custom={index}
                  variants={cardVariants}
                >
                  <div className="md:w-1/2"></div>
                  <div className="md:w-1/2 md:p-8">
                     <Card>
                       <CardHeader>
                        <div className="flex items-baseline gap-4">
                          <p className="text-primary font-bold text-2xl font-headline">{event.year}</p>
                          <CardTitle className="font-headline">{event.title}</CardTitle>
                        </div>
                       </CardHeader>
                       <CardContent>
                         <p className="text-muted-foreground">{event.description}</p>
                       </CardContent>
                     </Card>
                  </div>
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
