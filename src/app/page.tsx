
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckIcon, MedalIcon, SparklesIcon, UsersIcon, BarChart, Zap, Star, ShieldCheck, Trophy, Group, Briefcase, Calendar, Verified } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/footer";
import PublicHeader from "@/components/public-header";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const features = [
    {
        title: "Exclusive Leadership Events",
        description: "Access monthly leadership summits, workshops, and exclusive mentorship from C-suite executives and industry leaders.",
        icon: Calendar,
        tag: "Premium",
        color: "orange"
    },
    {
        title: "Advanced Career Analytics",
        description: "Monitor your career growth with detailed analytics, milestone tracking, and predictive insights powered by our AI.",
        icon: BarChart,
        tag: "Analytics",
        color: "blue"
    },
    {
        title: "Verified Professional Network",
        description: "Connect with a trusted, curated network of healthcare and STEM professionals, designed for meaningful collaboration.",
        icon: Verified,
        tag: "Community",
        color: "green"
    },
];

const testimonials = [
  {
    name: "Dr. Sarah Chen",
    title: "CMO, MedTech Innovations",
    quote: "The mentorship program was transformative. I secured my CMO role in just 6 months, leading to a 150% salary increase.",
    image: "https://picsum.photos/seed/testimonial1/100/100",
    rating: 5,
    tag: "Promotion",
    tagColor: "green"
  },
  {
    name: "Marcus Rodriguez",
    title: "Sr. Data Scientist, BioAnalytics Corp",
    quote: "I received 5 job offers from top-tier companies thanks to the C-suite networking opportunities. The connections here are invaluable.",
    image: "https://picsum.photos/seed/testimonial2/100/100",
    rating: 5,
    tag: "Networking",
    tagColor: "blue"
  },
    {
    name: "Dr. Emily Watson",
    title: "Research Director, Genomics Institute",
    quote: "Gaining over 200 new, meaningful connections has dramatically expanded my leadership and collaborative research capabilities.",
    image: "https://picsum.photos/seed/testimonial3/100/100",
    rating: 5,
    tag: "Leadership",
    tagColor: "orange"
  },
  {
    name: "James Park",
    title: "VP Engineering, HealthTech Solutions",
    quote: "The leadership coaching helped me get promoted 8 months ahead of schedule and confidently double my team's size.",
    image: "https://picsum.photos/seed/testimonial4/100/100",
    rating: 5,
    tag: "Promotion",
    tagColor: "green"
  },
];

const highlights = [
    { text: "Expert Mentorship", icon: UsersIcon },
    { text: "Exclusive Events", icon: Star },
    { text: "AI Insights", icon: Zap },
]

export default function Home() {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground light">
      <PublicHeader />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 text-center md:text-left overflow-hidden hero-gradient">
           <div className="container relative mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-white">
                  Premier Community Platform for STEM & Healthcare Professionals
                </h1>
                <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl mx-auto md:mx-0">
                  Join 10,000+ professionals advancing their careers through expert coaching, exclusive networking, and AI-powered insights.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-4">
                  <Button asChild size="lg" className="rounded-xl cta-gradient text-white hover:shadow-lg hover:shadow-primary/50 transition-shadow transform hover:-translate-y-1 w-full sm:w-auto">
                    <Link href="/signup">Start Free Trial Today</Link>
                  </Button>
                </div>
                 <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2">
                    {highlights.map((highlight, i) => (
                      <div key={i} className="flex items-center gap-2 text-white/90">
                        <highlight.icon className="w-4 h-4 text-white/90" />
                        <span className="font-medium text-sm">{highlight.text}</span>
                      </div>
                    ))}
                 </div>
              </motion.div>
              <motion.div 
                className="relative hidden md:block h-[450px]"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <Image
                  src="https://picsum.photos/seed/professionals/600/700"
                  alt="Diverse professionals"
                  width={600}
                  height={700}
                  className="rounded-2xl shadow-2xl absolute right-0 top-1/2 -translate-y-1/2"
                  data-ai-hint="diverse professionals team"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Everything you need section */}
        <section className="py-16 md:py-32 bg-secondary">
             <div className="container mx-auto px-4 text-center">
                 <Badge variant="outline" className="mb-4 font-semibold text-primary border-primary/50 bg-primary/10">Platform Features</Badge>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight text-foreground">
                 Everything You Need to <br/> <span className="bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">Accelerate Your Career</span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Our platform provides a powerful, all-in-one strategy with exclusive guidance to help you reach the pinnacle of value creation and impact within the healthcare and tech fields.</p>
                <div className="mt-8">
                     <Button variant="outline">Explore Platform Features</Button>
                </div>
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-left p-6 group transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
                           <div className="flex items-center justify-between mb-4">
                             <div className={cn("rounded-lg p-2 w-fit", 
                                feature.color === 'orange' && 'bg-orange-500/10',
                                feature.color === 'blue' && 'bg-blue-500/10',
                                feature.color === 'green' && 'bg-green-500/10',
                              )}>
                                <feature.icon className={cn("w-6 h-6",
                                    feature.color === 'orange' && 'text-orange-500',
                                    feature.color === 'blue' && 'text-blue-500',
                                    feature.color === 'green' && 'text-green-500',
                                )} />
                            </div>
                            <Badge variant="outline">{feature.tag}</Badge>
                           </div>
                            <h3 className="font-semibold text-xl mb-2 text-foreground">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm">{feature.description}</p>
                        </Card>
                    ))}
                </div>
                <Card className="mt-12 p-8 bg-background/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="font-bold text-xl">Ready to unlock your potential?</h3>
                        <p className="text-muted-foreground mt-1">Join thousands of members already on their way to success.</p>
                    </div>
                     <div className="flex gap-4">
                        <Button asChild className="cta-gradient text-white"><Link href="/signup">Start Free Trial</Link></Button>
                        <Button variant="outline">Book a Demo</Button>
                    </div>
                </Card>
             </div>
        </section>

        {/* Trusted By Professionals Section */}
        <section className="bg-background py-16 md:py-32">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="outline" className="mb-4 font-semibold text-primary border-primary/50 bg-primary/10">Success Stories</Badge>
            <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
             Trusted by Leading <br/> <span className="bg-gradient-to-r from-purple-500 to-red-500 text-transparent bg-clip-text">Healthcare & STEM Professionals</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">Our members have successfully transitioned into executive roles, secured significant salary increases, and expanded their influence across the venture ecosystem.</p>

            <div className="my-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div><p className="text-4xl font-bold text-primary">10,000+</p><p className="text-muted-foreground">Active Members</p></div>
              <div><p className="text-4xl font-bold text-primary">94%</p><p className="text-muted-foreground">Success Rate</p></div>
              <div><p className="text-4xl font-bold text-primary">500+</p><p className="text-muted-foreground">Expert Mentors</p></div>
              <div><p className="text-4xl font-bold text-primary">4.9/5</p><p className="text-muted-foreground">Average Rating</p></div>
            </div>
             <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.name} className="h-full text-left p-6 flex flex-col justify-between">
                        <div>
                             <div className="flex items-center mb-2">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                                <Badge variant="outline" className={cn("ml-auto", 
                                    testimonial.tagColor === "green" && "text-green-600 border-green-500/50 bg-green-500/10",
                                    testimonial.tagColor === "blue" && "text-blue-600 border-blue-500/50 bg-blue-500/10",
                                    testimonial.tagColor === "orange" && "text-orange-600 border-orange-500/50 bg-orange-500/10",
                                )}>{testimonial.tag}</Badge>
                            </div>
                            <p className="font-medium text-foreground mb-4">"{testimonial.quote}"</p>
                        </div>
                        <div className="flex items-center gap-3 mt-4">
                        <Image src={testimonial.image} alt={testimonial.name} width={40} height={40} className="rounded-full" data-ai-hint="person portrait" />
                        <div>
                            <p className="font-semibold text-sm text-foreground">{testimonial.name}</p>
                            <p className="text-xs text-muted-foreground">{testimonial.title}</p>
                        </div>
                        </div>
                    </Card>
                ))}
                </div>
            </div>
             <Card className="mt-12 p-8 bg-secondary flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h3 className="font-bold text-xl">Ready to Join Our Success Stories?</h3>
                    <p className="text-muted-foreground mt-1">See how our members leverage the platform to achieve their goals.</p>
                </div>
                <Button asChild className="cta-gradient text-white"><Link href="/signup">Join Community</Link></Button>
             </Card>
          </div>
        </section>

        {/* Transform your career section */}
        <section className="py-16 md:py-32 relative overflow-hidden dark-gradient">
            <div className="container mx-auto px-4 relative text-center text-white">
                <Badge variant="outline" className="mb-4 font-semibold text-primary border-primary/50 bg-primary/20">Our Framework</Badge>
                <h2 className="font-headline text-3xl md:text-5xl font-bold tracking-tight">Transform Your Career Starting Today</h2>
                <p className="mt-4 text-lg text-white/70 max-w-3xl mx-auto">
                    We provide the framework, mentorship, and network to help you achieve your most ambitious career goals.
                </p>
                <div className="mt-12 max-w-4xl mx-auto">
                    <Card className="bg-background/80 backdrop-blur-sm border-white/10 text-left">
                       <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
                            <div>
                                <Image src="https://picsum.photos/seed/dashboard-ui/500/400" alt="Dashboard UI" width={500} height={400} className="rounded-lg shadow-lg" data-ai-hint="dashboard ui" />
                            </div>
                            <div>
                                <h3 className="font-bold text-2xl mb-4">Everything You Need To Succeed</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>AI-Powered Goal Setting & Tracking</li>
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Personalized Skill Gap Analysis</li>
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>1-on-1 Mentorship Scheduling</li>
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Access to Exclusive Workshops</li>
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Curated Leadership Content</li>
                                    <li className="flex items-center gap-3"><CheckIcon className="w-5 h-5 text-green-500"/>Networking & Collaboration Tools</li>
                                </ul>
                                <Button asChild className="mt-6 cta-gradient text-white w-full"><Link href="/signup">View Your Personalized Plan</Link></Button>
                            </div>
                       </CardContent>
                    </Card>
                </div>
            </div>
        </section>


        {/* Final CTA Section */}
        <section className="py-20 md:py-32 text-center relative overflow-hidden hero-gradient">
            <div className="container mx-auto px-4 relative">
                <h2 className="font-headline text-4xl md:text-5xl font-bold tracking-tight text-white">Ready to Transform Your Career?</h2>
                <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Join thousands of professionals who are already leveling up. Your next opportunity awaits.</p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
                      <Link href="/signup">Join Now For Free</Link>
                  </Button>
                   <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                      <Link href="#">Book a Demo</Link>
                  </Button>
                </div>
            </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
